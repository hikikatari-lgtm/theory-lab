import type { BarsGridProgression, Voicing } from './types';

// Best Part (H.E.R. / Daniel Caesar, Freudian, 2017) — D major Neo
// Soul ballad. 16-bar form: I-vm-IV-♭VI cycle (Verse) repeated as
// Chorus. The hook of the harmony is the SAME-MODE BORROWING from
// D minor (Am7 = vm7 of Dm; Bbmaj7 = ♭VImaj7 of Dm) sitting inside
// an otherwise D major progression. The minor-mode chords don't
// modulate the piece — they color it, like brief shadows passing
// through a sunny landscape.
//
// Phase R&B-A PR scope: piano voicings only. Walking bass + Rhythm
// follow in a separate Phase R&B-B PR.
//
// Voicing convention specific to this piece:
// - Dmaj7 / Gmaj7 (the major chords) carry the open Neo-Soul color
//   via 9th tensions on top
// - Am7 / Bbmaj7 (the borrowed-minor chords) are voiced with their
//   distinguishing notes (A's G/B and Bb's A/F natural) prominent
//   so the "shadow" character is audible
// - Bbmaj7 → Bb6 in the split bars: the top voice descends A → G
//   (M7 → 6 of Bb) while LH bass stays Bb. Subtle line cliché on
//   the borrowed chord — the spec explicitly calls this out as
//   "top音が変わるとnuanceが変わる" pedagogy

const V_Dmaj7: Voicing = {
  symbol: 'Dmaj7',
  roman: 'DM: Imaj7',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'D2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: '3'  },
    { note: 'A4',  degree: '5'  },
    { note: 'C#5', degree: 'M7' },
    { note: 'E5',  degree: '9'  },
  ],
};

const V_Am7: Voicing = {
  symbol: 'Am7',
  roman: 'DM: vm7 (parallel-minor borrowing)',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G4', degree: '♭7' },
    { note: 'B4', degree: '9'  },
    { note: 'C5', degree: '♭3' },
    { note: 'E5', degree: '5'  },
  ],
};

const V_Gmaj7: Voicing = {
  symbol: 'Gmaj7',
  roman: 'DM: IVmaj7',
  degreesLabel: 'M7, 9, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F#4', degree: 'M7' },
    { note: 'A4',  degree: '9'  },
    { note: 'B4',  degree: '3'  },
    { note: 'D5',  degree: '5'  },
  ],
};

const V_Bbmaj7: Voicing = {
  symbol: 'B♭maj7',
  roman: 'DM: ♭VImaj7 (parallel-minor borrowing)',
  degreesLabel: '3, 5, M7, 9',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '3'  },
    { note: 'F4', degree: '5'  },
    { note: 'A4', degree: 'M7' },
    { note: 'C5', degree: '9'  },
  ],
};

// Bb6 — Bb major triad with a 6th instead of M7. Top voice descends
// A4 → G4 from Bbmaj7; the LH bass and bottom 3 RH voices stay put.
// The single-voice change is the whole pedagogical point of this
// chord's existence in the lab.
const V_Bb6: Voicing = {
  symbol: 'B♭6',
  roman: 'DM: ♭VI6 (top-voice variation)',
  degreesLabel: '3, 5, 6, 9 (top voice A → G from B♭maj7)',
  lh: [{ note: 'Bb2', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '3' },
    { note: 'F4', degree: '5' },
    { note: 'G4', degree: '6' },
    { note: 'C5', degree: '9' },
  ],
};

export const bestPart: BarsGridProgression = {
  id: 'best-part',
  label: 'Best Part - H.E.R. / Daniel Caesar',
  subtitle: 'Best Part — 16 bars (DM, I-vm-IV-♭VI parallel-minor borrowing)',
  progressionLabel: 'Best Part (H.E.R. / Daniel Caesar, Freudian, 2017) — 16 bars',
  displayMode: 'bars-grid',
  tempo: 75,
  key: 'DM',
  voicings: {
    Dmaj7:  V_Dmaj7,
    Am7:    V_Am7,
    Gmaj7:  V_Gmaj7,
    Bbmaj7: V_Bbmaj7,
    Bb6:    V_Bb6,
  },
  bars: [
    // A: Verse (1-8) — I → vm → IV → ♭VI cycle, ends with split
    // (Bbmaj7 → Bb6) top-voice variation
    { number: 1, chords: [{ key: 'Dmaj7',  beats: 4 }] },
    { number: 2, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 3, chords: [{ key: 'Gmaj7',  beats: 4 }] },
    { number: 4, chords: [{ key: 'Bbmaj7', beats: 4 }] },
    { number: 5, chords: [{ key: 'Dmaj7',  beats: 4 }] },
    { number: 6, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 7, chords: [{ key: 'Gmaj7',  beats: 4 }] },
    { number: 8, chords: [
      { key: 'Bbmaj7', beats: 2 },
      { key: 'Bb6',    beats: 2 },
    ] },
    // B: Chorus (9-16) — same progression, all four cycles end with
    // the Bbmaj7 → Bb6 top-voice descent
    { number: 9,  chords: [{ key: 'Dmaj7',  beats: 4 }] },
    { number: 10, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 11, chords: [{ key: 'Gmaj7',  beats: 4 }] },
    { number: 12, chords: [
      { key: 'Bbmaj7', beats: 2 },
      { key: 'Bb6',    beats: 2 },
    ] },
    { number: 13, chords: [{ key: 'Dmaj7',  beats: 4 }] },
    { number: 14, chords: [{ key: 'Am7',    beats: 4 }] },
    { number: 15, chords: [{ key: 'Gmaj7',  beats: 4 }] },
    { number: 16, chords: [
      { key: 'Bbmaj7', beats: 2 },
      { key: 'Bb6',    beats: 2 },
    ] },
  ],
  group: 'tune',
  sections: [
    { name: 'A', label: 'A (Verse)',  barRange: [1, 8]  },
    { name: 'B', label: 'B (Chorus)', barRange: [9, 16] },
  ],
};
