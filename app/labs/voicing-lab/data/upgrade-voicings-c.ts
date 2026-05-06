import type { Voicing } from './types';

// UPGRADE Drop 2 — Drop 2 Number System voicings, Key of C, Top-note edition.
// Source: PrettyPiano YouTube lesson "UPGRADE Your Drop 2 - All 12 Keys"
//   https://youtu.be/cT1zYpDogs0
//
// Sister vocabulary to the Phase Drop2&3 PR 1 UNLIMITED Patterns:
//
//   UNLIMITED Patterns (theory-lab#33):
//     "コード循環" を Drop 2 & 3 で表現 — 4 cycles (I-iii-IV / IV-V-vi /
//     vi-I-vii° / I-iii-ii-I) with the same per-degree voicings.
//
//   UPGRADE Drop 2 (this module):
//     "メロディハーモナイゼーション" 視点 — C major scale の 7 音
//     (C, D, E, F, G, A, B, C-octave) を順に top note にした 8 voicings。
//     ピアニストが「メロディ音が鳴った時にどう Drop 2 で支えるか」の
//     実用語彙集。
//
// Design notes for this PR (PR 1 of 3):
//
//   - Bars 1, 4, 5, 6, 7 の音名は UNLIMITED voicings と完全一致するが、
//     UPGRADE 用に独自の symbol / roman / degreesLabel を付与する
//     (chord symbol が UPGRADE context で異なる教材意図のため)。
//   - Bar 2 (D top) と Bar 3 (E top) も音名は UNLIMITED と一致するが、
//     spec 上「廣嶋さん要確認」と明記されており、UPGRADE 専用 voicing
//     として独立させて将来の差し替えを容易にする。
//   - Bar 8 (C オクターブ上) は Bar 1 と LH/RH 構成は同じだが、E が
//     E5 にオクターブシフト — spec の option A を採用、解決感を強調。
//
// Voicing convention (Drop 2 系):
//   LH: bass note (1 音, 通常 octave 2-3)
//   RH: 3 upper voices (octaves 3-5)
//
// chord symbol について: PDF には chord symbol 記載なし。spec の labels
// (Cmaj add9 / Dm7 / C add9/E / Fmaj add9 / G7sus4 / F6/9 / G6/9) を
// verbatim 採用。実機検証フェーズで訂正可能。

// upgradeC_top1 — C top, Cmaj add9. Notes: C3-G3-D4-E4 (UNLIMITED I と同一)
export const V_upgradeC_top1: Voicing = {
  symbol: 'Cmaj add9',
  roman: 'CM: I (top: C)',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 upgrade)',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '5' },
    { note: 'D4', degree: '9' },
    { note: 'E4', degree: '3' },
  ],
};

// upgradeC_top2 — D top, Dm7 (parallel-minor color). Notes: D3-Bb3-C4-F4
// 廣嶋さん確認事項: B♭ が正しいか、それとも B natural か。
// 暫定で UNLIMITED ii と同じ B♭ (♭13) 解釈を採用。
export const V_upgradeC_top2: Voicing = {
  symbol: 'Dm7',
  roman: 'CM: ii (top: D)',
  degreesLabel: 'L.H. R / R.H. ♭13, ♭7, ♭3 (Drop 2 upgrade)',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'Bb3', degree: '♭13' },
    { note: 'C4',  degree: '♭7'  },
    { note: 'F4',  degree: '♭3'  },
  ],
};

// upgradeC_top3 — E top, C add9/E (slash chord). Notes: E3-C4-D4-G4
// E bass の上に C add9 (no E) — 教材的には I の 3rd inversion 的解釈。
export const V_upgradeC_top3: Voicing = {
  symbol: 'C add9/E',
  roman: 'CM: I/3 (top: E)',
  degreesLabel: 'L.H. 3 (E bass) / R.H. R, 9, 5 of C (Drop 2 upgrade)',
  lh: [{ note: 'E3', degree: '3 (bass)' }],
  rh: [
    { note: 'C4', degree: 'R'  },
    { note: 'D4', degree: '9'  },
    { note: 'G4', degree: '5'  },
  ],
};

// upgradeC_top4 — F top, Fmaj add9. Notes: F3-C4-G4-A4 (UNLIMITED IV と同一)
export const V_upgradeC_top4: Voicing = {
  symbol: 'Fmaj add9',
  roman: 'CM: IV (top: F)',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 upgrade)',
  lh: [{ note: 'F3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '5' },
    { note: 'G4', degree: '9' },
    { note: 'A4', degree: '3' },
  ],
};

// upgradeC_top5 — G top, G7sus4 (per spec). Notes: G3-D4-A4-B4 (UNLIMITED V と同一)
// spec が "G7sus4" と記載しているが実際の音は R-5-9-3 (no ♭7, no sus4) で
// 厳密には Gadd9 / G(2)。実機検証で訂正予定として spec の symbol を verbatim 採用。
export const V_upgradeC_top5: Voicing = {
  symbol: 'G7sus4',
  roman: 'CM: V (top: G)',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 upgrade — verify symbol)',
  lh: [{ note: 'G3', degree: 'R' }],
  rh: [
    { note: 'D4', degree: '5' },
    { note: 'A4', degree: '9' },
    { note: 'B4', degree: '3' },
  ],
};

// upgradeC_top6 — A top, F6/9 (per spec, slash chord on A bass).
// Notes: A3-F4-G4-C5 (UNLIMITED vi と同一)
// 別解釈: Am7 ♭13。 spec は IV6/9 (F の 9 / 6 / R / 5) を採用。
export const V_upgradeC_top6: Voicing = {
  symbol: 'F6/9',
  roman: 'CM: IV6/9 (top: A)',
  degreesLabel: 'L.H. 3 (A bass) / R.H. R, 9, 5 of F (Drop 2 upgrade)',
  lh: [{ note: 'A3', degree: '3 (bass)' }],
  rh: [
    { note: 'F4', degree: 'R'  },
    { note: 'G4', degree: '9'  },
    { note: 'C5', degree: '5'  },
  ],
};

// upgradeC_top7 — B top, G6/9 (per spec, slash chord on B bass — octave-2 outlier).
// Notes: B2-G3-A3-D4 (UNLIMITED vii と同一)
// LH=B2 (octave-2) は UNLIMITED Pattern 3 と同じく低域への解決を演出。
// 別解釈: Bm7♭5 (no ♭5)。 spec は V6/9 (G の R / 9 / 5) を採用。
export const V_upgradeC_top7: Voicing = {
  symbol: 'G6/9',
  roman: 'CM: V6/9 (top: B)',
  degreesLabel: 'L.H. 3 (B bass, octave 2) / R.H. R, 9, 5 of G (Drop 2 upgrade)',
  lh: [{ note: 'B2', degree: '3 (bass)' }],
  rh: [
    { note: 'G3', degree: 'R'  },
    { note: 'A3', degree: '9'  },
    { note: 'D4', degree: '5'  },
  ],
};

// upgradeC_top8 — C top (octave-up resolve), Cmaj add9. Notes: C3-G3-D4-E5
// Bar 1 と LH/RH 構成は同じだが、E を E5 にオクターブシフト (spec option A)。
// スケール上行の解決感: 7音 (C-D-E-F-G-A-B) を上行した後、E が一段
// 上のオクターブへ持ち上がることで、Bar 1 (E4) → Bar 8 (E5) の
// 「voicing 内オクターブ昇り」を実現。
export const V_upgradeC_top8: Voicing = {
  symbol: 'Cmaj add9',
  roman: 'CM: I (top: C, oct up resolve)',
  degreesLabel: 'L.H. R / R.H. 5, 9, 3 (Drop 2 upgrade, E one octave higher)',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '5' },
    { note: 'D4', degree: '9' },
    { note: 'E5', degree: '3 (oct up)' },
  ],
};
