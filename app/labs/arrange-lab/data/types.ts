// Arrange Lab — data types.
// シンプルなコード進行が、パッシングコードやオンコードでどう変化するかを
// Before / After で比較するためのデータ構造。
//
// プリセットごとに複数バージョン (Original / Arrange① / Arrange② …) を持ち、
// 各バージョンは "小節 (bar) の配列" を保持する。Original / Arrange① /
// Arrange② はいずれも同じ小節数で、アレンジ版で増えたコードは小節内に
// 押し込まれる (例: |G7 - Bm7♭5| のように 1 小節 2 コード)。
//
// `added` / `technique` は ArrangeChordSlot 側に持たせる:
// 同じコード (例: Am7) が複数バージョンに登場する場合、
// 「その slot で初出か」が版によって変わるため、コード本体ではなく
// "コードがその位置に置かれている文脈" の属性として扱う。

export type ArrangeNote = { note: string; degree: string };

export type ArrangeChord = {
  id: string;
  symbol: string;
  roman: string;
  degreesLabel: string;
  lh: ArrangeNote[];
  rh: ArrangeNote[];
};

// 1 小節内の "1 つのコードの置き場所"。
// `added: true` のとき、そのバージョンで新たに導入されたコードとして
// オレンジ系でハイライトされる (前バージョンから引き継いだコードは false)。
// `technique` はパッシングコード / オンコード / サブドミナントマイナー
// などの解説文。鍵盤下のディテール表示でタグ付きで表示される。
//
// `beats` が省略されている場合は「小節内で均等割り」(BEATS_PER_BAR /
// 小節内コード数)。明示的に指定する場合は同小節内すべての slot に
// 値を入れて合計が BEATS_PER_BAR (=4) になるようにする。例えば
// 2-1-1 の不均等チェンジは [{beats:2}, {beats:1}, {beats:1}]。
export type ArrangeChordSlot = {
  chord: ArrangeChord;
  added?: boolean;
  technique?: string;
  beats?: number;
};

// 1 小節 = 4 拍 を前提。各 slot の `beats` で配分を決める。
// `beats` 未指定なら均等割り (1 コード=4 拍 / 2 コード=各 2 拍 / etc)。
export type ArrangeBar = {
  chords: ArrangeChordSlot[];
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
