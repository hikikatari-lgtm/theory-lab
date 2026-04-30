'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import LabHeader from '@/components/LabHeader';
import { normalizeNote } from '@/lib/chord-theory';
import {
  initPiano,
  playNotes,
  playSustained,
  releaseAllNotes,
} from '@/lib/audio';
import VoicingCard from './components/VoicingCard';
import VoicingKeyboard from './components/VoicingKeyboard';
import {
  minorTurnaround,
  type ChordVoicing,
} from './data/minor-turnaround';

type LoadState = 'loading' | 'ready' | 'error';

export default function VoicingLabPage() {
  const progression = minorTurnaround;
  const [selectedId, setSelectedId] = useState<string>(progression.chords[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showDegrees, setShowDegrees] = useState(true);
  const [showCommon, setShowCommon] = useState(false);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [isWalking, setIsWalking] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ready = loadState === 'ready';

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

  const selected: ChordVoicing = useMemo(
    () =>
      progression.chords.find((c) => c.id === selectedId) ?? progression.chords[0],
    [selectedId, progression.chords]
  );
  const selectedIdx = progression.chords.findIndex((c) => c.id === selected.id);
  const prevChord: ChordVoicing | null =
    selectedIdx > 0 ? progression.chords[selectedIdx - 1] : null;

  const commonNotes = useMemo(() => {
    if (!showCommon || !prevChord) return new Set<string>();
    const prevPCs = new Set(
      prevChord.rh.map((n) => normalizeNote(n.note).replace(/\d+/, ''))
    );
    const result = new Set<string>();
    selected.rh.forEach((n) => {
      const pc = normalizeNote(n.note).replace(/\d+/, '');
      if (prevPCs.has(pc)) result.add(normalizeNote(n.note));
    });
    return result;
  }, [showCommon, prevChord, selected]);

  const allToneNotes = useMemo(
    () => [
      ...selected.lh.map(normalizeNote),
      ...selected.rh.map((n) => normalizeNote(n.note)),
    ],
    [selected]
  );

  const onPlayLH = () => {
    void playNotes(selected.lh.map(normalizeNote), 'block');
  };
  const onPlayRH = () => {
    void playNotes(selected.rh.map((n) => normalizeNote(n.note)), 'block');
  };
  const onPlayBoth = () => {
    void playNotes(allToneNotes, 'block');
  };
  const onPlayArp = () => {
    void playNotes(allToneNotes, 'broken');
  };

  const walkThrough = async () => {
    if (isWalking || !ready) return;
    setIsWalking(true);
    const beatSec = 60 / progression.tempo;
    const chordDurationSec = beatSec * 4;
    let cumMs = 0;
    progression.chords.forEach((chord) => {
      const t = setTimeout(() => {
        setSelectedId(chord.id);
        setPlayingId(chord.id);
        const notes = [
          ...chord.lh.map(normalizeNote),
          ...chord.rh.map((n) => normalizeNote(n.note)),
        ];
        void playSustained(notes, chordDurationSec * 0.95);
      }, cumMs);
      timeoutsRef.current.push(t);
      cumMs += chordDurationSec * 1000;
    });
    const finalT = setTimeout(() => {
      setPlayingId(null);
      setIsWalking(false);
    }, cumMs);
    timeoutsRef.current.push(finalT);
  };

  const stopWalk = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    releaseAllNotes();
    setPlayingId(null);
    setIsWalking(false);
  };

  const romanLine = progression.chords.map((c) => c.roman).join(' - ');

  return (
    <div className="vl-page">
      <div className="vl-shell">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="vl-header">
          <h1>Voicing Lab</h1>
          <div className="vl-header-subtitle">
            {progression.title} in {progression.key} —{' '}
            <span className="vl-subtitle-roman">{romanLine}</span>
          </div>
        </header>

        <section className="vl-progression">
          <div className="vl-progression-header">
            <div className="vl-progression-label">
              Progression — {progression.chords.length} chords
            </div>
            <div className="vl-tempo-display">
              ♩=<strong>{progression.tempo}</strong>
            </div>
          </div>
          <div className="vl-chords-row">
            {progression.chords.map((chord) => (
              <VoicingCard
                key={chord.id}
                chord={chord}
                selected={chord.id === selectedId}
                playing={chord.id === playingId}
                onClick={() => setSelectedId(chord.id)}
              />
            ))}
          </div>
        </section>

        <section className="vl-detail">
          <div className="vl-detail-header">
            <div className="vl-detail-left">
              <div className="vl-chord-name">
                <span className="vl-roman-large">{selected.roman}</span>
                <span className="vl-symbol-large">{selected.symbol}</span>
              </div>
              <div className="vl-chord-degrees-large">{selected.degreesLabel}</div>
            </div>
            <div className="vl-chord-meta">
              <div className="vl-lh-label">L.H.: {selected.lh.join(', ')}</div>
              <div className="vl-rh-label">
                R.H.: {selected.rh.map((n) => n.note).join(', ')}
              </div>
            </div>
          </div>

          <VoicingKeyboard
            rhNotes={selected.rh}
            commonNotes={commonNotes}
            showDegrees={showDegrees}
          />
        </section>

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
                ▶ {progression.chords.length}コードを再生
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
