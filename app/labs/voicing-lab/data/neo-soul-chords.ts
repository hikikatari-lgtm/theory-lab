import type { ChordsRowProgression } from './types';

// "Neo Soul Chords" — Piano Peak Academy's 9th-flavored progression
// in Bb (Mixolydian inflection). Each chord is voiced as a compact
// rootless-style RH triad built from ♭7, 9, and the chord's third
// (M7+9+3 for the major), anchored by a single LH bass note.

export const neoSoulChords: ChordsRowProgression = {
  id: 'neo-soul-chords',
  label: 'Neo Soul Chords / Piano Peak Academy',
  subtitle: 'I7 - IIm7 - VIIm7 - ♭VIIM7',
  progressionLabel: 'Progression — 4 chords',
  displayMode: 'chords-row',
  tempo: 84,
  key: 'B♭',
  chords: [
    {
      id: 'bb9',
      symbol: 'B♭9',
      roman: 'I7',
      degreesLabel: 'L.H. R / R.H. ♭7, 9, 3',
      lh: [
        { note: 'Bb2', degree: 'R' },
      ],
      rh: [
        { note: 'Ab3', degree: '♭7' },
        { note: 'C4',  degree: '9'  },
        { note: 'D4',  degree: '3'  },
      ],
    },
    {
      id: 'cm9',
      symbol: 'Cm9',
      roman: 'IIm7',
      degreesLabel: 'L.H. R / R.H. ♭7, 9, ♭3',
      lh: [
        { note: 'C3', degree: 'R' },
      ],
      rh: [
        { note: 'Bb3', degree: '♭7' },
        { note: 'D4',  degree: '9'  },
        { note: 'Eb4', degree: '♭3' },
      ],
    },
    {
      id: 'am9',
      symbol: 'Am9',
      roman: 'VIIm7',
      degreesLabel: 'L.H. R / R.H. ♭7, 9, ♭3',
      lh: [
        { note: 'A2', degree: 'R' },
      ],
      rh: [
        { note: 'G3', degree: '♭7' },
        { note: 'B3', degree: '9'  },
        { note: 'C4', degree: '♭3' },
      ],
    },
    {
      id: 'abmaj9',
      symbol: 'A♭M9',
      roman: '♭VIIM7',
      degreesLabel: 'L.H. R / R.H. M7, 9, 3',
      lh: [
        { note: 'Ab2', degree: 'R' },
      ],
      rh: [
        { note: 'G3',  degree: 'M7' },
        { note: 'Bb3', degree: '9'  },
        { note: 'C4',  degree: '3'  },
      ],
    },
  ],
  group: 'tune',
};
