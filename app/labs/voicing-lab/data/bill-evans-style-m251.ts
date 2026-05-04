import type { BarsGridProgression, Voicing } from './types';

// Bill Evans Style Minor 251 Voicing — Am 8-bar pattern (4-bar
// pattern × 2 repeats) demonstrating the "m7♭5 → V7♭5♯9 via D pitch
// class mutation" trick. Distinct from existing Minor 251 / Minor 251
// Altered: instead of substituting V7 with an altered dominant, we
// mutate the IIm7♭5 *itself* into a V7-flavor by raising its ♭3 to a
// natural 3 in the LH, then sliding the upper structure down a
// half-step into a D♭ major triad over B bass.
//
// The "X字型" voice leading: the D pitch class shared by both hands
// in bar 1 splits in bar 2 — RH's D moves DOWN to D♭ (forming the D♭
// major upper structure), LH's D moves UP to D# (the major 3rd of
// B7, locking in the V chord identity). Two D's, opposite half-step
// motions, opposite hands.
//
// Pedagogical centerpiece: same iim7♭5 → V7 → im destination as the
// existing Minor 251 series, but reached via "chord mutation" rather
// than "chord substitution" — hence a Bill Evans signature.
//
// Phase Bill Evans PR 1 scope: Am base only. 3-view mode, 12-key
// transposition, and target-chord variations are deferred to PR 2-4.

const V_Bm7b5_billEvans: Voicing = {
  symbol: 'Bm7♭5',
  roman: 'Am: iim7♭5',
  degreesLabel: 'L.H. R + ♭3 / R.H. D minor triad (D-F-A) = ♭3, ♭5, ♭7',
  lh: [
    { note: 'B2', degree: 'R'  },
    { note: 'D3', degree: '♭3' },
  ],
  rh: [
    { note: 'D4', degree: '♭3 (D triad R)' },
    { note: 'F4', degree: '♭5 (D triad 3)' },
    { note: 'A4', degree: '♭7 (D triad 5)' },
  ],
};

// B7♭5♯9 (= D♭/B upper structure). The mutation: LH D → D# (♭3 → 3,
// minor → major dominant flavor), RH D → D♭ (the upper triad slides
// down a half-step from D minor to D♭ major). The B bass and the F
// (♭5) common tone hold across the bar boundary; only the D pitch
// class moves, in opposite directions in each hand.
const V_DbOverB: Voicing = {
  symbol: 'B7♭5♯9',
  roman: 'Am: V7♭5♯9 (D♭/B mutation)',
  degreesLabel: 'L.H. R + 3 / R.H. D♭ major triad (D♭-F-A♭) = ♯9, ♭5, ♭7',
  lh: [
    { note: 'B2',  degree: 'R'                   },
    { note: 'D#3', degree: '3 (mutated ♭3 → 3)'  },
  ],
  rh: [
    { note: 'Db4', degree: '♯9 (D♭ triad R)' },
    { note: 'F4',  degree: '♭5 (D♭ triad 3)' },
    { note: 'Ab4', degree: '♭7 (D♭ triad 5)' },
  ],
};

// Am6 — cordal target voicing. RH stacks the 6 (F#) at the bottom for
// the "Am6 with the 6 in the soprano-2" sound, then root-doubled,
// ♭3, 5. This is the resolution chord the m7♭5 → V7 mutation lands on.
const V_Am6_cordal: Voicing = {
  symbol: 'Am6',
  roman: 'Am: im6',
  degreesLabel: '6, R, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '6'  },
    { note: 'A4',  degree: 'R'  },
    { note: 'C5',  degree: '♭3' },
    { note: 'E5',  degree: '5'  },
  ],
};

export const billEvansStyleM251: BarsGridProgression = {
  id: 'bill-evans-style-m251',
  label: 'Bill Evans Style Minor 251 Voicing',
  subtitle: 'Bill Evans Style Minor 251 — 8 bars (Am, m7♭5 → V7 mutation)',
  progressionLabel: 'Bill Evans Style Minor 251 — m7♭5 を V/V として mutate (Am, 4-bar × 2)',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'Am',
  voicings: {
    Bm7b5_billEvans: V_Bm7b5_billEvans,
    DbOverB:         V_DbOverB,
    Am6_cordal:      V_Am6_cordal,
  },
  bars: [
    // A: Pattern (1-4) — iim7♭5 → V7♭5♯9 (mutation) → im6 → im6 (hold)
    { number: 1, chords: [{ key: 'Bm7b5_billEvans', beats: 4 }] },
    { number: 2, chords: [{ key: 'DbOverB',         beats: 4 }] },
    { number: 3, chords: [{ key: 'Am6_cordal',      beats: 4 }] },
    { number: 4, chords: [{ key: 'Am6_cordal',      beats: 4 }] },
    // B: Repeat (5-8) — same pattern, second pass
    { number: 5, chords: [{ key: 'Bm7b5_billEvans', beats: 4 }] },
    { number: 6, chords: [{ key: 'DbOverB',         beats: 4 }] },
    { number: 7, chords: [{ key: 'Am6_cordal',      beats: 4 }] },
    { number: 8, chords: [{ key: 'Am6_cordal',      beats: 4 }] },
  ],
  group: 'progression',
  sections: [
    { name: 'A', label: 'A (Pattern)', barRange: [1, 4] },
    { name: 'B', label: 'B (Repeat)',  barRange: [5, 8] },
  ],
  // 3-view practice mode: each anchor highlights one note per chord so
  // the student can lock the ear onto a single voice and hear how it
  // moves across the iim7♭5 → V7♭5♯9 → im6 cadence.
  //   - top-note    A4 → A♭4 → E5  (RH soprano voice — how the top sings)
  //   - bottom-line D4 → D♭4 → F#4 (RH bottom — the half-step Bill Evans
  //                                  voice leading; Bar 1→2 is the trick)
  //   - root        B2 → B2 → A2   (LH bass — the V → I bass motion;
  //                                  B held common across the mutation)
  threeAnchorView: {
    enabled: true,
    anchors: {
      topNote: {
        color: '#FFD700',
        label: 'Top-note Anchor',
        description: 'RHのトップ音を固定視点として、コード遷移を聴く',
      },
      bottomLine: {
        color: '#4ADE80',
        label: 'Bottom-line Anchor',
        description: 'RHの下声半音下降をフォーカスして voice leading を聴く',
      },
      root: {
        color: '#A855F7',
        label: 'Root Anchor',
        description: 'm7♭5 のルートから機能感（ii→V→I）を再認識する',
      },
    },
  },
};
