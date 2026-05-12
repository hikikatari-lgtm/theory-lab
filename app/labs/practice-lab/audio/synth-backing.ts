// Practice Lab — Tone.js synthesized drums + bass.
//
// Two backing styles share the same synths:
//   'straight' — kick/snare/hihat, no swing
//   'swing'    — ride cymbal pattern + foot hihat, Transport swing enabled
//
// All sounds are scheduled at the Web Audio `time` passed from the
// metronome's scheduleRepeat, so they share the same clock and never drift.
//
// Swing ride pattern (fired via scheduleOnce from within the beat callback):
//   beat 1          ── ride (accent)
//   beat 2          ── ride + foot hihat
//   beat 2 "and"    ── ride (swung 8th — Transport.swing handles the timing)
//   beat 3          ── ride
//   beat 4          ── ride + foot hihat
//   beat 4 "and"    ── ride (swung 8th)

type ToneModule = typeof import('tone');

let Tone: ToneModule | null = null;

// Shared synths (created once, reused across presets and styles)
let kick: import('tone').MembraneSynth | null = null;
let snare: import('tone').NoiseSynth | null = null;
let hihat: import('tone').MetalSynth | null = null;
let bass: import('tone').MonoSynth | null = null;

export type BackingStyle = 'straight' | 'swing';

async function loadTone(): Promise<ToneModule> {
  if (!Tone) Tone = await import('tone');
  return Tone;
}

export async function initBacking(): Promise<void> {
  if (typeof window === 'undefined') return;
  const T = await loadTone();

  if (!kick) {
    kick = new T.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 5,
      envelope: { attack: 0.001, decay: 0.25, sustain: 0, release: 0.1 },
    }).toDestination();
    kick.volume.value = -6;
  }

  if (!snare) {
    snare = new T.NoiseSynth({
      noise: { type: 'white' },
      envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.05 },
    }).toDestination();
    snare.volume.value = -14;
  }

  if (!hihat) {
    hihat = new T.MetalSynth({
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.01 },
      harmonicity: 5.1,
      modulationIndex: 32,
      resonance: 4000,
      octaves: 1.5,
    }).toDestination();
    hihat.volume.value = -24;
  }

  if (!bass) {
    bass = new T.MonoSynth({
      oscillator: { type: 'sawtooth' },
      filter: { Q: 2, type: 'lowpass', rolloff: -24 },
      envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.3 },
      filterEnvelope: {
        attack: 0.01,
        decay: 0.15,
        sustain: 0.5,
        release: 0.2,
        baseFrequency: 200,
        octaves: 1.5,
      },
    }).toDestination();
    bass.volume.value = -6;
  }
}

/**
 * Enable or disable swing on the Transport.
 * Call before Transport.start() — changing swing mid-transport causes glitches.
 */
export function setSwing(enabled: boolean): void {
  if (!Tone) return;
  Tone.Transport.swing = enabled ? 0.5 : 0;
  Tone.Transport.swingSubdivision = '8n';
}

// ─── Straight drum pattern ────────────────────────────────────────────────────

/**
 * Trigger a straight (non-swing) drum hit.
 * beatInBar: 0 = beat 1, 1 = beat 2, 2 = beat 3, 3 = beat 4
 */
export function triggerStraightDrum(beatInBar: number, time: number): void {
  if (beatInBar === 0) kick?.triggerAttackRelease('C1', '8n', time, 1.0);
  if (beatInBar === 2) kick?.triggerAttackRelease('C1', '8n', time, 0.6);
  if (beatInBar === 1 || beatInBar === 3) snare?.triggerAttackRelease('16n', time, 0.75);
  hihat?.triggerAttackRelease('32n', time, beatInBar === 0 ? 0.7 : 0.4);
}

// ─── Jazz swing drum pattern ──────────────────────────────────────────────────

/**
 * Trigger a jazz swing drum hit using the same synths as straight mode.
 * The "and" (swung 8th) notes are computed from audioTime + half-beat offset.
 *
 * Jazz ride pattern (using hihat synth):
 *   beat 1:     hihat accent + light kick
 *   beat 2:     hihat + snare (brush)  + "and" hihat
 *   beat 3:     hihat (lighter)
 *   beat 4:     hihat + snare (brush)  + "and" hihat
 *
 * tempo is needed to compute the half-beat duration for the "and" hits.
 */
export function triggerSwingDrum(beatInBar: number, time: number, tempo: number): void {
  // Hihat on every beat (simulates ride cymbal)
  const hVel = beatInBar === 0 ? 0.85 : beatInBar === 2 ? 0.55 : 0.7;
  hihat?.triggerAttackRelease('32n', time, hVel);

  // Light kick only on beat 1 (jazz style)
  if (beatInBar === 0) kick?.triggerAttackRelease('C1', '8n', time, 0.45);

  // Snare (brush) on beats 2 and 4
  if (beatInBar === 1 || beatInBar === 3) snare?.triggerAttackRelease('32n', time, 0.4);

  // Swung "and" on beats 2 and 4 — schedule directly at audio time + 8n duration
  // (Transport.swing already shifts the perceived feel via the Transport clock)
  if (beatInBar === 1 || beatInBar === 3) {
    const eighthNoteSec = 60 / (tempo * 2);
    const andTime = time + eighthNoteSec;
    hihat?.triggerAttackRelease('32n', andTime, 0.55);
  }
}

// ─── Bass ─────────────────────────────────────────────────────────────────────

/**
 * Trigger a bass note at the given Web Audio time.
 * durationBeats: how many quarter-note beats to sustain.
 * tempo: current BPM (to convert beats → seconds).
 */
export function triggerBass(
  note: string,
  durationBeats: number,
  tempo: number,
  time: number,
): void {
  // Walking bass holds for slightly less than a full beat so notes articulate
  const holdBeats = Math.min(durationBeats, 0.85);
  const durationSec = (holdBeats * 60) / tempo;
  bass?.triggerAttackRelease(note, durationSec, time);
}

/** Release any held bass note (call when transport stops). */
export function stopBacking(): void {
  if (!Tone) return;
  bass?.triggerRelease();
  // Reset swing so other presets start clean
  Tone.Transport.swing = 0;
}
