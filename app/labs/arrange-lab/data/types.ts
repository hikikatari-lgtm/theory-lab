// Arrange Lab — data types.
// シンプルなコード進行が、パッシングコードやオンコードでどう変化するかを
// Before / After で比較するためのデータ構造。
//
// プリセットごとに複数バージョン (Original / Arrange① / Arrange② …) を持ち、
// 各バージョンは "小節 (bar) の配列" を保持する。Original / Arrange① /
// Arrange② はいずれも常に 4 小節構成で、アレンジ版で増えたコードは小節内
// に押し込まれる (例: |G7 - Bm7♭5| のように 1 小節 2 コード)。
//
// アレンジ版で追加 / 変更されたコードは `added: true` でハイライト対象
// として印を付ける。

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

// 1 小節 = 4 拍 を前提に、小節内のコードは均等割りで再生される。
// 1 コードなら 4 拍、2 コードなら各 2 拍、3 コードなら各 4/3 拍。
export type ArrangeBar = {
  chords: ArrangeChord[];
};

export type ArrangeVersion = {
  id: string;
  label: string;
  bars: ArrangeBar[];
};

export type ArrangePreset = {
  id: string;
  label: string;
  subtitle: string;
  key: string;
  tempo: number;
  versions: ArrangeVersion[];
};
