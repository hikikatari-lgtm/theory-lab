import type { ChordsRowProgression } from './types';

// "Virtual Insanity" — single-hand RH voicings (LH empty). Each chord
// fits within one hand in the oct 3–4 range. Cb is rewritten as B
// (one octave lower number) so the keyboard's sharp-only data-note
// keys can match — Cb4 = B3 in pitch.

export const virtualInsanity: ChordsRowProgression = {
  id: 'virtual-insanity',
  label: 'Virtual Insanity / Jamiroquai',
  subtitle: 'Im7 - IV7 - ♭VII7 - ♭IIIM7 - VIm7♭5 - ♭VIM7 - V7 - Im7',
  progressionLabel: 'Progression — 8 chords',
  displayMode: 'chords-row',
  tempo: 96,
  key: 'E♭m',
  chords: [
    {
      id: 'ebm7',
      symbol: 'E♭m7',
      roman: 'Im7',
      degreesLabel: 'R.H. 5, ♭7, R, ♭3',
      lh: [],
      rh: [
        { note: 'Bb3', degree: '5'  },
        { note: 'Db4', degree: '♭7' },
        { note: 'Eb4', degree: 'R'  },
        { note: 'Gb4', degree: '♭3' },
      ],
    },
    {
      id: 'ab7',
      symbol: 'A♭7',
      roman: 'IV7',
      degreesLabel: 'R.H. 9, 3, 5, R',
      lh: [],
      rh: [
        { note: 'Bb3', degree: '9' },
        { note: 'C4',  degree: '3' },
        { note: 'Eb4', degree: '5' },
        { note: 'Ab4', degree: 'R' },
      ],
    },
    {
      id: 'db7',
      symbol: 'D♭7',
      roman: '♭VII7',
      degreesLabel: 'R.H. ♭7, 9, 3, 5',
      lh: [],
      rh: [
        { note: 'B3',  degree: '♭7' },
        { note: 'Eb4', degree: '9'  },
        { note: 'F4',  degree: '3'  },
        { note: 'Ab4', degree: '5'  },
      ],
    },
    {
      id: 'gbmaj7',
      symbol: 'G♭M7',
      roman: '♭IIIM7',
      degreesLabel: 'R.H. R, 3, 5, M7',
      lh: [],
      rh: [
        { note: 'Gb3', degree: 'R'  },
        { note: 'Bb3', degree: '3'  },
        { note: 'Db4', degree: '5'  },
        { note: 'F4',  degree: 'M7' },
      ],
    },
    {
      id: 'cm7b5',
      symbol: 'Cm7♭5',
      roman: 'VIm7♭5',
      degreesLabel: 'R.H. ♭7, R, ♭3, ♭5',
      lh: [],
      rh: [
        { note: 'Bb3', degree: '♭7' },
        { note: 'C4',  degree: 'R'  },
        { note: 'Eb4', degree: '♭3' },
        { note: 'Gb4', degree: '♭5' },
      ],
    },
    {
      id: 'cbmaj7',
      symbol: 'C♭M7',
      roman: '♭VIM7',
      degreesLabel: 'R.H. M7, R, 3, 5',
      lh: [],
      rh: [
        { note: 'Bb3', degree: 'M7' },
        { note: 'B3',  degree: 'R'  },
        { note: 'Eb4', degree: '3'  },
        { note: 'Gb4', degree: '5'  },
      ],
    },
    {
      id: 'bb7',
      symbol: 'B♭7',
      roman: 'V7',
      degreesLabel: 'R.H. ♭7, 3, ♭13',
      lh: [],
      rh: [
        { note: 'Ab3', degree: '♭7'  },
        { note: 'D4',  degree: '3'   },
        { note: 'Gb4', degree: '♭13' },
      ],
    },
    {
      id: 'ebm7-end',
      symbol: 'E♭m7',
      roman: 'Im7',
      degreesLabel: 'L.H. R / R.H. 5, ♭7, R, ♭3',
      lh: [
        { note: 'Eb2', degree: 'R' },
      ],
      rh: [
        { note: 'Bb3', degree: '5'  },
        { note: 'Db4', degree: '♭7' },
        { note: 'Eb4', degree: 'R'  },
        { note: 'Gb4', degree: '♭3' },
      ],
    },
  ],
};
