// Arrange Lab — data types.
// シンプルなコード進行が、パッシングコードやオンコードでどう変化するかを
// Before / After で比較するためのデータ構造。
//
// プリセットごとに複数バージョン (Original / Arrange① / Arrange② …) を持ち、
// 各バージョンは ChordsRow と同様の `chords` 配列を持つ。アレンジ版で
// 追加・変更されたコードは `added: true` でハイライト対象として印を付ける。

export type ArrangeNote = { note: string; degree: string };

export type ArrangeChord = {
  id: string;
  symbol: string;
  roman: string;
  degreesLabel: string;
  lh: ArrangeNote[];
  rh: ArrangeNote[];
  // Original にはなく、このアレンジで追加 / 変更されたコード。
  // true のとき、コードチップがオレンジ系でハイライトされる。
  added?: boolean;
  // パッシングコード / オンコード / 代理コード などのテクニック名。
  // 鍵盤下のディテール表示で「(パッシングコード)」のように出す。
  technique?: string;
};

export type ArrangeVersion = {
  id: string;
  label: string;
  chords: ArrangeChord[];
};

export type ArrangePreset = {
  id: string;
  label: string;
  subtitle: string;
  key: string;
  tempo: number;
  versions: ArrangeVersion[];
};
