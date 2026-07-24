"use server";

import { Resend } from "resend";

/**
 * Contact form Server Action.
 *
 * Validates the submission on the server (never trust the client), then delivers
 * it by email via Resend. Currently running in Resend "sandbox" mode (no verified
 * sending domain), so mail is sent from the shared `onboarding@resend.dev`
 * address and can only be delivered to the email on the Resend account itself —
 * see CONTACT_INBOX below. Once a real sending domain is verified with Resend,
 * switch RESEND_FROM to an address on that domain.
 */

const RESEND_FROM = "AGility <onboarding@resend.dev>";
const CONTACT_INBOX = "avgeorgiev25@gmail.com";

export type ContactFieldErrors = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; formError: string; fieldErrors: ContactFieldErrors };

// Simple, permissive email shape check — good enough for a contact form, kept in
// sync with the client-side check for a consistent experience.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_MESSAGE_LENGTH = 10;

// Upper bounds (defence in depth — the client has no maxlength, so the server
// guards against oversized or abusive payloads). 254 is the RFC-max email length.
const MAX_NAME_LENGTH = 100;
const MAX_COMPANY_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

export async function submitContactForm(
  formData: FormData
): Promise<ContactResult> {
  // Honeypot: a hidden field no real user can see or reach. If a bot fills it,
  // silently accept and do nothing — returning success so it can't learn it was
  // caught. Checked before validation so it short-circuits everything else.
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  // Collect + normalise. Company is optional; reading it here (rather than as a
  // separate variable) keeps it part of the validated payload without going unused.
  const submission = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  const fieldErrors: ContactFieldErrors = {};

  if (!submission.name) {
    fieldErrors.name = "Please enter your name.";
  } else if (submission.name.length > MAX_NAME_LENGTH) {
    fieldErrors.name = "Please keep your name under 100 characters.";
  }

  if (!submission.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (submission.email.length > MAX_EMAIL_LENGTH) {
    fieldErrors.email = "Please keep your email under 254 characters.";
  } else if (!EMAIL_PATTERN.test(submission.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (submission.company.length > MAX_COMPANY_LENGTH) {
    fieldErrors.company = "Please keep your company name under 100 characters.";
  }

  if (!submission.message) {
    fieldErrors.message = "Please tell us a little about what you need.";
  } else if (submission.message.length < MIN_MESSAGE_LENGTH) {
    fieldErrors.message =
      "Please add a little more detail so we can help — at least 10 characters.";
  } else if (submission.message.length > MAX_MESSAGE_LENGTH) {
    fieldErrors.message =
      "Please keep your message under 5,000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      formError: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // `submission` is validated — deliver it via Resend. Plain-text body only, so
  // there's no HTML-injection surface from user-supplied fields.
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: CONTACT_INBOX,
    replyTo: submission.email,
    subject: `New contact form message from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      submission.company ? `Company: ${submission.company}` : null,
      "",
      submission.message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    return {
      ok: false,
      formError:
        "Something went wrong sending your message. Please try again, or email us directly.",
      fieldErrors: {},
    };
  }

  return { ok: true };
}
