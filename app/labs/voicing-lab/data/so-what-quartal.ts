import type { ChordsRowProgression } from './types';

// "So What Voicings (C Dorian)" — Bill-Evans-inspired 5-note voicings
// stacking ♭3-♭7-9-5-R (minor) or 3-M7-9-5-R (major), moved up
// diatonically through C Dorian. Each chord adds an LH root in oct 2
// for register clarity. Chords 4 (Fm) and 6 (A♭M) borrow from C
// Aeolian (use Ab instead of A) so the voicing function stays
// consistent (♭3 / 3 on the bottom) across all seven scale degrees.

export const soWhatQuartal: ChordsRowProgression = {
  id: 'so-what-quartal',
  label: 'So What Voicings (C Dorian)',
  subtitle: 'Im9 - IIm - ♭IIIM9 - IVm9 - Vm9 - ♭VIM9 - ♭VIIM9',
  progressionLabel: 'Progression — 7 chords',
  displayMode: 'chords-row',
  tempo: 100,
  key: 'Cm',
  chords: [
    {
      id: 'cm9',
      symbol: 'Cm9',
      roman: 'Im9',
      degreesLabel: 'L.H. R / R.H. ♭3, ♭7, 9, 5, R',
      lh: [
        { note: 'C2', degree: 'R' },
      ],
      rh: [
        { note: 'Eb3', degree: '♭3' },
        { note: 'Bb3', degree: '♭7' },
        { note: 'D4',  degree: '9'  },
        { note: 'G4',  degree: '5'  },
        { note: 'C5',  degree: 'R'  },
      ],
    },
    {
      id: 'dm',
      symbol: 'Dm',
      roman: 'IIm',
      degreesLabel: 'L.H. R / R.H. ♭3, ♭7, ♭9, 5, R',
      lh: [
        { note: 'D2', degree: 'R' },
      ],
      rh: [
        { note: 'F3',  degree: '♭3' },
        { note: 'C4',  degree: '♭7' },
        { note: 'Eb4', degree: '♭9' },
        { note: 'A4',  degree: '5'  },
        { note: 'D5',  degree: 'R'  },
      ],
    },
    {
      id: 'ebmaj9',
      symbol: 'E♭M9',
      roman: '♭IIIM9',
      degreesLabel: 'L.H. R / R.H. 3, M7, 9, 5, R',
      lh: [
        { note: 'Eb2', degree: 'R' },
      ],
      rh: [
        { note: 'G3',  degree: '3'  },
        { note: 'D4',  degree: 'M7' },
        { note: 'F4',  degree: '9'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'Eb5', degree: 'R'  },
      ],
    },
    {
      id: 'fm9',
      symbol: 'Fm9',
      roman: 'IVm9',
      degreesLabel: 'L.H. R / R.H. ♭3, ♭7, 9, 5, R',
      lh: [
        { note: 'F2', degree: 'R' },
      ],
      rh: [
        { note: 'Ab3', degree: '♭3' },
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'C5',  degree: '5'  },
        { note: 'F5',  degree: 'R'  },
      ],
    },
    {
      id: 'gm9',
      symbol: 'Gm9',
      roman: 'Vm9',
      degreesLabel: 'L.H. R / R.H. ♭3, ♭7, 9, 5, R',
      lh: [
        { note: 'G2', degree: 'R' },
      ],
      rh: [
        { note: 'Bb3', degree: '♭3' },
        { note: 'F4',  degree: '♭7' },
        { note: 'A4',  degree: '9'  },
        { note: 'D5',  degree: '5'  },
        { note: 'G5',  degree: 'R'  },
      ],
    },
    {
      id: 'abmaj9',
      symbol: 'A♭M9',
      roman: '♭VIM9',
      degreesLabel: 'L.H. R / R.H. 3, M7, 9, 5, R',
      lh: [
        { note: 'Ab2', degree: 'R' },
      ],
      rh: [
        { note: 'C4',  degree: '3'  },
        { note: 'G4',  degree: 'M7' },
        { note: 'Bb4', degree: '9'  },
        { note: 'Eb5', degree: '5'  },
        { note: 'Ab5', degree: 'R'  },
      ],
    },
    {
      id: 'bbmaj9',
      symbol: 'B♭M9',
      roman: '♭VIIM9',
      degreesLabel: 'L.H. R / R.H. 3, M7, 9, 5, R',
      lh: [
        { note: 'Bb2', degree: 'R' },
      ],
      rh: [
        { note: 'D4',  degree: '3'  },
        { note: 'A4',  degree: 'M7' },
        { note: 'C5',  degree: '9'  },
        { note: 'F5',  degree: '5'  },
        { note: 'Bb5', degree: 'R'  },
      ],
    },
  ],
  group: 'structure',
};
