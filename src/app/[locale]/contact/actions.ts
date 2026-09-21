"use server";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";

import { routing, type Locale } from "@/i18n/routing";
import { isWorkingModel } from "@/lib/contact-options";

/**
 * Contact form Server Action.
 *
 * Validates the submission on the server (never trust the client), then delivers
 * it by email via Resend. Currently running in Resend "sandbox" mode (no verified
 * sending domain), so mail is sent from the shared `onboarding@resend.dev`
 * address and can only be delivered to the email on the Resend account itself —
 * see CONTACT_INBOX below. Once a real sending domain is verified with Resend,
 * switch RESEND_FROM to an address on that domain.
 *
 * Two languages are involved and they are deliberately separate. Messages shown
 * to the *visitor* (validation errors, the send failure) are in the language of
 * the site version they used, which the form sends along as `locale`. The email
 * to the *owner* is always English, plus a line saying which version it came
 * from, so it reads the same however the visitor wrote in.
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

  // The visitor's language. Never trusted: anything that is not one of our
  // locales falls back to the default rather than selecting arbitrary messages.
  const rawLocale = String(formData.get("locale") ?? "");
  const locale: Locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "contact.errors" });

  // Collect + normalise. Company is optional; reading it here (rather than as a
  // separate variable) keeps it part of the validated payload without going unused.
  const submission = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  // Optional, and never trusted: the submitted value is resolved against the
  // canonical option list rather than echoed into the email, so an unexpected
  // value simply reads as "not answered" instead of arriving as free text. The
  // label that goes into the email is the English one, whatever the visitor saw.
  const chosenModel = String(formData.get("workingModel") ?? "").trim();
  const owner = await getTranslations({ locale: "en", namespace: "contact.form" });
  const workingModel = isWorkingModel(chosenModel)
    ? owner(`workingModels.${chosenModel}.label`)
    : null;

  const fieldErrors: ContactFieldErrors = {};

  if (!submission.name) {
    fieldErrors.name = t("name.required");
  } else if (submission.name.length > MAX_NAME_LENGTH) {
    fieldErrors.name = t("name.tooLong", { max: MAX_NAME_LENGTH });
  }

  if (!submission.email) {
    fieldErrors.email = t("email.required");
  } else if (submission.email.length > MAX_EMAIL_LENGTH) {
    fieldErrors.email = t("email.tooLong", { max: MAX_EMAIL_LENGTH });
  } else if (!EMAIL_PATTERN.test(submission.email)) {
    fieldErrors.email = t("email.invalid");
  }

  if (submission.company.length > MAX_COMPANY_LENGTH) {
    fieldErrors.company = t("company.tooLong", { max: MAX_COMPANY_LENGTH });
  }

  if (!submission.message) {
    fieldErrors.message = t("message.required");
  } else if (submission.message.length < MIN_MESSAGE_LENGTH) {
    fieldErrors.message = t("message.tooShort", { min: MIN_MESSAGE_LENGTH });
  } else if (submission.message.length > MAX_MESSAGE_LENGTH) {
    fieldErrors.message = t("message.tooLong", { max: MAX_MESSAGE_LENGTH });
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      formError: t("form"),
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
      workingModel ? `Preferred working model: ${workingModel}` : null,
      `Site language: ${locale === "bg" ? "Bulgarian" : "English"}`,
      "",
      submission.message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    return {
      ok: false,
      formError: t("send"),
      fieldErrors: {},
    };
  }

  return { ok: true };
}
