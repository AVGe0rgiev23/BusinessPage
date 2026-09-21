"use client";

import { useLocale, useTranslations } from "next-intl";
import * as React from "react";
import { Link } from "@/i18n/navigation";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { WORKING_MODELS } from "@/lib/contact-options";
import { Button } from "@/components/ui/button";
import {
  submitContactForm,
  type ContactFieldErrors,
} from "@/app/[locale]/contact/actions";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

type FieldName = "name" | "email" | "company" | "workingModel" | "message";
type Values = Record<FieldName, string>;

const INITIAL_VALUES: Values = {
  name: "",
  email: "",
  company: "",
  workingModel: "",
  message: "",
};

type Translator = ReturnType<typeof useTranslations<"contact">>;

/** Mirror of the server-side validation so the user gets instant feedback. */
function validate(values: Values, t: Translator): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = t("errors.name.required");
  }

  if (!email) {
    errors.email = t("errors.email.required");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = t("errors.email.invalid");
  }

  if (!message) {
    errors.message = t("errors.message.required");
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = t("errors.message.tooShort", { min: MIN_MESSAGE_LENGTH });
  }

  return errors;
}

/** Build an aria-describedby string from present ids only (no dangling refs). */
function describedBy(...ids: Array<string | false | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value.length > 0 ? value : undefined;
}

/**
 * Field styling.
 *
 * A tighter radius than the old `rounded-lg` and an inset surface (`bg-bg`
 * against the form's `bg-bg-surface`) so inputs read as recessed wells rather
 * than raised cards. Placeholder text drops to `text-text-muted`: at
 * `text-text-secondary` it sat close enough to real input to be misread as a
 * filled field.
 */
const inputBase =
  "w-full rounded-md border bg-bg px-3.5 py-2.5 text-body text-text-primary placeholder:text-text-muted transition-colors duration-[--duration-fast] outline-none focus:ring-2 focus:ring-ring/40";

function inputClasses(hasError: boolean) {
  return cn(
    inputBase,
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/30"
      : "border-input hover:border-border-hover focus:border-accent"
  );
}

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [values, setValues] = React.useState<Values>(INITIAL_VALUES);
  const [errors, setErrors] = React.useState<ContactFieldErrors>({});
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const successRef = React.useRef<HTMLDivElement>(null);
  const honeypotRef = React.useRef<HTMLInputElement>(null);

  // Focus-manage the confirmation so screen readers land on (and announce) it.
  React.useEffect(() => {
    if (success) {
      successRef.current?.focus();
    }
  }, [success]);

  function focusFirstError(current: ContactFieldErrors) {
    if (current.name) {
      nameRef.current?.focus();
    } else if (current.email) {
      emailRef.current?.focus();
    } else if (current.message) {
      messageRef.current?.focus();
    }
  }

  function handleChange(field: FieldName, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    // Once the user has tried to submit, re-validate live so fixed fields clear.
    if (submitAttempted) {
      const nextErrors = validate(next, t);
      setErrors(nextErrors);
      setFormError(
        Object.keys(nextErrors).length > 0
          ? t("errors.form")
          : null
      );
    }
  }

  function handleBlur(field: keyof ContactFieldErrors) {
    const nextErrors = validate(values, t);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate(values, t);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError(t("errors.form"));
      focusFirstError(nextErrors);
      return;
    }

    setFormError(null);

    const formData = new FormData();
    formData.set("name", values.name.trim());
    formData.set("email", values.email.trim());
    formData.set("company", values.company.trim());
    formData.set("workingModel", values.workingModel);
    formData.set("message", values.message.trim());
    // The Server Action answers in this language and tells the owner which
    // version of the site the message came from.
    formData.set("locale", locale);
    // Honeypot: empty for real users; a value here means the Server Action
    // silently drops the submission.
    formData.set("company_website", honeypotRef.current?.value ?? "");

    startTransition(async () => {
      const result = await submitContactForm(formData);

      if (result.ok) {
        setSuccess(true);
        setValues(INITIAL_VALUES);
        setErrors({});
        setSubmitAttempted(false);
        setFormError(null);
        return;
      }

      // Server rejected it (defence in depth) — surface its errors accessibly.
      setErrors(result.fieldErrors);
      setFormError(result.formError);
      focusFirstError(result.fieldErrors);
    });
  }

  if (success) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "rounded-xl border border-border bg-bg-surface p-6 text-center md:p-10",
          focusRing
        )}
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-subtle text-accent">
          <CheckCircle2 aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-5 text-h3 font-semibold text-text-primary">
          {t("form.success.title")}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-body text-text-secondary">
          {t("form.success.body")}
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            render={<Link href="/book" />}
            className={cn(
              "h-11 px-6",
              focusRing
            )}
          >
            {t("form.success.book")}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setSuccess(false)}
            className={cn(
              "h-11 px-6",
              focusRing
            )}
          >
            {t("form.success.another")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="contact-form-status"
      className="relative rounded-xl border border-border bg-bg-surface p-6 md:p-8"
    >
      {/*
        Honeypot — moved off-screen and hidden from assistive tech (aria-hidden)
        and keyboard users (tabIndex=-1), so real people never see or reach it.
        Bots that autofill every field trip it, and the Server Action then
        silently drops the submission. Deliberately NOT display:none / type=hidden,
        which bots recognise and skip.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-company-website">
          {t("form.honeypot")}
        </label>
        <input
          ref={honeypotRef}
          id="contact-company-website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <p className="text-small text-text-secondary">
        {t.rich("form.requiredNote", {
          required: (chunks) => (
            <span className="text-accent" aria-hidden="true">
              {chunks}
            </span>
          ),
        })}
      </p>

      {/* Form-level status: announces the overall error after a failed submit. */}
      <div id="contact-form-status" className="mt-2 empty:mt-0">
        {formError ? (
          <p
            role="alert"
            className="rounded-md border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-small font-medium text-destructive"
          >
            {formError}
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-5">
        {/* Name */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-name"
            className="text-small font-medium text-text-primary"
          >
            {t("form.name.label")}{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only">{t("form.required")}</span>
          </label>
          <input
            ref={nameRef}
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => handleChange("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy(Boolean(errors.name) && "contact-name-error")}
            className={inputClasses(Boolean(errors.name))}
          />
          {errors.name ? (
            <p id="contact-name-error" className="text-small text-destructive">
              {errors.name}
            </p>
          ) : null}
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-email"
            className="text-small font-medium text-text-primary"
          >
            {t("form.email.label")}{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only">{t("form.required")}</span>
          </label>
          <input
            ref={emailRef}
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => handleChange("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy(Boolean(errors.email) && "contact-email-error")}
            className={inputClasses(Boolean(errors.email))}
          />
          {errors.email ? (
            <p id="contact-email-error" className="text-small text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        {/* Company (optional) */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-company"
            className="text-small font-medium text-text-primary"
          >
            {t("form.company.label")}{" "}
            <span className="font-normal text-text-secondary">{t("form.optional")}</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={(event) => handleChange("company", event.target.value)}
            className={inputClasses(false)}
          />
        </div>

        {/*
          Preferred working model (optional). Commercially useful — it says
          straight away how the prospect wants to work — but deliberately not
          required, and "Not sure" is a first-class answer. A visitor should
          never have to understand the delivery models before they can get in
          touch.
        */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-working-model"
            className="text-small font-medium text-text-primary"
          >
            {t("form.workingModel.label")}{" "}
            <span className="font-normal text-text-secondary">{t("form.optional")}</span>
          </label>
          <select
            id="contact-working-model"
            name="workingModel"
            value={values.workingModel}
            onChange={(event) =>
              handleChange("workingModel", event.target.value)
            }
            aria-describedby="contact-working-model-hint"
            className={cn(inputClasses(false), "appearance-none pr-10")}
            style={{
              backgroundImage:
                // Chevron stroke is the literal value of --color-text-muted;
                // a data URI can't read a CSS custom property.
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23827c74' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.875rem center",
            }}
          >
            <option value="">{t("form.select")}</option>
            {WORKING_MODELS.map((model) => (
              <option key={model} value={model}>
                {t(`form.workingModels.${model}.label`)}
              </option>
            ))}
          </select>
          <p
            id="contact-working-model-hint"
            className="text-small text-text-secondary"
          >
            {t("form.workingModel.hint")}
          </p>
        </div>

        {/* Message */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-message"
            className="text-small font-medium text-text-primary"
          >
            {t("form.message.label")}{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only">{t("form.required")}</span>
          </label>
          <textarea
            ref={messageRef}
            id="contact-message"
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={(event) => handleChange("message", event.target.value)}
            onBlur={() => handleBlur("message")}
            placeholder={t("form.message.placeholder")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy(
              "contact-message-hint",
              Boolean(errors.message) && "contact-message-error"
            )}
            className={cn(inputClasses(Boolean(errors.message)), "resize-y")}
          />
          <p id="contact-message-hint" className="text-small text-text-secondary">
            {t("form.message.hint")}
          </p>
          {errors.message ? (
            <p id="contact-message-error" className="text-small text-destructive">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          aria-busy={isPending}
          className={cn("w-full sm:w-auto", focusRing)}
        >
          {isPending ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              {t("form.sending")}
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              {t("form.send")}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
