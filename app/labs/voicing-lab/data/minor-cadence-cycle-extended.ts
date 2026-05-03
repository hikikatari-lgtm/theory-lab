import type {
  Bar,
  BarsGridProgression,
  BarsGridVariantData,
  RhythmInfo,
  Voicing,
  WalkingBassInfo,
} from './types';

// Minor Cadence Cycle Extended — mDecks Vol.2 Workout p.17 (C Minor MAP)
// direct import. 12-bar full circulation through every functional area
// of the C minor key: tonic (i7/ii7/V7/i6) → subdominant minor area
// (ii/iv → V/iv → ii/♭III → V/♭III) → relative major and return
// (subV/♭III → ♭III△ → subV/V → V7 → loop).
//
// Position relative to existing Minor Cadence Cycle (16-bar):
//   16-bar version is the "first encounter" with minor-key cycles
//   (kept as-is). Extended is the next-step compression of the full
//   harmonic palette into 12 bars.
//
// Phase 7-α (PR #15) shipped Voicing 1 only. Phase 7-α follow-up
// (PR #18) adds Voicing 2 (Substitutions) — same Type A/B toggle UX
// as 251 Voicing, enabled by extending BarsGridProgression with the
// new BarsGridVariantData / hasVariants / variants fields.
//
// Voicing 1 (Aeolian / Harmonic Minor blend): every dominant uses the
// plain-7 voicing, no altered tensions.
//
// Voicing 2 (Substitutions): four dominants gain altered tensions —
//   m. 3  V7      G7      → G7(♭13/♯9)
//   m. 6  V/iv    C7      → C7(♭13/♯9)
//   m. 11 subV/V  A♭7     → A♭7(♯11)   triple substitution
//                                       (root→9, 5→13, 3→♯11)
//   m. 12 V7      G7      → G7(♭13/♭9) — uses ♭9 here, not ♯9 like
//                                        m. 3, so the two G7
//                                        substitutions sound distinct
// All other 8 chords (Cm7 / Dm7♭5 / Cm6 / Gm7♭5 / Fm7 / B♭7 / E7 /
// E♭M7) are pitch-identical between V1 and V2 — defined once as
// shared `const` Voicing objects and referenced from both variant
// dicts.
//
// Walking bass + Rhythm A are also fully shared between V1 and V2:
// the variant toggle only changes the upper voicings, not the bass
// or comping rhythm.

// ============================================================
// Shared chord voicings (8 chords used identically in V1 and V2)
// ============================================================
const V_Cm7: Voicing = {
  symbol: 'Cm7',
  roman: 'i7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭3' },
    { note: 'G4',  degree: '5'  },
    { note: 'Bb4', degree: '♭7' },
    { note: 'D5',  degree: '9'  },
  ],
};

const V_Dm7b5: Voicing = {
  symbol: 'Dm7♭5',
  roman: 'ii7',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭3' },
    { note: 'Ab4', degree: '♭5' },
    { note: 'C5',  degree: '♭7' },
    { note: 'Eb5', degree: '♭9' },
  ],
};

const V_Cm6: Voicing = {
  symbol: 'Cm6',
  roman: 'i6',
  degreesLabel: '♭3, 5, 6, 9',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'Eb4', degree: '♭3' },
    { note: 'G4',  degree: '5'  },
    { note: 'A4',  degree: '6'  },
    { note: 'D5',  degree: '9'  },
  ],
};

const V_Gm7b5: Voicing = {
  symbol: 'Gm7♭5',
  roman: 'ii/iv',
  degreesLabel: '♭3, ♭5, ♭7, ♭9',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'Bb4', degree: '♭3' },
    { note: 'Db5', degree: '♭5' },
    { note: 'F5',  degree: '♭7' },
    { note: 'Ab5', degree: '♭9' },
  ],
};

const V_Fm7: Voicing = {
  symbol: 'Fm7',
  roman: 'ii/♭III',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'Ab4', degree: '♭3' },
    { note: 'C5',  degree: '5'  },
    { note: 'Eb5', degree: '♭7' },
    { note: 'G5',  degree: '9'  },
  ],
};

const V_Bb7: Voicing = {
  symbol: 'B♭7',
  roman: 'V/♭III',
  degreesLabel: '♭7, 3, 5, ♭7',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'Ab4', degree: '♭7' },
    { note: 'D5',  degree: '3'  },
    { note: 'F5',  degree: '5'  },
    { note: 'Ab5', degree: '♭7' },
  ],
};

const V_E7: Voicing = {
  symbol: 'E7',
  roman: 'subV/♭III',
  degreesLabel: '3, ♭7, 9, 13',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G#4', degree: '3'  },
    { note: 'D5',  degree: '♭7' },
    { note: 'F#5', degree: '9'  },
    { note: 'A5',  degree: '13' },
  ],
};

const V_EbM7: Voicing = {
  symbol: 'E♭M7',
  roman: '♭III△',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Eb2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '3'  },
    { note: 'Bb4', degree: '5'  },
    { note: 'D5',  degree: 'M7' },
    { note: 'F5',  degree: '9'  },
  ],
};

// ============================================================
// V1-only chord voicings (plain dominants, no altered tensions)
// ============================================================
const V1_G7: Voicing = {
  symbol: 'G7',
  roman: 'V7',
  degreesLabel: '♭7, 3, 5, ♭7',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭7' },
    { note: 'B4', degree: '3'  },
    { note: 'D5', degree: '5'  },
    { note: 'F5', degree: '♭7' },
  ],
};

const V1_C7: Voicing = {
  symbol: 'C7',
  roman: 'V/iv',
  degreesLabel: '3, ♭7, 9, 13',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '3'  },
    { note: 'Bb4', degree: '♭7' },
    { note: 'D5',  degree: '9'  },
    { note: 'A5',  degree: '13' },
  ],
};

const V1_Ab7: Voicing = {
  symbol: 'A♭7',
  roman: 'subV/V',
  degreesLabel: '3, 5, ♭7, 9',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'C5',  degree: '3'  },
    { note: 'Eb5', degree: '5'  },
    { note: 'Gb5', degree: '♭7' },
    { note: 'Bb5', degree: '9'  },
  ],
};

// ============================================================
// V2-only chord voicings (Substitutions: altered dominants)
// ============================================================
// m. 3 G7(♭13/♯9): same pitches as 251 Altered Voicing's G7(♯9♯5)
// (♯5 = ♭13 enharmonically); relabeled here as ♭13 to fit the minor-
// key dominant convention used elsewhere in the lab.
const V2_G7s9b13: Voicing = {
  symbol: 'G7(♭13/♯9)',
  roman: 'V7',
  degreesLabel: '♭7, ♯9, 3, ♭13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7'  },
    { note: 'Bb4', degree: '♯9'  },
    { note: 'B4',  degree: '3'   },
    { note: 'Eb5', degree: '♭13' },
  ],
};

// m. 6 C7(♭13/♯9): same alteration pattern as the m.3 G7, transposed
// to the V/iv chord (going to Fm7 in m. 7).
const V2_C7s9b13: Voicing = {
  symbol: 'C7(♭13/♯9)',
  roman: 'V/iv',
  degreesLabel: '3, ♭7, ♯9, ♭13',
  lh: [{ note: 'C2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '3'   },
    { note: 'Bb4', degree: '♭7'  },
    { note: 'Eb5', degree: '♯9'  },
    { note: 'Ab5', degree: '♭13' },
  ],
};

// m. 11 A♭7(♯11): the "triple substitution" voicing per the user spec.
// Standard rootless rule replaces root with 9 (B♭); mDecks dominant
// rule replaces 5 with 13 (F); the ♯11 substitution then replaces the
// 3rd (C) with the ♯11 (D natural). Result: pure upper-structure
// voicing of ♭7-9-♯11-13, no chord-tone 3 or 5.
//
// Voice leading from the preceding E♭M7 (G4-Bb4-D5-F5) is exceptional:
// 3 common tones (Bb4, D5, F5) + 1 half-step descent (G4 → Gb4 = 3 →
// ♭7). About as smooth as it gets for a chromatic V chord.
const V2_Ab7s11: Voicing = {
  symbol: 'A♭7(♯11)',
  roman: 'subV/V',
  degreesLabel: '♭7, 9, ♯11, 13',
  lh: [{ note: 'Ab2', degree: 'R' }],
  rh: [
    { note: 'Gb4', degree: '♭7'  },
    { note: 'Bb4', degree: '9'   },
    { note: 'D5',  degree: '♯11' },
    { note: 'F5',  degree: '13'  },
  ],
};

// m. 12 G7(♭13/♭9): different ♭9/♯9 choice from m. 3's G7(♭13/♯9), so
// the cycle's two V7 chords sound distinct. Voice leading from V2
// A♭7(♯11) at m. 11 (Gb4-Bb4-D5-F5) descends in parallel:
// Gb4 → F4 (♭7 → ♭7 half-step), Bb4 → Ab4 (9 → ♭9 whole-step),
// D5 → B4 (♯11 → 3 m3 down), F5 → Eb5 (13 → ♭13 whole-step).
const V2_G7b9b13: Voicing = {
  symbol: 'G7(♭13/♭9)',
  roman: 'V7',
  degreesLabel: '♭7, ♭9, 3, ♭13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7'  },
    { note: 'Ab4', degree: '♭9'  },
    { note: 'B4',  degree: '3'   },
    { note: 'Eb5', degree: '♭13' },
  ],
};

// ============================================================
// Walking bass + Rhythm — fully shared between V1 and V2
// ============================================================
const WB_Cm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'Bb2'] };
const WB_Dm7b5:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F2',  'Ab2', 'C3']  };
const WB_G7:     WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'B2',  'D3',  'F3']  };
const WB_Cm6:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'A2']  };
const WB_Gm7b5:  WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2', 'Db3', 'F3']  };
const WB_C7:     WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2',  'Bb2'] };
const WB_Fm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'C3',  'Eb3'] };
const WB_Bb7:    WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'Ab3'] };
const WB_E7:     WalkingBassInfo = { pattern: 'ascending', notes: ['E2',  'G#2', 'B2',  'D3']  };
const WB_EbM7:   WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2',  'Bb2', 'D3']  };
const WB_Ab7:    WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3',  'Eb3', 'Gb3'] };

const RHYTHM_A: RhythmInfo = { pattern: 'A', hits: [0, 1.5] };

// ============================================================
// Variant assembly
// ============================================================
const variantA: BarsGridVariantData = {
  voicings: {
    Cm7:   V_Cm7,
    Dm7b5: V_Dm7b5,
    G7:    V1_G7,
    Cm6:   V_Cm6,
    Gm7b5: V_Gm7b5,
    C7:    V1_C7,
    Fm7:   V_Fm7,
    Bb7:   V_Bb7,
    E7:    V_E7,
    EbM7:  V_EbM7,
    Ab7:   V1_Ab7,
  },
  bars: [
    // Tonic section: i7 → ii7 → V7 → i6
    { number: 1,  chords: [{ key: 'Cm7',   beats: 4, walkingBass: WB_Cm7,   rhythm: RHYTHM_A }] },
    { number: 2,  chords: [{ key: 'Dm7b5', beats: 4, walkingBass: WB_Dm7b5, rhythm: RHYTHM_A }] },
    { number: 3,  chords: [{ key: 'G7',    beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
    { number: 4,  chords: [{ key: 'Cm6',   beats: 4, walkingBass: WB_Cm6,   rhythm: RHYTHM_A }] },
    // Subdominant minor area: ii/iv → V/iv → ii/♭III → V/♭III
    { number: 5,  chords: [{ key: 'Gm7b5', beats: 4, walkingBass: WB_Gm7b5, rhythm: RHYTHM_A }] },
    { number: 6,  chords: [{ key: 'C7',    beats: 4, walkingBass: WB_C7,    rhythm: RHYTHM_A }] },
    { number: 7,  chords: [{ key: 'Fm7',   beats: 4, walkingBass: WB_Fm7,   rhythm: RHYTHM_A }] },
    { number: 8,  chords: [{ key: 'Bb7',   beats: 4, walkingBass: WB_Bb7,   rhythm: RHYTHM_A }] },
    // Relative major and return: subV/♭III → ♭III△ → subV/V → V7 → loop
    { number: 9,  chords: [{ key: 'E7',    beats: 4, walkingBass: WB_E7,    rhythm: RHYTHM_A }] },
    { number: 10, chords: [{ key: 'EbM7',  beats: 4, walkingBass: WB_EbM7,  rhythm: RHYTHM_A }] },
    { number: 11, chords: [{ key: 'Ab7',   beats: 4, walkingBass: WB_Ab7,   rhythm: RHYTHM_A }] },
    { number: 12, chords: [{ key: 'G7',    beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
  ],
};

// V2 bars differ from V1 only at the four altered-dominant slots:
// m.3 references G7s9b13 (not G7), m.6 references C7s9b13 (not C7),
// m.11 references Ab7s11 (not Ab7), m.12 references G7b9b13 (not G7).
// All other 8 bars are identical to V1.
const variantB_bars: Bar[] = [
  { number: 1,  chords: [{ key: 'Cm7',     beats: 4, walkingBass: WB_Cm7,   rhythm: RHYTHM_A }] },
  { number: 2,  chords: [{ key: 'Dm7b5',   beats: 4, walkingBass: WB_Dm7b5, rhythm: RHYTHM_A }] },
  { number: 3,  chords: [{ key: 'G7s9b13', beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
  { number: 4,  chords: [{ key: 'Cm6',     beats: 4, walkingBass: WB_Cm6,   rhythm: RHYTHM_A }] },
  { number: 5,  chords: [{ key: 'Gm7b5',   beats: 4, walkingBass: WB_Gm7b5, rhythm: RHYTHM_A }] },
  { number: 6,  chords: [{ key: 'C7s9b13', beats: 4, walkingBass: WB_C7,    rhythm: RHYTHM_A }] },
  { number: 7,  chords: [{ key: 'Fm7',     beats: 4, walkingBass: WB_Fm7,   rhythm: RHYTHM_A }] },
  { number: 8,  chords: [{ key: 'Bb7',     beats: 4, walkingBass: WB_Bb7,   rhythm: RHYTHM_A }] },
  { number: 9,  chords: [{ key: 'E7',      beats: 4, walkingBass: WB_E7,    rhythm: RHYTHM_A }] },
  { number: 10, chords: [{ key: 'EbM7',    beats: 4, walkingBass: WB_EbM7,  rhythm: RHYTHM_A }] },
  { number: 11, chords: [{ key: 'Ab7s11',  beats: 4, walkingBass: WB_Ab7,   rhythm: RHYTHM_A }] },
  { number: 12, chords: [{ key: 'G7b9b13', beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
];

const variantB: BarsGridVariantData = {
  voicings: {
    Cm7:      V_Cm7,
    Dm7b5:    V_Dm7b5,
    G7s9b13:  V2_G7s9b13,
    Cm6:      V_Cm6,
    Gm7b5:    V_Gm7b5,
    C7s9b13:  V2_C7s9b13,
    Fm7:      V_Fm7,
    Bb7:      V_Bb7,
    E7:       V_E7,
    EbM7:     V_EbM7,
    Ab7s11:   V2_Ab7s11,
    G7b9b13:  V2_G7b9b13,
  },
  bars: variantB_bars,
};

export const minorCadenceCycleExtended: BarsGridProgression = {
  id: 'minor-cadence-cycle-extended',
  label: 'Minor Cadence Cycle Extended',
  subtitle: 'C Minor full circulation — 12 bars (Voicing 1 / 2)',
  progressionLabel: 'Minor Cadence Cycle Extended (mDecks Vol.2 p.17) — 12 bars',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'Cm',
  // Top-level voicings/bars act as the default (Voicing 1) — the
  // viewProgression memo swaps these for variants[type] at render time.
  voicings: variantA.voicings,
  bars: variantA.bars,
  group: 'progression',
  hasVariants: true,
  variants: { a: variantA, b: variantB },
};
