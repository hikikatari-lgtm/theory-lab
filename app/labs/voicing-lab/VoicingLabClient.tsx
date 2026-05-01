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
import {
  PROGRESSIONS,
  DEFAULT_PROGRESSION_ID,
  buildSequence,
} from './data';

type LoadState = 'loading' | 'ready' | 'error';

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

  // For chords-row progressions, derive the displayed chord set by:
  //  1. picking the active variant when hasVariants (251 Type A/B), and
  //  2. transposing from baseKey → currentKey when supportsAllKeys.
  // Bars-grid progressions pass through unchanged.
  const viewProgression = useMemo(() => {
    if (progression.displayMode !== 'chords-row') return progression;
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
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const showVariantToggle =
    progression.displayMode === 'chords-row' &&
    !!progression.hasVariants &&
    !!progression.variants;
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
        prog.displayMode === 'chords-row' &&
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
      prog.displayMode === 'chords-row' &&
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
  useEffect(() => {
    stopWalk();
    setSelectedItemId((cur) => {
      if (sequence.find((s) => s.itemId === cur)) return cur;
      return sequence[0]?.itemId ?? '';
    });
  }, [sequence, stopWalk]);

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
      ...voicing.lh.map(normalizeNote),
      ...voicing.rh.map((n) => normalizeNote(n.note)),
    ];
  }, [voicing]);

  const onPlayLH = () => {
    if (!voicing) return;
    void playNotes(voicing.lh.map(normalizeNote), 'block');
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
    sequence.forEach((item) => {
      const durationSec = item.beats * beatSec;
      const t = setTimeout(() => {
        setSelectedItemId(item.itemId);
        setPlayingItemId(item.itemId);
        const notes = [
          ...item.voicing.lh.map(normalizeNote),
          ...item.voicing.rh.map((n) => normalizeNote(n.note)),
        ];
        void playSustained(notes, durationSec * 0.95);
      }, cumMs);
      timeoutsRef.current.push(t);
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
                  L.H.: {voicing.lh.join(', ')}
                </div>
                <div className="vl-rh-label">
                  R.H.: {voicing.rh.map((n) => n.note).join(', ')}
                </div>
              </div>
            </div>

            <VoicingKeyboard
              rhNotes={voicing.rh}
              commonNotes={commonNotes}
              showDegrees={showDegrees}
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
