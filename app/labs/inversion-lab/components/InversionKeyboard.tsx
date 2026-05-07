'use client';

import { useMemo } from 'react';
import { midiToNoteName } from '../lib/inversion-theory';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function indexToNote(idx: number): string {
  const oct = Math.floor(idx / 12);
  const pc = NOTE_ORDER[idx % 12];
  return pc + oct;
}

function isBlackKey(note: string): boolean {
  return note.includes('#');
}

// Range = several semitones above & below the union of voicings, snapped
// to a clean white-key boundary, then padded an extra ~half-octave on
// each side. The extra padding matters because the dot is 30px wide
// centered on each key — without breathing room past the highest
// pitch, the rightmost dot can extend past the wrap edge and get
// visually clipped on narrower viewports. Ensures at least 2 octaves
// (≈ C3..C5) even when the chord set is small.
function computeRange(midis: number[]): { startIdx: number; endIdx: number } {
  if (midis.length === 0) {
    return { startIdx: 3 * 12, endIdx: 6 * 12 };
  }
  const min = Math.min(...midis);
  const max = Math.max(...midis);
  let startIdx = min - 3;
  let endIdx = max + 3;
  while (startIdx % 12 !== 0 && startIdx > 0) startIdx--;
  while (endIdx % 12 !== 0 && endIdx % 12 !== 5 && endIdx < 127) endIdx++;
  // Extra breathing room past the snapped boundary.
  startIdx = Math.max(0, startIdx - 5);
  endIdx = Math.min(127, endIdx + 5);
  while (startIdx % 12 !== 0 && startIdx > 0) startIdx--;
  while (endIdx % 12 !== 0 && endIdx % 12 !== 5 && endIdx < 127) endIdx++;
  return { startIdx, endIdx };
}

export type DotKind = 'common' | 'moving';

export type KeyboardNote = {
  midi: number;
  degree: string;
  kind: DotKind;
};

type Props = {
  notes: KeyboardNote[];
  rangeMidis?: number[];   // optional override range source (e.g. union of all chords)
};

export default function InversionKeyboard({ notes, rangeMidis }: Props) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const source = rangeMidis && rangeMidis.length > 0 ? rangeMidis : notes.map((n) => n.midi);
    const { startIdx, endIdx } = computeRange(source);

    const whites: { idx: number; note: string }[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const note = indexToNote(i);
      if (!isBlackKey(note)) whites.push({ idx: i, note });
    }
    const widthPct = 100 / whites.length;

    const blacks: { idx: number; note: string; left: string; width: string }[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const note = indexToNote(i);
      if (!isBlackKey(note)) continue;
      const prevWhite = whites.findIndex((wk) => wk.idx === i - 1);
      if (prevWhite === -1) continue;
      blacks.push({
        idx: i,
        note,
        left: `calc(${(prevWhite + 1) * widthPct}% - ${widthPct * 0.3}%)`,
        width: `${widthPct * 0.6}%`,
      });
    }
    return { whiteKeys: whites, blackKeys: blacks };
  }, [notes, rangeMidis]);

  const noteMap = useMemo(() => {
    const m = new Map<string, { degree: string; kind: DotKind }>();
    for (const n of notes) {
      m.set(midiToNoteName(n.midi), { degree: n.degree, kind: n.kind });
    }
    return m;
  }, [notes]);

  const renderDot = (note: string) => {
    const info = noteMap.get(note);
    if (!info) return null;
    return (
      <span className={`il-dot il-dot-${info.kind}`}>
        <span className="il-dot-degree">{info.degree}</span>
      </span>
    );
  };

  return (
    <div className="il-keyboard-wrap">
      <div className="il-keyboard">
        {whiteKeys.map((wk) => (
          <div key={wk.note} className="il-key-white" data-note={wk.note}>
            {renderDot(wk.note)}
          </div>
        ))}
        {blackKeys.map((bk) => (
          <div
            key={bk.note}
            className="il-key-black"
            data-note={bk.note}
            style={{ left: bk.left, width: bk.width }}
          >
            {renderDot(bk.note)}
          </div>
        ))}
      </div>
    </div>
  );
}
