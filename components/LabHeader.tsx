import Link from 'next/link';

type Props = {
  backHref: string;
  backLabel: string;
  external?: boolean;
};

export default function LabHeader({ backHref, backLabel, external = false }: Props) {
  const content = (
    <span className="lab-back-link">
      <span aria-hidden>←</span>
      <span>{backLabel}</span>
    </span>
  );

  return (
    <div className="lab-topbar">
      {external ? (
        <a href={backHref} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <Link href={backHref}>{content}</Link>
      )}
    </div>
  );
}
