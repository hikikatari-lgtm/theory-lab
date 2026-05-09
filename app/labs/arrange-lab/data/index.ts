import { fourOneFiveSix } from './four-one-five-six';
import type { ArrangePreset } from './types';

export const PRESETS: Record<string, ArrangePreset> = {
  'four-one-five-six': fourOneFiveSix,
};

export const PRESET_LIST: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'four-one-five-six', label: '4156 Progression (Key C)' },
];

export const DEFAULT_PRESET_ID = 'four-one-five-six';

export type {
  ArrangePreset,
  ArrangeVersion,
  ArrangeChord,
  ArrangeNote,
} from './types';
