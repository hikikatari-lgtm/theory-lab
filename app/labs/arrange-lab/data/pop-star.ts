import type { ArrangePreset } from './types';

// POP STAR - 平井堅 (Key C)
// 8 小節 × 3 段階。F / C / G の 3 コード型から、ダイアトニック
// 7th 化 → オンコード + secondary dominant + 半音下行クロマティック
// (Am7→G♯m7→Gm7→C7) で原曲のリッチな響きへ。
//
// Arrange② の Bar 4 / Bar 8 は 4 拍均等の 4 コードチェンジ
// (1 拍ずつ) で半音下行を一気に駆け抜ける。
//
// Original  : F / C / G の 3 コード型
// Arrange①: F△7 / Am7 / G7 / Em7 を加えた基本型
// Arrange②: C/E + E7 + G♯dim7 + 半音下行クロマティック
//            + G7/F + F♯m7♭5 で原曲発展型

// ---------- Original (3 コード型) ----------
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

const G7 = {
  id: 'g7',
  symbol: 'G7',
  roman: 'V7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
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

// ---------- Arrange② で追加されるコード ----------
const C_ON_E = {
  id: 'c-on-e',
  symbol: 'C/E',
  roman: 'I/III',
  degreesLabel: 'R, 3, 5 / bass=3rd',
  lh: [{ note: 'E2', degree: '3' }],
  rh: [
    { note: 'C4', degree: 'R' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
  ],
};

const E7 = {
  id: 'e7',
  symbol: 'E7',
  roman: 'III7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'G#3', degree: '3' },
    { note: 'B3', degree: '5' },
  ],
};

// G♯dim7 = G♯-B-D-F。Am7 への半音上行パッシング
// ディミニッシュ。
const GSHARP_DIM7 = {
  id: 'gsharp-dim7',
  symbol: 'G♯dim7',
  roman: '♯Vdim7',
  degreesLabel: '♭3, ♭5, ♭♭7',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '♭3' },
    { note: 'D4', degree: '♭5' },
    { note: 'F4', degree: '♭♭7' },
  ],
};

// G♯m7: Am7 → G♯m7 → Gm7 の半音下行クロマティックの中央。
const GSHARP_M7 = {
  id: 'gsharp-m7',
  symbol: 'G♯m7',
  roman: '♯Vm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'F#3', degree: '♭7' },
    { note: 'B3', degree: '♭3' },
    { note: 'D#4', degree: '5' },
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

// G7/F: G7 over F bass。F は G の ♭7。
const G7_ON_F = {
  id: 'g7-on-f',
  symbol: 'G7/F',
  roman: 'V7/♭VII',
  degreesLabel: '♭7, R, 3, 5, R / bass=♭7',
  lh: [{ note: 'F2', degree: '♭7' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
    { note: 'G4', degree: 'R' },
  ],
};

// F♯m7(♭5): F♯-A-C-E。半音下行の終点で
// F♯ → F (or 次の chord) へのクロマティック。
const FSHARP_M7B5 = {
  id: 'fsharp-m7b5',
  symbol: 'F♯m7(♭5)',
  roman: '♯IVm7(♭5)',
  degreesLabel: '♭7, ♭3, ♭5',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '♭7' },
    { note: 'A3', degree: '♭3' },
    { note: 'C4', degree: '♭5' },
  ],
};

export const popStar: ArrangePreset = {
  id: 'pop-star',
  label: 'POP STAR',
  subtitle: '平井堅 — Key C',
  key: 'C',
  tempo: 128,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 — 8 小節
      // |F|C|G|C|F|G|G|C|
      bars: [
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: G_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: G_TRI }] },
        { chords: [{ chord: G_TRI }] },
        { chords: [{ chord: C_TRI }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — F → F△7 / G → G7 / Em7・Am7 を追加
      // |F△7|C|G|Am7|F△7|G7|Em7|Am7|
      bars: [
        {
          chords: [
            {
              chord: FMAJ7,
              added: true,
              technique: 'IV△7 — F の 7th 化で深み',
            },
          ],
        },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: G_TRI }] },
        {
          chords: [
            {
              chord: AM7,
              added: true,
              technique: 'VIm7 — トニック代理',
            },
          ],
        },
        { chords: [{ chord: FMAJ7, added: true }] },
        {
          chords: [
            {
              chord: G7,
              added: true,
              technique: 'V7 — G の 7th 化で解決感を強める',
            },
          ],
        },
        {
          chords: [
            {
              chord: EM7,
              added: true,
              technique: 'IIIm7 — トニック代理 (Am7 への上行ベース)',
            },
          ],
        },
        { chords: [{ chord: AM7, added: true }] },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — オンコード + secondary dominant +
      // 半音下行クロマティック (Am7→G♯m7→Gm7→...) + G7/F
      // |F△7|C/E|E7-G♯dim7|Am7-G♯m7-Gm7-C7|
      // |F△7|G7/F|E7-G♯dim7|Am7-G♯m7-Gm7-F♯m7♭5|
      bars: [
        // Bar 1: F△7
        { chords: [{ chord: FMAJ7 }] },
        // Bar 2: C/E (C → C/E でバスを 3rd に)
        {
          chords: [
            {
              chord: C_ON_E,
              added: true,
              technique:
                'I/III オンコード (C → E のバス下行で次のセクションへ)',
            },
          ],
        },
        // Bar 3: E7(2) - G♯dim7(2)
        {
          chords: [
            {
              chord: E7,
              added: true,
              technique:
                'III7 セカンダリードミナント (Am7 への解決を準備)',
            },
            {
              chord: GSHARP_DIM7,
              added: true,
              technique:
                'パッシングディミニッシュ (G♯dim7 → Am7 の半音上行)',
            },
          ],
        },
        // Bar 4: Am7(1) - G♯m7(1) - Gm7(1) - C7(1)  [4 コード均等 1 拍]
        {
          chords: [
            { chord: AM7 },
            {
              chord: GSHARP_M7,
              added: true,
              technique:
                '半音下行クロマティック (Am7 → G♯m7 → Gm7 → C7 の中央)',
            },
            {
              chord: GM7,
              added: true,
              technique: 'Vm7 借用 — C7 への 251 準備',
            },
            {
              chord: C7,
              added: true,
              technique:
                'セカンダリードミナント (V7/IV — F△7 へ進む)',
            },
          ],
        },
        // Bar 5: F△7
        { chords: [{ chord: FMAJ7 }] },
        // Bar 6: G7/F (G7 を ♭7 = F bass に)
        {
          chords: [
            {
              chord: G7_ON_F,
              added: true,
              technique:
                'オンコード (V7 を ♭7 bass に置き、次の E への半音下行を準備)',
            },
          ],
        },
        // Bar 7: E7(2) - G♯dim7(2)
        {
          chords: [
            { chord: E7, added: true },
            { chord: GSHARP_DIM7, added: true },
          ],
        },
        // Bar 8: Am7(1) - G♯m7(1) - Gm7(1) - F♯m7♭5(1)
        // 半音下行を最後まで継続: A → G♯ → G → F♯
        {
          chords: [
            { chord: AM7 },
            { chord: GSHARP_M7, added: true },
            { chord: GM7, added: true },
            {
              chord: FSHARP_M7B5,
              added: true,
              technique:
                '♯IVm7(♭5) — 半音下行の終点 (F♯ から次のループ頭 F へ)',
            },
          ],
        },
      ],
    },
  ],
};
