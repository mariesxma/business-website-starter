"use client";
import { useState, type FormEvent } from "react";
import { validateEnquiry } from "../../lib/enquiry";
export default function ContactForm() {
  const [busy, setBusy] = useState(false),
    [notice, setNotice] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const valid = validateEnquiry(data);
    if (!valid.ok) {
      setNotice(valid.error);
      return;
    }
    setBusy(true);
    setNotice("");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/enquiry", {
        signal: controller.signal,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true)
        throw new Error(result.error || "Could not submit your enquiry.");
      setNotice(
        result.demo
          ? "Demo complete. Nothing was emailed or saved to a database."
          : "Your enquiry was accepted for email delivery.",
      );
    } catch (error) {
      setNotice(
        error instanceof Error && error.name === "AbortError"
          ? "Delivery could not be confirmed. Your details are still here. Check before submitting again."
          : error instanceof Error
            ? error.message
            : "Please try again.",
      );
    } finally {
      clearTimeout(timer);
      setBusy(false);
    }
  }
  return (
    <form className="contact-form card" onSubmit={submit} aria-busy={busy}>
      <p className="small">
        All fields are required unless marked optional. Please use fictional
        details when trying the demo.
      </p>
      <fieldset disabled={busy}>
        <legend>Your enquiry</legend>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Leave blank</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label htmlFor="enquiryType">Enquiry type</label>
        <select id="enquiryType" name="enquiryType">
          <option value="general">General enquiry</option>
          <option value="sales">New project</option>
          <option value="support">Support</option>
          <option value="security">Security</option>
        </select>
        <label htmlFor="fullName">Full name</label>
        <input
          id="fullName"
          name="fullName"
          required
          maxLength={120}
          autoComplete="name"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={40}
          autoComplete="tel"
        />
        <label htmlFor="referral">How did you hear about us?</label>
        <select id="referral" name="referral" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          {[
            "Search engine",
            "LinkedIn",
            "Other social media",
            "Personal referral",
            "Event or conference",
            "Existing customer",
          ].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={4000}
          aria-describedby="message-help"
        />
        <small id="message-help">
          Up to 4,000 characters. Do not include passwords or sensitive
          information.
        </small>
        <p className="small">
          Read the <a href="/privacy">privacy information</a> before submitting.
        </p>
        <button className="button" type="submit">
          {busy ? "Submitting…" : "Submit enquiry"}
        </button>
      </fieldset>
      <p role="status">{notice}</p>
      <noscript>
        This form needs JavaScript. Please use the email link above.
      </noscript>
    </form>
  );
}
