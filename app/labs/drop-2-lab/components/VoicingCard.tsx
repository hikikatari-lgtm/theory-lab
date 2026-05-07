'use client';

import type { DropTwoChord } from '../data/types';

type Props = {
  chord: DropTwoChord;
  selected: boolean;
  playing: boolean;
  onClick: () => void;
};

export default function VoicingCard({ chord, selected, playing, onClick }: Props) {
  const cls =
    'vl-chord-card' +
    (selected ? ' selected' : '') +
    (playing ? ' playing' : '');
  return (
    <div className={cls} onClick={onClick}>
      <div className="vl-chord-roman">{chord.roman}</div>
      <div className="vl-chord-symbol">{chord.symbol}</div>
      <div className="vl-chord-degrees">{chord.degreesLabel}</div>
    </div>
  );
}
