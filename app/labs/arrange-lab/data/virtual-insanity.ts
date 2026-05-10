import type { ArrangePreset } from './types';

// Virtual Insanity (A メロ) - Jamiroquai (Key Am)
// 8 小節 × 3 段階。Im - IVm - V7 のシンプルなマイナー進行から、
// モーダルインターチェンジ + テンション (9th / ♭9 / ♭13 / 13)
// を加えたアシッドジャズらしい原曲のリッチな響きへ。
//
// Original  : Am / Dm / E7 の 3 コード型
// Arrange①: Am7 / Dm7 / G7 / Cmaj7 / Fmaj7 を加えた基本型
// Arrange②: 9th / 13 / ♭9 / ♭13 のテンションと F♯m7♭5 で
//            原曲の彩り

// ---------- Original (3 コード型) ----------
const AM_TRI = {
  id: 'am-tri',
  symbol: 'Am',
  roman: 'Im',
  degreesLabel: '♭3, 5, R',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5' },
    { note: 'A4', degree: 'R' },
  ],
};

const DM_TRI = {
  id: 'dm-tri',
  symbol: 'Dm',
  roman: 'IVm',
  degreesLabel: 'R, ♭3, 5',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'D4', degree: 'R' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

const E7 = {
  id: 'e7',
  symbol: 'E7',
  roman: 'V7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'G#3', degree: '3' },
    { note: 'B3', degree: '5' },
  ],
};

// ---------- Arrange① で追加されるコード ----------
const AM7 = {
  id: 'am7',
  symbol: 'Am7',
  roman: 'Im7',
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
  roman: 'IVm7',
  degreesLabel: '♭7, ♭3, 5',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'F4', degree: '♭3' },
    { note: 'A4', degree: '5' },
  ],
};

const G7 = {
  id: 'g7',
  symbol: 'G7',
  roman: '♭VII7',
  degreesLabel: '♭7, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
  ],
};

const CMAJ7 = {
  id: 'cmaj7',
  symbol: 'C△7',
  roman: '♭III△7',
  degreesLabel: '7, 3, 5',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '7' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
  ],
};

const FMAJ7 = {
  id: 'fmaj7',
  symbol: 'F△7',
  roman: '♭VI△7',
  degreesLabel: '7, 3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '7' },
    { note: 'A3', degree: '3' },
    { note: 'C4', degree: '5' },
  ],
};

// ---------- Arrange② で追加されるコード ----------

const AM7_9 = {
  id: 'am7-9',
  symbol: 'Am7(9)',
  roman: 'Im7(9)',
  degreesLabel: '♭7, 9, ♭3, 5',
  lh: [{ note: 'A2', degree: 'R' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'B3', degree: '9' },
    { note: 'C4', degree: '♭3' },
    { note: 'E4', degree: '5' },
  ],
};

// D7(9): Dm7 → D7 への 3rd 半音上行 (F → F♯) で
// アシッドジャズ的な明るい彩り。secondary dominant of G7。
const D7_9 = {
  id: 'd7-9',
  symbol: 'D7(9)',
  roman: 'IV7(9)',
  degreesLabel: '♭7, 9, 3, 5',
  lh: [{ note: 'D3', degree: 'R' }],
  rh: [
    { note: 'C4', degree: '♭7' },
    { note: 'E4', degree: '9' },
    { note: 'F#4', degree: '3' },
    { note: 'A4', degree: '5' },
  ],
};

const G7_9 = {
  id: 'g7-9',
  symbol: 'G7(9)',
  roman: '♭VII7(9)',
  degreesLabel: '♭7, 9, 3, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'A3', degree: '9' },
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
  ],
};

const CMAJ7_9 = {
  id: 'cmaj7-9',
  symbol: 'C△7(9)',
  roman: '♭III△7(9)',
  degreesLabel: '7, 9, 3, 5',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '7' },
    { note: 'D4', degree: '9' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
  ],
};

// F♯m7(♭5): F♯-A-C-E。Am7 と Fmaj7 を繋ぐ半音下行の
// クロマティックパッシング (G → F♯ → F の bass)。
const FSHARP_M7B5 = {
  id: 'fsharp-m7b5',
  symbol: 'F♯m7(♭5)',
  roman: '♯VIm7(♭5)',
  degreesLabel: '♭7, ♭3, ♭5',
  lh: [{ note: 'F#2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '♭7' },
    { note: 'A3', degree: '♭3' },
    { note: 'C4', degree: '♭5' },
  ],
};

// E7(♭13,♭9): altered V — Im (Am) への強烈な解決感を作る。
const E7_B13_B9 = {
  id: 'e7-b13-b9',
  symbol: 'E7(♭13,♭9)',
  roman: 'V7(♭13,♭9)',
  degreesLabel: '♭7, ♭9, 3, ♭13',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'F3', degree: '♭9' },
    { note: 'G#3', degree: '3' },
    { note: 'C4', degree: '♭13' },
  ],
};

// G7(13,♭9): altered ♭VII7。原曲の細かい彩り。
const G7_13_B9 = {
  id: 'g7-13-b9',
  symbol: 'G7(13,♭9)',
  roman: '♭VII7(13,♭9)',
  degreesLabel: '♭7, ♭9, 3, 13',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'Ab3', degree: '♭9' },
    { note: 'B3', degree: '3' },
    { note: 'E4', degree: '13' },
  ],
};

export const virtualInsanity: ArrangePreset = {
  id: 'virtual-insanity',
  label: 'Virtual Insanity (A メロ)',
  subtitle: 'Jamiroquai — Key Am',
  key: 'Am',
  tempo: 100,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 — 8 小節
      // |Am-Dm|Am|Dm|E7-Am|Dm|Am|Dm-E7|Am|
      bars: [
        { chords: [{ chord: AM_TRI }, { chord: DM_TRI }] },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: DM_TRI }] },
        { chords: [{ chord: E7 }, { chord: AM_TRI }] },
        { chords: [{ chord: DM_TRI }] },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: DM_TRI }, { chord: E7 }] },
        { chords: [{ chord: AM_TRI }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — 7th 化 + ♭III△7 / ♭VI△7 借用で陰影
      // |Am7-Dm7|G7-Cmaj7|Fmaj7|E7-Am7|G7|Cmaj7|Fmaj7-E7|Am|
      bars: [
        // Bar 1: Am7(2) - Dm7(2)
        {
          chords: [
            { chord: AM7 },
            {
              chord: DM7,
              added: true,
              technique: 'IVm7 — Dm の 7th 化',
            },
          ],
        },
        // Bar 2: G7(2) - Cmaj7(2)
        {
          chords: [
            {
              chord: G7,
              added: true,
              technique: '♭VII7 — モーダル彩色',
            },
            {
              chord: CMAJ7,
              added: true,
              technique:
                '♭III△7 — 平行調 (C major) のトニックを借りる',
            },
          ],
        },
        // Bar 3: Fmaj7(4)
        {
          chords: [
            {
              chord: FMAJ7,
              added: true,
              technique: '♭VI△7 — サブドミナント代理',
            },
          ],
        },
        // Bar 4: E7(2) - Am7(2)
        {
          chords: [{ chord: E7 }, { chord: AM7 }],
        },
        // Bar 5: G7(4)
        { chords: [{ chord: G7, added: true }] },
        // Bar 6: Cmaj7(4)
        { chords: [{ chord: CMAJ7, added: true }] },
        // Bar 7: Fmaj7(2) - E7(2)
        {
          chords: [
            { chord: FMAJ7, added: true },
            { chord: E7 },
          ],
        },
        // Bar 8: Am triad のままで素っ気なく終わる原曲のニュアンス
        { chords: [{ chord: AM_TRI }] },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — 9th / ♭9 / ♭13 / 13 のテンションと
      // F♯m7♭5 で原曲のジャジーな彩り。全 bar 均等 2 拍チェンジ
      // (Bar 8 のみ 4 拍 1 コード) のシンプルな配置。
      // |Am7(9)-D7(9)|G7(9)-Cmaj7(9)|F♯m7♭5-Fmaj7|E7(♭13,♭9)-Am7|
      // |D7(9)-G7(13,♭9)|Cmaj7(9)-F♯m7♭5|Fmaj7-E7(♭13,♭9)|Am7|
      bars: [
        // Bar 1: Am7(9)(2) - D7(9)(2)
        {
          chords: [
            {
              chord: AM7_9,
              added: true,
              technique: 'Im7(9) — 9th を加えてフローティングな響き',
            },
            {
              chord: D7_9,
              added: true,
              technique:
                'IVm7 → IV7(9) (3rd 上行 F→F♯ — アシッドジャズの色)',
            },
          ],
        },
        // Bar 2: G7(9)(2) - Cmaj7(9)(2)
        {
          chords: [
            {
              chord: G7_9,
              added: true,
              technique: '♭VII7 + 9 のテンション',
            },
            {
              chord: CMAJ7_9,
              added: true,
              technique: '♭III△7 + 9 のテンション',
            },
          ],
        },
        // Bar 3: F♯m7(♭5)(2) - Fmaj7(2)
        {
          chords: [
            {
              chord: FSHARP_M7B5,
              added: true,
              technique:
                '♯VIm7(♭5) — Cmaj7 → Fmaj7 を半音下行で繋ぐ (G→F♯→F)',
            },
            { chord: FMAJ7 },
          ],
        },
        // Bar 4: E7(♭13,♭9)(2) - Am7(2)
        {
          chords: [
            {
              chord: E7_B13_B9,
              added: true,
              technique: 'V7(♭13,♭9) altered — Im への強烈な解決',
            },
            { chord: AM7 },
          ],
        },
        // Bar 5: D7(9)(2) - G7(13,♭9)(2)
        {
          chords: [
            { chord: D7_9, added: true },
            {
              chord: G7_13_B9,
              added: true,
              technique:
                '♭VII7(13,♭9) altered — テンション豊富な彩り',
            },
          ],
        },
        // Bar 6: Cmaj7(9)(2) - F♯m7(♭5)(2)
        {
          chords: [
            { chord: CMAJ7_9, added: true },
            { chord: FSHARP_M7B5, added: true },
          ],
        },
        // Bar 7: Fmaj7(2) - E7(♭13,♭9)(2)
        {
          chords: [
            { chord: FMAJ7 },
            { chord: E7_B13_B9, added: true },
          ],
        },
        // Bar 8: Am7(4) — Im7 で解決
        { chords: [{ chord: AM7 }] },
      ],
    },
  ],
};
