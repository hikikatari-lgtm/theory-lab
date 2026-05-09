'use client';

import type { ArrangeChord } from '../data/types';

type Props = {
  chords: ArrangeChord[];
  selectedId: string | null;
  playingId: string | null;
  onSelect: (id: string) => void;
};

export default function ArrangeChordsRow({
  chords,
  selectedId,
  playingId,
  onSelect,
}: Props) {
  return (
    <div className="al-chords-row">
      {chords.map((chord) => {
        const cls =
          'al-chord-card' +
          (chord.added ? ' added' : '') +
          (chord.id === selectedId ? ' selected' : '') +
          (chord.id === playingId ? ' playing' : '');
        return (
          <button
            key={chord.id}
            type="button"
            className={cls}
            onClick={() => onSelect(chord.id)}
          >
            <div className="al-chord-roman">{chord.roman}</div>
            <div className="al-chord-symbol">{chord.symbol}</div>
            {chord.added ? (
              <div className="al-chord-badge">NEW</div>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
