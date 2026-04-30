'use client';

type Props = {
  keyDisplay: string;
  upperName: string;
  resultName: string;
  degrees: string[];
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  delaySec?: number;
};

export default function ChordCard({
  keyDisplay,
  upperName,
  resultName,
  degrees,
  active,
  disabled,
  onClick,
  delaySec = 0,
}: Props) {
  const className =
    'card' + (active ? ' active' : '') + (disabled ? ' disabled' : '');
  return (
    <div
      className={className}
      style={{ animationDelay: `${delaySec}s` }}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <div className="formula">
        <span className="left">{keyDisplay}</span>
        <span className="plus">+</span>
        <span className="right">{upperName}</span>
      </div>
      <div className="result">{resultName}</div>
      <div className="degrees">{degrees.join(' ・ ')}</div>
    </div>
  );
}
