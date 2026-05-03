import { minorTurnaround } from './minor-turnaround';
import { minorCadenceCycle } from './minor-cadence-cycle';
import { blueBossa } from './blue-bossa';
import { autumnLeaves } from './autumn-leaves';
import { bodyAndSoul } from './body-and-soul';
import { blueInGreen } from './blue-in-green';
import { soWhat } from './so-what';
import { misty } from './misty';
import { flyMeToTheMoon } from './fly-me-to-the-moon';
import { takeFive } from './take-five';
import { fBlues } from './f-blues';
import { twoFiveOne } from './two-five-one';
import { twoFiveOneAltered } from './two-five-one-altered';
import { minorTwoFiveOne } from './minor-two-five-one';
import { minorTwoFiveOneAltered } from './minor-two-five-one-altered';
import { maj9Voicing } from './maj9-voicing';
import { m11Voicing } from './m11-voicing';
import { over } from './over';
import { virtualInsanity } from './virtual-insanity';
import type { Progression, ProgressionGroup, SequenceItem } from './types';

export const PROGRESSIONS: Record<string, Progression> = {
  'two-five-one': twoFiveOne,
  'two-five-one-altered': twoFiveOneAltered,
  'minor-two-five-one': minorTwoFiveOne,
  'minor-two-five-one-altered': minorTwoFiveOneAltered,
  'maj9-voicing': maj9Voicing,
  'm11-voicing': m11Voicing,
  'minor-turnaround': minorTurnaround,
  'minor-cadence-cycle': minorCadenceCycle,
  'blue-bossa': blueBossa,
  'autumn-leaves': autumnLeaves,
  'body-and-soul': bodyAndSoul,
  'blue-in-green': blueInGreen,
  'so-what': soWhat,
  'misty': misty,
  'fly-me-to-the-moon': flyMeToTheMoon,
  'take-five': takeFive,
  'f-blues': fBlues,
  'over': over,
  'virtual-insanity': virtualInsanity,
};

// Order matters: structural progressions first, then song-style. Group
// is surfaced for the dropdown's <optgroup>; entries without an explicit
// group default to '楽曲系' at the UI layer.
export const PROGRESSION_LIST: ReadonlyArray<{
  id: string;
  label: string;
  group: ProgressionGroup;
}> = [
  { id: 'two-five-one',         label: '251 Voicing',            group: '構造系' },
  { id: 'two-five-one-altered', label: '251 Altered Voicing',    group: '構造系' },
  { id: 'minor-two-five-one',         label: 'Minor 251 Voicing',         group: '構造系' },
  { id: 'minor-two-five-one-altered', label: 'Minor 251 Altered Voicing', group: '構造系' },
  { id: 'maj9-voicing',         label: 'Maj9 Voicing',           group: '構造系' },
  { id: 'm11-voicing',          label: 'm11 Voicing',            group: '構造系' },
  { id: 'minor-turnaround',     label: 'Minor Turnaround in Cm', group: '楽曲系' },
  { id: 'minor-cadence-cycle',  label: 'Minor Cadence Cycle',    group: '楽曲系' },
  { id: 'blue-bossa',           label: 'Blue Bossa',             group: '楽曲系' },
  { id: 'autumn-leaves',        label: 'Autumn Leaves',          group: '楽曲系' },
  { id: 'body-and-soul',        label: 'Body And Soul',          group: '楽曲系' },
  { id: 'blue-in-green',        label: 'Blue In Green - Bill Evans', group: '楽曲系' },
  { id: 'so-what',              label: 'So What - Miles Davis',  group: '楽曲系' },
  { id: 'misty',                label: 'Misty - Erroll Garner',  group: '楽曲系' },
  { id: 'fly-me-to-the-moon',   label: 'Fly Me To The Moon',     group: '楽曲系' },
  { id: 'take-five',            label: 'Take Five - Paul Desmond (5/4)', group: '楽曲系' },
  { id: 'f-blues',              label: 'F Blues Rootless',       group: '楽曲系' },
  { id: 'over',                 label: 'Over / Robert Glasper',     group: '楽曲系' },
  { id: 'virtual-insanity',     label: 'Virtual Insanity / Jamiroquai', group: '楽曲系' },
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
  ProgressionGroup,
  Bar,
  SequenceItem,
} from './types';
