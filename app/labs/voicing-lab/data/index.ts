import { minorTurnaround } from './minor-turnaround';
import { minorCadenceCycle } from './minor-cadence-cycle';
import { minorCadenceCycleExtended } from './minor-cadence-cycle-extended';
import { blueBossa } from './blue-bossa';
import { autumnLeaves } from './autumn-leaves';
import { allTheThingsYouAre } from './all-the-things-you-are';
import { africaDangelo } from './africa-dangelo';
import { asStevie } from './as-stevie';
import { beautifulLove } from './beautiful-love';
import { bestPart } from './best-part';
import { blackOrpheus } from './black-orpheus';
import { bodyAndSoul } from './body-and-soul';
import { howInsensitive } from './how-insensitive';
import { isntSheLovely } from './isnt-she-lovely';
import { itRunsThroughMe } from './it-runs-through-me';
import { lately } from './lately';
import { overjoyed } from './overjoyed';
import { ribbonInTheSky } from './ribbon-in-the-sky';
import { soBeautifulGlasper } from './so-beautiful-glasper';
import { stellaByStarlight } from './stella-by-starlight';
import { tadow } from './tadow';
import { thereWillNeverBeAnotherYou } from './there-will-never-be-another-you';
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
import { billEvansStyleM251 } from './bill-evans-style-m251';
import { unlimitedPattern1C } from './unlimited-pattern-1-c';
import { unlimitedPattern2C } from './unlimited-pattern-2-c';
import { unlimitedPattern3C } from './unlimited-pattern-3-c';
import { unlimitedPattern4C } from './unlimited-pattern-4-c';
import { dirty2536 } from './dirty-2536';
import { neoSoulChords } from './neo-soul-chords';
import { soWhatQuartal } from './so-what-quartal';
import type {
  Progression,
  ProgressionGroup,
  SequenceItem,
  SongSubgenre,
} from './types';

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
  'africa-dangelo': africaDangelo,
  'as-stevie': asStevie,
  'beautiful-love': beautifulLove,
  'best-part': bestPart,
  'black-orpheus': blackOrpheus,
  'body-and-soul': bodyAndSoul,
  'how-insensitive': howInsensitive,
  'isnt-she-lovely': isntSheLovely,
  'it-runs-through-me': itRunsThroughMe,
  'lately': lately,
  'overjoyed': overjoyed,
  'ribbon-in-the-sky': ribbonInTheSky,
  'so-beautiful-glasper': soBeautifulGlasper,
  'stella-by-starlight': stellaByStarlight,
  'tadow': tadow,
  'there-will-never-be-another-you': thereWillNeverBeAnotherYou,
  'blue-in-green': blueInGreen,
  'so-what': soWhat,
  'solar': solar,
  'misty': misty,
  'fly-me-to-the-moon': flyMeToTheMoon,
  'take-five': takeFive,
  'f-blues': fBlues,
  'over': over,
  'virtual-insanity': virtualInsanity,
  'bill-evans-style-m251': billEvansStyleM251,
  'unlimited-pattern-1-c': unlimitedPattern1C,
  'unlimited-pattern-2-c': unlimitedPattern2C,
  'unlimited-pattern-3-c': unlimitedPattern3C,
  'unlimited-pattern-4-c': unlimitedPattern4C,
  'dirty-2536': dirty2536,
  'neo-soul-chords': neoSoulChords,
  'so-what-quartal': soWhatQuartal,
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
  // Only set when group === 'tune'. Drives the 3-way subgenre split
  // (Jazz Standards / R&B / Neo Soul / Stevie Wonder) inside the
  // dropdown's 楽曲系 section. Tunes without subgenre fall into a
  // fallback "その他" optgroup at the bottom (defensive — should never
  // trigger if the library is fully classified).
  subgenre?: SongSubgenre;
}> = [
  // structure — single-chord voicings
  { id: 'maj9-voicing',         label: 'Maj9 Voicing',           group: 'structure' },
  { id: 'm11-voicing',          label: 'm11 Voicing',            group: 'structure' },
  { id: 'so-what-quartal',      label: 'So What Voicings (C Dorian)', group: 'structure' },
  // progression — generic jazz patterns (251 family, blues, turnarounds)
  { id: 'two-five-one',               label: '251 Voicing',               group: 'progression' },
  { id: 'two-five-one-altered',       label: '251 Altered Voicing',       group: 'progression' },
  { id: 'minor-two-five-one',         label: 'Minor 251 Voicing',         group: 'progression' },
  { id: 'minor-two-five-one-altered', label: 'Minor 251 Altered Voicing', group: 'progression' },
  { id: 'bill-evans-style-m251',      label: 'Bill Evans Style Minor 251 Voicing', group: 'progression' },
  // UNLIMITED Chord Patterns (PrettyPiano Drop 2 & 3 Number System) —
  // Phase Drop2&3 PR 1: Cキー単体。PR 2 で 12 キー化予定。
  { id: 'unlimited-pattern-1-c',      label: 'UNLIMITED Pattern 1 (I-iii-IV)',    group: 'progression' },
  { id: 'unlimited-pattern-2-c',      label: 'UNLIMITED Pattern 2 (IV-V-vi)',     group: 'progression' },
  { id: 'unlimited-pattern-3-c',      label: 'UNLIMITED Pattern 3 (vi-I-vii°)',   group: 'progression' },
  { id: 'unlimited-pattern-4-c',      label: 'UNLIMITED Pattern 4 (I-iii-ii-I)',  group: 'progression' },
  { id: 'minor-turnaround',     label: 'Minor Turnaround in Cm', group: 'progression' },
  { id: 'minor-cadence-cycle',  label: 'Minor Cadence Cycle',    group: 'progression' },
  { id: 'minor-cadence-cycle-extended', label: 'Minor Cadence Cycle Extended', group: 'progression' },
  { id: 'f-blues',              label: 'F Blues Rootless',       group: 'progression' },
  // tune — full transcribed standards. `subgenre` controls the
  // 3-way split inside the 楽曲系 dropdown section.
  { id: 'africa-dangelo',       label: "Africa - D'Angelo",      group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'all-the-things-you-are', label: 'All The Things You Are - Jerome Kern', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'as-stevie',            label: 'As - Stevie Wonder',     group: 'tune', subgenre: 'stevie-wonder' },
  { id: 'autumn-leaves',        label: 'Autumn Leaves',          group: 'tune', subgenre: 'jazz-standards' },
  { id: 'beautiful-love',       label: 'Beautiful Love - Wayne King', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'best-part',            label: 'Best Part - H.E.R. / Daniel Caesar', group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'black-orpheus',        label: 'Black Orpheus - Luiz Bonfá', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'blue-bossa',           label: 'Blue Bossa',             group: 'tune', subgenre: 'jazz-standards' },
  { id: 'blue-in-green',        label: 'Blue In Green - Bill Evans',     group: 'tune', subgenre: 'jazz-standards' },
  { id: 'body-and-soul',        label: 'Body And Soul',          group: 'tune', subgenre: 'jazz-standards' },
  { id: 'dirty-2536',           label: 'Dirty 2536 in C / iVerza', group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'fly-me-to-the-moon',   label: 'Fly Me To The Moon',     group: 'tune', subgenre: 'jazz-standards' },
  { id: 'how-insensitive',      label: 'How Insensitive - Antonio Carlos Jobim', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'isnt-she-lovely',      label: "Isn't She Lovely - Stevie Wonder", group: 'tune', subgenre: 'stevie-wonder' },
  { id: 'it-runs-through-me',   label: 'It Runs Through Me - Tom Misch', group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'lately',               label: 'Lately - Stevie Wonder', group: 'tune', subgenre: 'stevie-wonder' },
  { id: 'misty',                label: 'Misty - Erroll Garner',  group: 'tune', subgenre: 'jazz-standards' },
  { id: 'neo-soul-chords',      label: 'Neo Soul Chords / Piano Peak Academy', group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'over',                 label: 'Over / Robert Glasper',  group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'overjoyed',            label: 'Overjoyed - Stevie Wonder', group: 'tune', subgenre: 'stevie-wonder' },
  { id: 'ribbon-in-the-sky',    label: 'Ribbon in the Sky - Stevie Wonder', group: 'tune', subgenre: 'stevie-wonder' },
  { id: 'so-beautiful-glasper', label: 'So Beautiful - Robert Glasper', group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'so-what',              label: 'So What - Miles Davis',  group: 'tune', subgenre: 'jazz-standards' },
  { id: 'solar',                label: 'Solar - Miles Davis',    group: 'tune', subgenre: 'jazz-standards' },
  { id: 'stella-by-starlight',  label: 'Stella By Starlight - Victor Young', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'tadow',                label: 'Tadow - FKJ × Masego',   group: 'tune', subgenre: 'rnb-neo-soul' },
  { id: 'take-five',            label: 'Take Five - Paul Desmond (5/4)', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'there-will-never-be-another-you', label: 'There Will Never Be Another You - Harry Warren', group: 'tune', subgenre: 'jazz-standards' },
  { id: 'virtual-insanity',     label: 'Virtual Insanity / Jamiroquai',  group: 'tune', subgenre: 'rnb-neo-soul' },
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
  AnchorMode,
  AnchorDefinition,
  ThreeAnchorViewConfig,
  SongSubgenre,
  SubgenreMeta,
} from './types';
export { SONG_SUBGENRES } from './types';
