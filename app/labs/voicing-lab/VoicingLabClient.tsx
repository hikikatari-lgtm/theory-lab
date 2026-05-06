'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import LabHeader from '@/components/LabHeader';
import { normalizeNote } from '@/lib/chord-theory';
import {
  initPiano,
  playNotes,
  playSustained,
  releaseAllNotes,
} from '@/lib/audio';
import { transposeChords, KEY_ORDER } from '@/lib/transpose';
import VoicingKeyboard from './components/VoicingKeyboard';
import ProgressionSelector from './components/ProgressionSelector';
import ChordsRow from './components/ChordsRow';
import BarsGrid from './components/BarsGrid';
import SectionTabs from './components/SectionTabs';
import AudioDebugPanel from './components/AudioDebugPanel';
import {
  PROGRESSIONS,
  DEFAULT_PROGRESSION_ID,
  buildSequence,
} from './data';
import type { AnchorMode } from './data';

type LoadState = 'loading' | 'ready' | 'error';

// Phase 6: playback mode controls how Walk Through schedules notes.
//   voicing-only: legacy behavior — LH+RH sustained for the full chord
//                 duration, one attack per chord.
//   walking-bass: if the chord carries `walkingBass.notes`, the LH plays
//                 each note one-per-beat. RH unchanged.
//   rhythm:       if the chord carries `rhythm.hits`, the RH fires a
//                 short staccato attack at each hit position. LH unchanged.
//   both:         walking-bass + rhythm combined.
// When the selected mode requires data that's missing on a given chord,
// that hand falls back to the sustained behavior — so existing
// progressions without rhythm/walkingBass data play identically.
type PlaybackMode = 'voicing-only' | 'walking-bass' | 'rhythm' | 'both';

type Props = {
  initialProgressionId: string;
  initialVariantType: 'a' | 'b';
  initialKey: string;
};

// URL is the single source of truth for progression / variant / key. The
// server validates ?p, ?type, ?key and seeds the initial state via props
// (so SSR HTML matches the requested URL). After that, all changes go
// through router.push, and a single URL→state effect reconciles state from
// useSearchParams — that handles the dropdown, the variant tabs, the key
// switcher, and browser back/forward through one path.
export default function VoicingLabClient({
  initialProgressionId,
  initialVariantType,
  initialKey,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progressionId, setProgressionId] = useState<string>(
    initialProgressionId
  );
  const progression = PROGRESSIONS[progressionId];

  const [variantType, setVariantType] = useState<'a' | 'b'>(initialVariantType);
  const [currentKey, setCurrentKey] = useState<string>(initialKey);

  // Derive the displayed progression by:
  //  - chords-row: picking the active variant when hasVariants (251
  //    Type A/B) + transposing baseKey → currentKey when supportsAllKeys
  //  - bars-grid: picking the active variant when hasVariants (MCC
  //    Extended Voicing 1/2) — swaps both the voicings dict and the
  //    bars array, so each variant can introduce its own chord keys
  const viewProgression = useMemo(() => {
    if (progression.displayMode === 'chords-row') {
      let chords = progression.chords;
      if (progression.hasVariants && progression.variants) {
        chords = progression.variants[variantType];
      }
      if (progression.supportsAllKeys) {
        const baseKey = progression.baseKey ?? 'C';
        if (currentKey !== baseKey) {
          chords = transposeChords(chords, baseKey, currentKey);
        }
      }
      if (chords === progression.chords) return progression;
      return { ...progression, chords };
    }
    // bars-grid
    if (progression.hasVariants && progression.variants) {
      const variant = progression.variants[variantType];
      return { ...progression, voicings: variant.voicings, bars: variant.bars };
    }
    return progression;
  }, [progression, variantType, currentKey]);

  const sequence = useMemo(
    () => buildSequence(viewProgression),
    [viewProgression]
  );

  const [selectedItemId, setSelectedItemId] = useState<string>(
    () => sequence[0]?.itemId ?? ''
  );
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const [showDegrees, setShowDegrees] = useState(true);
  const [showCommon, setShowCommon] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [isWalking, setIsWalking] = useState(false);
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('voicing-only');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [anchorMode, setAnchorMode] = useState<AnchorMode>('standard');
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Section tab support: only relevant for bars-grid progressions that
  // declare a `sections` field (Autumn Leaves / Body And Soul / ATTYA
  // currently). Walk Through still iterates the full sequence above —
  // sections are display-only, with the active tab auto-driven during
  // playback (see effect below).
  const sections =
    viewProgression.displayMode === 'bars-grid'
      ? viewProgression.sections ?? null
      : null;
  const visibleSection = sections?.[selectedSectionIdx];

  const showVariantToggle =
    !!progression.hasVariants && !!progression.variants;
  const showKeySwitch =
    progression.displayMode === 'chords-row' &&
    !!progression.supportsAllKeys;

  const ready = loadState === 'ready';

  const stopWalk = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    releaseAllNotes();
    setPlayingItemId(null);
    setIsWalking(false);
  }, []);

  // Piano load (once)
  useEffect(() => {
    let cancelled = false;
    initPiano()
      .then(() => {
        if (!cancelled) setLoadState('ready');
      })
      .catch(() => {
        if (!cancelled) setLoadState('error');
      });
    return () => {
      cancelled = true;
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Build a URL for a given (pid, type, key) tuple. Defaults are omitted
  // so URLs stay short: '?p=two-five-one&type=b' rather than
  // '?p=two-five-one&type=b&key=c'. Params for unsupported features
  // (variant on a song-style progression, key on a non-key-cycling one)
  // are also dropped.
  const buildUrl = useCallback(
    (pid: string, vType: 'a' | 'b', key: string) => {
      const prog = PROGRESSIONS[pid];
      const params = new URLSearchParams();
      params.set('p', pid);
      if (
        !!prog.hasVariants &&
        vType === 'b'
      ) {
        params.set('type', 'b');
      }
      if (
        prog.displayMode === 'chords-row' &&
        !!prog.supportsAllKeys
      ) {
        const baseKey = prog.baseKey ?? 'C';
        if (key !== baseKey) params.set('key', key.toLowerCase());
      }
      return `${pathname}?${params.toString()}`;
    },
    [pathname]
  );

  // Sync URL → state. Single dep on searchParams: this effect runs only
  // when the URL changes (router.push from a handler, or browser back/
  // forward). Each setX uses an updater so React bails when the value
  // already matches — first-mount run is a no-op since props seeded state
  // from the same URL.
  useEffect(() => {
    const urlPid = searchParams.get('p');
    const validPid =
      urlPid && PROGRESSIONS[urlPid] ? urlPid : DEFAULT_PROGRESSION_ID;
    const prog = PROGRESSIONS[validPid];

    const urlType = searchParams.get('type');
    const validType: 'a' | 'b' =
      !!prog.hasVariants &&
      (urlType === 'a' || urlType === 'b')
        ? urlType
        : 'a';

    const urlKey = searchParams.get('key');
    const matched = urlKey
      ? KEY_ORDER.find((k) => k.toLowerCase() === urlKey.toLowerCase())
      : undefined;
    const validKey =
      prog.displayMode === 'chords-row' && !!prog.supportsAllKeys
        ? matched ?? prog.baseKey ?? 'C'
        : prog.baseKey ?? 'C';

    setProgressionId((cur) => (validPid !== cur ? validPid : cur));
    setVariantType((cur) => (validType !== cur ? validType : cur));
    setCurrentKey((cur) => (validKey !== cur ? validKey : cur));
  }, [searchParams]);

  // Cycle currentKey through KEY_ORDER. delta=+1 for next, -1 for prev,
  // wrapping at both ends (B → C, C → B). Pushes URL; state follows via
  // the URL→state effect above.
  const cycleKey = useCallback(
    (delta: number) => {
      const idx = KEY_ORDER.indexOf(currentKey);
      if (idx < 0) return;
      const next = (idx + delta + KEY_ORDER.length) % KEY_ORDER.length;
      const nextKey = KEY_ORDER[next];
      router.push(buildUrl(progressionId, variantType, nextKey), {
        scroll: false,
      });
    },
    [currentKey, progressionId, variantType, router, buildUrl]
  );

  // Arrow-key shortcuts for key cycling. Skip when focus is in a form
  // control or contenteditable so typing/select-navigation isn't hijacked.
  useEffect(() => {
    if (!showKeySwitch) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        cycleKey(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        cycleKey(1);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showKeySwitch, cycleKey]);

  // Sequence changes happen on progression change AND on variant toggle.
  // We always stop any walkthrough, but only reset selection when the
  // current selectedItemId is no longer present — for 251 the A/B variants
  // share IDs (iim7/v7/imaj7), so toggling preserves which slot is active.
  // Section index resets to 0 on every sequence change so a new
  // progression always opens with its first section visible.
  useEffect(() => {
    stopWalk();
    setSelectedItemId((cur) => {
      if (sequence.find((s) => s.itemId === cur)) return cur;
      return sequence[0]?.itemId ?? '';
    });
    setSelectedSectionIdx(0);
  }, [sequence, stopWalk]);

  // Reset 3-view anchor mode to Standard when switching progressions.
  // Variant toggle / key cycle keep the same threeAnchorView config, so
  // we only need to reset on progressionId change. This also covers
  // switching to a progression without `threeAnchorView` — the radio
  // group becomes hidden, and any stale non-standard anchorMode would
  // have been visually inert (the keyboard wouldn't receive a color),
  // but we reset it anyway so flipping back doesn't restore a prior mode.
  useEffect(() => {
    setAnchorMode('standard');
  }, [progressionId]);

  // Auto-switch the section tab during Walk Through so the visible
  // bars follow the currently playing chord (Q4 from spec). Ignored
  // for progressions without `sections`. Outside playback the tab
  // stays where the user left it.
  useEffect(() => {
    if (!playingItemId || !sections) return;
    const match = playingItemId.match(/^bar(\d+)-/);
    if (!match) return;
    const barNum = parseInt(match[1], 10);
    const idx = sections.findIndex(
      (s) => barNum >= s.barRange[0] && barNum <= s.barRange[1]
    );
    if (idx !== -1) {
      setSelectedSectionIdx((cur) => (idx !== cur ? idx : cur));
    }
  }, [playingItemId, sections]);

  // Manual tab click: switch section AND move chord selection to the
  // first chord of the new section so the keyboard immediately shows
  // a voicing from what's now visible. Disabled while Walk Through is
  // running (the tabs themselves render disabled in that state).
  const handleSectionChange = useCallback(
    (idx: number) => {
      if (!sections) return;
      setSelectedSectionIdx(idx);
      const section = sections[idx];
      const firstItem = sequence.find((item) => {
        const m = item.itemId.match(/^bar(\d+)-/);
        if (!m) return false;
        return parseInt(m[1], 10) === section.barRange[0];
      });
      if (firstItem) setSelectedItemId(firstItem.itemId);
    },
    [sections, sequence]
  );

  const handleProgressionChange = (newId: string) => {
    if (newId === progressionId) return;
    const newProg = PROGRESSIONS[newId];
    const newKey = newProg.baseKey ?? 'C';
    router.push(buildUrl(newId, 'a', newKey), { scroll: false });
  };

  const handleVariantChange = (newType: 'a' | 'b') => {
    if (newType === variantType) return;
    router.push(buildUrl(progressionId, newType, currentKey), {
      scroll: false,
    });
  };

  // Resolve current item with a fallback in case selectedItemId is briefly
  // stale right after a progression switch (before the effect fires).
  const selectedItem =
    sequence.find((s) => s.itemId === selectedItemId) ?? sequence[0] ?? null;
  const effectiveSelectedId = selectedItem?.itemId ?? null;
  const selectedIdx = selectedItem
    ? sequence.findIndex((s) => s.itemId === selectedItem.itemId)
    : -1;
  const voicing = selectedItem?.voicing ?? null;
  const prevVoicing =
    selectedIdx > 0 ? sequence[selectedIdx - 1].voicing : null;

  const commonNotes = useMemo(() => {
    if (!showCommon || !prevVoicing || !voicing) return new Set<string>();
    const prevPCs = new Set(
      prevVoicing.rh.map((n) => normalizeNote(n.note).replace(/\d+/, ''))
    );
    const result = new Set<string>();
    voicing.rh.forEach((n) => {
      const pc = normalizeNote(n.note).replace(/\d+/, '');
      if (prevPCs.has(pc)) result.add(normalizeNote(n.note));
    });
    return result;
  }, [showCommon, prevVoicing, voicing]);

  const allToneNotes = useMemo(() => {
    if (!voicing) return [];
    return [
      ...voicing.lh.map((n) => normalizeNote(n.note)),
      ...voicing.rh.map((n) => normalizeNote(n.note)),
    ];
  }, [voicing]);

  // 3-view anchor: pick the configured color for the current mode (or
  // null for standard / progressions without `threeAnchorView`). The
  // keyboard treats a missing color as "render normally" even if
  // anchorMode happens to be non-standard, so this is the single gate.
  const anchorConfig = viewProgression.threeAnchorView;
  const anchorColor = useMemo(() => {
    if (!anchorConfig?.enabled || anchorMode === 'standard') return undefined;
    if (anchorMode === 'top-note') return anchorConfig.anchors.topNote.color;
    if (anchorMode === 'bottom-line') return anchorConfig.anchors.bottomLine.color;
    if (anchorMode === 'root') return anchorConfig.anchors.root.color;
    return undefined;
  }, [anchorConfig, anchorMode]);

  const onPlayLH = () => {
    if (!voicing) return;
    void playNotes(voicing.lh.map((n) => normalizeNote(n.note)), 'block');
  };
  const onPlayRH = () => {
    if (!voicing) return;
    void playNotes(voicing.rh.map((n) => normalizeNote(n.note)), 'block');
  };
  const onPlayBoth = () => {
    if (allToneNotes.length === 0) return;
    void playNotes(allToneNotes, 'block');
  };
  const onPlayArp = () => {
    if (allToneNotes.length === 0) return;
    void playNotes(allToneNotes, 'broken');
  };

  const walkThrough = async () => {
    if (isWalking || !ready || sequence.length === 0) return;
    setIsWalking(true);
    const beatSec = 60 / progression.tempo;
    let cumMs = 0;

    const wantWalkingBass =
      playbackMode === 'walking-bass' || playbackMode === 'both';
    const wantRhythm = playbackMode === 'rhythm' || playbackMode === 'both';

    sequence.forEach((item) => {
      const durationSec = item.beats * beatSec;
      const startMs = cumMs;
      const lhNotes = item.voicing.lh.map((n) => normalizeNote(n.note));
      const rhNotes = item.voicing.rh.map((n) => normalizeNote(n.note));

      // Selection / playing highlight at chord start (independent of how
      // LH/RH are scheduled — even with rhythm/walking-bass, the cell
      // lights up once per chord change).
      const tHighlight = setTimeout(() => {
        setSelectedItemId(item.itemId);
        setPlayingItemId(item.itemId);
      }, startMs);
      timeoutsRef.current.push(tHighlight);

      // LH: walking-bass note-per-beat, otherwise one sustained attack.
      if (wantWalkingBass && item.walkingBass) {
        item.walkingBass.notes.forEach((noteName, beatIdx) => {
          const t = setTimeout(() => {
            void playSustained([normalizeNote(noteName)], beatSec * 0.95);
          }, startMs + beatIdx * beatSec * 1000);
          timeoutsRef.current.push(t);
        });
      } else {
        const tLh = setTimeout(() => {
          void playSustained(lhNotes, durationSec * 0.95);
        }, startMs);
        timeoutsRef.current.push(tLh);
      }

      // RH: rhythm-driven staccato hits, otherwise one sustained attack.
      // Each hit is ~half a beat long — long enough to ring through a
      // typical comping figure, short enough to feel articulated. Hits
      // at or past `item.beats` are silently skipped so a 4-beat
      // pattern (e.g. Rhythm B's [0.5, 2]) applied to a 2-beat half-bar
      // chord doesn't bleed into the following chord's territory.
      if (wantRhythm && item.rhythm) {
        const hitDurSec = beatSec * 0.5;
        item.rhythm.hits.forEach((hitBeat) => {
          if (hitBeat >= item.beats) return;
          const t = setTimeout(() => {
            void playSustained(rhNotes, hitDurSec);
          }, startMs + hitBeat * beatSec * 1000);
          timeoutsRef.current.push(t);
        });
      } else {
        const tRh = setTimeout(() => {
          void playSustained(rhNotes, durationSec * 0.95);
        }, startMs);
        timeoutsRef.current.push(tRh);
      }

      cumMs += durationSec * 1000;
    });

    const finalT = setTimeout(() => {
      setPlayingItemId(null);
      setIsWalking(false);
    }, cumMs);
    timeoutsRef.current.push(finalT);
  };

  return (
    <div className="vl-page">
      <AudioDebugPanel />
      <div className="vl-shell">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="vl-header">
          <h1>Voicing Lab</h1>
          <div className="vl-header-subtitle">
            {progression.label} —{' '}
            <span className="vl-subtitle-roman">{progression.subtitle}</span>
          </div>
        </header>

        <ProgressionSelector
          value={progressionId}
          onChange={handleProgressionChange}
        />

        <section className="vl-progression">
          <div className="vl-progression-header">
            <div className="vl-progression-label">
              {progression.progressionLabel}
            </div>
            <div className="vl-progression-header-right">
              {showVariantToggle ? (
                <div
                  className="vl-variant-toggle"
                  role="tablist"
                  aria-label="Voicing variant"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={variantType === 'a'}
                    className={
                      'vl-variant-btn' + (variantType === 'a' ? ' active' : '')
                    }
                    onClick={() => handleVariantChange('a')}
                  >
                    Type A
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={variantType === 'b'}
                    className={
                      'vl-variant-btn' + (variantType === 'b' ? ' active' : '')
                    }
                    onClick={() => handleVariantChange('b')}
                  >
                    Type B
                  </button>
                </div>
              ) : null}
              <div className="vl-tempo-display">
                ♩=<strong>{progression.tempo}</strong>
              </div>
            </div>
          </div>
          {showKeySwitch ? (
            <div className="vl-key-switch">
              <button
                type="button"
                className="vl-key-switch-btn"
                onClick={() => cycleKey(-1)}
                aria-label="Previous key"
              >
                ← 前
              </button>
              <div className="vl-key-switch-display">
                Key:
                <strong>{currentKey.replace('b', '♭')}</strong>
              </div>
              <button
                type="button"
                className="vl-key-switch-btn"
                onClick={() => cycleKey(1)}
                aria-label="Next key"
              >
                次 →
              </button>
            </div>
          ) : null}
          {sections ? (
            <SectionTabs
              sections={sections}
              selectedIdx={selectedSectionIdx}
              onSelect={handleSectionChange}
              disabled={isWalking}
            />
          ) : null}
          {viewProgression.displayMode === 'chords-row' ? (
            <ChordsRow
              chords={viewProgression.chords}
              selectedItemId={effectiveSelectedId}
              playingItemId={playingItemId}
              onSelect={setSelectedItemId}
            />
          ) : (
            <BarsGrid
              progression={viewProgression}
              selectedItemId={effectiveSelectedId}
              playingItemId={playingItemId}
              onSelect={setSelectedItemId}
              visibleSection={visibleSection}
            />
          )}
        </section>

        {voicing ? (
          <section className="vl-detail">
            <div className="vl-detail-header">
              <div className="vl-detail-left">
                <div className="vl-chord-name">
                  <span className="vl-roman-large">{voicing.roman}</span>
                  <span className="vl-symbol-large">{voicing.symbol}</span>
                </div>
                <div className="vl-chord-degrees-large">
                  {voicing.degreesLabel}
                </div>
              </div>
              <div className="vl-chord-meta">
                <div className="vl-lh-label">
                  L.H.: {voicing.lh.map((n) => n.note).join(', ')}
                </div>
                <div className="vl-rh-label">
                  R.H.: {voicing.rh.map((n) => n.note).join(', ')}
                </div>
              </div>
            </div>

            <VoicingKeyboard
              lhNotes={voicing.lh}
              rhNotes={voicing.rh}
              commonNotes={commonNotes}
              showDegrees={showDegrees}
              anchorMode={anchorMode}
              anchorColor={anchorColor}
            />
          </section>
        ) : null}

        <section className="vl-controls">
          <div className="vl-controls-section">
            <div className="vl-controls-label">View</div>
            <div className="vl-toggle-row">
              <button
                type="button"
                className={'vl-toggle-item' + (showDegrees ? ' active' : '')}
                onClick={() => setShowDegrees((v) => !v)}
              >
                音度ラベル
              </button>
              <button
                type="button"
                className={'vl-toggle-item' + (showCommon ? ' active' : '')}
                onClick={() => setShowCommon((v) => !v)}
              >
                共通音ハイライト
              </button>
            </div>
            {anchorConfig?.enabled ? (
              <div
                className="vl-anchor-row"
                role="radiogroup"
                aria-label="3視点表示"
              >
                <div className="vl-anchor-label">3視点表示</div>
                <div className="vl-anchor-buttons">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={anchorMode === 'standard'}
                    className={
                      'vl-anchor-btn' +
                      (anchorMode === 'standard' ? ' active' : '')
                    }
                    onClick={() => setAnchorMode('standard')}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={anchorMode === 'top-note'}
                    className={
                      'vl-anchor-btn' +
                      (anchorMode === 'top-note' ? ' active' : '')
                    }
                    style={
                      anchorMode === 'top-note'
                        ? {
                            background: anchorConfig.anchors.topNote.color,
                            borderColor: anchorConfig.anchors.topNote.color,
                            color: '#1a1a1a',
                          }
                        : {
                            borderLeftColor: anchorConfig.anchors.topNote.color,
                          }
                    }
                    title={anchorConfig.anchors.topNote.description}
                    onClick={() => setAnchorMode('top-note')}
                  >
                    {anchorConfig.anchors.topNote.label}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={anchorMode === 'bottom-line'}
                    className={
                      'vl-anchor-btn' +
                      (anchorMode === 'bottom-line' ? ' active' : '')
                    }
                    style={
                      anchorMode === 'bottom-line'
                        ? {
                            background: anchorConfig.anchors.bottomLine.color,
                            borderColor: anchorConfig.anchors.bottomLine.color,
                            color: '#1a1a1a',
                          }
                        : {
                            borderLeftColor:
                              anchorConfig.anchors.bottomLine.color,
                          }
                    }
                    title={anchorConfig.anchors.bottomLine.description}
                    onClick={() => setAnchorMode('bottom-line')}
                  >
                    {anchorConfig.anchors.bottomLine.label}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={anchorMode === 'root'}
                    className={
                      'vl-anchor-btn' +
                      (anchorMode === 'root' ? ' active' : '')
                    }
                    style={
                      anchorMode === 'root'
                        ? {
                            background: anchorConfig.anchors.root.color,
                            borderColor: anchorConfig.anchors.root.color,
                            color: '#fff',
                          }
                        : {
                            borderLeftColor: anchorConfig.anchors.root.color,
                          }
                    }
                    title={anchorConfig.anchors.root.description}
                    onClick={() => setAnchorMode('root')}
                  >
                    {anchorConfig.anchors.root.label}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="vl-controls-section">
            <div className="vl-controls-label">Single Chord</div>
            <div className="vl-button-row">
              <button
                type="button"
                className="vl-btn vl-btn-lh"
                disabled={!ready}
                onClick={onPlayLH}
              >
                左手のみ
              </button>
              <button
                type="button"
                className="vl-btn vl-btn-rh"
                disabled={!ready}
                onClick={onPlayRH}
              >
                右手のみ
              </button>
              <button
                type="button"
                className="vl-btn"
                disabled={!ready}
                onClick={onPlayArp}
              >
                分散
              </button>
              <button
                type="button"
                className="vl-btn"
                disabled={!ready}
                onClick={onPlayBoth}
              >
                同時
              </button>
            </div>
          </div>

          <div className="vl-controls-section">
            <div className="vl-controls-label">Walk Through</div>
            <div className="vl-button-row">
              <button
                type="button"
                className="vl-btn vl-btn-primary"
                disabled={!ready || isWalking}
                onClick={() => {
                  void walkThrough();
                }}
              >
                ▶ 再生
              </button>
              <button
                type="button"
                className="vl-btn"
                disabled={!isWalking}
                onClick={stopWalk}
              >
                ■ 停止
              </button>
              <select
                className="vl-mode-select"
                value={playbackMode}
                onChange={(e) =>
                  setPlaybackMode(e.target.value as PlaybackMode)
                }
                disabled={isWalking}
                aria-label="再生モード"
              >
                <option value="voicing-only">コードのみ</option>
                <option value="walking-bass">+ Walking Bass</option>
                <option value="rhythm">+ Rhythm</option>
                <option value="both">+ Walking Bass + Rhythm</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
