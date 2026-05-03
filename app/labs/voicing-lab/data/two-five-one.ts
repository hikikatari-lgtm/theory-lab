import type {
  ChordsRowChord,
  ChordsRowProgression,
  RhythmInfo,
  WalkingBassInfo,
} from './types';

// 251 voicings are defined in C and transposed at render time. IDs are
// Roman-numeral based (not C-key chord names) so that selection persists
// across A/B variant flips and 12-key cycling.
//
// Phase 6-A: Rhythm A is attached to every chord (both variants). Hits
// at beats [0, 1.5] = downbeat + upbeat-of-2, the canonical "dotted
// quarter + eighth" jazz comping figure. Beat positions are key- and
// variant-independent so the same RhythmInfo object is reused across
// all chords. Activated by the player's "+ Rhythm" mode.
const RHYTHM_A: RhythmInfo = { pattern: 'A', hits: [0, 1.5] };

// Phase 6-B: Ascending walking bass per Rule 3a (1 - 3/♭3 - 5 - ♭7/M7).
// Notes are written in C key (ChordsRow base); transposeChord re-spells
// them per current key. Same line for both variants since walking bass
// depends on chord root/type, not on the upper voicing's inversion.
const WB_DM7_ASC:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2', 'F2', 'A2', 'C3'] };
const WB_G7_ASC:   WalkingBassInfo = { pattern: 'ascending', notes: ['G2', 'B2', 'D3', 'F3'] };
const WB_CM7_ASC:  WalkingBassInfo = { pattern: 'ascending', notes: ['C2', 'E2', 'G2', 'B2'] };

const variantA: ChordsRowChord[] = [
  {
    id: 'iim7',
    symbol: 'Dm7',
    roman: 'IIm7',
    degreesLabel: '♭3, 5, ♭7, 9',
    lh: [{ note: 'D2', degree: 'R' }],
    rh: [
      { note: 'F4', degree: '♭3' },
      { note: 'A4', degree: '5'  },
      { note: 'C5', degree: '♭7' },
      { note: 'E5', degree: '9'  },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_DM7_ASC,
  },
  {
    id: 'v7',
    symbol: 'G7',
    roman: 'V7',
    degreesLabel: '♭7, 9, 3, 13',
    lh: [{ note: 'G2', degree: 'R' }],
    rh: [
      { note: 'F4', degree: '♭7' },
      { note: 'A4', degree: '9'  },
      { note: 'B4', degree: '3'  },
      { note: 'E5', degree: '13' },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_G7_ASC,
  },
  {
    id: 'imaj7',
    symbol: 'CM7',
    roman: 'IM7',
    degreesLabel: '3, 5, M7, 9',
    lh: [{ note: 'C2', degree: 'R' }],
    rh: [
      { note: 'E4', degree: '3'  },
      { note: 'G4', degree: '5'  },
      { note: 'B4', degree: 'M7' },
      { note: 'D5', degree: '9'  },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_CM7_ASC,
  },
];

const variantB: ChordsRowChord[] = [
  {
    id: 'iim7',
    symbol: 'Dm7',
    roman: 'IIm7',
    degreesLabel: '♭7, 9, ♭3, 5',
    lh: [{ note: 'D2', degree: 'R' }],
    rh: [
      { note: 'C5', degree: '♭7' },
      { note: 'E5', degree: '9'  },
      { note: 'F5', degree: '♭3' },
      { note: 'A5', degree: '5'  },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_DM7_ASC,
  },
  {
    id: 'v7',
    symbol: 'G7',
    roman: 'V7',
    degreesLabel: '3, 13, ♭7, 9',
    lh: [{ note: 'G2', degree: 'R' }],
    rh: [
      { note: 'B4', degree: '3'  },
      { note: 'E5', degree: '13' },
      { note: 'F5', degree: '♭7' },
      { note: 'A5', degree: '9'  },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_G7_ASC,
  },
  {
    id: 'imaj7',
    symbol: 'CM7',
    roman: 'IM7',
    degreesLabel: 'M7, 9, 3, 5',
    lh: [{ note: 'C2', degree: 'R' }],
    rh: [
      { note: 'B4', degree: 'M7' },
      { note: 'D5', degree: '9'  },
      { note: 'E5', degree: '3'  },
      { note: 'G5', degree: '5'  },
    ],
    rhythm: RHYTHM_A,
    walkingBass: WB_CM7_ASC,
  },
];

export const twoFiveOne: ChordsRowProgression = {
  id: 'two-five-one',
  label: '251 Voicing',
  subtitle: 'IIm7 - V7 - IM7',
  progressionLabel: '2-5-1 — 構造練習',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'C',
  // `chords` is the default render (Type A at the base key). The UI layer
  // re-derives the displayed sequence from `variants[type]` + currentKey
  // once variant/key state is wired up.
  chords: variantA,
  group: 'progression',
  supportsAllKeys: true,
  hasVariants: true,
  baseKey: 'C',
  variants: { a: variantA, b: variantB },
};
