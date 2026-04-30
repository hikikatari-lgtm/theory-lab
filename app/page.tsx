import Link from 'next/link';
import LabHeader from '@/components/LabHeader';

type LabStatus = 'active' | 'coming-soon';
type Lab = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  status: LabStatus;
};

const LABS: Lab[] = [
  {
    slug: 'upper-triad',
    title: 'Upper Structure Triad Explorer',
    subtitle: '左手のルート × 右手の三和音',
    description:
      '左手のルート単音の上に三和音を重ねて、テンションコードがどう生まれるかを 12 キーで体感する。',
    status: 'active',
  },
  {
    slug: 'voicing-lab',
    title: 'Voicing Lab',
    subtitle: 'プロのボイシングを体験する',
    description:
      'プロのボイシングを進行ごとに体験する図鑑。Minor Turnaround、F Blues Rootless など複数の進行を切り替えて学べる。',
    status: 'active',
  },
];

export default function Home() {
  return (
    <div className="tl-container">
      <LabHeader
        backHref="https://my-clone-2gzp.vercel.app/"
        backLabel="Directline Studio"
        external
      />

      <header className="tl-hero">
        <div className="tl-eyebrow">Theory Lab</div>
        <h1 className="tl-h1">
          理論を<span className="accent">耳</span>で<span className="accent">確かめる</span>
        </h1>
        <div className="tl-subtitle">A laboratory of music theory experiments</div>
      </header>

      <div className="lab-grid">
        {LABS.map((lab, idx) => {
          const tag = `Lab ${String(idx + 1).padStart(2, '0')}`;
          const isComingSoon = lab.status === 'coming-soon';
          const inner = (
            <>
              <div className="lab-tag">{tag}</div>
              <div className="lab-title">{lab.title}</div>
              <div className="lab-subtitle">{lab.subtitle}</div>
              <div className="lab-desc">{lab.description}</div>
              <div className="lab-cta">{isComingSoon ? 'Coming soon' : 'Open →'}</div>
            </>
          );
          if (isComingSoon) {
            return (
              <div key={lab.slug} className="lab-card lab-card-disabled">
                {inner}
              </div>
            );
          }
          return (
            <Link key={lab.slug} href={`/labs/${lab.slug}`} className="lab-card">
              {inner}
            </Link>
          );
        })}
      </div>

      <footer>Directline Studio  ・  Sensation Before Theory</footer>
    </div>
  );
}
