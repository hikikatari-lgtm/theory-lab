import type { ArrangePreset } from './types';

// Everything - MISIA (Key C)
// 8 小節 × 3 段階。シンプル → ダイアトニック → 原曲の細かい
// 内声クリシェ・テンション・パッシングコードを段階的に体験。
//
// Original  : C / F / G の 3 コード型
// Arrange①: ダイアトニック化 (Am / Fmaj7 / Em7 / Am7 / Dm7 / Dm7/G)
// Arrange②: Gadd9/B / Gm6 / F(♯5) / G/F / A7(♯11) / A7 /
//            G7(13,♭9) / A7(♯9) / Fm6/A♭ で原曲の色気と
//            内声半音上下行を再現。

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
const AM_TRI = {
  id: 'am-tri',
  symbol: 'Am',
  roman: 'VIm',
  degreesLabel: '♭3, 5, R',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5' },
    { note: 'A4', degree: 'R' },
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
  lh: [{ note: 'G2', degree: '11' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'D4', degree: 'R' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

// ---------- Arrange② で追加されるコード ----------

// Gadd9/B: G triad + 9 を bass=3rd に。
const GADD9_ON_B = {
  id: 'gadd9-on-b',
  symbol: 'Gadd9/B',
  roman: 'Vadd9/VII',
  degreesLabel: '9, 5, R / bass=3rd',
  lh: [{ note: 'B2', degree: '3' }],
  rh: [
    { note: 'A3', degree: '9' },
    { note: 'D4', degree: '5' },
    { note: 'G4', degree: 'R' },
  ],
};

// Gm6: G-Bb-D-E (借用; Am7→Gm6→Fmaj7 の半音下行)
const GM6 = {
  id: 'gm6',
  symbol: 'Gm6',
  roman: 'Vm6',
  degreesLabel: '♭3, 5, 6',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'Bb3', degree: '♭3' },
    { note: 'D4', degree: '5' },
    { note: 'E4', degree: '6' },
  ],
};

// F(♯5): Fmaj7 の 5 を半音上げて #5 にした内声クリシェ。
// C → C♯ → D の上行を Fmaj7→F(♯5)→G/F で作る。
const F_SHARP5 = {
  id: 'f-sharp5',
  symbol: 'F(♯5)',
  roman: 'IV(♯5)',
  degreesLabel: '7, 3, ♯5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '7' },
    { note: 'A3', degree: '3' },
    { note: 'C#4', degree: '♯5' },
  ],
};

// G/F: G triad over F bass。F は G の ♭7。
// 内声クリシェ Fmaj7 → F(♯5) → G/F の最終形。
const G_ON_F = {
  id: 'g-on-f',
  symbol: 'G/F',
  roman: 'V/IV',
  degreesLabel: '3, 5, R / bass=♭7',
  lh: [{ note: 'F2', degree: '♭7' }],
  rh: [
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
    { note: 'G4', degree: 'R' },
  ],
};

// A7(♯11): A7 + #11 (D♯)。Em7 → A7(♯11) → A7 で
// テンション → ナチュラルへの内声解決。
const A7_SHARP11 = {
  id: 'a7-sharp11',
  symbol: 'A7(♯11)',
  roman: 'VI7(♯11)',
  degreesLabel: '♭7, 3, ♯11',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C#4', degree: '3' },
    { note: 'D#4', degree: '♯11' },
  ],
};

// A7: Dm7 への secondary dominant (V/II)。
const A7 = {
  id: 'a7',
  symbol: 'A7',
  roman: 'VI7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C#4', degree: '3' },
    { note: 'E4', degree: '5' },
  ],
};

// G7(13,♭9): altered V — ♭9 (A♭) + 13 (E) の組み合わせ。
const G7_13_FLAT9 = {
  id: 'g7-13-b9',
  symbol: 'G7(13,♭9)',
  roman: 'V7(13,♭9)',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'Ab3', degree: '♭9' },
    { note: 'B3', degree: '3' },
    { note: 'E4', degree: '13' },
  ],
};

// A7(♯9): Hendrix Chord — ♭7, ♯9, 3 で 5度抜き。
// Dm7 への強い解決を作る。
const A7_SHARP9 = {
  id: 'a7-sharp9',
  symbol: 'A7(♯9)',
  roman: 'VI7(♯9)',
  degreesLabel: '♭7, ♯9, 3',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C4', degree: '♯9' },
    { note: 'C#4', degree: '3' },
  ],
};

// Fm6/A♭: IVm6 を ♭3 (A♭) ベースに置く分数オンコード。
// Dm7 → Fm6/A♭ → Dm7/G で C → A♭ → G の半音下行バス。
const FM6_ON_AB = {
  id: 'fm6-on-ab',
  symbol: 'Fm6/A♭',
  roman: 'IVm6/♭VI',
  degreesLabel: '6, R, ♭3, 5 / bass=♭3rd',
  lh: [{ note: 'Ab2', degree: '♭3' }],
  rh: [
    { note: 'D3', degree: '6' },
    { note: 'F3', degree: 'R' },
    { note: 'Ab3', degree: '♭3' },
    { note: 'C4', degree: '5' },
  ],
};

export const everything: ArrangePreset = {
  id: 'everything',
  label: 'Everything',
  subtitle: 'MISIA — Key C',
  key: 'C',
  tempo: 72,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 (C / F / G) — 8 小節
      // |C|C|F|C|F|C|F-G|C|
      bars: [
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }, { chord: G_TRI }] },
        { chords: [{ chord: C_TRI }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — ダイアトニック化 + 終止に Vsus
      // |C|Am|Fmaj7|Em7|Dm7|Em7-Am7|Dm7-Dm7/G|C|
      bars: [
        { chords: [{ chord: C_TRI }] },
        {
          chords: [
            {
              chord: AM_TRI,
              added: true,
              technique: 'VIm — トニック代理 (少し陰を入れる)',
            },
          ],
        },
        {
          chords: [
            {
              chord: FMAJ7,
              added: true,
              technique: 'IV△7 — F triad に 7th を加えて深み',
            },
          ],
        },
        {
          chords: [
            {
              chord: EM7,
              added: true,
              technique: 'IIIm7 — トニック代理 + 下行ベースで Dm7 へ',
            },
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
            { chord: EM7, added: true },
            { chord: AM7, added: true },
          ],
        },
        {
          chords: [
            { chord: DM7, added: true },
            {
              chord: DM7_ON_G,
              added: true,
              technique:
                'オンコード (V7sus9 風 — トニックへの柔らかい解決)',
            },
          ],
        },
        { chords: [{ chord: C_TRI }] },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — 内声クリシェ + テンション + 借用
      // |C|Gadd9/B|Am7-Gm6|Fmaj7-F(♯5)-G/F|
      // |Em7-A7(♯11)-A7|Dm7-G7(13,♭9)|Em7-A7(♯9)|Dm7-Fm6/A♭-Dm7/G|
      bars: [
        // Bar 1: C
        { chords: [{ chord: C_TRI }] },
        // Bar 2: Gadd9/B
        {
          chords: [
            {
              chord: GADD9_ON_B,
              added: true,
              technique:
                'オンコード (V add9 を 3 度 = B bass に — C → B の下行)',
            },
          ],
        },
        // Bar 3: Am7(2) - Gm6(2)
        {
          chords: [
            { chord: AM7 },
            {
              chord: GM6,
              added: true,
              technique:
                'Vm6 借用 (A → G → F の半音下行バスを Am7→Gm6→Fmaj7 で作る)',
            },
          ],
        },
        // Bar 4: Fmaj7(2) - F(♯5)(1) - G/F(1)  [2-1-1]
        {
          chords: [
            { chord: FMAJ7, beats: 2 },
            {
              chord: F_SHARP5,
              beats: 1,
              added: true,
              technique:
                '内声クリシェ (Fmaj7 の 5 を ♯5 に上げる: C → C♯ の半音上行)',
            },
            {
              chord: G_ON_F,
              beats: 1,
              added: true,
              technique:
                '内声クリシェ最終形 (C♯ → D で F bass のまま G triad へ)',
            },
          ],
        },
        // Bar 5: Em7(2) - A7(♯11)(1) - A7(1)  [2-1-1]
        {
          chords: [
            { chord: EM7, beats: 2 },
            {
              chord: A7_SHARP11,
              beats: 1,
              added: true,
              technique:
                'VI7(♯11) — テンション付きセカンダリードミナント (Dm7 への準備)',
            },
            {
              chord: A7,
              beats: 1,
              added: true,
              technique:
                'A7 — ♯11 → ナチュラル 5 への内声解決',
            },
          ],
        },
        // Bar 6: Dm7(2) - G7(13,♭9)(2)
        {
          chords: [
            { chord: DM7 },
            {
              chord: G7_13_FLAT9,
              added: true,
              technique:
                'V7(13,♭9) — altered V (♭9 のドミナント感 + 13 の彩り)',
            },
          ],
        },
        // Bar 7: Em7(2) - A7(♯9)(2)
        {
          chords: [
            { chord: EM7 },
            {
              chord: A7_SHARP9,
              added: true,
              technique:
                'VI7(♯9) — Hendrix 風 (5 抜き + ♯9 で強烈な解決感)',
            },
          ],
        },
        // Bar 8: Dm7(2) - Fm6/A♭(1) - Dm7/G(1)  [2-1-1]
        {
          chords: [
            { chord: DM7, beats: 2 },
            {
              chord: FM6_ON_AB,
              beats: 1,
              added: true,
              technique:
                '借用オンコード (D → A♭ → G の半音下行バスを Dm7→Fm6/A♭→Dm7/G で作る)',
            },
            { chord: DM7_ON_G, beats: 1 },
          ],
        },
      ],
    },
  ],
};
