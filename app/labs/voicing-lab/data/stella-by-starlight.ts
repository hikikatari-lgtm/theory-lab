import type { BarsGridProgression, Voicing } from './types';

// Stella By Starlight (Victor Young, 1944) — B♭ major standard.
// 32-bar form (mDecks treats as ABAC variant, though typically AAB-style
// with a climactic final 8). The ♯ivm7♭5 (Em7♭5) opening is the song's
// fingerprint — half-diminished chains land repeatedly throughout.
//
// Phase 8b PR 1 scope: piano voicings only (rootless 4-note RH at
// octave 4-5 + bass root in LH). Walking bass + Rhythm enrichment
// land in Phase 8b PR 2 after a soak period.
//
// Voicing convention (mostly reused across the 5 Phase-8b songs +
// existing Phase 6/7 progressions):
// - Maj7 chords: ascending 3-5-M7-9 (e.g. Bbmaj7 = D4-F4-A4-C5)
// - m7 chords: ♭3-5-♭7-9 ascending or ♭7-9-♭3-5 inverted as fits
//   surrounding chords
// - Dominant 7 chords: 3-13-♭7-9 or ♭7-9-3-13 inverted
// - 7♭9: ♭7-♭9-3-13 inverted
// - m7♭5: ♭3-♭5-♭7-♭9 ascending

const V_Em7b5: Voicing = {
  symbol: 'Em7♭5',
  roman: 'B♭: ♯ivm7♭5',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭3' },
    { note: 'Bb4', degree: '♭5' },
    { note: 'D5',  degree: '♭7' },
    { note: 'F5',  degree: '♭9' },
  ],
};

const V_A7b9: Voicing = {
  symbol: 'A7(♭9)',
  roman: 'B♭: VII7',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '♭7' },
    { note: 'Bb4', degree: '♭9' },
    { note: 'C#5', degree: '3'  },
    { note: 'F#5', degree: '13' },
  ],
};

const V_Cm7: Voicing = {
  symbol: 'Cm7',
  roman: 'B♭: iim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭3' },
    { note: 'G4',  degree: '5'  },
    { note: 'Bb4', degree: '♭7' },
    { note: 'D5',  degree: '9'  },
  ],
};

const V_F7: Voicing = {
  symbol: 'F7',
  roman: 'B♭: V7',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭7' },
    { note: 'G4',  degree: '9'  },
    { note: 'A4',  degree: '3'  },
    { note: 'D5',  degree: '13' },
  ],
};

const V_Fm7: Voicing = {
  symbol: 'Fm7',
  roman: 'B♭: vm7 (parallel minor)',
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
  roman: 'B♭: I7 (V/IV)',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '3'  },
    { note: 'G4',  degree: '13' },
    { note: 'Ab4', degree: '♭7' },
    { note: 'C5',  degree: '9'  },
  ],
};

const V_EbM7: Voicing = {
  symbol: 'E♭M7',
  roman: 'B♭: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '3'  },
    { note: 'Bb4', degree: '5'  },
    { note: 'D5',  degree: 'M7' },
    { note: 'F5',  degree: '9'  },
  ],
};

const V_Ab7: Voicing = {
  symbol: 'A♭7',
  roman: 'B♭: ♭VII7 (backdoor)',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'Gb4', degree: '♭7' },
    { note: 'Bb4', degree: '9'  },
    { note: 'C5',  degree: '3'  },
    { note: 'F5',  degree: '13' },
  ],
};

const V_BbM7: Voicing = {
  symbol: 'B♭M7',
  roman: 'B♭: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '3'  },
    { note: 'F4', degree: '5'  },
    { note: 'A4', degree: 'M7' },
    { note: 'C5', degree: '9'  },
  ],
};

const V_Dm7: Voicing = {
  symbol: 'Dm7',
  roman: 'B♭: iiim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

const V_Bbm7: Voicing = {
  symbol: 'B♭m7',
  roman: 'B♭: im7 (parallel minor)',
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
  roman: 'B♭: IV7',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'Db4', degree: '♭7' },
    { note: 'F4',  degree: '9'  },
    { note: 'G4',  degree: '3'  },
    { note: 'C5',  degree: '13' },
  ],
};

const V_FM7: Voicing = {
  symbol: 'FM7',
  roman: 'B♭: Vmaj7 (modal interchange)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'A4', degree: '3'  },
    { note: 'C5', degree: '5'  },
    { note: 'E5', degree: 'M7' },
    { note: 'G5', degree: '9'  },
  ],
};

const V_Am7: Voicing = {
  symbol: 'Am7',
  roman: 'B♭: viim7 (modal)',
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
  roman: 'B♭: III7 (V/vi)',
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
  roman: 'B♭: VImaj7',
  degreesLabel: 'M7, 9, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: 'M7' },
    { note: 'A4',  degree: '9'  },
    { note: 'B4',  degree: '3'  },
    { note: 'D5',  degree: '5'  },
  ],
};

const V_Gm7: Voicing = {
  symbol: 'Gm7',
  roman: 'B♭: vim7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7' },
    { note: 'A4',  degree: '9'  },
    { note: 'Bb4', degree: '♭3' },
    { note: 'D5',  degree: '5'  },
  ],
};

export const stellaByStarlight: BarsGridProgression = {
  id: 'stella-by-starlight',
  label: 'Stella By Starlight - Victor Young',
  subtitle: 'Stella By Starlight — 32 bars (B♭M)',
  progressionLabel: 'Stella By Starlight (Victor Young, 1944) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 132,
  key: 'Bb',
  voicings: {
    Em7b5: V_Em7b5,
    A7b9:  V_A7b9,
    Cm7:   V_Cm7,
    F7:    V_F7,
    Fm7:   V_Fm7,
    Bb7:   V_Bb7,
    EbM7:  V_EbM7,
    Ab7:   V_Ab7,
    BbM7:  V_BbM7,
    Dm7:   V_Dm7,
    Bbm7:  V_Bbm7,
    Eb7:   V_Eb7,
    FM7:   V_FM7,
    Am7:   V_Am7,
    D7:    V_D7,
    GM7:   V_GM7,
    Gm7:   V_Gm7,
  },
  bars: [
    // A1 (1-8): half-diminished chain opens, lands on ♭VII backdoor
    { number: 1,  chords: [{ key: 'Em7b5', beats: 4 }] },
    { number: 2,  chords: [{ key: 'A7b9',  beats: 4 }] },
    { number: 3,  chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 4,  chords: [{ key: 'F7',    beats: 4 }] },
    { number: 5,  chords: [{ key: 'Fm7',   beats: 4 }] },
    { number: 6,  chords: [{ key: 'Bb7',   beats: 4 }] },
    { number: 7,  chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 8,  chords: [{ key: 'Ab7',   beats: 4 }] },
    // A2 (9-16): tonic arrival, parallel-minor pivot, ii-V to V (Fmaj7)
    { number: 9,  chords: [{ key: 'BbM7',  beats: 4 }] },
    { number: 10, chords: [{ key: 'Em7b5', beats: 4 }] },
    { number: 11, chords: [{ key: 'A7b9',  beats: 4 }] },
    { number: 12, chords: [{ key: 'Dm7',   beats: 4 }] },
    { number: 13, chords: [{ key: 'Bbm7',  beats: 4 }] },
    { number: 14, chords: [{ key: 'Eb7',   beats: 4 }] },
    { number: 15, chords: [{ key: 'FM7',   beats: 4 }] },
    { number: 16, chords: [
      { key: 'Em7b5', beats: 2 },
      { key: 'A7b9',  beats: 2 },
    ] },
    // B (17-24): bridge moves through III7 → vi → ii → ♭VII → I → ♯iv
    { number: 17, chords: [{ key: 'Am7',   beats: 4 }] },
    { number: 18, chords: [{ key: 'D7',    beats: 4 }] },
    { number: 19, chords: [{ key: 'GM7',   beats: 4 }] },
    { number: 20, chords: [{ key: 'Cm7',   beats: 4 }] },
    { number: 21, chords: [{ key: 'Ab7',   beats: 4 }] },
    { number: 22, chords: [{ key: 'BbM7',  beats: 4 }] },
    { number: 23, chords: [{ key: 'Em7b5', beats: 4 }] },
    { number: 24, chords: [{ key: 'A7b9',  beats: 4 }] },
    // C (25-32): climax — iii / I7 / IV / ♭VII7 / I (with split bars)
    { number: 25, chords: [{ key: 'Dm7',   beats: 4 }] },
    { number: 26, chords: [{ key: 'Bb7',   beats: 4 }] },
    { number: 27, chords: [{ key: 'EbM7',  beats: 4 }] },
    { number: 28, chords: [{ key: 'Ab7',   beats: 4 }] },
    { number: 29, chords: [
      { key: 'BbM7', beats: 2 },
      { key: 'Gm7',  beats: 2 },
    ] },
    { number: 30, chords: [
      { key: 'Cm7',  beats: 2 },
      { key: 'F7',   beats: 2 },
    ] },
    { number: 31, chords: [{ key: 'BbM7',  beats: 4 }] },
    { number: 32, chords: [
      { key: 'Cm7',  beats: 2 },
      { key: 'F7',   beats: 2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1',           barRange: [1,  8]  },
    { name: 'A2', label: 'A2',           barRange: [9,  16] },
    { name: 'B',  label: 'B (bridge)',   barRange: [17, 24] },
    { name: 'C',  label: 'C (climax)',   barRange: [25, 32] },
  ],
};
