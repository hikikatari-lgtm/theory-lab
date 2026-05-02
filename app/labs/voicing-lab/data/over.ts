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
      lh: ['Db2', 'F2', 'Ab2'],
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
      lh: ['D2', 'F2', 'A2'],
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
      lh: ['F2', 'A2', 'C3'],
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
      lh: ['G2', 'Bb2', 'D3'],
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
      lh: ['Bb2', 'F3', 'A3'],
      rh: [
        { note: 'C5', degree: '9'  },
        { note: 'D5', degree: '3'  },
        { note: 'G5', degree: '13' },
      ],
    },
  ],
};
