import type { ArrangePreset } from './types';

// どんなときも - 槇原敬之 (Key C)
// 8 小節 × 3 段階。F / C / G の 3 コード型から、ダイアトニック
// 7th 化を経て、原曲のオンコード (C/E) と セカンダリードミナント
// (E7) と augmented パッシング (Eaug/G♯) で彩る発展型へ。
//
// Original  : F / C / G の 3 コード型
// Arrange①: Dm7 / Em7 / Am7 / Dm7/G を加えた基本型
// Arrange②: C/E + E7 + Eaug/G♯ (3-1 拍チェンジ) で原曲発展型

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

// E7: Em7 → E7 への 3rd 半音上行 (G→G♯) で
// Am7 への secondary dominant (V/VIm)。
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

// Eaug/G♯: E aug = E-G♯-B♯(=C)。G♯ bass で
// Dm7/G → Eaug/G♯ の半音上行 (G → G♯) を作る
// 終止前のクロマティックパッシング。
const EAUG_ON_GSHARP = {
  id: 'eaug-on-gsharp',
  symbol: 'Eaug/G♯',
  roman: 'III+/♯V',
  degreesLabel: 'R, 3, ♯5 / bass=3rd',
  lh: [{ note: 'G#2', degree: '3' }],
  rh: [
    { note: 'E3', degree: 'R' },
    { note: 'G#3', degree: '3' },
    { note: 'C4', degree: '♯5' },
  ],
};

export const donnaTokiMo: ArrangePreset = {
  id: 'donna-toki-mo',
  label: 'どんなときも',
  subtitle: '槇原敬之 — Key C',
  key: 'C',
  tempo: 128,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 — 8 小節
      // |F|C|F-G|C|F-G|C|F|G|
      bars: [
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }, { chord: G_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }, { chord: G_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: G_TRI }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — ダイアトニック 7th 化 + 終止に Vsus
      // |F|C|Dm7-Em7|Am7|F-G|Em7-Am7|Dm7|Dm7/G|
      bars: [
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        // Bar 3: Dm7(2) - Em7(2)
        {
          chords: [
            {
              chord: DM7,
              added: true,
              technique: 'IIm7 — F のサブドミナントを IIm7 に',
            },
            {
              chord: EM7,
              added: true,
              technique: 'IIIm7 — トニック代理 (D → E の上行)',
            },
          ],
        },
        // Bar 4: Am7
        {
          chords: [
            {
              chord: AM7,
              added: true,
              technique: 'VIm7 — 自然なトニック代理',
            },
          ],
        },
        // Bar 5: F-G (Original のまま)
        { chords: [{ chord: F_TRI }, { chord: G_TRI }] },
        // Bar 6: Em7(2) - Am7(2)
        {
          chords: [
            { chord: EM7, added: true },
            { chord: AM7, added: true },
          ],
        },
        // Bar 7: Dm7
        { chords: [{ chord: DM7, added: true }] },
        // Bar 8: Dm7/G  (V7sus 風で次のループ頭 F へ向かう)
        {
          chords: [
            {
              chord: DM7_ON_G,
              added: true,
              technique:
                'オンコード (V7sus9 風 — 柔らかい解決準備)',
            },
          ],
        },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — オンコード + secondary dominant + augmented
      // |F|C/E|Dm7-E7|Am7|F-G|Em7-Am7|Dm7|Dm7/G - Eaug/G♯|
      bars: [
        { chords: [{ chord: F_TRI }] },
        // Bar 2: C/E (C → C/E でバスを 3rd に — F→E の半音下行)
        {
          chords: [
            {
              chord: C_ON_E,
              added: true,
              technique:
                'I/III オンコード (F → E の半音下行バスを作る)',
            },
          ],
        },
        // Bar 3: Dm7(2) - E7(2) — Em7 を E7 に変えて Am7 への
        // secondary dominant に
        {
          chords: [
            { chord: DM7 },
            {
              chord: E7,
              added: true,
              technique:
                'III7 セカンダリードミナント (Em7 → E7 の 3rd 上行 G→G♯ で Am7 への解決を強める)',
            },
          ],
        },
        { chords: [{ chord: AM7 }] },
        { chords: [{ chord: F_TRI }, { chord: G_TRI }] },
        {
          chords: [{ chord: EM7 }, { chord: AM7 }],
        },
        { chords: [{ chord: DM7 }] },
        // Bar 8: Dm7/G(3) - Eaug/G♯(1)  [3-1 拍チェンジ]
        {
          chords: [
            { chord: DM7_ON_G, beats: 3 },
            {
              chord: EAUG_ON_GSHARP,
              beats: 1,
              added: true,
              technique:
                'クロマティックパッシング (G → G♯ の半音上行 + augmented で次の F への期待感)',
            },
          ],
        },
      ],
    },
  ],
};
