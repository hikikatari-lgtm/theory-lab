import type { ChordsRowChord, ChordsRowProgression } from './types';

// 251 with altered dominant: V7 carries ♯9 and ♯5. Defined in C and
// transposed at render time. IDs are Roman-numeral based so selection
// persists across 12-key cycling.

const chords: ChordsRowChord[] = [
  {
    id: 'iim7',
    symbol: 'Dm7',
    roman: 'IIm7',
    degreesLabel: '♭3, 5, ♭7, 9',
    lh: ['D2'],
    rh: [
      { note: 'F4', degree: '♭3' },
      { note: 'A4', degree: '5'  },
      { note: 'C5', degree: '♭7' },
      { note: 'E5', degree: '9'  },
    ],
  },
  {
    id: 'v7alt',
    symbol: 'G7(♯9♯5)',
    roman: 'V7(♯9♯5)',
    degreesLabel: '♭7, ♯9, 3, ♯5',
    lh: ['G2'],
    rh: [
      { note: 'F4',  degree: '♭7' },
      { note: 'Bb4', degree: '♯9' },
      { note: 'B4',  degree: '3'  },
      { note: 'Eb5', degree: '♯5' },
    ],
  },
  {
    id: 'imaj7',
    symbol: 'CM7',
    roman: 'IM7',
    degreesLabel: '3, 5, M7, 9',
    lh: ['C2'],
    rh: [
      { note: 'E4', degree: '3'  },
      { note: 'G4', degree: '5'  },
      { note: 'B4', degree: 'M7' },
      { note: 'D5', degree: '9'  },
    ],
  },
];

export const twoFiveOneAltered: ChordsRowProgression = {
  id: 'two-five-one-altered',
  label: '251 Altered Voicing',
  subtitle: 'IIm7 - V7(♯9♯5) - IM7',
  progressionLabel: '2-5-1 オルタード — 構造練習',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'C',
  chords,
  group: '構造系',
  supportsAllKeys: true,
  baseKey: 'C',
};
