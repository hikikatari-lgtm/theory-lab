import type { BarsGridProgression } from './types';

// Misty (Erroll Garner, 1954) — Eb-major ballad. 16-bar version of the
// 32-bar AABA form: A1 (8 bars) + A2 (same 8 bars), no bridge. The A
// section is famously dense with ii-V activity, including the
// minor-IV (Abm7) → backdoor V7 (Db7) device that resolves back to
// EbM7 in bar 5.
//
// 8 of 16 bars carry two chords each (half-bar splits). Voicings are
// reused from prior progressions where possible — Bb7 / Cm7 / Fm7 /
// EbM7 from Minor Cadence Cycle, Bbm7 / Eb7 / AbM7 from Body And Soul,
// Gm7 / C7 from F Blues. New voicings: Abm7 (parallel-minor IV) and
// Db7 (backdoor dominant), designed for textbook voice leading at the
// AbM7 → Abm7 → Db7 → EbM7 chromatic descent.

export const misty: BarsGridProgression = {
  id: 'misty',
  label: 'Misty - Erroll Garner',
  subtitle: 'Misty — 16 bars (A1 + A2)',
  progressionLabel: 'Misty (Erroll Garner, 1954) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'Eb',
  voicings: {
    EbM7: {
      symbol: 'E♭M7',
      roman: 'E♭: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Bbm7: {
      symbol: 'B♭m7',
      roman: 'E♭: ii7/IV',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭3' },
        { note: 'F4',  degree: '5'  },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
    Eb7: {
      symbol: 'E♭7',
      roman: 'E♭: V7/IV',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭7' },
        { note: 'F4',  degree: '9'  },
        { note: 'G4',  degree: '3'  },
        { note: 'C5',  degree: '13' },
      ],
    },
    AbM7: {
      symbol: 'A♭M7',
      roman: 'E♭: IVΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'C4',  degree: '3'  },
        { note: 'Eb4', degree: '5'  },
        { note: 'G4',  degree: 'M7' },
        { note: 'Bb4', degree: '9'  },
      ],
    },
    Abm7: {
      symbol: 'A♭m7',
      roman: 'E♭: ivm7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'B3',  degree: '♭3' },
        { note: 'Eb4', degree: '5'  },
        { note: 'Gb4', degree: '♭7' },
        { note: 'Bb4', degree: '9'  },
      ],
    },
    Db7: {
      symbol: 'D♭7',
      roman: 'E♭: ♭VII7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Db2', degree: 'R' }],
      rh: [
        { note: 'B3',  degree: '♭7' },
        { note: 'Eb4', degree: '9'  },
        { note: 'F4',  degree: '3'  },
        { note: 'Bb4', degree: '13' },
      ],
    },
    Cm7: {
      symbol: 'Cm7',
      roman: 'E♭: vi7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'E♭: ii7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'E♭: V7',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '3'  },
        { note: 'G4',  degree: '13' },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
    Gm7: {
      symbol: 'Gm7',
      roman: 'E♭: iii7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'A4',  degree: '9'  },
        { note: 'Bb4', degree: '♭3' },
        { note: 'D5',  degree: '5'  },
      ],
    },
    C7: {
      symbol: 'C7',
      roman: 'E♭: V7/vi',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
  },
  bars: [
    // A1 (1-8)
    { number: 1,  chords: [{ key: 'EbM7', beats: 4 }] },
    { number: 2,  chords: [{ key: 'Bbm7', beats: 2 }, { key: 'Eb7', beats: 2 }] },
    { number: 3,  chords: [{ key: 'AbM7', beats: 4 }] },
    { number: 4,  chords: [{ key: 'Abm7', beats: 2 }, { key: 'Db7', beats: 2 }] },
    { number: 5,  chords: [{ key: 'EbM7', beats: 2 }, { key: 'Cm7', beats: 2 }] },
    { number: 6,  chords: [{ key: 'Fm7',  beats: 2 }, { key: 'Bb7', beats: 2 }] },
    { number: 7,  chords: [{ key: 'Gm7',  beats: 2 }, { key: 'C7',  beats: 2 }] },
    { number: 8,  chords: [{ key: 'Fm7',  beats: 2 }, { key: 'Bb7', beats: 2 }] },
    // A2 (9-16) — identical to A1
    { number: 9,  chords: [{ key: 'EbM7', beats: 4 }] },
    { number: 10, chords: [{ key: 'Bbm7', beats: 2 }, { key: 'Eb7', beats: 2 }] },
    { number: 11, chords: [{ key: 'AbM7', beats: 4 }] },
    { number: 12, chords: [{ key: 'Abm7', beats: 2 }, { key: 'Db7', beats: 2 }] },
    { number: 13, chords: [{ key: 'EbM7', beats: 2 }, { key: 'Cm7', beats: 2 }] },
    { number: 14, chords: [{ key: 'Fm7',  beats: 2 }, { key: 'Bb7', beats: 2 }] },
    { number: 15, chords: [{ key: 'Gm7',  beats: 2 }, { key: 'C7',  beats: 2 }] },
    { number: 16, chords: [{ key: 'Fm7',  beats: 2 }, { key: 'Bb7', beats: 2 }] },
  ],
  group: 'tune',
};
