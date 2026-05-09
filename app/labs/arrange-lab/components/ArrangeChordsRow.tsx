'use client';

import type { ArrangeBar } from '../data/types';

const BEATS_PER_BAR = 4;

type Props = {
  bars: ArrangeBar[];
  // Slot key = `${barIdx}-${chordIdxInBar}`. Selection / playing は slot
  // 単位で扱うので、同じコード ID が複数の slot に入ってもそれぞれ
  // 独立してハイライトされる (例: Just The Way You Are で Am7 が
  // 複数小節に登場するケース)。
  selectedSlotId: string | null;
  playingSlotId: string | null;
  onSelect: (slotId: string) => void;
};

export default function ArrangeChordsRow({
  bars,
  selectedSlotId,
  playingSlotId,
  onSelect,
}: Props) {
  return (
    <div className="al-bars-row">
      {bars.map((bar, barIdx) => {
        // 拍数比に応じて chord chip の幅を割り当てる。
        // 例) 2-1-1 拍チェンジなら左の chip が右 2 つの倍幅になる。
        const evenBeats = BEATS_PER_BAR / bar.chords.length;
        return (
          <div key={barIdx} className="al-bar">
            <div className="al-bar-number">{barIdx + 1}</div>
            <div className="al-bar-chords">
              {bar.chords.map((slot, chordIdx) => {
                const slotId = `${barIdx}-${chordIdx}`;
                const beats = slot.beats ?? evenBeats;
                const cls =
                  'al-chord-card' +
                  (slot.added ? ' added' : '') +
                  (slotId === selectedSlotId ? ' selected' : '') +
                  (slotId === playingSlotId ? ' playing' : '');
                return (
                  <button
                    key={slotId}
                    type="button"
                    className={cls}
                    style={{ flex: `${beats} 1 0` }}
                    onClick={() => onSelect(slotId)}
                  >
                    <div className="al-chord-roman">{slot.chord.roman}</div>
                    <div className="al-chord-symbol">{slot.chord.symbol}</div>
                    {slot.added ? (
                      <div className="al-chord-badge">NEW</div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
