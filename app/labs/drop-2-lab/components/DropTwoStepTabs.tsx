'use client';

import {
  DROP_TWO_STEP_INDICES,
  DROP_TWO_STEP_LABELS,
  type DropTwoStepIndex,
} from '../data/types';

type Props = {
  value: DropTwoStepIndex;
  onChange: (next: DropTwoStepIndex) => void;
};

// Step tabs use the same `vl-variant-toggle` / `vl-variant-btn` classes
// as Voicing Lab's Type A/B switch so styling stays in lockstep with
// the existing design language. Only the count differs (4 vs 2).
export default function DropTwoStepTabs({ value, onChange }: Props) {
  return (
    <div
      className="vl-variant-toggle"
      role="tablist"
      aria-label="Drop 2 step"
    >
      {DROP_TWO_STEP_INDICES.map((step) => {
        const meta = DROP_TWO_STEP_LABELS[step];
        const isActive = value === step;
        return (
          <button
            key={step}
            type="button"
            role="tab"
            aria-selected={isActive}
            title={meta.description}
            className={'vl-variant-btn' + (isActive ? ' active' : '')}
            onClick={() => onChange(step)}
          >
            {meta.title}
          </button>
        );
      })}
    </div>
  );
}
