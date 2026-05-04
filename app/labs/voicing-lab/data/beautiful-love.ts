import type { BarsGridProgression, Voicing } from './types';

// Beautiful Love (Wayne King / Victor Young / Egbert Van Alstyne, 1931)
// — E minor jazz standard. 32-bar AABA. Distinguishing feature: minor
// ii-V chains repeated as the structural backbone (F♯m7♭5 → B7♭9 → Em7
// opens almost every section). Pairs naturally with Body And Soul as
// "minor AABA in two different keys" for color-comparison study.
//
// Phase 8b PR 1 scope: piano voicings only. Walking bass + Rhythm
// follow in Phase 8b PR 2.

const V_Fsm7b5: Voicing = {
  symbol: 'F♯m7♭5',
  roman: 'Em: iim7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A4', degree: '♭3' },
    { note: 'C5', degree: '♭5' },
    { note: 'E5', degree: '♭7' },
    { note: 'G5', degree: '♭9' },
  ],
};

const V_B7b9: Voicing = {
  symbol: 'B7(♭9)',
  roman: 'Em: V7♭9',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭7' },
    { note: 'C5',  degree: '♭9' },
    { note: 'D#5', degree: '3'  },
    { note: 'G#5', degree: '13' },
  ],
};

const V_Em7: Voicing = {
  symbol: 'Em7',
  roman: 'Em: im7',
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
  roman: 'Em: IV7',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭7' },
    { note: 'B4',  degree: '9'  },
    { note: 'C#5', degree: '3'  },
    { note: 'F#5', degree: '13' },
  ],
};

const V_Dm7: Voicing = {
  symbol: 'Dm7',
  roman: 'Em: viim7',
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
  roman: 'Em: III7',
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
  roman: 'Em: VImaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'E4', degree: '3'  },
    { note: 'G4', degree: '5'  },
    { note: 'B4', degree: 'M7' },
    { note: 'D5', degree: '9'  },
  ],
};

const V_Bm7: Voicing = {
  symbol: 'Bm7',
  roman: 'Em: vm7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '♭3' },
    { note: 'F#4', degree: '5'  },
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
  ],
};

const V_E7: Voicing = {
  symbol: 'E7',
  roman: 'Em: I7 (V/IV)',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G#4', degree: '3'  },
    { note: 'C#5', degree: '13' },
    { note: 'D5',  degree: '♭7' },
    { note: 'F#5', degree: '9'  },
  ],
};

const V_Am7: Voicing = {
  symbol: 'Am7',
  roman: 'Em: ivm7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
    { note: 'C5', degree: '♭3' },
    { note: 'E5', degree: '5'  },
  ],
};

const V_D7: Voicing = {
  symbol: 'D7',
  roman: 'Em: ♭VII7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'B4',  degree: '13' },
    { note: 'C5',  degree: '♭7' },
    { note: 'E5',  degree: '9'  },
  ],
};

const V_GM7: Voicing = {
  symbol: 'GM7',
  roman: 'Em: ♭IIImaj7',
  degreesLabel: 'M7, 9, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: 'M7' },
    { note: 'A4',  degree: '9'  },
    { note: 'B4',  degree: '3'  },
    { note: 'D5',  degree: '5'  },
  ],
};

export const beautifulLove: BarsGridProgression = {
  id: 'beautiful-love',
  label: 'Beautiful Love - Wayne King',
  subtitle: 'Beautiful Love — 32 bars (Em, AABA)',
  progressionLabel: 'Beautiful Love (Wayne King / Victor Young, 1931) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 140,
  key: 'Em',
  voicings: {
    Fsm7b5: V_Fsm7b5,
    B7b9:   V_B7b9,
    Em7:    V_Em7,
    A7:     V_A7,
    Dm7:    V_Dm7,
    G7:     V_G7,
    CM7:    V_CM7,
    Bm7:    V_Bm7,
    E7:     V_E7,
    Am7:    V_Am7,
    D7:     V_D7,
    GM7:    V_GM7,
  },
  bars: [
    // A1 (1-8): minor ii-V-i → I7-IV motion → ii-V/VI
    { number: 1,  chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 2,  chords: [{ key: 'B7b9',   beats: 4 }] },
    { number: 3,  chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 4,  chords: [{ key: 'A7',     beats: 4 }] },
    { number: 5,  chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 6,  chords: [{ key: 'G7',     beats: 4 }] },
    { number: 7,  chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 8,  chords: [
      { key: 'Fsm7b5', beats: 2 },
      { key: 'B7b9',   beats: 2 },
    ] },
    // A2 (9-16): A1 with v-I7 turnaround at bar 16 (Bm7/E7)
    { number: 9,  chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 10, chords: [{ key: 'B7b9',   beats: 4 }] },
    { number: 11, chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 12, chords: [{ key: 'A7',     beats: 4 }] },
    { number: 13, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 14, chords: [{ key: 'G7',     beats: 4 }] },
    { number: 15, chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 16, chords: [
      { key: 'Bm7', beats: 2 },
      { key: 'E7',  beats: 2 },
    ] },
    // B (17-24): bridge — iv → ♭VII → ♭III → VI → minor ii-V-i
    { number: 17, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 18, chords: [{ key: 'D7',     beats: 4 }] },
    { number: 19, chords: [{ key: 'GM7',    beats: 4 }] },
    { number: 20, chords: [{ key: 'CM7',    beats: 4 }] },
    { number: 21, chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 22, chords: [{ key: 'B7b9',   beats: 4 }] },
    { number: 23, chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 24, chords: [
      { key: 'Fsm7b5', beats: 2 },
      { key: 'B7b9',   beats: 2 },
    ] },
    // A3 (25-32): A1 closing form, ends on V7♭9 turnaround for loop
    { number: 25, chords: [{ key: 'Fsm7b5', beats: 4 }] },
    { number: 26, chords: [{ key: 'B7b9',   beats: 4 }] },
    { number: 27, chords: [{ key: 'Em7',    beats: 4 }] },
    { number: 28, chords: [{ key: 'A7',     beats: 4 }] },
    { number: 29, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 30, chords: [{ key: 'G7',     beats: 4 }] },
    { number: 31, chords: [
      { key: 'CM7',    beats: 2 },
      { key: 'Fsm7b5', beats: 2 },
    ] },
    { number: 32, chords: [{ key: 'B7b9',   beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1',         barRange: [1,  8]  },
    { name: 'A2', label: 'A2',         barRange: [9,  16] },
    { name: 'B',  label: 'B (bridge)', barRange: [17, 24] },
    { name: 'A3', label: 'A3',         barRange: [25, 32] },
  ],
};
