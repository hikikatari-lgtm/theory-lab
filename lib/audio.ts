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

// Tiny silent WAV (~48 bytes): RIFF header + 1 silent 16-bit PCM sample
// at 44.1 kHz mono. Bundled as a data URI so no extra network round-trip
// and no asset to ship. Used to "prime" iOS Safari's audio session so
// the Web Audio output isn't muted by the hardware silent switch.
const SILENT_WAV =
  'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

let silentAudio: HTMLAudioElement | null = null;
let iosDiagnosticsLogged = false;

// ---- Diagnostics infrastructure (consumed by AudioDebugPanel) ----
//
// Module-level state that tracks the audio pipeline's progress so an
// on-screen debug panel can read it without needing Mac-iPhone remote
// debugging. Everything here is best-effort: a diagnostic that throws
// must never break audio playback (every reader / writer is wrapped in
// try/catch where it touches optional browser APIs).

export type PrimerStatus = 'pending' | 'success' | 'failure' | 'skipped';

export type AudioLogEntry = {
  t: number;        // Date.now() at the moment the event fired
  event: string;    // Short identifier — see AUDIO_EVENT_* docs below
  ok: boolean;      // Whether this step completed without error
  detail?: string;  // Optional one-line message (error text, value, etc.)
};

// Snapshot of the hidden <video> element used for the iOS-mute
// workaround. Undefined when the routing wasn't set up (e.g. SSR).
export type VideoRoutingState = {
  // True if the element exists in the DOM
  attached: boolean;
  // <video>.muted — must be `false` for iOS to override the silent
  // switch. If this somehow becomes true, the workaround is broken.
  muted: boolean;
  // <video>.paused — should be `false` after the user gesture
  // play() resolves. If true, the MediaStream isn't being consumed
  // and audio won't reach the speaker.
  paused: boolean;
  // <video>.readyState — HTMLMediaElement.HAVE_NOTHING(0) → HAVE_ENOUGH_DATA(4)
  readyState: number;
  // True if a MediaStream was successfully assigned to srcObject
  hasSrcObject: boolean;
};

export type AudioDiagnostics = {
  hasAudioSessionApi: boolean;
  audioSessionType?: string;
  pianoReady: boolean;
  toneStarted: boolean;
  primerStatus: PrimerStatus;
  contextState?: string;   // 'running' | 'suspended' | 'closed'
  sampleRate?: number;     // AudioContext.sampleRate
  ua: string;
  video?: VideoRoutingState;  // present once setupVideoAudioRouting ran
  log: AudioLogEntry[];    // Most-recent-last, capped at MAX_LOG
};

let primerStatus: PrimerStatus = 'pending';
let audioLog: AudioLogEntry[] = [];
const MAX_LOG = 16;

// Hidden <video> element that consumes Tone.js's audio output via a
// MediaStream. iOS Safari treats <video> elements with audio tracks
// as the "playback" audio session category, which overrides the
// hardware silent switch (マナーモード) — same mechanism YouTube
// uses for music playback. See setupVideoAudioRouting().
let mediaStreamDest: MediaStreamAudioDestinationNode | null = null;
let audioVideo: HTMLVideoElement | null = null;

type DiagListener = () => void;
const diagListeners = new Set<DiagListener>();

function emitDiagnostics(): void {
  diagListeners.forEach((l) => {
    try {
      l();
    } catch {
      /* listener bug must not break audio */
    }
  });
}

function pushAudioLog(event: string, ok: boolean, detail?: string): void {
  audioLog = [
    ...audioLog.slice(-(MAX_LOG - 1)),
    { t: Date.now(), event, ok, detail },
  ];
  emitDiagnostics();
}

// Subscribe to diagnostic state changes. Returns an unsubscribe fn.
// React components consume this via a useState + useEffect pair so the
// panel re-renders whenever the audio pipeline advances.
export function subscribeAudioDiagnostics(listener: DiagListener): () => void {
  diagListeners.add(listener);
  return () => {
    diagListeners.delete(listener);
  };
}

// Snapshot the current diagnostic state. Reads Tone.context lazily
// (only if the module has been imported); never triggers a Tone.js
// load on its own.
export function getAudioDiagnostics(): AudioDiagnostics {
  let contextState: string | undefined;
  let sampleRate: number | undefined;
  if (Tone) {
    try {
      const ctx = Tone.getContext();
      const raw = (ctx as { rawContext?: AudioContext }).rawContext;
      contextState =
        (ctx as { state?: string }).state ?? raw?.state ?? undefined;
      sampleRate =
        (ctx as { sampleRate?: number }).sampleRate ?? raw?.sampleRate;
    } catch {
      /* defensive — Tone internals may change shape */
    }
  }
  let audioSessionType: string | undefined;
  let hasAudioSessionApi = false;
  let ua = '';
  if (typeof navigator !== 'undefined') {
    hasAudioSessionApi = 'audioSession' in navigator;
    try {
      audioSessionType = (navigator as { audioSession?: { type?: string } })
        .audioSession?.type;
    } catch {
      /* read failure */
    }
    ua = navigator.userAgent ?? '';
  }
  let video: VideoRoutingState | undefined;
  if (audioVideo) {
    try {
      video = {
        attached: !!audioVideo.parentNode,
        muted: audioVideo.muted,
        paused: audioVideo.paused,
        readyState: audioVideo.readyState,
        hasSrcObject: audioVideo.srcObject !== null,
      };
    } catch {
      /* defensive — element might be torn down mid-read */
    }
  }
  return {
    hasAudioSessionApi,
    audioSessionType,
    pianoReady,
    toneStarted,
    primerStatus,
    contextState,
    sampleRate,
    ua,
    video,
    log: audioLog,
  };
}

// iOS Safari 17+ mutes Web Audio output when the hardware silent
// switch (マナーモード) is on, even though the AudioContext is
// running. WebKit 17.4 (March 2024) added `navigator.audioSession`
// which lets us declare the audio category — setting `type =
// 'playback'` tells Safari this is media content that should play
// regardless of the silent switch.
//
// No-op on:
//   - browsers without `navigator.audioSession` (desktop Safari/
//     Chrome, Android, iOS < 17.4)
//   - SSR (no `navigator` global)
//
// Called from `initPiano()` so the category is set before the first
// AudioContext / Tone.Sampler is created. Safe to call repeatedly,
// but `initPiano()` already short-circuits via `pianoReady`.
//
// See docs/audio-ios-silent-switch.md for the full diagnosis.
function configureIosAudioSession(): void {
  if (typeof navigator === 'undefined') {
    pushAudioLog('audioSession.skip', true, 'no navigator (SSR)');
    return;
  }
  if (!('audioSession' in navigator)) {
    pushAudioLog('audioSession.skip', true, 'API not supported');
    return;
  }
  try {
    (navigator as { audioSession?: { type?: string } })
      .audioSession!.type = 'playback';
    pushAudioLog('audioSession.set', true, "type='playback'");
  } catch (e) {
    // Defensive: ignore if a future Safari changes the API shape
    // (e.g. read-only property, removed type, etc.). Audio still
    // plays at the silent-switch-respecting default.
    pushAudioLog(
      'audioSession.set',
      false,
      e instanceof Error ? e.message : String(e)
    );
  }
}

// Build the MediaStream → <video> routing path. Called from initPiano
// once the Tone module is loaded and its AudioContext is available.
//
// Plan A architecture (single path, cross-platform):
//
//   Tone.Sampler → Reverb → MediaStreamAudioDestinationNode
//                              ↓
//                         MediaStream
//                              ↓
//                       <video>.srcObject  (hidden 1px element)
//                              ↓
//                      iOS speaker (Playback category, silent-switch immune)
//
// The <video> element is what fools iOS into the playback category —
// same mechanism YouTube uses. Audio-only MediaStreams in <video>
// elements (via srcObject) are explicitly supported by WebKit per
// Apple's docs and have been since Safari 11.
//
// On non-iOS platforms this routing also works (no audio doubling
// because we skip Tone.Destination entirely). It adds ~10-30ms
// latency, imperceptible at Walk Through tempos.
//
// Returns the MediaStreamAudioDestinationNode if setup succeeded, or
// null on failure (in which case the caller falls back to the legacy
// Tone.Destination path so audio still works).
function setupVideoAudioRouting(
  T: ToneModule
): MediaStreamAudioDestinationNode | null {
  if (typeof document === 'undefined') {
    pushAudioLog('video.setup.skip', true, 'no document (SSR)');
    return null;
  }
  // Defensive: tear down any prior <video> from a previous initPiano
  // call (React StrictMode dev double-invoke / HMR re-evaluation
  // can land here twice). Without this we'd accumulate orphaned
  // <video> elements that still hold MediaStream references.
  if (audioVideo) {
    try {
      audioVideo.pause();
      audioVideo.srcObject = null;
      audioVideo.remove();
    } catch {
      /* element may already be detached — ignore */
    }
    audioVideo = null;
  }
  try {
    const ctx = T.getContext();
    const raw = (ctx as { rawContext?: AudioContext }).rawContext;
    if (!raw || typeof raw.createMediaStreamDestination !== 'function') {
      pushAudioLog(
        'video.setup.skip',
        false,
        'rawContext or createMediaStreamDestination unavailable'
      );
      return null;
    }
    mediaStreamDest = raw.createMediaStreamDestination();
    pushAudioLog('video.streamDest.create', true);

    // Keep-alive signal: a sub-audible 1 Hz oscillator at vanishingly
    // small gain feeds the MediaStream continuously so the <video>
    // element never sees an "idle stream" condition that would cause
    // browsers (Chrome desktop especially) to auto-pause playback.
    // The signal is too low-frequency / too quiet to be perceived but
    // is enough to keep the stream's audio track marked active.
    try {
      const keepAlive = raw.createOscillator();
      keepAlive.frequency.value = 1; // 1 Hz, well below human hearing
      const gain = raw.createGain();
      gain.gain.value = 0.00001; // -100 dB, imperceptible
      keepAlive.connect(gain);
      gain.connect(mediaStreamDest);
      keepAlive.start();
      pushAudioLog('video.keepAlive', true);
    } catch (e) {
      // Without keep-alive the video may auto-pause when Tone is idle,
      // but the iOS workaround can still kick in during active playback.
      pushAudioLog(
        'video.keepAlive',
        false,
        e instanceof Error ? e.message : String(e)
      );
    }

    audioVideo = document.createElement('video');
    audioVideo.srcObject = mediaStreamDest.stream;
    // CRITICAL: the element MUST NOT be muted — that's the whole
    // point. iOS only treats a <video> as "playback category" when
    // it actually carries audible content.
    audioVideo.muted = false;
    audioVideo.playsInline = true;
    audioVideo.setAttribute('playsinline', '');
    audioVideo.setAttribute('webkit-playsinline', '');
    // loop keeps the element "active" indefinitely; with srcObject
    // there's no source EOF so loop is mostly a hint.
    audioVideo.loop = true;
    // 1×1 px, parked off-screen via clip-path (rather than opacity:0
    // or display:none) so Chrome / WebKit don't apply their
    // "invisible video → pause" optimization. The element is in the
    // layout tree and considered visible by the browser, but the
    // user can't see it because it's clipped to nothing AND
    // anchored to a corner. Pointer events disabled so it never
    // intercepts UI interactions.
    audioVideo.style.cssText =
      'position:fixed;width:1px;height:1px;right:0;bottom:0;' +
      'clip-path:inset(50%);pointer-events:none;';
    document.body.appendChild(audioVideo);
    pushAudioLog('video.element.create', true);
    return mediaStreamDest;
  } catch (e) {
    pushAudioLog(
      'video.setup.error',
      false,
      e instanceof Error ? e.message : String(e)
    );
    return null;
  }
}

// Start the hidden <video> playback. Must be called inside a user
// gesture (the play-button click path). Without play(), the
// MediaStream is connected but no audio reaches the speaker because
// the <video> element is paused.
async function startAudioVideo(): Promise<void> {
  if (!audioVideo) return;
  try {
    await audioVideo.play();
    pushAudioLog('video.play', true);
  } catch (e) {
    // Autoplay block, codec issue, etc. The diagnostic panel will
    // show paused: true — that's the sign to investigate further.
    pushAudioLog(
      'video.play',
      false,
      e instanceof Error ? e.message : String(e)
    );
  }
}

export async function initPiano(): Promise<void> {
  if (pianoReady) return;
  if (typeof window === 'undefined') return;
  configureIosAudioSession();
  pushAudioLog('initPiano.begin', true);
  const T = await loadTone();

  // Build the MediaStream → <video> routing path BEFORE the Tone
  // graph is wired up so we know whether to route reverb to the
  // stream destination or fall back to Tone.Destination.
  const streamDest = setupVideoAudioRouting(T);

  return new Promise<void>((resolve, reject) => {
    reverb = new T.Reverb({ decay: 2.5, preDelay: 0.02, wet: 0.25 });
    if (streamDest) {
      try {
        // Tone v15 ToneAudioNode.connect accepts AudioNode targets.
        reverb.connect(streamDest);
        pushAudioLog('video.route', true, 'reverb → MediaStream');
      } catch (e) {
        // If the connect fails for any reason, fall back to the
        // legacy direct path so audio still plays (silent switch
        // workaround degrades, but the lab isn't completely silent).
        reverb.toDestination();
        pushAudioLog(
          'video.route',
          false,
          'fallback to Tone.Destination: ' +
            (e instanceof Error ? e.message : String(e))
        );
      }
    } else {
      reverb.toDestination();
      pushAudioLog(
        'video.route',
        false,
        'no streamDest, using Tone.Destination'
      );
    }
    sampler = new T.Sampler({
      urls: SAMPLE_MAP,
      baseUrl: SAMPLE_BASE,
      release: 3.5,
      onload: () => {
        pianoReady = true;
        pushAudioLog('initPiano.ready', true);
        resolve();
      },
      onerror: (err: unknown) => {
        console.error('Piano load error:', err);
        pushAudioLog(
          'initPiano.error',
          false,
          err instanceof Error ? err.message : String(err)
        );
        reject(err);
      },
    }).connect(reverb);
    sampler.volume.value = -6;
  });
}

export function isPianoReady(): boolean {
  return pianoReady;
}

// iOS Safari silent-switch primer + one-time diagnostic log. Called
// from the user-gesture path (the first ensureToneStarted invocation
// inside a play-button click) which is when iOS will actually accept
// the audio-session category change.
//
// Two complementary mechanisms:
//   (1) navigator.audioSession.type = 'playback' (iOS 17.4+, set in
//       initPiano too — re-set here in case iOS only honors it from
//       a gesture-context call).
//   (2) Silent <audio loop playsinline> primer — the long-standing
//       workaround that has worked on iOS Safari since long before
//       audioSession existed. Playing any HTMLAudioElement inside a
//       user gesture elevates the page's audio session away from the
//       silent-switch-respecting default, letting the subsequent Web
//       Audio output ignore the hardware mute.
//
// The diagnostic log fires once and reports whether the audioSession
// API is even present on the device, plus the resulting `.type` after
// we tried to set it. Read it via Mac Safari → Develop → [iPhone] to
// confirm the iOS version actually reaches the API.
function primeIosAudioSession(): void {
  // (1) Re-set audioSession.type inside the user gesture, just in
  //     case the early call from initPiano was ignored by iOS.
  configureIosAudioSession();

  // (2) Silent <audio> primer. Created once; iOS Safari only needs
  //     a single play() inside a gesture for the session category
  //     change to take effect. After that we don't reach this code
  //     again because toneStarted = true.
  if (typeof document === 'undefined') {
    primerStatus = 'skipped';
    pushAudioLog('primer.skip', true, 'no document (SSR)');
  } else if (silentAudio !== null) {
    pushAudioLog('primer.skip', true, 'already created');
  } else {
    try {
      silentAudio = document.createElement('audio');
      silentAudio.src = SILENT_WAV;
      silentAudio.loop = true;
      silentAudio.setAttribute('playsinline', '');
      silentAudio.setAttribute('webkit-playsinline', '');
      // Some iOS versions skip volume === 0 entirely, so use a
      // very-quiet but nonzero value.
      silentAudio.volume = 0.001;
      pushAudioLog('primer.create', true);
      // Best-effort play — autoplay block / codec rejection is fine,
      // the element having been .play()'d once in a gesture is what
      // shifts the audio session category. We deliberately don't
      // await: if it rejects we still try the rest of the path.
      void silentAudio
        .play()
        .then(() => {
          primerStatus = 'success';
          pushAudioLog('primer.play', true);
        })
        .catch((e: unknown) => {
          primerStatus = 'failure';
          pushAudioLog(
            'primer.play',
            false,
            e instanceof Error ? e.message : String(e)
          );
          /* autoplay blocked or codec issue — primer ineffective but
             audioSession.type may still help */
        });
    } catch (e) {
      // DOM API failure (very unusual) — swallow and continue.
      // Audio still plays on platforms that don't need the primer.
      primerStatus = 'failure';
      pushAudioLog(
        'primer.create',
        false,
        e instanceof Error ? e.message : String(e)
      );
    }
  }

  // One-shot diagnostic log so the device's actual audioSession state
  // can be inspected via Mac Safari Web Inspector. Shape kept small
  // so it's easy to copy back. Wrapped in try/catch because logging
  // must never break audio playback.
  if (!iosDiagnosticsLogged) {
    iosDiagnosticsLogged = true;
    try {
      const nav = navigator as {
        audioSession?: { type?: string };
        userAgent?: string;
      };
      console.log('[audio]', {
        hasAudioSessionApi:
          typeof navigator !== 'undefined' && 'audioSession' in navigator,
        audioSessionType: nav.audioSession?.type,
        ua: nav.userAgent,
      });
    } catch {
      /* never throw from a diagnostic */
    }
  }
}

async function ensureToneStarted(): Promise<void> {
  if (toneStarted) return;
  // User-gesture context: triple-layered iOS workaround all activated
  // here so they all get the same gesture credit.
  //   (1) audioSession.type = 'playback' (iOS 17.4+)
  //   (2) silent <audio> primer (legacy, all iOS versions)
  //   (3) <video> srcObject = MediaStream (the YouTube-style fix)
  primeIosAudioSession();
  await startAudioVideo();
  const T = await loadTone();
  try {
    await T.start();
    pushAudioLog('Tone.start', true);
  } catch (e) {
    pushAudioLog(
      'Tone.start',
      false,
      e instanceof Error ? e.message : String(e)
    );
    throw e;
  }
  toneStarted = true;
  emitDiagnostics();
}

export async function playNotes(
  toneNames: string[],
  mode: 'block' | 'broken' = 'block'
): Promise<void> {
  if (!pianoReady || !sampler) {
    pushAudioLog('playNotes.skip', false, 'piano not ready');
    return;
  }
  await ensureToneStarted();
  const T = await loadTone();
  try {
    if (mode === 'block') {
      sampler.triggerAttackRelease(toneNames, '2n');
    } else {
      const t = T.now();
      toneNames.forEach((n, i) => {
        sampler!.triggerAttackRelease(n, '4n', t + i * 0.18);
      });
    }
    pushAudioLog('playNotes', true, `${mode}, ${toneNames.length} notes`);
  } catch (e) {
    pushAudioLog(
      'playNotes',
      false,
      e instanceof Error ? e.message : String(e)
    );
    throw e;
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
//
// Walk Through fires this many times in succession. We log only the FIRST
// one per Tone.start session (i.e. while toneStarted was just flipped) so
// the panel doesn't drown in repetitive entries; subsequent calls go quiet
// to keep the log readable.
let playSustainedLogged = false;
export async function playSustained(
  toneNames: string[],
  durationSec: number
): Promise<void> {
  if (!pianoReady || !sampler) {
    pushAudioLog('playSustained.skip', false, 'piano not ready');
    return;
  }
  await ensureToneStarted();
  try {
    sampler.triggerAttackRelease(toneNames, durationSec);
    if (!playSustainedLogged) {
      playSustainedLogged = true;
      pushAudioLog(
        'playSustained',
        true,
        `${toneNames.length} notes, ${durationSec.toFixed(2)}s`
      );
    }
  } catch (e) {
    pushAudioLog(
      'playSustained',
      false,
      e instanceof Error ? e.message : String(e)
    );
    throw e;
  }
}

// Cut all currently sounding notes immediately. Used when the user hits
// "■ 停止" mid-walkthrough.
export function releaseAllNotes(): void {
  if (!sampler) return;
  sampler.releaseAll();
}
