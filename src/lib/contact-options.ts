/**
 * Options for the contact form's optional "Preferred working model" field.
 *
 * Shared by the client form (`contact/contact-form.tsx`) and the Server Action
 * that validates and emails the submission (`app/contact/actions.ts`). It lives
 * here rather than in the action because a `"use server"` module may only export
 * async functions — and it must not be duplicated, because the server validates
 * incoming values against this exact list before putting them in an email.
 *
 * `value` is what travels over the wire and what gets validated; `label` is what
 * the visitor reads. Deliberately phrased so a non-technical visitor can answer
 * without first understanding the delivery models — "Not sure" is a real answer,
 * and it is the default.
 */
export const WORKING_MODELS = [
  { value: "unsure", label: "Not sure — recommend one" },
  { value: "managed", label: "Fully managed by AGility" },
  { value: "client-owned", label: "Client-owned infrastructure" },
  {
    value: "hybrid",
    label: "Hybrid — client-owned infrastructure + AGility management",
  },
  { value: "handoff", label: "One-time hand-off" },
] as const;

export type WorkingModelValue = (typeof WORKING_MODELS)[number]["value"];

/** Server-side allowlist check; unknown values are treated as "not answered". */
export function workingModelLabel(value: string): string | null {
  return WORKING_MODELS.find((model) => model.value === value)?.label ?? null;
}
