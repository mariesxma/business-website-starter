// Adapted under licenses/upstream-MIT.txt.
const recipients = {
  general: { label: "General enquiry", email: "hello@example.com" },
  sales: { label: "Sales & new projects", email: "sales@example.com" },
  support: { label: "Existing customer support", email: "support@example.com" },
  security: { label: "Security", email: "security@example.com" },
} as const;

export function validateEnquiry(data: Record<string, unknown>) {
  const value = (key: string) =>
    typeof data[key] === "string" ? data[key].trim() : "";
  const type = value("enquiryType");
  if (!Object.hasOwn(recipients, type))
    return { ok: false as const, error: "Please choose an enquiry type." };
  const team = recipients[type as keyof typeof recipients];
  const name = value("fullName");
  const email = value("email");
  const phone = value("phone");
  const referral = value("referral");
  const other = value("referralOther");
  const message = value("message");
  if (!name || name.length > 120 || /[\r\n]/.test(name))
    return {
      ok: false as const,
      error: "Please enter your full name (up to 120 characters).",
    };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return { ok: false as const, error: "Please enter a valid email address." };
  if (
    !/^[+\d\s().\-xext]+$/i.test(phone) ||
    phone.replace(/\D/g, "").length < 6 ||
    phone.length > 40
  )
    return {
      ok: false as const,
      error:
        "Please enter a valid contact number, including your country or area code.",
    };
  if (
    ![
      "Search engine",
      "LinkedIn",
      "Other social media",
      "Personal referral",
      "Event or conference",
      "Existing customer",
      "Other",
    ].includes(referral) ||
    (referral === "Other" && (!other || other.length > 200))
  )
    return {
      ok: false as const,
      error: "Please tell us how you heard about us.",
    };
  if (!message || message.length > 4000)
    return {
      ok: false as const,
      error: "Please enter your message (up to 4,000 characters).",
    };
  return {
    ok: true as const,
    name,
    email,
    phone,
    referral,
    other,
    message,
    type,
    team,
  };
}
