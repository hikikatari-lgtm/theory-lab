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
import ArrangeKeyboard from './components/ArrangeKeyboard';
import ArrangeChordsRow from './components/ArrangeChordsRow';
import { PRESETS, PRESET_LIST, DEFAULT_PRESET_ID } from './data';
import type { ArrangeChord, ArrangeNote } from './data/types';

type LoadState = 'loading' | 'ready' | 'error';

export default function ArrangeLabClient() {
  const [presetId, setPresetId] = useState<string>(DEFAULT_PRESET_ID);
  const preset = PRESETS[presetId];

  const [versionId, setVersionId] = useState<string>(preset.versions[0].id);
  const version =
    preset.versions.find((v) => v.id === versionId) ?? preset.versions[0];
  const chords: ArrangeChord[] = version.chords;

  const [selectedId, setSelectedId] = useState<string>(chords[0]?.id ?? '');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showDegrees, setShowDegrees] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [isWalking, setIsWalking] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ready = loadState === 'ready';

  // バージョン全体のノート集合 — 鍵盤レンジを安定させる用。
  const rangeNotes = useMemo<ArrangeNote[]>(() => {
    const all: ArrangeNote[] = [];
    chords.forEach((c) => {
      all.push(...c.lh, ...c.rh);
    });
    return all;
  }, [chords]);

  const stopWalk = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    releaseAllNotes();
    setPlayingId(null);
    setIsWalking(false);
  }, []);

  // ピアノ音源のロード (一度だけ)
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

  // バージョン or プリセット切替で:
  //  - Walk Through を停止
  //  - 選択を 1 つ目にリセット (ID が新リストにあるなら維持)
  useEffect(() => {
    stopWalk();
    setSelectedId((cur) => {
      if (chords.find((c) => c.id === cur)) return cur;
      return chords[0]?.id ?? '';
    });
  }, [chords, stopWalk]);

  // プリセット切替時はバージョンを先頭に戻す
  useEffect(() => {
    setVersionId(preset.versions[0].id);
  }, [preset]);

  const selectedChord =
    chords.find((c) => c.id === selectedId) ?? chords[0] ?? null;
  const selectedIdx = selectedChord
    ? chords.findIndex((c) => c.id === selectedChord.id)
    : -1;

  const playChord = useCallback(
    async (chord: ArrangeChord) => {
      if (!soundOn || !ready) return;
      const tones = [
        ...chord.lh.map((n) => normalizeNote(n.note)),
        ...chord.rh.map((n) => normalizeNote(n.note)),
      ];
      void playNotes(tones, 'block');
    },
    [soundOn, ready]
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const c = chords.find((x) => x.id === id);
    if (c) void playChord(c);
  };

  const handlePrev = () => {
    if (selectedIdx <= 0) return;
    const next = chords[selectedIdx - 1];
    setSelectedId(next.id);
    void playChord(next);
  };
  const handleNext = () => {
    if (selectedIdx < 0 || selectedIdx >= chords.length - 1) return;
    const next = chords[selectedIdx + 1];
    setSelectedId(next.id);
    void playChord(next);
  };

  const walkThrough = async () => {
    if (isWalking || !ready || chords.length === 0) return;
    setIsWalking(true);
    const beatSec = 60 / preset.tempo;
    const chordBeats = 4;
    const durMs = chordBeats * beatSec * 1000;

    chords.forEach((chord, i) => {
      const startMs = i * durMs;
      const t = setTimeout(() => {
        setSelectedId(chord.id);
        setPlayingId(chord.id);
        if (soundOn) {
          const tones = [
            ...chord.lh.map((n) => normalizeNote(n.note)),
            ...chord.rh.map((n) => normalizeNote(n.note)),
          ];
          void playSustained(tones, (chordBeats * beatSec) * 0.95);
        }
      }, startMs);
      timeoutsRef.current.push(t);
    });

    const totalMs = chords.length * durMs;
    const finalT = setTimeout(() => {
      setPlayingId(null);
      setIsWalking(false);
    }, totalMs);
    timeoutsRef.current.push(finalT);
  };

  const handleVersionChange = (newId: string) => {
    if (newId === versionId) return;
    setVersionId(newId);
  };

  return (
    <div className="al-page">
      <div className="al-shell">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="al-header">
          <h1>Chord Arrange Lab</h1>
          <div className="al-header-subtitle">
            シンプルなコード進行が、パッシングコードやオンコードでどう変化するか
          </div>
        </header>

        <div className="al-selector">
          <span className="al-selector-label">PRESET</span>
          <select
            className="al-selector-select"
            value={presetId}
            onChange={(e) => setPresetId(e.target.value)}
          >
            {PRESET_LIST.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <section className="al-progression">
          <div className="al-progression-header">
            <div className="al-progression-label">
              {preset.label} —{' '}
              <span className="al-subtitle-roman">{preset.subtitle}</span>
            </div>
            <div className="al-tempo-display">
              ♩=<strong>{preset.tempo}</strong>
            </div>
          </div>

          <div
            className="al-version-tabs"
            role="tablist"
            aria-label="Arrange version"
          >
            {preset.versions.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={v.id === versionId}
                className={
                  'al-version-tab' + (v.id === versionId ? ' active' : '')
                }
                onClick={() => handleVersionChange(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <ArrangeChordsRow
            chords={chords}
            selectedId={selectedChord?.id ?? null}
            playingId={playingId}
            onSelect={handleSelect}
          />
        </section>

        {selectedChord ? (
          <section className="al-detail">
            <div className="al-detail-header">
              <div className="al-detail-left">
                <div className="al-chord-name">
                  <span className="al-roman-large">{selectedChord.roman}</span>
                  <span className="al-symbol-large">{selectedChord.symbol}</span>
                </div>
                <div className="al-chord-degrees-large">
                  {selectedChord.degreesLabel}
                </div>
                {selectedChord.technique ? (
                  <div className="al-technique">
                    <span className="al-technique-tag">TECHNIQUE</span>
                    {selectedChord.technique}
                  </div>
                ) : null}
              </div>
              <div className="al-chord-meta">
                <div className="al-lh-label">
                  L.H.: {selectedChord.lh.map((n) => n.note).join(', ')}
                </div>
                <div className="al-rh-label">
                  R.H.: {selectedChord.rh.map((n) => n.note).join(', ')}
                </div>
              </div>
            </div>

            <ArrangeKeyboard
              lhNotes={selectedChord.lh}
              rhNotes={selectedChord.rh}
              rangeNotes={rangeNotes}
              showDegrees={showDegrees}
            />
          </section>
        ) : null}

        <section className="al-controls">
          <div className="al-controls-section">
            <div className="al-controls-label">View</div>
            <div className="al-toggle-row">
              <button
                type="button"
                className={'al-toggle-item' + (showDegrees ? ' active' : '')}
                onClick={() => setShowDegrees((v) => !v)}
              >
                音度ラベル
              </button>
              <button
                type="button"
                className={'al-toggle-item' + (soundOn ? ' active' : '')}
                onClick={() => setSoundOn((v) => !v)}
              >
                サウンド {soundOn ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <div className="al-controls-section">
            <div className="al-controls-label">Step</div>
            <div className="al-button-row">
              <button
                type="button"
                className="al-btn"
                onClick={handlePrev}
                disabled={selectedIdx <= 0}
              >
                ← 前へ
              </button>
              <button
                type="button"
                className="al-btn"
                onClick={handleNext}
                disabled={selectedIdx < 0 || selectedIdx >= chords.length - 1}
              >
                次へ →
              </button>
            </div>
          </div>

          <div className="al-controls-section">
            <div className="al-controls-label">Walk Through</div>
            <div className="al-button-row">
              <button
                type="button"
                className="al-btn al-btn-primary"
                disabled={!ready || isWalking}
                onClick={() => {
                  void walkThrough();
                }}
              >
                ▶ 通し再生
              </button>
              <button
                type="button"
                className="al-btn"
                disabled={!isWalking}
                onClick={stopWalk}
              >
                ■ 停止
              </button>
            </div>
          </div>

          {loadState === 'loading' ? (
            <div className="al-status">音源を読み込み中…</div>
          ) : loadState === 'error' ? (
            <div className="al-status al-status-error">
              音源の読み込みに失敗しました
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
