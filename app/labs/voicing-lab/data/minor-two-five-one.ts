import type { ChordsRowChord, ChordsRowProgression } from './types';

// Minor 251 voicing — IIm7♭5 → V7♭9 → Im7 in C minor, transposed at
// render time. Rootless 4-note voicings per mDecks Vol.2 design rule:
// the 7th-chord root is replaced by the 9th (♭9 in the Locrian/altered
// contexts), and the dominant's 5 is replaced by the 13. IDs are
// Roman-numeral based so selection persists across 12-key cycling.

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
    id: 'v7b9',
    symbol: 'G7(♭9)',
    roman: 'V7♭9',
    degreesLabel: '♭7, ♭9, 3, 13',
    lh: [{ note: 'G2', degree: 'R' }],
    rh: [
      { note: 'F4',  degree: '♭7' },
      { note: 'Ab4', degree: '♭9' },
      { note: 'B4',  degree: '3'  },
      { note: 'E5',  degree: '13' },
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

export const minorTwoFiveOne: ChordsRowProgression = {
  id: 'minor-two-five-one',
  label: 'Minor 251 Voicing',
  subtitle: 'IIm7♭5 - V7♭9 - Im7',
  progressionLabel: 'Minor 2-5-1 — 構造練習',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'Cm',
  chords,
  group: '構造系',
  supportsAllKeys: true,
  baseKey: 'C',
};
