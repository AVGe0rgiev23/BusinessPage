/**
 * Central site configuration.
 *
 * The production URL is read from `NEXT_PUBLIC_SITE_URL` when set; otherwise it
 * falls back to a clearly-placeholder `.example` domain (NOT a real host) — the
 * same convention as `NEXT_PUBLIC_CONTACT_EMAIL` in `contact-aside.tsx`.
 *
 * TODO (before going live): set `NEXT_PUBLIC_SITE_URL` to the real production
 * domain (e.g. `https://agility.com`) in the deployment environment. Canonical
 * URLs, `sitemap.xml`, `robots.txt`, and the OpenGraph / Twitter image URLs all
 * resolve against this value, so it must be the real origin in production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://agility.example.com"
).replace(/\/+$/, "");

export const siteName = "AGility";

export const siteTitle = "AGility — Custom Software & AI Automation";

export const siteDescription =
  "Custom software and AI automation for growing businesses — reclaim the hours lost to repetitive work, cut operating costs, and own the software you run on.";

/** Contact + social links. Real values — not placeholders. */
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "avgeorgiev25@gmail.com";

export const githubUrl = "https://github.com/AVGe0rgiev23";

export const linkedinUrl =
  "https://www.linkedin.com/in/alex-georgiev-028741417";

export const calendlyUrl = "https://calendly.com/avgeorgiev25/30min";
