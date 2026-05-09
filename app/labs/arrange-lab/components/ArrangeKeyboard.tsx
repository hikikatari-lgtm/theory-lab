'use client';

import { useMemo } from 'react';
import { normalizeNote } from '@/lib/chord-theory';
import type { ArrangeNote } from '../data/types';

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

// 鍵盤の表示レンジを `notes` から (min - 2 ... max + 2) で算出し、
// 両端を白鍵境界 (C / F) にスナップする。`extraNotes` を渡すと、その音も
// レンジ計算に含めるので、複数コードを跨いだ安定したレンジを作れる。
function computeRange(notes: { note: string }[]): { startIdx: number; endIdx: number } {
  if (notes.length === 0) {
    return { startIdx: noteToIndex('C3'), endIdx: noteToIndex('C5') };
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

type Props = {
  lhNotes: ArrangeNote[];
  rhNotes: ArrangeNote[];
  // バージョン全体に含まれる全ノート。これでレンジを固定し、
  // コード切替時に鍵盤幅がジャンプしないようにする。
  rangeNotes: ArrangeNote[];
  showDegrees: boolean;
};

type Hand = 'lh' | 'rh' | null;

export default function ArrangeKeyboard({
  lhNotes,
  rhNotes,
  rangeNotes,
  showDegrees,
}: Props) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const { startIdx, endIdx } = computeRange(rangeNotes);

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
  }, [rangeNotes]);

  const rhMap = useMemo(() => {
    const m = new Map<string, { displayName: string; degree: string }>();
    rhNotes.forEach((n) => {
      m.set(normalizeNote(n.note), { displayName: n.note, degree: n.degree });
    });
    return m;
  }, [rhNotes]);

  const lhMap = useMemo(() => {
    const m = new Map<string, { displayName: string; degree: string }>();
    lhNotes.forEach((n) => {
      m.set(normalizeNote(n.note), { displayName: n.note, degree: n.degree });
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
    return (
      'vl-' +
      (isBlackKey(note) ? 'key-black' : 'key-white') +
      (hand === 'lh' ? ' lh-active' : '') +
      (hand === 'rh' ? ' rh-active' : '')
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
