import { minorTurnaround } from './minor-turnaround';
import { fBlues } from './f-blues';
import type { Progression, SequenceItem } from './types';

export const PROGRESSIONS: Record<string, Progression> = {
  'minor-turnaround': minorTurnaround,
  'f-blues': fBlues,
};

export const PROGRESSION_LIST = [
  { id: 'minor-turnaround', label: 'Minor Turnaround in Cm' },
  { id: 'f-blues',          label: 'F Blues Rootless' },
];

export const DEFAULT_PROGRESSION_ID = 'minor-turnaround';

// Flatten the progression's display structure into a linear sequence used by
// Walk Through and the keyboard's prev-chord lookup. For chords-row each
// chord becomes one item (4 beats); for bars-grid each cell becomes an item
// with the cell's own beat count, so a 1-bar 2-chord measure expands to
// two items with beats=2 each.
export function buildSequence(prog: Progression): SequenceItem[] {
  if (prog.displayMode === 'chords-row') {
    return prog.chords.map((c) => ({
      itemId: c.id,
      voicing: c,
      beats: 4,
    }));
  }
  const seq: SequenceItem[] = [];
  prog.bars.forEach((bar) => {
    bar.chords.forEach((c, idx) => {
      const voicing = prog.voicings[c.key];
      if (!voicing) return;
      seq.push({
        itemId: `bar${bar.number}-${idx}`,
        voicing,
        beats: c.beats,
      });
    });
  });
  return seq;
}

export type {
  Voicing,
  ChordsRowChord,
  ChordsRowProgression,
  BarsGridProgression,
  Progression,
  Bar,
  SequenceItem,
} from './types';
