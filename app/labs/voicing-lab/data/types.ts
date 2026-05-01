export type Voicing = {
  symbol: string;
  roman: string;
  degreesLabel: string;
  lh: string[];
  rh: { note: string; degree: string }[];
};

export type ChordsRowChord = Voicing & { id: string };

export type ProgressionGroup = '構造系' | '楽曲系';

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

export type Bar = {
  number: number;
  chords: { key: string; beats: number }[];
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
  // Present here for union-type symmetry; bars-grid progressions don't
  // currently use it (no transposition / no variants).
  baseKey?: string;
};

export type Progression = ChordsRowProgression | BarsGridProgression;

export type SequenceItem = {
  itemId: string;
  voicing: Voicing;
  beats: number;
};
