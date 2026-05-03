import type { ChordsRowChord, ChordsRowProgression } from './types';

// Minor 251 with altered dominant — IIm7♭5 → V7alt(♯9 ♭13) → Im7 in
// C minor, transposed at render time. Structure mirrors `minor-two-five-one`;
// only the V7 chord is swapped for the altered tension stack
// (♭7, ♯9, 3, ♭13). ♭13 (not ♯5) is used because the resolution target
// is a minor i, per the project's notation convention.

const chords: ChordsRowChord[] = [
  {
    id: 'iim7b5',
    symbol: 'Dm7♭5',
    roman: 'IIm7♭5',
    degreesLabel: '♭3, ♭5, ♭7, ♭9',
    lh: [{ note: 'D2', degree: 'R' }],
    rh: [
      { note: 'F4',  degree: '♭3' },
      { note: 'Ab4', degree: '♭5' },
      { note: 'C5',  degree: '♭7' },
      { note: 'Eb5', degree: '♭9' },
    ],
  },
  {
    id: 'v7alt',
    symbol: 'G7(♯9♭13)',
    roman: 'V7alt',
    degreesLabel: '♭7, ♯9, 3, ♭13',
    lh: [{ note: 'G2', degree: 'R' }],
    rh: [
      { note: 'F4',  degree: '♭7'  },
      { note: 'Bb4', degree: '♯9'  },
      { note: 'B4',  degree: '3'   },
      { note: 'Eb5', degree: '♭13' },
    ],
  },
  {
    id: 'im7',
    symbol: 'Cm7',
    roman: 'Im7',
    degreesLabel: '♭3, 5, ♭7, 9',
    lh: [{ note: 'C2', degree: 'R' }],
    rh: [
      { note: 'Eb4', degree: '♭3' },
      { note: 'G4',  degree: '5'  },
      { note: 'Bb4', degree: '♭7' },
      { note: 'D5',  degree: '9'  },
    ],
  },
];

export const minorTwoFiveOneAltered: ChordsRowProgression = {
  id: 'minor-two-five-one-altered',
  label: 'Minor 251 Altered Voicing',
  subtitle: 'IIm7♭5 - V7alt - Im7',
  progressionLabel: 'Minor 2-5-1 オルタード — 構造練習',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'Cm',
  chords,
  group: '構造系',
  supportsAllKeys: true,
  baseKey: 'C',
};
