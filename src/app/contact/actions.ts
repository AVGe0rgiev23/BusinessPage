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
  message?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; formError: string; fieldErrors: ContactFieldErrors };

// Simple, permissive email shape check — good enough for a contact form, kept in
// sync with the client-side check for a consistent experience.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MIN_MESSAGE_LENGTH = 10;

export async function submitContactForm(
  formData: FormData
): Promise<ContactResult> {
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
  }

  if (!submission.email) {
    fieldErrors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(submission.email)) {
    fieldErrors.email = "Please enter a valid email address.";
  }

  if (!submission.message) {
    fieldErrors.message = "Please tell us a little about what you need.";
  } else if (submission.message.length < MIN_MESSAGE_LENGTH) {
    fieldErrors.message =
      "Please add a little more detail so we can help — at least 10 characters.";
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
