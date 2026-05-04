import type { BarsGridProgression, Voicing } from './types';

// So Beautiful (Robert Glasper, Black Radio, 2012) — F major Neo Soul
// ballad, the architectural bridge between modern jazz piano and the
// R&B production language. 16-bar form: A loop (ii-vi-iii-IV with F
// pedal) → B variation (the same chords with bass-line cliché motion).
//
// Phase R&B-A PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate Phase R&B-B PR.
//
// Voicing convention specific to this piece:
// - All voicings are Fender-Rhodes-style rootless 4-note RH at
//   octave 4-5 with the LH carrying the SLASH BASS (often F or C
//   pedal, NOT the chord root)
// - The pedal-point slash chords (Bbmaj7/F, Dm7/F, Dm7/C) deliberately
//   keep the chord-root pitch out of the LH so the bass note creates
//   a new harmonic color underneath the upper triad/m7 quality
// - 9th tensions are voiced explicitly to maintain the slow ballad
//   density at 67 BPM

const V_Gm7: Voicing = {
  symbol: 'Gm7',
  roman: 'FM: iim7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '♭7' },
    { note: 'A4',  degree: '9'  },
    { note: 'Bb4', degree: '♭3' },
    { note: 'D5',  degree: '5'  },
  ],
};

const V_Dm7: Voicing = {
  symbol: 'Dm7',
  roman: 'FM: vim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

const V_Am7: Voicing = {
  symbol: 'Am7',
  roman: 'FM: iiim7',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
    { note: 'C5', degree: '♭3' },
    { note: 'E5', degree: '5'  },
  ],
};

const V_Bbmaj7: Voicing = {
  symbol: 'B♭maj7',
  roman: 'FM: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '3'  },
    { note: 'F4', degree: '5'  },
    { note: 'A4', degree: 'M7' },
    { note: 'C5', degree: '9'  },
  ],
};

// Bbmaj7 over F pedal — F is the 5th of Bb, so harmonically still
// Bbmaj7 but the bass establishes F as the tonal center pivot.
const V_Bbmaj7_F: Voicing = {
  symbol: 'B♭maj7/F',
  roman: 'FM: IVmaj7/I',
  degreesLabel: 'L.H. F pedal / R.H. B♭maj7 (3, 5, M7, 9)',
  lh: [{ note: 'F2', degree: 'F (pedal)' }],
  rh: [
    { note: 'D4', degree: '3'  },
    { note: 'F4', degree: '5'  },
    { note: 'A4', degree: 'M7' },
    { note: 'C5', degree: '9'  },
  ],
};

// Dm7 over F pedal — F pedal under Dm7 reinforces F as tonic pivot;
// the upper Dm7 creates an Fmaj9 sonority overall (F-A-C-E + add D).
const V_Dm7_F: Voicing = {
  symbol: 'Dm7/F',
  roman: 'FM: vim7/I',
  degreesLabel: 'L.H. F pedal / R.H. Dm7 (♭3, 5, ♭7, 9)',
  lh: [{ note: 'F2', degree: 'F (pedal)' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

// Dm7 over C bass — bass cliché motion (F → C in bar 13→14).
// Functions as Cmaj9 sonority with D as the 9.
const V_Dm7_C: Voicing = {
  symbol: 'Dm7/C',
  roman: 'FM: vim7/V (bass cliché)',
  degreesLabel: 'L.H. C bass / R.H. Dm7 (♭3, 5, ♭7, 9)',
  lh: [{ note: 'C2', degree: 'C (bass cliché)' }],
  rh: [
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5'  },
    { note: 'C5', degree: '♭7' },
    { note: 'E5', degree: '9'  },
  ],
};

export const soBeautifulGlasper: BarsGridProgression = {
  id: 'so-beautiful-glasper',
  label: 'So Beautiful - Robert Glasper',
  subtitle: 'So Beautiful — 16 bars (FM, ii-vi-iii-IV loop)',
  progressionLabel: 'So Beautiful (Robert Glasper, Black Radio, 2012) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 67,
  key: 'FM',
  voicings: {
    Gm7:       V_Gm7,
    Dm7:       V_Dm7,
    Am7:       V_Am7,
    Bbmaj7:    V_Bbmaj7,
    Bbmaj7_F:  V_Bbmaj7_F,
    Dm7_F:     V_Dm7_F,
    Dm7_C:     V_Dm7_C,
  },
  bars: [
    // A: Main Loop (1-8) — F pedal anchors the cycle
    { number: 1, chords: [{ key: 'Gm7',      beats: 4 }] },
    { number: 2, chords: [{ key: 'Dm7',      beats: 4 }] },
    { number: 3, chords: [{ key: 'Am7',      beats: 4 }] },
    { number: 4, chords: [{ key: 'Bbmaj7_F', beats: 4 }] },
    { number: 5, chords: [{ key: 'Gm7',      beats: 4 }] },
    { number: 6, chords: [{ key: 'Dm7_F',    beats: 4 }] },
    { number: 7, chords: [{ key: 'Am7',      beats: 4 }] },
    { number: 8, chords: [{ key: 'Dm7_F',    beats: 4 }] },
    // B: Variations (9-16) — bass starts to walk (cliché in bar 14)
    { number: 9,  chords: [{ key: 'Gm7',      beats: 4 }] },
    { number: 10, chords: [{ key: 'Dm7_F',    beats: 4 }] },
    { number: 11, chords: [{ key: 'Am7',      beats: 4 }] },
    { number: 12, chords: [
      { key: 'Bbmaj7', beats: 2 },
      { key: 'Am7',    beats: 2 },
    ] },
    { number: 13, chords: [{ key: 'Gm7',      beats: 4 }] },
    { number: 14, chords: [{ key: 'Dm7_C',    beats: 4 }] },
    { number: 15, chords: [{ key: 'Am7',      beats: 4 }] },
    { number: 16, chords: [{ key: 'Bbmaj7',   beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Main Loop)',  barRange: [1, 8]  },
    { name: 'B', label: 'B (Variations)', barRange: [9, 16] },
  ],
};
