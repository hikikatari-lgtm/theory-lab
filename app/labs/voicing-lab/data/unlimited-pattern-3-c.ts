import type { BarsGridProgression } from './types';
import {
  V_unlimitedC_vi,
  V_unlimitedC_I,
  V_unlimitedC_vii,
} from './unlimited-voicings-c';

// UNLIMITED Pattern 3 — Drop 2 & 3 cycle, key of C: vi → I → vii°.
// Third PrettyPiano gospel/R&B pattern. 4 bars: vi (Am7) → I (Cmaj7)
// → vii° (Bm7♭5, no ♭5 in the voicing), held over bar 4.
//
// Pedagogical centerpieces:
//   1. The vii° chord is voiced WITHOUT the ♭5 (B-G-A-D = R + ♭13,
//      ♭7, ♭3) — gospel-style "B half-dim minus the F". The G in the
//      RH is the ♭13 from B, giving the chord a darker color than
//      a textbook half-diminished.
//   2. Descending register: vi (top = C5) → I (top = E4) → vii°
//      (top = D4). LH descends in parallel: A3 → C3 → B2. The B2
//      in vii° is an octave below the rest of the LH register —
//      typical Drop 2 & 3 "gravity-fall" effect.

export const unlimitedPattern3C: BarsGridProgression = {
  id: 'unlimited-pattern-3-c',
  label: 'UNLIMITED Pattern 3 (vi-I-vii°)',
  subtitle: 'UNLIMITED Pattern 3 — 4 bars (CM, Drop 2 & 3 Number System)',
  progressionLabel:
    'UNLIMITED Pattern 3 (vi-I-vii°) — PrettyPiano Drop 2 & 3 cycle in CM',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'CM',
  voicings: {
    unlimitedC_vi:  V_unlimitedC_vi,
    unlimitedC_I:   V_unlimitedC_I,
    unlimitedC_vii: V_unlimitedC_vii,
  },
  bars: [
    { number: 1, chords: [{ key: 'unlimitedC_vi',  beats: 4 }] },
    { number: 2, chords: [{ key: 'unlimitedC_I',   beats: 4 }] },
    { number: 3, chords: [{ key: 'unlimitedC_vii', beats: 4 }] },
    { number: 4, chords: [{ key: 'unlimitedC_vii', beats: 4 }] },
  ],
  group: 'progression',
  sections: [{ name: 'A', label: 'A (Pattern 3)', barRange: [1, 4] }],
};
