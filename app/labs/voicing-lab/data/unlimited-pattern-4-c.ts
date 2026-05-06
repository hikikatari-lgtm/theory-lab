import type { BarsGridProgression } from './types';
import {
  V_unlimitedC_I,
  V_unlimitedC_iii,
  V_unlimitedC_ii,
} from './unlimited-voicings-c';

// UNLIMITED Pattern 4 — Drop 2 & 3 cycle, key of C: I → iii → ii → I.
// Fourth PrettyPiano gospel/R&B pattern. 4 bars: I (Cmaj7) → iii
// (Em7) → ii (Dm7 with B♭) → I (Cmaj7, resolution).
//
// Pedagogical centerpieces:
//   1. The ii chord (Dm7) is voiced with B♭ in the RH (D-B♭-C-F),
//      borrowing the ♭13 from C-minor parallel-modal interchange.
//      Outside strict diatonic C major, but characteristic of
//      gospel/R&B comping over ii. (Same color logic as the iii
//      chord's ♭13 = C in the Em7 voicing.)
//   2. The "circle home" shape: I → iii → ii → I forms a closed
//      cycle that lands back on the tonic — the only one of the 4
//      UNLIMITED patterns that resolves to I, making it useful as
//      a turnaround / cadence figure.

export const unlimitedPattern4C: BarsGridProgression = {
  id: 'unlimited-pattern-4-c',
  label: 'UNLIMITED Pattern 4 (I-iii-ii-I)',
  subtitle: 'UNLIMITED Pattern 4 — 4 bars (CM, Drop 2 & 3 Number System)',
  progressionLabel:
    'UNLIMITED Pattern 4 (I-iii-ii-I) — PrettyPiano Drop 2 & 3 cycle in CM',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'CM',
  voicings: {
    unlimitedC_I:   V_unlimitedC_I,
    unlimitedC_iii: V_unlimitedC_iii,
    unlimitedC_ii:  V_unlimitedC_ii,
  },
  bars: [
    { number: 1, chords: [{ key: 'unlimitedC_I',   beats: 4 }] },
    { number: 2, chords: [{ key: 'unlimitedC_iii', beats: 4 }] },
    { number: 3, chords: [{ key: 'unlimitedC_ii',  beats: 4 }] },
    { number: 4, chords: [{ key: 'unlimitedC_I',   beats: 4 }] },
  ],
  group: 'progression',
  sections: [{ name: 'A', label: 'A (Pattern 4)', barRange: [1, 4] }],
};
