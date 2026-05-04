import type { BarsGridProgression, Voicing } from './types';

// Africa (D'Angelo, Voodoo, 2000) — E major Mixolydian / relative-minor
// hybrid. The Voodoo album closer; D'Angelo's overt nod to Prince and
// to the African-diaspora root of soul/R&B. 16-bar form: A vamp (E
// major Mixolydian — I → ♭VII → IV → I) shifts in the B section to
// the relative-minor tonal area (vim11 → iim9 → Vsus13 → Imaj9).
//
// Phase R&B-A PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate Phase R&B-B PR.
//
// Voicing convention for R&B/Neo Soul (different from jazz lab norms):
// - Tensions are part of the chord color, not decoration: maj7 / 9 /
//   11 / 13 are voiced as part of the structural pitches
// - The A section uses "thin" voicings (maj7-stop) to leave headroom
//   for the bridge to escalate into m11 / sus13 territory
// - Mixolydian color comes from D natural (♭7 of E) being a common
//   tone across I (Emaj7's #), ♭VII (Dmaj7's R), and IV (Amaj7's #4...
//   not directly — the Mixolydian feel emerges from the I-♭VII pivot)

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

const V_Dmaj7: Voicing = {
  symbol: 'Dmaj7',
  roman: 'EM: ♭VIImaj7 (Mixolydian)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'A4',  degree: '5'  },
    { note: 'C#5', degree: 'M7' },
    { note: 'E5',  degree: '9'  },
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

const V_Bsus: Voicing = {
  symbol: 'Bsus',
  roman: 'EM: Vsus',
  degreesLabel: 'sus4, 5, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: 'sus4' },
    { note: 'F#4', degree: '5'    },
    { note: 'A4',  degree: '♭7'   },
    { note: 'C#5', degree: '9'    },
  ],
};

const V_B7: Voicing = {
  symbol: 'B7',
  roman: 'EM: V7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D#4', degree: '3'  },
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
    { note: 'F#5', degree: '13' },
  ],
};

// Bridge — extension-rich voicings (m11, m9, sus13, maj9). The 11
// is voiced explicitly on top of m11; sus13 carries the ♭7 + 13
// stack characteristic of the Neo Soul "open V" sound.
const V_Csm11: Voicing = {
  symbol: 'C♯m11',
  roman: 'EM: vim11',
  degreesLabel: '♭3, ♭7, 9, 11',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '♭3' },
    { note: 'B4',  degree: '♭7' },
    { note: 'D#5', degree: '9'  },
    { note: 'F#5', degree: '11' },
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

const V_Bsus13: Voicing = {
  symbol: 'Bsus13',
  roman: 'EM: Vsus13',
  degreesLabel: '♭7, sus4, 5, 13',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A4',  degree: '♭7'   },
    { note: 'E5',  degree: 'sus4' },
    { note: 'F#5', degree: '5'    },
    { note: 'G#5', degree: '13'   },
  ],
};

const V_Emaj9: Voicing = {
  symbol: 'Emaj9',
  roman: 'EM: Imaj9',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G#4', degree: '3'  },
    { note: 'B4',  degree: '5'  },
    { note: 'D#5', degree: 'M7' },
    { note: 'F#5', degree: '9'  },
  ],
};

export const africaDangelo: BarsGridProgression = {
  id: 'africa-dangelo',
  label: "Africa - D'Angelo",
  subtitle: "Africa — 16 bars (EM Mixolydian, Vamp + Bridge)",
  progressionLabel: "Africa (D'Angelo, Voodoo, 2000) — 16 bars",
  displayMode: 'bars-grid',
  tempo: 97,
  key: 'EM',
  voicings: {
    Emaj7: V_Emaj7,
    Dmaj7: V_Dmaj7,
    Amaj7: V_Amaj7,
    Bsus:  V_Bsus,
    B7:    V_B7,
    Csm11: V_Csm11,
    Fsm9:  V_Fsm9,
    Bsus13: V_Bsus13,
    Emaj9:  V_Emaj9,
  },
  bars: [
    // A: Main Vamp (1-8) — E Mixolydian I → ♭VII → IV → I
    { number: 1, chords: [{ key: 'Emaj7', beats: 4 }] },
    { number: 2, chords: [{ key: 'Dmaj7', beats: 4 }] },
    { number: 3, chords: [{ key: 'Amaj7', beats: 4 }] },
    { number: 4, chords: [{ key: 'Emaj7', beats: 4 }] },
    { number: 5, chords: [{ key: 'Emaj7', beats: 4 }] },
    { number: 6, chords: [{ key: 'Dmaj7', beats: 4 }] },
    { number: 7, chords: [{ key: 'Amaj7', beats: 4 }] },
    { number: 8, chords: [
      { key: 'Bsus', beats: 2 },
      { key: 'B7',   beats: 2 },
    ] },
    // B: Bridge (9-16) — relative-minor area, extensions push to 11/13
    { number: 9,  chords: [{ key: 'Csm11',  beats: 4 }] },
    { number: 10, chords: [{ key: 'Fsm9',   beats: 4 }] },
    { number: 11, chords: [{ key: 'Bsus13', beats: 4 }] },
    { number: 12, chords: [{ key: 'Emaj9',  beats: 4 }] },
    { number: 13, chords: [{ key: 'Csm11',  beats: 4 }] },
    { number: 14, chords: [{ key: 'Fsm9',   beats: 4 }] },
    { number: 15, chords: [{ key: 'Bsus13', beats: 4 }] },
    { number: 16, chords: [{ key: 'Emaj9',  beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Main Vamp)', barRange: [1, 8]  },
    { name: 'B', label: 'B (Bridge)',    barRange: [9, 16] },
  ],
};
