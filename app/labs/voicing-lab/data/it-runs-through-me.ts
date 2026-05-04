import type { BarsGridProgression, Voicing } from './types';

// It Runs Through Me (Tom Misch ft. De La Soul, Geography, 2018) —
// B minor Neo Soul / British soul. 16-bar form: A loop (im7 → ii-V/♭III
// → ♭VImaj7 → V altered) repeated, then variant ending on V altered as
// final cadence point.
//
// Phase R&B-A PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate Phase R&B-B PR.
//
// Pedagogical centerpiece — the "Quincy Jones chord" (B/C♯):
// LH plays C♯ as bass, RH plays B major triad above (B-D♯-F♯). On the
// keyboard this LITERALLY shows as "C♯ at the bottom with a B major
// triad floating above it" — the visual archetype of upper-structure
// voicing. Functionally equivalent to C♯7sus or C♯m7add11; encoded
// here as the slash-chord notation B/C♯ to keep the upper structure
// visually parsable. Unique voicing-dict key `BoverCs` — distinct from
// any rootless m7♭5 or sus voicing in the rest of the lab so it
// reads as its own concept.

const V_Bm7: Voicing = {
  symbol: 'Bm7',
  roman: 'Bm: im7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '♭3' },
    { note: 'F#4', degree: '5'  },
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
  ],
};

const V_Am9: Voicing = {
  symbol: 'Am9',
  roman: 'Bm: ♭VIIm9',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5'  },
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
  ],
};

const V_D9: Voicing = {
  symbol: 'D9',
  roman: 'Bm: ♭III9',
  degreesLabel: '3, 5, ♭7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'A4',  degree: '5'  },
    { note: 'C5',  degree: '♭7' },
    { note: 'E5',  degree: '9'  },
  ],
};

const V_Gmaj7: Voicing = {
  symbol: 'Gmaj7',
  roman: 'Bm: ♭VImaj7',
  degreesLabel: 'M7, 9, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: 'M7' },
    { note: 'A4',  degree: '9'  },
    { note: 'B4',  degree: '3'  },
    { note: 'D5',  degree: '5'  },
  ],
};

// "Quincy Jones chord" — B major triad over C♯ bass. The upper triad
// sits in close position in the upper register so it visibly "floats"
// above the C♯ bass. 3-note RH (no fourth voice) is intentional: the
// triad's purity is the whole point.
const V_BoverCs: Voicing = {
  symbol: 'B/C♯',
  roman: 'Bm: (QJ chord — upper structure)',
  degreesLabel: 'L.H. C♯ bass / R.H. B major triad (B-D♯-F♯)',
  lh: [{ note: 'C#2', degree: 'C♯ bass' }],
  rh: [
    { note: 'B4',  degree: 'B (triad R)'  },
    { note: 'D#5', degree: 'D♯ (triad 3)' },
    { note: 'F#5', degree: 'F♯ (triad 5)' },
  ],
};

const V_F7s5: Voicing = {
  symbol: 'F7♯5',
  roman: 'Bm: V7♯5 (altered)',
  degreesLabel: '3, ♯5, ♭7, 9',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '3'  },
    { note: 'C#5', degree: '♯5' },
    { note: 'Eb5', degree: '♭7' },
    { note: 'G5',  degree: '9'  },
  ],
};

export const itRunsThroughMe: BarsGridProgression = {
  id: 'it-runs-through-me',
  label: 'It Runs Through Me - Tom Misch',
  subtitle: 'It Runs Through Me — 16 bars (Bm, QJ chord + V altered)',
  progressionLabel: 'It Runs Through Me (Tom Misch ft. De La Soul, Geography, 2018) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 97,
  key: 'Bm',
  voicings: {
    Bm7:     V_Bm7,
    Am9:     V_Am9,
    D9:      V_D9,
    Gmaj7:   V_Gmaj7,
    BoverCs: V_BoverCs,
    F7s5:    V_F7s5,
  },
  bars: [
    // A: Main Loop (1-8) — 4-bar loop ×2, lands on QJ chord → V altered
    { number: 1, chords: [{ key: 'Bm7',   beats: 4 }] },
    { number: 2, chords: [
      { key: 'Am9', beats: 2 },
      { key: 'D9',  beats: 2 },
    ] },
    { number: 3, chords: [{ key: 'Gmaj7', beats: 4 }] },
    { number: 4, chords: [
      { key: 'BoverCs', beats: 2 },
      { key: 'F7s5',    beats: 2 },
    ] },
    { number: 5, chords: [{ key: 'Bm7',   beats: 4 }] },
    { number: 6, chords: [
      { key: 'Am9', beats: 2 },
      { key: 'D9',  beats: 2 },
    ] },
    { number: 7, chords: [{ key: 'Gmaj7', beats: 4 }] },
    { number: 8, chords: [
      { key: 'BoverCs', beats: 2 },
      { key: 'F7s5',    beats: 2 },
    ] },
    // B: Pre-Chorus → Chorus (9-16) — same 4-bar loop, but bars 12 & 16
    // sit on V altered for a full bar (tension peak before final resolve)
    { number: 9,  chords: [{ key: 'Bm7',   beats: 4 }] },
    { number: 10, chords: [
      { key: 'Am9', beats: 2 },
      { key: 'D9',  beats: 2 },
    ] },
    { number: 11, chords: [{ key: 'Gmaj7', beats: 4 }] },
    { number: 12, chords: [{ key: 'F7s5',  beats: 4 }] },
    { number: 13, chords: [{ key: 'Bm7',   beats: 4 }] },
    { number: 14, chords: [
      { key: 'Am9', beats: 2 },
      { key: 'D9',  beats: 2 },
    ] },
    { number: 15, chords: [{ key: 'Gmaj7', beats: 4 }] },
    { number: 16, chords: [{ key: 'F7s5',  beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Main Loop)',              barRange: [1, 8]  },
    { name: 'B', label: 'B (Pre-Chorus / Chorus)',    barRange: [9, 16] },
  ],
};
