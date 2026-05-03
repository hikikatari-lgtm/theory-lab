import type { BarsGridProgression, RhythmInfo } from './types';

// Phase 6-C: Rhythm C = all-upbeat hits per bar [0.5, 1.5, 2.5, 3.5].
// All 16 bars are full 4-beat, so the same RhythmInfo applies uniformly.
// The dense upbeat-only pattern gives a syncopated bossa-leaning comping
// feel that contrasts with Misty's Rhythm A and Fly Me's Rhythm B.
const RHYTHM_C: RhythmInfo = { pattern: 'C', hits: [0.5, 1.5, 2.5, 3.5] };

// Blue Bossa (Kenny Dorham, 1963) — 16-bar AA' minor jazz standard in
// Cm with a brief modulation to D♭ major in bars 9-12 (♭IIΔ Neapolitan
// area). Standard iReal Pro / Real Book form: every chord one full bar.
// Cm-only for this Phase; 12-key support deferred along with the rest of
// the bars-grid progressions.
//
// Voicings: Cm7 / Fm7 / Dm7♭5 / G7♭9 are reused verbatim from the Minor
// Cadence Cycle so the two progressions stay visually consistent. New
// voicings (E♭m7, A♭7, D♭△) are derived from the same rootless 4-note
// rule (root → 9, dominant 5 → 13) and chosen to voice-lead smoothly
// across bars 8 → 9 → 10 → 11 (Cm7 → E♭m7 → A♭7 → D♭△).

export const blueBossa: BarsGridProgression = {
  id: 'blue-bossa',
  label: 'Blue Bossa',
  subtitle: 'i7 - iv7 - ii7♭5 - V7♭9 - ♭IIΔ',
  progressionLabel: 'Blue Bossa (Kenny Dorham) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 140,
  key: 'Cm',
  voicings: {
    Cm7: {
      symbol: 'Cm7',
      roman: 'i7',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'iv7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'G4',  degree: '9'  },
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
      ],
    },
    Dm7b5: {
      symbol: 'Dm7♭5',
      roman: 'ii7♭5',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭3' },
        { note: 'Ab4', degree: '♭5' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    G7b9: {
      symbol: 'G7(♭9)',
      roman: 'V7',
      degreesLabel: '♭7, ♭9, 3, 13',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'Ab4', degree: '♭9' },
        { note: 'B4',  degree: '3'  },
        { note: 'E5',  degree: '13' },
      ],
    },
    Ebm7: {
      symbol: 'E♭m7',
      roman: 'ii7/♭II',
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
      roman: 'V7/♭II',
      degreesLabel: '♭7, 9, 3, 13',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'Gb4', degree: '♭7' },
        { note: 'Bb4', degree: '9'  },
        { note: 'C5',  degree: '3'  },
        { note: 'F5',  degree: '13' },
      ],
    },
    DbMaj7: {
      symbol: 'D♭△',
      roman: '♭IIΔ',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Db2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '3'  },
        { note: 'Ab4', degree: '5'  },
        { note: 'C5',  degree: 'M7' },
        { note: 'Eb5', degree: '9'  },
      ],
    },
  },
  bars: [
    { number: 1,  chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 2,  chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 3,  chords: [{ key: 'Fm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 4,  chords: [{ key: 'Fm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 5,  chords: [{ key: 'Dm7b5',  beats: 4, rhythm: RHYTHM_C }] },
    { number: 6,  chords: [{ key: 'G7b9',   beats: 4, rhythm: RHYTHM_C }] },
    { number: 7,  chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 8,  chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 9,  chords: [{ key: 'Ebm7',   beats: 4, rhythm: RHYTHM_C }] },
    { number: 10, chords: [{ key: 'Ab7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 11, chords: [{ key: 'DbMaj7', beats: 4, rhythm: RHYTHM_C }] },
    { number: 12, chords: [{ key: 'DbMaj7', beats: 4, rhythm: RHYTHM_C }] },
    { number: 13, chords: [{ key: 'Dm7b5',  beats: 4, rhythm: RHYTHM_C }] },
    { number: 14, chords: [{ key: 'G7b9',   beats: 4, rhythm: RHYTHM_C }] },
    { number: 15, chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
    { number: 16, chords: [{ key: 'Cm7',    beats: 4, rhythm: RHYTHM_C }] },
  ],
  group: 'tune',
};
