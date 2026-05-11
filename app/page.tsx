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
  {
    slug: 'drop-2-lab',
    title: 'Drop 2 Lab',
    subtitle: 'Drop 2 ボイシングを4段階で習得する',
    description:
      'Drop 2 ボイシングの作り方を「基本 → 両手 → 抜く」の4ステップで段階的に体験する。',
    status: 'active',
  },
  {
    slug: 'inversion-lab',
    title: 'Inversion Lab',
    subtitle: '基本形と転回形を滑らかに繋ぐ',
    description:
      'コード進行を入力すると、最もスムーズなボイスリーディングになる転回形を自動選択。共通音と移動する音を鍵盤上にドット表示する。',
    status: 'active',
  },
  {
    slug: 'arrange-lab',
    title: 'Chord Arrange Lab',
    subtitle: 'Before / After で聴き比べ',
    description:
      'シンプルなコード進行が、パッシングコードやオンコードを足していくとどう変化するか。Original から段階的なアレンジへ切り替えて体感する。',
    status: 'active',
  },
  {
    slug: 'practice-lab',
    title: 'Practice Lab',
    subtitle: 'メトロノームでコード進行を練習',
    description:
      'バッキングトラックに合わせてコード進行をリアルタイム表示する練習ツール。テンポ調整、カウントイン、区間ループに対応。',
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
