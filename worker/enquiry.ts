// Adapted under licenses/upstream-MIT.txt.
import { createEnquiryEmail } from "../lib/enquiry-email.ts";
import { readJson, BodyError } from "./body.ts";
export interface EnquiryServices {
  origin: string;
  recipient: string;
  businessName: string;
  demo: boolean;
  allowRequest(ip: string): Promise<boolean>;
  sendEmail(message: {
    to: string;
    replyTo: string;
    subject: string;
    text: string;
  }): Promise<void>;
}
const reply = (status: number, data: Record<string, unknown>) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...(status === 429 ? { "Retry-After": "60" } : {}),
    },
  });
export async function handleEnquiry(
  request: Request,
  services: EnquiryServices,
): Promise<Response> {
  if (request.method !== "POST")
    return new Response(null, { status: 405, headers: { Allow: "POST" } });
  if (request.headers.get("Origin") !== services.origin)
    return reply(403, {
      error: "Please submit your enquiry from our contact page.",
    });
  const ip = request.headers.get("CF-Connecting-IP");
  if (!ip && !services.demo)
    return reply(503, {
      error: "The contact form is temporarily unavailable.",
    });
  try {
    if (!(await services.allowRequest(ip || "local-demo")))
      return reply(429, { error: "Please wait a minute before trying again." });
  } catch {
    return reply(503, {
      error: "The contact form is temporarily unavailable.",
    });
  }
  try {
    const data = await readJson(request);
    const message = createEnquiryEmail(
      data,
      services.recipient,
      services.businessName,
    );
    if (!message.ok) return reply(400, { error: message.error });
    if (services.demo) return reply(200, { ok: true, demo: true });
    await services.sendEmail({
      to: message.email,
      replyTo: message.replyTo,
      subject: message.subject,
      text: message.body,
    });
    return reply(200, { ok: true, demo: false });
  } catch (error) {
    if (error instanceof BodyError)
      return reply(error.status, { error: error.message });
    return reply(502, {
      error:
        "Delivery could not be confirmed. Please try again or email directly.",
    });
  }
}
