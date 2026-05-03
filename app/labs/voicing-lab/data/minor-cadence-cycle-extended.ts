import type {
  BarsGridProgression,
  RhythmInfo,
  WalkingBassInfo,
} from './types';

// Minor Cadence Cycle Extended — mDecks Vol.2 Workout p.17 (C Minor MAP)
// direct import. 12-bar full circulation through every functional area
// of the C minor key: tonic (i7/ii7/V7/i6) → subdominant minor area
// (ii/iv → V/iv → ii/♭III → V/♭III) → relative major and return
// (subV/♭III → ♭III△ → subV/V → V7 → loop).
//
// Position relative to existing Minor Cadence Cycle (16-bar):
//   16-bar version is the "first encounter" with minor-key cycles
//   (kept as-is). Extended is the next-step compression of the full
//   harmonic palette into 12 bars — every chord is functional, no
//   sustained vamps. Aimed at students who have already internalized
//   the 16-bar version.
//
// Phase 7-α scope: Voicing 1 (Aeolian / Harmonic Minor / Melodic Minor
// blend, no altered tensions on the dominants). The Substitutions
// version (Voicing 2 — G7♭13♯9, C7♭13♯9, A♭7♯11, G7♭13♭9) lands in a
// follow-up PR once the source page is ingested verbatim.
//
// Voicings: rootless 4-note in RH (octave 4-5) + bass root in LH.
// Several chords (Cm7 / Dm7♭5 / Cm6 / Gm7♭5 / E♭M7) are pitch-identical
// to the existing Minor Cadence Cycle entries; G7 / C7 / Fm7 / B♭7 /
// E7 / A♭7 use mDecks-specific shapes that differ from earlier
// progressions (e.g. plain G7 here is F-B-D-F doubled-♭7, distinct
// from the Cadence Cycle's G7♭9 voicing).
//
// Walking bass: ascending chord-tones (1-3-5-♭7 family, 1-♭3-5-6 for
// Cm6, 1-3-5-M7 for E♭M7). All notes ≥ C2 per the project's audio-
// range convention (B♭7 / A♭7 use B♭2 / A♭2 instead of the spec's
// B♭1 / A♭1 — same call as Phase 6-B's existing dominants).
//
// Rhythm: Rhythm A (downbeat + upbeat-of-2) on every bar — keeps the
// rhythmic surface simple so attention can stay on the harmonic
// motion. Rhythm B/C/D variants reserved for a future Voicing 2 PR.

const WB_Cm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'Bb2'] };
const WB_Dm7b5:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F2',  'Ab2', 'C3']  };
const WB_G7:     WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'B2',  'D3',  'F3']  };
const WB_Cm6:    WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'Eb2', 'G2',  'A2']  };
const WB_Gm7b5:  WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2', 'Db3', 'F3']  };
const WB_C7:     WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2',  'Bb2'] };
const WB_Fm7:    WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'Ab2', 'C3',  'Eb3'] };
const WB_Bb7:    WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3',  'Ab3'] };
const WB_E7:     WalkingBassInfo = { pattern: 'ascending', notes: ['E2',  'G#2', 'B2',  'D3']  };
const WB_EbM7:   WalkingBassInfo = { pattern: 'ascending', notes: ['Eb2', 'G2',  'Bb2', 'D3']  };
const WB_Ab7:    WalkingBassInfo = { pattern: 'ascending', notes: ['Ab2', 'C3',  'Eb3', 'Gb3'] };

const RHYTHM_A: RhythmInfo = { pattern: 'A', hits: [0, 1.5] };

export const minorCadenceCycleExtended: BarsGridProgression = {
  id: 'minor-cadence-cycle-extended',
  label: 'Minor Cadence Cycle Extended',
  subtitle: 'C Minor full circulation — 12 bars',
  progressionLabel: 'Minor Cadence Cycle Extended (mDecks Vol.2 p.17) — 12 bars',
  displayMode: 'bars-grid',
  tempo: 120,
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
    Dm7b5: {
      symbol: 'Dm7♭5',
      roman: 'ii7',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭3' },
        { note: 'Ab4', degree: '♭5' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    G7: {
      symbol: 'G7',
      roman: 'V7',
      degreesLabel: '♭7, 3, 5, ♭7',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'B4', degree: '3'  },
        { note: 'D5', degree: '5'  },
        { note: 'F5', degree: '♭7' },
      ],
    },
    Cm6: {
      symbol: 'Cm6',
      roman: 'i6',
      degreesLabel: '♭3, 5, 6, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭3' },
        { note: 'G4',  degree: '5'  },
        { note: 'A4',  degree: '6'  },
        { note: 'D5',  degree: '9'  },
      ],
    },
    Gm7b5: {
      symbol: 'Gm7♭5',
      roman: 'ii/iv',
      degreesLabel: '♭3, ♭5, ♭7, ♭9',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'Bb4', degree: '♭3' },
        { note: 'Db5', degree: '♭5' },
        { note: 'F5',  degree: '♭7' },
        { note: 'Ab5', degree: '♭9' },
      ],
    },
    C7: {
      symbol: 'C7',
      roman: 'V/iv',
      degreesLabel: '3, ♭7, 9, 13',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3'  },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9'  },
        { note: 'A5',  degree: '13' },
      ],
    },
    Fm7: {
      symbol: 'Fm7',
      roman: 'ii/♭III',
      degreesLabel: '♭3, 5, ♭7, 9',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭3' },
        { note: 'C5',  degree: '5'  },
        { note: 'Eb5', degree: '♭7' },
        { note: 'G5',  degree: '9'  },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'V/♭III',
      degreesLabel: '♭7, 3, 5, ♭7',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'Ab4', degree: '♭7' },
        { note: 'D5',  degree: '3'  },
        { note: 'F5',  degree: '5'  },
        { note: 'Ab5', degree: '♭7' },
      ],
    },
    E7: {
      symbol: 'E7',
      roman: 'subV/♭III',
      degreesLabel: '3, ♭7, 9, 13',
      lh: [{ note: 'E2', degree: 'R' }],
      rh: [
        { note: 'G#4', degree: '3'  },
        { note: 'D5',  degree: '♭7' },
        { note: 'F#5', degree: '9'  },
        { note: 'A5',  degree: '13' },
      ],
    },
    EbM7: {
      symbol: 'E♭M7',
      roman: '♭III△',
      degreesLabel: '3, 5, M7, 9',
      lh: [{ note: 'Eb2', degree: 'R' }],
      rh: [
        { note: 'G4',  degree: '3'  },
        { note: 'Bb4', degree: '5'  },
        { note: 'D5',  degree: 'M7' },
        { note: 'F5',  degree: '9'  },
      ],
    },
    Ab7: {
      symbol: 'A♭7',
      roman: 'subV/V',
      degreesLabel: '3, 5, ♭7, 9',
      lh: [{ note: 'Ab2', degree: 'R' }],
      rh: [
        { note: 'C5',  degree: '3'  },
        { note: 'Eb5', degree: '5'  },
        { note: 'Gb5', degree: '♭7' },
        { note: 'Bb5', degree: '9'  },
      ],
    },
  },
  bars: [
    // Tonic section: i7 → ii7 → V7 → i6
    { number: 1,  chords: [{ key: 'Cm7',   beats: 4, walkingBass: WB_Cm7,   rhythm: RHYTHM_A }] },
    { number: 2,  chords: [{ key: 'Dm7b5', beats: 4, walkingBass: WB_Dm7b5, rhythm: RHYTHM_A }] },
    { number: 3,  chords: [{ key: 'G7',    beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
    { number: 4,  chords: [{ key: 'Cm6',   beats: 4, walkingBass: WB_Cm6,   rhythm: RHYTHM_A }] },
    // Subdominant minor area: ii/iv → V/iv → ii/♭III → V/♭III
    { number: 5,  chords: [{ key: 'Gm7b5', beats: 4, walkingBass: WB_Gm7b5, rhythm: RHYTHM_A }] },
    { number: 6,  chords: [{ key: 'C7',    beats: 4, walkingBass: WB_C7,    rhythm: RHYTHM_A }] },
    { number: 7,  chords: [{ key: 'Fm7',   beats: 4, walkingBass: WB_Fm7,   rhythm: RHYTHM_A }] },
    { number: 8,  chords: [{ key: 'Bb7',   beats: 4, walkingBass: WB_Bb7,   rhythm: RHYTHM_A }] },
    // Relative major and return: subV/♭III → ♭III△ → subV/V → V7 → loop
    { number: 9,  chords: [{ key: 'E7',    beats: 4, walkingBass: WB_E7,    rhythm: RHYTHM_A }] },
    { number: 10, chords: [{ key: 'EbM7',  beats: 4, walkingBass: WB_EbM7,  rhythm: RHYTHM_A }] },
    { number: 11, chords: [{ key: 'Ab7',   beats: 4, walkingBass: WB_Ab7,   rhythm: RHYTHM_A }] },
    { number: 12, chords: [{ key: 'G7',    beats: 4, walkingBass: WB_G7,    rhythm: RHYTHM_A }] },
  ],
  group: 'progression',
};
