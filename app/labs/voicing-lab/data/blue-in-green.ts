import type { BarsGridProgression } from './types';

// Blue In Green (Bill Evans / Miles Davis, 1959 — "Kind of Blue") —
// the famous unconventional 10-bar form in D minor (Dorian-leaning).
// 6 of 10 bars carry two chords each (half-bar splits via the
// existing { key, beats } array). Tempo follows the original
// recording at ~60 BPM (extreme ballad).
//
// The Dm tonic is voiced as Dm6/9 (♭3, 5, 6, 9) — a Bill Evans
// signature voicing matching the existing Cm69 in Minor Turnaround.
// V7→i resolutions (A7♭9 → Dm6/9, D7♭9 → Dm6/9) use the inverted
// 3-13-♭7-♭9 dominant pattern shared with Autumn Leaves' D7♭9 for
// consistent textbook voice leading.
//
// Voicings reused: B♭M7 / F7 (Autumn Leaves), Cm7 / E♭M7 (Cadence
// Cycle), D7♭9 (Autumn Leaves). New voicings: A7♭9 (V7 of Dm),
// Am7 (v7), Dm69 (i6/9 — Bill Evans tonic).

export const blueInGreen: BarsGridProgression = {
  id: 'blue-in-green',
  label: 'Blue In Green - Bill Evans',
  subtitle: 'Blue In Green — 10 bars (Dm modal)',
  progressionLabel: 'Blue In Green (Bill Evans / Miles Davis, 1959) — 10 bars',
  displayMode: 'bars-grid',
  tempo: 60,
  key: 'Dm',
  voicings: {
    BbM7: {
      symbol: 'B♭M7',
      roman: '♭VIΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4', degree: '3'  },
        { note: 'F4', degree: '5'  },
        { note: 'A4', degree: 'M7' },
        { note: 'C5', degree: '9'  },
      ],
    },
    A7b9: {
      symbol: 'A7(♭9)',
      roman: 'V7',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'C#4', degree: '3'  },
        { note: 'F#4', degree: '13' },
        { note: 'G4',  degree: '♭7' },
        { note: 'Bb4', degree: '♭9' },
      ],
    },
    Dm69: {
      symbol: 'Dm6/9',
      roman: 'i6/9',
      degreesLabel: '♭3, 5, 6, 9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'B4', degree: '6'  },
        { note: 'E5', degree: '9'  },
      ],
    },
    Cm7: {
      symbol: 'Cm7',
      roman: 'ii7/♭VI',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    F7: {
      symbol: 'F7',
      roman: 'V7/♭VI',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'A4',  degree: '3'  },
        { note: 'D5',  degree: '13' },
      ],
    },
    Am7: {
      symbol: 'Am7',
      roman: 'v7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4', degree: '♭7' },
        { note: 'B4', degree: '9'  },
        { note: 'C5', degree: '♭3' },
        { note: 'E5', degree: '5'  },
      ],
    },
    D7b9: {
      symbol: 'D7(♭9)',
      roman: 'V7/IV',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3'  },
        { note: 'B4',  degree: '13' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: '♭IIΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
  },
  bars: [
    { number: 1,  chords: [{ key: 'BbM7', beats: 2 }, { key: 'A7b9', beats: 2 }] },
    { number: 2,  chords: [{ key: 'Dm69', beats: 4 }] },
    { number: 3,  chords: [{ key: 'Cm7',  beats: 2 }, { key: 'F7',   beats: 2 }] },
    { number: 4,  chords: [{ key: 'BbM7', beats: 4 }] },
    { number: 5,  chords: [{ key: 'Am7',  beats: 2 }, { key: 'D7b9', beats: 2 }] },
    { number: 6,  chords: [{ key: 'Dm69', beats: 4 }] },
    { number: 7,  chords: [{ key: 'Cm7',  beats: 2 }, { key: 'F7',   beats: 2 }] },
    { number: 8,  chords: [{ key: 'BbM7', beats: 2 }, { key: 'A7b9', beats: 2 }] },
    { number: 9,  chords: [{ key: 'Dm69', beats: 2 }, { key: 'EbM7', beats: 2 }] },
    { number: 10, chords: [{ key: 'Dm69', beats: 4 }] },
  ],
  group: 'tune',
};
