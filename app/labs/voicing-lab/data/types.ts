// LH and RH share the same shape so the keyboard can render both with
// note name + degree label. Existing single-bass-note voicings (251,
// minor turnaround, F blues) use [{ note: 'C2', degree: 'R' }]; the new
// multi-note LH voicings (Maj9, m11) carry full chord-tone degrees.
export type VoicingNote = { note: string; degree: string };

export type Voicing = {
  symbol: string;
  roman: string;
  degreesLabel: string;
  lh: VoicingNote[];
  rh: VoicingNote[];
};

// Phase 6: optional playback enrichment attached per chord-event.
// `pattern` is a pedagogical label (so the UI can describe what's
// playing); `notes` / `hits` are the explicit data the player consumes.
//
// Walking bass: one bass note per beat for the duration of this chord
// event. The player overrides the LH with these notes when the
// "Walking Bass" mode is on.
export type WalkingBassPattern = 'ascending' | 'broken_1_5_8' | 'approach';
export type WalkingBassInfo = {
  pattern: WalkingBassPattern;
  notes: string[];
};

// Rhythm: 0-indexed beat positions where the RH chord is struck.
// Example: hits = [0, 1.5] in a 4-beat bar means strike on beat 1
// (downbeat) and on the upbeat of beat 2 — Rhythm A from the spec.
// The player fires a short staccato attack at each position when the
// "Rhythm" mode is on.
export type RhythmPattern = 'A' | 'B' | 'C' | 'D';
export type RhythmInfo = {
  pattern: RhythmPattern;
  hits: number[];
};

export type ChordsRowChord = Voicing & {
  id: string;
  walkingBass?: WalkingBassInfo;
  rhythm?: RhythmInfo;
};

// Three buckets for the progression dropdown:
//   - structure:   single-chord voicings (Maj9, m11) — "1 コードの響き"
//   - progression: generic jazz patterns not tied to a specific tune
//                  (251 family, blues, turnarounds, cadence cycles)
//   - tune:        full transcribed pieces from the standards repertoire
// The strings are English keys for code; the Japanese display labels
// (🔧 構造系 / 🔁 進行系 / 🎵 楽曲系) live in ProgressionSelector.tsx.
export type ProgressionGroup = 'structure' | 'progression' | 'tune';

export type ChordsRowProgression = {
  id: string;
  label: string;
  subtitle: string;
  progressionLabel: string;
  displayMode: 'chords-row';
  tempo: number;
  key: string;
  chords: ChordsRowChord[];
  // Optional metadata for structural progressions (e.g. 251). Existing
  // song-style progressions leave these unset.
  group?: ProgressionGroup;
  supportsAllKeys?: boolean;
  hasVariants?: boolean;
  baseKey?: string;
  variants?: { a: ChordsRowChord[]; b: ChordsRowChord[] };
};

export type BarChord = {
  key: string;
  beats: number;
  walkingBass?: WalkingBassInfo;
  rhythm?: RhythmInfo;
};

export type Bar = {
  number: number;
  chords: BarChord[];
};

// Phase post-Phase 8a UX improvement: split long bars-grid progressions
// into musical sections (A / A' / B / A'' etc.) so the user can switch
// between sections via tabs instead of scrolling. Walk Through still
// plays the entire progression — sections are display-only, with the
// active tab auto-switching as playback advances through the bars.
//
// barRange is inclusive on both ends, e.g. [1, 8] means bars 1 through 8.
// Optional — bars-grid progressions without sections render the full
// progression as before (backwards-compatible).
export type Section = {
  name: string;
  label: string;
  barRange: [number, number];
};

// Phase 7-α follow-up: bars-grid progressions can opt into a 2-variant
// toggle (analogous to ChordsRowProgression's `variants: { a, b }`).
// When the user flips the variant, BOTH the voicings dict and the bars
// array swap — so a variant can introduce new chord keys (e.g. G7s9b13
// for the substitutions version of the V7 chord) without forcing the
// other variant to know about them.
export type BarsGridVariantData = {
  voicings: Record<string, Voicing>;
  bars: Bar[];
};

export type BarsGridProgression = {
  id: string;
  label: string;
  subtitle: string;
  progressionLabel: string;
  displayMode: 'bars-grid';
  tempo: number;
  key: string;
  voicings: Record<string, Voicing>;
  bars: Bar[];
  group?: ProgressionGroup;
  // Optional 2-variant toggle. When `hasVariants` is true and `variants`
  // is set, the player swaps to `variants[type]` instead of using the
  // top-level `voicings`/`bars` (which then act as a fallback default).
  hasVariants?: boolean;
  variants?: { a: BarsGridVariantData; b: BarsGridVariantData };
  // Optional section list for tab-based UI. Currently used by long
  // standards (Autumn Leaves / Body And Soul / All The Things You Are)
  // to expose A/A'/B/A'' segments without forcing the user to scroll.
  sections?: Section[];
  // Present here for union-type symmetry; bars-grid progressions don't
  // currently use it (no transposition).
  baseKey?: string;
};

export type Progression = ChordsRowProgression | BarsGridProgression;

export type SequenceItem = {
  itemId: string;
  voicing: Voicing;
  beats: number;
  walkingBass?: WalkingBassInfo;
  rhythm?: RhythmInfo;
};
