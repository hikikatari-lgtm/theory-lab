import type { ChordsRowProgression } from './types';

// Glasper-style "Over" voicings: LH plays the chord-tone triad
// (R, 3, 5 etc.) in the mid LH register; RH plays the upper extensions
// (M7, 9, 11, 13) immediately above so the two hands sit in adjacent
// octaves (no large gap).

export const over: ChordsRowProgression = {
  id: 'over',
  label: 'Over / Robert Glasper',
  subtitle: '♭VIM9 - VIm11 - IM7 - IIm9 - IVM7',
  progressionLabel: 'Progression — 5 chords',
  displayMode: 'chords-row',
  tempo: 72,
  key: 'F',
  chords: [
    {
      id: 'bbmaj7',
      symbol: 'B♭M7',
      roman: 'IVM7',
      degreesLabel: 'L.H. R, 3, 5 / R.H. M7, 9',
      lh: [
        { note: 'Bb3', degree: 'R' },
        { note: 'D4',  degree: '3' },
        { note: 'F4',  degree: '5' },
      ],
      rh: [
        { note: 'A4', degree: 'M7' },
        { note: 'C5', degree: '9'  },
      ],
    },
    {
      id: 'dm11',
      symbol: 'Dm11',
      roman: 'VIm11',
      degreesLabel: 'L.H. R, ♭3, 5 / R.H. ♭7, 9, 11',
      lh: [
        { note: 'D3', degree: 'R'  },
        { note: 'F3', degree: '♭3' },
        { note: 'A3', degree: '5'  },
      ],
      rh: [
        { note: 'C4', degree: '♭7' },
        { note: 'E4', degree: '9'  },
        { note: 'G4', degree: '11' },
      ],
    },
    {
      id: 'fmaj7',
      symbol: 'FM7',
      roman: 'IM7',
      degreesLabel: 'L.H. R, 3, 5 / R.H. M7, 3',
      lh: [
        { note: 'F3', degree: 'R' },
        { note: 'A3', degree: '3' },
        { note: 'C4', degree: '5' },
      ],
      rh: [
        { note: 'E4', degree: 'M7' },
        { note: 'A4', degree: '3'  },
      ],
    },
    {
      id: 'gm9',
      symbol: 'Gm9',
      roman: 'IIm9',
      degreesLabel: 'L.H. ♭7, 9 / R.H. R, ♭3, 5',
      lh: [
        { note: 'F3', degree: '♭7' },
        { note: 'A3', degree: '9'  },
      ],
      rh: [
        { note: 'G4',  degree: 'R'  },
        { note: 'Bb4', degree: '♭3' },
        { note: 'D5',  degree: '5'  },
      ],
    },
    {
      id: 'bbmaj7-tbd',
      symbol: 'B♭M7',
      roman: 'IVM7',
      degreesLabel: 'L.H. 9, 3, 13 / R.H. R, 5, M7',
      lh: [
        { note: 'C3', degree: '9'  },
        { note: 'D3', degree: '3'  },
        { note: 'G3', degree: '13' },
      ],
      rh: [
        { note: 'Bb4', degree: 'R'  },
        { note: 'F5',  degree: '5'  },
        { note: 'A5',  degree: 'M7' },
      ],
    },
  ],
};
