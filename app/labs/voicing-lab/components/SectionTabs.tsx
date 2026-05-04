'use client';

import type { Section } from '../data';

type Props = {
  sections: Section[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  // Disable manual switching while Walk Through is active so the
  // auto-switch logic in VoicingLabClient is the single source of
  // truth for which section is shown during playback.
  disabled?: boolean;
};

// Section tabs for long bars-grid progressions (Autumn Leaves /
// Body And Soul / All The Things You Are). Sits between the progression
// header and the chord grid; clicking a tab switches the visible bars
// to that section's range without affecting Walk Through, which always
// plays the entire progression. During playback the active tab is
// driven by the currently playing bar.
export default function SectionTabs({
  sections,
  selectedIdx,
  onSelect,
  disabled,
}: Props) {
  return (
    <div
      className="vl-section-tabs"
      role="tablist"
      aria-label="Section"
    >
      {sections.map((section, idx) => (
        <button
          key={section.name}
          type="button"
          role="tab"
          aria-selected={idx === selectedIdx}
          className={
            'vl-section-tab' + (idx === selectedIdx ? ' active' : '')
          }
          disabled={disabled}
          onClick={() => onSelect(idx)}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}
