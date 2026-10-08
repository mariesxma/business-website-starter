import test from "node:test";
import assert from "node:assert/strict";
const enabled = process.env.TEST_BUILT_WORKER === "1";
for (const path of [
  "/",
  "/services",
  "/about",
  "/contact",
  "/charts",
  "/privacy",
  "/terms",
]) {
  test(`built page renders ${path}`, { skip: !enabled }, async () => {
    const { default: worker } = await import("../dist/server/index.js");
    const response = await worker.fetch(
      new Request(`https://example.com${path}`, {
        headers: { Accept: "text/html" },
      }),
      { ASSETS: { fetch: async () => new Response(null, { status: 404 }) } },
      { waitUntil() {}, passThroughOnException() {} },
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /<h1\b/);
    assert.match(html, /Example Studio/);
    assert.match(html, /id="main"/);
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
  });
}
