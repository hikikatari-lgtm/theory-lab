'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import LabHeader from '@/components/LabHeader';
import { PRESETS, getPreset, type Preset } from './data/presets';
import {
  initMetronome,
  startMetronome,
  stopMetronome,
  setMetronomeTempo,
} from './audio/metronome';
import {
  initBacking,
  triggerDrum,
  triggerBass,
  stopBacking,
} from './audio/synth-backing';

const COUNT_IN_BEATS = 4;

// Seconds for one quarter-note beat at a given BPM.
function beatDurationSec(bpm: number) {
  return 60 / bpm;
}

// Flatten a preset's bars × chords into a per-beat array so we can answer
// "what chord is at progression-beat N?" in O(1). Each entry stores:
//   barIdx     — 0-based bar index
//   chordIdx   — which chord within that bar
//   isBarStart — true if this is the first beat of the bar (used for accent)
type BeatSlot = {
  barIdx: number;
  chordIdx: number;
  isBarStart: boolean;
};

function buildBeatMap(preset: Preset): BeatSlot[] {
  const slots: BeatSlot[] = [];
  preset.bars.forEach((bar, barIdx) => {
    let beatInBar = 0;
    bar.chords.forEach((chord, chordIdx) => {
      for (let b = 0; b < chord.beats; b++) {
        slots.push({
          barIdx,
          chordIdx,
          isBarStart: beatInBar === 0,
        });
        beatInBar += 1;
      }
    });
  });
  return slots;
}

type LoopMode = 'off' | 'all' | 'range';

type Props = {
  initialPresetId: string;
};

export default function PracticeLabClient({ initialPresetId }: Props) {
  const [presetId, setPresetId] = useState(initialPresetId);
  const preset = useMemo(() => getPreset(presetId), [presetId]);
  const beatMap = useMemo(() => buildBeatMap(preset), [preset]);
  const totalBeats = beatMap.length;
  const totalBars = preset.bars.length;

  // Per-beat bass info: note to play if this is the first beat of a chord.
  const bassMap = useMemo(() => buildBassMap(preset), [preset]);

  const [tempo, setTempo] = useState(preset.tempo);
  const [loopMode, setLoopMode] = useState<LoopMode>('all');
  // 1-based bar numbers in UI; converted to 0-based internally.
  const [loopStartBar, setLoopStartBar] = useState(1);
  const [loopEndBar, setLoopEndBar] = useState(totalBars);

  // Backing track audio element (created once per mount).
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Whether the metronome click is audible while backing track plays.
  const [clickMuted, setClickMuted] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  // currentTick is the global tick index emitted by the metronome. -1 means
  // "not playing". During count-in it's in [0, COUNT_IN_BEATS); after that
  // the progression has started.
  const [currentTick, setCurrentTick] = useState<number>(-1);

  // Keep tempo in sync with the running transport.
  useEffect(() => {
    if (isPlaying) setMetronomeTempo(tempo);
  }, [tempo, isPlaying]);

  // Create / replace the audio element whenever the preset's audioUrl changes.
  useEffect(() => {
    if (!preset.audioUrl) {
      audioRef.current = null;
      return;
    }
    const el = new Audio(preset.audioUrl);
    el.preload = 'auto';
    audioRef.current = el;
    return () => {
      el.pause();
    };
  }, [preset.audioUrl]);

  // When the preset changes, stop playback and reset loop range / tempo so
  // we don't carry stale state across presets.
  useEffect(() => {
    stopMetronome();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTick(-1);
    setTempo(preset.tempo);
    setLoopStartBar(1);
    setLoopEndBar(preset.bars.length);
  }, [presetId, preset]);

  // Eagerly initialise synths so first-click latency is just Tone.start().
  useEffect(() => {
    initMetronome().catch(() => {});
    initBacking().catch(() => {});
  }, []);

  // Stop on unmount.
  useEffect(() => {
    return () => {
      stopMetronome();
    };
  }, []);

  // --- progression position from tick ---
  // tickIndex semantics:
  //   0 .. COUNT_IN_BEATS-1 → count-in clicks (no chord yet)
  //   COUNT_IN_BEATS onwards → progression beat 0, 1, 2, ...
  //
  // Loop ranges are inclusive bar indices (1-based in UI). We convert them
  // to a beat range and modulo the progression beat into that range.
  const loopBeats = useMemo(() => {
    if (loopMode === 'off') return null;
    if (loopMode === 'all') return { startBeat: 0, endBeat: totalBeats };
    // range mode
    const startBarIdx = Math.max(0, Math.min(totalBars - 1, loopStartBar - 1));
    const endBarIdx = Math.max(startBarIdx, Math.min(totalBars - 1, loopEndBar - 1));
    let startBeat = 0;
    for (let i = 0; i < startBarIdx; i++) startBeat += beatsInBar(preset, i);
    let endBeat = startBeat;
    for (let i = startBarIdx; i <= endBarIdx; i++) endBeat += beatsInBar(preset, i);
    return { startBeat, endBeat };
  }, [loopMode, loopStartBar, loopEndBar, totalBars, preset, totalBeats]);

  const positionInfo = useMemo(() => {
    if (currentTick < 0) {
      return { phase: 'idle' as const };
    }
    if (currentTick < COUNT_IN_BEATS) {
      return {
        phase: 'count-in' as const,
        countInRemaining: COUNT_IN_BEATS - currentTick,
      };
    }
    const progressionBeat = currentTick - COUNT_IN_BEATS;
    let effectiveBeat: number;
    if (loopBeats) {
      const len = loopBeats.endBeat - loopBeats.startBeat;
      effectiveBeat = loopBeats.startBeat + (progressionBeat % len);
    } else {
      effectiveBeat = progressionBeat;
    }
    if (effectiveBeat >= totalBeats) {
      return { phase: 'done' as const };
    }
    const slot = beatMap[effectiveBeat];
    const beatInBar = beatPositionInBar(preset, slot.barIdx, effectiveBeat);
    return {
      phase: 'playing' as const,
      barIdx: slot.barIdx,
      chordIdx: slot.chordIdx,
      beatInBar,
      totalBeatsInBar: beatsInBar(preset, slot.barIdx),
    };
  }, [currentTick, loopBeats, beatMap, totalBeats, preset]);

  // --- play / stop ---
  function handleStart() {
    if (isPlaying) return;
    setCurrentTick(-1);
    setIsPlaying(true);

    // If the preset has a backing track, schedule audio so beat 1 of the
    // progression aligns with the first chord. The count-in takes
    // COUNT_IN_BEATS quarter-notes; audio starts `countInSec` seconds before
    // the progression, offset by audioStartSec into the file.
    if (audioRef.current && preset.audioUrl) {
      const countInSec = COUNT_IN_BEATS * beatDurationSec(tempo);
      const startOffset = (preset.audioStartSec ?? 0) - countInSec;
      const el = audioRef.current;
      if (startOffset >= 0) {
        // Audio starts partway through the file — play immediately.
        el.currentTime = startOffset;
        el.play().catch(() => {});
      } else {
        // Audio starts before the beginning of the file — delay playback.
        el.currentTime = 0;
        const delayMs = -startOffset * 1000;
        setTimeout(() => {
          if (el) el.play().catch(() => {});
        }, delayMs);
      }
    }

    // Capture loop-state values in closure so onBeat/isAccent don't
    // close over stale React state from a previous render.
    const capturedLoopBeats = loopBeats;
    const capturedTotalBeats = totalBeats;
    const capturedBassMap = bassMap;
    const capturedTempo = tempo;
    const hasSynth = preset.synthBacking === true;

    startMetronome({
      tempo,
      // Auto-mute click when synth backing provides the pulse.
      clickMuted: hasSynth ? true : clickMuted,
      onTick: (tickIndex) => {
        setCurrentTick(tickIndex);
      },
      isAccent: (tickIndex) => {
        if (tickIndex < COUNT_IN_BEATS) return true;
        const progressionBeat = tickIndex - COUNT_IN_BEATS;
        let effectiveBeat: number;
        if (capturedLoopBeats) {
          const len = capturedLoopBeats.endBeat - capturedLoopBeats.startBeat;
          effectiveBeat = capturedLoopBeats.startBeat + (progressionBeat % len);
        } else {
          effectiveBeat = progressionBeat;
        }
        if (effectiveBeat >= capturedTotalBeats) return false;
        return beatMap[effectiveBeat].isBarStart;
      },
      shouldStop: (tickIndex) => {
        if (capturedLoopBeats) return false;
        const progressionBeat = tickIndex - COUNT_IN_BEATS;
        return progressionBeat >= capturedTotalBeats - 1;
      },
      onBeat: hasSynth
        ? (tickIndex, audioTime) => {
            // --- Drums (every tick, including count-in) ---
            const beatInBar = tickIndex % 4;
            triggerDrum(beatInBar, audioTime);

            // --- Bass (only during progression, on chord beat 1) ---
            if (tickIndex < COUNT_IN_BEATS) return;
            const progressionBeat = tickIndex - COUNT_IN_BEATS;
            let effectiveBeat: number;
            if (capturedLoopBeats) {
              const len = capturedLoopBeats.endBeat - capturedLoopBeats.startBeat;
              effectiveBeat = capturedLoopBeats.startBeat + (progressionBeat % len);
            } else {
              effectiveBeat = progressionBeat;
            }
            if (effectiveBeat >= capturedTotalBeats) return;
            const bassInfo = capturedBassMap[effectiveBeat];
            if (bassInfo) {
              triggerBass(bassInfo.note, bassInfo.durationBeats, capturedTempo, audioTime);
            }
          }
        : undefined,
    }).catch(() => {});
  }

  function handleStop() {
    stopMetronome();
    stopBacking();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTick(-1);
  }

  // --- derived UI state ---
  const isPlayingProgression =
    positionInfo.phase === 'playing' || positionInfo.phase === 'count-in';
  const activeBarIdx =
    positionInfo.phase === 'playing' ? positionInfo.barIdx : -1;
  const activeChordIdx =
    positionInfo.phase === 'playing' ? positionInfo.chordIdx : -1;

  return (
    <div className="pl-page">
      <div className="pl-shell">
        <LabHeader backHref="/" backLabel="Theory Lab" />

        <header className="pl-header">
          <h1>Practice Lab</h1>
          <div className="pl-header-subtitle">
            バッキングトラックに合わせてコード進行を練習
          </div>
        </header>

        <div className="pl-selector">
          <label className="pl-selector-label" htmlFor="pl-preset">
            Preset
          </label>
          <select
            id="pl-preset"
            className="pl-selector-select"
            value={presetId}
            onChange={(e) => setPresetId(e.target.value)}
          >
            {PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pl-info">
          <div className="pl-info-title">{preset.name}</div>
          <div className="pl-info-meta">
            Key {preset.key} <span className="pl-dot">·</span>{' '}
            <span className="pl-tempo-symbol">♩</span>= {tempo}
          </div>
        </div>

        <div className="pl-tempo-block">
          <div className="pl-tempo-row">
            <span className="pl-tempo-label">Tempo</span>
            <span className="pl-tempo-value">{tempo} BPM</span>
          </div>
          <input
            className="pl-tempo-slider"
            type="range"
            min={60}
            max={200}
            step={1}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
          />
          <div className="pl-tempo-scale">
            <span>60</span>
            <span>120</span>
            <span>200</span>
          </div>
        </div>

        {preset.audioUrl && (
          <div className="pl-track-block">
            <div className="pl-track-row">
              <span className="pl-track-label">🎵 Backing track</span>
              <button
                type="button"
                className={'pl-btn pl-btn-sm' + (clickMuted ? ' pl-btn-muted-on' : '')}
                onClick={() => setClickMuted((m) => !m)}
                title="メトロノームのクリック音をミュート"
              >
                {clickMuted ? '🔇 クリック OFF' : '🔔 クリック ON'}
              </button>
            </div>
          </div>
        )}

        <div className="pl-controls">
          {!isPlaying ? (
            <button
              type="button"
              className="pl-btn pl-btn-primary"
              onClick={handleStart}
            >
              ▶ 再生
            </button>
          ) : (
            <button
              type="button"
              className="pl-btn pl-btn-stop"
              onClick={handleStop}
            >
              ■ 停止
            </button>
          )}
          <div className="pl-loop-control">
            <label className="pl-loop-label" htmlFor="pl-loop-mode">
              ループ
            </label>
            <select
              id="pl-loop-mode"
              className="pl-loop-select"
              value={loopMode}
              onChange={(e) => setLoopMode(e.target.value as LoopMode)}
            >
              <option value="off">OFF</option>
              <option value="all">全体</option>
              <option value="range">区間</option>
            </select>
            {loopMode === 'range' && (
              <span className="pl-loop-range">
                Bar{' '}
                <input
                  type="number"
                  min={1}
                  max={totalBars}
                  value={loopStartBar}
                  onChange={(e) =>
                    setLoopStartBar(
                      Math.max(1, Math.min(totalBars, Number(e.target.value) || 1))
                    )
                  }
                  className="pl-loop-input"
                />
                〜{' '}
                <input
                  type="number"
                  min={1}
                  max={totalBars}
                  value={loopEndBar}
                  onChange={(e) =>
                    setLoopEndBar(
                      Math.max(1, Math.min(totalBars, Number(e.target.value) || 1))
                    )
                  }
                  className="pl-loop-input"
                />
              </span>
            )}
          </div>
        </div>

        <div className="pl-status">
          {positionInfo.phase === 'idle' && <span>停止中</span>}
          {positionInfo.phase === 'count-in' && (
            <span className="pl-status-count">
              カウントイン {positionInfo.countInRemaining}
            </span>
          )}
          {positionInfo.phase === 'playing' && (
            <span>
              Bar {positionInfo.barIdx + 1} / {totalBars}
              <span className="pl-dot">·</span>
              Beat {positionInfo.beatInBar + 1} /{' '}
              {positionInfo.totalBeatsInBar}
            </span>
          )}
          {positionInfo.phase === 'done' && <span>終了</span>}
        </div>

        <div className="pl-bars-grid">
          {preset.bars.map((bar, barIdx) => (
            <div
              key={barIdx}
              className={
                'pl-bar' + (activeBarIdx === barIdx ? ' is-active' : '')
              }
            >
              <div className="pl-bar-number">BAR {barIdx + 1}</div>
              <div className="pl-bar-chords">
                {bar.chords.map((chord, chordIdx) => {
                  const isActive =
                    activeBarIdx === barIdx && activeChordIdx === chordIdx;
                  return (
                    <div
                      key={chordIdx}
                      className={
                        'pl-chord-cell' + (isActive ? ' is-active' : '')
                      }
                      style={{ flex: chord.beats }}
                    >
                      <div className="pl-chord-roman">{chord.roman}</div>
                      <div className="pl-chord-symbol">{chord.symbol}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="pl-foot">
          {isPlayingProgression
            ? '練習中 — メトロノームのクリックで拍が刻まれます'
            : '▶ 再生を押すと、4拍のカウントインのあと進行が始まります'}
        </div>
      </div>
    </div>
  );
}

// Helpers ---------------------------------------------------------------

type BassNote = { note: string; durationBeats: number };

/**
 * Build a per-beat array. Each entry is either null (no bass trigger) or
 * a BassNote (trigger this note for durationBeats, starting now).
 * The note fires only on the first beat of each chord that has a bassNote.
 */
function buildBassMap(preset: Preset): (BassNote | null)[] {
  const slots: (BassNote | null)[] = [];
  preset.bars.forEach((bar) => {
    bar.chords.forEach((chord) => {
      for (let b = 0; b < chord.beats; b++) {
        if (b === 0 && chord.bassNote) {
          slots.push({ note: chord.bassNote, durationBeats: chord.beats });
        } else {
          slots.push(null);
        }
      }
    });
  });
  return slots;
}

function beatsInBar(preset: Preset, barIdx: number): number {
  return preset.bars[barIdx].chords.reduce((s, c) => s + c.beats, 0);
}

// Given an absolute progression beat and the bar it belongs to, return how
// many beats deep into that bar we are (0-based).
function beatPositionInBar(
  preset: Preset,
  barIdx: number,
  absoluteBeat: number
): number {
  let acc = 0;
  for (let i = 0; i < barIdx; i++) acc += beatsInBar(preset, i);
  return absoluteBeat - acc;
}
