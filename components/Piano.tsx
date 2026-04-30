'use client';

import { useMemo } from 'react';
import {
  isWhiteKey,
  midiToName,
  midiToToneName,
  type PianoRange,
} from '@/lib/chord-theory';

const SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

type WhiteKey = { note: string; midi: number };
type BlackKey = { note: string; midi: number; leftPct: number; widthPct: number };

function buildKeysFromRange(startMidi: number, endMidi: number) {
  const whites: WhiteKey[] = [];
  for (let m = startMidi; m <= endMidi; m++) {
    if (isWhiteKey(m)) {
      const oct = Math.floor(m / 12) - 1;
      const i = m % 12;
      whites.push({ note: SHARP_NAMES[i] + oct, midi: m });
    }
  }
  const total = whites.length || 1;
  const blackWidthPct = (100 / total) * 0.6;

  const blacks: BlackKey[] = [];
  whites.forEach((wk, idx) => {
    if (idx >= whites.length - 1) return;
    const next = whites[idx + 1];
    if (next.midi - wk.midi !== 2) return;
    const blackMidi = wk.midi + 1;
    const oct = Math.floor(blackMidi / 12) - 1;
    const i = blackMidi % 12;
    const centerPct = ((idx + 1) / total) * 100;
    blacks.push({
      note: SHARP_NAMES[i] + oct,
      midi: blackMidi,
      leftPct: centerPct - blackWidthPct / 2,
      widthPct: blackWidthPct,
    });
  });

  return { whites, blacks };
}

function octavesToRange(startOctave: number, endOctave: number): PianoRange {
  return {
    startMidi: (startOctave + 1) * 12,
    endMidi: (endOctave + 2) * 12,
  };
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
  range?: PianoRange;
  startOctave?: number;
  endOctave?: number;
  variant?: 'default' | 'compact';
};

export default function Piano({
  highlight,
  disabled,
  onKeyClick,
  range,
  startOctave = 3,
  endOctave = 5,
  variant = 'default',
}: Props) {
  const effectiveRange = range ?? octavesToRange(startOctave, endOctave);

  const { whites, blacks } = useMemo(
    () => buildKeysFromRange(effectiveRange.startMidi, effectiveRange.endMidi),
    [effectiveRange.startMidi, effectiveRange.endMidi]
  );

  const triadIndex = (midi: number): number =>
    highlight.triadMidis.findIndex((m) => m === midi);

  const renderWhite = (note: string, midi: number) => {
    const isLeft = highlight.rootMidi === midi;
    const ti = triadIndex(midi);
    const isRight = ti >= 0;
    const cls =
      'key white' +
      (isLeft ? ' highlight-left' : '') +
      (isRight ? ' highlight-right' : '');
    const dispName = isLeft || isRight ? midiToName(midi, highlight.useFlats) : '';
    const degree = isLeft ? '1' : isRight ? highlight.triadDegrees[ti] ?? '' : '';
    const isC = note.startsWith('C');

    return (
      <div
        key={note}
        className={cls}
        data-note={note}
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

  const renderBlack = (b: BlackKey) => {
    const isLeft = highlight.rootMidi === b.midi;
    const ti = triadIndex(b.midi);
    const isRight = ti >= 0;
    const cls =
      'key black' +
      (isLeft ? ' highlight-left' : '') +
      (isRight ? ' highlight-right' : '');
    const dispName = isLeft || isRight ? midiToName(b.midi, highlight.useFlats) : '';
    const degree = isLeft ? '1' : isRight ? highlight.triadDegrees[ti] ?? '' : '';

    return (
      <div
        key={b.note}
        className={cls}
        data-note={b.note}
        style={{ left: `${b.leftPct}%`, width: `${b.widthPct}%` }}
        onClick={() => {
          if (disabled) return;
          onKeyClick?.(midiToToneName(b.midi));
        }}
      >
        <span className="degree-label">{degree}</span>
        <span className="note-name">{dispName}</span>
      </div>
    );
  };

  const wrapClass =
    'piano-wrap' +
    (variant === 'compact' ? ' piano-wrap-compact' : '') +
    (disabled ? ' disabled' : '');

  return (
    <div className={wrapClass}>
      <div className="piano-axis-labels">
        <span className="left">← 左手 (Root)</span>
        <span className="right">右手 (Triad) →</span>
      </div>
      <div className="piano">
        {whites.map((w) => renderWhite(w.note, w.midi))}
        {blacks.map((b) => renderBlack(b))}
      </div>
    </div>
  );
}
