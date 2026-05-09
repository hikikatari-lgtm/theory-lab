import type { ArrangePreset } from './types';

// 6451 progression in C: VIm7 - IV△7 - V7 - I
// Original は 4 小節各 1 コードのプレーンな進行。
// Arrange① でオンコード (C/E)・sus4 化・パッシング (Dm7) を導入、
// Arrange② で更に E7(♯9) (Hendrix Chord 風) を末尾に挿入し、
// Am7 への III7 セカンダリードミナント解決を作る。
// 各バージョン共通で 4 小節構成。
//
// `added` / `technique` は slot レベル — そのバージョンで初出のコード
// だけがハイライトされる。

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

const C_MAJ = {
  id: 'c-maj',
  symbol: 'C',
  roman: 'I',
  degreesLabel: '3, 5, R',
  lh: [{ note: 'C3', degree: 'R' }],
  rh: [
    { note: 'E3', degree: '3' },
    { note: 'G3', degree: '5' },
    { note: 'C4', degree: 'R' },
  ],
};

const C_OVER_E = {
  id: 'c-on-e',
  symbol: 'C/E',
  roman: 'I/III',
  degreesLabel: 'R, 3, 5 / bass=3rd',
  lh: [{ note: 'E2', degree: '3' }],
  rh: [
    { note: 'C3', degree: 'R' },
    { note: 'E3', degree: '3' },
    { note: 'G3', degree: '5' },
  ],
};

const G7SUS4 = {
  id: 'g7sus4',
  symbol: 'G7sus4',
  roman: 'Vsus4',
  degreesLabel: '♭7, 4, 5',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'F3', degree: '♭7' },
    { note: 'C4', degree: '4' },
    { note: 'D4', degree: '5' },
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

const E7_SHARP9 = {
  id: 'e7-sharp9',
  symbol: 'E7(♯9)',
  roman: 'III7(♯9)',
  degreesLabel: '♭7, 3, ♯9',
  lh: [{ note: 'E2', degree: 'R' }],
  rh: [
    { note: 'D3', degree: '♭7' },
    { note: 'G#3', degree: '3' },
    // ♯9 = G (E から見て augmented 9th)。Hendrix Chord 配置で 5度抜き。
    { note: 'G4', degree: '♯9' },
  ],
};

export const sixFourFiveOne: ArrangePreset = {
  id: 'six-four-five-one',
  label: '6451 Progression',
  subtitle: 'Key C — VIm7 - IV△7 - V7 - I',
  key: 'C',
  tempo: 84,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // |Am7|FM7|G7|C|
      bars: [
        { chords: [{ chord: AM7 }] },
        { chords: [{ chord: FM7 }] },
        { chords: [{ chord: G7 }] },
        { chords: [{ chord: C_MAJ }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // |Am7 - C/E|FM7|G7sus4|Dm7 - C|
      bars: [
        {
          chords: [
            { chord: AM7 },
            {
              chord: C_OVER_E,
              added: true,
              technique:
                'オンコード (Cの第1転回形 — Am7→FM7 を滑らかに繋ぐ)',
            },
          ],
        },
        { chords: [{ chord: FM7 }] },
        {
          chords: [
            {
              chord: G7SUS4,
              added: true,
              technique: 'sus4 化 (3度を一旦保留し緊張を和らげる)',
            },
          ],
        },
        {
          chords: [
            {
              chord: DM7,
              added: true,
              technique:
                'パッシングコード (V→I の前に IIm7 を挟む 251 化)',
            },
            { chord: C_MAJ },
          ],
        },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // |Am7 - C/E|FM7|G7sus4 - Dm7|C - E7(♯9)|
      bars: [
        {
          chords: [
            { chord: AM7 },
            { chord: C_OVER_E, technique: 'オンコード (Cの第1転回形)' },
          ],
        },
        { chords: [{ chord: FM7 }] },
        {
          chords: [
            { chord: G7SUS4, technique: 'sus4 化' },
            { chord: DM7, technique: 'パッシングコード (V → I を IIm7 経由)' },
          ],
        },
        {
          chords: [
            { chord: C_MAJ },
            {
              chord: E7_SHARP9,
              added: true,
              technique:
                'セカンダリードミナント (V/VIm — Am7 への解決を準備)',
            },
          ],
        },
      ],
    },
  ],
};
