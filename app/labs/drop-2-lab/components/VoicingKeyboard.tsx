'use client';

import { useMemo } from 'react';
import { normalizeNote } from '@/lib/chord-theory';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

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

// Auto-range: snap the start to a C and the end to a C or F so we always
// render whole white-key bookends. Drop 2 Lab's voicings span LH C2-D2 up
// to RH ~E5, so this consistently shows 3+ octaves.
function computeVoicingRange(
  notes: { note: string }[]
): { startIdx: number; endIdx: number } {
  if (notes.length === 0) {
    return { startIdx: noteToIndex('C2'), endIdx: noteToIndex('C6') };
  }
  const indices = notes.map((n) => noteToIndex(normalizeNote(n.note)));
  const minIdx = Math.min(...indices);
  const maxIdx = Math.max(...indices);

  let startIdx = minIdx - 2;
  let endIdx = maxIdx + 2;
  while (startIdx % 12 !== 0 && startIdx > 0) startIdx--;
  while (endIdx % 12 !== 0 && endIdx % 12 !== 5 && endIdx < 127) endIdx++;
  return { startIdx, endIdx };
}

type VoicingNote = { note: string; degree: string };

type Props = {
  lhNotes: VoicingNote[];
  rhNotes: VoicingNote[];
  commonNotes: Set<string>;
  showDegrees: boolean;
};

type Hand = 'lh' | 'rh' | null;

export default function VoicingKeyboard({
  lhNotes,
  rhNotes,
  commonNotes,
  showDegrees,
}: Props) {
  // Range is computed from BOTH the current chord AND a stable hint
  // covering Drop 2 Lab's full vocabulary (C2-E5). Without that, the
  // keyboard width visibly jumps when switching from Step 1 (LH single
  // bass note in octave 2) to Step 4 (LH note in octave 3, no octave-2
  // anchor) — Step 4's range starts at C3 instead of C2 and the voicing
  // re-flows. Pinning the range guarantees a consistent layout across
  // all 4 steps and all 3 chords.
  const { whiteKeys, blackKeys } = useMemo(() => {
    const rangeHint = [
      { note: 'C2' },
      { note: 'E5' },
    ];
    const allNotes = [...lhNotes, ...rhNotes, ...rangeHint];
    const { startIdx, endIdx } = computeVoicingRange(allNotes);

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
  }, [lhNotes, rhNotes]);

  const rhMap = useMemo(() => {
    const m = new Map<
      string,
      { displayName: string; degree: string; isCommon: boolean }
    >();
    rhNotes.forEach((n) => {
      const norm = normalizeNote(n.note);
      m.set(norm, {
        displayName: n.note,
        degree: n.degree,
        isCommon: commonNotes.has(norm),
      });
    });
    return m;
  }, [rhNotes, commonNotes]);

  const lhMap = useMemo(() => {
    const m = new Map<string, { displayName: string; degree: string }>();
    lhNotes.forEach((n) => {
      const norm = normalizeNote(n.note);
      m.set(norm, { displayName: n.note, degree: n.degree });
    });
    return m;
  }, [lhNotes]);

  const handFor = (note: string): Hand => {
    if (rhMap.has(note)) return 'rh';
    if (lhMap.has(note)) return 'lh';
    return null;
  };

  const keyClass = (note: string) => {
    const hand = handFor(note);
    const rhInfo = hand === 'rh' ? rhMap.get(note) : undefined;
    const isCommon = !!rhInfo?.isCommon;
    const isRH = hand === 'rh' && !isCommon;
    const isLH = hand === 'lh';
    return (
      'vl-' +
      (isBlackKey(note) ? 'key-black' : 'key-white') +
      (isLH ? ' lh-active' : '') +
      (isRH ? ' rh-active' : '') +
      (isCommon ? ' common-active' : '')
    );
  };

  const renderLabel = (note: string) => {
    const hand = handFor(note);
    if (!hand) return null;
    const info = hand === 'rh' ? rhMap.get(note) : lhMap.get(note);
    if (!info) return null;
    const letter = info.displayName
      .replace(/-?\d+$/, '')
      .replace('b', '♭')
      .replace('#', '♯');
    return (
      <span className="vl-note-label">
        {letter}
        {showDegrees ? <span className="vl-degree">{info.degree}</span> : null}
      </span>
    );
  };

  return (
    <div className="vl-keyboard-wrap">
      <div className="vl-keyboard">
        {whiteKeys.map((wk) => (
          <div
            key={wk.note}
            className={keyClass(wk.note)}
            data-note={wk.note}
          >
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
