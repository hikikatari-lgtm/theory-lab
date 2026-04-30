'use client';

import {
  Suspense,
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

function VoicingLabInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL is the source of truth for which progression is active.
  // Anything else (selectedItemId, playingItemId, isWalking) is local state.
  const urlProgId = searchParams.get('p');
  const progressionId =
    urlProgId && PROGRESSIONS[urlProgId] ? urlProgId : DEFAULT_PROGRESSION_ID;
  const progression = PROGRESSIONS[progressionId];

  const sequence = useMemo(() => buildSequence(progression), [progression]);

  const [selectedItemId, setSelectedItemId] = useState<string>(
    () => sequence[0]?.itemId ?? ''
  );
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const [showDegrees, setShowDegrees] = useState(true);
  const [showCommon, setShowCommon] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [isWalking, setIsWalking] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ready = loadState === 'ready';

  const stopWalk = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    releaseAllNotes();
    setPlayingItemId(null);
    setIsWalking(false);
  }, []);

  // Piano load
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

  // When the progression changes (URL nav, dropdown, browser back/forward),
  // stop any in-flight walk-through and snap selection to the new sequence's
  // first item so we don't show stale highlights.
  useEffect(() => {
    stopWalk();
    if (sequence.length > 0) {
      setSelectedItemId(sequence[0].itemId);
    }
  }, [progressionId, sequence, stopWalk]);

  const handleProgressionChange = (newId: string) => {
    if (newId === progressionId) return;
    stopWalk();
    // router.push triggers a Next.js client-side navigation; useSearchParams
    // updates and the effect above re-syncs selection. pushState (not
    // replaceState) so browser Back returns to the previous progression.
    router.push(`${pathname}?p=${newId}`, { scroll: false });
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

  // Common notes: any RH pitch class shared with the previous chord's RH.
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
            <div className="vl-tempo-display">
              ♩=<strong>{progression.tempo}</strong>
            </div>
          </div>
          {progression.displayMode === 'chords-row' ? (
            <ChordsRow
              chords={progression.chords}
              selectedItemId={effectiveSelectedId}
              playingItemId={playingItemId}
              onSelect={setSelectedItemId}
            />
          ) : (
            <BarsGrid
              progression={progression}
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

// useSearchParams forces opt-out of static rendering unless wrapped in a
// Suspense boundary; the fallback renders during SSR while client-side
// hydration takes over for the actual searchParams read.
export default function VoicingLabPage() {
  return (
    <Suspense fallback={null}>
      <VoicingLabInner />
    </Suspense>
  );
}
