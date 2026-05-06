# iOS マナーモード時の音声再生 — 調査メモ

## 報告された現象

- **環境**: iPhone 17 (Safari 想定)
- **症状**: Voicing Lab で再生ボタンを押すと **鍵盤 UI は動くが音が出ない**
- **条件**: iPhone 本体のマナーモード (消音モード / サイレントスイッチ ON) が有効な時のみ
- **正常動作**: MacBook、iPad、iPhone マナー OFF では音が出る

報告者: 視聴者「るるぴさん」(2026-05-06)

## 現状の音声実装

| 項目 | 内容 |
|---|---|
| 再生方式 | **100% Web Audio API** (Tone.js → AudioContext) |
| `<audio>` タグ使用 | ゼロ (リポジトリ全体検索で 0 件) |
| `new Audio()` / `HTMLAudioElement` | ゼロ |
| エントリポイント | `lib/audio.ts` (Voicing Lab / Upper Triad で共有) |
| AudioContext 起動 | `ensureToneStarted()` で user gesture 後に `Tone.start()` |
| iOS audio session 設定 | **なし** (`navigator.audioSession` 未設定) |

## 仕様書の仮説 vs 実態

仕様書の表は「`<audio>` → マナーモードで鳴らない / Web Audio API → 鳴る」を前提としていたが、これは古い iOS の挙動。

**実態**: iOS Safari 17+ では Web Audio API も含めて **デフォルトで silent switch (マナーモード) に追従** する仕様に変更されている。当該プロジェクトは既に全て Web Audio API 経由なので、`<audio>` 移行 (パターン B) は不要 — **audio session カテゴリ設定 (パターン A 系)** が必要。

## 解決策: `navigator.audioSession` API

WebKit 17.4 (iOS 17.4 / 2024 年 3 月) で追加された `navigator.audioSession.type` を `'playback'` に設定することで、Safari のオーディオセッションを「メディア再生」カテゴリと認識させ、silent switch を無視させる。

```ts
if (typeof navigator !== 'undefined' && 'audioSession' in navigator) {
  (navigator as { audioSession?: { type?: string } })
    .audioSession!.type = 'playback';
}
```

## 互換性表

| 環境 | `navigator.audioSession` | 適用結果 |
|---|---|---|
| iPhone 17 (iOS 18+ 想定) Safari | 利用可 | マナーモード無視で音が鳴る ✓ |
| iOS 17.4 未満 Safari | undefined | no-op、現状維持 (マナー追従) |
| MacBook Safari / Chrome | 未実装 | no-op、デグレなし ✓ |
| iPad Safari (iOS 17.4+) | 利用可 | 効果あり、デグレなし ✓ |
| Android Chrome | 未実装 | no-op、デグレなし ✓ |

廣嶋さんの環境は iPhone 17 (iOS 18+) 確定なので、この 1 行追加で解決見込み。

## 影響範囲

- **変更ファイル**: `lib/audio.ts` のみ (約 5-7 行追加)
- **既存ラボ**: Voicing Lab / Upper Triad 両方が共通の `lib/audio.ts` を参照 → 両ラボに同時に効く
- **既存環境のデグレ**: なし (no-op fallback)
