import { fourOneFiveSix } from './four-one-five-six';
import { sixFourFiveOne } from './six-four-five-one';
import { justTheWayYouAre } from './just-the-way-you-are';
import { sounan } from './sounan';
import type { ArrangePreset } from './types';

export const PRESETS: Record<string, ArrangePreset> = {
  'four-one-five-six': fourOneFiveSix,
  'six-four-five-one': sixFourFiveOne,
  'just-the-way-you-are': justTheWayYouAre,
  sounan: sounan,
};

export const PRESET_LIST: ReadonlyArray<{ id: string; label: string }> = [
  { id: 'four-one-five-six', label: '4156 Progression (Key C)' },
  { id: 'six-four-five-one', label: '6451 Progression (Key C)' },
  { id: 'just-the-way-you-are', label: 'Just The Way You Are (Key C)' },
  { id: 'sounan', label: '遭難 / 椎名林檎 (Key Am)' },
];

export const DEFAULT_PRESET_ID = 'four-one-five-six';

export type {
  ArrangePreset,
  ArrangeVersion,
  ArrangeChord,
  ArrangeChordSlot,
  ArrangeBar,
  ArrangeNote,
} from './types';
