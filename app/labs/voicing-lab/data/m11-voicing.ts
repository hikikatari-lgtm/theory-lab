import type { ChordsRowChord, ChordsRowProgression } from './types';

// m11 voicing: LH plays the minor triad (R, ♭3, 5); RH plays the major
// triad whose root is a whole step below — for Cm11 that's B♭ major
// (B♭, D, F), which spells out ♭7, 9, 11 over the m11 root.
//
// Single chord on the Im11, transposed to all 12 keys via the standard
// pipeline so the same shape is studied on every root.
//
// NOTE: VoicingKeyboard only renders RH notes — the LH triad plays in
// audio and is shown in the L.H. text label, but doesn't get its own
// keyboard markers.

const chords: ChordsRowChord[] = [
  {
    id: 'im11',
    symbol: 'Cm11',
    roman: 'Im11',
    degreesLabel: 'L.H. R, ♭3, 5 / R.H. ♭7, 9, 11 (全音下のメジャー)',
    lh: ['C3', 'Eb3', 'G3'],
    rh: [
      { note: 'Bb3', degree: '♭7' },
      { note: 'D4',  degree: '9'  },
      { note: 'F4',  degree: '11' },
    ],
  },
];

export const m11Voicing: ChordsRowProgression = {
  id: 'm11-voicing',
  label: 'm11 Voicing',
  subtitle: 'Im11 — R ♭3 5 / 全音下のメジャー',
  progressionLabel: 'm11 ボイシング — 12キー',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'C',
  chords,
  group: '構造系',
  supportsAllKeys: true,
  baseKey: 'C',
};
