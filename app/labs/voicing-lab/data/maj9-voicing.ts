import type { ChordsRowChord, ChordsRowProgression } from './types';

// maj7's 9-3-M7 voicing: LH plays root + 5, RH plays 9, 3, M7.
// Defined as a single chord on the I, transposed to all 12 keys via
// the standard pipeline so the same shape can be studied on every root.
// The keyboard renders LH in blue and RH in red.

const chords: ChordsRowChord[] = [
  {
    id: 'imaj9',
    symbol: 'CM9',
    roman: 'IM9',
    degreesLabel: 'L.H. R, 5 / R.H. 9, 3, M7',
    lh: [
      { note: 'C3', degree: 'R' },
      { note: 'G3', degree: '5' },
    ],
    rh: [
      { note: 'D4', degree: '9'  },
      { note: 'E4', degree: '3'  },
      { note: 'B4', degree: 'M7' },
    ],
  },
];

export const maj9Voicing: ChordsRowProgression = {
  id: 'maj9-voicing',
  label: 'Maj9 Voicing',
  subtitle: 'IM9 — R 5 / 9 3 M7',
  progressionLabel: 'maj9 ボイシング — 12キー',
  displayMode: 'chords-row',
  tempo: 80,
  key: 'C',
  chords,
  group: '構造系',
  supportsAllKeys: true,
  baseKey: 'C',
};
