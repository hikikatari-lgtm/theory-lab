import type { ArrangePreset } from './types';

// 4156 progression in C: IV△7 - I△7 - V7 - VIm7
// 3&7-bass voicings. アレンジ① でオンコード (G/B) と パッシングコード
// (Bm7♭5) を 1 小節内の 3 拍目に挿入、アレンジ② でさらに #IVm7♭5
// (F#m7♭5) を最終小節 4 小節目の 3 拍目に挿入してトニックへ滑り込ませる。
// 各バージョン共通で 4 小節構成。
//
// `added` / `technique` は slot レベルで持たせる: そのバージョンで
// 「新たに登場した」コードだけがハイライトされ、前のアレンジから
// 引き継がれたコードは普通色で表示される。

const FM7 = {
  id: 'fm7',
  symbol: 'FM7',
  roman: 'IV△7',
  degreesLabel: '7, 3, 5',
  lh: [{ note: 'F2', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '7' },
    { note: 'A3', degree: '3' },
    { note: 'C4', degree: '5' },
  ],
};

const CM7 = {
  id: 'cm7',
  symbol: 'CM7',
  roman: 'I△7',
  degreesLabel: '7, 3, 5',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '7' },
    { note: 'E4', degree: '3' },
    { note: 'G4', degree: '5' },
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

const G_OVER_B = {
  id: 'g-on-b',
  symbol: 'G/B',
  roman: 'V/VII',
  degreesLabel: 'R, 3, 5 / bass=3rd',
  lh: [{ note: 'B2', degree: '3' }],
  rh: [
    { note: 'G3', degree: 'R' },
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
  ],
};

const BM7B5 = {
  id: 'bm7b5',
  symbol: 'Bm7(♭5)',
  roman: 'VIIm7(♭5)',
  degreesLabel: '♭7, ♭3, ♭5',
  lh: [{ note: 'B2', degree: 'R' }],
  rh: [
    { note: 'A3', degree: '♭7' },
    { note: 'D4', degree: '♭3' },
    { note: 'F4', degree: '♭5' },
  ],
};

const FSM7B5 = {
  id: 'fsm7b5',
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

export const fourOneFiveSix: ArrangePreset = {
  id: 'four-one-five-six',
  label: '4156 Progression',
  subtitle: 'Key C — IV△7 - I△7 - V7 - VIm7',
  key: 'C',
  tempo: 84,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // |FM7|CM7|G7|Am7|
      bars: [
        { chords: [{ chord: FM7 }] },
        { chords: [{ chord: CM7 }] },
        { chords: [{ chord: G7 }] },
        { chords: [{ chord: AM7 }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // |FM7 - G/B|CM7|G7 - Bm7(♭5)|Am7|
      bars: [
        {
          chords: [
            { chord: FM7 },
            {
              chord: G_OVER_B,
              added: true,
              technique: 'オンコード (Gの第1転回形)',
            },
          ],
        },
        { chords: [{ chord: CM7 }] },
        {
          chords: [
            { chord: G7 },
            {
              chord: BM7B5,
              added: true,
              technique: 'パッシングコード (V7→VIm7 の経過音)',
            },
          ],
        },
        { chords: [{ chord: AM7 }] },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // |FM7 - G/B|CM7|G7 - Bm7(♭5)|Am7 - F#m7(♭5)|
      bars: [
        {
          chords: [
            { chord: FM7 },
            { chord: G_OVER_B, technique: 'オンコード (Gの第1転回形)' },
          ],
        },
        { chords: [{ chord: CM7 }] },
        {
          chords: [
            { chord: G7 },
            { chord: BM7B5, technique: 'パッシングコード (V7→VIm7 の経過音)' },
          ],
        },
        {
          chords: [
            { chord: AM7 },
            {
              chord: FSM7B5,
              added: true,
              technique: 'パッシングコード (#IV→I のクロマティック解決)',
            },
          ],
        },
      ],
    },
  ],
};
