import type { Voicing } from './types';

// UNLIMITED Chord Patterns — Drop 2 & 3 Number System voicings, Key of C.
// Source: PrettyPiano YouTube lesson "UNLIMITED Chord Patterns"
//   https://youtu.be/g5_jAsBaBuk
//
// Shared per-degree voicings used by the 4 UNLIMITED Pattern progressions
// (Pattern 1: I-iii-IV, Pattern 2: IV-V-vi, Pattern 3: vi-I-vii°,
// Pattern 4: I-iii-ii-I). Each pattern imports only the voicings it
// needs; the dict keys (unlimitedC_I, unlimitedC_iii, etc.) are stable
// so PR 2's 12-key expansion can mirror this naming convention with
// `unlimitedDb_*`, `unlimitedD_*`, ... without touching the per-pattern
// files.
//
// Voicing convention (from PDF, all 4-note Drop 2 & 3):
//   LH: bass note (1 voice, octave 2-3)
//   RH: 3 upper voices (octaves 3-5)
// The PDF label "X / Y Z / W" reads LH=X, RH=Y,Z,W.
//
// Note: these are gospel/R&B Number System voicings, not jazz shell
// voicings — they carry extensions and chromatic upper structures
// (e.g. Dm7 with B♭, Bm7♭5 with G as ♭13) that wouldn't appear in
// classic 251 voicings. Trust the source material; the harmonic flavor
// is the point.

// I — Cmaj7. PDF label: "C / G / D E"
export const V_unlimitedC_I: Voicing = {
  symbol: 'Cmaj7',
  roman: 'CM: Imaj7',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 & 3)',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '5' },
    { note: 'D4', degree: '9' },
    { note: 'E4', degree: '3' },
  ],
};

// ii — Dm7. PDF label: "D / Bb C / F"
// Drop 2 & 3 with B♭ as ♭13 (borrowed from parallel minor C-minor),
// giving the chord a darker gospel color. Not a classic jazz voicing.
export const V_unlimitedC_ii: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: iim7',
  degreesLabel: 'L.H. R / R.H. ♭13, ♭7, ♭3 (Drop 2 & 3)',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'Bb3', degree: '♭13' },
    { note: 'C4',  degree: '♭7'  },
    { note: 'F4',  degree: '♭3'  },
  ],
};

// iii — Em7. PDF label: "E / C D / G"
// Drop 2 & 3 with C as ♭13 and D as ♭7. The C is the sus-flavor
// commonly used over iii in R&B comping.
export const V_unlimitedC_iii: Voicing = {
  symbol: 'Em7',
  roman: 'CM: iiim7',
  degreesLabel: 'L.H. R / R.H. ♭13, ♭7, ♭3 (Drop 2 & 3)',
  lh: [{ note: 'E3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭13' },
    { note: 'D4', degree: '♭7'  },
    { note: 'G4', degree: '♭3'  },
  ],
};

// IV — Fmaj7. PDF label: "F / C / G A"
// Drop 2 & 3 with no 3 — open quartal-flavor stack. The "Fmaj9 no 3"
// sound, classic R&B major IV color.
export const V_unlimitedC_IV: Voicing = {
  symbol: 'Fmaj7',
  roman: 'CM: IVmaj7',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 & 3)',
  lh: [{ note: 'F3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '5' },
    { note: 'G4', degree: '9' },
    { note: 'A4', degree: '3' },
  ],
};

// V — G7. PDF label: "G / D / A B"
// Drop 2 & 3 with no ♭7 — V as triad+9 instead of dominant 7th. The
// "G(add9)" gospel V flavor, often resolving up a step to vi.
export const V_unlimitedC_V: Voicing = {
  symbol: 'G7',
  roman: 'CM: V7',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 & 3)',
  lh: [{ note: 'G3', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '5' },
    { note: 'A4', degree: '9' },
    { note: 'B4', degree: '3' },
  ],
};

// vi — Am7. PDF label: "A / F G / C"
// Drop 2 & 3 with F as ♭13 (parallel-minor color again), G as ♭7,
// C as ♭3. High-register cluster, top = C5.
export const V_unlimitedC_vi: Voicing = {
  symbol: 'Am7',
  roman: 'CM: vim7',
  degreesLabel: 'L.H. R / R.H. ♭13, ♭7, ♭3 (Drop 2 & 3)',
  lh: [{ note: 'A3', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭13' },
    { note: 'G4', degree: '♭7'  },
    { note: 'C5', degree: '♭3'  },
  ],
};

// vii° — Bm7♭5. PDF label: "B / G A / D"
// Drop 2 & 3 with G as ♭13, A as ♭7, D as ♭3 — the ♭5 (F) is
// notably ABSENT from the voicing. LH lands on B2 (octave below the
// other LH notes) for the descending bass-line that closes Pattern 3.
export const V_unlimitedC_vii: Voicing = {
  symbol: 'Bm7♭5',
  roman: 'CM: viim7♭5',
  degreesLabel: 'L.H. R / R.H. ♭13, ♭7, ♭3 (Drop 2 & 3, no ♭5)',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭13' },
    { note: 'A3', degree: '♭7'  },
    { note: 'D4', degree: '♭3'  },
  ],
};
