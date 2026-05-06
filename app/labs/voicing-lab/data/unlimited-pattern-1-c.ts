import type { BarsGridProgression } from './types';
import {
  V_unlimitedC_I,
  V_unlimitedC_iii,
  V_unlimitedC_IV,
} from './unlimited-voicings-c';

// UNLIMITED Pattern 1 — Drop 2 & 3 cycle, key of C: I → iii → IV.
// First of 4 PrettyPiano "UNLIMITED Chord Patterns" gospel/R&B
// vocabulary patterns. 4 bars: I (Cmaj7) → iii (Em7) → IV (Fmaj7,
// held over bar 4).
//
// Pedagogical centerpiece: the I → iii motion — Cmaj7 RH (G-D-E) and
// Em7 RH (C-D-G) share two notes (D, G) and shift one by step (E→C);
// the iii → IV move slides the bass up by a half-step (E3 → F3) while
// the upper structure rebuilds around the new root. Classic gospel
// "common-tone shimmering" between diatonic chords.
//
// Phase Drop2&3 PR 1 scope: C key only. PR 2 will mirror this across
// all 12 keys via the unlimited-voicings-{key}.ts pattern.

export const unlimitedPattern1C: BarsGridProgression = {
  id: 'unlimited-pattern-1-c',
  label: 'UNLIMITED Pattern 1 (I-iii-IV)',
  subtitle: 'UNLIMITED Pattern 1 — 4 bars (CM, Drop 2 & 3 Number System)',
  progressionLabel:
    'UNLIMITED Pattern 1 (I-iii-IV) — PrettyPiano Drop 2 & 3 cycle in CM',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'CM',
  voicings: {
    unlimitedC_I:   V_unlimitedC_I,
    unlimitedC_iii: V_unlimitedC_iii,
    unlimitedC_IV:  V_unlimitedC_IV,
  },
  bars: [
    { number: 1, chords: [{ key: 'unlimitedC_I',   beats: 4 }] },
    { number: 2, chords: [{ key: 'unlimitedC_iii', beats: 4 }] },
    { number: 3, chords: [{ key: 'unlimitedC_IV',  beats: 4 }] },
    { number: 4, chords: [{ key: 'unlimitedC_IV',  beats: 4 }] },
  ],
  group: 'progression',
  sections: [{ name: 'A', label: 'A (Pattern 1)', barRange: [1, 4] }],
};
