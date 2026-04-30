'use client';

import VoicingCell from './VoicingCell';
import type { BarsGridProgression } from '../data/types';

type Props = {
  progression: BarsGridProgression;
  selectedItemId: string | null;
  playingItemId: string | null;
  onSelect: (id: string) => void;
};

export default function BarsGrid({
  progression,
  selectedItemId,
  playingItemId,
  onSelect,
}: Props) {
  return (
    <div className="vl-bars-grid">
      {progression.bars.map((bar) => (
        <div key={bar.number} className="vl-bar">
          <div className="vl-bar-number">{bar.number}</div>
          <div className="vl-bar-chords">
            {bar.chords.map((c, idx) => {
              const itemId = `bar${bar.number}-${idx}`;
              const voicing = progression.voicings[c.key];
              if (!voicing) return null;
              return (
                <VoicingCell
                  key={itemId}
                  voicing={voicing}
                  selected={itemId === selectedItemId}
                  playing={itemId === playingItemId}
                  onClick={() => onSelect(itemId)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
