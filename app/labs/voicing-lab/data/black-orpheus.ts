import type { BarsGridProgression, Voicing } from './types';

// Black Orpheus / Manhã de Carnaval (Luiz Bonfá, 1959) — A minor bossa
// nova standard from the film "Orfeu Negro". 32 bars structured as 16×2:
// the A section is 16 bars long, repeated with a tiny variation that
// finally resolves to im7 in bar 32. The piece swings between A minor
// (im) and C major (♭IIImaj7) tonal centers — a textbook study in
// minor / relative-major modulation.
//
// Phase 8b PR 1 scope: piano voicings only. Walking bass + Rhythm
// follow in Phase 8b PR 2.

const V_Am7: Voicing = {
  symbol: 'Am7',
  roman: 'Am: im7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
    { note: 'C5', degree: '♭3' },
    { note: 'E5', degree: '5'  },
  ],
};

const V_Bm7b5: Voicing = {
  symbol: 'Bm7♭5',
  roman: 'Am: iim7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '♭3' },
    { note: 'F4', degree: '♭5' },
    { note: 'A4', degree: '♭7' },
    { note: 'C5', degree: '♭9' },
  ],
};

const V_E7b9: Voicing = {
  symbol: 'E7(♭9)',
  roman: 'Am: V7♭9',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '♭7' },
    { note: 'F4',  degree: '♭9' },
    { note: 'G#4', degree: '3'  },
    { note: 'C#5', degree: '13' },
  ],
};

const V_Dm7: Voicing = {
  symbol: 'Dm7',
  roman: 'Am: ivm7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

const V_G7: Voicing = {
  symbol: 'G7',
  roman: 'Am: ♭VII7',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭7' },
    { note: 'A4', degree: '9'  },
    { note: 'B4', degree: '3'  },
    { note: 'E5', degree: '13' },
  ],
};

const V_CM7: Voicing = {
  symbol: 'CM7',
  roman: 'Am: ♭IIImaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'E4', degree: '3'  },
    { note: 'G4', degree: '5'  },
    { note: 'B4', degree: 'M7' },
    { note: 'D5', degree: '9'  },
  ],
};

const V_Fsm7b5: Voicing = {
  symbol: 'F♯m7♭5',
  roman: 'Am: ♯ivm7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A4', degree: '♭3' },
    { note: 'C5', degree: '♭5' },
    { note: 'E5', degree: '♭7' },
    { note: 'G5', degree: '♭9' },
  ],
};

const V_B7: Voicing = {
  symbol: 'B7',
  roman: 'Am: VII7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D#4', degree: '3'  },
    { note: 'G#4', degree: '13' },
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
  ],
};

const V_Em7: Voicing = {
  symbol: 'Em7',
  roman: 'Am: vm7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭3' },
    { note: 'B4',  degree: '5'  },
    { note: 'D5',  degree: '♭7' },
    { note: 'F#5', degree: '9'  },
  ],
};

const V_A7: Voicing = {
  symbol: 'A7',
  roman: 'Am: I7',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭7' },
    { note: 'B4',  degree: '9'  },
    { note: 'C#5', degree: '3'  },
    { note: 'F#5', degree: '13' },
  ],
};

export const blackOrpheus: BarsGridProgression = {
  id: 'black-orpheus',
  label: 'Black Orpheus - Luiz Bonfá',
  subtitle: 'Black Orpheus — 32 bars (Am, 16×2)',
  progressionLabel: 'Black Orpheus / Manhã de Carnaval (Luiz Bonfá, 1959) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 124,
  key: 'Am',
  voicings: {
    Am7:    V_Am7,
    Bm7b5:  V_Bm7b5,
    E7b9:   V_E7b9,
    Dm7:    V_Dm7,
    G7:     V_G7,
    CM7:    V_CM7,
    Fsm7b5: V_Fsm7b5,
    B7:     V_B7,
    Em7:    V_Em7,
    A7:     V_A7,
  },
  bars: [
    // A1 (1-16): minor ii-V-i pivot through ♭III major area
    { number: 1,  chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 2,  chords: [{ key: 'Bm7b5',  beats: 4 }] },
    { number: 3,  chords: [{ key: 'E7b9',   beats: 4 }] },
    { number: 4,  chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 5,  chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 6,  chords: [{ key: 'G7',     beats: 4 }] },
    { number: 7,  chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 8,  chords: [
      { key: 'Fsm7b5', beats: 2 },
      { key: 'B7',     beats: 2 },
    ] },
    { number: 9,  chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 10, chords: [{ key: 'A7',     beats: 4 }] },
    { number: 11, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 12, chords: [{ key: 'G7',     beats: 4 }] },
    { number: 13, chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 14, chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 15, chords: [{ key: 'Bm7b5',  beats: 4 }] },
    { number: 16, chords: [{ key: 'E7b9',   beats: 4 }] },
    // A2 (17-32): same form, final cadence resolves to im7
    { number: 17, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 18, chords: [{ key: 'Bm7b5',  beats: 4 }] },
    { number: 19, chords: [{ key: 'E7b9',   beats: 4 }] },
    { number: 20, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 21, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 22, chords: [{ key: 'G7',     beats: 4 }] },
    { number: 23, chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 24, chords: [
      { key: 'Fsm7b5', beats: 2 },
      { key: 'B7',     beats: 2 },
    ] },
    { number: 25, chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 26, chords: [{ key: 'A7',     beats: 4 }] },
    { number: 27, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 28, chords: [{ key: 'G7',     beats: 4 }] },
    { number: 29, chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 30, chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 31, chords: [
      { key: 'Bm7b5', beats: 2 },
      { key: 'E7b9',  beats: 2 },
    ] },
    { number: 32, chords: [{ key: 'Am7',    beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1 (16 bars)',         barRange: [1,  16] },
    { name: 'A2', label: 'A2 (16 bars, resolve)', barRange: [17, 32] },
  ],
};
