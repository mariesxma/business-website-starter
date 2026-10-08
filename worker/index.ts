import { handleResources } from "./resources";
import type { Database } from "../db/resources";
import handler from "vinext/server/app-router-entry";
import { handleEnquiry } from "./enquiry";
export interface Env {
  DB?: Database;
  ASSETS?: { fetch(request: Request): Promise<Response> };
  CONTACT_MODE?: string;
  SITE_ORIGIN?: string;
  BUSINESS_NAME?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  ENQUIRY_RATE_LIMIT?: {
    limit(input: { key: string }): Promise<{ success: boolean }>;
  };
  ENQUIRY_EMAIL?: {
    send(message: {
      from: { name: string; email: string };
      to: string;
      replyTo: string;
      subject: string;
      text: string;
    }): Promise<unknown>;
  };
}
export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: Parameters<typeof handler.fetch>[2],
  ): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/resources")
      return handleResources(request, env.DB);
    if (url.pathname === "/api/enquiry") {
      const demo = env.CONTACT_MODE !== "live";
      if (
        !demo &&
        (!env.SITE_ORIGIN ||
          !env.CONTACT_TO ||
          !env.CONTACT_FROM ||
          !env.ENQUIRY_EMAIL)
      )
        return Response.json(
          { error: "Email delivery has not been configured." },
          { status: 503, headers: { "Cache-Control": "no-store" } },
        );
      const local = demo && ["localhost", "127.0.0.1"].includes(url.hostname);
      return handleEnquiry(request, {
        demo,
        origin: local ? url.origin : env.SITE_ORIGIN || "https://example.com",
        recipient: env.CONTACT_TO || "hello@example.com",
        businessName: env.BUSINESS_NAME || "Example Studio",
        allowRequest: async (ip) =>
          env.ENQUIRY_RATE_LIMIT
            ? (await env.ENQUIRY_RATE_LIMIT.limit({ key: ip })).success
            : local,
        sendEmail: async (message) => {
          if (!env.ENQUIRY_EMAIL || !env.CONTACT_FROM)
            throw new Error("Email unavailable");
          await env.ENQUIRY_EMAIL.send({
            from: {
              name: env.BUSINESS_NAME || "Website",
              email: env.CONTACT_FROM,
            },
            ...message,
          });
        },
      });
    }
    return handler.fetch(request, env, ctx);
  },
};
