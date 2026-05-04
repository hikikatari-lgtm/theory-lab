import type { BarsGridProgression, Voicing } from './types';

// How Insensitive / Insensatez (Antonio Carlos Jobim, 1963) — D minor
// bossa nova standard. 32-bar AABA. The hook is the descending
// line cliché on Dm in bars 1-4 (and A2 / A3): Dm → Dm(maj7) → Dm7
// → Dm6 keeps the bass on D while the chord's distinguishing top
// voice walks down by half-steps D → C♯ → C → B. The bridge moves
// through the relative-major area (Fmaj7 / Bbmaj7).
//
// Voicing convention for the cliché chords: 4-note RH where the top
// voice IS the line cliché. The other three RH notes (D, F, A) are
// shared across the four chords, isolating the line motion to the
// top voice for visual clarity on the keyboard.
//
// Phase 8b PR 1 scope: piano voicings only. Walking bass + Rhythm
// follow in Phase 8b PR 2.

// Line cliché chords: bass D2 sustained, top voice descends D → C♯ → C → B
const V_Dm: Voicing = {
  symbol: 'Dm',
  roman: 'Dm: i',
  degreesLabel: 'R, ♭3, 5, R (line: R)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'R'  },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'D5', degree: 'R'  },
  ],
};

const V_DmMaj7: Voicing = {
  symbol: 'Dm(maj7)',
  roman: 'Dm: i(maj7)',
  degreesLabel: 'R, ♭3, 5, M7 (line: M7)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: 'R'  },
    { note: 'F4',  degree: '♭3' },
    { note: 'A4',  degree: '5'  },
    { note: 'C#5', degree: 'M7' },
  ],
};

const V_Dm7: Voicing = {
  symbol: 'Dm7',
  roman: 'Dm: im7',
  degreesLabel: 'R, ♭3, 5, ♭7 (line: ♭7)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'R'  },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
  ],
};

const V_Dm6: Voicing = {
  symbol: 'Dm6',
  roman: 'Dm: im6',
  degreesLabel: 'R, ♭3, 5, 6 (line: 6)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'R'  },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'B4', degree: '6'  },
  ],
};

const V_BbM7: Voicing = {
  symbol: 'B♭M7',
  roman: 'Dm: ♭VImaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '3'  },
    { note: 'F4', degree: '5'  },
    { note: 'A4', degree: 'M7' },
    { note: 'C5', degree: '9'  },
  ],
};

const V_A7b9: Voicing = {
  symbol: 'A7(♭9)',
  roman: 'Dm: V7♭9',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭7' },
    { note: 'Bb4', degree: '♭9' },
    { note: 'C#5', degree: '3'  },
    { note: 'F#5', degree: '13' },
  ],
};

const V_Gm7: Voicing = {
  symbol: 'Gm7',
  roman: 'Dm: ivm7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7' },
    { note: 'A4',  degree: '9'  },
    { note: 'Bb4', degree: '♭3' },
    { note: 'D5',  degree: '5'  },
  ],
};

const V_C7: Voicing = {
  symbol: 'C7',
  roman: 'Dm: ♭VII7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '3'  },
    { note: 'A4',  degree: '13' },
    { note: 'Bb4', degree: '♭7' },
    { note: 'D5',  degree: '9'  },
  ],
};

const V_FM7: Voicing = {
  symbol: 'FM7',
  roman: 'Dm: ♭IIImaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'A4', degree: '3'  },
    { note: 'C5', degree: '5'  },
    { note: 'E5', degree: 'M7' },
    { note: 'G5', degree: '9'  },
  ],
};

const V_Em7b5: Voicing = {
  symbol: 'Em7♭5',
  roman: 'Dm: iim7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭3' },
    { note: 'Bb4', degree: '♭5' },
    { note: 'D5',  degree: '♭7' },
    { note: 'F5',  degree: '♭9' },
  ],
};

export const howInsensitive: BarsGridProgression = {
  id: 'how-insensitive',
  label: 'How Insensitive - Antonio Carlos Jobim',
  subtitle: 'How Insensitive — 32 bars (Dm, AABA, line cliché)',
  progressionLabel: 'How Insensitive / Insensatez (Antonio Carlos Jobim, 1963) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 116,
  key: 'Dm',
  voicings: {
    Dm:     V_Dm,
    DmMaj7: V_DmMaj7,
    Dm7:    V_Dm7,
    Dm6:    V_Dm6,
    BbM7:   V_BbM7,
    A7b9:   V_A7b9,
    Gm7:    V_Gm7,
    C7:     V_C7,
    FM7:    V_FM7,
    Em7b5:  V_Em7b5,
  },
  bars: [
    // A1 (1-8): Dm line cliché → ♭VI → V7♭9 → im7 → V7♭9
    { number: 1,  chords: [{ key: 'Dm',     beats: 4 }] },
    { number: 2,  chords: [{ key: 'DmMaj7', beats: 4 }] },
    { number: 3,  chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 4,  chords: [{ key: 'Dm6',    beats: 4 }] },
    { number: 5,  chords: [{ key: 'BbM7',   beats: 4 }] },
    { number: 6,  chords: [{ key: 'A7b9',   beats: 4 }] },
    { number: 7,  chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 8,  chords: [{ key: 'A7b9',   beats: 4 }] },
    // A2 (9-16): identical to A1
    { number: 9,  chords: [{ key: 'Dm',     beats: 4 }] },
    { number: 10, chords: [{ key: 'DmMaj7', beats: 4 }] },
    { number: 11, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 12, chords: [{ key: 'Dm6',    beats: 4 }] },
    { number: 13, chords: [{ key: 'BbM7',   beats: 4 }] },
    { number: 14, chords: [{ key: 'A7b9',   beats: 4 }] },
    { number: 15, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 16, chords: [{ key: 'A7b9',   beats: 4 }] },
    // B (17-24): bridge through relative-major area
    { number: 17, chords: [{ key: 'Gm7',    beats: 4 }] },
    { number: 18, chords: [{ key: 'C7',     beats: 4 }] },
    { number: 19, chords: [{ key: 'FM7',    beats: 4 }] },
    { number: 20, chords: [{ key: 'BbM7',   beats: 4 }] },
    { number: 21, chords: [{ key: 'Em7b5',  beats: 4 }] },
    { number: 22, chords: [{ key: 'A7b9',   beats: 4 }] },
    { number: 23, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 24, chords: [{ key: 'A7b9',   beats: 4 }] },
    // A3 (25-32): final A, ends on im7 (not V7 turnaround)
    { number: 25, chords: [{ key: 'Dm',     beats: 4 }] },
    { number: 26, chords: [{ key: 'DmMaj7', beats: 4 }] },
    { number: 27, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 28, chords: [{ key: 'Dm6',    beats: 4 }] },
    { number: 29, chords: [{ key: 'BbM7',   beats: 4 }] },
    { number: 30, chords: [{ key: 'A7b9',   beats: 4 }] },
    { number: 31, chords: [{ key: 'Dm7',    beats: 4 }] },
    { number: 32, chords: [{ key: 'Dm7',    beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1',         barRange: [1,  8]  },
    { name: 'A2', label: 'A2',         barRange: [9,  16] },
    { name: 'B',  label: 'B (bridge)', barRange: [17, 24] },
    { name: 'A3', label: 'A3 (final)', barRange: [25, 32] },
  ],
};
