import type { ChordsRowProgression } from './types';

// "Dirty 2536 in C" — iVerza's neo-soul "dirty chord" voicings.
// Each RH packs four chord tones into a close-voiced cluster
// (typically ♭7, R, 9, ♭3 stacked stepwise) over a root anchor
// in the LH. The G7 swaps the 9 for ♭9 and the natural 3 for an
// added clash, giving the dominant a darker bite.

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
      degreesLabel: 'L.H. R / R.H. ♭7, R, 9, ♭3',
      lh: [
        { note: 'D2', degree: 'R' },
      ],
      rh: [
        { note: 'C4', degree: '♭7' },
        { note: 'D4', degree: 'R'  },
        { note: 'E4', degree: '9'  },
        { note: 'F4', degree: '♭3' },
      ],
    },
    {
      id: 'g7-dirty',
      symbol: 'G7',
      roman: 'V7',
      degreesLabel: 'L.H. R / R.H. ♭7, R, ♭9, 3',
      lh: [
        { note: 'G2', degree: 'R' },
      ],
      rh: [
        { note: 'F3',  degree: '♭7' },
        { note: 'G3',  degree: 'R'  },
        { note: 'Ab3', degree: '♭9' },
        { note: 'B3',  degree: '3'  },
      ],
    },
    {
      id: 'em7-dirty',
      symbol: 'Em7',
      roman: 'IIIm7',
      degreesLabel: 'L.H. R / R.H. ♭7, R, 9, ♭3',
      lh: [
        { note: 'E2', degree: 'R' },
      ],
      rh: [
        { note: 'D4',  degree: '♭7' },
        { note: 'E4',  degree: 'R'  },
        { note: 'F#4', degree: '9'  },
        { note: 'G4',  degree: '♭3' },
      ],
    },
    {
      id: 'am7-dirty',
      symbol: 'Am7',
      roman: 'VIm7',
      degreesLabel: 'L.H. R / R.H. ♭7, R, 9, ♭3',
      lh: [
        { note: 'A2', degree: 'R' },
      ],
      rh: [
        { note: 'G3', degree: '♭7' },
        { note: 'A3', degree: 'R'  },
        { note: 'B3', degree: '9'  },
        { note: 'C4', degree: '♭3' },
      ],
    },
  ],
  group: 'tune',
};
