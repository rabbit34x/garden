const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const nunjucks = require("nunjucks");
const plugin = require("./index");
const env = new nunjucks.Environment(null, { autoescape: true });
plugin.setupEleventy({ addFilter: (name, filter) => env.addFilter(name, filter) });
const source = fs.readFileSync(path.join(__dirname, "templates/footer.njk"), "utf8");
const render = (commitSha, showFooter = true) => env.renderString(source, { pluginSettings: { commitSha, showFooter } });

test("local builds render required links without a commit", () => {
  const html = render(undefined);
  assert.match(html, /© 2026 rabbit34/);
  assert.match(html, /href="https:\/\/rabbit34.org\/"/);
  assert.match(html, /href="https:\/\/github.com\/rabbit34x\/garden"/);
  assert.doesNotMatch(html, /Commit |\/commit\//);
});

test("Vercel SHA uses seven characters and a full commit URL", () => {
  const sha = "abcdef0123456789abcdef0123456789abcdef01";
  const html = render(sha);
  assert.ok(html.includes(`/commit/${sha}`));
  assert.match(html, />abcdef0<\/a>/);
});

test("invalid metadata cannot inject markup or a URL", () => {
  for (const value of ["", "abcdef0", "not-a-sha", '<script>alert(1)</script>', 123, null]) {
    const html = render(value);
    assert.doesNotMatch(html, /Commit |\/commit\/|<script>/);
  }
});

test("the display setting suppresses the entire footer", () => {
  assert.equal(render(undefined, false).trim(), "");
});
