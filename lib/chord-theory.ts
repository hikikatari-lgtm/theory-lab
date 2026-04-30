export type Key = {
  name: string;
  root: string;
  rootMidi: number;
  display: string;
  useFlats: boolean;
};

export const KEYS: Key[] = [
  { name: 'C',   root: 'C',  rootMidi: 0,  display: 'C',   useFlats: false },
  { name: 'D♭',  root: 'C#', rootMidi: 1,  display: 'D♭',  useFlats: true  },
  { name: 'D',   root: 'D',  rootMidi: 2,  display: 'D',   useFlats: false },
  { name: 'E♭',  root: 'D#', rootMidi: 3,  display: 'E♭',  useFlats: true  },
  { name: 'E',   root: 'E',  rootMidi: 4,  display: 'E',   useFlats: false },
  { name: 'F',   root: 'F',  rootMidi: 5,  display: 'F',   useFlats: true  },
  { name: 'F♯',  root: 'F#', rootMidi: 6,  display: 'F♯',  useFlats: false },
  { name: 'G',   root: 'G',  rootMidi: 7,  display: 'G',   useFlats: false },
  { name: 'A♭',  root: 'G#', rootMidi: 8,  display: 'A♭',  useFlats: true  },
  { name: 'A',   root: 'A',  rootMidi: 9,  display: 'A',   useFlats: false },
  { name: 'B♭',  root: 'A#', rootMidi: 10, display: 'B♭',  useFlats: true  },
  { name: 'B',   root: 'B',  rootMidi: 11, display: 'B',   useFlats: false },
];

export const SHARP_NAMES = ['C','C♯','D','D♯','E','F','F♯','G','G♯','A','A♯','B'];
export const FLAT_NAMES  = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];

export function midiToName(midi: number, useFlats: boolean): string {
  const i = ((midi % 12) + 12) % 12;
  return useFlats ? FLAT_NAMES[i] : SHARP_NAMES[i];
}

export type Degree = { deg: string; jp: string };
export type ChordMode = 'major' | 'minor' | 'tension';
export type UpperType = 'major' | 'minor' | 'dom7';

export type ChordStructure = {
  upperLabel: [string, string];
  result: string;
  upperRootSemitone: number;
  upperType: UpperType;
  semitones: number[];
  degrees: Degree[];
};

export const CHORD_STRUCTURES: Record<ChordMode, ChordStructure[]> = {
  major: [
    {
      upperLabel: ['', 'm'], result: 'M7',
      upperRootSemitone: 4, upperType: 'minor',
      semitones: [4, 7, 11],
      degrees: [{ deg: '3', jp: '長3度' }, { deg: '5', jp: '完5度' }, { deg: '7', jp: '長7度' }],
    },
    {
      upperLabel: ['', ''], result: 'M9',
      upperRootSemitone: 7, upperType: 'major',
      semitones: [7, 11, 14],
      degrees: [{ deg: '5', jp: '完5度' }, { deg: '7', jp: '長7度' }, { deg: '9', jp: '長9度' }],
    },
    {
      upperLabel: ['', 'm'], result: '9',
      upperRootSemitone: 7, upperType: 'minor',
      semitones: [7, 10, 14],
      degrees: [{ deg: '5', jp: '完5度' }, { deg: '♭7', jp: '短7度' }, { deg: '9', jp: '長9度' }],
    },
    {
      upperLabel: ['', 'm'], result: '13',
      upperRootSemitone: 14, upperType: 'minor',
      semitones: [14, 17, 21],
      degrees: [{ deg: '9', jp: '長9度' }, { deg: '11', jp: '完11度' }, { deg: '13', jp: '長13度' }],
    },
    {
      upperLabel: ['', 'm'], result: 'M7♯11',
      upperRootSemitone: 11, upperType: 'minor',
      semitones: [11, 14, 18],
      degrees: [{ deg: '7', jp: '長7度' }, { deg: '9', jp: '長9度' }, { deg: '♯11', jp: '増11度' }],
    },
    {
      upperLabel: ['', ''], result: '11',
      upperRootSemitone: 10, upperType: 'major',
      semitones: [10, 14, 17],
      degrees: [{ deg: '♭7', jp: '短7度' }, { deg: '9', jp: '長9度' }, { deg: '11', jp: '完11度' }],
    },
  ],
  minor: [
    {
      upperLabel: ['', ''], result: 'm7',
      upperRootSemitone: 3, upperType: 'major',
      semitones: [3, 7, 10],
      degrees: [{ deg: '♭3', jp: '短3度' }, { deg: '5', jp: '完5度' }, { deg: '♭7', jp: '短7度' }],
    },
    {
      upperLabel: ['', 'm'], result: 'm9',
      upperRootSemitone: 7, upperType: 'minor',
      semitones: [7, 10, 14],
      degrees: [{ deg: '5', jp: '完5度' }, { deg: '♭7', jp: '短7度' }, { deg: '9', jp: '長9度' }],
    },
    {
      upperLabel: ['', ''], result: 'm11',
      upperRootSemitone: 10, upperType: 'major',
      semitones: [10, 14, 17],
      degrees: [{ deg: '♭7', jp: '短7度' }, { deg: '9', jp: '長9度' }, { deg: '11', jp: '完11度' }],
    },
  ],
  tension: [
    {
      upperLabel: ['', ''], result: 'M7♯5',
      upperRootSemitone: 4, upperType: 'major',
      semitones: [4, 8, 11],
      degrees: [{ deg: '3', jp: '長3度' }, { deg: '♯5', jp: '増5度' }, { deg: '7', jp: '長7度' }],
    },
    {
      upperLabel: ['', ''], result: '13♭9',
      upperRootSemitone: 9, upperType: 'major',
      semitones: [9, 13, 16],
      degrees: [{ deg: '13', jp: '長13度' }, { deg: '♭9', jp: '短9度' }, { deg: '3', jp: '長3度' }],
    },
    {
      upperLabel: ['', '7'], result: '7(♭13)',
      upperRootSemitone: 10, upperType: 'dom7',
      semitones: [10, 14, 17, 20],
      degrees: [
        { deg: '♭7', jp: '短7度' },
        { deg: '9', jp: '長9度' },
        { deg: '11', jp: '完11度' },
        { deg: '♭13', jp: '短13度' },
      ],
    },
    {
      upperLabel: ['', ''], result: 'M13♯11',
      upperRootSemitone: 14, upperType: 'major',
      semitones: [14, 18, 21],
      degrees: [{ deg: '9', jp: '長9度' }, { deg: '♯11', jp: '増11度' }, { deg: '13', jp: '長13度' }],
    },
  ],
};

export type BuiltChord = {
  rootMidi: number;
  triadMidis: number[];
  structure: ChordStructure;
  mode: ChordMode;
};

export function buildChordForKey(
  structure: ChordStructure,
  keyRootMidi: number,
  mode: ChordMode
): BuiltChord {
  const lhMidi = 48 + keyRootMidi;
  const rhMidis = structure.semitones.map((s) => {
    let m = lhMidi + 12 + s;
    while (m > 83) m -= 12;
    while (m <= lhMidi) m += 12;
    return m;
  });
  return { rootMidi: lhMidi, triadMidis: rhMidis, structure, mode };
}

export function midiToToneName(midi: number): string {
  const oct = Math.floor(midi / 12) - 1;
  const i = midi % 12;
  return SHARP_NAMES[i].replace('♯', '#') + oct;
}

export function midiToKeyName(midi: number): string {
  return midiToToneName(midi);
}

export function getUpperTriadName(
  structure: ChordStructure,
  keyRootMidi: number,
  useFlats: boolean
): string {
  const upperRootMidi = (keyRootMidi + structure.upperRootSemitone) % 12;
  const rootName = midiToName(upperRootMidi, useFlats);
  const suffix =
    structure.upperType === 'minor' ? 'm' :
    structure.upperType === 'dom7'  ? '7' : '';
  return rootName + suffix;
}

export function getResultChordName(structure: ChordStructure, keyDisplay: string): string {
  return keyDisplay + structure.result;
}

const FLAT_TO_SHARP_PC: Record<string, string> = {
  Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#',
};

// "Eb4" → "D#4" — flat-with-octave normalized to the sharp form used by
// keyboard data-note attributes and by Tone.Sampler internally.
export function normalizeNote(note: string): string {
  const m = note.match(/^([A-G])(b|#)?(\d+)$/);
  if (!m) return note;
  const [, letter, accidental, oct] = m;
  if (accidental === 'b') {
    const flat = letter + 'b';
    if (FLAT_TO_SHARP_PC[flat]) return FLAT_TO_SHARP_PC[flat] + oct;
  }
  return note;
}

const WHITE_PCS = new Set([0, 2, 4, 5, 7, 9, 11]);

export function isWhiteKey(midi: number): boolean {
  return WHITE_PCS.has(((midi % 12) + 12) % 12);
}

export function ceilToWhite(midi: number): number {
  let m = midi;
  while (!isWhiteKey(m)) m++;
  return m;
}

export type PianoRange = { startMidi: number; endMidi: number };

// Snap to white-key boundaries with small buffer above/below the chord notes.
// Asymmetric on purpose: lower bound nudges into the chord by ~1 semitone (less wasted
// space on the bass side), upper bound is forced one white past maxMidi+2 (always extra
// air above the highest tension). Min span 1.5 octaves so white keys stay tappable.
export function computeMobileRange(midis: number[]): PianoRange {
  if (midis.length === 0) return { startMidi: 48, endMidi: 72 };
  const minNote = Math.min(...midis);
  const maxNote = Math.max(...midis);
  const startMidi = ceilToWhite(minNote - 2);
  let endMidi = ceilToWhite(maxNote + 3);
  while (endMidi - startMidi < 18) {
    endMidi = ceilToWhite(endMidi + 1);
  }
  return { startMidi, endMidi };
}
