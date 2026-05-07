// Types are local to Drop 2 Lab so this Lab can evolve independently of
// Voicing Lab. The shapes mirror Voicing Lab's `Voicing` for visual
// compatibility (same keyboard component, same card layout) but Drop 2
// Lab adds a 4-step axis: each chord carries `steps[1..4]`, and the UI
// picks the active step at render time.

export type VoicingNote = { note: string; degree: string };

export type DropTwoStepIndex = 1 | 2 | 3 | 4;

export type DropTwoStepVoicing = {
  lh: VoicingNote[];
  rh: VoicingNote[];
};

export type DropTwoChord = {
  id: string;
  symbol: string;
  roman: string;
  // degreesLabel describes the chord's harmonic content (which scale
  // degrees are present), not the per-step distribution between hands.
  // It stays constant across steps so the chord card label matches the
  // existing 251 Voicing pedagogy.
  degreesLabel: string;
  steps: Record<DropTwoStepIndex, DropTwoStepVoicing>;
};

export type DropTwoProgression = {
  id: string;
  label: string;
  subtitle: string;
  progressionLabel: string;
  tempo: number;
  key: string;
  chords: DropTwoChord[];
};

export const DROP_TWO_STEP_INDICES: ReadonlyArray<DropTwoStepIndex> = [1, 2, 3, 4];

export const DROP_TWO_STEP_LABELS: Record<DropTwoStepIndex, { title: string; description: string }> = {
  1: { title: 'Step 1', description: '基本形 (LH: R / RH: rootless voicing)' },
  2: { title: 'Step 2', description: '両手化 (RH 上から2番目を1オクターブ下げて LH に追加)' },
  3: { title: 'Step 3', description: '右手抜き (LH に移した音を RH から削除 = Drop 2 完成)' },
  4: { title: 'Step 4', description: 'R 抜き (true rootless drop 2)' },
};
