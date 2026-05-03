import type { BarsGridProgression } from './types';

// Take Five (Paul Desmond / Dave Brubeck Quartet, 1959 — "Time Out") —
// the iconic 5/4 jazz standard. 16-bar version: A (8 bars in E♭ minor)
// + B (8 bars bridging through Cm and F♯7 tonal areas).
//
// **5/4 time signature**: each bar contains 5 beats. The A-section vamp
// is represented faithfully as E♭m7 (3 beats) + B♭m7 (2 beats) per bar
// — the famous Brubeck rhythmic figure. The B-section sustained chords
// fill the full 5 beats per bar. Walk Through uses beats × beatSec for
// audio timing, so the 3+2 grouping plays correctly without needing
// any audio-layer changes. There is currently no per-bar visual
// indicator for the time signature; the "5/4" text in the subtitle and
// progressionLabel is the only UI cue.
//
// Voicings: E♭m7 reused from Body And Soul (RH at G♭4-F5); Cm7 from
// Cadence Cycle; F♯7 from Body And Soul. B♭m7 is given an inverted
// voicing here (♭7-9-♭3-5 starting at A♭4) — different from the
// existing Body And Soul / Misty B♭m7 — so it sits in the same octave
// as E♭m7 above and shares 2 common tones for the 3+2 vamp transition.

export const takeFive: BarsGridProgression = {
  id: 'take-five',
  label: 'Take Five - Paul Desmond',
  subtitle: 'Take Five — 16 bars (5/4 time)',
  progressionLabel: 'Take Five (Paul Desmond / Dave Brubeck, 1959) — 5/4 time, 16 bars',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'Ebm',
  voicings: {
    Ebm7: {
      symbol: 'E♭m7',
      roman: 'E♭m: i7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭3' },
        { note: 'Bb4', degree: '5'  },
        { note: 'Db5', degree: '♭7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Bbm7: {
      symbol: 'B♭m7',
      roman: 'E♭m: v7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
        { note: 'Db5', degree: '♭3' },
        { note: 'F5',  degree: '5'  },
      ],
    },
    Cm7: {
      symbol: 'Cm7',
      roman: 'Cm: i7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Fs7: {
      symbol: 'F♯7',
      roman: 'Cm: ♭V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'F#2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '♭7' },
        { note: 'G#4', degree: '9'  },
        { note: 'A#4', degree: '3'  },
        { note: 'D#5', degree: '13' },
      ],
    },
  },
  bars: [
    // A (1-8): the iconic 5/4 vamp — E♭m7 (3 beats) + B♭m7 (2 beats) per bar
    { number: 1, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 2, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 3, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 4, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 5, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 6, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 7, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    { number: 8, chords: [{ key: 'Ebm7', beats: 3 }, { key: 'Bbm7', beats: 2 }] },
    // B (9-16): bridge — Cm7 (4 bars) → F♯7 (4 bars), each chord sustained 5 beats
    { number: 9,  chords: [{ key: 'Cm7', beats: 5 }] },
    { number: 10, chords: [{ key: 'Cm7', beats: 5 }] },
    { number: 11, chords: [{ key: 'Cm7', beats: 5 }] },
    { number: 12, chords: [{ key: 'Cm7', beats: 5 }] },
    { number: 13, chords: [{ key: 'Fs7', beats: 5 }] },
    { number: 14, chords: [{ key: 'Fs7', beats: 5 }] },
    { number: 15, chords: [{ key: 'Fs7', beats: 5 }] },
    { number: 16, chords: [{ key: 'Fs7', beats: 5 }] },
  ],
  group: '楽曲系',
};
