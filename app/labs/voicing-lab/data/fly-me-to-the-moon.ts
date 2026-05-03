import type { BarsGridProgression } from './types';

// Fly Me To The Moon (Bart Howard, 1954) — C-major standard built
// almost entirely on the Circle of Fifths: Am7 → Dm7 → G7 → CM7 →
// FM7 → Bm7♭5 → E7 → Am7 (each chord descending a perfect 5th from
// the last). 16-bar version of the AABA form: A1 (8 bars) + A2 (same
// 8 bars). Plays the cycle through twice for clear reinforcement.
//
// Voicings — Am7 reused from Blue In Green; Dm7 / G7 / CM7 copied from
// the existing 251 Voicing variant A so the cycle of fifths starts with
// the same shapes that learners already studied. New voicings: FM7,
// Bm7♭5, E7. The ii-V leading back to the vi (Bm7♭5 → E7 → Am7) uses
// inverted Bm7♭5 (♭7-♭9-♭3-♭5) and E7 (3-13-♭7-9) for textbook V/vi
// resolution — 1 common tone + 3 half-step movements.

export const flyMeToTheMoon: BarsGridProgression = {
  id: 'fly-me-to-the-moon',
  label: 'Fly Me To The Moon',
  subtitle: 'Fly Me To The Moon — 16 bars (Circle of Fifths)',
  progressionLabel: 'Fly Me To The Moon (Bart Howard, 1954) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'C',
  voicings: {
    Am7: {
      symbol: 'Am7',
      roman: 'C: vi7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'A2', degree: 'R' }],
      rh: [
        { note: 'G4', degree: '♭7' },
        { note: 'B4', degree: '9'  },
        { note: 'C5', degree: '♭3' },
        { note: 'E5', degree: '5'  },
      ],
    },
    Dm7: {
      symbol: 'Dm7',
      roman: 'C: ii7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'C5', degree: '♭7' },
        { note: 'E5', degree: '9'  },
      ],
    },
    G7: {
      symbol: 'G7',
      roman: 'C: V7',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
        { note: 'B4', degree: '3'  },
        { note: 'E5', degree: '13' },
      ],
    },
    CM7: {
      symbol: 'CM7',
      roman: 'C: IΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4', degree: '3'  },
        { note: 'G4', degree: '5'  },
        { note: 'B4', degree: 'M7' },
        { note: 'D5', degree: '9'  },
      ],
    },
    FM7: {
      symbol: 'FM7',
      roman: 'C: IVΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'A4', degree: '3'  },
        { note: 'C5', degree: '5'  },
        { note: 'E5', degree: 'M7' },
        { note: 'G5', degree: '9'  },
      ],
    },
    Bm7b5: {
      symbol: 'Bm7♭5',
      roman: 'C: vii7♭5',
      degreesLabel: '♭7, ♭9, ♭3, ♭5',
      lh: [{ note: 'B2', degree: 'R' }],
      rh: [
        { note: 'A4', degree: '♭7' },
        { note: 'C5', degree: '♭9' },
        { note: 'D5', degree: '♭3' },
        { note: 'F5', degree: '♭5' },
      ],
    },
    E7: {
      symbol: 'E7',
      roman: 'C: V7/vi',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G#4', degree: '3'  },
        { note: 'C#5', degree: '13' },
        { note: 'D5',  degree: '♭7' },
        { note: 'F#5', degree: '9'  },
      ],
    },
  },
  bars: [
    // A1 (1-8): Circle of Fifths — vi → ii → V → I → IV → vii♭5 → V/vi → vi
    { number: 1,  chords: [{ key: 'Am7',   beats: 4 }] },
    { number: 2,  chords: [{ key: 'Dm7',   beats: 4 }] },
    { number: 3,  chords: [{ key: 'G7',    beats: 4 }] },
    { number: 4,  chords: [{ key: 'CM7',   beats: 4 }] },
    { number: 5,  chords: [{ key: 'FM7',   beats: 4 }] },
    { number: 6,  chords: [{ key: 'Bm7b5', beats: 4 }] },
    { number: 7,  chords: [{ key: 'E7',    beats: 4 }] },
    { number: 8,  chords: [{ key: 'Am7',   beats: 4 }] },
    // A2 (9-16) — identical, plays the cycle a second time
    { number: 9,  chords: [{ key: 'Am7',   beats: 4 }] },
    { number: 10, chords: [{ key: 'Dm7',   beats: 4 }] },
    { number: 11, chords: [{ key: 'G7',    beats: 4 }] },
    { number: 12, chords: [{ key: 'CM7',   beats: 4 }] },
    { number: 13, chords: [{ key: 'FM7',   beats: 4 }] },
    { number: 14, chords: [{ key: 'Bm7b5', beats: 4 }] },
    { number: 15, chords: [{ key: 'E7',    beats: 4 }] },
    { number: 16, chords: [{ key: 'Am7',   beats: 4 }] },
  ],
  group: '楽曲系',
};
