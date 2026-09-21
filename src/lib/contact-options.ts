/**
 * Options for the contact form's optional "Preferred working model" field.
 *
 * Shared by the client form (`contact/contact-form.tsx`) and the Server Action
 * that validates and emails the submission (`app/[locale]/contact/actions.ts`).
 * It lives here rather than in the action because a `"use server"` module may
 * only export async functions — and it must not be duplicated, because the
 * server validates incoming values against this exact list before putting them
 * in an email.
 *
 * Each value is what travels over the wire and what gets validated. What the
 * visitor reads is in the catalog (`contact.form.workingModels.<value>.label`),
 * phrased so a non-technical visitor can answer without first understanding the
 * delivery models — "Not sure" is a real answer, and it is the default.
 */
export const WORKING_MODELS = [
  "unsure",
  "managed",
  "client-owned",
  "hybrid",
  "handoff",
] as const;

export type WorkingModelValue = (typeof WORKING_MODELS)[number];

/** Server-side allowlist check; unknown values are treated as "not answered". */
export function isWorkingModel(value: string): value is WorkingModelValue {
  return (WORKING_MODELS as readonly string[]).includes(value);
}
