'use client';

import { PROGRESSION_LIST } from '../data';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export default function ProgressionSelector({ value, onChange }: Props) {
  return (
    <section className="vl-selector">
      <span className="vl-selector-label">進行を選ぶ</span>
      <select
        className="vl-selector-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {PROGRESSION_LIST.map((p) => (
          <option key={p.id} value={p.id}>
            {p.label}
          </option>
        ))}
      </select>
    </section>
  );
}
