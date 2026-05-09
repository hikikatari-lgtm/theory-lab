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
import type { ArrangeChord, ArrangeChordSlot, ArrangeNote } from './data/types';

type LoadState = 'loading' | 'ready' | 'error';

// 1 小節を 4 拍として、小節内の各コードに割り当てる拍数。
const BEATS_PER_BAR = 4;

type FlatSlot = {
  slot: ArrangeChordSlot;
  chord: ArrangeChord;
  slotId: string; // `${barIdx}-${chordIdxInBar}`
  barIdx: number;
  chordIdx: number;
  beats: number;
};

export default function ArrangeLabClient() {
  const [presetId, setPresetId] = useState<string>(DEFAULT_PRESET_ID);
  const preset = PRESETS[presetId];

  const [versionId, setVersionId] = useState<string>(preset.versions[0].id);
  const version =
    preset.versions.find((v) => v.id === versionId) ?? preset.versions[0];
  const bars = version.bars;

  // bars をフラット化。slotId は (barIdx, chordIdxInBar) なので、
  // 同じ chord が複数の slot を占有してもそれぞれ独立に扱える。
  // 各 slot の beats は明示値 (slot.beats) を最優先、未指定なら
  // 小節内均等割り (BEATS_PER_BAR / 小節内コード数)。
  const flatSlots = useMemo<FlatSlot[]>(() => {
    const out: FlatSlot[] = [];
    bars.forEach((bar, barIdx) => {
      const evenBeats = BEATS_PER_BAR / bar.chords.length;
      bar.chords.forEach((slot, chordIdx) => {
        out.push({
          slot,
          chord: slot.chord,
          slotId: `${barIdx}-${chordIdx}`,
          barIdx,
          chordIdx,
          beats: slot.beats ?? evenBeats,
        });
      });
    });
    return out;
  }, [bars]);

  const [selectedSlotId, setSelectedSlotId] = useState<string>(
    flatSlots[0]?.slotId ?? ''
  );
  const [playingSlotId, setPlayingSlotId] = useState<string | null>(null);
  const [showDegrees, setShowDegrees] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [isWalking, setIsWalking] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const ready = loadState === 'ready';

  // バージョン全体のノート集合 — 鍵盤レンジを安定させる用。
  const rangeNotes = useMemo<ArrangeNote[]>(() => {
    const all: ArrangeNote[] = [];
    flatSlots.forEach(({ chord }) => {
      all.push(...chord.lh, ...chord.rh);
    });
    return all;
  }, [flatSlots]);

  const stopWalk = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    releaseAllNotes();
    setPlayingSlotId(null);
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
  //  - 選択を 1 つ目の slot にリセット (slotId が新リストにあるなら維持)
  useEffect(() => {
    stopWalk();
    setSelectedSlotId((cur) => {
      if (flatSlots.find((f) => f.slotId === cur)) return cur;
      return flatSlots[0]?.slotId ?? '';
    });
  }, [flatSlots, stopWalk]);

  // プリセット切替時はバージョンを先頭に戻す
  useEffect(() => {
    setVersionId(preset.versions[0].id);
  }, [preset]);

  const selectedIdx = flatSlots.findIndex((f) => f.slotId === selectedSlotId);
  const selectedEntry =
    selectedIdx >= 0 ? flatSlots[selectedIdx] : flatSlots[0] ?? null;
  const selectedChord = selectedEntry?.chord ?? null;
  const selectedSlot = selectedEntry?.slot ?? null;

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

  const handleSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    const entry = flatSlots.find((f) => f.slotId === slotId);
    if (entry) void playChord(entry.chord);
  };

  const handlePrev = () => {
    if (selectedIdx <= 0) return;
    const next = flatSlots[selectedIdx - 1];
    setSelectedSlotId(next.slotId);
    void playChord(next.chord);
  };
  const handleNext = () => {
    if (selectedIdx < 0 || selectedIdx >= flatSlots.length - 1) return;
    const next = flatSlots[selectedIdx + 1];
    setSelectedSlotId(next.slotId);
    void playChord(next.chord);
  };

  const walkThrough = async () => {
    if (isWalking || !ready || flatSlots.length === 0) return;
    setIsWalking(true);
    const beatSec = 60 / preset.tempo;
    let cumMs = 0;

    flatSlots.forEach((entry) => {
      const { chord, slotId, beats } = entry;
      const startMs = cumMs;
      const durSec = beats * beatSec;

      const t = setTimeout(() => {
        setSelectedSlotId(slotId);
        setPlayingSlotId(slotId);
        if (soundOn) {
          const tones = [
            ...chord.lh.map((n) => normalizeNote(n.note)),
            ...chord.rh.map((n) => normalizeNote(n.note)),
          ];
          void playSustained(tones, durSec * 0.95);
        }
      }, startMs);
      timeoutsRef.current.push(t);

      cumMs += durSec * 1000;
    });

    const finalT = setTimeout(() => {
      setPlayingSlotId(null);
      setIsWalking(false);
    }, cumMs);
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
            bars={bars}
            selectedSlotId={selectedEntry?.slotId ?? null}
            playingSlotId={playingSlotId}
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
                {selectedSlot?.technique ? (
                  <div className="al-technique">
                    <span className="al-technique-tag">TECHNIQUE</span>
                    {selectedSlot.technique}
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
                disabled={
                  selectedIdx < 0 || selectedIdx >= flatSlots.length - 1
                }
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
