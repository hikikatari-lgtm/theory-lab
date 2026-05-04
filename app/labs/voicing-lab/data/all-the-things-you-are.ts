import type {
  BarsGridProgression,
  RhythmInfo,
  WalkingBassInfo,
} from './types';

// All The Things You Are (Jerome Kern, 1939) — the canonical
// modulating standard. 36-bar AA'BA'' form cycling through four
// key centers (A♭ → C → E♭ → G → E → A♭). Every key change is
// approached by a ii-V or ii-V-I, making the piece a textbook for
// jazz transposition practice.
//
// Form (36 bars):
//   A   (mm. 1-8):   Fm7 → B♭m7 → E♭7 → A♭△ → D♭△ → Dm7♭5 G7♭9 → C△ → C△
//                    A♭ major area, ending in C major via minor ii-V/iii
//   A'  (mm. 9-16):  Cm7 → Fm7 → B♭7 → E♭△ → A♭△ → Am7♭5 D7♭9 → G△ → G△
//                    E♭ major area (P4 down from A), ending in G major
//   B   (mm. 17-24): Am7 → D7 → G△ → G△ → Fm7♭5 → B7♭9 → E△ → C7♯5
//                    G major → E major (minor ii-V to E), turn-back via
//                    C7♯5 (V7♯5/vi → Fm7 in m. 25)
//   A'' (mm. 25-36): Fm7 → B♭m7 → E♭7 → A♭△ → D♭△ →
//                    C♯m7 → Cm7 → Bo7 → B♭m7 → E♭7 → A♭△ →
//                    Gm7♭5 C7♭9
//                    A♭ major return + half-step chromatic descent
//                    (C♯m7 → Cm7 → Bo7 → B♭m7) + ii-V turnaround back
//                    to bar 1's Fm7
//
// 24 unique voicings — bulk of A/A'/A'' chords reuse pitch-identical
// shapes from earlier progressions (Body And Soul / Cadence Cycle /
// Solar / Autumn Leaves / Misty / Fly Me / Blue In Green). New voicings:
// GM7 (inverted M7-9-3-5 for textbook ii-V resolution from D7), plain
// D7 (3-13-♭7-9, same pattern as Autumn Leaves' D7♭9 with natural 9),
// Fm7♭5 (♭3-♭5-♭7-♭9 ascending), B7♭9 (♭7-♭9-3-13, distinct from Body
// And Soul's natural-9 B7), C7♯5 (3-♯5-♭7-9 — first ♯5 chord in the
// lab), Bo7 (B-D-F-A♭ chord tones, root doubled in upper voice).
//
// Roman numerals use the spec's "key: function" prefix to make the
// modulating tonal centers explicit. Chords appearing in multiple
// bars get one canonical label (typically the most prominent role).
//
// Walking bass: ascending chord-tones for full bars; HALF (R-3 or
// R-♭3) for the three half-bar pairs (mm. 6, 14, 36). Bar 8 CM7 uses
// the spec's "1-5-8-♮7 broken" line ending on B2 — a half-step
// chromatic-approach BELOW the next chord (Cm7 in bar 9, root C2).
// All bass notes ≥ C2.
//
// Rhythm: Rhythm A on every full bar; Rhythm B split (HALF1 [0.5] +
// HALF2 [0]) on the three half-bar pairs so each chord gets exactly
// one hit (HALF1 on the upbeat, HALF2 on the chord-change downbeat).
// Combined bar pattern is [0.5, 2] = canonical Rhythm B.

// ---- Walking bass constants ----
const WB_Fm7:       WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'C3',  'Eb3'] };
const WB_Bbm7:      WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'Db3', 'F3',  'Ab3'] };
const WB_Eb7:       WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2',  'Bb2', 'Db3'] };
const WB_AbM7:      WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3',  'Eb3', 'G3']  };
const WB_DbM7:      WalkingBassInfo = { pattern: 'ascending', notes: ['Db2', 'F2',  'Ab2', 'C3']  };
const WB_CM7:       WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2',  'B2']  };
const WB_CM7_BAR8:  WalkingBassInfo = { pattern: 'broken_1_5_8', notes: ['C2', 'G2', 'C3', 'B2'] };
const WB_Cm7:       WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'Bb2'] };
const WB_Bb7:       WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'Ab3'] };
const WB_EbM7:      WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2',  'Bb2', 'D3']  };
const WB_GM7:       WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'B2',  'D3',  'F#3'] };
const WB_Am7:       WalkingBassInfo = { pattern: 'ascending', notes: ['A2',  'C3',  'E3',  'G3']  };
const WB_D7:        WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2', 'A2',  'C3']  };
const WB_Fm7b5:     WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'B2',  'Eb3'] };
const WB_B7b9:      WalkingBassInfo = { pattern: 'ascending', notes: ['B2',  'D#3', 'F#3', 'A3']  };
const WB_EM7:       WalkingBassInfo = { pattern: 'ascending', notes: ['E2',  'G#2', 'B2',  'D#3'] };
const WB_C7s5:      WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G#2', 'Bb2'] };
const WB_Csm7:      WalkingBassInfo = { pattern: 'ascending', notes: ['C#2', 'E2',  'G#2', 'B2']  };
const WB_Bo7:       WalkingBassInfo = { pattern: 'ascending', notes: ['B2',  'D3',  'F3',  'Ab3'] };

const WB_Dm7b5_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F2']  };
const WB_G7b9_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'B2']  };
const WB_Am7b5_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['A2',  'C3']  };
const WB_D7b9_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2'] };
const WB_Gm7b5_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2'] };
const WB_C7b9_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2']  };

// ---- Rhythm constants ----
const RHYTHM_A:         RhythmInfo = { pattern: 'A', hits: [0, 1.5] };
const RHYTHM_B_HALF1:   RhythmInfo = { pattern: 'B', hits: [0.5] };
const RHYTHM_B_HALF2:   RhythmInfo = { pattern: 'B', hits: [0] };

export const allTheThingsYouAre: BarsGridProgression = {
  id: 'all-the-things-you-are',
  label: 'All The Things You Are - Jerome Kern',
  subtitle: 'ATTYA — 36 bars (AA′BA″, 4 key centers)',
  progressionLabel: 'All The Things You Are (Jerome Kern, 1939) — 36 bars',
  displayMode: 'bars-grid',
  tempo: 172,
  key: 'Ab',
  voicings: {
    Fm7: {
      symbol: 'Fm7',
      roman: 'A♭: vi7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
      ],
    },
    Bbm7: {
      symbol: 'B♭m7',
      roman: 'A♭: ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭3' },
        { note: 'F4',  degree: '5'  },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
    Eb7: {
      symbol: 'E♭7',
      roman: 'A♭: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭7' },
        { note: 'F4',  degree: '9'  },
        { note: 'G4',  degree: '3'  },
        { note: 'C5',  degree: '13' },
      ],
    },
    AbM7: {
      symbol: 'A♭M7',
      roman: 'A♭: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'C4',  degree: '3'  },
        { note: 'Eb4', degree: '5'  },
        { note: 'G4',  degree: 'M7' },
        { note: 'Bb4', degree: '9'  },
      ],
    },
    DbM7: {
      symbol: 'D♭M7',
      roman: 'A♭: IVΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Db2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '3'  },
        { note: 'Ab4', degree: '5'  },
        { note: 'C5',  degree: 'M7' },
        { note: 'Eb5', degree: '9'  },
      ],
    },
    Dm7b5: {
      symbol: 'Dm7♭5',
      roman: 'C: ii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭3' },
        { note: 'Ab4', degree: '♭5' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    G7b9: {
      symbol: 'G7(♭9)',
      roman: 'C: V7♭9',
      degreesLabel: '♭7, ♭9, 3, 13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'Ab4', degree: '♭9' },
        { note: 'B4',  degree: '3'  },
        { note: 'E5',  degree: '13' },
      ],
    },
    CM7: {
      symbol: 'CM7',
      roman: 'C: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4', degree: '3'  },
        { note: 'G4', degree: '5'  },
        { note: 'B4', degree: 'M7' },
        { note: 'D5', degree: '9'  },
      ],
    },
    Cm7: {
      symbol: 'Cm7',
      roman: 'E♭: vi7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Bb7: {
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
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: 'E♭: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Am7b5: {
      symbol: 'Am7♭5',
      roman: 'G: ii7♭5',
      degreesLabel: '♭7, ♭9, ♭3, ♭5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '♭7' },
        { note: 'Bb4', degree: '♭9' },
        { note: 'C5',  degree: '♭3' },
        { note: 'Eb5', degree: '♭5' },
      ],
    },
    D7b9: {
      symbol: 'D7(♭9)',
      roman: 'G: V7♭9',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3'  },
        { note: 'B4',  degree: '13' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    GM7: {
      symbol: 'GM7',
      roman: 'G: IΔ',
      degreesLabel: 'M7, 9, 3, 5',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: 'M7' },
        { note: 'A4',  degree: '9'  },
        { note: 'B4',  degree: '3'  },
        { note: 'D5',  degree: '5'  },
      ],
    },
    Am7: {
      symbol: 'Am7',
      roman: 'G: ii7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4', degree: '♭7' },
        { note: 'B4', degree: '9'  },
        { note: 'C5', degree: '♭3' },
        { note: 'E5', degree: '5'  },
      ],
    },
    D7: {
      symbol: 'D7',
      roman: 'G: V7',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3'  },
        { note: 'B4',  degree: '13' },
        { note: 'C5',  degree: '♭7' },
        { note: 'E5',  degree: '9'  },
      ],
    },
    Fm7b5: {
      symbol: 'Fm7♭5',
      roman: 'E: ♭ii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭3' },
        { note: 'B4',  degree: '♭5' },
        { note: 'Eb5', degree: '♭7' },
        { note: 'Gb5', degree: '♭9' },
      ],
    },
    B7b9: {
      symbol: 'B7(♭9)',
      roman: 'E: V7♭9',
      degreesLabel: '♭7, ♭9, 3, 13',
      lh: [{ note: 'B2', degree: 'R' }],
      rh: [
        { note: 'A4',  degree: '♭7' },
        { note: 'C5',  degree: '♭9' },
        { note: 'D#5', degree: '3'  },
        { note: 'G#5', degree: '13' },
      ],
    },
    EM7: {
      symbol: 'EM7',
      roman: 'E: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G#4', degree: '3'  },
        { note: 'B4',  degree: '5'  },
        { note: 'D#5', degree: 'M7' },
        { note: 'F#5', degree: '9'  },
      ],
    },
    C7s5: {
      symbol: 'C7(♯5)',
      roman: 'A♭: V7♯5/vi',
      degreesLabel: '3, ♯5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'G#4', degree: '♯5' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Csm7: {
      symbol: 'C♯m7',
      roman: 'A♭: ivm7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C#2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '♭3' },
        { note: 'G#4', degree: '5'  },
        { note: 'B4',  degree: '♭7' },
        { note: 'D#5', degree: '9'  },
      ],
    },
    Bo7: {
      symbol: 'B°7',
      roman: 'A♭: ♯iio7',
      degreesLabel: '♭3, ♭5, bb7, R',
      lh: [{ note: 'B2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '♭3'  },
        { note: 'F4',  degree: '♭5'  },
        { note: 'Ab4', degree: 'bb7' },
        { note: 'B4',  degree: 'R'   },
      ],
    },
    Gm7b5: {
      symbol: 'Gm7♭5',
      roman: 'A♭: vii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'Bb4', degree: '♭3' },
        { note: 'Db5', degree: '♭5' },
        { note: 'F5',  degree: '♭7' },
        { note: 'Ab5', degree: '♭9' },
      ],
    },
    C7b9: {
      symbol: 'C7(♭9)',
      roman: 'A♭: V7♭9/vi',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'Db5', degree: '♭9' },
      ],
    },
  },
  bars: [
    // A (mm. 1-8): A♭ major area, ending in C major via minor ii-V/iii
    { number: 1,  chords: [{ key: 'Fm7',  beats: 4, walkingBass: WB_Fm7,  rhythm: RHYTHM_A }] },
    { number: 2,  chords: [{ key: 'Bbm7', beats: 4, walkingBass: WB_Bbm7, rhythm: RHYTHM_A }] },
    { number: 3,  chords: [{ key: 'Eb7',  beats: 4, walkingBass: WB_Eb7,  rhythm: RHYTHM_A }] },
    { number: 4,  chords: [{ key: 'AbM7', beats: 4, walkingBass: WB_AbM7, rhythm: RHYTHM_A }] },
    { number: 5,  chords: [{ key: 'DbM7', beats: 4, walkingBass: WB_DbM7, rhythm: RHYTHM_A }] },
    { number: 6,  chords: [
      { key: 'Dm7b5', beats: 2, walkingBass: WB_Dm7b5_HALF, rhythm: RHYTHM_B_HALF1 },
      { key: 'G7b9',  beats: 2, walkingBass: WB_G7b9_HALF,  rhythm: RHYTHM_B_HALF2 },
    ] },
    { number: 7,  chords: [{ key: 'CM7', beats: 4, walkingBass: WB_CM7,      rhythm: RHYTHM_A }] },
    { number: 8,  chords: [{ key: 'CM7', beats: 4, walkingBass: WB_CM7_BAR8, rhythm: RHYTHM_A }] },
    // A' (mm. 9-16): E♭ major area (P4 down from A), ending in G major
    { number: 9,  chords: [{ key: 'Cm7',  beats: 4, walkingBass: WB_Cm7,  rhythm: RHYTHM_A }] },
    { number: 10, chords: [{ key: 'Fm7',  beats: 4, walkingBass: WB_Fm7,  rhythm: RHYTHM_A }] },
    { number: 11, chords: [{ key: 'Bb7',  beats: 4, walkingBass: WB_Bb7,  rhythm: RHYTHM_A }] },
    { number: 12, chords: [{ key: 'EbM7', beats: 4, walkingBass: WB_EbM7, rhythm: RHYTHM_A }] },
    { number: 13, chords: [{ key: 'AbM7', beats: 4, walkingBass: WB_AbM7, rhythm: RHYTHM_A }] },
    { number: 14, chords: [
      { key: 'Am7b5', beats: 2, walkingBass: WB_Am7b5_HALF, rhythm: RHYTHM_B_HALF1 },
      { key: 'D7b9',  beats: 2, walkingBass: WB_D7b9_HALF,  rhythm: RHYTHM_B_HALF2 },
    ] },
    { number: 15, chords: [{ key: 'GM7', beats: 4, walkingBass: WB_GM7, rhythm: RHYTHM_A }] },
    { number: 16, chords: [{ key: 'GM7', beats: 4, walkingBass: WB_GM7, rhythm: RHYTHM_A }] },
    // B (mm. 17-24): G major → E major (minor ii-V to E), turn-back via C7♯5
    { number: 17, chords: [{ key: 'Am7',   beats: 4, walkingBass: WB_Am7,   rhythm: RHYTHM_A }] },
    { number: 18, chords: [{ key: 'D7',    beats: 4, walkingBass: WB_D7,    rhythm: RHYTHM_A }] },
    { number: 19, chords: [{ key: 'GM7',   beats: 4, walkingBass: WB_GM7,   rhythm: RHYTHM_A }] },
    { number: 20, chords: [{ key: 'GM7',   beats: 4, walkingBass: WB_GM7,   rhythm: RHYTHM_A }] },
    { number: 21, chords: [{ key: 'Fm7b5', beats: 4, walkingBass: WB_Fm7b5, rhythm: RHYTHM_A }] },
    { number: 22, chords: [{ key: 'B7b9',  beats: 4, walkingBass: WB_B7b9,  rhythm: RHYTHM_A }] },
    { number: 23, chords: [{ key: 'EM7',   beats: 4, walkingBass: WB_EM7,   rhythm: RHYTHM_A }] },
    { number: 24, chords: [{ key: 'C7s5',  beats: 4, walkingBass: WB_C7s5,  rhythm: RHYTHM_A }] },
    // A'' (mm. 25-36): A♭ return + chromatic descent C♯m7 → Cm7 → Bo7 → B♭m7
    { number: 25, chords: [{ key: 'Fm7',  beats: 4, walkingBass: WB_Fm7,  rhythm: RHYTHM_A }] },
    { number: 26, chords: [{ key: 'Bbm7', beats: 4, walkingBass: WB_Bbm7, rhythm: RHYTHM_A }] },
    { number: 27, chords: [{ key: 'Eb7',  beats: 4, walkingBass: WB_Eb7,  rhythm: RHYTHM_A }] },
    { number: 28, chords: [{ key: 'AbM7', beats: 4, walkingBass: WB_AbM7, rhythm: RHYTHM_A }] },
    { number: 29, chords: [{ key: 'DbM7', beats: 4, walkingBass: WB_DbM7, rhythm: RHYTHM_A }] },
    { number: 30, chords: [{ key: 'Csm7', beats: 4, walkingBass: WB_Csm7, rhythm: RHYTHM_A }] },
    { number: 31, chords: [{ key: 'Cm7',  beats: 4, walkingBass: WB_Cm7,  rhythm: RHYTHM_A }] },
    { number: 32, chords: [{ key: 'Bo7',  beats: 4, walkingBass: WB_Bo7,  rhythm: RHYTHM_A }] },
    { number: 33, chords: [{ key: 'Bbm7', beats: 4, walkingBass: WB_Bbm7, rhythm: RHYTHM_A }] },
    { number: 34, chords: [{ key: 'Eb7',  beats: 4, walkingBass: WB_Eb7,  rhythm: RHYTHM_A }] },
    { number: 35, chords: [{ key: 'AbM7', beats: 4, walkingBass: WB_AbM7, rhythm: RHYTHM_A }] },
    { number: 36, chords: [
      { key: 'Gm7b5', beats: 2, walkingBass: WB_Gm7b5_HALF, rhythm: RHYTHM_B_HALF1 },
      { key: 'C7b9',  beats: 2, walkingBass: WB_C7b9_HALF,  rhythm: RHYTHM_B_HALF2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A',   label: 'A',   barRange: [1,  8]  },
    { name: "A'",  label: "A'",  barRange: [9,  16] },
    { name: 'B',   label: 'B',   barRange: [17, 24] },
    { name: "A''", label: "A''", barRange: [25, 36] },
  ],
};
