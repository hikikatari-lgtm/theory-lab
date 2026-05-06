import type { BarsGridProgression } from './types';
import {
  V_upgradeC_top1,
  V_upgradeC_top2,
  V_upgradeC_top3,
  V_upgradeC_top4,
  V_upgradeC_top5,
  V_upgradeC_top6,
  V_upgradeC_top7,
  V_upgradeC_top8,
} from './upgrade-voicings-c';

// UPGRADE Drop 2 — C Major Scale Top Note edition (Phase Drop2&3-Upgrade PR 1).
//
// Source: PrettyPiano YouTube "UPGRADE Your Drop 2 - All 12 Keys"
//   https://youtu.be/cT1zYpDogs0
//
// 8 bars. C メジャースケールの 7 音 (C, D, E, F, G, A, B) を順に top
// note にした 7 voicings + 解決の C オクターブ上 (8th) — 計 8 bars。
// メロディ和声の実用語彙: ピアニストがスケール上のメロディ音を弾く時、
// その音の下に Drop 2 でどう響かせるかの voicing 集。
//
// 兄弟教材: Phase Drop2&3 PR 1 の UNLIMITED Pattern 1-4
//   - UNLIMITED = "コード循環" を Drop 2 & 3 で表現
//   - UPGRADE   = "メロディ top note" 視点の Drop 2 ハーモナイゼーション
//
// 教材的な聴きどころ:
//   - スケール上行 (C → D → E → F → G → A → B → C) の中で、どの top note
//     でも Drop 2 配置の「広がり」を保てる
//   - Bar 7 (B top, G6/9) で LH が B2 へ落ちる descending bass-line は
//     UNLIMITED Pattern 3 vii° と共通の voice leading
//   - Bar 8 (C oct up) は Bar 1 と LH/RH 構成は同じだが top の E が E4
//     → E5 へ持ち上がり、スケール上行の終端としての解決感を演出
//
// PR スコープ: Cキー単体。PR 2 で 12-key 拡張、PR 3 で Top-note Anchor
// (3視点 VIEW) との思想統合を予定。

export const upgradeDrop2C: BarsGridProgression = {
  id: 'upgrade-drop2-c',
  label: 'UPGRADE Drop 2 - C Major Scale Top Note',
  subtitle:
    'UPGRADE Drop 2 — 8 bars (CM, scale ascend, melody-harmonization edition)',
  progressionLabel:
    'UPGRADE Drop 2 — C Major Scale Top Note (PrettyPiano メロディ和声)',
  displayMode: 'bars-grid',
  tempo: 80,
  key: 'CM',
  voicings: {
    upgradeC_top1: V_upgradeC_top1,
    upgradeC_top2: V_upgradeC_top2,
    upgradeC_top3: V_upgradeC_top3,
    upgradeC_top4: V_upgradeC_top4,
    upgradeC_top5: V_upgradeC_top5,
    upgradeC_top6: V_upgradeC_top6,
    upgradeC_top7: V_upgradeC_top7,
    upgradeC_top8: V_upgradeC_top8,
  },
  bars: [
    { number: 1, chords: [{ key: 'upgradeC_top1', beats: 4 }] }, // C
    { number: 2, chords: [{ key: 'upgradeC_top2', beats: 4 }] }, // D
    { number: 3, chords: [{ key: 'upgradeC_top3', beats: 4 }] }, // E
    { number: 4, chords: [{ key: 'upgradeC_top4', beats: 4 }] }, // F
    { number: 5, chords: [{ key: 'upgradeC_top5', beats: 4 }] }, // G
    { number: 6, chords: [{ key: 'upgradeC_top6', beats: 4 }] }, // A
    { number: 7, chords: [{ key: 'upgradeC_top7', beats: 4 }] }, // B
    { number: 8, chords: [{ key: 'upgradeC_top8', beats: 4 }] }, // C (oct up)
  ],
  group: 'progression',
  sections: [
    { name: 'A', label: 'C Major Scale Top Note', barRange: [1, 8] },
  ],
};
