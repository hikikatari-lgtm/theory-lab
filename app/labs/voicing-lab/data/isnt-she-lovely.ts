import type { BarsGridProgression, Voicing } from './types';

// Isn't She Lovely (Stevie Wonder, Songs in the Key of Life, 1976) —
// E major. 16-bar Verse, 8-bar pattern repeated with a structural
// detour at bars 9-12 (Amaj7 → G♯7 → C♯m7 → F♯7). Stevie's
// "secondary dominant + slash chord" textbook.
//
// Two pedagogical centerpieces:
//   1. F♯7 = II7 (V/V) — instead of the diatonic F♯m7, Stevie
//      raises the 3rd to make a dominant chord that pulls toward V.
//   2. A/B = IV/V (slash) — same upper-structure family as the
//      Quincy Jones chord (B/C♯ in Tom Misch's "It Runs Through Me").
//      LH plays B as bass, RH plays a pure A major triad above.
//      Functionally equivalent to B7sus13 / B11.
//
// G♯7 in bar 10 is V/vi (secondary dominant heading back to C♯m7).
// The 3rd of G♯7 is B♯ (enharmonic C); written here as `C5` for
// ASCII clarity since the audio engine doesn't recognize B# notation.
//
// Phase Stevie PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate enrichment PR.

const V_Csm7: Voicing = {
  symbol: 'C♯m7',
  roman: 'EM: vim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'E4',  degree: '♭3' },
    { note: 'G#4', degree: '5'  },
    { note: 'B4',  degree: '♭7' },
    { note: 'D#5', degree: '9'  },
  ],
};

const V_Fs7: Voicing = {
  symbol: 'F♯7',
  roman: 'EM: II7 (V/V — secondary dominant)',
  degreesLabel: '3, 5, ♭7, 9',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A#4', degree: '3'  },
    { note: 'C#5', degree: '5'  },
    { note: 'E5',  degree: '♭7' },
    { note: 'G#5', degree: '9'  },
  ],
};

// A/B — upper structure: A major triad over B bass. Same shape family
// as the Quincy Jones chord. LH = B2 (bass), RH = pure A major triad
// (A-C♯-E) in close position so it visibly "floats" above the bass.
const V_AoverB: Voicing = {
  symbol: 'A/B',
  roman: 'EM: IV/V (slash — upper structure)',
  degreesLabel: 'L.H. B bass / R.H. A major triad (A-C♯-E)',
  lh: [{ note: 'B2', degree: 'B bass' }],
  rh: [
    { note: 'A4',  degree: 'A (triad R)'  },
    { note: 'C#5', degree: 'C♯ (triad 3)' },
    { note: 'E5',  degree: 'E (triad 5)'  },
  ],
};

const V_Emaj7: Voicing = {
  symbol: 'Emaj7',
  roman: 'EM: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'G#4', degree: '3'  },
    { note: 'B4',  degree: '5'  },
    { note: 'D#5', degree: 'M7' },
    { note: 'F#5', degree: '9'  },
  ],
};

const V_Amaj7: Voicing = {
  symbol: 'Amaj7',
  roman: 'EM: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C#4', degree: '3'  },
    { note: 'E4',  degree: '5'  },
    { note: 'G#4', degree: 'M7' },
    { note: 'B4',  degree: '9'  },
  ],
};

const V_Gs7: Voicing = {
  symbol: 'G♯7',
  roman: 'EM: III7 (V/vi — secondary dominant)',
  degreesLabel: '3, 5, ♭7, 9',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'C5',  degree: '3 (B♯ enharmonic)' },
    { note: 'D#5', degree: '5'                 },
    { note: 'F#5', degree: '♭7'                },
    { note: 'A#5', degree: '9'                 },
  ],
};

export const isntSheLovely: BarsGridProgression = {
  id: 'isnt-she-lovely',
  label: "Isn't She Lovely - Stevie Wonder",
  subtitle: "Isn't She Lovely — 16 bars (EM, secondary dominants + A/B slash)",
  progressionLabel: "Isn't She Lovely (Stevie Wonder, Songs in the Key of Life, 1976) — 16 bars",
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'EM',
  voicings: {
    Csm7:   V_Csm7,
    Fs7:    V_Fs7,
    AoverB: V_AoverB,
    Emaj7:  V_Emaj7,
    Amaj7:  V_Amaj7,
    Gs7:    V_Gs7,
  },
  bars: [
    // A1 (1-8): vim7 → II7 (V/V) → IV/V (slash) → Imaj7, repeated
    { number: 1, chords: [{ key: 'Csm7',   beats: 4 }] },
    { number: 2, chords: [{ key: 'Fs7',    beats: 4 }] },
    { number: 3, chords: [{ key: 'AoverB', beats: 4 }] },
    { number: 4, chords: [{ key: 'Emaj7',  beats: 4 }] },
    { number: 5, chords: [{ key: 'Csm7',   beats: 4 }] },
    { number: 6, chords: [{ key: 'Fs7',    beats: 4 }] },
    { number: 7, chords: [{ key: 'AoverB', beats: 4 }] },
    { number: 8, chords: [{ key: 'Emaj7',  beats: 4 }] },
    // A2 (9-16): IVmaj7 → III7 (V/vi) → vim7 → II7 (V/V) →
    //           IV/V (slash) ×2 → Imaj7 ×2
    { number: 9,  chords: [{ key: 'Amaj7',  beats: 4 }] },
    { number: 10, chords: [{ key: 'Gs7',    beats: 4 }] },
    { number: 11, chords: [{ key: 'Csm7',   beats: 4 }] },
    { number: 12, chords: [{ key: 'Fs7',    beats: 4 }] },
    { number: 13, chords: [{ key: 'AoverB', beats: 4 }] },
    { number: 14, chords: [{ key: 'AoverB', beats: 4 }] },
    { number: 15, chords: [{ key: 'Emaj7',  beats: 4 }] },
    { number: 16, chords: [{ key: 'Emaj7',  beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A1', label: 'A1 (Verse part 1)', barRange: [1, 8]  },
    { name: 'A2', label: 'A2 (Verse part 2)', barRange: [9, 16] },
  ],
};
