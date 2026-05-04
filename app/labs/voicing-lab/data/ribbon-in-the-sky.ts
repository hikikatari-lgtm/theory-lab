import type { BarsGridProgression, Voicing } from './types';

// Ribbon in the Sky (Stevie Wonder, Original Musiquarium I, 1982) —
// E♭ major ballad. 16-bar form built on a simple ii-iii-V/Ⅵ skeleton
// (Fm7 → Gm7 → B♭/C) repeated and varied. The B section breaks into
// borrowed-mode color (Ebsus → Ebm7 → Gbmaj7) and chromatic disorientation
// (Bmaj7 in bar 13 — enharmonic ♭VImaj7 of E♭).
//
// Three pedagogical centerpieces:
//   1. B♭/C — V over VI bass slash. Upper structure: B♭ major triad
//      sitting above a C bass. Same shape family as Isn't She Lovely's
//      A/B (= IV/V) and Tom Misch's B/C♯ (= QJ chord).
//   2. A♭/B♭ — IV over V bass. Same upper-structure family.
//   3. Chromatic bass ascent in bars 7-8 (F → G → A♭ → B♭) and again
//      in B section, walking the bass through chord changes.
//
// Phase Stevie PR scope: piano voicings only.

const V_Fm7: Voicing = {
  symbol: 'Fm7',
  roman: 'E♭M: iim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'Ab4', degree: '♭3' },
    { note: 'C5',  degree: '5'  },
    { note: 'Eb5', degree: '♭7' },
    { note: 'G5',  degree: '9'  },
  ],
};

const V_Gm7: Voicing = {
  symbol: 'Gm7',
  roman: 'E♭M: iiim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'Bb4', degree: '♭3' },
    { note: 'D5',  degree: '5'  },
    { note: 'F5',  degree: '♭7' },
    { note: 'A5',  degree: '9'  },
  ],
};

// B♭/C — upper structure: B♭ major triad over C bass. Functions as
// C7sus / C11. LH = C bass, RH = pure B♭ major triad (B♭-D-F).
const V_BboverC: Voicing = {
  symbol: 'B♭/C',
  roman: 'E♭M: V/Ⅵ (slash — upper structure)',
  degreesLabel: 'L.H. C bass / R.H. B♭ major triad (B♭-D-F)',
  lh: [{ note: 'C2', degree: 'C bass' }],
  rh: [
    { note: 'Bb4', degree: 'B♭ (triad R)' },
    { note: 'D5',  degree: 'D (triad 3)'  },
    { note: 'F5',  degree: 'F (triad 5)'  },
  ],
};

// A♭/B♭ — upper structure: A♭ major triad over B♭ bass. Functions
// as B♭7sus.
const V_AboverBb: Voicing = {
  symbol: 'A♭/B♭',
  roman: 'E♭M: IV/V (slash — upper structure)',
  degreesLabel: 'L.H. B♭ bass / R.H. A♭ major triad (A♭-C-E♭)',
  lh: [{ note: 'Bb2', degree: 'B♭ bass' }],
  rh: [
    { note: 'Ab4', degree: 'A♭ (triad R)' },
    { note: 'C5',  degree: 'C (triad 3)'  },
    { note: 'Eb5', degree: 'E♭ (triad 5)' },
  ],
};

const V_Ebsus: Voicing = {
  symbol: 'E♭sus',
  roman: 'E♭M: Isus',
  degreesLabel: 'sus4, 5, R, 9',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'Ab4', degree: 'sus4'        },
    { note: 'Bb4', degree: '5'           },
    { note: 'Eb5', degree: 'R (doubled)' },
    { note: 'F5',  degree: '9'           },
  ],
};

const V_Ebm7: Voicing = {
  symbol: 'E♭m7',
  roman: 'E♭M: im7 (parallel-minor borrowing)',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'Gb4', degree: '♭3' },
    { note: 'Bb4', degree: '5'  },
    { note: 'Db5', degree: '♭7' },
    { note: 'F5',  degree: '9'  },
  ],
};

const V_Gbmaj7: Voicing = {
  symbol: 'G♭maj7',
  roman: 'E♭M: ♭IIImaj7 (parallel-minor borrowing)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Gb2', degree: 'R' }],
  rh: [
    { note: 'Bb4', degree: '3'  },
    { note: 'Db5', degree: '5'  },
    { note: 'F5',  degree: 'M7' },
    { note: 'Ab5', degree: '9'  },
  ],
};

// E♭/G — first inversion of E♭ major (bass = G, the 3rd). Used in
// the chromatic bass ascent of the B section.
const V_EboverG: Voicing = {
  symbol: 'E♭/G',
  roman: 'E♭M: I/iii (walking bass)',
  degreesLabel: 'L.H. G bass / R.H. E♭ major triad (E♭-G-B♭)',
  lh: [{ note: 'G2', degree: 'G bass (= 3rd of E♭)' }],
  rh: [
    { note: 'Eb4', degree: 'E♭ (triad R)' },
    { note: 'G4',  degree: 'G (triad 3)'  },
    { note: 'Bb4', degree: 'B♭ (triad 5)' },
  ],
};

const V_Absus: Voicing = {
  symbol: 'A♭sus',
  roman: 'E♭M: IVsus',
  degreesLabel: 'sus4, 5, R, 9',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'Db4', degree: 'sus4'        },
    { note: 'Eb4', degree: '5'           },
    { note: 'Ab4', degree: 'R (doubled)' },
    { note: 'Bb4', degree: '9'           },
  ],
};

// Bmaj7 — enharmonic to C♭maj7, which is ♭VImaj7 of E♭. Spelled as
// B major in the chart for chromatic-disorientation effect.
const V_Bmaj7: Voicing = {
  symbol: 'Bmaj7',
  roman: 'E♭M: ♭VImaj7 (= C♭ enharmonic substitute)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D#4', degree: '3'  },
    { note: 'F#4', degree: '5'  },
    { note: 'A#4', degree: 'M7' },
    { note: 'C#5', degree: '9'  },
  ],
};

const V_Bb7sus: Voicing = {
  symbol: 'B♭7sus',
  roman: 'E♭M: V7sus',
  degreesLabel: 'sus4, 5, ♭7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: 'sus4' },
    { note: 'F4',  degree: '5'    },
    { note: 'Ab4', degree: '♭7'   },
    { note: 'C5',  degree: '9'    },
  ],
};

const V_Bb7: Voicing = {
  symbol: 'B♭7',
  roman: 'E♭M: V7',
  degreesLabel: '3, 13, ♭7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '3'  },
    { note: 'G4',  degree: '13' },
    { note: 'Ab4', degree: '♭7' },
    { note: 'C5',  degree: '9'  },
  ],
};

export const ribbonInTheSky: BarsGridProgression = {
  id: 'ribbon-in-the-sky',
  label: 'Ribbon in the Sky - Stevie Wonder',
  subtitle: 'Ribbon in the Sky — 16 bars (E♭M, slash chord showcase)',
  progressionLabel: 'Ribbon in the Sky (Stevie Wonder, Original Musiquarium I, 1982) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 68,
  key: 'EbM',
  voicings: {
    Fm7:       V_Fm7,
    Gm7:       V_Gm7,
    BboverC:   V_BboverC,
    AboverBb:  V_AboverBb,
    Ebsus:     V_Ebsus,
    Ebm7:      V_Ebm7,
    Gbmaj7:    V_Gbmaj7,
    EboverG:   V_EboverG,
    Absus:     V_Absus,
    Bmaj7:     V_Bmaj7,
    Bb7sus:    V_Bb7sus,
    Bb7:       V_Bb7,
  },
  bars: [
    // A: Verse (1-8) — ii-iii-V/Ⅵ cycle ×2, ascending pre-resolution
    { number: 1, chords: [{ key: 'Fm7',     beats: 4 }] },
    { number: 2, chords: [{ key: 'Gm7',     beats: 4 }] },
    { number: 3, chords: [{ key: 'BboverC', beats: 4 }] },
    { number: 4, chords: [{ key: 'Fm7',     beats: 4 }] },
    { number: 5, chords: [{ key: 'Gm7',     beats: 4 }] },
    { number: 6, chords: [{ key: 'BboverC', beats: 4 }] },
    { number: 7, chords: [
      { key: 'Fm7', beats: 2 },
      { key: 'Gm7', beats: 2 },
    ] },
    { number: 8, chords: [{ key: 'AboverBb', beats: 4 }] },
    // B: Pre-Chorus / Chorus (9-16) — borrowed-mode color +
    // chromatic substitute, walking bass through the chord changes
    { number: 9, chords: [
      { key: 'Ebsus', beats: 2 },
      { key: 'Ebm7',  beats: 2 },
    ] },
    { number: 10, chords: [{ key: 'Gbmaj7',  beats: 4 }] },
    { number: 11, chords: [{ key: 'EboverG', beats: 4 }] },
    { number: 12, chords: [{ key: 'Absus',   beats: 4 }] },
    { number: 13, chords: [{ key: 'Bmaj7',   beats: 4 }] },
    { number: 14, chords: [{ key: 'Absus',   beats: 4 }] },
    { number: 15, chords: [
      { key: 'Fm7', beats: 2 },
      { key: 'Gm7', beats: 2 },
    ] },
    { number: 16, chords: [
      { key: 'Bb7sus', beats: 2 },
      { key: 'Bb7',    beats: 2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Verse)',                  barRange: [1, 8]  },
    { name: 'B', label: 'B (Pre-Chorus / Chorus)',    barRange: [9, 16] },
  ],
};
