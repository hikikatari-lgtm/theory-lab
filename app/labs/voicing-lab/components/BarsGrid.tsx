'use client';

import VoicingCell from './VoicingCell';
import type { BarsGridProgression, Section } from '../data/types';

type Props = {
  progression: BarsGridProgression;
  selectedItemId: string | null;
  playingItemId: string | null;
  onSelect: (id: string) => void;
  // When set, only bars whose `number` falls inside section.barRange
  // (inclusive on both ends) are rendered. Walk Through still iterates
  // the full progression — section visibility is purely a display crop.
  visibleSection?: Section;
};

export default function BarsGrid({
  progression,
  selectedItemId,
  playingItemId,
  onSelect,
  visibleSection,
}: Props) {
  const visibleBars = visibleSection
    ? progression.bars.filter(
        (bar) =>
          bar.number >= visibleSection.barRange[0] &&
          bar.number <= visibleSection.barRange[1]
      )
    : progression.bars;

  return (
    <div className="vl-bars-grid">
      {visibleBars.map((bar) => (
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
