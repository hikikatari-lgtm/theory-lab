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
  DEFAULT_VOLUMES,
  initBacking,
  setSwing,
  triggerStraightDrum,
  triggerSwingDrum,
  triggerBass,
  stopBacking,
  setKickVolume,
  setSnareVolume,
  setHihatVolume,
  setBassVolume,
} from './audio/synth-backing';

const COUNT_IN_BEATS = 4;

// ─── Key transposition helpers ────────────────────────────────────────────────

const CHROMATIC_PCS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const FLAT_NAMES    = ['C', 'Db', 'D', 'Eb',  'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const FLAT_TO_SHARP: Record<string, string> = {
  Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#', Fb: 'E', Cb: 'B',
};
const KEY_PC: Record<string, number> = {
  C: 0, Db: 1, D: 2, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, Ab: 8, A: 9, Bb: 10, B: 11,
};
const FLAT_KEYS = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb']);
const ALL_KEYS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

/** Transpose a bass note like 'D2' or 'Eb3' by N semitones. */
function transposeNote(noteStr: string, semitones: number): string {
  if (semitones === 0) return noteStr;
  const m = noteStr.match(/^([A-G][b#]?)(\d)$/);
  if (!m) return noteStr;
  const [, pc, octStr] = m;
  const octave = parseInt(octStr);
  const normalized = FLAT_TO_SHARP[pc] ?? pc;
  const idx = CHROMATIC_PCS.indexOf(normalized);
  if (idx < 0) return noteStr;
  const total = octave * 12 + idx + semitones;
  const newOctave = Math.floor(total / 12);
  const newPc = ((total % 12) + 12) % 12;
  return CHROMATIC_PCS[newPc] + newOctave;
}

/** Transpose a chord symbol like 'Dm7' → 'Am7' (for G key, +7 semitones). */
function transposeChordSymbol(symbol: string, semitones: number, targetKey: string): string {
  if (semitones === 0) return symbol;
  const m = symbol.match(/^([A-G][b#]?)(.*)/);
  if (!m) return symbol;
  const [, root, quality] = m;
  const normalized = FLAT_TO_SHARP[root] ?? root;
  const idx = CHROMATIC_PCS.indexOf(normalized);
  if (idx < 0) return symbol;
  const newPc = (idx + semitones + 12) % 12;
  const newRoot = FLAT_KEYS.has(targetKey) ? FLAT_NAMES[newPc] : CHROMATIC_PCS[newPc];
  return newRoot + quality;
}

// ─── Seconds for one quarter-note beat ───────────────────────────────────────

function beatDurationSec(bpm: number) {
  return 60 / bpm;
}

// ─── Beat map ────────────────────────────────────────────────────────────────

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
        slots.push({ barIdx, chordIdx, isBarStart: beatInBar === 0 });
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

  // ─── Key state (synth presets only) ────────────────────────────────────────

  const [currentKey, setCurrentKey] = useState(preset.baseKey ?? preset.key);

  // Semitone offset from baseKey → currentKey (always upward).
  const transposeSemitones = useMemo(() => {
    if (!preset.supportsAllKeys || !preset.baseKey) return 0;
    const fromPc = KEY_PC[preset.baseKey] ?? 0;
    const toPc = KEY_PC[currentKey] ?? 0;
    return (toPc - fromPc + 12) % 12;
  }, [preset, currentKey]);

  // Per-beat bass notes, transposed to the selected key.
  const bassMap = useMemo(() => buildBassMap(preset), [preset]);
  const activeBassMap = useMemo(
    () => applyTransposeToBassMap(bassMap, transposeSemitones),
    [bassMap, transposeSemitones],
  );

  // Chord symbols transposed for display.
  const displayBars = useMemo(
    () =>
      preset.bars.map((bar) => ({
        ...bar,
        chords: bar.chords.map((chord) => ({
          ...chord,
          symbol: transposeChordSymbol(chord.symbol, transposeSemitones, currentKey),
        })),
      })),
    [preset.bars, transposeSemitones, currentKey],
  );

  // ─── Mixer state (synth presets only) ──────────────────────────────────────

  const [kickVol,  setKickVol]  = useState(DEFAULT_VOLUMES.kick);
  const [snareVol, setSnareVol] = useState(DEFAULT_VOLUMES.snare);
  const [hihatVol, setHihatVol] = useState(DEFAULT_VOLUMES.hihat);
  const [bassVol,  setBassVol2] = useState(DEFAULT_VOLUMES.bass);

  useEffect(() => { setKickVolume(kickVol);   }, [kickVol]);
  useEffect(() => { setSnareVolume(snareVol); }, [snareVol]);
  useEffect(() => { setHihatVolume(hihatVol); }, [hihatVol]);
  useEffect(() => { setBassVolume(bassVol);   }, [bassVol]);

  // ─── Tempo / loop state ─────────────────────────────────────────────────────

  const [tempo, setTempo] = useState(preset.tempo);
  const [loopMode, setLoopMode] = useState<LoopMode>('all');
  const [loopStartBar, setLoopStartBar] = useState(1);
  const [loopEndBar, setLoopEndBar] = useState(totalBars);

  // ─── Backing track audio element ─────────────────────────────────────────

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [clickMuted, setClickMuted] = useState(false);
  // Ref so the metronome callback always reads the latest toggle state.
  const clickMutedRef = useRef(clickMuted);
  useEffect(() => { clickMutedRef.current = clickMuted; }, [clickMuted]);

  const [isPlaying, setIsPlaying] = useState(false);
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
    return () => { el.pause(); };
  }, [preset.audioUrl]);

  // When the preset changes, stop playback and reset all derived state.
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
    setCurrentKey(preset.baseKey ?? preset.key);
  }, [presetId, preset]);

  // Eagerly initialise synths so first-click latency is just Tone.start().
  useEffect(() => {
    initMetronome().catch(() => {});
    initBacking().catch(() => {});
  }, []);

  // Stop on unmount.
  useEffect(() => {
    return () => { stopMetronome(); };
  }, []);

  // ─── Loop beat range ─────────────────────────────────────────────────────

  const loopBeats = useMemo(() => {
    if (loopMode === 'off') return null;
    if (loopMode === 'all') return { startBeat: 0, endBeat: totalBeats };
    const startBarIdx = Math.max(0, Math.min(totalBars - 1, loopStartBar - 1));
    const endBarIdx   = Math.max(startBarIdx, Math.min(totalBars - 1, loopEndBar - 1));
    let startBeat = 0;
    for (let i = 0; i < startBarIdx; i++) startBeat += beatsInBar(preset, i);
    let endBeat = startBeat;
    for (let i = startBarIdx; i <= endBarIdx; i++) endBeat += beatsInBar(preset, i);
    return { startBeat, endBeat };
  }, [loopMode, loopStartBar, loopEndBar, totalBars, preset, totalBeats]);

  // ─── Position info (UI display) ──────────────────────────────────────────

  const positionInfo = useMemo(() => {
    if (currentTick < 0) return { phase: 'idle' as const };
    if (currentTick < COUNT_IN_BEATS) {
      return { phase: 'count-in' as const, countInRemaining: COUNT_IN_BEATS - currentTick };
    }
    const progressionBeat = currentTick - COUNT_IN_BEATS;
    let effectiveBeat: number;
    if (loopBeats) {
      const len = loopBeats.endBeat - loopBeats.startBeat;
      effectiveBeat = loopBeats.startBeat + (progressionBeat % len);
    } else {
      effectiveBeat = progressionBeat;
    }
    if (effectiveBeat >= totalBeats) return { phase: 'done' as const };
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

  // ─── Play / stop ─────────────────────────────────────────────────────────

  function handleStart() {
    if (isPlaying) return;
    setCurrentTick(-1);
    setIsPlaying(true);

    if (audioRef.current && preset.audioUrl) {
      const countInSec = COUNT_IN_BEATS * beatDurationSec(tempo);
      const startOffset = (preset.audioStartSec ?? 0) - countInSec;
      const el = audioRef.current;
      if (startOffset >= 0) {
        el.currentTime = startOffset;
        el.play().catch(() => {});
      } else {
        el.currentTime = 0;
        const delayMs = -startOffset * 1000;
        setTimeout(() => { if (el) el.play().catch(() => {}); }, delayMs);
      }
    }

    // Capture closure values — these must not close over stale state.
    const capturedLoopBeats    = loopBeats;
    const capturedTotalBeats   = totalBeats;
    const capturedBassMap      = activeBassMap;   // already transposed
    const capturedTempo        = tempo;
    const hasSynth             = preset.synthBacking === true;
    const isSwing              = preset.backingStyle === 'swing';

    if (hasSynth) setSwing(isSwing);

    startMetronome({
      tempo,
      // Getter so toggling the button takes effect immediately, mid-play.
      clickMuted: hasSynth ? () => true : () => clickMutedRef.current,
      onTick: (tickIndex) => { setCurrentTick(tickIndex); },
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
            // Drums fire every tick (including count-in).
            const beatInBar = tickIndex % 4;
            if (isSwing) {
              triggerSwingDrum(beatInBar, audioTime, capturedTempo);
            } else {
              triggerStraightDrum(beatInBar, audioTime);
            }

            // Bass fires only during the progression.
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

  // ─── Derived UI state ─────────────────────────────────────────────────────

  const isPlayingProgression =
    positionInfo.phase === 'playing' || positionInfo.phase === 'count-in';
  const activeBarIdx  = positionInfo.phase === 'playing' ? positionInfo.barIdx  : -1;
  const activeChordIdx = positionInfo.phase === 'playing' ? positionInfo.chordIdx : -1;
  const hasSynthUI = preset.synthBacking === true;

  // ─── Render ───────────────────────────────────────────────────────────────

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
            Key {hasSynthUI && preset.supportsAllKeys ? currentKey : preset.key}
            <span className="pl-dot">·</span>{' '}
            <span className="pl-tempo-symbol">♩</span>= {tempo}
          </div>
        </div>

        {/* ── Key selector (synth presets that support all keys) ── */}
        {hasSynthUI && preset.supportsAllKeys && (
          <div className="pl-key-block">
            <span className="pl-key-label">Key</span>
            <div className="pl-key-row">
              {ALL_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  className={'pl-key-btn' + (currentKey === k ? ' is-active' : '')}
                  onClick={() => { if (!isPlaying) setCurrentKey(k); }}
                  disabled={isPlaying}
                  title={isPlaying ? '停止してからキーを変更' : `Key ${k}`}
                >
                  {k.replace('b', '♭').replace('#', '♯')}
                </button>
              ))}
            </div>
          </div>
        )}

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

        {/* ── Mixer (synth presets only) ── */}
        {hasSynthUI && (
          <div className="pl-mixer-block">
            <div className="pl-mixer-title">🎛 Mix</div>
            {(
              [
                { label: 'Kick',   vol: kickVol,  set: setKickVol,  min: -30, max: 0 },
                { label: 'Snare',  vol: snareVol, set: setSnareVol, min: -30, max: 0 },
                { label: 'Hi-hat', vol: hihatVol, set: setHihatVol, min: -30, max: 0 },
                { label: 'Bass',   vol: bassVol,  set: setBassVol2, min: -30, max: 0 },
              ] as const
            ).map(({ label, vol, set, min, max }) => (
              <div key={label} className="pl-mixer-row">
                <span className="pl-mixer-label">{label}</span>
                <input
                  type="range"
                  className="pl-mixer-slider"
                  min={min}
                  max={max}
                  step={1}
                  value={vol}
                  onChange={(e) => (set as (v: number) => void)(Number(e.target.value))}
                />
                <span className="pl-mixer-value">{vol > 0 ? '+' : ''}{vol}</span>
              </div>
            ))}
          </div>
        )}

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
          {displayBars.map((bar, barIdx) => (
            <div
              key={barIdx}
              className={'pl-bar' + (activeBarIdx === barIdx ? ' is-active' : '')}
            >
              <div className="pl-bar-number">BAR {barIdx + 1}</div>
              <div className="pl-bar-chords">
                {bar.chords.map((chord, chordIdx) => {
                  const isActive =
                    activeBarIdx === barIdx && activeChordIdx === chordIdx;
                  return (
                    <div
                      key={chordIdx}
                      className={'pl-chord-cell' + (isActive ? ' is-active' : '')}
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

type BassNote = { note: string; durationBeats: number };

/**
 * Build a per-beat array. Each entry is either null (no bass trigger) or
 * a BassNote (trigger this note for durationBeats, starting now).
 */
function buildBassMap(preset: Preset): (BassNote | null)[] {
  const slots: (BassNote | null)[] = [];
  preset.bars.forEach((bar) => {
    bar.chords.forEach((chord) => {
      for (let b = 0; b < chord.beats; b++) {
        if (chord.bassNotes && chord.bassNotes[b]) {
          slots.push({ note: chord.bassNotes[b], durationBeats: 1 });
        } else if (b === 0 && chord.bassNote) {
          slots.push({ note: chord.bassNote, durationBeats: chord.beats });
        } else {
          slots.push(null);
        }
      }
    });
  });
  return slots;
}

/** Return a new bassMap with all notes transposed by `semitones`. */
function applyTransposeToBassMap(
  map: (BassNote | null)[],
  semitones: number,
): (BassNote | null)[] {
  if (semitones === 0) return map;
  return map.map((slot) =>
    slot ? { ...slot, note: transposeNote(slot.note, semitones) } : null,
  );
}

function beatsInBar(preset: Preset, barIdx: number): number {
  return preset.bars[barIdx].chords.reduce((s, c) => s + c.beats, 0);
}

function beatPositionInBar(
  preset: Preset,
  barIdx: number,
  absoluteBeat: number,
): number {
  let acc = 0;
  for (let i = 0; i < barIdx; i++) acc += beatsInBar(preset, i);
  return absoluteBeat - acc;
}
