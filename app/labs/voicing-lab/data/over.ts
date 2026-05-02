import type { ChordsRowProgression } from './types';

// Glasper-style "Over" voicings: RH plays the close chord-tone triad
// (R, 3, 5 or R, 5, 7) in the mid–high register; LH plays the upper
// extensions (7, 9, 11, 13) clustered just below.

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
      id: 'dbmaj9',
      symbol: 'D♭M9',
      roman: '♭VIM9',
      degreesLabel: 'L.H. M7, 9 / R.H. R, 3, 5',
      lh: [
        { note: 'C3',  degree: 'M7' },
        { note: 'Eb3', degree: '9'  },
      ],
      rh: [
        { note: 'Db4', degree: 'R' },
        { note: 'F4',  degree: '3' },
        { note: 'Ab4', degree: '5' },
      ],
    },
    {
      id: 'dm11',
      symbol: 'Dm11',
      roman: 'VIm11',
      degreesLabel: 'L.H. ♭7, 9, 11 / R.H. R, ♭3, 5',
      lh: [
        { note: 'C3', degree: '♭7' },
        { note: 'E3', degree: '9'  },
        { note: 'G3', degree: '11' },
      ],
      rh: [
        { note: 'D4', degree: 'R'  },
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
      ],
    },
    {
      id: 'fmaj7',
      symbol: 'FM7',
      roman: 'IM7',
      degreesLabel: 'L.H. M7, 3 / R.H. R, 3, 5',
      lh: [
        { note: 'E3', degree: 'M7' },
        { note: 'A3', degree: '3'  },
      ],
      rh: [
        { note: 'F4', degree: 'R' },
        { note: 'A4', degree: '3' },
        { note: 'C5', degree: '5' },
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
      id: 'bbmaj7',
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
