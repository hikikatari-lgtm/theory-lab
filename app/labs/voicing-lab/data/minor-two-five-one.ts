import type {
  ChordsRowChord,
  ChordsRowProgression,
  WalkingBassInfo,
} from './types';

// Minor 251 voicing — IIm7♭5 → V7♭9 → Im7 in C minor, transposed at
// render time. Rootless 4-note voicings per mDecks Vol.2 design rule:
// the 7th-chord root is replaced by the 9th (♭9 in the Locrian/altered
// contexts), and the dominant's 5 is replaced by the 13. IDs are
// Roman-numeral based so selection persists across 12-key cycling.
//
// Phase 6-B: Ascending walking bass per Rule 3a. For Dm7♭5 the
// pattern is 1-♭3-♭5-♭7 (the half-diminished's chord tones); G7♭9
// uses natural 5 in the bass even though the upper voicing has ♭9
// (walking bass typically traces unaltered chord tones); Cm7 uses
// 1-♭3-5-♭7. Transposed automatically with the chord.
const WB_DM7B5_ASC: WalkingBassInfo = { pattern: 'ascending', notes: ['D2', 'F2', 'Ab2', 'C3'] };
const WB_G7B9_ASC:  WalkingBassInfo = { pattern: 'ascending', notes: ['G2', 'B2', 'D3', 'F3'] };
const WB_CM7M_ASC:  WalkingBassInfo = { pattern: 'ascending', notes: ['C2', 'Eb2', 'G2', 'Bb2'] };

const chords: ChordsRowChord[] = [
  {
    id: 'iim7b5',
    symbol: 'Dm7♭5',
    roman: 'IIm7♭5',
    degreesLabel: '♭3, ♭5, ♭7, ♭9',
    lh: [{ note: 'D2', degree: 'R' }],
    rh: [
      { note: 'F4',  degree: '♭3' },
      { note: 'Ab4', degree: '♭5' },
      { note: 'C5',  degree: '♭7' },
      { note: 'Eb5', degree: '♭9' },
    ],
    walkingBass: WB_DM7B5_ASC,
  },
  {
    id: 'v7b9',
    symbol: 'G7(♭9)',
    roman: 'V7♭9',
    degreesLabel: '♭7, ♭9, 3, 13',
    lh: [{ note: 'G2', degree: 'R' }],
    rh: [
      { note: 'F4',  degree: '♭7' },
      { note: 'Ab4', degree: '♭9' },
      { note: 'B4',  degree: '3'  },
      { note: 'E5',  degree: '13' },
    ],
    walkingBass: WB_G7B9_ASC,
  },
  {
    id: 'im7',
    symbol: 'Cm7',
    roman: 'Im7',
    degreesLabel: '♭3, 5, ♭7, 9',
    lh: [{ note: 'C2', degree: 'R' }],
    rh: [
      { note: 'Eb4', degree: '♭3' },
      { note: 'G4',  degree: '5'  },
      { note: 'Bb4', degree: '♭7' },
      { note: 'D5',  degree: '9'  },
    ],
    walkingBass: WB_CM7M_ASC,
  },
];

export const minorTwoFiveOne: ChordsRowProgression = {
  id: 'minor-two-five-one',
  label: 'Minor 251 Voicing',
  subtitle: 'IIm7♭5 - V7♭9 - Im7',
  progressionLabel: 'Minor 2-5-1 — 構造練習',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'Cm',
  chords,
  group: 'progression',
  supportsAllKeys: true,
  baseKey: 'C',
};
