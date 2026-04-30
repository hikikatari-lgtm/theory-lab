'use client';

import type { Voicing } from '../data/types';

type Props = {
  voicing: Voicing;
  selected: boolean;
  playing: boolean;
  onClick: () => void;
};

export default function VoicingCell({ voicing, selected, playing, onClick }: Props) {
  const cls =
    'vl-chord-cell' +
    (selected ? ' selected' : '') +
    (playing ? ' playing' : '');
  return (
    <div className={cls} onClick={onClick}>
      <div className="vl-chord-roman">{voicing.roman}</div>
      <div className="vl-chord-symbol">{voicing.symbol}</div>
    </div>
  );
}
