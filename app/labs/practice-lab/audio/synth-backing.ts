// Practice Lab — Tone.js synthesized drums + bass.
//
// All sounds are triggered via per-beat callbacks that receive the Web Audio
// `time` from the metronome's scheduleRepeat, so they share exactly the same
// clock and never drift relative to the metronome or chord display.
//
// Public API:
//   initBacking()          — create synths (call once on mount)
//   triggerDrum(beat, t)   — kick / snare / hihat at audio time t
//   triggerBass(note, dur, bpm, t) — bass note at audio time t
//   stopBacking()          — release held notes (call on stop)

type ToneModule = typeof import('tone');

let Tone: ToneModule | null = null;
let kick: import('tone').MembraneSynth | null = null;
let snare: import('tone').NoiseSynth | null = null;
let hihat: import('tone').MetalSynth | null = null;
let bass: import('tone').MonoSynth | null = null;

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
    kick.volume.value = -4;
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
 * Trigger a drum sound at the given Web Audio time.
 * beatInBar: 0 = beat 1 (kick+hihat), 1 = beat 2 (snare+hihat),
 *            2 = beat 3 (kick+hihat), 3 = beat 4 (snare+hihat)
 */
export function triggerDrum(beatInBar: number, time: number): void {
  // Kick on beats 1 and 3
  if (beatInBar === 0) kick?.triggerAttackRelease('C1', '8n', time, 1.0);
  if (beatInBar === 2) kick?.triggerAttackRelease('C1', '8n', time, 0.65);
  // Snare on beats 2 and 4
  if (beatInBar === 1 || beatInBar === 3) snare?.triggerAttackRelease('16n', time, 0.75);
  // Hi-hat on every beat (accent beat 1)
  hihat?.triggerAttackRelease('32n', time, beatInBar === 0 ? 0.7 : 0.4);
}

/**
 * Trigger a bass note at the given Web Audio time.
 * durationBeats: how many quarter-note beats to sustain
 * tempo: current BPM (used to convert beats → seconds for the synth)
 */
export function triggerBass(
  note: string,
  durationBeats: number,
  tempo: number,
  time: number,
): void {
  const durationSec = (durationBeats * 60) / tempo;
  bass?.triggerAttackRelease(note, durationSec, time);
}

/** Release any held bass note (call when transport stops). */
export function stopBacking(): void {
  bass?.triggerRelease();
}
