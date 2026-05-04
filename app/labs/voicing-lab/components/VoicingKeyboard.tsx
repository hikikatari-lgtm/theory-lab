'use client';

import { useMemo, type CSSProperties } from 'react';
import { normalizeNote } from '@/lib/chord-theory';
import type { AnchorMode } from '../data/types';

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

// Range = (min of LH+RH) - 2 ... (max of LH+RH) + 2, then expand outward
// so the start is a C (pc 0) and the end is either a C or an F (pc 0 or
// 5) — gives a clean white-key boundary at both edges. Including LH
// matters for the new multi-note LH voicings (Maj9, m11) where the LH
// triad sits a couple octaves below RH and would be cut off otherwise.
function computeVoicingRange(
  notes: { note: string }[]
): { startIdx: number; endIdx: number } {
  if (notes.length === 0) {
    return { startIdx: noteToIndex('C4'), endIdx: noteToIndex('C6') };
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
  // Phase Bill Evans PR 2: optional 3-view anchor highlighting. When
  // `anchorMode` is non-standard and `anchorColor` is provided, the
  // matching note for that mode is rendered with the anchor color and
  // wins over both LH/RH base color and common-note highlighting.
  anchorMode?: AnchorMode;
  anchorColor?: string;
};

// Visual hand assignment for a key. RH wins ties: if the same pitch
// somehow appears in both hands (very unusual, but possible if a future
// voicing doubles a note across hands), the RH color/label takes
// precedence so the chord-tone degree is the one shown.
type Hand = 'lh' | 'rh' | null;

export default function VoicingKeyboard({
  lhNotes,
  rhNotes,
  commonNotes,
  showDegrees,
  anchorMode = 'standard',
  anchorColor,
}: Props) {
  const { whiteKeys, blackKeys } = useMemo(() => {
    const allNotes = [...lhNotes, ...rhNotes];
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

  // Map keys are normalized (sharp) so they line up with the keyboard's own
  // sharp-form iteration. `displayName` preserves the original spelling
  // from the source notes — which transposeChord set per the current key's
  // notation (Eb in flat keys, D# in sharp keys) — so rendered labels
  // follow the key signature instead of always showing sharps.
  //
  // The two maps share the same shape; `commonNotes` highlighting is
  // RH-only (it tracks shared chord tones with the previous chord, which
  // is a right-hand voice-leading concern).
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

  // Anchor note (normalized form like 'D4' or 'G#5'), or null for standard
  // mode. Picks the extremum per mode using noteToIndex (octave * 12 + pc),
  // which is monotonic — so argmax/argmin behave the same as standard MIDI.
  //   - top-note    → argmax over RH
  //   - bottom-line → argmin over RH
  //   - root        → argmin over LH (the bass note when LH has multiple)
  const anchorNote = useMemo<string | null>(() => {
    if (anchorMode === 'standard' || !anchorColor) return null;
    const source = anchorMode === 'root' ? lhNotes : rhNotes;
    if (source.length === 0) return null;
    const wantMax = anchorMode === 'top-note';
    let bestNote = '';
    let bestIdx = wantMax ? -Infinity : Infinity;
    for (const n of source) {
      const norm = normalizeNote(n.note);
      const idx = noteToIndex(norm);
      if (wantMax ? idx > bestIdx : idx < bestIdx) {
        bestIdx = idx;
        bestNote = norm;
      }
    }
    return bestNote || null;
  }, [anchorMode, anchorColor, lhNotes, rhNotes]);

  const keyClass = (note: string) => {
    const hand = handFor(note);
    const isAnchor = anchorNote === note;
    const rhInfo = hand === 'rh' ? rhMap.get(note) : undefined;
    const isCommon = !!rhInfo?.isCommon && !isAnchor;
    const isRH = hand === 'rh' && !isCommon && !isAnchor;
    const isLH = hand === 'lh' && !isAnchor;
    return (
      'vl-' +
      (isBlackKey(note) ? 'key-black' : 'key-white') +
      (isLH ? ' lh-active' : '') +
      (isRH ? ' rh-active' : '') +
      (isCommon ? ' common-active' : '') +
      (isAnchor ? ' anchor-active' : '')
    );
  };

  const keyStyle = (note: string): CSSProperties | undefined => {
    if (anchorNote === note && anchorColor) {
      return { background: anchorColor };
    }
    return undefined;
  };

  const renderLabel = (note: string) => {
    const hand = handFor(note);
    if (!hand) return null;
    const info = hand === 'rh' ? rhMap.get(note) : lhMap.get(note);
    if (!info) return null;
    // Pretty-print accidentals (Eb → E♭, F# → F♯) for display.
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
            style={keyStyle(wk.note)}
          >
            {renderLabel(wk.note)}
          </div>
        ))}
        {blackKeys.map((bk) => {
          const anchorStyle = keyStyle(bk.note);
          return (
            <div
              key={bk.note}
              className={keyClass(bk.note)}
              data-note={bk.note}
              style={{ left: bk.left, width: bk.width, ...anchorStyle }}
            >
              {renderLabel(bk.note)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
