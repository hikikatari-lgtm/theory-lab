type ToneModule = typeof import('tone');

let Tone: ToneModule | null = null;
let sampler: import('tone').Sampler | null = null;
let reverb: import('tone').Reverb | null = null;
let pianoReady = false;
let toneStarted = false;

const SAMPLE_BASE = 'https://tonejs.github.io/audio/salamander/';
const SAMPLE_MAP: Record<string, string> = {
  A1: 'A1.mp3', A2: 'A2.mp3', A3: 'A3.mp3',
  A4: 'A4.mp3', A5: 'A5.mp3', A6: 'A6.mp3',
};

async function loadTone(): Promise<ToneModule> {
  if (!Tone) {
    Tone = await import('tone');
  }
  return Tone;
}

export async function initPiano(): Promise<void> {
  if (pianoReady) return;
  if (typeof window === 'undefined') return;
  const T = await loadTone();
  return new Promise<void>((resolve, reject) => {
    reverb = new T.Reverb({ decay: 2.5, preDelay: 0.02, wet: 0.25 }).toDestination();
    sampler = new T.Sampler({
      urls: SAMPLE_MAP,
      baseUrl: SAMPLE_BASE,
      release: 3.5,
      onload: () => {
        pianoReady = true;
        resolve();
      },
      onerror: (err: unknown) => {
        console.error('Piano load error:', err);
        reject(err);
      },
    }).connect(reverb);
    sampler.volume.value = -6;
  });
}

export function isPianoReady(): boolean {
  return pianoReady;
}

async function ensureToneStarted(): Promise<void> {
  if (toneStarted) return;
  const T = await loadTone();
  await T.start();
  toneStarted = true;
}

export async function playNotes(
  toneNames: string[],
  mode: 'block' | 'broken' = 'block'
): Promise<void> {
  if (!pianoReady || !sampler) return;
  await ensureToneStarted();
  const T = await loadTone();
  if (mode === 'block') {
    sampler.triggerAttackRelease(toneNames, '2n');
  } else {
    const t = T.now();
    toneNames.forEach((n, i) => {
      sampler!.triggerAttackRelease(n, '4n', t + i * 0.18);
    });
  }
}

export async function playCompare(
  rootToneName: string,
  triadToneNames: string[]
): Promise<void> {
  if (!pianoReady || !sampler) return;
  await ensureToneStarted();
  const T = await loadTone();
  const t = T.now();
  sampler.triggerAttackRelease(rootToneName, '2n', t);
  sampler.triggerAttackRelease(triadToneNames, '2n', t + 1.5);
  sampler.triggerAttackRelease([rootToneName, ...triadToneNames], '1n', t + 3.0);
}

export async function playSingleNote(toneName: string): Promise<void> {
  if (!pianoReady || !sampler) return;
  await ensureToneStarted();
  sampler.triggerAttackRelease(toneName, '4n');
}

// Trigger a chord and hold for `durationSec` seconds. Used by Voicing Lab's
// Walk Through where each chord is sustained for ~4 beats at the progression
// tempo, scheduled via setTimeout from the React layer.
export async function playSustained(
  toneNames: string[],
  durationSec: number
): Promise<void> {
  if (!pianoReady || !sampler) return;
  await ensureToneStarted();
  sampler.triggerAttackRelease(toneNames, durationSec);
}

// Cut all currently sounding notes immediately. Used when the user hits
// "■ 停止" mid-walkthrough.
export function releaseAllNotes(): void {
  if (!sampler) return;
  sampler.releaseAll();
}
