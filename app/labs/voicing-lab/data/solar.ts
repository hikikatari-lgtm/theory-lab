import type {
  BarsGridProgression,
  RhythmInfo,
  WalkingBassInfo,
} from './types';

// Solar (Miles Davis, 1954) — modal jazz standard in C minor. 12-bar
// AAB' form, each section 4 bars. The piece's pedagogical hook is its
// "descending half-step sequence": F→Fm→B♭7→E♭ in section A' is
// repeated a half-step DOWN as E♭→E♭m→A♭7→D♭ in section B (first
// half), landing on the home Cm6 via Dm7♭5→G7♭9.
//
// Form (12 bars):
//   A  (mm. 1-4):    Cm6 | Cm6 | Gm7 | C7         (i6 → v7 → V/IV)
//   A' (mm. 5-8):    F△  | F△  | Fm7 | B♭7        (IV→iv→♭VII7 toward E♭)
//   B  (mm. 9-12):   E♭△ E♭m7 | A♭7 D♭△ | Dm7♭5 G7♭9 | Cm6
//                    (♭III△→♭iii7 → ♭VI7→♭II△ → ii7♭5→V7♭9 → i6)
//
// Voicings (rootless 4-note in RH, root in LH bass) follow the
// Body-And-Soul style. Reuses pitch-identical voicings from existing
// progressions where chord types match (Cm6 / Gm7 / C7 / FM7 / EbM7 /
// Ebm7 / Ab7 / DbM7 / Dm7♭5 / G7♭9 — 10 of 12 chords). Fm7 and Bb7
// use *different inversions* than the existing Cadence Cycle entries
// so the F△→Fm7→B♭7→E♭△ chain has textbook parallel-mode and ii-V
// voice leading: F△ (A4-C5-E5-G5) → Fm7 inverted (A♭4-C5-E♭5-G5,
// 2 common + 2 half-steps) → B♭7 inverted (A♭4-C5-D5-G5, 3 common +
// 1 half-step) → E♭△ (G4-B♭4-D5-F5, 1 common + 3 step movements).
//
// Walking bass: ascending throughout for full bars (bar 2 uses a
// variant ending 1-5-6-♭7 instead of bar 1's 1-♭3-5-6 to give the
// Cm6 vamp some movement). Half-bar chords in mm. 9-11 use the R-3
// (or R-♭3) compact pattern.
//
// Rhythm: split between Rhythm C (mm. 1-8 = single-chord full bars,
// all-upbeat anticipation) and Rhythm D (mm. 9-12 = chord-change
// pickup version). Bar 12 is a full Cm6 bar with Rhythm D FULL so
// the cycle closes on the i6 with the chord-change pickup figure.

const WB_Cm6_BAR1: WalkingBassInfo = { pattern: 'ascending', notes: ['C2', 'Eb2', 'G2',  'A2']  };
const WB_Cm6_BAR2: WalkingBassInfo = { pattern: 'ascending', notes: ['C2', 'G2',  'A2',  'Bb2'] };
const WB_Gm7:      WalkingBassInfo = { pattern: 'ascending', notes: ['G2', 'Bb2', 'D3',  'F3']  };
const WB_C7:       WalkingBassInfo = { pattern: 'ascending', notes: ['C2', 'E2',  'G2',  'Bb2'] };
const WB_FM7_BAR5: WalkingBassInfo = { pattern: 'ascending', notes: ['F2', 'A2',  'C3',  'E3']  };
const WB_FM7_BAR6: WalkingBassInfo = { pattern: 'ascending', notes: ['F2', 'A2',  'C3',  'D3']  };
const WB_Fm7:      WalkingBassInfo = { pattern: 'ascending', notes: ['F2', 'Ab2', 'C3',  'Eb3'] };
const WB_Bb7:      WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3', 'F3',  'Ab3'] };

const WB_EbM7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2']  };
const WB_Ebm7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'Gb2'] };
const WB_Ab7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3']  };
const WB_DbM7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['Db2', 'F2']  };
const WB_Dm7b5_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F2']  };
const WB_G7b9_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'B2']  };

// Rhythm C: all-upbeat hits (mm. 1-8). Rhythm D: chord-change pickup
// version. The HALF1/HALF2 split sums to the bar-level Rhythm D pattern
// [0.5, 2, 2.5, 3.5] when applied to a 2+2 half-bar pair, with the hit
// at beat 3 (= local 0 of HALF2) firing the new chord's voicing.
const RHYTHM_C:        RhythmInfo = { pattern: 'C', hits: [0.5, 1.5, 2.5, 3.5] };
const RHYTHM_D_FULL:   RhythmInfo = { pattern: 'D', hits: [0.5, 2, 2.5, 3.5] };
const RHYTHM_D_HALF1:  RhythmInfo = { pattern: 'D', hits: [0.5] };
const RHYTHM_D_HALF2:  RhythmInfo = { pattern: 'D', hits: [0, 0.5, 1.5] };

export const solar: BarsGridProgression = {
  id: 'solar',
  label: 'Solar - Miles Davis',
  subtitle: 'Solar — 12 bars (AAB′)',
  progressionLabel: 'Solar (Miles Davis, 1954) — 12 bars',
  displayMode: 'bars-grid',
  tempo: 150,
  key: 'Cm',
  voicings: {
    Cm6: {
      symbol: 'Cm6',
      roman: 'Cm: i6',
      degreesLabel: '♭3, 5, 6, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'A4',  degree: '6'  },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Gm7: {
      symbol: 'Gm7',
      roman: 'Cm: v7',
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
      roman: 'Cm: I7 (V/IV)',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    FM7: {
      symbol: 'FM7',
      roman: 'Cm: IV△',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'A4', degree: '3'  },
        { note: 'C5', degree: '5'  },
        { note: 'E5', degree: 'M7' },
        { note: 'G5', degree: '9'  },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'Cm: iv7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
        { note: 'Eb5', degree: '♭7' },
        { note: 'G5',  degree: '9'  },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'Cm: ♭VII7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
        { note: 'D5',  degree: '3'  },
        { note: 'G5',  degree: '13' },
      ],
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: 'Cm: ♭III△',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Ebm7: {
      symbol: 'E♭m7',
      roman: 'Cm: ♭iii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭3' },
        { note: 'Bb4', degree: '5'  },
        { note: 'Db5', degree: '♭7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Ab7: {
      symbol: 'A♭7',
      roman: 'Cm: ♭VI7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭7' },
        { note: 'Bb4', degree: '9'  },
        { note: 'C5',  degree: '3'  },
        { note: 'F5',  degree: '13' },
      ],
    },
    DbM7: {
      symbol: 'D♭M7',
      roman: 'Cm: ♭II△',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Db2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '3'  },
        { note: 'Ab4', degree: '5'  },
        { note: 'C5',  degree: 'M7' },
        { note: 'Eb5', degree: '9'  },
      ],
    },
    Dm7b5: {
      symbol: 'Dm7♭5',
      roman: 'Cm: ii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭3' },
        { note: 'Ab4', degree: '♭5' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    G7b9: {
      symbol: 'G7(♭9)',
      roman: 'Cm: V7♭9',
      degreesLabel: '♭7, ♭9, 3, 13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'Ab4', degree: '♭9' },
        { note: 'B4',  degree: '3'  },
        { note: 'E5',  degree: '13' },
      ],
    },
  },
  bars: [
    // A (mm. 1-4): i6 → v7 → V/IV
    { number: 1,  chords: [{ key: 'Cm6', beats: 4, walkingBass: WB_Cm6_BAR1, rhythm: RHYTHM_C }] },
    { number: 2,  chords: [{ key: 'Cm6', beats: 4, walkingBass: WB_Cm6_BAR2, rhythm: RHYTHM_C }] },
    { number: 3,  chords: [{ key: 'Gm7', beats: 4, walkingBass: WB_Gm7,      rhythm: RHYTHM_C }] },
    { number: 4,  chords: [{ key: 'C7',  beats: 4, walkingBass: WB_C7,       rhythm: RHYTHM_C }] },
    // A' (mm. 5-8): IV → iv → ♭VII7 toward E♭
    { number: 5,  chords: [{ key: 'FM7', beats: 4, walkingBass: WB_FM7_BAR5, rhythm: RHYTHM_C }] },
    { number: 6,  chords: [{ key: 'FM7', beats: 4, walkingBass: WB_FM7_BAR6, rhythm: RHYTHM_C }] },
    { number: 7,  chords: [{ key: 'Fm7', beats: 4, walkingBass: WB_Fm7,      rhythm: RHYTHM_C }] },
    { number: 8,  chords: [{ key: 'Bb7', beats: 4, walkingBass: WB_Bb7,      rhythm: RHYTHM_C }] },
    // B (mm. 9-12): half-bar pairs catch the chord changes via Rhythm D split
    { number: 9,  chords: [
      { key: 'EbM7',  beats: 2, walkingBass: WB_EbM7_HALF,  rhythm: RHYTHM_D_HALF1 },
      { key: 'Ebm7',  beats: 2, walkingBass: WB_Ebm7_HALF,  rhythm: RHYTHM_D_HALF2 },
    ] },
    { number: 10, chords: [
      { key: 'Ab7',   beats: 2, walkingBass: WB_Ab7_HALF,   rhythm: RHYTHM_D_HALF1 },
      { key: 'DbM7',  beats: 2, walkingBass: WB_DbM7_HALF,  rhythm: RHYTHM_D_HALF2 },
    ] },
    { number: 11, chords: [
      { key: 'Dm7b5', beats: 2, walkingBass: WB_Dm7b5_HALF, rhythm: RHYTHM_D_HALF1 },
      { key: 'G7b9',  beats: 2, walkingBass: WB_G7b9_HALF,  rhythm: RHYTHM_D_HALF2 },
    ] },
    { number: 12, chords: [{ key: 'Cm6', beats: 4, walkingBass: WB_Cm6_BAR1, rhythm: RHYTHM_D_FULL }] },
  ],
  group: 'tune',
};
