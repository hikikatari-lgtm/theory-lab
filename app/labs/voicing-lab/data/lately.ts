import type { BarsGridProgression, Voicing } from './types';

// Lately (Stevie Wonder, Hotter Than July, 1980) — F♯ major ballad.
// 16-bar form: A verse (Imaj7 → bass-cliché → vim7 → ii-V) ×2,
// B bridge with the IVmaj7 → iiim7 → iim7 → V7sus/V7 ascent and a
// borrowed ♭VImaj7 in bar 14 that gives the song its ache.
//
// Two pedagogical centerpieces:
//   1. F♯maj7 → F♯maj7/F (bars 1-2 / 5-6) — bass-cliché slash chord.
//      The F♯maj7 voicing in the RH stays put while the LH bass
//      walks down a half-step to F (= E♯ enharmonic). The "I" sound
//      stays but the floor shifts.
//   2. Dmaj7 in bar 14 — borrowed ♭VImaj7 from F♯ minor ("夕方の影"
//      per spec). The same parallel-minor borrowing language as
//      Best Part's B♭maj7 in D major from Phase R&B-A.
//
// Some of F♯ major's chord tones are sharp-spelled — A♯, C♯, F♯,
// G♯, D♯, E♯. E♯ is enharmonic to F (and B♯ to C); both written as
// F / C in the audio data since the engine doesn't recognize the
// double-letter spellings.
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

// Bass cliché — same RH as F♯maj7, bass walks down a half-step to F.
// The chord stays "Imaj7" sonically but the floor moves.
const V_Fsmaj7_F: Voicing = {
  symbol: 'F♯maj7/F',
  roman: 'F♯M: Imaj7/♭I (bass cliché)',
  degreesLabel: 'L.H. F bass (half-step down) / R.H. F♯maj7 (3, 5, M7, 9)',
  lh: [{ note: 'F2', degree: 'F (chromatic ↓ from F♯)' }],
  rh: [
    { note: 'A#4', degree: '3'                  },
    { note: 'C#5', degree: '5'                  },
    { note: 'F5',  degree: 'M7 (E♯ enharmonic)' },
    { note: 'G#5', degree: '9'                  },
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

const V_Bmaj7: Voicing = {
  symbol: 'Bmaj7',
  roman: 'F♯M: IVmaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'D#4', degree: '3'  },
    { note: 'F#4', degree: '5'  },
    { note: 'A#4', degree: 'M7' },
    { note: 'C#5', degree: '9'  },
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

const V_Dmaj7: Voicing = {
  symbol: 'Dmaj7',
  roman: 'F♯M: ♭VImaj7 (parallel-minor borrowing)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'A4',  degree: '5'  },
    { note: 'C#5', degree: 'M7' },
    { note: 'E5',  degree: '9'  },
  ],
};

export const lately: BarsGridProgression = {
  id: 'lately',
  label: 'Lately - Stevie Wonder',
  subtitle: 'Lately — 16 bars (F♯M, bass cliché + ♭VI borrowing)',
  progressionLabel: 'Lately (Stevie Wonder, Hotter Than July, 1980) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 58,
  key: 'F#M',
  voicings: {
    Fsmaj7:    V_Fsmaj7,
    Fsmaj7_F:  V_Fsmaj7_F,
    Dsm7:      V_Dsm7,
    Gsm7:      V_Gsm7,
    Cs7sus:    V_Cs7sus,
    Cs7:       V_Cs7,
    Bmaj7:     V_Bmaj7,
    Asm7:      V_Asm7,
    Dmaj7:     V_Dmaj7,
  },
  bars: [
    // A: Verse (1-8) — bass cliché on bars 2 / 6, ii-V on bars 4 / 8
    { number: 1, chords: [{ key: 'Fsmaj7',   beats: 4 }] },
    { number: 2, chords: [{ key: 'Fsmaj7_F', beats: 4 }] },
    { number: 3, chords: [{ key: 'Dsm7',     beats: 4 }] },
    { number: 4, chords: [
      { key: 'Gsm7',   beats: 2 },
      { key: 'Cs7sus', beats: 2 },
    ] },
    { number: 5, chords: [{ key: 'Fsmaj7',   beats: 4 }] },
    { number: 6, chords: [{ key: 'Fsmaj7_F', beats: 4 }] },
    { number: 7, chords: [{ key: 'Dsm7',     beats: 4 }] },
    { number: 8, chords: [
      { key: 'Gsm7', beats: 2 },
      { key: 'Cs7',  beats: 2 },
    ] },
    // B: Bridge / Pre-Chorus (9-16) — IV → iii → ii → V7sus/V7,
    // landing on Imaj7, then borrowed ♭VImaj7 (bar 14) for the ache,
    // ii-V resolve back to Imaj7
    { number: 9,  chords: [{ key: 'Bmaj7', beats: 4 }] },
    { number: 10, chords: [{ key: 'Asm7',  beats: 4 }] },
    { number: 11, chords: [{ key: 'Gsm7',  beats: 4 }] },
    { number: 12, chords: [
      { key: 'Cs7sus', beats: 2 },
      { key: 'Cs7',    beats: 2 },
    ] },
    { number: 13, chords: [{ key: 'Fsmaj7', beats: 4 }] },
    { number: 14, chords: [{ key: 'Dmaj7',  beats: 4 }] },
    { number: 15, chords: [
      { key: 'Gsm7', beats: 2 },
      { key: 'Cs7',  beats: 2 },
    ] },
    { number: 16, chords: [{ key: 'Fsmaj7', beats: 4 }] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Verse)',                  barRange: [1, 8]  },
    { name: 'B', label: 'B (Bridge / Pre-Chorus)',    barRange: [9, 16] },
  ],
};
