// Adapted under licenses/upstream-MIT.txt.
import { validateEnquiry } from "./enquiry.ts";
export function createEnquiryEmail(
  data: Record<string, unknown>,
  recipient: string,
  businessName: string,
) {
  const value = validateEnquiry(data);
  if (!value.ok) return value;
  const subject = `${businessName} website — ${value.team.label} — ${value.name}`;
  const body = [
    `Enquiry type: ${value.team.label}`,
    `Full name: ${value.name}`,
    `Email: ${value.email}`,
    `Phone: ${value.phone}`,
    `Referral: ${value.referral === "Other" ? value.other : value.referral}`,
    "",
    "Message:",
    value.message,
  ].join("\r\n");
  return {
    ok: true as const,
    email: recipient,
    replyTo: value.email,
    subject,
    body,
  };
}
