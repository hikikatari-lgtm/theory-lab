import type { ChordsRowProgression } from './types';

export const minorTurnaround: ChordsRowProgression = {
  id: 'minor-turnaround',
  label: 'Minor Turnaround in Cm',
  subtitle: 'Im - VIm7♭5 - II7 - V7',
  progressionLabel: 'Progression — 4 chords',
  displayMode: 'chords-row',
  tempo: 64,
  key: 'Cm',
  chords: [
    {
      id: 'cm69',
      symbol: 'Cm69',
      roman: 'Im',
      degreesLabel: '♭3, 5, 6, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5' },
        { note: 'A4',  degree: '6' },
        { note: 'D5',  degree: '9' },
      ],
    },
    {
      id: 'am7b5',
      symbol: 'Am7♭5',
      roman: 'VIm7♭5',
      degreesLabel: '7, R, ♭3, ♭5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '7' },
        { note: 'A4',  degree: 'R' },
        { note: 'C5',  degree: '♭3' },
        { note: 'Eb5', degree: '♭5' },
      ],
    },
    {
      id: 'd7alt',
      symbol: 'D7alt',
      roman: 'II7',
      degreesLabel: '3, ♭13, 7, #9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3' },
        { note: 'Bb4', degree: '♭13' },
        { note: 'C5',  degree: '7' },
        { note: 'F5',  degree: '#9' },
      ],
    },
    {
      id: 'g7alt',
      symbol: 'G7alt',
      roman: 'V7',
      degreesLabel: '7, #9, 3, ♭13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '7' },
        { note: 'Bb4', degree: '#9' },
        { note: 'B4',  degree: '3' },
        { note: 'Eb5', degree: '♭13' },
      ],
    },
  ],
};
