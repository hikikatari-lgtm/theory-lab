'use client';

import { useMemo } from 'react';
import { PROGRESSION_LIST } from '../data';
import type { ProgressionGroup } from '../data';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

// Display order and label for the dropdown's <optgroup>s. Entries from
// PROGRESSION_LIST are bucketed by their `group` field; empty groups are
// dropped so adding a new structural progression "just works." Items
// inside each group are sorted alphabetically (locale-aware, numeric so
// "251" sorts as a number rather than character-by-character).
const GROUP_ORDER: ReadonlyArray<{ key: ProgressionGroup; label: string }> = [
  { key: 'structure',   label: '🔧 構造系' },
  { key: 'progression', label: '🔁 進行系' },
  { key: 'tune',        label: '🎵 楽曲系' },
];

export default function ProgressionSelector({ value, onChange }: Props) {
  // Bucketing happens inside the component (not at module top-level) so
  // Next.js HMR picks up new entries in PROGRESSION_LIST without needing
  // a manual restart of the dev server / re-import of this file.
  const groupedProgressions = useMemo(
    () =>
      GROUP_ORDER.map(({ key, label }) => ({
        label,
        items: PROGRESSION_LIST
          .filter((p) => p.group === key)
          .slice()
          .sort((a, b) =>
            a.label.localeCompare(b.label, 'en', { numeric: true })
          ),
      })).filter((g) => g.items.length > 0),
    []
  );

  return (
    <section className="vl-selector">
      <span className="vl-selector-label">進行を選ぶ</span>
      <select
        className="vl-selector-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {groupedProgressions.map((g) => (
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
