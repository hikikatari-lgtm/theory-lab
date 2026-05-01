// Voicing Lab transposition helpers.
//
// Notes inside Voicing data use ASCII pitch class + octave (e.g. "Eb4",
// "F#5"). This module converts those to/from semitone indices, transposes
// upward by [0..11] semitones (with octave carry), and re-spells results
// according to the target key's KEY_NOTATION preference.
//
// Note on `normalizeNote` (lib/chord-theory.ts): that helper collapses
// flat names to their sharp equivalents for Tone.Sampler. Transposition
// happens BEFORE that step — display-side data goes through `transposeChord`
// (this file) for spelling, then `normalizeNote` is applied only when
// handing notes to the audio layer or to keyboard `data-note` lookups.

const NOTE_TO_SEMITONE: Record<string, number> = {
  C: 0,  'C#': 1,  Db: 1,
  D: 2,  'D#': 3,  Eb: 3,
  E: 4,
  F: 5,  'F#': 6,  Gb: 6,
  G: 7,  'G#': 8,  Ab: 8,
  A: 9,  'A#': 10, Bb: 10,
  B: 11,
};

const SEMITONE_TO_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const SEMITONE_TO_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export type Notation = 'sharp' | 'flat';

// Spelling preference per key. C is treated as a flat-notation key per spec
// (so its 251 voicings render with Eb/Bb rather than D#/A# even though the
// C major scale itself has no accidentals).
export const KEY_NOTATION: Record<string, Notation> = {
  C:  'flat',
  Db: 'flat',
  D:  'sharp',
  Eb: 'flat',
  E:  'sharp',
  F:  'flat',
  Gb: 'flat',
  G:  'sharp',
  Ab: 'flat',
  A:  'sharp',
  Bb: 'flat',
  B:  'sharp',
};

// 12-key cycling order, ascending by semitone. Used by the key-switcher UI.
export const KEY_ORDER: readonly string[] = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B',
];

export function getKeyNotation(key: string): Notation {
  return KEY_NOTATION[key] ?? 'flat';
}

export function isValidKey(key: string): boolean {
  return key in KEY_NOTATION;
}

function pcToName(pc: number, notation: Notation): string {
  const i = ((pc % 12) + 12) % 12;
  return notation === 'flat' ? SEMITONE_TO_FLAT[i] : SEMITONE_TO_SHARP[i];
}

function parseNoteName(name: string): { pc: number; oct: number | null } {
  const m = name.match(/^([A-G][b#]?)(-?\d+)?$/);
  if (!m) throw new Error(`Invalid note name: ${name}`);
  const pc = NOTE_TO_SEMITONE[m[1]];
  if (pc === undefined) throw new Error(`Unknown pitch class: ${m[1]}`);
  return { pc, oct: m[2] !== undefined ? parseInt(m[2], 10) : null };
}

// Re-spell `noteName` according to `targetKey`'s notation preference.
// Octave is preserved when present.
export function formatNoteName(noteName: string, targetKey: string): string {
  const notation = getKeyNotation(targetKey);
  const { pc, oct } = parseNoteName(noteName);
  const name = pcToName(pc, notation);
  return oct !== null ? `${name}${oct}` : name;
}

function transposeNote(note: string, semitones: number, toKey: string): string {
  const notation = getKeyNotation(toKey);
  const { pc, oct } = parseNoteName(note);
  const total = pc + semitones;
  const newPc = ((total % 12) + 12) % 12;
  const newName = pcToName(newPc, notation);
  if (oct === null) return newName;
  // Floor handles negative semitones too (we currently always pass [0..11]).
  const newOct = oct + Math.floor(total / 12);
  return `${newName}${newOct}`;
}

// Minimal contract a chord must satisfy to be transposable. Generic
// `transposeChord` preserves any extra fields (id, roman, degreesLabel, ...).
export type TransposableChord = {
  symbol: string;
  lh: string[];
  rh: { note: string; degree: string }[];
};

function semitoneDelta(fromKey: string, toKey: string): number {
  const fromPc = NOTE_TO_SEMITONE[fromKey];
  const toPc = NOTE_TO_SEMITONE[toKey];
  if (fromPc === undefined) throw new Error(`Unknown fromKey: ${fromKey}`);
  if (toPc === undefined) throw new Error(`Unknown toKey: ${toKey}`);
  return ((toPc - fromPc) % 12 + 12) % 12;
}

// Pretty-print accidentals in chord symbols using Unicode (matches existing
// data style like 'B♭7' / 'Am7♭5'). Note names stay ASCII because the
// audio/keyboard pipeline (normalizeNote, Tone.Sampler) only parses ASCII.
function toDisplayAccidentals(s: string): string {
  return s.replace(/b/g, '♭').replace(/#/g, '♯');
}

// Parse the leading root of a chord symbol, accepting both ASCII (Eb, F#)
// and Unicode (E♭, F♯) accidentals so we can re-transpose previously
// transposed symbols if needed.
function parseSymbolRoot(
  symbol: string
): { rootKey: string; rest: string } | null {
  const m = symbol.match(/^([A-G])([b#♭♯]?)(.*)$/);
  if (!m) return null;
  const acc =
    m[2] === '♭' ? 'b' :
    m[2] === '♯' ? '#' :
    m[2];
  return { rootKey: m[1] + acc, rest: m[3] };
}

export function transposeChord<T extends TransposableChord>(
  chord: T,
  fromKey: string,
  toKey: string
): T {
  if (fromKey === toKey) return chord;
  const semitones = semitoneDelta(fromKey, toKey);

  // Symbol: replace the leading root letter (and optional accidental),
  // preserve everything after it (quality, extensions, alterations).
  let newSymbol = chord.symbol;
  const parsed = parseSymbolRoot(chord.symbol);
  if (parsed) {
    const rootPc = NOTE_TO_SEMITONE[parsed.rootKey];
    if (rootPc !== undefined) {
      const newRootPc = (rootPc + semitones) % 12;
      const rootName = pcToName(newRootPc, getKeyNotation(toKey));
      newSymbol = toDisplayAccidentals(rootName) + parsed.rest;
    }
  }

  return {
    ...chord,
    symbol: newSymbol,
    lh: chord.lh.map((n) => transposeNote(n, semitones, toKey)),
    rh: chord.rh.map((rh) => ({
      ...rh,
      note: transposeNote(rh.note, semitones, toKey),
    })),
  } as T;
}

export function transposeChords<T extends TransposableChord>(
  chords: T[],
  fromKey: string,
  toKey: string
): T[] {
  if (fromKey === toKey) return chords;
  return chords.map((c) => transposeChord(c, fromKey, toKey));
}
