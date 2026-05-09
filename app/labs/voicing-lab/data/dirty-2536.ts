import type { ChordsRowProgression } from './types';

// "Dirty 2536 in C" — iVerza's neo-soul "dirty chord" voicings.
// Each RH stacks chord tones with extensions (9, 11, 13) and
// chromatic clash notes over a root anchor in the LH. The clashes
// (♭9 Ab in G7, ♭9 Bb in Am7, F# top in Em7) and the dense thumb
// clusters (F+G in Dm7) are what give these voicings their
// characteristic neo-soul grit.

export const dirty2536: ChordsRowProgression = {
  id: 'dirty-2536',
  label: 'Dirty 2536 in C / iVerza',
  subtitle: 'IIm7 - V7 - IIIm7 - VIm7',
  progressionLabel: 'Progression — 4 chords',
  displayMode: 'chords-row',
  tempo: 90,
  key: 'C',
  chords: [
    {
      id: 'dm7-dirty',
      symbol: 'Dm7',
      roman: 'IIm7',
      degreesLabel: 'L.H. R, R / R.H. ♭3, 11, 5, ♭7, 9',
      lh: [
        { note: 'D2', degree: 'R' },
        { note: 'D3', degree: 'R' },
      ],
      rh: [
        { note: 'F3', degree: '♭3' },
        { note: 'G3', degree: '11' },
        { note: 'A3', degree: '5'  },
        { note: 'C4', degree: '♭7' },
        { note: 'E4', degree: '9'  },
      ],
    },
    {
      id: 'g7-dirty',
      symbol: 'G7',
      roman: 'V7',
      degreesLabel: 'L.H. R / R.H. ♭7, ♭9, 3, 13',
      lh: [
        { note: 'G2', degree: 'R' },
      ],
      rh: [
        { note: 'F3',  degree: '♭7' },
        { note: 'Ab3', degree: '♭9' },
        { note: 'B3',  degree: '3'  },
        { note: 'E4',  degree: '13' },
      ],
    },
    {
      id: 'em7-dirty',
      symbol: 'Em7',
      roman: 'IIIm7',
      degreesLabel: 'L.H. R / R.H. R, ♭3, 11, 5, ♭7, 9',
      lh: [
        { note: 'E2', degree: 'R' },
      ],
      rh: [
        { note: 'E3',  degree: 'R'  },
        { note: 'G3',  degree: '♭3' },
        { note: 'A3',  degree: '11' },
        { note: 'B3',  degree: '5'  },
        { note: 'D4',  degree: '♭7' },
        { note: 'F#4', degree: '9'  },
      ],
    },
    {
      id: 'am7-dirty',
      symbol: 'Am7',
      roman: 'VIm7',
      degreesLabel: 'L.H. R / R.H. ♭7, ♭9, 11, 5, ♭7',
      lh: [
        { note: 'A2', degree: 'R' },
      ],
      rh: [
        { note: 'G3',  degree: '♭7' },
        { note: 'Bb3', degree: '♭9' },
        { note: 'D4',  degree: '11' },
        { note: 'E4',  degree: '5'  },
        { note: 'G4',  degree: '♭7' },
      ],
    },
  ],
  group: 'tune',
};
