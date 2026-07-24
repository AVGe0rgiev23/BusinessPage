"use server";

/**
 * Contact form Server Action.
 *
 * Validates the submission on the server (never trust the client) and returns a
 * typed result. It intentionally does NOT deliver the message anywhere yet — see
 * the prominent TODO below before shipping to production.
 */

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

  // `submission` is now validated and ready to be delivered.
  //
  // TODO: wire real email/CRM delivery (e.g. Resend / SMTP / webhook) — currently
  // validates and returns success without sending. When wiring delivery, send
  // `submission` here and return `{ ok: false, formError, fieldErrors: {} }` if
  // the provider call fails so the user can retry.

  return { ok: true };
}
