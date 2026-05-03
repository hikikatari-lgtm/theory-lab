import type { BarsGridProgression, WalkingBassInfo } from './types';

// Phase 6-B: Ascending walking bass per Rule 3a (one chord-tone per beat:
// 1 - 3/♭3 - 5/♭5 - 7/♭7). Dominants with ♭9 (D7♭9) use natural 5 in
// the bass — walking bass typically traces the unaltered chord tones.
const WB_Cm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'Bb2'] };
const WB_F7:     WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'A2',  'C3',  'Eb3'] };
const WB_BbM7:   WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'A3']  };
const WB_EbM7:   WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2',  'Bb2', 'D3']  };
const WB_Am7b5:  WalkingBassInfo = { pattern: 'ascending', notes: ['A2',  'C3',  'Eb3', 'G3']  };
const WB_D7b9:   WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2', 'A2',  'C3']  };
const WB_Gm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2', 'D3',  'F3']  };
const WB_C7:     WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2',  'Bb2'] };
const WB_Fm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'C3',  'Eb3'] };
const WB_Bb7:    WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'Ab3'] };

// Autumn Leaves (Joseph Kosma, 1945; English lyrics Johnny Mercer, 1947)
// — 32-bar AABA jazz standard in Gm. Real Book / Bill Evans standard
// form, all chords full-bar. Bars 1-4 sit in the relative major (Bb)
// as a ii-V-I-IV cycle, bars 5-7 cadence to Gm i. The C section
// (bars 25-32) modulates briefly through ii-V-I in E♭ major before a
// V7♭9 turnaround back to Gm.
//
// Voicings reused from earlier progressions: Cm7 / Fm7 / B♭7 / E♭M7 are
// shared with the Minor Cadence Cycle; Gm7 and C7 are shared with
// F Blues Rootless. New voicings (F7, B♭M7, Am7♭5, D7♭9) follow the
// same rootless 4-note rule (root → 9, dominant 5 → 13) and are voiced
// to give smooth ii-V-I voice leading at bars 5→6→7 and 13→14→15.
// Cm-only — bars-grid 12-key support deferred.

export const autumnLeaves: BarsGridProgression = {
  id: 'autumn-leaves',
  label: 'Autumn Leaves',
  subtitle: 'Autumn Leaves — 32 bars (AABA)',
  progressionLabel: 'Autumn Leaves (Joseph Kosma) — 32 bars',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'Gm',
  voicings: {
    Cm7: {
      symbol: 'Cm7',
      roman: 'iv7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    F7: {
      symbol: 'F7',
      roman: 'V7/♭III',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'A4',  degree: '3'  },
        { note: 'D5',  degree: '13' },
      ],
    },
    BbM7: {
      symbol: 'B♭M7',
      roman: '♭IIIΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4', degree: '3'  },
        { note: 'F4', degree: '5'  },
        { note: 'A4', degree: 'M7' },
        { note: 'C5', degree: '9'  },
      ],
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: '♭VIΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Am7b5: {
      symbol: 'Am7♭5',
      roman: 'ii7♭5',
      degreesLabel: '♭7, ♭9, ♭3, ♭5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '♭7' },
        { note: 'Bb4', degree: '♭9' },
        { note: 'C5',  degree: '♭3' },
        { note: 'Eb5', degree: '♭5' },
      ],
    },
    D7b9: {
      symbol: 'D7(♭9)',
      roman: 'V7',
      degreesLabel: '3, 13, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3'  },
        { note: 'B4',  degree: '13' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    Gm7: {
      symbol: 'Gm7',
      roman: 'i7',
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
      roman: 'V7/♭VII',
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
      roman: '♭vii7',
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
      roman: 'V7/♭VI',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '3'  },
        { note: 'G4',  degree: '13' },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9'  },
      ],
    },
  },
  bars: [
    // A (1-8): ii-V-I-IV in B♭ → ii-V-i in Gm
    { number: 1,  chords: [{ key: 'Cm7',    beats: 4, walkingBass: WB_Cm7    }] },
    { number: 2,  chords: [{ key: 'F7',     beats: 4, walkingBass: WB_F7     }] },
    { number: 3,  chords: [{ key: 'BbM7',   beats: 4, walkingBass: WB_BbM7   }] },
    { number: 4,  chords: [{ key: 'EbM7',   beats: 4, walkingBass: WB_EbM7   }] },
    { number: 5,  chords: [{ key: 'Am7b5',  beats: 4, walkingBass: WB_Am7b5  }] },
    { number: 6,  chords: [{ key: 'D7b9',   beats: 4, walkingBass: WB_D7b9   }] },
    { number: 7,  chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    { number: 8,  chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    // A' (9-16): same as A
    { number: 9,  chords: [{ key: 'Cm7',    beats: 4, walkingBass: WB_Cm7    }] },
    { number: 10, chords: [{ key: 'F7',     beats: 4, walkingBass: WB_F7     }] },
    { number: 11, chords: [{ key: 'BbM7',   beats: 4, walkingBass: WB_BbM7   }] },
    { number: 12, chords: [{ key: 'EbM7',   beats: 4, walkingBass: WB_EbM7   }] },
    { number: 13, chords: [{ key: 'Am7b5',  beats: 4, walkingBass: WB_Am7b5  }] },
    { number: 14, chords: [{ key: 'D7b9',   beats: 4, walkingBass: WB_D7b9   }] },
    { number: 15, chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    { number: 16, chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    // B (17-24): ii-V-i in Gm → ii-V-I in B♭ (extended)
    { number: 17, chords: [{ key: 'Am7b5',  beats: 4, walkingBass: WB_Am7b5  }] },
    { number: 18, chords: [{ key: 'D7b9',   beats: 4, walkingBass: WB_D7b9   }] },
    { number: 19, chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    { number: 20, chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    { number: 21, chords: [{ key: 'Cm7',    beats: 4, walkingBass: WB_Cm7    }] },
    { number: 22, chords: [{ key: 'F7',     beats: 4, walkingBass: WB_F7     }] },
    { number: 23, chords: [{ key: 'BbM7',   beats: 4, walkingBass: WB_BbM7   }] },
    { number: 24, chords: [{ key: 'BbM7',   beats: 4, walkingBass: WB_BbM7   }] },
    // C (25-32): ii-V-i in Gm → modulation through ii-V-I in E♭ → V7 turnaround
    { number: 25, chords: [{ key: 'Am7b5',  beats: 4, walkingBass: WB_Am7b5  }] },
    { number: 26, chords: [{ key: 'D7b9',   beats: 4, walkingBass: WB_D7b9   }] },
    { number: 27, chords: [{ key: 'Gm7',    beats: 4, walkingBass: WB_Gm7    }] },
    { number: 28, chords: [{ key: 'C7',     beats: 4, walkingBass: WB_C7     }] },
    { number: 29, chords: [{ key: 'Fm7',    beats: 4, walkingBass: WB_Fm7    }] },
    { number: 30, chords: [{ key: 'Bb7',    beats: 4, walkingBass: WB_Bb7    }] },
    { number: 31, chords: [{ key: 'EbM7',   beats: 4, walkingBass: WB_EbM7   }] },
    { number: 32, chords: [{ key: 'D7b9',   beats: 4, walkingBass: WB_D7b9   }] },
  ],
  group: 'tune',
};
