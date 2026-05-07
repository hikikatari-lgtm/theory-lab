import { dropTwo251C } from './drop2-251-c';
import type { DropTwoProgression } from './types';

export const DROP_TWO_PROGRESSIONS: Record<string, DropTwoProgression> = {
  'drop2-251-c': dropTwo251C,
};

export const DEFAULT_DROP_TWO_PROGRESSION_ID = 'drop2-251-c';

export type {
  VoicingNote,
  DropTwoStepIndex,
  DropTwoStepVoicing,
  DropTwoChord,
  DropTwoProgression,
} from './types';
export { DROP_TWO_STEP_INDICES, DROP_TWO_STEP_LABELS } from './types';
