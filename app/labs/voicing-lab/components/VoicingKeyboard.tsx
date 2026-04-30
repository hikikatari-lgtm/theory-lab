'use client';

import { useEffect, useMemo, useRef } from 'react';
import { normalizeNote } from '@/lib/chord-theory';

const NOTE_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const KEYBOARD_START_NOTE = 'C2';
const KEYBOARD_END_NOTE = 'C6';

// Local note↔index helpers — independent of standard MIDI offset since we
// only use them internally for ordering / scrolling. Voicing data uses note
// names with octaves (e.g. "Eb4"); we never round-trip through MIDI numbers
// to Tone.js, so the offset doesn't have to match Tone's internal table.
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

type Props = {
  lhNotes: string[];
  rhNotes: { note: string; degree: string }[];
  commonNotes: Set<string>;
  showDegrees: boolean;
};

export default function VoicingKeyboard({
  lhNotes,
  rhNotes,
  commonNotes,
  showDegrees,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const kbRef = useRef<HTMLDivElement>(null);

  const { whiteKeys, blackKeys } = useMemo(() => {
    const startIdx = noteToIndex(KEYBOARD_START_NOTE);
    const endIdx = noteToIndex(KEYBOARD_END_NOTE);

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
  }, []);

  const lhSet = useMemo(() => new Set(lhNotes.map(normalizeNote)), [lhNotes]);
  const rhMap = useMemo(() => {
    const m = new Map<string, { degree: string; isCommon: boolean }>();
    rhNotes.forEach((n) => {
      const norm = normalizeNote(n.note);
      m.set(norm, { degree: n.degree, isCommon: commonNotes.has(norm) });
    });
    return m;
  }, [rhNotes, commonNotes]);

  // Auto-scroll: center the active note range in the visible keyboard area
  // whenever the chord (lhNotes / rhNotes) changes.
  useEffect(() => {
    const wrap = wrapRef.current;
    const kb = kbRef.current;
    if (!wrap || !kb) return;
    const allNotes = [
      ...lhNotes.map(normalizeNote),
      ...rhNotes.map((n) => normalizeNote(n.note)),
    ];
    if (allNotes.length === 0) return;

    const indices = allNotes.map(noteToIndex);
    const minIdx = Math.min(...indices);
    const maxIdx = Math.max(...indices);
    const centerIdx = (minIdx + maxIdx) / 2;
    const startIdx = noteToIndex(KEYBOARD_START_NOTE);
    const endIdx = noteToIndex(KEYBOARD_END_NOTE);
    const ratio = (centerIdx - startIdx) / (endIdx - startIdx);

    const kbWidth = kb.scrollWidth;
    const wrapWidth = wrap.clientWidth;
    const target = ratio * kbWidth - wrapWidth / 2;
    const max = kbWidth - wrapWidth;
    const finalX = Math.max(0, Math.min(max, target));
    wrap.scrollTo({ left: finalX, behavior: 'smooth' });
  }, [lhNotes, rhNotes]);

  const keyClass = (note: string) => {
    const isLH = lhSet.has(note);
    const rhInfo = rhMap.get(note);
    const isRH = !!rhInfo && !rhInfo.isCommon;
    const isCommon = !!rhInfo && rhInfo.isCommon;
    return (
      'vl-' + (isBlackKey(note) ? 'key-black' : 'key-white') +
      (isLH ? ' lh-active' : '') +
      (isRH ? ' rh-active' : '') +
      (isCommon ? ' common-active' : '')
    );
  };

  const renderLabel = (note: string) => {
    const isLH = lhSet.has(note);
    const rhInfo = rhMap.get(note);
    if (!isLH && !rhInfo) return null;
    const noteLetter = note.replace(/\d+/, '');
    if (isLH && !rhInfo) {
      return <span className="vl-note-label">{noteLetter}</span>;
    }
    return (
      <span className="vl-note-label">
        {noteLetter}
        {showDegrees && rhInfo ? (
          <span className="vl-degree">{rhInfo.degree}</span>
        ) : null}
      </span>
    );
  };

  return (
    <>
      <div className="vl-keyboard-wrap" ref={wrapRef}>
        <div className="vl-keyboard" ref={kbRef}>
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
      <div className="vl-scroll-hint">← → スワイプで鍵盤全体を確認できます</div>
    </>
  );
}
