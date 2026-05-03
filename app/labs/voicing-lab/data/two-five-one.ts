import type { ChordsRowChord, ChordsRowProgression } from './types';

// 251 voicings are defined in C and transposed at render time. IDs are
// Roman-numeral based (not C-key chord names) so that selection persists
// across A/B variant flips and 12-key cycling.

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
