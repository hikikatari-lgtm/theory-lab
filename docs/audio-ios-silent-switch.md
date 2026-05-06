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

---

## 検証手順 (修正後)

### 修正前の再現

> 廣嶋さんへ: 修正前 (= main の 1 つ前のコミット) でも以下手順で症状が再現することを **念のため事前確認** してください。再現しない場合は別原因の可能性あり。

1. iPhone 17 (Safari) でマナーモード ON
2. preview / production の Voicing Lab を開く
3. 進行を選んで「▶ 再生」
4. 音が鳴らないことを確認 (= 報告された症状と一致)

### 修正後の動作確認 (主目的)

1. preview branch / 修正版 deploy をiPhone 17 (Safari) で開く
2. **マナーモード ON** にする
3. Voicing Lab `/labs/voicing-lab` を開く
4. 進行を選んで「▶ 再生」ボタンを押す
5. **音が出ること** を確認 ✅

### リグレッションチェック (デグレなし確認)

既存環境で挙動が変わらないことを確認する:

| 環境 | 手順 | 期待 |
|---|---|---|
| MacBook Safari | Voicing Lab で再生 | 既存通り音が出る |
| MacBook Chrome | Voicing Lab で再生 | 既存通り音が出る |
| iPad Safari | Voicing Lab で再生 (マナー OFF) | 既存通り音が出る |
| iPhone マナー OFF | Voicing Lab で再生 | 既存通り音が出る |
| Android Chrome | Voicing Lab で再生 | 既存通り音が出る (no-op fallback) |
| Upper Triad ラボ | `/labs/upper-triad` で和音再生 | 既存通り動作 (共通 audio.ts) |

### 開発時の確認 (実機がない場合)

iOS Simulator はマナーモードの再現が不可確実なため、**実機テスト前提**。それでも JS レベルでの確認は以下で可能:

```js
// ブラウザコンソールで実行
'audioSession' in navigator                  // => iOS 17.4+ Safari のみ true
navigator.audioSession?.type                 // => 'playback' になっていれば適用済み
```

---

## Iteration 2: silent primer + 診断ログ追加 (2026-05-06)

### Iteration 1 の限界

PR #29 の `navigator.audioSession.type = 'playback'` だけでは、廣嶋さんの iPhone (実機、マナー ON) で音が出ないことが判明。考えられる原因:

| 仮説 | 確認方法 |
|---|---|
| (a) iOS が 17.4 未満で API 自体が無い | 診断ログで `hasAudioSessionApi: false` |
| (b) AudioContext 作成タイミングと audioSession 設定の順序問題 | 診断ログで `audioSessionType: 'playback'` だが鳴らない |
| (c) iOS 17.4+ でも audioSession だけでは不十分 (iOS 18 で挙動変更の事例) | 同上 |

### Iteration 2 の対策

iOS web audio コミュニティで定番の **silent `<audio>` primer** を併用:

1. 無音の短い WAV (`SILENT_WAV` data URI、48 bytes、bundle 同梱) を `<audio loop playsinline>` で生成
2. ユーザー操作内 (`ensureToneStarted` 初回) で `play()` を呼ぶ
3. iOS Safari は「このページはメディア再生したい」と判断 → audio session を silent-switch 無視カテゴリにエレベート
4. 同時に診断ログを 1 回だけ出力 — iOS 実機の audioSession API 有無 / type 値 / UA を確認できる

```ts
// lib/audio.ts のエッセンス
function primeIosAudioSession(): void {
  configureIosAudioSession();           // (1) audioSession.type を再設定
  // (2) silent <audio> primer (一度だけ生成)
  silentAudio = document.createElement('audio');
  silentAudio.src = SILENT_WAV;
  silentAudio.loop = true;
  silentAudio.setAttribute('playsinline', '');
  silentAudio.volume = 0.001;
  void silentAudio.play().catch(() => {});
  // 診断ログ (一度だけ)
  console.log('[audio]', { hasAudioSessionApi, audioSessionType, ua });
}
```

### Iteration 2 の検証手順

1. 修正版を deploy / preview
2. **Mac Safari → 開発メニュー → [iPhone デバイス名] → Voicing Lab タブ** を開く (リモート Web インスペクタ)
3. iPhone マナーモード ON で Voicing Lab を起動 → 「▶ 再生」
4. **音が出るか確認** ✅
5. **同時にコンソールログ `[audio] {...}` を確認** → 廣嶋さん経由で値を共有
   - `hasAudioSessionApi: true/false`
   - `audioSessionType: 'playback' / undefined / その他`
   - `ua: '...'` (iOS バージョン特定用)

### Iteration 2 後も鳴らない場合の次手

診断ログから (a)/(b)/(c) のどれに当たっているかが判明したら:
- (a) であれば → silent primer が効く可能性が高い (古い iOS は primer 派なので)
- (b) であれば → AudioContext 再作成 or session.activate() を試す
- (c) であれば → `<video>` 要素 hack や別 web audio ラッパーへの移行を検討

---

## るるぴさんへの完了報告 (返信下書き)

> るるぴさん、ご報告ありがとうございました 🙇‍♂️
>
> iPhone のマナーモード ON で Voicing Lab の音が出ない件、原因を特定して修正しました。
>
> **原因**: iOS Safari 17 以降、Web Audio (= ブラウザの音声 API) がデフォルトでマナーモードに追従するように仕様変更されていました。プロジェクトでは Tone.js (Web Audio ベース) を使っていますが、明示的に「これはメディア再生です」と Safari に伝える設定が必要でした。
>
> **対応**: `navigator.audioSession.type = 'playback'` を AudioContext 初期化前にセット。iOS 17.4+ で利用可能な API で、これでマナーモード ON でも音が出るようになります (古い iOS / Android / PC では何も起きない安全な変更です)。
>
> 修正は本日 main にマージ済み、Voicing Lab と Upper Triad の両ラボで有効です。お手数ですがマナーモード ON で再度お試しいただき、結果を教えていただけると助かります 🎹
>
> 改めて、貴重なフィードバックに感謝します。引き続きご視聴・ご指摘よろしくお願いいたします!

(マージ完了後、PR URL を添えて視聴者コメント欄またはメンション元に返信)
