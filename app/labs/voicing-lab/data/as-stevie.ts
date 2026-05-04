import type { BarsGridProgression, Voicing } from './types';

// As (Stevie Wonder, Songs in the Key of Life, 1976) — F♯ major.
// Stevie's pop integration of jazz vocabulary at peak fluency: every
// bar is a half-bar pivot through the diatonic family, with the
// secondary V/iim (D♯7) and the borrowed ivm (Bm7) giving the song
// its modulating shimmer. The Chorus climbs to a V7♭9 tension peak
// in bar 12 before the resolve.
//
// Three pedagogical centerpieces:
//   1. D♯7 — V/iim7 (secondary dominant heading toward G♯m7). The
//      raised 3rd (F## = G enharmonic) lifts the diatonic D♯m7
//      sonority into a true dominant chord.
//   2. Bm7 — ivm7 borrowed from F♯ minor, the "shadow" color. Same
//      parallel-minor borrowing language as Lately's Dmaj7 (♭VImaj7)
//      and Best Part's B♭maj7 (♭VImaj7).
//   3. C♯7♭9 — V7♭9 in bar 12, tension peak before the chorus
//      resolution. Voiced as the inverted ♭7-♭9-3-13 pattern shared
//      with ATTYA's B7♭9 and Body And Soul's altered V chords.
//
// Chord-tone enharmonics: F♯ major has E♯ (= F) and B♯ (= C);
// D♯7's chord tones include F## (= G); A♯m7's 5th is E♯ (= F).
// All written in ASCII-engine-safe notation.
//
// Phase Stevie PR scope: piano voicings only.

const V_Fsmaj7: Voicing = {
  symbol: 'F♯maj7',
  roman: 'F♯M: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'A#4', degree: '3'                  },
    { note: 'C#5', degree: '5'                  },
    { note: 'F5',  degree: 'M7 (E♯ enharmonic)' },
    { note: 'G#5', degree: '9'                  },
  ],
};

const V_Asm7: Voicing = {
  symbol: 'A♯m7',
  roman: 'F♯M: iiim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'A#2', degree: 'R' }],
  rh: [
    { note: 'C#4', degree: '♭3'                },
    { note: 'F4',  degree: '5 (E♯ enharmonic)' },
    { note: 'G#4', degree: '♭7'                },
    { note: 'C5',  degree: '9 (B♯ enharmonic)' },
  ],
};

const V_Dsm7: Voicing = {
  symbol: 'D♯m7',
  roman: 'F♯M: vim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'D#2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '♭3'                },
    { note: 'A#4', degree: '5'                 },
    { note: 'C#5', degree: '♭7'                },
    { note: 'F5',  degree: '9 (E♯ enharmonic)' },
  ],
};

const V_Gsm7: Voicing = {
  symbol: 'G♯m7',
  roman: 'F♯M: iim7',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'B4',  degree: '♭3' },
    { note: 'D#5', degree: '5'  },
    { note: 'F#5', degree: '♭7' },
    { note: 'A#5', degree: '9'  },
  ],
};

const V_Cs7: Voicing = {
  symbol: 'C♯7',
  roman: 'F♯M: V7',
  degreesLabel: '3, ♭7, 9, 13',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'F4',  degree: '3 (E♯ enharmonic)' },
    { note: 'B4',  degree: '♭7'                },
    { note: 'D#5', degree: '9'                 },
    { note: 'A#5', degree: '13'                },
  ],
};

const V_Cs7sus: Voicing = {
  symbol: 'C♯7sus',
  roman: 'F♯M: V7sus',
  degreesLabel: 'sus4, 5, ♭7, 9',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: 'sus4' },
    { note: 'G#4', degree: '5'    },
    { note: 'B4',  degree: '♭7'   },
    { note: 'D#5', degree: '9'    },
  ],
};

// D♯7 — secondary V/iim, leading to G♯m7. The 3rd (F##) and 9th (E♯)
// are written enharmonically as G and F respectively for ASCII safety.
const V_Ds7: Voicing = {
  symbol: 'D♯7',
  roman: 'F♯M: V/iim (secondary dominant)',
  degreesLabel: '3, 5, ♭7, 9',
  lh: [{ note: 'D#2', degree: 'R' }],
  rh: [
    { note: 'G4',  degree: '3 (F## enharmonic)' },
    { note: 'A#4', degree: '5'                  },
    { note: 'C#5', degree: '♭7'                 },
    { note: 'F5',  degree: '9 (E♯ enharmonic)'  },
  ],
};

const V_Bm7: Voicing = {
  symbol: 'Bm7',
  roman: 'F♯M: ivm7 (parallel-minor borrowing)',
  degreesLabel: '♭3, 5, ♭7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D4',  degree: '♭3' },
    { note: 'F#4', degree: '5'  },
    { note: 'A4',  degree: '♭7' },
    { note: 'C#5', degree: '9'  },
  ],
};

// C♯7♭9 — V7♭9 tension peak. ♭7-♭9-3-13 inverted (same as ATTYA's
// B7♭9 / Body And Soul's altered V).
const V_Cs7b9: Voicing = {
  symbol: 'C♯7♭9',
  roman: 'F♯M: V7♭9 (tension peak)',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'C#2', degree: 'R' }],
  rh: [
    { note: 'B4',  degree: '♭7'                },
    { note: 'D5',  degree: '♭9'                },
    { note: 'F5',  degree: '3 (E♯ enharmonic)' },
    { note: 'A#5', degree: '13'                },
  ],
};

export const asStevie: BarsGridProgression = {
  id: 'as-stevie',
  label: 'As - Stevie Wonder',
  subtitle: 'As — 16 bars (F♯M, secondary V/iim + borrowed ivm)',
  progressionLabel: 'As (Stevie Wonder, Songs in the Key of Life, 1976) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'F#M',
  voicings: {
    Fsmaj7: V_Fsmaj7,
    Asm7:   V_Asm7,
    Dsm7:   V_Dsm7,
    Gsm7:   V_Gsm7,
    Cs7:    V_Cs7,
    Cs7sus: V_Cs7sus,
    Ds7:    V_Ds7,
    Bm7:    V_Bm7,
    Cs7b9:  V_Cs7b9,
  },
  bars: [
    // A: Verse (1-8) — Imaj7 → iiim7/vim7 → iim7 → V7/V7sus →
    //                  Imaj7 → iiim7/V/iim → iim7/V7sus → Imaj7/ivm7
    { number: 1, chords: [{ key: 'Fsmaj7', beats: 4 }] },
    { number: 2, chords: [
      { key: 'Asm7', beats: 2 },
      { key: 'Dsm7', beats: 2 },
    ] },
    { number: 3, chords: [{ key: 'Gsm7', beats: 4 }] },
    { number: 4, chords: [
      { key: 'Cs7',    beats: 2 },
      { key: 'Cs7sus', beats: 2 },
    ] },
    { number: 5, chords: [{ key: 'Fsmaj7', beats: 4 }] },
    { number: 6, chords: [
      { key: 'Asm7', beats: 2 },
      { key: 'Ds7',  beats: 2 },
    ] },
    { number: 7, chords: [
      { key: 'Gsm7',   beats: 2 },
      { key: 'Cs7sus', beats: 2 },
    ] },
    { number: 8, chords: [
      { key: 'Fsmaj7', beats: 2 },
      { key: 'Bm7',    beats: 2 },
    ] },
    // B: Chorus (9-16) — same A motion, but tension peaks at V7♭9
    // in bar 12, then resolve through Imaj7 → ii-V-I turnaround
    { number: 9, chords: [{ key: 'Fsmaj7', beats: 4 }] },
    { number: 10, chords: [
      { key: 'Asm7', beats: 2 },
      { key: 'Ds7',  beats: 2 },
    ] },
    { number: 11, chords: [{ key: 'Gsm7',  beats: 4 }] },
    { number: 12, chords: [{ key: 'Cs7b9', beats: 4 }] },
    { number: 13, chords: [
      { key: 'Fsmaj7', beats: 2 },
      { key: 'Dsm7',   beats: 2 },
    ] },
    { number: 14, chords: [
      { key: 'Gsm7',   beats: 2 },
      { key: 'Cs7sus', beats: 2 },
    ] },
    { number: 15, chords: [{ key: 'Fsmaj7', beats: 4 }] },
    { number: 16, chords: [
      { key: 'Cs7sus', beats: 2 },
      { key: 'Cs7',    beats: 2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Verse)',  barRange: [1, 8]  },
    { name: 'B', label: 'B (Chorus)', barRange: [9, 16] },
  ],
};
