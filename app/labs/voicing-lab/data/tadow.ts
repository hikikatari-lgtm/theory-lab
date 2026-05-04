import type { BarsGridProgression, Voicing } from './types';

// Tadow (FKJ × Masego, 2017) — C major Neo Soul. 8-bar form built
// entirely from a 2-chord vamp (Am7 → Dm7), repeated 4 times. The
// piece holds for 6 minutes on these two chords by relying entirely
// on VOICING VARIATION as the source of color.
//
// Phase R&B-A PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate Phase R&B-B PR.
//
// Pedagogical centerpiece (this is THE reason this song is in the lab):
// Each of the 4 Am7 bars uses a DIFFERENT voicing approach — close /
// drop-2 / upper-structure / sus add9 — and the same for the 4 Dm7
// bars. The chord SYMBOLS stay "Am7" / "Dm7" across the 8 bars, but
// the keyboard renders 8 visibly distinct hand shapes. Click any bar
// and see how "the same chord" can have 4 different shapes that all
// say Am7 (or Dm7), each with its own character.
//
// The 4 voicing concepts on display:
//   1. CLOSE        — chord tones stacked in 3rds within an octave
//                     (♭3-5-♭7-9 ascending). Standard textbook m7.
//   2. DROP 2       — close voicing with the 2nd voice from the top
//                     dropped one octave, opening up the spacing.
//                     Standard jazz-piano comping voicing.
//   3. UPPER STRUCTURE — major triad sitting on top of the bass note
//                        (G major over A bass = Am9/11 sound; C major
//                        over D bass = Dm9/11 sound). The triad on
//                        top is what makes Neo Soul "shimmer".
//   4. SUS ADD 9    — sus4 + 9 instead of the chord 3rd / 5th. The
//                     m7 quality is implied rather than stated; the
//                     openness is the point.

const V_Am7_close: Voicing = {
  symbol: 'Am7',
  roman: 'CM: vim7',
  degreesLabel: '♭3, 5, ♭7, 9 (CLOSE — chord tones in 3rds)',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5'  },
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
  ],
};

const V_Dm7_close: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: iim7',
  degreesLabel: '♭3, 5, ♭7, 9 (CLOSE — chord tones in 3rds)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

// DROP 2: take close (C-E-G-B from low to high) and drop the
// 2nd-from-top voice (G) one octave down to G3. Result spans a
// wider register and sounds "open".
const V_Am7_drop2: Voicing = {
  symbol: 'Am7',
  roman: 'CM: vim7',
  degreesLabel: '♭7, ♭3, 5, 9 (DROP 2 — 2nd voice from top dropped 8va)',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5'  },
    { note: 'B4', degree: '9'  },
  ],
};

// DROP 2 of Dm7: close F-A-C-E → drop C5 down to C4.
const V_Dm7_drop2: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: iim7',
  degreesLabel: '♭7, ♭3, 5, 9 (DROP 2 — 2nd voice from top dropped 8va)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'E5', degree: '9'  },
  ],
};

// UPPER STRUCTURE — G major triad over A bass. The triad's R-3-5
// (G-B-D) function as the ♭7-9-11 of A. RH is just 3 notes (a pure
// triad) — the triad-on-bass purity is the whole point of the sound.
const V_Am7_us: Voicing = {
  symbol: 'Am7',
  roman: 'CM: vim7',
  degreesLabel: '♭7, 9, 11 (UPPER STRUCTURE — G major triad over A)',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: '♭7 (G triad R)' },
    { note: 'B4', degree: '9 (G triad 3)'  },
    { note: 'D5', degree: '11 (G triad 5)' },
  ],
};

// UPPER STRUCTURE — C major triad over D bass. C-E-G function as
// ♭7-9-11 of D.
const V_Dm7_us: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: iim7',
  degreesLabel: '♭7, 9, 11 (UPPER STRUCTURE — C major triad over D)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'C5', degree: '♭7 (C triad R)' },
    { note: 'E5', degree: '9 (C triad 3)'  },
    { note: 'G5', degree: '11 (C triad 5)' },
  ],
};

// SUS ADD 9 — replace the chord 3rd with sus4 (D), keep the ♭7 and
// add 9. The m7 quality is implied by what's missing (no stated 3rd)
// and by the bass + ♭7 framework.
const V_Am7_sus9: Voicing = {
  symbol: 'Am7',
  roman: 'CM: vim7',
  degreesLabel: 'sus4, 5, ♭7, 9 (SUS ADD 9 — 3rd omitted)',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'sus4' },
    { note: 'E4', degree: '5'    },
    { note: 'G4', degree: '♭7'   },
    { note: 'B4', degree: '9'    },
  ],
};

// SUS ADD 9 of Dm7 — sus4 = G, 5 = A, ♭7 = C, 9 = E.
const V_Dm7_sus9: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: iim7',
  degreesLabel: 'sus4, 5, ♭7, 9 (SUS ADD 9 — 3rd omitted)',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: 'sus4' },
    { note: 'A4', degree: '5'    },
    { note: 'C5', degree: '♭7'   },
    { note: 'E5', degree: '9'    },
  ],
};

export const tadow: BarsGridProgression = {
  id: 'tadow',
  label: 'Tadow - FKJ × Masego',
  subtitle: 'Tadow — 8 bars (CM, 2-chord vamp, 4 voicings each)',
  progressionLabel: 'Tadow (FKJ × Masego, 2017) — 8 bars',
  displayMode: 'bars-grid',
  tempo: 122,
  key: 'CM',
  voicings: {
    Am7_close:  V_Am7_close,
    Dm7_close:  V_Dm7_close,
    Am7_drop2:  V_Am7_drop2,
    Dm7_drop2:  V_Dm7_drop2,
    Am7_us:     V_Am7_us,
    Dm7_us:     V_Dm7_us,
    Am7_sus9:   V_Am7_sus9,
    Dm7_sus9:   V_Dm7_sus9,
  },
  bars: [
    // Each Am7 bar uses a different voicing concept; same for Dm7.
    // Click bar by bar to compare — the same chord symbol, four
    // different keyboard shapes.
    { number: 1, chords: [{ key: 'Am7_close', beats: 4 }] },
    { number: 2, chords: [{ key: 'Dm7_close', beats: 4 }] },
    { number: 3, chords: [{ key: 'Am7_drop2', beats: 4 }] },
    { number: 4, chords: [{ key: 'Dm7_drop2', beats: 4 }] },
    { number: 5, chords: [{ key: 'Am7_us',    beats: 4 }] },
    { number: 6, chords: [{ key: 'Dm7_us',    beats: 4 }] },
    { number: 7, chords: [{ key: 'Am7_sus9',  beats: 4 }] },
    { number: 8, chords: [{ key: 'Dm7_sus9',  beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (2-chord Vamp, 4 voicings)', barRange: [1, 8] },
  ],
};
