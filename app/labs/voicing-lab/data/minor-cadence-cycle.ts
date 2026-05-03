import type { BarsGridProgression } from './types';

// Minor Cadence Cycle — mDecks Vol.2 Practice Routine in C minor.
// 16-bar cycle through i / ii7♭5-V7-i / sub-251 → iv / 251 → ♭III / subV
// substitutions / subV/V → V. Bars 13-16 echo bars 1-4 to close the loop.
// Cm-only for this Phase; 12-key support is deferred (bars-grid does not
// currently route through transposeChords).

export const minorCadenceCycle: BarsGridProgression = {
  id: 'minor-cadence-cycle',
  label: 'Minor Cadence Cycle',
  subtitle: 'Minor Cadence Cycle — 16 bars',
  progressionLabel: 'Practice Routine in Cm',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'Cm',
  voicings: {
    Cm7: {
      symbol: 'Cm7',
      roman: 'i7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Cm6: {
      symbol: 'Cm6',
      roman: 'i',
      degreesLabel: '♭3, 5, 6, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'A4',  degree: '6'  },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Dm7b5: {
      symbol: 'Dm7♭5',
      roman: 'ii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭3' },
        { note: 'Ab4', degree: '♭5' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    G7b9: {
      symbol: 'G7(♭9)',
      roman: 'V7',
      degreesLabel: '♭7, ♭9, 3, 13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'Ab4', degree: '♭9' },
        { note: 'B4',  degree: '3'  },
        { note: 'E5',  degree: '13' },
      ],
    },
    Gm7b5: {
      symbol: 'Gm7♭5',
      roman: 'ii7♭5/iv',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'Bb4', degree: '♭3' },
        { note: 'Db5', degree: '♭5' },
        { note: 'F5',  degree: '♭7' },
        { note: 'Ab5', degree: '♭9' },
      ],
    },
    C7b9: {
      symbol: 'C7(♭9)',
      roman: 'V7/iv',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'Db5', degree: '♭9' },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'iv7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'V7/♭III',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '3'  },
        { note: 'G4',  degree: '13' },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
    E7s11: {
      symbol: 'E7(♯11)',
      roman: 'subV7/♭III',
      degreesLabel: '3, ♯11, ♭7, 9',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G#4', degree: '3'   },
        { note: 'Bb4', degree: '♯11' },
        { note: 'D5',  degree: '♭7'  },
        { note: 'F#5', degree: '9'   },
      ],
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: '♭III△',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Ab7s11: {
      symbol: 'A♭7(♯11)',
      roman: 'subV7/V',
      degreesLabel: '♭7, 9, 3, ♯11',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭7'  },
        { note: 'Bb4', degree: '9'   },
        { note: 'C5',  degree: '3'   },
        { note: 'D5',  degree: '♯11' },
      ],
    },
  },
  bars: [
    { number: 1,  chords: [{ key: 'Cm7',    beats: 4 }] },
    { number: 2,  chords: [{ key: 'Cm7',    beats: 4 }] },
    { number: 3,  chords: [{ key: 'Dm7b5',  beats: 2 }, { key: 'G7b9', beats: 2 }] },
    { number: 4,  chords: [{ key: 'Cm6',    beats: 4 }] },
    { number: 5,  chords: [{ key: 'Gm7b5',  beats: 2 }, { key: 'C7b9', beats: 2 }] },
    { number: 6,  chords: [{ key: 'Fm7',    beats: 4 }] },
    { number: 7,  chords: [{ key: 'Fm7',    beats: 4 }] },
    { number: 8,  chords: [{ key: 'Bb7',    beats: 4 }] },
    { number: 9,  chords: [{ key: 'E7s11',  beats: 4 }] },
    { number: 10, chords: [{ key: 'EbM7',   beats: 4 }] },
    { number: 11, chords: [{ key: 'Ab7s11', beats: 4 }] },
    { number: 12, chords: [{ key: 'G7b9',   beats: 4 }] },
    { number: 13, chords: [{ key: 'Cm7',    beats: 4 }] },
    { number: 14, chords: [{ key: 'Cm7',    beats: 4 }] },
    { number: 15, chords: [{ key: 'Dm7b5',  beats: 2 }, { key: 'G7b9', beats: 2 }] },
    { number: 16, chords: [{ key: 'Cm6',    beats: 4 }] },
  ],
  group: 'progression',
};
