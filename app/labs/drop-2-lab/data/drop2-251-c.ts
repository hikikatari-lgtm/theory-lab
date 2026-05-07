import type { DropTwoChord, DropTwoProgression } from './types';

// 251 in C — 4-step Drop 2 voicings.
//
// Step progression per chord:
//   Step 1: LH = R only        / RH = full rootless voicing (4 notes)
//   Step 2: LH = R + 2nd-from-top of RH dropped one octave
//                              / RH = unchanged (4 notes)
//   Step 3: LH = R + dropped note
//                              / RH = drop the 2nd-from-top (now 3 notes)
//   Step 4: LH = dropped note only (R removed)
//                              / RH = unchanged from Step 3 (3 notes)
//
// The "dropped note" is the Step 1 RH's 2nd-from-top:
//   Dm7 → C5 (♭7) → C4
//   G7  → B4 (3)  → B3
//   CM7 → B4 (M7) → B3

const dm7: DropTwoChord = {
  id: 'iim7',
  symbol: 'Dm7',
  roman: 'IIm7',
  degreesLabel: '♭3, 5, ♭7, 9',
  steps: {
    1: {
      lh: [{ note: 'D2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'C5', degree: '♭7' },
        { note: 'E5', degree: '9'  },
      ],
    },
    2: {
      lh: [
        { note: 'D2', degree: 'R'  },
        { note: 'C4', degree: '♭7' },
      ],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'C5', degree: '♭7' },
        { note: 'E5', degree: '9'  },
      ],
    },
    3: {
      lh: [
        { note: 'D2', degree: 'R'  },
        { note: 'C4', degree: '♭7' },
      ],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'E5', degree: '9'  },
      ],
    },
    4: {
      lh: [{ note: 'C4', degree: '♭7' }],
      rh: [
        { note: 'F4', degree: '♭3' },
        { note: 'A4', degree: '5'  },
        { note: 'E5', degree: '9'  },
      ],
    },
  },
};

const g7: DropTwoChord = {
  id: 'v7',
  symbol: 'G7',
  roman: 'V7',
  degreesLabel: '♭7, 9, 3, 13',
  steps: {
    1: {
      lh: [{ note: 'G2', degree: 'R' }],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
        { note: 'B4', degree: '3'  },
        { note: 'E5', degree: '13' },
      ],
    },
    2: {
      lh: [
        { note: 'G2', degree: 'R' },
        { note: 'B3', degree: '3' },
      ],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
        { note: 'B4', degree: '3'  },
        { note: 'E5', degree: '13' },
      ],
    },
    3: {
      lh: [
        { note: 'G2', degree: 'R' },
        { note: 'B3', degree: '3' },
      ],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
        { note: 'E5', degree: '13' },
      ],
    },
    4: {
      lh: [{ note: 'B3', degree: '3' }],
      rh: [
        { note: 'F4', degree: '♭7' },
        { note: 'A4', degree: '9'  },
        { note: 'E5', degree: '13' },
      ],
    },
  },
};

const cmaj7: DropTwoChord = {
  id: 'imaj7',
  symbol: 'CM7',
  roman: 'IM7',
  degreesLabel: '3, 5, M7, 9',
  steps: {
    1: {
      lh: [{ note: 'C2', degree: 'R' }],
      rh: [
        { note: 'E4', degree: '3'  },
        { note: 'G4', degree: '5'  },
        { note: 'B4', degree: 'M7' },
        { note: 'D5', degree: '9'  },
      ],
    },
    2: {
      lh: [
        { note: 'C2', degree: 'R'  },
        { note: 'B3', degree: 'M7' },
      ],
      rh: [
        { note: 'E4', degree: '3'  },
        { note: 'G4', degree: '5'  },
        { note: 'B4', degree: 'M7' },
        { note: 'D5', degree: '9'  },
      ],
    },
    3: {
      lh: [
        { note: 'C2', degree: 'R'  },
        { note: 'B3', degree: 'M7' },
      ],
      rh: [
        { note: 'E4', degree: '3' },
        { note: 'G4', degree: '5' },
        { note: 'D5', degree: '9' },
      ],
    },
    4: {
      lh: [{ note: 'B3', degree: 'M7' }],
      rh: [
        { note: 'E4', degree: '3' },
        { note: 'G4', degree: '5' },
        { note: 'D5', degree: '9' },
      ],
    },
  },
};

export const dropTwo251C: DropTwoProgression = {
  id: 'drop2-251-c',
  label: '251 Voicing',
  subtitle: 'IIm7 - V7 - IM7',
  progressionLabel: '2-5-1 — Drop 2 Method 練習',
  tempo: 80,
  key: 'C',
  chords: [dm7, g7, cmaj7],
};
