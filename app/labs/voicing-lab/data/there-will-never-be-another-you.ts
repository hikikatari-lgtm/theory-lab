import type { BarsGridProgression, Voicing } from './types';

// There Will Never Be Another You (Harry Warren / Mack Gordon, 1942)
// — E♭ major standard. 32-bar ABAC form. Functions as the "ii-V-I
// fluency exam" of the standards repertoire — straight diatonic moves
// throughout, with one minor-ii-V detour (Am7♭5 → D7♭9) and a closing
// progressive cadence (♭VII7 → ivm7 → I).
//
// Phase 8b PR 1 scope: piano voicings only. Walking bass + Rhythm
// follow in Phase 8b PR 2.

const V_EbM7: Voicing = {
  symbol: 'E♭M7',
  roman: 'E♭: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '3'  },
    { note: 'Bb4', degree: '5'  },
    { note: 'D5',  degree: 'M7' },
    { note: 'F5',  degree: '9'  },
  ],
};

const V_Dm7b5: Voicing = {
  symbol: 'Dm7♭5',
  roman: 'E♭: viim7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭3' },
    { note: 'Ab4', degree: '♭5' },
    { note: 'C5',  degree: '♭7' },
    { note: 'Eb5', degree: '♭9' },
  ],
};

const V_G7b9: Voicing = {
  symbol: 'G7(♭9)',
  roman: 'E♭: III7',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7' },
    { note: 'Ab4', degree: '♭9' },
    { note: 'B4',  degree: '3'  },
    { note: 'E5',  degree: '13' },
  ],
};

const V_Cm7: Voicing = {
  symbol: 'Cm7',
  roman: 'E♭: vim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭3' },
    { note: 'G4',  degree: '5'  },
    { note: 'Bb4', degree: '♭7' },
    { note: 'D5',  degree: '9'  },
  ],
};

const V_Bbm7: Voicing = {
  symbol: 'B♭m7',
  roman: 'E♭: vm7 (parallel minor)',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'Db4', degree: '♭3' },
    { note: 'F4',  degree: '5'  },
    { note: 'Ab4', degree: '♭7' },
    { note: 'C5',  degree: '9'  },
  ],
};

const V_Eb7: Voicing = {
  symbol: 'E♭7',
  roman: 'E♭: I7 (V/IV)',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'Db4', degree: '♭7' },
    { note: 'F4',  degree: '9'  },
    { note: 'G4',  degree: '3'  },
    { note: 'C5',  degree: '13' },
  ],
};

const V_AbM7: Voicing = {
  symbol: 'A♭M7',
  roman: 'E♭: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'C4',  degree: '3'  },
    { note: 'Eb4', degree: '5'  },
    { note: 'G4',  degree: 'M7' },
    { note: 'Bb4', degree: '9'  },
  ],
};

const V_Am7b5: Voicing = {
  symbol: 'Am7♭5',
  roman: 'E♭: ♯ivm7♭5',
  degreesLabel: '♭7, ♭9, ♭3, ♭5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭7' },
    { note: 'Bb4', degree: '♭9' },
    { note: 'C5',  degree: '♭3' },
    { note: 'Eb5', degree: '♭5' },
  ],
};

const V_D7b9: Voicing = {
  symbol: 'D7(♭9)',
  roman: 'E♭: VII7',
  degreesLabel: '3, 13, ♭7, ♭9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'B4',  degree: '13' },
    { note: 'C5',  degree: '♭7' },
    { note: 'Eb5', degree: '♭9' },
  ],
};

const V_Fm7: Voicing = {
  symbol: 'Fm7',
  roman: 'E♭: iim7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭7' },
    { note: 'G4',  degree: '9'  },
    { note: 'Ab4', degree: '♭3' },
    { note: 'C5',  degree: '5'  },
  ],
};

const V_Bb7: Voicing = {
  symbol: 'B♭7',
  roman: 'E♭: V7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '3'  },
    { note: 'G4',  degree: '13' },
    { note: 'Ab4', degree: '♭7' },
    { note: 'C5',  degree: '9'  },
  ],
};

const V_Abm7: Voicing = {
  symbol: 'A♭m7',
  roman: 'E♭: ivm7 (parallel)',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'B3',  degree: '♭3' },
    { note: 'Eb4', degree: '5'  },
    { note: 'Gb4', degree: '♭7' },
    { note: 'Bb4', degree: '9'  },
  ],
};

const V_Db7: Voicing = {
  symbol: 'D♭7',
  roman: 'E♭: ♭VII7 (backdoor)',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'Db2', degree: 'R' }],
  rh: [
    { note: 'B3',  degree: '♭7' },
    { note: 'Eb4', degree: '9'  },
    { note: 'F4',  degree: '3'  },
    { note: 'Bb4', degree: '13' },
  ],
};

export const thereWillNeverBeAnotherYou: BarsGridProgression = {
  id: 'there-will-never-be-another-you',
  label: 'There Will Never Be Another You - Harry Warren',
  subtitle: 'TWNBAY — 32 bars (E♭M, ABAC)',
  progressionLabel: 'There Will Never Be Another You (Harry Warren / Mack Gordon, 1942) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 168,
  key: 'Eb',
  voicings: {
    EbM7:  V_EbM7,
    Dm7b5: V_Dm7b5,
    G7b9:  V_G7b9,
    Cm7:   V_Cm7,
    Bbm7:  V_Bbm7,
    Eb7:   V_Eb7,
    AbM7:  V_AbM7,
    Am7b5: V_Am7b5,
    D7b9:  V_D7b9,
    Fm7:   V_Fm7,
    Bb7:   V_Bb7,
    Abm7:  V_Abm7,
    Db7:   V_Db7,
  },
  bars: [
    // A1 (1-8): I → viim7♭5/III7 → vi → ii-V/IV → IV
    { number: 1,  chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 2,  chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 3,  chords: [{ key: 'Dm7b5', beats: 4 }] },
    { number: 4,  chords: [{ key: 'G7b9',  beats: 4 }] },
    { number: 5,  chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 6,  chords: [
      { key: 'Bbm7', beats: 2 },
      { key: 'Eb7',  beats: 2 },
    ] },
    { number: 7,  chords: [{ key: 'AbM7',  beats: 4 }] },
    { number: 8,  chords: [{ key: 'AbM7',  beats: 4 }] },
    // B (9-16): minor ii-V detour → I → vi → ii-V-I → V
    { number: 9,  chords: [{ key: 'Am7b5', beats: 4 }] },
    { number: 10, chords: [{ key: 'D7b9',  beats: 4 }] },
    { number: 11, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 12, chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 13, chords: [{ key: 'Fm7',   beats: 4 }] },
    { number: 14, chords: [{ key: 'Bb7',   beats: 4 }] },
    { number: 15, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 16, chords: [{ key: 'Bb7',   beats: 4 }] },
    // A2 (17-24): A1 verbatim
    { number: 17, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 18, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 19, chords: [{ key: 'Dm7b5', beats: 4 }] },
    { number: 20, chords: [{ key: 'G7b9',  beats: 4 }] },
    { number: 21, chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 22, chords: [
      { key: 'Bbm7', beats: 2 },
      { key: 'Eb7',  beats: 2 },
    ] },
    { number: 23, chords: [{ key: 'AbM7',  beats: 4 }] },
    { number: 24, chords: [{ key: 'AbM7',  beats: 4 }] },
    // C (25-32): closing cadence — backdoor (Abm7/Db7) → ii-V turnaround
    { number: 25, chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 26, chords: [
      { key: 'Bbm7', beats: 2 },
      { key: 'Eb7',  beats: 2 },
    ] },
    { number: 27, chords: [{ key: 'AbM7',  beats: 4 }] },
    { number: 28, chords: [
      { key: 'Abm7', beats: 2 },
      { key: 'Db7',  beats: 2 },
    ] },
    { number: 29, chords: [
      { key: 'EbM7', beats: 2 },
      { key: 'Cm7',  beats: 2 },
    ] },
    { number: 30, chords: [
      { key: 'Fm7',  beats: 2 },
      { key: 'Bb7',  beats: 2 },
    ] },
    { number: 31, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 32, chords: [
      { key: 'Fm7',  beats: 2 },
      { key: 'Bb7',  beats: 2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1', barRange: [1,  8]  },
    { name: 'B',  label: 'B',  barRange: [9,  16] },
    { name: 'A2', label: 'A2', barRange: [17, 24] },
    { name: 'C',  label: 'C',  barRange: [25, 32] },
  ],
};
