import DropTwoLabClient from './DropTwoLabClient';

// MVP scope: single progression (251 in C) with 4 Drop 2 steps. No URL
// params yet — the lab has no progression switcher, no variant axis,
// and no key cycling, so URL state would not earn its complexity. Phase
// 2 (12-key support, additional progressions) will revisit this.
export default function DropTwoLabPage() {
  return <DropTwoLabClient />;
}
