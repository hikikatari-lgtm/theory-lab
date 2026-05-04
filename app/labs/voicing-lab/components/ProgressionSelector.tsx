'use client';

import { useMemo } from 'react';
import { PROGRESSION_LIST, SONG_SUBGENRES } from '../data';
import type { ProgressionGroup, SongSubgenre } from '../data';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

// Display order and label for the dropdown's <optgroup>s. Entries from
// PROGRESSION_LIST are bucketed by their `group` field; empty groups are
// dropped so adding a new structural progression "just works." Items
// inside each group are sorted alphabetically (locale-aware, numeric so
// "251" sorts as a number rather than character-by-character).
//
// HTML <select> doesn't support nested <optgroup>, so the 楽曲系 section
// is flattened into 3 sibling optgroups (Jazz / R&B / Stevie) sequenced
// in the same slot the single 楽曲系 group used to occupy. Visually the
// student still reads top-to-bottom: structure → progression → jazz →
// r&b → stevie → (any unclassified tune fallback).
const GROUP_ORDER: ReadonlyArray<{ key: ProgressionGroup; label: string }> = [
  { key: 'structure',   label: '🔧 構造系' },
  { key: 'progression', label: '🔁 進行系' },
  { key: 'tune',        label: '🎵 楽曲系' },
];

type RenderGroup = {
  key: string;
  label: string;
  items: ReadonlyArray<(typeof PROGRESSION_LIST)[number]>;
};

export default function ProgressionSelector({ value, onChange }: Props) {
  // Bucketing happens inside the component (not at module top-level) so
  // Next.js HMR picks up new entries in PROGRESSION_LIST without needing
  // a manual restart of the dev server / re-import of this file.
  //
  // For `group: 'tune'`, expand into one render-group per SongSubgenre
  // (in the order defined by SONG_SUBGENRES). Tunes without subgenre
  // fall into a defensive "🎵 その他" group at the bottom — should be
  // empty for a fully-classified library, but renders gracefully if
  // someone adds a new tune and forgets the subgenre tag.
  const groupedProgressions = useMemo<RenderGroup[]>(() => {
    const sortByLabel = (a: { label: string }, b: { label: string }) =>
      a.label.localeCompare(b.label, 'en', { numeric: true });

    const result: RenderGroup[] = [];
    for (const { key, label } of GROUP_ORDER) {
      if (key !== 'tune') {
        const items = PROGRESSION_LIST.filter((p) => p.group === key)
          .slice()
          .sort(sortByLabel);
        if (items.length > 0) result.push({ key, label, items });
        continue;
      }
      // tune: expand into subgenre buckets in fixed display order
      const tunes = PROGRESSION_LIST.filter((p) => p.group === 'tune');
      const ordered = SONG_SUBGENRES.slice().sort(
        (a, b) => a.order - b.order
      );
      for (const meta of ordered) {
        const items = tunes
          .filter((p) => p.subgenre === meta.id)
          .slice()
          .sort(sortByLabel);
        if (items.length > 0) {
          result.push({
            key: `tune-${meta.id}`,
            label: `${meta.icon} ${meta.label}`,
            items,
          });
        }
      }
      // Defensive fallback for any tune missing a subgenre tag.
      const knownSubgenres = new Set<SongSubgenre>(
        SONG_SUBGENRES.map((m) => m.id)
      );
      const orphans = tunes
        .filter((p) => !p.subgenre || !knownSubgenres.has(p.subgenre))
        .slice()
        .sort(sortByLabel);
      if (orphans.length > 0) {
        result.push({ key: 'tune-other', label: '🎵 その他', items: orphans });
      }
    }
    return result;
  }, []);

  return (
    <section className="vl-selector">
      <span className="vl-selector-label">進行を選ぶ</span>
      <select
        className="vl-selector-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {groupedProgressions.map((g) => (
          <optgroup key={g.key} label={g.label}>
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
