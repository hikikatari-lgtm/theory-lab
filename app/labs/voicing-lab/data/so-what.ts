import type { BarsGridProgression } from './types';

// So What (Miles Davis, 1959 — "Kind of Blue", arr. Bill Evans piano) —
// the canonical modal jazz piece. 16-bar version of the AABA form
// reduces to A(8) + B(8): 8 bars of D Dorian, then 8 bars of E♭ Dorian
// (half-step up), no chord change within each section.
//
// The "So What chord" is voiced as the iconic Bill Evans quartal stack:
// LH bass + RH four notes built as three stacked perfect 4ths topped by
// a major 3rd. For the Dm chord that's D / G-C-F-A (= R / 11 ♭7 ♭3 5).
// The voicing is structurally identical for E♭m (E♭ / A♭-D♭-G♭-B♭),
// just transposed up a half-step — which is the whole point of the
// modal-pivot bridge.

export const soWhat: BarsGridProgression = {
  id: 'so-what',
  label: 'So What - Miles Davis',
  subtitle: 'So What — 16 bars (A8 + B8)',
  progressionLabel: 'So What (Miles Davis / Bill Evans, 1959) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 140,
  key: 'Dm',
  voicings: {
    Dm11: {
      symbol: 'Dm11',
      roman: 'Dm: Im11',
      degreesLabel: '11, ♭7, ♭3, 5 (4度堆積)',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'G3', degree: '11' },
        { note: 'C4', degree: '♭7' },
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
      ],
    },
    Ebm11: {
      symbol: 'E♭m11',
      roman: 'E♭m: Im11',
      degreesLabel: '11, ♭7, ♭3, 5 (4度堆積)',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'Ab3', degree: '11' },
        { note: 'Db4', degree: '♭7' },
        { note: 'Gb4', degree: '♭3' },
        { note: 'Bb4', degree: '5'  },
      ],
    },
  },
  bars: [
    // A (1-8): D Dorian sustained
    { number: 1,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 2,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 3,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 4,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 5,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 6,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 7,  chords: [{ key: 'Dm11',  beats: 4 }] },
    { number: 8,  chords: [{ key: 'Dm11',  beats: 4 }] },
    // B (9-16): E♭ Dorian — same voicing shape, transposed up a half-step
    { number: 9,  chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 10, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 11, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 12, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 13, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 14, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 15, chords: [{ key: 'Ebm11', beats: 4 }] },
    { number: 16, chords: [{ key: 'Ebm11', beats: 4 }] },
  ],
  group: '楽曲系',
};
