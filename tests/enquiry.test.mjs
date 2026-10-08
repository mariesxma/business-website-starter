import test from "node:test";
import assert from "node:assert/strict";
import { handleEnquiry } from "../worker/enquiry.ts";
const valid = {
  enquiryType: "general",
  fullName: "Alex Example",
  email: "alex@example.com",
  phone: "+1 202 555 0100",
  referral: "Search engine",
  message: "A fictional enquiry.",
};
const request = (data = valid, headers = {}) =>
  new Request("https://example.com/api/enquiry", {
    method: "POST",
    headers: {
      Origin: "https://example.com",
      "Content-Type": "application/json",
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    body: JSON.stringify(data),
  });
const services = {
  origin: "https://example.com",
  recipient: "inbox@example.com",
  businessName: "Example",
  demo: false,
  allowRequest: async () => true,
  sendEmail: async () => {},
};
test("reject invalid, cross-origin, oversized and honeypot requests", async () => {
  let sends = 0;
  for (const [req, status] of [
    [request({ ...valid, enquiryType: "__proto__" }), 400],
    [request({ ...valid, email: "a@example.com\r\nBcc:bad@example.com" }), 400],
    [request({ ...valid, website: "bot" }), 400],
    [request(null), 400],
    [request(valid, { Origin: "https://other.example" }), 403],
    [request(valid, { "Content-Type": "text/plain" }), 415],
    [request({ ...valid, message: "x".repeat(25000) }), 413],
  ]) {
    assert.equal(
      (
        await handleEnquiry(req, {
          ...services,
          sendEmail: async () => {
            sends++;
          },
        })
      ).status,
      status,
    );
  }
  assert.equal(sends, 0);
});
test("rate limit and provider errors never report success", async () => {
  assert.equal(
    (
      await handleEnquiry(request(), {
        ...services,
        allowRequest: async () => false,
      })
    ).status,
    429,
  );
  assert.equal(
    (
      await handleEnquiry(request(), {
        ...services,
        allowRequest: async () => {
          throw Error();
        },
      })
    ).status,
    503,
  );
  assert.equal(
    (
      await handleEnquiry(request(), {
        ...services,
        sendEmail: async () => {
          throw Error();
        },
      })
    ).status,
    502,
  );
});
test("demo validates without sending and real mode uses configured inbox", async () => {
  const sent = [];
  const sendEmail = async (m) => {
    sent.push(m);
  };
  const demo = await handleEnquiry(request(), {
    ...services,
    demo: true,
    sendEmail,
  });
  assert.deepEqual(await demo.json(), { ok: true, demo: true });
  assert.equal(sent.length, 0);
  const live = await handleEnquiry(
    request({ ...valid, to: "attacker@example.com" }),
    { ...services, sendEmail },
  );
  assert.equal(live.status, 200);
  assert.equal(sent[0].to, services.recipient);
  assert.equal(sent[0].replyTo, valid.email);
});
test("waits for delivery acceptance", async () => {
  let release;
  const delivery = new Promise((resolve) => {
    release = resolve;
  });
  let complete = false;
  const result = handleEnquiry(request(), {
    ...services,
    sendEmail: () => delivery,
  }).then((r) => {
    complete = true;
    return r;
  });
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(complete, false);
  release();
  assert.equal((await result).status, 200);
});
