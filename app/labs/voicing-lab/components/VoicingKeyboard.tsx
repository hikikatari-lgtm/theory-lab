'use client';

import { useMemo } from 'react';
import { normalizeNote } from '@/lib/chord-theory';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Internal index, not standard MIDI: idx = octave * 12 + pitchClass.
// Pitch-class arithmetic (idx % 12) is offset-invariant, so the snap-to-C
// and snap-to-F logic in computeVoicingRange behaves the same as if we
// used standard MIDI numbers — and we never round-trip these values
// through Tone.js, so the offset doesn't have to match.
function noteToIndex(note: string): number {
  const m = note.match(/^([A-G]#?)(\d+)$/);
  if (!m) return 0;
  const pc = NOTE_ORDER.indexOf(m[1]);
  const oct = parseInt(m[2]);
  return oct * 12 + pc;
}

function indexToNote(idx: number): string {
  const oct = Math.floor(idx / 12);
  const pc = NOTE_ORDER[idx % 12];
  return pc + oct;
}

function isBlackKey(note: string): boolean {
  return note.includes('#');
}

// Range = right hand min - 2 ... max + 2, then expand outward so the
// start is a C (pc 0) and the end is either a C or an F (pc 0 or 5) —
// gives a clean white-key boundary at both edges.
function computeVoicingRange(
  rhNotes: { note: string }[]
): { startIdx: number; endIdx: number } {
  if (rhNotes.length === 0) {
    return { startIdx: noteToIndex('C4'), endIdx: noteToIndex('C6') };
  }
  const indices = rhNotes.map((n) => noteToIndex(normalizeNote(n.note)));
  const minIdx = Math.min(...indices);
  const maxIdx = Math.max(...indices);

  let startIdx = minIdx - 2;
  let endIdx = maxIdx + 2;
  while (startIdx % 12 !== 0 && startIdx > 0) startIdx--;
  while (endIdx % 12 !== 0 && endIdx % 12 !== 5 && endIdx < 127) endIdx++;
  return { startIdx, endIdx };
}

type Props = {
  rhNotes: { note: string; degree: string }[];
  commonNotes: Set<string>;
  showDegrees: boolean;
};

export default function VoicingKeyboard({
  rhNotes,
  commonNotes,
  showDegrees,
}: Props) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const { startIdx, endIdx } = computeVoicingRange(rhNotes);

    const whites: { idx: number; note: string }[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const note = indexToNote(i);
      if (!isBlackKey(note)) whites.push({ idx: i, note });
    }
    const whiteWidthPercent = 100 / whites.length;

    const blacks: { idx: number; note: string; left: string; width: string }[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const note = indexToNote(i);
      if (!isBlackKey(note)) continue;
      const prevWhiteIdx = whites.findIndex((wk) => wk.idx === i - 1);
      if (prevWhiteIdx === -1) continue;
      blacks.push({
        idx: i,
        note,
        left: `calc(${(prevWhiteIdx + 1) * whiteWidthPercent}% - ${whiteWidthPercent * 0.3}%)`,
        width: `${whiteWidthPercent * 0.6}%`,
      });
    }
    return { whiteKeys: whites, blackKeys: blacks };
  }, [rhNotes]);

  const rhMap = useMemo(() => {
    const m = new Map<string, { degree: string; isCommon: boolean }>();
    rhNotes.forEach((n) => {
      const norm = normalizeNote(n.note);
      m.set(norm, { degree: n.degree, isCommon: commonNotes.has(norm) });
    });
    return m;
  }, [rhNotes, commonNotes]);

  const keyClass = (note: string) => {
    const rhInfo = rhMap.get(note);
    const isRH = !!rhInfo && !rhInfo.isCommon;
    const isCommon = !!rhInfo && rhInfo.isCommon;
    return (
      'vl-' +
      (isBlackKey(note) ? 'key-black' : 'key-white') +
      (isRH ? ' rh-active' : '') +
      (isCommon ? ' common-active' : '')
    );
  };

  const renderLabel = (note: string) => {
    const rhInfo = rhMap.get(note);
    if (!rhInfo) return null;
    const noteLetter = note.replace(/\d+/, '');
    return (
      <span className="vl-note-label">
        {noteLetter}
        {showDegrees ? <span className="vl-degree">{rhInfo.degree}</span> : null}
      </span>
    );
  };

  return (
    <div className="vl-keyboard-wrap">
      <div className="vl-keyboard">
        {whiteKeys.map((wk) => (
          <div key={wk.note} className={keyClass(wk.note)} data-note={wk.note}>
            {renderLabel(wk.note)}
          </div>
        ))}
        {blackKeys.map((bk) => (
          <div
            key={bk.note}
            className={keyClass(bk.note)}
            data-note={bk.note}
            style={{ left: bk.left, width: bk.width }}
          >
            {renderLabel(bk.note)}
          </div>
        ))}
      </div>
    </div>
  );
}
