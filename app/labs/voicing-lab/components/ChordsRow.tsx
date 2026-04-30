'use client';

import VoicingCard from './VoicingCard';
import type { ChordsRowChord } from '../data/types';

type Props = {
  chords: ChordsRowChord[];
  selectedItemId: string | null;
  playingItemId: string | null;
  onSelect: (id: string) => void;
};

export default function ChordsRow({
  chords,
  selectedItemId,
  playingItemId,
  onSelect,
}: Props) {
  return (
    <div className="vl-chords-row">
      {chords.map((chord) => (
        <VoicingCard
          key={chord.id}
          chord={chord}
          selected={chord.id === selectedItemId}
          playing={chord.id === playingItemId}
          onClick={() => onSelect(chord.id)}
        />
      ))}
    </div>
  );
}
