'use client';

import { PROGRESSION_LIST } from '../data';
import type { ProgressionGroup } from '../data';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

// Display order and label for the dropdown's <optgroup>s. Entries from
// PROGRESSION_LIST are bucketed by their `group` field; empty groups are
// dropped so adding a new structural progression "just works."
const GROUP_ORDER: ReadonlyArray<{ key: ProgressionGroup; label: string }> = [
  { key: '構造系', label: '🔧 構造系' },
  { key: '楽曲系', label: '🎵 楽曲系' },
];

const GROUPED_PROGRESSIONS = GROUP_ORDER.map(({ key, label }) => ({
  label,
  items: PROGRESSION_LIST.filter((p) => p.group === key),
})).filter((g) => g.items.length > 0);

export default function ProgressionSelector({ value, onChange }: Props) {
  return (
    <section className="vl-selector">
      <span className="vl-selector-label">進行を選ぶ</span>
      <select
        className="vl-selector-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {GROUPED_PROGRESSIONS.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.items.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </section>
  );
}
