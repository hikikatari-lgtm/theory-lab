'use client';

import { useMemo } from 'react';
import { midiToName, midiToToneName } from '@/lib/chord-theory';

const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] as const;

type WhiteKey = { note: string; midi: number };

function buildKeys(startOctave: number, endOctave: number) {
  const whites: WhiteKey[] = [];
  for (let oct = startOctave; oct <= endOctave + 1; oct++) {
    for (const n of WHITE_NOTES) {
      if (oct === endOctave + 1 && n !== 'C') break;
      const note = n + oct;
      const midi = noteToMidi(n, oct);
      whites.push({ note, midi });
    }
  }
  const blackPattern: { after: string; name: string }[] = [
    { after: 'C', name: 'C#' },
    { after: 'D', name: 'D#' },
    { after: 'F', name: 'F#' },
    { after: 'G', name: 'G#' },
    { after: 'A', name: 'A#' },
  ];
  type BlackKey = { note: string; midi: number; leftPct: number };
  const blacks: BlackKey[] = [];
  const total = whites.length;
  whites.forEach((wk, idx) => {
    if (idx >= total - 1) return;
    const noteName = wk.note.replace(/\d/, '');
    const oct = parseInt(wk.note.match(/\d+/)![0]);
    const bp = blackPattern.find((b) => b.after === noteName);
    if (!bp) return;
    const blackNote = bp.name + oct;
    const blackMidi = noteToMidi(bp.name, oct);
    const leftPct = ((idx + 1) / total) * 100 - 1.35;
    blacks.push({ note: blackNote, midi: blackMidi, leftPct });
  });
  return { whites, blacks };
}

function noteToMidi(name: string, oct: number): number {
  const map: Record<string, number> = {
    C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5,
    'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11,
  };
  return (oct + 1) * 12 + map[name];
}

export type PianoHighlight = {
  rootMidi: number | null;
  triadMidis: number[];
  triadDegrees: string[];
  useFlats: boolean;
};

type Props = {
  highlight: PianoHighlight;
  disabled: boolean;
  onKeyClick?: (toneName: string) => void;
  startOctave?: number;
  endOctave?: number;
};

export default function Piano({
  highlight,
  disabled,
  onKeyClick,
  startOctave = 3,
  endOctave = 5,
}: Props) {
  const { whites, blacks } = useMemo(
    () => buildKeys(startOctave, endOctave),
    [startOctave, endOctave]
  );

  const triadIndex = (midi: number): number =>
    highlight.triadMidis.findIndex((m) => m === midi);

  const renderKey = (note: string, midi: number, isBlack: boolean, leftPct?: number) => {
    const isLeft = highlight.rootMidi === midi;
    const ti = triadIndex(midi);
    const isRight = ti >= 0;
    const cls =
      'key ' +
      (isBlack ? 'black' : 'white') +
      (isLeft ? ' highlight-left' : '') +
      (isRight ? ' highlight-right' : '');
    const dispName = isLeft || isRight ? midiToName(midi, highlight.useFlats) : '';
    const degree = isLeft ? '1' : isRight ? highlight.triadDegrees[ti] ?? '' : '';
    const isC = !isBlack && note.startsWith('C');

    return (
      <div
        key={note}
        className={cls}
        data-note={note}
        style={isBlack && leftPct !== undefined ? { left: `${leftPct}%` } : undefined}
        onClick={() => {
          if (disabled) return;
          onKeyClick?.(midiToToneName(midi));
        }}
      >
        <span className="degree-label">{degree}</span>
        <span className="note-name">{dispName}</span>
        {isC && !isLeft && !isRight ? <span className="c-marker">{note}</span> : null}
      </div>
    );
  };

  return (
    <div className={'piano-wrap' + (disabled ? ' disabled' : '')}>
      <div className="piano-axis-labels">
        <span className="left">← 左手 (Root)</span>
        <span className="right">右手 (Triad) →</span>
      </div>
      <div className="piano">
        {whites.map((w) => renderKey(w.note, w.midi, false))}
        {blacks.map((b) => renderKey(b.note, b.midi, true, b.leftPct))}
      </div>
    </div>
  );
}
