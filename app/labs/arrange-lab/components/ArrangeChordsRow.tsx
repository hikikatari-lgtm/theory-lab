'use client';

import type { ArrangeBar } from '../data/types';

type Props = {
  bars: ArrangeBar[];
  selectedId: string | null;
  playingId: string | null;
  onSelect: (id: string) => void;
};

// 4 小節構成。各小節は 1〜複数コードを含み、小節ごとに枠で囲って
// バーラインを視覚化する。1 小節 = 4 拍 を均等割り (1 コード= 4 拍 /
// 2 コード = 各 2 拍 / 3 コード = 各 4/3 拍) として、コードチップ幅を
// flex で配分する。
export default function ArrangeChordsRow({
  bars,
  selectedId,
  playingId,
  onSelect,
}: Props) {
  return (
    <div className="al-bars-row">
      {bars.map((bar, barIdx) => (
        <div key={barIdx} className="al-bar">
          <div className="al-bar-number">{barIdx + 1}</div>
          <div className="al-bar-chords">
            {bar.chords.map((chord) => {
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
        </div>
      ))}
    </div>
  );
}
