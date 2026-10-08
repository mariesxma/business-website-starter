import test from "node:test";
import assert from "node:assert/strict";
import { handleResources } from "../worker/resources.ts";
const request = (method = "GET") =>
  new Request("https://example.com/api/resources", { method });
test("catalogue requires a binding and rejects writes", async () => {
  assert.equal((await handleResources(request())).status, 503);
  assert.equal((await handleResources(request("POST"))).status, 405);
});
test("public query excludes drafts and caps its result", async () => {
  let sql;
  const db = {
    prepare: (q) => {
      sql = q;
      return {
        all: async () => ({
          results: [{ id: 1, title: "Sample", description: "Example" }],
        }),
      };
    },
  };
  const response = await handleResources(request(), db);
  assert.match(sql, /WHERE published = 1/);
  assert.match(sql, /LIMIT 50/);
  assert.equal((await response.json()).resources.length, 1);
});
test("database failures do not leak SQL or provider messages", async () => {
  const response = await handleResources(request(), {
    prepare: () => {
      throw Error("secret database detail");
    },
  });
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /secret/);
});
