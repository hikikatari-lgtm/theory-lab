import type { ArrangePreset } from './types';

// カブトムシ - aiko (Key C)
// 9 小節構成。シンプル → 原曲のリッチな響きを 3 段階で。
//
// Original  : C / F / G の 3 コード型
// Arrange①: ダイアトニックの 7th 化 (Dm7 / Em7 / Am7 / Dm7/G)
// Arrange②: 原曲発展型。セカンダリードミナント (E7 / E7/G♯) と
//            借用 (Gm7 / F♯m7 / Fm6 / Cm/E♭) と V11 (F/G) で
//            原曲の半音上下行と陰影を再現する。

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
const DM_TRI = {
  id: 'dm-tri',
  symbol: 'Dm',
  roman: 'IIm',
  degreesLabel: 'R, ♭3, 5',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'R' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

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

const E7_ON_GSHARP = {
  id: 'e7-on-gsharp',
  symbol: 'E7/G♯',
  roman: 'III7/♯V',
  degreesLabel: '♭7, R, 3, 5 / bass=3rd',
  lh: [{ note: 'G#2', degree: '3' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'E3', degree: 'R' },
    { note: 'G#3', degree: '3' },
    { note: 'B3', degree: '5' },
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

const FSHARP_M7 = {
  id: 'fsharp-m7',
  symbol: 'F♯m7',
  roman: '♯IVm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '♭7' },
    { note: 'A3', degree: '♭3' },
    { note: 'C#4', degree: '5' },
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

const CM_ON_EFLAT = {
  id: 'cm-on-eflat',
  symbol: 'Cm/E♭',
  roman: 'Im/♭III',
  degreesLabel: 'R, ♭3, 5 / bass=♭3rd',
  lh: [{ note: 'Eb2', degree: '♭3' }],
  rh: [
    { note: 'C4', degree: 'R' },
    { note: 'Eb4', degree: '♭3' },
    { note: 'G4', degree: '5' },
  ],
};

// F/G: F triad over G bass。V11 / Gsus 系の機能で C への
// 柔らかい解決を作る。
const F_ON_G = {
  id: 'f-on-g',
  symbol: 'F/G',
  roman: 'IV/V',
  degreesLabel: 'F triad over G bass',
  lh: [{ note: 'G2', degree: '9' }],
  rh: [
    { note: 'C4', degree: '5' },
    { note: 'F4', degree: 'R' },
    { note: 'A4', degree: '3' },
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

export const kabutomushi: ArrangePreset = {
  id: 'kabutomushi',
  label: 'カブトムシ',
  subtitle: 'aiko — Key C',
  key: 'C',
  tempo: 76,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 (C / F / G)
      // |C|F|C|C|C|F|C|F-G|C|
      bars: [
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: F_TRI }] },
        { chords: [{ chord: C_TRI }] },
        { chords: [{ chord: C_TRI }] },
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
      // 基本型 — ダイアトニック 7th 化 + 終止に Dm7/G の Vsus
      // |C|Dm7|Em7|Em7|Am7|F|Em7-Am7|Dm7-Dm7/G|Am7|
      bars: [
        { chords: [{ chord: C_TRI }] },
        {
          chords: [
            {
              chord: DM7,
              added: true,
              technique: 'IIm7 — IV を IIm7 に置き換えてサブドミナント感',
            },
          ],
        },
        {
          chords: [
            {
              chord: EM7,
              added: true,
              technique: 'IIIm7 — トニック代理 (少し陰を入れる)',
            },
          ],
        },
        { chords: [{ chord: EM7, added: true }] },
        {
          chords: [
            {
              chord: AM7,
              added: true,
              technique: 'VIm7 — 自然なトニック代理',
            },
          ],
        },
        { chords: [{ chord: F_TRI }] },
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
        { chords: [{ chord: AM7, added: true }] },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — セカンダリードミナント・借用・半音上下行
      // |C|Dm|C/E|E7-E7/G♯|Am7-Gm7|F♯m7-Fm6|Em7-Cm/E♭|Dm7-F/G|Am7-Gm7-C7|
      bars: [
        { chords: [{ chord: C_TRI }] },
        // Bar 2: Dm (Arrange① の Dm7 を 7 抜き triad に変更)
        {
          chords: [
            {
              chord: DM_TRI,
              added: true,
              technique: 'Dm7 → Dm (7 を抜いて純粋なマイナートライアド)',
            },
          ],
        },
        // Bar 3: C/E (Em7 → C/E でバスを 3rd に)
        {
          chords: [
            {
              chord: C_ON_E,
              added: true,
              technique: 'I/III オンコード (3度をベースに → 上行バス)',
            },
          ],
        },
        // Bar 4: E7(2) - E7/G♯(2)
        {
          chords: [
            {
              chord: E7,
              added: true,
              technique:
                'III7 セカンダリードミナント (Am7 への解決を準備)',
            },
            {
              chord: E7_ON_GSHARP,
              added: true,
              technique:
                'オンコード (G♯ = 3 を bass に → Am への半音上行)',
            },
          ],
        },
        // Bar 5: Am7(2) - Gm7(2)
        {
          chords: [
            { chord: AM7 },
            {
              chord: GM7,
              added: true,
              technique:
                'Vm7 借用 — C7 への 251 準備 (次に F♯m7 を経て下降)',
            },
          ],
        },
        // Bar 6: F♯m7(2) - Fm6(2)
        {
          chords: [
            {
              chord: FSHARP_M7,
              added: true,
              technique: '♯IVm7 — Gm7 から半音下行で Fm6 へ繋ぐ',
            },
            {
              chord: FM6,
              added: true,
              technique: 'IVm6 サブドミナントマイナー (切ない響き)',
            },
          ],
        },
        // Bar 7: Em7(2) - Cm/E♭(2)
        {
          chords: [
            { chord: EM7 },
            {
              chord: CM_ON_EFLAT,
              added: true,
              technique:
                '借用 Im/♭III (E → E♭ の半音下行バスで Dm7 へ)',
            },
          ],
        },
        // Bar 8: Dm7(2) - F/G(2)
        {
          chords: [
            { chord: DM7 },
            {
              chord: F_ON_G,
              added: true,
              technique: 'F/G — V11 (Vsus 型で C へ柔らかく解決)',
            },
          ],
        },
        // Bar 9: Am7(2) - Gm7(1) - C7(1)
        {
          chords: [
            { chord: AM7, beats: 2 },
            { chord: GM7, beats: 1 },
            {
              chord: C7,
              beats: 1,
              added: true,
              technique:
                'セカンダリードミナント (V7/IV — F へ進む準備)',
            },
          ],
        },
      ],
    },
  ],
};
