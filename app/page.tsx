import Link from 'next/link';
import LabHeader from '@/components/LabHeader';

const LABS = [
  {
    href: '/labs/upper-triad',
    tag: 'Lab 01',
    title: 'Upper Structure Triad Explorer',
    desc: '左手のルート単音の上に三和音を重ねて、テンションコードがどう生まれるかを 12 キーで体感する。',
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
        {LABS.map((lab) => (
          <Link key={lab.href} href={lab.href} className="lab-card">
            <div className="lab-tag">{lab.tag}</div>
            <div className="lab-title">{lab.title}</div>
            <div className="lab-desc">{lab.desc}</div>
            <div className="lab-cta">Open →</div>
          </Link>
        ))}
      </div>

      <footer>Directline Studio  ・  Sensation Before Theory</footer>
    </div>
  );
}
