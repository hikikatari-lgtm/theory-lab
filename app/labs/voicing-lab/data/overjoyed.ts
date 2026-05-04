import type { BarsGridProgression, Voicing } from './types';

// Overjoyed (Stevie Wonder, In Square Circle, 1985) — E major Stevie
// piano showcase. The piece is a sequence of half-bar moves through
// densely-extended chords with V7sus / V7sus13 as the harmonic glue.
// Almost every bar contains a chord change, and many bars carry two
// chord events for the half-bar pivots that give the song its
// floating quality.
//
// The "B7sus13" in bar 12 is the textbook Stevie-piano move: V chord
// with both the suspended 4 AND the upper 13, voiced as an A major
// triad-flavored upper structure over B bass — the same family of
// upper-structure thinking that produced the Quincy Jones chord
// (B/C♯) in Tom Misch's "It Runs Through Me".
//
// F♯m7 vs F♯m9 distinction: F♯m9 (bar 2) explicitly stacks the 9 on
// top; F♯m7 (bars 6 / 8 / 11 / 14) keeps the m7 chord-tone identity
// with the root doubled in the upper voice instead of the 9. Same
// chord function, different color.
//
// Phase Stevie PR scope: piano voicings only.

const V_Emaj7: Voicing = {
  symbol: 'Emaj7',
  roman: 'EM: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G#4', degree: '3'  },
    { note: 'B4',  degree: '5'  },
    { note: 'D#5', degree: 'M7' },
    { note: 'F#5', degree: '9'  },
  ],
};

const V_Fsm9: Voicing = {
  symbol: 'F♯m9',
  roman: 'EM: iim9',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭3' },
    { note: 'C#5', degree: '5'  },
    { note: 'E5',  degree: '♭7' },
    { note: 'G#5', degree: '9'  },
  ],
};

const V_B13: Voicing = {
  symbol: 'B13',
  roman: 'EM: V13',
  degreesLabel: '♭7, 9, 3, 13',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
    { note: 'D#5', degree: '3'  },
    { note: 'G#5', degree: '13' },
  ],
};

const V_Gsm7: Voicing = {
  symbol: 'G♯m7',
  roman: 'EM: iiim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'B4',  degree: '♭3' },
    { note: 'D#5', degree: '5'  },
    { note: 'F#5', degree: '♭7' },
    { note: 'A#5', degree: '9'  },
  ],
};

const V_Amaj7: Voicing = {
  symbol: 'Amaj7',
  roman: 'EM: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C#4', degree: '3'  },
    { note: 'E4',  degree: '5'  },
    { note: 'G#4', degree: 'M7' },
    { note: 'B4',  degree: '9'  },
  ],
};

const V_B7sus: Voicing = {
  symbol: 'B7sus',
  roman: 'EM: V7sus',
  degreesLabel: 'sus4, 5, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: 'sus4' },
    { note: 'F#4', degree: '5'    },
    { note: 'A4',  degree: '♭7'   },
    { note: 'C#5', degree: '9'    },
  ],
};

const V_Csm7: Voicing = {
  symbol: 'C♯m7',
  roman: 'EM: vim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '♭3' },
    { note: 'G#4', degree: '5'  },
    { note: 'B4',  degree: '♭7' },
    { note: 'D#5', degree: '9'  },
  ],
};

// F♯m7 — distinct from F♯m9. The 9 (G♯) is omitted; instead the
// root (F♯) is doubled in the upper voice so the m7 chord-tone
// identity is more grounded.
const V_Fsm7: Voicing = {
  symbol: 'F♯m7',
  roman: 'EM: iim7',
  degreesLabel: '♭3, 5, ♭7, R (no 9, root doubled)',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭3'           },
    { note: 'C#5', degree: '5'            },
    { note: 'E5',  degree: '♭7'           },
    { note: 'F#5', degree: 'R (doubled)'  },
  ],
};

// B7sus13 — Stevie's signature voicing. RH carries the sus4 (E),
// 5 (F♯), 13 (G♯) plus ♭7 (A) — essentially an A major triad
// (A-C♯-E) with G♯ on top, sitting above B bass. The "upper
// structure feel" that Stevie threads through Overjoyed.
const V_B7sus13: Voicing = {
  symbol: 'B7sus13',
  roman: 'EM: V7sus13',
  degreesLabel: '♭7, sus4, 5, 13',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭7'   },
    { note: 'E5',  degree: 'sus4' },
    { note: 'F#5', degree: '5'    },
    { note: 'G#5', degree: '13'   },
  ],
};

// B7 — sus4 (E5) of B7sus13 resolves to 3 (D♯5); other voices stay.
const V_B7: Voicing = {
  symbol: 'B7',
  roman: 'EM: V7',
  degreesLabel: '♭7, 3, 5, 13',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭7' },
    { note: 'D#5', degree: '3'  },
    { note: 'F#5', degree: '5'  },
    { note: 'G#5', degree: '13' },
  ],
};

const V_Bmaj7: Voicing = {
  symbol: 'Bmaj7',
  roman: 'EM: Vmaj7 (chromatic substitute)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D#4', degree: '3'  },
    { note: 'F#4', degree: '5'  },
    { note: 'A#4', degree: 'M7' },
    { note: 'C#5', degree: '9'  },
  ],
};

export const overjoyed: BarsGridProgression = {
  id: 'overjoyed',
  label: 'Overjoyed - Stevie Wonder',
  subtitle: 'Overjoyed — 16 bars (EM, sus / upper structure showcase)',
  progressionLabel: 'Overjoyed (Stevie Wonder, In Square Circle, 1985) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 76,
  key: 'EM',
  voicings: {
    Emaj7:    V_Emaj7,
    Fsm9:     V_Fsm9,
    B13:      V_B13,
    Gsm7:     V_Gsm7,
    Amaj7:    V_Amaj7,
    B7sus:    V_B7sus,
    Csm7:     V_Csm7,
    Fsm7:     V_Fsm7,
    B7sus13:  V_B7sus13,
    B7:       V_B7,
    Bmaj7:    V_Bmaj7,
  },
  bars: [
    // A: Verse (1-8) — Imaj7 → ii-V13 → I/iii → IV/V7sus → vi → ii/V7sus → I → ii/V7sus
    { number: 1, chords: [{ key: 'Emaj7',   beats: 4 }] },
    { number: 2, chords: [
      { key: 'Fsm9', beats: 2 },
      { key: 'B13',  beats: 2 },
    ] },
    { number: 3, chords: [
      { key: 'Emaj7', beats: 2 },
      { key: 'Gsm7',  beats: 2 },
    ] },
    { number: 4, chords: [
      { key: 'Amaj7', beats: 2 },
      { key: 'B7sus', beats: 2 },
    ] },
    { number: 5, chords: [{ key: 'Csm7', beats: 4 }] },
    { number: 6, chords: [
      { key: 'Fsm7',  beats: 2 },
      { key: 'B7sus', beats: 2 },
    ] },
    { number: 7, chords: [{ key: 'Emaj7', beats: 4 }] },
    { number: 8, chords: [
      { key: 'Fsm7',  beats: 2 },
      { key: 'B7sus', beats: 2 },
    ] },
    // B: Chorus / Bridge (9-16) — escalates to V7sus13 / V7 in bar 12
    { number: 9, chords: [{ key: 'Amaj7', beats: 4 }] },
    { number: 10, chords: [
      { key: 'Gsm7', beats: 2 },
      { key: 'Csm7', beats: 2 },
    ] },
    { number: 11, chords: [{ key: 'Fsm7', beats: 4 }] },
    { number: 12, chords: [
      { key: 'B7sus13', beats: 2 },
      { key: 'B7',      beats: 2 },
    ] },
    { number: 13, chords: [
      { key: 'Emaj7', beats: 2 },
      { key: 'Amaj7', beats: 2 },
    ] },
    { number: 14, chords: [
      { key: 'Csm7', beats: 2 },
      { key: 'Fsm7', beats: 2 },
    ] },
    { number: 15, chords: [
      { key: 'Bmaj7', beats: 2 },
      { key: 'B7sus', beats: 2 },
    ] },
    { number: 16, chords: [{ key: 'Emaj7', beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Verse)',           barRange: [1, 8]  },
    { name: 'B', label: 'B (Chorus / Bridge)', barRange: [9, 16] },
  ],
};
