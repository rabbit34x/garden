---
{"dg-publish":true,"permalink":"/lulu//2026-10-10-discord-quick-css/","title":"Discordログ風UI再設定ガイド","noteIcon":"","created":"2026-10-10T18:21:41.432+09:00","dg-note-properties":{"title":"Discordログ風UI再設定ガイド","aliases":"Discordログ風UI再設定ガイド"}}
---


# Discordログ風UI再設定ガイド

更新：2026-10-10 JST  
元スレッド：1558386484929634307

このページだけで必要な構成・設定手順・完成版CSS・調整方法を確認できるようにまとめた。対象はWindows版Discord。アバターと背景画像を残し、ピンクのアクセント、分離したパネル、控えめなログ風表示を組み合わせる。

## 必要なもの

- **Windows版Discord**：設定先。
- **Vencord**：Discordへテーマ・QuickCSS・プラグインを追加する非公式クライアント改変。標準Discordだけではこの設定は使えない。[1]
- **Translucence**：CapnKitten作のベーステーマ。背景画像と透明度、アクセント・メンション・返信の色を設定する変数を提供する。[2]
- **ThemeAttributes**：Vencordのプラグイン。メッセージに投稿者や自分の投稿かどうかの属性を付け、CSSから判別できるようにする。名前の前の `$ ` と `> ` はこの属性を使う。[3]
- **背景画像3枚**：全体背景、左の伊織、右のやよい。URLは完成版CSSの先頭に保存してある。

system24、QuickReply、HideMedia、ShikiCodeblocksは完成版の必須要件ではない。BetterDiscordを別にインストールする必要もない。作者のリポジトリ名にBetterDiscordとあるが、Translucence作者はVencord向けURLも案内している。[2]

注意：Vencordの公式READMEも、クライアント改変がDiscordの規約に反すると説明している。アカウント上のリスクがゼロとは保証されない。[1]

## 設定手順

### 1. 既存設定をバックアップ

現在のQuickCSSを別ファイルへ保存する。有効なテーマ、プラグイン、テーマ固有の追加設定も控えておく。動作中の設定を消してから作業を始めない。

### 2. Vencordを導入（導入済みなら省略）

[Vencord公式ダウンロード](https://vencord.dev/download/)からWindows用インストーラーを入手する。Discordを終了し、インストーラーで使用するDiscordを選択して導入する。再起動後、ユーザー設定にVencordの項目があることを確認する。

本構成のためにソースビルドやカスタムプラグインを用意する必要はない。インストーラーの表示・操作が変わっている場合は公式案内を優先する。新規導入の手順そのものはユーザーのPCで再検証していない。

### 3. Translucenceを読み込む

本書の再設定用ベーステーマはTranslucence。最終CSSの変数・セレクターとテーマソースの対応を確認している。現在のテーマ一覧を直接読み取って確定したものではないが、作者がVencord向けに指定している読み込み先を使う。[2]

1. Discordをダーク表示にする。
2. ユーザー設定 → Vencord → **Themes → Online Themes**を開く。
3. 次のURLを1行で登録する。[2][4]

```text
https://capnkitten.github.io/BetterDiscord/Themes/Translucence/css/source.css
```

4. 入力欄からフォーカスを外して登録を反映する。現在の実装ではフォーカスが外れたときにURL一覧を保存する。[4] 再読み込みを求められたら従う。
5. system24など、別の全体テーマは同時に有効にしない。

すでにTranslucenceをローカルテーマやQuickCSSの `@import` で読み込んでいる場合、重複して登録せず、その方法を維持してよい。

### 4. ThemeAttributesを有効化

ユーザー設定 → Vencord → **Plugins**で `ThemeAttributes` を検索して有効にする。再読み込みを求められたら従う。

プラグイン単独ではログ風の見た目にはならない。下のCSSと組み合わせて使用する。[3]

### 5. QuickCSSを適用

1. ユーザー設定 → Vencordで **Enable Custom CSS** をONにする。
2. **Edit QuickCSS**を開く。[5]
3. 下の「完成版CSS」を貼り付けて保存する。Markdownのコードフェンス（バッククォート3個や `css` の行）は貼らない。
4. 今回の過去の試作ブロックは上乗せせず、完成版に置き換える。関係のない設定は事前に退避・確認してから残す。

QuickCSSの `@import` でテーマを読み込む場合は、その行を先頭に残し、完成版を後ろへ置く。Online Themesで読み込む場合は追加の `@import` は不要。

### 6. 確認する

- 全体背景、左の伊織、右のやよいが表示される。
- 自分の名前の前に `$ `、他者に `> ` が出る。投稿者名は等幅、本文とアバターは保持。
- 左、ヘッダー、履歴、送信欄、右のメンバー一覧が分離する。
- 履歴は角丸なしの細いグレー枠。送信エリアの外側は透明。
- メンション・返信操作中は強い発光ではなく、四角いメッセージの左にピンクの縦線が出る。
- 返信先の引用は残るが、アバターから伸びる接続線は表示されない。線自体のクリック操作は使えなくなる。
- 入力中表示が出たり消えたりしても、履歴・送信欄が上下しない。
- 返信先表示、画像添付プレビュー、編集、スクロールが欠けたり重なったりしない。

## 調整方法

基本的にはCSS先頭の「調整用」 `:root` だけを編集する。一度に一項目ずつ変更して確認する。

### 画像・背景の暗さ

- `--app-image`：アプリ全体の一番奥の画像。
- `--channel-image`：左の伊織。
- `--member-image`：右のやよい。
- `--app-overlay` / `--channel-overlay` / `--member-overlay`：それぞれの画像に重ねる色。

黒いオーバーレイの `rgba(0, 0, 0, 最後の値)` は、最後の値が大きいほど暗く、小さいほど元の画像が見える。初期値は全体 `0.9`、左右 `0.7`。画像のbrightness・乗算方式の試案は撤回され、完成版には含めない。

`--split-panel-bg` はヘッダーと履歴パネルの背景色で、画像の暗さとは別。送信エリアの外側は透明のまま。

### 色・名前

- `--accent-hue`：色相。初期値 `335`。
- `--accent-saturation`：彩度。初期値 `80%`。
- `--accent-lightness`：明るさ。初期値 `72%`。

伊織をイメージした提案色で、公式キャラクターカラーを厳密に再現した値ではない。メンション・返信色はアクセントに連動する。個別に変える場合は「テーマへの反映」の `--mention-*` / `--reply-*` を編集する。

- `--author-font`：投稿者名のフォント。PCにないフォントは次の候補へフォールバックする。
- `--prompt-color`：名前の前の記号の色。
- `--self-prompt` / `--other-prompt`：記号。末尾の空白は名前との間隔になる。

### 枠・余白・ピンクの縦線

- `--split-gap`：パネルの隙間。初期値 `10px`。
- `--split-radius`：パネルの角丸。初期値 `10px`。履歴と強調メッセージは角丸なしで固定。
- `--history-border-width` / `--history-border-color`：履歴枠の太さ・色。
- `--highlight-width` / `--highlight-opacity`：縦線の太さ・濃さ。初期値 `3px` / `0.75`。
- `--highlight-padding-block` / `--highlight-padding-inline`：強調メッセージの上下・左右余白。初期値 `12px` / `16px`。

### 送信欄と入力中表示

- `--composer-padding-top` / `--composer-padding-inline` / `--composer-padding-bottom`：送信エリアの上・左右・下余白。
- `--typing-bottom` / `--typing-height`：入力中表示の下からの位置・高さ。

下余白 `40px` は入力中表示の予約領域を含む。小さくしすぎると重なる可能性があるので、関連する値はまとめて確認する。返信先や添付プレビューによる送信欄の正常な拡張までは固定しない。

## 完成版CSS

ユーザーが完成としたCSSの整理版。元の設定値と動作は維持している。

```css
/* 調整用 */
:root {
  --app-image: url("https://media.discordapp.net/attachments/1558078395663913022/1558340030878056529/discord-background-pair.png?ex=6acb14bf&is=6ac9c33f&hm=009319157a809147a74f1c998df83738b1e6de29c280f7db871fcddf4fa318af&=&format=webp&quality=lossless");
  --channel-image: url("https://cdn.discordapp.com/attachments/1558078395663913022/1558347997967024168/iori.jpg?ex=6acb1c2b&is=6ac9caab&hm=5c2e648fae03c08ad045c86e536ec0b9e30e32b061a3ae48b1907525444b51b7&");
  --member-image: url("https://cdn.discordapp.com/attachments/1558078395663913022/1558347998344249364/yayoi.jpg?ex=6acb1c2b&is=6ac9caab&hm=1e26c4a0e0426f8a8c10a6373eb6f7edaa7a4557c384a3a0d1ab8af4a7c7dea3&");

  --app-overlay: rgba(0, 0, 0, 0.9);
  --channel-overlay: rgba(0, 0, 0, 0.7);
  --member-overlay: rgba(0, 0, 0, 0.7);

  --accent-hue: 335 !important;
  --accent-saturation: 80% !important;
  --accent-lightness: 72% !important;

  --split-gap: 10px;
  --split-radius: 10px;
  --split-panel-bg: rgba(0, 0, 0, 0.65);

  --history-border-width: 1px;
  --history-border-color: rgba(255, 255, 255, 0.28);

  --author-font: "Cascadia Mono", "Consolas", monospace;
  --prompt-color: #aaa;
  --self-prompt: "$ ";
  --other-prompt: "> ";

  --highlight-width: 3px;
  --highlight-opacity: 0.75;
  --highlight-padding-block: 12px;
  --highlight-padding-inline: 16px;

  --composer-padding-top: 8px;
  --composer-padding-inline: 12px;
  --composer-padding-bottom: 40px;
  --typing-bottom: 8px;
  --typing-height: 24px;
}

/* テーマへの反映 */
:root {
  --app-bg:
    linear-gradient(var(--app-overlay), var(--app-overlay)),
    var(--app-image) !important;

  --mention-hue: var(--accent-hue) !important;
  --mention-saturation: var(--accent-saturation) !important;
  --mention-lightness: var(--accent-lightness) !important;

  --reply-hue: var(--accent-hue) !important;
  --reply-saturation: var(--accent-saturation) !important;
  --reply-lightness: var(--accent-lightness) !important;
}

/* 背景画像 */
.sidebar__5e434 {
  background:
    linear-gradient(var(--channel-overlay), var(--channel-overlay)),
    var(--channel-image) center / cover no-repeat !important;
  border-radius: var(--split-radius) !important;
}

.membersWrap_c8ffbb {
  background:
    linear-gradient(var(--member-overlay), var(--member-overlay)),
    var(--member-image) center / cover no-repeat !important;
}

/* 投稿者名 */
[data-author-id][data-is-self] [class*="username_"] {
  font-family: var(--author-font) !important;
}

[data-author-id][data-is-self="true"] [class*="username_"]::before {
  content: var(--self-prompt);
  color: var(--prompt-color);
}

[data-author-id][data-is-self="false"] [class*="username_"]::before {
  content: var(--other-prompt);
  color: var(--prompt-color);
}

/* パネル */
.content__5e434 {
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  column-gap: var(--split-gap);
}

.chat_f75fb0 {
  background: transparent !important;
  row-gap: var(--split-gap);
}

.chat_f75fb0 > .subtitleContainer_f75fb0 {
  background: var(--split-panel-bg) !important;
  border-radius: var(--split-radius) !important;
}

.chat_f75fb0 > .content_f75fb0 {
  gap: var(--split-gap);
}

.content_f75fb0 > .chatContent_f75fb0 {
  background: transparent !important;
  border-radius: 0 !important;
  min-width: 0;
}

.content_f75fb0 > .membersWrap_c8ffbb,
.content_f75fb0 > .container_c8ffbb {
  border-radius: var(--split-radius) !important;
}

/* 履歴 */
.chatContent_f75fb0 > .messagesWrapper__36d07 {
  background: var(--split-panel-bg) !important;
  border: var(--history-border-width) solid var(--history-border-color) !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  box-sizing: border-box;
  min-height: 0;
}

/* 送信欄・入力中表示 */
.chatContent_f75fb0 > .form_f75fb0 {
  position: relative;
  background: transparent !important;
  border-radius: var(--split-radius) !important;
  margin-top: var(--split-gap) !important;
  padding:
    var(--composer-padding-top)
    var(--composer-padding-inline)
    var(--composer-padding-bottom) !important;
}

.chatContent_f75fb0 > .form_f75fb0 .channelBottomBarArea_f75fb0 {
  margin-block: 0 !important;
}

.chatContent_f75fb0 > .form_f75fb0 .typing_b88801 {
  position: absolute !important;
  inset-block-start: auto !important;
  inset-block-end: var(--typing-bottom) !important;
  inset-inline-start: var(--composer-padding-inline) !important;
  inset-inline-end: var(--composer-padding-inline) !important;
  width: auto !important;
  height: var(--typing-height) !important;
  margin: 0 !important;
}

/* メンション・返信 */
.chatContent_f75fb0 .wrapper_c19a55.mentioned__5126c,
.chatContent_f75fb0 .wrapper_c19a55.replying__5126c {
  border-radius: 0 !important;
  border-color: transparent !important;
  --message-padding-top: var(--highlight-padding-block);
  --message-padding-side: var(--highlight-padding-inline);
}

.chatContent_f75fb0 .wrapper_c19a55.mentioned__5126c {
  box-shadow:
    inset var(--highlight-width) 0 0
    hsla(var(--mention-hsl), var(--highlight-opacity)) !important;
}

.chatContent_f75fb0 .wrapper_c19a55.replying__5126c {
  box-shadow:
    inset var(--highlight-width) 0 0
    hsla(var(--reply-hsl), var(--highlight-opacity)) !important;
}

.chatContent_f75fb0 .repliedMessage_c19a55::before,
.chatContent_f75fb0 .repliedMessageClickableSpine_c19a55 {
  display: none !important;
}
```

## トラブル時と戻し方

- **全体が効かない**：Enable Custom CSS、QuickCSSの保存、テーマの読み込みをそれぞれ確認する。テーマの有効化だけではQuickCSSの動作確認にならない。
- **名前の記号だけ出ない**：ThemeAttributesの有効化と再読み込みを確認する。
- **画像だけ出ない**：画像URLをブラウザで開いて確認する。保存したDiscord添付URLを永続URLと考えない。開けなくなった場合は元画像を再アップロードするなどして、該当の `--*-image` を新しい完全なURLに置き換える。署名を含むクエリ文字列を削除しない。元画像も別途保管しておくと復旧しやすい。
- **更新後、一部だけ効かない**：Discordのクラス名・構造やテーマが変わった可能性がある。現行DOMで対象を確認し、該当セレクターだけを修正する。古いCSSを重ね続けない。
- **テーマが混ざる**：別テーマ、重複した読み込み、古い試作ブロックを確認する。
- **元に戻す**：退避したQuickCSSとテーマ設定へ戻す。一時的に切り分ける場合はCustom CSSをOFFにする。テーマ自体も外すなら登録URLやローカルテーマの有効化を戻す。

## 検証・再現の範囲

ユーザーが実クライアントで調整結果と入力中表示の位置を確認し、完成とした。整理版はtinycss2で元CSSと21セレクター・67件の有効な宣言を変数展開後に比較してPASS。重要度と値、画像URL3件の完全一致を確認した。

ブラウザ比較はChromiumがlibnspr4.so不足で起動できず未実施。本書の導入手順を新しいWindows環境で実行し直したわけではない。CSSに記録されていないテーマ固有の追加設定やDiscord設定まで完全に再現するものではない。Vencord・Discord・テーマの更新により、将来は画面名やセレクターの調整が必要になる可能性がある。

## 参照先

ソース確認：2026-10-10 JST。公式サイトの一部は取得時に403となったため、下記の作者・公式リポジトリのソースを参照した。ダウンロードページのURLは導入案内として記載。

1. [Vencord公式README](https://github.com/Vendicated/Vencord/blob/main/README.md)
2. [Translucence作者README・Vencord向けURL](https://github.com/CapnKitten/BetterDiscord/blob/master/Themes/Translucence/README.md)
3. [ThemeAttributes実装](https://github.com/Vendicated/Vencord/blob/main/src/plugins/themeAttributes/index.ts)
4. [Vencord Online Themes実装](https://github.com/Vendicated/Vencord/blob/main/src/components/settings/tabs/themes/OnlineThemesTab.tsx)
5. [Vencord設定画面・Custom CSS・QuickCSS実装](https://github.com/Vendicated/Vencord/blob/main/src/components/settings/tabs/vencord/index.tsx)

作業経緯：[[lulu/スレッドまとめ/2026-10-10 Discordのログ風CSS調整\|2026-10-10 Discordのログ風CSS調整]]。設定のために過去の候補調査や会話ログを読み直す必要はない。
