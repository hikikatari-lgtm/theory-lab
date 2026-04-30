export type Voicing = {
  symbol: string;
  roman: string;
  degreesLabel: string;
  lh: string[];
  rh: { note: string; degree: string }[];
};

export type ChordsRowChord = Voicing & { id: string };

export type ChordsRowProgression = {
  id: string;
  label: string;
  subtitle: string;
  progressionLabel: string;
  displayMode: 'chords-row';
  tempo: number;
  key: string;
  chords: ChordsRowChord[];
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
};

export type Progression = ChordsRowProgression | BarsGridProgression;

export type SequenceItem = {
  itemId: string;
  voicing: Voicing;
  beats: number;
};
