import type { ArrangePreset } from './types';

// Just The Way You Are - Billy Joel (Key C)
// 8 小節構成。シンプル → 複雑の 3 段階で原曲のリッチな響きを再現する。
//
//  Original  : 3 コード型 (C / F / G) — 最もプリミティブな置き換え
//  Arrange①: 7th 化 + Dm7(onG) で 80s ポップス風の基本型
//  Arrange②: Am6 / Fm7 / Cadd9(onE) / Gm7 / C7 で原曲の色気を再現
//
// `added` / `technique` は slot レベル — そのバージョンで初出のコード
// だけがハイライトされる。前バージョンから引き継いだコードは普通色。

// ---------- Original (3 コード型) ----------
const C_TRI = {
  id: 'c-tri',
  symbol: 'C',
  roman: 'I',
  degreesLabel: 'R, 3, 5',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: 'R' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
  ],
};

const F_TRI = {
  id: 'f-tri',
  symbol: 'F',
  roman: 'IV',
  degreesLabel: '5, R, 3',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '5' },
    { note: 'F4', degree: 'R' },
    { note: 'A4', degree: '3' },
  ],
};

const G_TRI = {
  id: 'g-tri',
  symbol: 'G',
  roman: 'V',
  degreesLabel: '3, 5, R',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
    { note: 'G4', degree: 'R' },
  ],
};

// ---------- Arrange① で追加されるコード ----------
const AM7 = {
  id: 'am7',
  symbol: 'Am7',
  roman: 'VIm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5' },
  ],
};

const FMAJ7 = {
  id: 'fmaj7',
  symbol: 'F△7',
  roman: 'IV△7',
  degreesLabel: '7, 3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '7' },
    { note: 'A3', degree: '3' },
    { note: 'C4', degree: '5' },
  ],
};

const EM7 = {
  id: 'em7',
  symbol: 'Em7',
  roman: 'IIIm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'G3', degree: '♭3' },
    { note: 'B3', degree: '5' },
  ],
};

const DM7 = {
  id: 'dm7',
  symbol: 'Dm7',
  roman: 'IIm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

const DM7_ON_G = {
  id: 'dm7-on-g',
  symbol: 'Dm7/G',
  roman: 'IIm7/V',
  degreesLabel: 'Dm7 over G bass',
  // bass G は Dm7 の 11 (G = D の完4 上)。実質 G7sus9 と同型で
  // V7sus 機能としてトニックへ柔らかく解決する。
  lh: [{ note: 'G2', degree: '11' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'D4', degree: 'R' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

// ---------- Arrange② で追加されるコード ----------
const AM6 = {
  id: 'am6',
  symbol: 'Am6',
  roman: 'VIm6',
  degreesLabel: '6, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'F#3', degree: '6' },
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5' },
  ],
};

const FM7 = {
  id: 'fm7',
  symbol: 'Fm7',
  roman: 'IVm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'Eb3', degree: '♭7' },
    { note: 'Ab3', degree: '♭3' },
    { note: 'C4', degree: '5' },
  ],
};

const FM6 = {
  id: 'fm6',
  symbol: 'Fm6',
  roman: 'IVm6',
  degreesLabel: '6, ♭3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '6' },
    { note: 'Ab3', degree: '♭3' },
    { note: 'C4', degree: '5' },
  ],
};

const CADD9_ON_E = {
  id: 'cadd9-on-e',
  symbol: 'Cadd9/E',
  roman: 'Iadd9/III',
  degreesLabel: 'R, 9, 5 / bass=3rd',
  lh: [{ note: 'E2', degree: '3' }],
  rh: [
    { note: 'C4', degree: 'R' },
    { note: 'D4', degree: '9' },
    { note: 'G4', degree: '5' },
  ],
};

const GM7 = {
  id: 'gm7',
  symbol: 'Gm7',
  roman: 'Vm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'Bb3', degree: '♭3' },
    { note: 'D4', degree: '5' },
  ],
};

const C7 = {
  id: 'c7',
  symbol: 'C7',
  roman: 'I7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'Bb3', degree: '♭7' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
  ],
};

export const justTheWayYouAre: ArrangePreset = {
  id: 'just-the-way-you-are',
  label: 'Just The Way You Are',
  subtitle: 'Billy Joel — Key C',
  key: 'C',
  tempo: 76,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 — 2 拍チェンジを含む 8 小節
      // |C|F-C|F|C|
      // |F|C|F|G|
      bars: [
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }, { chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: G_TRI }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — 7th 化 + 2 拍チェンジで Am7 / Em7 を絡めたパターン
      // |C-Am7|F△7-Am7|F△7|Em7-Am7|
      // |F△7|Em7-Am7|Dm7|Dm7/G|
      bars: [
        {
          chords: [
            { chord: C_TRI },
            { chord: AM7, added: true, technique: 'VIm7 — トニック代理' },
          ],
        },
        {
          chords: [
            {
              chord: FMAJ7,
              added: true,
              technique: 'IV△7 — 7th を加えて深み',
            },
            { chord: AM7, added: true },
          ],
        },
        { chords: [{ chord: FMAJ7, added: true }] },
        {
          chords: [
            {
              chord: EM7,
              added: true,
              technique: 'IIIm7 — VIm への滑らかな経過音',
            },
            { chord: AM7, added: true },
          ],
        },
        { chords: [{ chord: FMAJ7, added: true }] },
        {
          chords: [
            { chord: EM7, added: true },
            { chord: AM7, added: true },
          ],
        },
        {
          chords: [
            {
              chord: DM7,
              added: true,
              technique: 'IIm7 — V前のサブドミナント',
            },
          ],
        },
        {
          chords: [
            {
              chord: DM7_ON_G,
              added: true,
              technique:
                'オンコード (V7sus9 風 — トニックへの柔らかい解決)',
            },
          ],
        },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — 2 拍チェンジ + 不均等チェンジ (2-1-1) で
      // 原曲の細かい色彩を再現。
      // |C-Am6|F△7-Am7-C|F△7-Fm7|Cadd9/E-Gm7-C7|
      // |F△7-Fm6|Em7-Am7|Dm7|Dm7/G|
      bars: [
        // Bar 1: C(2) - Am6(2)
        {
          chords: [
            { chord: C_TRI },
            {
              chord: AM6,
              added: true,
              technique:
                'Am7 → Am6 (6th 化で原曲の爽やかな響き)',
            },
          ],
        },
        // Bar 2: F△7(2) - Am7(1) - C(1)  ※ C は 3 つ目のトニック挿入
        {
          chords: [
            { chord: FMAJ7, beats: 2 },
            { chord: AM7, beats: 1 },
            {
              chord: C_TRI,
              beats: 1,
              added: true,
              technique:
                'トニック挿入 (Am7 → C で半小節だけ I に戻る原曲の動き)',
            },
          ],
        },
        // Bar 3: F△7(2) - Fm7(2)
        {
          chords: [
            { chord: FMAJ7 },
            {
              chord: FM7,
              added: true,
              technique: 'サブドミナントマイナー (IVm7 — 切ない響き)',
            },
          ],
        },
        // Bar 4: Cadd9/E(2) - Gm7(1) - C7(1)
        {
          chords: [
            {
              chord: CADD9_ON_E,
              beats: 2,
              added: true,
              technique:
                'オンコード + add9 (3度を bass に、9th でテンション付加)',
            },
            {
              chord: GM7,
              beats: 1,
              added: true,
              technique:
                'IIm7 of F (= V/IV の II) — C7 への 251 準備',
            },
            {
              chord: C7,
              beats: 1,
              added: true,
              technique:
                'セカンダリードミナント (V7/IV — F へ進行する準備)',
            },
          ],
        },
        // Bar 5: F△7(2) - Fm6(2)
        {
          chords: [
            { chord: FMAJ7 },
            {
              chord: FM6,
              added: true,
              technique:
                'IVm6 (Fm7 の 6th 化 — 終止に向かう陰影)',
            },
          ],
        },
        // Bar 6: Em7(2) - Am7(2)
        {
          chords: [{ chord: EM7 }, { chord: AM7 }],
        },
        // Bar 7: Dm7(4)
        { chords: [{ chord: DM7 }] },
        // Bar 8: Dm7/G(4)
        { chords: [{ chord: DM7_ON_G }] },
      ],
    },
  ],
};
