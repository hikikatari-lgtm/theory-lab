import type { ArrangePreset } from './types';

// 遭難 - 椎名林檎 (Key Am)
// 8 小節構成。Im - IVm - V7 のシンプルなマイナー進行から、
// パッシングディミニッシュ (G#dim, D#dim7) と分数オンコード
// (A7/C#) を加えて原曲のシリアスな空気を再現する。
//
// Original  : Dm / Am / E7 の 3 コード型
// Arrange①: F / G / Dm7 / G7 / C△7 を追加した 80s ロック基本型
// Arrange②: G#dim / A7/C# / D#dim7 を加えた原曲発展型

// ---------- Original (3 コード型) ----------
const DM = {
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
const F_TRI = {
  id: 'f-tri',
  symbol: 'F',
  roman: '♭VI',
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
  roman: '♭VII',
  degreesLabel: '3, 5, R',
  lh: [{ note: 'G2', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '3' },
    { note: 'D4', degree: '5' },
    { note: 'G4', degree: 'R' },
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

// ---------- Arrange② で追加されるコード ----------
// G#dim: G#-B-D-F (実質 G#dim7 だが原曲表記に合わせ G#dim)。
// 機能は Im (Am) への半音上行パッシングディミニッシュ。
const GSHARP_DIM = {
  id: 'gsharp-dim',
  symbol: 'G♯dim',
  roman: '♯VII°',
  degreesLabel: '♭3, ♭5, ♭♭7',
  lh: [{ note: 'G#2', degree: 'R' }],
  rh: [
    { note: 'B3', degree: '♭3' },
    { note: 'D4', degree: '♭5' },
    { note: 'F4', degree: '♭♭7' },
  ],
};

// A7/C#: 分数コード (A7 のベースを 3rd の C# に置く)。
// Im (Am) → IVm (Dm) のバスラインを A → C# → D の半音上行で繋ぐ。
const A7_ON_CSHARP = {
  id: 'a7-on-csharp',
  symbol: 'A7/C♯',
  roman: 'I7/III',
  degreesLabel: '♭7, 3, 5 / bass=3rd',
  lh: [{ note: 'C#3', degree: '3' }],
  rh: [
    { note: 'G3', degree: '♭7' },
    { note: 'C#4', degree: '3' },
    { note: 'E4', degree: '5' },
  ],
};

// D#dim7: D#-F#-A-C。IVm7 → V7 の半音上行クロマティック。
const DSHARP_DIM7 = {
  id: 'dsharp-dim7',
  symbol: 'D♯dim7',
  roman: '♯IV°7',
  degreesLabel: '♭3, ♭5, ♭♭7',
  lh: [{ note: 'D#3', degree: 'R' }],
  rh: [
    { note: 'F#3', degree: '♭3' },
    { note: 'A3', degree: '♭5' },
    { note: 'C4', degree: '♭♭7' },
  ],
};

export const sounan: ArrangePreset = {
  id: 'sounan',
  label: '遭難',
  subtitle: '椎名林檎 — Key Am',
  key: 'Am',
  tempo: 80,
  versions: [
    {
      id: 'original',
      label: 'Original',
      // 3 コード型 (Dm / Am / E7)
      // |Dm|Dm|Am|Am|
      // |Dm|Dm|Am|E7|
      bars: [
        { chords: [{ chord: DM }] },
        { chords: [{ chord: DM }] },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: DM }] },
        { chords: [{ chord: DM }] },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: E7 }] },
      ],
    },
    {
      id: 'arrange1',
      label: 'Arrange ①',
      // 基本型 — モーダルインターチェンジで彩りを足し、
      // 8 小節目に Dm7 → E7 の 2 拍チェンジを追加。
      // |F|G|Am|Am|
      // |Dm7|G7|C△7|Dm7-E7|
      bars: [
        {
          chords: [
            { chord: F_TRI, added: true, technique: '♭VI — モーダル彩色' },
          ],
        },
        {
          chords: [
            { chord: G_TRI, added: true, technique: '♭VII — モーダル彩色' },
          ],
        },
        { chords: [{ chord: AM_TRI }] },
        { chords: [{ chord: AM_TRI }] },
        {
          chords: [
            {
              chord: DM7,
              added: true,
              technique: 'IVm7 — Dm の 7th 化',
            },
          ],
        },
        {
          chords: [
            { chord: G7, added: true, technique: '♭VII7 — G の 7th 化' },
          ],
        },
        {
          chords: [
            {
              chord: CMAJ7,
              added: true,
              technique: '♭III△7 — 平行調 (C major) のトニックを借りる',
            },
          ],
        },
        {
          chords: [
            { chord: DM7, added: true },
            { chord: E7 },
          ],
        },
      ],
    },
    {
      id: 'arrange2',
      label: 'Arrange ②',
      // 発展型 / 原曲 — パッシングディミニッシュ (G#dim, D#dim7)
      // とオンコード (A7/C#) で半音上行のバスラインを作る。
      // |F|G-G#dim|Am|A7/C#|
      // |Dm7|G7|C△7|Dm7-D#dim7-E7|
      bars: [
        // Bar 1: F
        { chords: [{ chord: F_TRI }] },
        // Bar 2: G(2) - G#dim(2)
        {
          chords: [
            { chord: G_TRI },
            {
              chord: GSHARP_DIM,
              added: true,
              technique:
                'パッシングディミニッシュ (G → G♯dim → Am の半音上行)',
            },
          ],
        },
        // Bar 3: Am
        { chords: [{ chord: AM_TRI }] },
        // Bar 4: A7/C#
        {
          chords: [
            {
              chord: A7_ON_CSHARP,
              added: true,
              technique:
                'オンコード (A → C♯ → D のクロマティックバスで Dm7 へ滑り込む)',
            },
          ],
        },
        // Bar 5: Dm7
        { chords: [{ chord: DM7 }] },
        // Bar 6: G7
        { chords: [{ chord: G7 }] },
        // Bar 7: C△7
        { chords: [{ chord: CMAJ7 }] },
        // Bar 8: Dm7(1) - D#dim7(1) - E7(2)
        {
          chords: [
            { chord: DM7, beats: 1 },
            {
              chord: DSHARP_DIM7,
              beats: 1,
              added: true,
              technique:
                'パッシングディミニッシュ (D → D♯ → E の半音上行で V7 へ)',
            },
            { chord: E7, beats: 2 },
          ],
        },
      ],
    },
  ],
};
