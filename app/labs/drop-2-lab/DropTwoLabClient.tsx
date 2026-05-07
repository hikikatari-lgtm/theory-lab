'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LabHeader from '@/components/LabHeader';
import { normalizeNote } from '@/lib/chord-theory';
import {
  initPiano,
  playNotes,
  playSustained,
  releaseAllNotes,
} from '@/lib/audio';
import VoicingKeyboard from './components/VoicingKeyboard';
import ChordsRow from './components/ChordsRow';
import DropTwoStepTabs from './components/DropTwoStepTabs';
import {
  DROP_TWO_PROGRESSIONS,
  DEFAULT_DROP_TWO_PROGRESSION_ID,
  type DropTwoStepIndex,
} from './data';

type LoadState = 'loading' | 'ready' | 'error';

// MVP local state — no URL sync, no variants, no key cycling. The lab
// has exactly one progression and one orthogonal axis (Step 1..4).
// Selection persists across step changes (chord stays the same when the
// user clicks a different step, and vice versa).
export default function DropTwoLabClient() {
  const progression =
    DROP_TWO_PROGRESSIONS[DEFAULT_DROP_TWO_PROGRESSION_ID];

  const [selectedChordId, setSelectedChordId] = useState<string>(
    () => progression.chords[0]?.id ?? ''
  );
  const [selectedStep, setSelectedStep] = useState<DropTwoStepIndex>(1);
  const [playingChordId, setPlayingChordId] = useState<string | null>(null);
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
    setPlayingChordId(null);
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

  // Resolve the currently displayed voicing: (chord × step). Falls back
  // to the first chord if `selectedChordId` is somehow stale (defensive
  // — should never trigger since the chord list is fixed).
  const selectedChord =
    progression.chords.find((c) => c.id === selectedChordId) ??
    progression.chords[0] ??
    null;
  const voicing = selectedChord ? selectedChord.steps[selectedStep] : null;

  // Previous chord (within the progression) is for common-note
  // highlighting on RH. The "previous" of the first chord is null.
  const selectedIdx = selectedChord
    ? progression.chords.findIndex((c) => c.id === selectedChord.id)
    : -1;
  const prevChord =
    selectedIdx > 0 ? progression.chords[selectedIdx - 1] : null;
  const prevVoicing = prevChord ? prevChord.steps[selectedStep] : null;

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

  // Step change stops any walkthrough — the displayed voicing changes
  // mid-progression otherwise and the running playback would suddenly
  // play different notes than what the user sees on the keyboard.
  const handleStepChange = useCallback(
    (next: DropTwoStepIndex) => {
      if (next === selectedStep) return;
      stopWalk();
      setSelectedStep(next);
    },
    [selectedStep, stopWalk]
  );

  const handleChordSelect = useCallback(
    (id: string) => {
      // Allow clicking a card during walk-through to jump selection,
      // but don't stop the playback — matches Voicing Lab behavior.
      setSelectedChordId(id);
    },
    []
  );

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

  // Walk Through plays the 3 chords in order at the current step.
  // 4 beats per chord at progression.tempo. Each chord sustains its
  // (LH+RH at selectedStep) for ~95% of the chord duration — the same
  // pattern Voicing Lab uses for its "コードのみ" mode.
  const walkThrough = async () => {
    if (isWalking || !ready || progression.chords.length === 0) return;
    setIsWalking(true);
    const beatSec = 60 / progression.tempo;
    const chordBeats = 4;
    const durationSec = chordBeats * beatSec;
    let cumMs = 0;

    progression.chords.forEach((chord) => {
      const startMs = cumMs;
      const stepVoicing = chord.steps[selectedStep];
      const lhNotes = stepVoicing.lh.map((n) => normalizeNote(n.note));
      const rhNotes = stepVoicing.rh.map((n) => normalizeNote(n.note));

      const tHighlight = setTimeout(() => {
        setSelectedChordId(chord.id);
        setPlayingChordId(chord.id);
      }, startMs);
      timeoutsRef.current.push(tHighlight);

      const tLh = setTimeout(() => {
        void playSustained(lhNotes, durationSec * 0.95);
      }, startMs);
      timeoutsRef.current.push(tLh);

      const tRh = setTimeout(() => {
        void playSustained(rhNotes, durationSec * 0.95);
      }, startMs);
      timeoutsRef.current.push(tRh);

      cumMs += durationSec * 1000;
    });

    const finalT = setTimeout(() => {
      setPlayingChordId(null);
      setIsWalking(false);
    }, cumMs);
    timeoutsRef.current.push(finalT);
  };

  return (
    <div className="vl-page">
      <div className="vl-shell">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="vl-header">
          <h1>Drop 2 Lab</h1>
          <div className="vl-header-subtitle">
            {progression.label} —{' '}
            <span className="vl-subtitle-roman">{progression.subtitle}</span>
          </div>
        </header>

        {/* Progression selector is locked to the single MVP entry — render
            it disabled so the UI surface matches Voicing Lab even though
            there's only one option. */}
        <section className="vl-selector">
          <span className="vl-selector-label">進行を選ぶ</span>
          <select
            className="vl-selector-select"
            value={progression.id}
            disabled
            aria-disabled
          >
            <option value={progression.id}>
              {progression.label} - 2-5-1 in C
            </option>
          </select>
        </section>

        <section className="vl-progression">
          <div className="vl-progression-header">
            <div className="vl-progression-label">
              {progression.progressionLabel}
            </div>
            <div className="vl-progression-header-right">
              <DropTwoStepTabs
                value={selectedStep}
                onChange={handleStepChange}
              />
              <div className="vl-tempo-display">
                ♩=<strong>{progression.tempo}</strong>
              </div>
            </div>
          </div>
          <ChordsRow
            chords={progression.chords}
            selectedChordId={selectedChord?.id ?? null}
            playingChordId={playingChordId}
            onSelect={handleChordSelect}
          />
        </section>

        {voicing && selectedChord ? (
          <section className="vl-detail">
            <div className="vl-detail-header">
              <div className="vl-detail-left">
                <div className="vl-chord-name">
                  <span className="vl-roman-large">{selectedChord.roman}</span>
                  <span className="vl-symbol-large">{selectedChord.symbol}</span>
                </div>
                <div className="vl-chord-degrees-large">
                  {selectedChord.degreesLabel}
                </div>
              </div>
              <div className="vl-chord-meta">
                <div className="vl-lh-label">
                  L.H.: {voicing.lh.map((n) => n.note).join(', ') || '—'}
                </div>
                <div className="vl-rh-label">
                  R.H.: {voicing.rh.map((n) => n.note).join(', ') || '—'}
                </div>
              </div>
            </div>

            <VoicingKeyboard
              lhNotes={voicing.lh}
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
