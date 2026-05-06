import type { BarsGridProgression } from './types';
import {
  V_unlimitedC_IV,
  V_unlimitedC_V,
  V_unlimitedC_vi,
} from './unlimited-voicings-c';

// UNLIMITED Pattern 2 — Drop 2 & 3 cycle, key of C: IV → V → vi.
// Second PrettyPiano gospel/R&B pattern. 4 bars: IV (Fmaj7) → V (G7
// no ♭7, "G(add9)") → vi (Am7), held over bar 4.
//
// Pedagogical centerpiece: the V chord here is voiced WITHOUT the ♭7
// (G-D-A-B = root-5-9-3) — the "gospel V" sound where the dominant
// is treated as a triad-with-extension rather than a 7th chord, often
// resolving up a step to vi instead of down a fifth to I. The
// IV → V → vi motion is the harmonic spine of countless gospel /
// R&B / pop songs.

export const unlimitedPattern2C: BarsGridProgression = {
  id: 'unlimited-pattern-2-c',
  label: 'UNLIMITED Pattern 2 (IV-V-vi)',
  subtitle: 'UNLIMITED Pattern 2 — 4 bars (CM, Drop 2 & 3 Number System)',
  progressionLabel:
    'UNLIMITED Pattern 2 (IV-V-vi) — PrettyPiano Drop 2 & 3 cycle in CM',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'CM',
  voicings: {
    unlimitedC_IV: V_unlimitedC_IV,
    unlimitedC_V:  V_unlimitedC_V,
    unlimitedC_vi: V_unlimitedC_vi,
  },
  bars: [
    { number: 1, chords: [{ key: 'unlimitedC_IV', beats: 4 }] },
    { number: 2, chords: [{ key: 'unlimitedC_V',  beats: 4 }] },
    { number: 3, chords: [{ key: 'unlimitedC_vi', beats: 4 }] },
    { number: 4, chords: [{ key: 'unlimitedC_vi', beats: 4 }] },
  ],
  group: 'progression',
  sections: [{ name: 'A', label: 'A (Pattern 2)', barRange: [1, 4] }],
};
