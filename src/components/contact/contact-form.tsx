"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

import { cn, focusRing } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  submitContactForm,
  type ContactFieldErrors,
} from "@/app/contact/actions";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

type FieldName = "name" | "email" | "company" | "message";
type Values = Record<FieldName, string>;

const INITIAL_VALUES: Values = { name: "", email: "", company: "", message: "" };

/** Mirror of the server-side validation so the user gets instant feedback. */
function validate(values: Values): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please tell us a little about what you need.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message =
      "Please add a little more detail so we can help — at least 10 characters.";
  }

  return errors;
}

/** Build an aria-describedby string from present ids only (no dangling refs). */
function describedBy(...ids: Array<string | false | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value.length > 0 ? value : undefined;
}

const inputBase =
  "w-full rounded-lg border bg-bg px-3.5 py-2.5 text-body text-text-primary placeholder:text-text-secondary transition-colors outline-none focus:ring-2 focus:ring-ring/50";

function inputClasses(hasError: boolean) {
  return cn(
    inputBase,
    hasError
      ? "border-destructive focus:border-destructive focus:ring-destructive/30"
      : "border-border focus:border-border-hover"
  );
}

export function ContactForm() {
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
      const nextErrors = validate(next);
      setErrors(nextErrors);
      setFormError(
        Object.keys(nextErrors).length > 0
          ? "Please fix the highlighted fields and try again."
          : null
      );
    }
  }

  function handleBlur(field: keyof ContactFieldErrors) {
    const nextErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please fix the highlighted fields and try again.");
      focusFirstError(nextErrors);
      return;
    }

    setFormError(null);

    const formData = new FormData();
    formData.set("name", values.name.trim());
    formData.set("email", values.email.trim());
    formData.set("company", values.company.trim());
    formData.set("message", values.message.trim());
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
          "rounded-2xl border border-border bg-bg-surface p-6 text-center md:p-10",
          focusRing
        )}
      >
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-subtle text-accent">
          <CheckCircle2 aria-hidden="true" className="size-6" />
        </span>
        <h3 className="mt-5 text-h3 font-semibold text-text-primary">
          Thanks — your message is on its way
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-body text-text-secondary">
          We read every message ourselves and will reply within one business day.
          In the meantime, you&apos;re welcome to book a free consultation.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            render={<Link href="/book" />}
            className={cn(
              "h-11 rounded-full px-6 hover:bg-accent-hover",
              focusRing
            )}
          >
            Book a consultation
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setSuccess(false)}
            className={cn(
              "h-11 rounded-full border-border px-6 text-text-primary hover:border-border-hover hover:bg-bg-elevated",
              focusRing
            )}
          >
            Send another message
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
      className="rounded-2xl border border-border bg-bg-surface p-6 md:p-8"
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
          Company website (leave this field blank)
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
        Fields marked{" "}
        <span className="text-accent" aria-hidden="true">
          *
        </span>{" "}
        are required.
      </p>

      {/* Form-level status: announces the overall error after a failed submit. */}
      <div id="contact-form-status" className="mt-2 empty:mt-0">
        {formError ? (
          <p
            role="alert"
            className="rounded-lg border border-destructive/40 bg-destructive/10 px-3.5 py-2.5 text-small font-medium text-destructive"
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
            Name{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
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
            Email{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
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
            Company{" "}
            <span className="font-normal text-text-secondary">(optional)</span>
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

        {/* Message */}
        <div className="grid gap-2">
          <label
            htmlFor="contact-message"
            className="text-small font-medium text-text-primary"
          >
            Message{" "}
            <span className="text-accent" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> (required)</span>
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
            placeholder="Tell us what's slowing your team down — the task, how often it happens, and the tools involved. A rough description is plenty."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy(
              "contact-message-hint",
              Boolean(errors.message) && "contact-message-error"
            )}
            className={cn(inputClasses(Boolean(errors.message)), "resize-y")}
          />
          <p id="contact-message-hint" className="text-small text-text-secondary">
            No pressure and no jargon — we&apos;ll take it from here.
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
          disabled={isPending}
          aria-busy={isPending}
          className={cn(
            "h-12 w-full rounded-full px-7 text-base hover:bg-accent-hover sm:w-auto",
            focusRing
          )}
        >
          {isPending ? (
            <>
              <LoaderCircle aria-hidden="true" className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send aria-hidden="true" />
              Send message
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
