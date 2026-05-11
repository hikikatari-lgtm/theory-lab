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
  /** MP3 backing track URL (relative to /public, e.g. "/audio/foo.mp3"). */
  audioUrl?: string;
  /**
   * Seconds into the MP3 where the first beat of the progression lands.
   * The metronome count-in starts at `audioStartSec - countInDuration`
   * so that the audio and chord display line up at beat 1.
   * Defaults to 0.
   */
  audioStartSec?: number;
};

export const PRESETS: Preset[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // Isn't She Lovely — Stevie Wonder (Songs in the Key of Life, 1976)
  // Fake-book / play-along version: Eb major, Rock Shuffle ♩=131
  //
  // Structure (14-bar head):
  //   A (1-8):   VIm7 → II7 → V7sus → Imaj7  ×2
  //   B (9-14):  IVmaj7 → III7(♭9) → VIm7 → II7 → V7sus → I
  //
  // II7  = F7  (V/V — secondary dominant pulling to Bb7sus)
  // III7 = G7♭9 (V/vi — secondary dominant pulling back to Cm7)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'isnt-she-lovely-eb',
    name: "Isn't She Lovely (Key E♭)",
    key: 'E♭',
    tempo: 131,
    beatsPerBar: 4,
    audioUrl: '/audio/isnt-she-lovely.mp3',
    // The audio file has ~0.3s of silence + 2 bars (8 beats) of count-in
    // at 131 BPM before the chord progression starts.
    // audioStartSec = 0.319 + 8 × (60/131) ≈ 3.98s
    audioStartSec: 3.98,
    bars: [
      // A section (8 bars) ─────────────────────────────────────
      { chords: [{ roman: 'VIm7',     symbol: 'Cm7',    beats: 4 }] },
      { chords: [{ roman: 'II7',      symbol: 'F7',     beats: 4 }] },
      { chords: [{ roman: 'V7sus',    symbol: 'B♭7sus', beats: 4 }] },
      { chords: [{ roman: 'Imaj7',    symbol: 'E♭maj7', beats: 4 }] },
      { chords: [{ roman: 'VIm7',     symbol: 'Cm7',    beats: 4 }] },
      { chords: [{ roman: 'II7',      symbol: 'F7',     beats: 4 }] },
      { chords: [{ roman: 'V7sus',    symbol: 'B♭7sus', beats: 4 }] },
      { chords: [{ roman: 'Imaj7',    symbol: 'E♭maj7', beats: 4 }] },
      // B section / Bridge (6 bars) ────────────────────────────
      { chords: [{ roman: 'IVmaj7',   symbol: 'A♭maj7', beats: 4 }] },
      { chords: [{ roman: 'III7(♭9)', symbol: 'G7(♭9)', beats: 4 }] },
      { chords: [{ roman: 'VIm7',     symbol: 'Cm7',    beats: 4 }] },
      { chords: [{ roman: 'II7',      symbol: 'F7',     beats: 4 }] },
      { chords: [{ roman: 'V7sus',    symbol: 'B♭7sus', beats: 4 }] },
      { chords: [{ roman: 'I',        symbol: 'E♭',     beats: 4 }] },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────────
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
