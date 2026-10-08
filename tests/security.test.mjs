import test from "node:test";
import assert from "node:assert/strict";
import { secureResponse } from "../worker/security.ts";
test("security headers preserve payload and status", async () => {
  const result = secureResponse(
    Response.json(
      { ok: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    ),
  );
  assert.equal(result.status, 201);
  assert.equal(result.headers.get("X-Content-Type-Options"), "nosniff");
  assert.equal(result.headers.get("X-Frame-Options"), "DENY");
  assert.equal(result.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await result.json(), { ok: true });
});
