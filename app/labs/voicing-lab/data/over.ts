import type { ChordsRowProgression } from './types';

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
      degreesLabel: 'M7, 9',
      lh: [
        { note: 'Db2', degree: 'R' },
        { note: 'F2',  degree: '3' },
        { note: 'Ab2', degree: '5' },
      ],
      rh: [
        { note: 'C5',  degree: 'M7' },
        { note: 'Eb5', degree: '9'  },
      ],
    },
    {
      id: 'dm11',
      symbol: 'Dm11',
      roman: 'VIm11',
      degreesLabel: '♭7, 9, 11',
      lh: [
        { note: 'D2', degree: 'R'  },
        { note: 'F2', degree: '♭3' },
        { note: 'A2', degree: '5'  },
      ],
      rh: [
        { note: 'C5', degree: '♭7' },
        { note: 'E5', degree: '9'  },
        { note: 'G5', degree: '11' },
      ],
    },
    {
      id: 'fmaj7',
      symbol: 'FM7',
      roman: 'IM7',
      degreesLabel: 'M7, 3',
      lh: [
        { note: 'F2', degree: 'R' },
        { note: 'A2', degree: '3' },
        { note: 'C3', degree: '5' },
      ],
      rh: [
        { note: 'E4', degree: 'M7' },
        { note: 'A5', degree: '3'  },
      ],
    },
    {
      id: 'gm9',
      symbol: 'Gm9',
      roman: 'IIm9',
      degreesLabel: '♭7, 9',
      lh: [
        { note: 'G2',  degree: 'R'  },
        { note: 'Bb2', degree: '♭3' },
        { note: 'D3',  degree: '5'  },
      ],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
      ],
    },
    {
      id: 'bbmaj7',
      symbol: 'B♭M7',
      roman: 'IVM7',
      degreesLabel: '9, 3, 13',
      lh: [
        { note: 'Bb2', degree: 'R'  },
        { note: 'F3',  degree: '5'  },
        { note: 'A3',  degree: 'M7' },
      ],
      rh: [
        { note: 'C5', degree: '9'  },
        { note: 'D5', degree: '3'  },
        { note: 'G5', degree: '13' },
      ],
    },
  ],
};
