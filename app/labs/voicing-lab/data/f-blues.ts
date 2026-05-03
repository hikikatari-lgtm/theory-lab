import type { BarsGridProgression, RhythmInfo, WalkingBassInfo } from './types';

// Phase 6-B: Ascending walking bass per Rule 3a (1-3-5-♭7 for dominants,
// 1-♭3-5-♭7 for the iim7). Half-bar 2-beat entries use just R-3 (or
// R-♭3 for minor) as a compact ascending walk to the next chord.
const WB_F7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'A2',  'C3', 'Eb3'] };
const WB_Bb7_FULL: WalkingBassInfo = { pattern: 'ascending', notes: ['Bb2', 'D3',  'F3', 'Ab3'] };
const WB_D7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2', 'A2', 'C3'] };
const WB_Gm7_FULL: WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2', 'D3', 'F3'] };
const WB_C7_FULL:  WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2',  'G2', 'Bb2'] };

const WB_F7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['F2',  'A2']  };
const WB_D7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['D2',  'F#2'] };
const WB_Gm7_HALF: WalkingBassInfo = { pattern: 'ascending', notes: ['G2',  'Bb2'] };
const WB_C7_HALF:  WalkingBassInfo = { pattern: 'ascending', notes: ['C2',  'E2']  };

// Phase 6-D: pair the existing walking bass with Rhythm A so the
// "+ Walking Bass + Rhythm" mode plays a complete swing-blues sketch
// (LH walking, RH Charleston-style comping). Rhythm A's [0, 1.5] hits
// fit both 4-beat and 2-beat chord events.
const RHYTHM_A: RhythmInfo = { pattern: 'A', hits: [0, 1.5] };

export const fBlues: BarsGridProgression = {
  id: 'f-blues',
  label: 'F Blues Rootless',
  subtitle: 'I7 - IV7 - VI7 - IIm7 - V7',
  progressionLabel: "Bag's Groove (Blues in F) — 12 bars",
  displayMode: 'bars-grid',
  tempo: 120,
  key: 'F',
  voicings: {
    F7: {
      symbol: 'F7',
      roman: 'I7',
      degreesLabel: '♭7, 3, 13',
      lh: [{ note: 'F2', degree: 'R' }],
      rh: [
        { note: 'Eb4', degree: '♭7' },
        { note: 'A4',  degree: '3' },
        { note: 'D5',  degree: '13' },
      ],
    },
    Bb7: {
      symbol: 'B♭7',
      roman: 'IV7',
      degreesLabel: '3, ♭7, 9',
      lh: [{ note: 'Bb2', degree: 'R' }],
      rh: [
        { note: 'D4',  degree: '3' },
        { note: 'Ab4', degree: '♭7' },
        { note: 'C5',  degree: '9' },
      ],
    },
    D7: {
      symbol: 'D7',
      roman: 'VI7',
      degreesLabel: '3, ♭7, ♭9',
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F#4', degree: '3' },
        { note: 'C5',  degree: '♭7' },
        { note: 'Eb5', degree: '♭9' },
      ],
    },
    Gm7: {
      symbol: 'Gm7',
      roman: 'IIm7',
      degreesLabel: '♭7, 9, ♭3, 5',
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4',  degree: '♭7' },
        { note: 'A4',  degree: '9' },
        { note: 'Bb4', degree: '♭3' },
        { note: 'D5',  degree: '5' },
      ],
    },
    C7: {
      symbol: 'C7',
      roman: 'V7',
      degreesLabel: '3, 13, ♭7, 9',
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4',  degree: '3' },
        { note: 'A4',  degree: '13' },
        { note: 'Bb4', degree: '♭7' },
        { note: 'D5',  degree: '9' },
      ],
    },
  },
  bars: [
    { number: 1,  chords: [{ key: 'F7',  beats: 4, walkingBass: WB_F7_FULL,  rhythm: RHYTHM_A }] },
    { number: 2,  chords: [{ key: 'Bb7', beats: 4, walkingBass: WB_Bb7_FULL, rhythm: RHYTHM_A }] },
    { number: 3,  chords: [{ key: 'F7',  beats: 4, walkingBass: WB_F7_FULL,  rhythm: RHYTHM_A }] },
    { number: 4,  chords: [{ key: 'F7',  beats: 4, walkingBass: WB_F7_FULL,  rhythm: RHYTHM_A }] },
    { number: 5,  chords: [{ key: 'Bb7', beats: 4, walkingBass: WB_Bb7_FULL, rhythm: RHYTHM_A }] },
    { number: 6,  chords: [{ key: 'Bb7', beats: 4, walkingBass: WB_Bb7_FULL, rhythm: RHYTHM_A }] },
    { number: 7,  chords: [{ key: 'F7',  beats: 4, walkingBass: WB_F7_FULL,  rhythm: RHYTHM_A }] },
    { number: 8,  chords: [{ key: 'D7',  beats: 4, walkingBass: WB_D7_FULL,  rhythm: RHYTHM_A }] },
    { number: 9,  chords: [{ key: 'Gm7', beats: 4, walkingBass: WB_Gm7_FULL, rhythm: RHYTHM_A }] },
    { number: 10, chords: [{ key: 'C7',  beats: 4, walkingBass: WB_C7_FULL,  rhythm: RHYTHM_A }] },
    { number: 11, chords: [
      { key: 'F7',  beats: 2, walkingBass: WB_F7_HALF,  rhythm: RHYTHM_A },
      { key: 'D7',  beats: 2, walkingBass: WB_D7_HALF,  rhythm: RHYTHM_A },
    ] },
    { number: 12, chords: [
      { key: 'Gm7', beats: 2, walkingBass: WB_Gm7_HALF, rhythm: RHYTHM_A },
      { key: 'C7',  beats: 2, walkingBass: WB_C7_HALF,  rhythm: RHYTHM_A },
    ] },
  ],
  group: 'progression',
};
