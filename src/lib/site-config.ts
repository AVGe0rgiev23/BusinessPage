/**
 * Central site configuration.
 *
 * The production URL is read from `NEXT_PUBLIC_SITE_URL` when set; otherwise it
 * falls back to the current live origin on Vercel.
 *
 * The fallback used to be a placeholder `.example` domain, on the theory that a
 * fake host is safer than a wrong real one. In practice `NEXT_PUBLIC_SITE_URL`
 * was never set in the deployment environment, so production actually served
 * `https://agility.example.com` as its canonical URL, sitemap `<loc>`s,
 * `robots.txt` sitemap line, Organization JSON-LD `url`, and — worst — its
 * OpenGraph / Twitter image URLs, which made every social preview fail to load.
 * A dead placeholder is not safer than the real origin; it just fails quietly.
 *
 * When a custom domain is bought, set `NEXT_PUBLIC_SITE_URL` to it in the
 * Vercel project env (it overrides this fallback everywhere) and update this
 * default in the same change so the two never drift apart.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://agility-scaffold-tmp.vercel.app"
).replace(/\/+$/, "");

export const siteName = "AGility";

// The site title and description are copy, so they live in the message
// catalogs (`metadata.home`), one per language.

/** Contact + social links. Real values — not placeholders. */
export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "avgeorgiev25@gmail.com";

export const githubUrl = "https://github.com/AVGe0rgiev23";

export const linkedinUrl =
  "https://www.linkedin.com/in/alex-georgiev-028741417";

export const calendlyUrl = "https://calendly.com/avgeorgiev25/30min";
