import type { BarsGridProgression, WalkingBassInfo } from './types';

// Phase 6-B: Ascending walking bass per Rule 3a. Some chords appear
// in both 4-beat (FULL: 1-3-5-7 chord tones) and 2-beat (HALF: 1-3
// only) contexts because of the dense ii-V activity in A' and the
// modulating bridge — both shapes are defined where needed. Dominants
// with ♭9 (Ab7, C7, Eb7, A7, F#7, B7) use natural 5 in the bass even
// when the upper voicing has tensions; walking bass typically traces
// the unaltered chord tones.
const WB_Ebm7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'Gb2', 'Bb2', 'Db3'] };
const WB_Ab7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3',  'Eb3', 'Gb3'] };
const WB_DbM7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['Db2', 'F2',  'Ab2', 'C3']  };
const WB_Gm7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2', 'D3',  'F3']  };
const WB_C7_FULL:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2',  'Bb2'] };
const WB_Fm7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'C3',  'Eb3'] };
const WB_Bb7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'Ab3'] };
const WB_Bbm7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'Db3', 'F3',  'Ab3'] };
const WB_DM7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2', 'A2',  'C#3'] };
const WB_AbM7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3',  'Eb3', 'G3']  };
const WB_BM7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['B2',  'D#3', 'F#3', 'A#3'] };
const WB_EM7_FULL:   WalkingBassInfo = { pattern: 'ascending', notes: ['E2',  'G#2', 'B2',  'D#3'] };

const WB_Cm7b5_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2'] };
const WB_F7_HALF:    WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'A2']  };
const WB_Ebm7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'Gb2'] };
const WB_Ab7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3']  };
const WB_Em7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['E2',  'G2']  };
const WB_A7_HALF:    WalkingBassInfo = { pattern: 'ascending', notes: ['A2',  'C#3'] };
const WB_Bbm7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'Db3'] };
const WB_Eb7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2']  };
const WB_Csm7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['C#2', 'E2']  };
const WB_Fs7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['F#2', 'A#2'] };
const WB_Fsm7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['F#2', 'A2']  };
const WB_B7_HALF:    WalkingBassInfo = { pattern: 'ascending', notes: ['B2',  'D#3'] };
const WB_Fm7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2'] };
const WB_Bb7_HALF:   WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3']  };

// Body And Soul (Johnny Green, 1930; lyrics Heyman / Sour / Eyton) —
// 32-bar AABA jazz ballad in D♭ major, the most-played jazz standard
// of all time and famously challenging due to its modulating bridge.
// Real Book / Coleman Hawkins (1939) form: home key D♭, bridge cycles
// up by half-steps through D → A♭ → B → E majors as ii-V-I tonicizations.
//
// Bars 12, 14, 16, 18, 20, 22, 24, 31, 32 carry two chords (half-bar
// each, beats: 2). The 4-col bars-grid renders 32 bars as 4×8 with the
// half-bar bars splitting into two cells.
//
// Voicings reused: D♭M7 / E♭m7 / A♭7 from Blue Bossa; F7 / Gm7 / C7 /
// B♭7 / E♭M7 / Fm7 / B♭7 from Autumn Leaves & Cadence Cycle. New
// voicings (13) for the modulating bridge follow the same rootless
// 4-note rule. Dominant chords leading into bridge tonic chords use
// the inverted ♭7-9-3-13 pattern for smoother V→I voice leading
// (E♭7→A♭M7, A7→DM7, F♯7→BM7, B7→EM7).

export const bodyAndSoul: BarsGridProgression = {
  id: 'body-and-soul',
  label: 'Body And Soul',
  subtitle: 'Body And Soul — 32 bars (AABA)',
  progressionLabel: 'Body And Soul (Johnny Green / Coleman Hawkins) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'Db',
  voicings: {
    // ---------- Home key (D♭ major) ----------
    Ebm7: {
      symbol: 'E♭m7',
      roman: 'ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭3' },
        { note: 'Bb4', degree: '5'  },
        { note: 'Db5', degree: '♭7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Ab7: {
      symbol: 'A♭7',
      roman: 'V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭7' },
        { note: 'Bb4', degree: '9'  },
        { note: 'C5',  degree: '3'  },
        { note: 'F5',  degree: '13' },
      ],
    },
    DbM7: {
      symbol: 'D♭M7',
      roman: 'IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Db2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '3'  },
        { note: 'Ab4', degree: '5'  },
        { note: 'C5',  degree: 'M7' },
        { note: 'Eb5', degree: '9'  },
      ],
    },
    Gm7: {
      symbol: 'Gm7',
      roman: 'ii7/iii',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'A4',  degree: '9'  },
        { note: 'Bb4', degree: '♭3' },
        { note: 'D5',  degree: '5'  },
      ],
    },
    C7: {
      symbol: 'C7',
      roman: 'V7/iii',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'iii7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'V7/ii',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '3'  },
        { note: 'G4',  degree: '13' },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
    Cm7b5: {
      symbol: 'Cm7♭5',
      roman: 'ii7♭5/vi',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'Gb4', degree: '♭5' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'Db5', degree: '♭9' },
      ],
    },
    F7: {
      symbol: 'F7',
      roman: 'V7/vi',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'A4',  degree: '3'  },
        { note: 'D5',  degree: '13' },
      ],
    },
    Bbm7: {
      symbol: 'B♭m7',
      roman: 'vi7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭3' },
        { note: 'F4',  degree: '5'  },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },

    // ---------- Bridge transition (D major area) ----------
    Em7: {
      symbol: 'Em7',
      roman: 'D: ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '♭3' },
        { note: 'B4',  degree: '5'  },
        { note: 'D5',  degree: '♭7' },
        { note: 'F#5', degree: '9'  },
      ],
    },
    A7: {
      symbol: 'A7',
      roman: 'D: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '♭7' },
        { note: 'B4',  degree: '9'  },
        { note: 'C#5', degree: '3'  },
        { note: 'F#5', degree: '13' },
      ],
    },
    DM7: {
      symbol: 'DM7',
      roman: 'D: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3'  },
        { note: 'A4',  degree: '5'  },
        { note: 'C#5', degree: 'M7' },
        { note: 'E5',  degree: '9'  },
      ],
    },

    // ---------- Bridge: A♭ major area ----------
    Eb7: {
      symbol: 'E♭7',
      roman: 'A♭: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Db4', degree: '♭7' },
        { note: 'F4',  degree: '9'  },
        { note: 'G4',  degree: '3'  },
        { note: 'C5',  degree: '13' },
      ],
    },
    AbM7: {
      symbol: 'A♭M7',
      roman: 'A♭: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'C4',  degree: '3'  },
        { note: 'Eb4', degree: '5'  },
        { note: 'G4',  degree: 'M7' },
        { note: 'Bb4', degree: '9'  },
      ],
    },

    // ---------- Bridge: B major area ----------
    Csm7: {
      symbol: 'C♯m7',
      roman: 'B: ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C#2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '♭3' },
        { note: 'G#4', degree: '5'  },
        { note: 'B4',  degree: '♭7' },
        { note: 'D#5', degree: '9'  },
      ],
    },
    Fs7: {
      symbol: 'F♯7',
      roman: 'B: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'F#2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '♭7' },
        { note: 'G#4', degree: '9'  },
        { note: 'A#4', degree: '3'  },
        { note: 'D#5', degree: '13' },
      ],
    },
    BM7: {
      symbol: 'BM7',
      roman: 'B: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'B2', degree: 'R' }],
      rh: [
        { note: 'D#4', degree: '3'  },
        { note: 'F#4', degree: '5'  },
        { note: 'A#4', degree: 'M7' },
        { note: 'C#5', degree: '9'  },
      ],
    },

    // ---------- Bridge: E major area ----------
    Fsm7: {
      symbol: 'F♯m7',
      roman: 'E: ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'F#2', degree: 'R' }],
      rh: [
        { note: 'A4',  degree: '♭3' },
        { note: 'C#5', degree: '5'  },
        { note: 'E5',  degree: '♭7' },
        { note: 'G#5', degree: '9'  },
      ],
    },
    B7: {
      symbol: 'B7',
      roman: 'E: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'B2', degree: 'R' }],
      rh: [
        { note: 'A4',  degree: '♭7' },
        { note: 'C#5', degree: '9'  },
        { note: 'D#5', degree: '3'  },
        { note: 'G#5', degree: '13' },
      ],
    },
    EM7: {
      symbol: 'EM7',
      roman: 'E: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G#4', degree: '3'  },
        { note: 'B4',  degree: '5'  },
        { note: 'D#5', degree: 'M7' },
        { note: 'F#5', degree: '9'  },
      ],
    },
  },
  bars: [
    // A (1-8): ii-V-I cycle establishing D♭, ii-V/iii to Fm, ii-V/ii back
    { number: 1,  chords: [{ key: 'Ebm7',  beats: 4, walkingBass: WB_Ebm7_FULL }] },
    { number: 2,  chords: [{ key: 'Ab7',   beats: 4, walkingBass: WB_Ab7_FULL  }] },
    { number: 3,  chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 4,  chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 5,  chords: [{ key: 'Gm7',   beats: 4, walkingBass: WB_Gm7_FULL  }] },
    { number: 6,  chords: [{ key: 'C7',    beats: 4, walkingBass: WB_C7_FULL   }] },
    { number: 7,  chords: [{ key: 'Fm7',   beats: 4, walkingBass: WB_Fm7_FULL  }] },
    { number: 8,  chords: [{ key: 'Bb7',   beats: 4, walkingBass: WB_Bb7_FULL  }] },
    // A' (9-16): variation with ii-V/vi tonicization (Cm7♭5 F7 → B♭m7),
    //           bar 16 Em7 A7 prepares the D-major bridge
    { number: 9,  chords: [{ key: 'Ebm7',  beats: 4, walkingBass: WB_Ebm7_FULL }] },
    { number: 10, chords: [{ key: 'Ab7',   beats: 4, walkingBass: WB_Ab7_FULL  }] },
    { number: 11, chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 12, chords: [
      { key: 'Cm7b5', beats: 2, walkingBass: WB_Cm7b5_HALF },
      { key: 'F7',    beats: 2, walkingBass: WB_F7_HALF    },
    ] },
    { number: 13, chords: [{ key: 'Bbm7',  beats: 4, walkingBass: WB_Bbm7_FULL }] },
    { number: 14, chords: [
      { key: 'Ebm7',  beats: 2, walkingBass: WB_Ebm7_HALF },
      { key: 'Ab7',   beats: 2, walkingBass: WB_Ab7_HALF  },
    ] },
    { number: 15, chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 16, chords: [
      { key: 'Em7',   beats: 2, walkingBass: WB_Em7_HALF },
      { key: 'A7',    beats: 2, walkingBass: WB_A7_HALF  },
    ] },
    // B (17-24): the famous modulating bridge — D → A♭ → B → E key centers
    //           via ii-V-I tonicizations, then Em7 A7 prepares return
    { number: 17, chords: [{ key: 'DM7',   beats: 4, walkingBass: WB_DM7_FULL  }] },
    { number: 18, chords: [
      { key: 'Bbm7',  beats: 2, walkingBass: WB_Bbm7_HALF },
      { key: 'Eb7',   beats: 2, walkingBass: WB_Eb7_HALF  },
    ] },
    { number: 19, chords: [{ key: 'AbM7',  beats: 4, walkingBass: WB_AbM7_FULL }] },
    { number: 20, chords: [
      { key: 'Csm7',  beats: 2, walkingBass: WB_Csm7_HALF },
      { key: 'Fs7',   beats: 2, walkingBass: WB_Fs7_HALF  },
    ] },
    { number: 21, chords: [{ key: 'BM7',   beats: 4, walkingBass: WB_BM7_FULL  }] },
    { number: 22, chords: [
      { key: 'Fsm7',  beats: 2, walkingBass: WB_Fsm7_HALF },
      { key: 'B7',    beats: 2, walkingBass: WB_B7_HALF   },
    ] },
    { number: 23, chords: [{ key: 'EM7',   beats: 4, walkingBass: WB_EM7_FULL  }] },
    { number: 24, chords: [
      { key: 'Em7',   beats: 2, walkingBass: WB_Em7_HALF },
      { key: 'A7',    beats: 2, walkingBass: WB_A7_HALF  },
    ] },
    // A'' (25-32): final A with extended ending (bars 31-32 split for turnaround)
    { number: 25, chords: [{ key: 'Ebm7',  beats: 4, walkingBass: WB_Ebm7_FULL }] },
    { number: 26, chords: [{ key: 'Ab7',   beats: 4, walkingBass: WB_Ab7_FULL  }] },
    { number: 27, chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 28, chords: [{ key: 'DbM7',  beats: 4, walkingBass: WB_DbM7_FULL }] },
    { number: 29, chords: [{ key: 'Gm7',   beats: 4, walkingBass: WB_Gm7_FULL  }] },
    { number: 30, chords: [{ key: 'C7',    beats: 4, walkingBass: WB_C7_FULL   }] },
    { number: 31, chords: [
      { key: 'Fm7',   beats: 2, walkingBass: WB_Fm7_HALF },
      { key: 'Bb7',   beats: 2, walkingBass: WB_Bb7_HALF },
    ] },
    { number: 32, chords: [
      { key: 'Ebm7',  beats: 2, walkingBass: WB_Ebm7_HALF },
      { key: 'Ab7',   beats: 2, walkingBass: WB_Ab7_HALF  },
    ] },
  ],
  group: 'tune',
};
