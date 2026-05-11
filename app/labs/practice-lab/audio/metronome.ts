// Practice Lab metronome.
//
// Wraps Tone.Transport so the React layer just deals with "tick N happened".
// Each tick is one quarter-note beat. The caller decides whether the tick is
// an accent (first beat of bar, count-in click, etc.) and what should happen
// in the UI at that tick. The audio engine itself is intentionally dumb:
//
//   start({ tempo, onTick, isAccent }) ─► transport runs at `tempo` BPM,
//     scheduling a quarter-note repeat. For each tick we play a short blip
//     (accent = brighter / louder) and call onTick(tickIndex, audioTime).
//
// onTick is wrapped in Tone.Draw so the UI update happens in sync with the
// click sound, even when the tab is in the background and the JS clock has
// drifted.
//
// Designed so MP3 playback can be slotted in later: the React state machine
// (currentBar / currentBeat) is a pure function of `tickIndex`, so swapping
// the clock source to Tone.Player.sync() would mostly leave the React layer
// untouched.

type ToneModule = typeof import('tone');

let Tone: ToneModule | null = null;
let accentSynth: import('tone').Synth | null = null;
let normalSynth: import('tone').Synth | null = null;
let scheduleId: number | null = null;
let toneStarted = false;

async function loadTone(): Promise<ToneModule> {
  if (!Tone) Tone = await import('tone');
  return Tone;
}

async function ensureSynths(): Promise<void> {
  if (typeof window === 'undefined') return;
  const T = await loadTone();
  if (!accentSynth) {
    accentSynth = new T.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.06, sustain: 0, release: 0.05 },
    }).toDestination();
    accentSynth.volume.value = -6;
  }
  if (!normalSynth) {
    normalSynth = new T.Synth({
      oscillator: { type: 'sine' },
      envelope: { attack: 0.001, decay: 0.04, sustain: 0, release: 0.03 },
    }).toDestination();
    normalSynth.volume.value = -12;
  }
}

export async function initMetronome(): Promise<void> {
  await ensureSynths();
}

export function isMetronomeReady(): boolean {
  return accentSynth !== null && normalSynth !== null;
}

export type StartOpts = {
  tempo: number;
  onTick: (tickIndex: number) => void;
  isAccent: (tickIndex: number) => boolean;
  /** Return true to stop the transport after this tick (e.g. end of song
   *  with looping disabled). Called on the same tick as onTick. */
  shouldStop?: (tickIndex: number) => boolean;
};

export async function startMetronome(opts: StartOpts): Promise<void> {
  await ensureSynths();
  const T = await loadTone();
  if (!toneStarted) {
    await T.start();
    toneStarted = true;
  }

  // Reset transport. Clearing any previous schedule prevents duplicate
  // callbacks if the user starts → stops → starts repeatedly.
  if (scheduleId !== null) {
    T.Transport.clear(scheduleId);
    scheduleId = null;
  }
  T.Transport.stop();
  T.Transport.cancel(0);
  T.Transport.position = 0;
  T.Transport.bpm.value = opts.tempo;

  let tickIndex = 0;
  scheduleId = T.Transport.scheduleRepeat((time) => {
    const i = tickIndex;
    tickIndex += 1;
    const accent = opts.isAccent(i);
    const synth = accent ? accentSynth : normalSynth;
    if (synth) {
      synth.triggerAttackRelease(accent ? 'C6' : 'C5', '32n', time);
    }
    T.Draw.schedule(() => {
      opts.onTick(i);
    }, time);
    if (opts.shouldStop && opts.shouldStop(i)) {
      // Schedule a stop just after this tick so the click still plays.
      T.Transport.scheduleOnce(() => {
        stopMetronome();
      }, time + T.Time('4n').toSeconds());
    }
  }, '4n');

  T.Transport.start();
}

export function stopMetronome(): void {
  if (!Tone) return;
  if (scheduleId !== null) {
    Tone.Transport.clear(scheduleId);
    scheduleId = null;
  }
  Tone.Transport.stop();
  Tone.Transport.cancel(0);
}

export function setMetronomeTempo(tempo: number): void {
  if (!Tone) return;
  Tone.Transport.bpm.value = tempo;
}
