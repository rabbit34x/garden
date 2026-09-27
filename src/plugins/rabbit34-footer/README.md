# Rabbit34 Footer

Digital Garden公式Garden Plugin APIの `common.footer` slot にフッターを追加します。
`src/plugins/rabbit34-footer/` の配置だけで自動検出されます。本体のテンプレート、CSS、Eleventy設定、依存関係は変更しません。

## 表示内容

- © 2026 rabbit34（指定された固定年）
- Personal Website: https://rabbit34.org/
- GitHub Repository: https://github.com/rabbit34x/garden
- Commit: デプロイSHAの先頭7文字。リンクには完全なSHAを使用。

## 仕組み

- `garden-plugin.json`: 公式のslot、styles、hooks、settingsを宣言。
- `index.js`: `setupEleventy` でプラグイン専用フィルターを登録し、SHAを検証。
- `templates/footer.njk`: `pluginSettings` を使用する静的フッター。
- `styles/footer.css`: このフッターだけを対象とするCSS。既存の `content` クラスで本文の位置に揃え、テーマの色とフォントを引き継ぎます。

Vercelでは `VERCEL_GIT_COMMIT_SHA` を公式settingsのenv fallbackから取得します。未設定・空・不正な値ならCommit部分のみ省略します。ローカルのGit実行やネットワーク取得は行いません。
VercelでSHAが出ない場合はプロジェクト設定の **Automatically expose System Environment Variables** を確認してください。
`plugins.json` に `commitSha` を固定するとenvより優先されるため、通常は設定しないでください。

フッターは通常フローに配置し、固定表示や既存DOMの移動は行いません。ブラウザ用JavaScriptはありません。
共通フッターslotを持つトップ・ノートページが対象です。独自のリダイレクトページなどslotのないページには挿入しません。

## 無効化

公式の `src/plugins/plugins.json` の `plugins` に以下の設定を追加します（既存設定は保持）。

```json
"rabbit34-footer": { "enabled": false }
```

またはプラグインの `showFooter` 設定をfalseにします。
独自IDのディレクトリに隔離しているため、上流の本体ファイル更新と編集箇所が競合しません。
将来公式APIが変更された場合は、このプラグイン内で対応します。

## 検証

```sh
node --test src/plugins/rabbit34-footer/footer.test.cjs
npm test
npm run build
```

参照:
- https://github.com/oleeskild/digitalgarden/tree/main/skills/garden-plugin-author
- https://vercel.com/docs/environment-variables/system-environment-variables#vercel_git_commit_sha
