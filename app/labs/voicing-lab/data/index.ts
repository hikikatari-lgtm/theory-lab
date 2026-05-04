import { minorTurnaround } from './minor-turnaround';
import { minorCadenceCycle } from './minor-cadence-cycle';
import { minorCadenceCycleExtended } from './minor-cadence-cycle-extended';
import { blueBossa } from './blue-bossa';
import { autumnLeaves } from './autumn-leaves';
import { allTheThingsYouAre } from './all-the-things-you-are';
import { bodyAndSoul } from './body-and-soul';
import { blueInGreen } from './blue-in-green';
import { soWhat } from './so-what';
import { solar } from './solar';
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
  'minor-cadence-cycle-extended': minorCadenceCycleExtended,
  'blue-bossa': blueBossa,
  'autumn-leaves': autumnLeaves,
  'all-the-things-you-are': allTheThingsYouAre,
  'body-and-soul': bodyAndSoul,
  'blue-in-green': blueInGreen,
  'so-what': soWhat,
  'solar': solar,
  'misty': misty,
  'fly-me-to-the-moon': flyMeToTheMoon,
  'take-five': takeFive,
  'f-blues': fBlues,
  'over': over,
  'virtual-insanity': virtualInsanity,
};

// Source-of-truth list for the dropdown. The display order in the UI is
// derived from this list's `group` field plus an alphabetical sort
// inside each group (handled by ProgressionSelector); list order here is
// not what the user sees, so entries are grouped only for code-reading
// clarity.
export const PROGRESSION_LIST: ReadonlyArray<{
  id: string;
  label: string;
  group: ProgressionGroup;
}> = [
  // structure — single-chord voicings
  { id: 'maj9-voicing',         label: 'Maj9 Voicing',           group: 'structure' },
  { id: 'm11-voicing',          label: 'm11 Voicing',            group: 'structure' },
  // progression — generic jazz patterns (251 family, blues, turnarounds)
  { id: 'two-five-one',               label: '251 Voicing',               group: 'progression' },
  { id: 'two-five-one-altered',       label: '251 Altered Voicing',       group: 'progression' },
  { id: 'minor-two-five-one',         label: 'Minor 251 Voicing',         group: 'progression' },
  { id: 'minor-two-five-one-altered', label: 'Minor 251 Altered Voicing', group: 'progression' },
  { id: 'minor-turnaround',     label: 'Minor Turnaround in Cm', group: 'progression' },
  { id: 'minor-cadence-cycle',  label: 'Minor Cadence Cycle',    group: 'progression' },
  { id: 'minor-cadence-cycle-extended', label: 'Minor Cadence Cycle Extended', group: 'progression' },
  { id: 'f-blues',              label: 'F Blues Rootless',       group: 'progression' },
  // tune — full transcribed standards
  { id: 'all-the-things-you-are', label: 'All The Things You Are - Jerome Kern', group: 'tune' },
  { id: 'autumn-leaves',        label: 'Autumn Leaves',          group: 'tune' },
  { id: 'blue-bossa',           label: 'Blue Bossa',             group: 'tune' },
  { id: 'blue-in-green',        label: 'Blue In Green - Bill Evans',     group: 'tune' },
  { id: 'body-and-soul',        label: 'Body And Soul',          group: 'tune' },
  { id: 'fly-me-to-the-moon',   label: 'Fly Me To The Moon',     group: 'tune' },
  { id: 'misty',                label: 'Misty - Erroll Garner',  group: 'tune' },
  { id: 'over',                 label: 'Over / Robert Glasper',  group: 'tune' },
  { id: 'so-what',              label: 'So What - Miles Davis',  group: 'tune' },
  { id: 'solar',                label: 'Solar - Miles Davis',    group: 'tune' },
  { id: 'take-five',            label: 'Take Five - Paul Desmond (5/4)', group: 'tune' },
  { id: 'virtual-insanity',     label: 'Virtual Insanity / Jamiroquai',  group: 'tune' },
];

export const DEFAULT_PROGRESSION_ID = 'minor-turnaround';

// Flatten the progression's display structure into a linear sequence used by
// Walk Through and the keyboard's prev-chord lookup. For chords-row each
// chord becomes one item (4 beats); for bars-grid each cell becomes an item
// with the cell's own beat count, so a 1-bar 2-chord measure expands to
// two items with beats=2 each. Phase 6 adds optional walkingBass / rhythm
// pass-through for the player's mode-aware playback.
export function buildSequence(prog: Progression): SequenceItem[] {
  if (prog.displayMode === 'chords-row') {
    return prog.chords.map((c) => ({
      itemId: c.id,
      voicing: c,
      beats: 4,
      walkingBass: c.walkingBass,
      rhythm: c.rhythm,
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
        walkingBass: c.walkingBass,
        rhythm: c.rhythm,
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
  BarsGridVariantData,
  Progression,
  ProgressionGroup,
  Bar,
  BarChord,
  SequenceItem,
  WalkingBassInfo,
  WalkingBassPattern,
  RhythmInfo,
  RhythmPattern,
  Section,
} from './types';
