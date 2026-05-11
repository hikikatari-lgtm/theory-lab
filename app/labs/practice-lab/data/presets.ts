// Practice Lab presets.
//
// Each preset is a chord progression laid out as a sequence of bars. Inside a
// bar, one or more chords share the bar's beats — the `beats` field is the
// number of quarter-note beats that chord occupies. The sum of `beats` within
// a bar must equal `beatsPerBar`.
//
// Future extension: tracks can carry an MP3 URL and optional per-chord
// `timestampSec` for tempo-free audio sync. For the prototype, the metronome
// is the clock and `tempo` (BPM) drives everything.

export type Chord = {
  roman: string;
  symbol: string;
  beats: number;
};

export type Bar = {
  chords: Chord[];
};

export type Preset = {
  id: string;
  name: string;
  key: string;
  tempo: number;
  beatsPerBar: number;
  bars: Bar[];
  /** Optional future field: MP3 backing track URL. */
  audioUrl?: string;
};

export const PRESETS: Preset[] = [
  {
    id: 'ii-v-i-practice-c',
    name: 'ii-V-I Practice (Key C)',
    key: 'C',
    tempo: 120,
    beatsPerBar: 4,
    bars: [
      { chords: [{ roman: 'IIm7', symbol: 'Dm7', beats: 4 }] },
      { chords: [{ roman: 'V7', symbol: 'G7', beats: 4 }] },
      { chords: [{ roman: 'Imaj7', symbol: 'Cmaj7', beats: 4 }] },
      { chords: [{ roman: 'Imaj7', symbol: 'Cmaj7', beats: 4 }] },
      { chords: [{ roman: 'IIm7', symbol: 'Dm7', beats: 4 }] },
      { chords: [{ roman: 'V7', symbol: 'G7', beats: 4 }] },
      {
        chords: [
          { roman: 'Imaj7', symbol: 'Cmaj7', beats: 2 },
          { roman: 'VI7', symbol: 'A7', beats: 2 },
        ],
      },
      {
        chords: [
          { roman: 'IIm7', symbol: 'Dm7', beats: 2 },
          { roman: 'V7', symbol: 'G7', beats: 2 },
        ],
      },
    ],
  },
];

export const DEFAULT_PRESET_ID = PRESETS[0].id;

export function getPreset(id: string): Preset {
  return PRESETS.find((p) => p.id === id) ?? PRESETS[0];
}
