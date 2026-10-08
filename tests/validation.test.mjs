import test from "node:test";
import assert from "node:assert/strict";
import { createEnquiryEmail } from "../lib/enquiry-email.ts";
import { readJson } from "../worker/body.ts";
const valid = {
  enquiryType: "general",
  fullName: "Alex Example",
  email: "alex@example.com",
  phone: "2025550100",
  referral: "Other",
  referralOther: "A sample event",
  message: "A fictional enquiry",
};
test("email includes submitted details without trusting recipient input", () => {
  const result = createEnquiryEmail(
    { ...valid, to: "bad@example.com" },
    "inbox@example.com",
    "Sample Studio",
  );
  assert.equal(result.ok, true);
  assert.equal(result.email, "inbox@example.com");
  assert.match(result.body, /A sample event/);
  assert.match(result.subject, /Sample Studio/);
});
test("rejects header injection and invalid fields", () => {
  for (const patch of [
    { fullName: "Alex\nBcc:bad@example.com" },
    { message: "" },
    { message: "x".repeat(4001) },
    { phone: "abc" },
    { email: "invalid" },
    { referralOther: "" },
    { fullName: 42 },
  ])
    assert.equal(
      createEnquiryEmail({ ...valid, ...patch }, "inbox@example.com", "Sample")
        .ok,
      false,
    );
});
test("stream byte limits apply without Content-Length", async () => {
  const req = new Request("https://example.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "é".repeat(13000) }),
  });
  await assert.rejects(
    () => readJson(req),
    (e) => e.status === 413,
  );
});
test("invalid JSON and arrays are rejected", async () => {
  for (const body of ["{", "[]", "null"])
    await assert.rejects(
      () =>
        readJson(
          new Request("https://example.com", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }),
        ),
      (e) => e.status === 400,
    );
});
