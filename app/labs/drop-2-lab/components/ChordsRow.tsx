'use client';

import VoicingCard from './VoicingCard';
import type { DropTwoChord } from '../data/types';

type Props = {
  chords: DropTwoChord[];
  selectedChordId: string | null;
  playingChordId: string | null;
  onSelect: (id: string) => void;
};

export default function ChordsRow({
  chords,
  selectedChordId,
  playingChordId,
  onSelect,
}: Props) {
  return (
    <div className="vl-chords-row">
      {chords.map((chord) => (
        <VoicingCard
          key={chord.id}
          chord={chord}
          selected={chord.id === selectedChordId}
          playing={chord.id === playingChordId}
          onClick={() => onSelect(chord.id)}
        />
      ))}
    </div>
  );
}
