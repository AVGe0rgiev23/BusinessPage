# AGility — Build Status & Plan

_Last updated: 2026-07-24_

## What AGility is

A premium marketing site for **AGility**, a custom software/AI engineering company. It must read as a venture-backed product company (Linear/Vercel/Stripe/Anthropic/Cursor/Resend/Raycast tier), never as a freelancer portfolio or generic agency template.

### Positioning (locked — do not drift from this)
- **Sell business outcomes, not AI.** Businesses don't wake up wanting "automation" — they think "we're wasting hours," "too many emails," "leads aren't getting answered," "we're paying people to copy-paste." AI/code is the *method*, never the headline.
- **Never claim code is unconditionally superior to no-code/low-code (e.g. n8n).** The defensible framing, to be used near-verbatim where relevant: *"We build custom software instead of relying primarily on low-code automation platforms. This gives you greater flexibility, ownership, scalability, and eliminates dependence on third-party workflow builders."*
- **No fabricated testimonials/case studies.** Trust is built via honest sections instead: built with modern AI, fully custom software, own your code, fast communication, long-term support, transparent development, GitHub projects, LinkedIn, open-source contributions, technology stack.
- **Copy rules:** avoid "revolutionize your business," "unlock AI," "next generation," and similar buzzwords. Always name the business problem → why it costs money → how AGility solves it. Confident, intelligent tone, written for business owners/decision-makers, not engineers.
- **Audience:** SMBs and growing companies with repetitive workflows, primarily Europe, available worldwide.
- **Primary conversions:** book a Zoom consultation, send an email, submit a contact form. Every page should funnel toward these.

### Copy on file (from earlier brainstorm, to be refined not replaced)
- Tagline: "Save Time. Cut Costs. Scale Faster."
- Badge/category: "Custom AI & Automation"
- CTA: "Book a consultation →"

## Decisions (resolved this session)

| Decision | Resolution |
|---|---|
| Site structure | **Multi-page**: `/`, `/services`, `/process`, `/about`, `/technologies`, `/work` (GitHub/engineering practice, not fake case studies), `/faq`, `/contact`, `/book` |
| Color palette | ~~Electric Indigo, base `#0A0A0D` / accent `#5A6EFF`~~ → **superseded 2026-08-11.** Now warm graphite + copper: base `#0B0A09`, surface `#121110`, bone text `#EFEBE4`, accent `#E08E43`. Still dark-only, no light/dark toggle. |
| Fonts | ~~Geist Sans / Geist Mono~~ → **superseded 2026-08-11.** **Archivo** (variable, narrowed via its `wdth` axis) for headings, **Instrument Sans** for body, **JetBrains Mono** for labels and data. |
| Motion | ~~Framer Motion~~ → **superseded 2026-08-11.** **Anime.js v4**, as the single motion library. Tokens in `src/lib/motion.ts`, mirrored by `--duration-*` / `--ease-*` in `globals.css`. |
| Components | shadcn/ui on Base UI, heavily restyled into the AGility system rather than used at defaults. |
| Research inputs | Linear, Vercel, OpenAI, Anthropic, Stripe, Cursor, Arc, Resend, Clerk, Raycast — synthesized, not copied. |

## Progress log

- **2026-07-24 — Phase 0 complete.** Design-system foundation landed (commit `e8c2cba`): Electric Indigo dark-only token system in `globals.css`, shadcn/ui (on **Base UI**, see note below), and shared `Container`/`Section`/`Nav`/`Footer` primitives wired into `layout.tsx`. Real metadata + OpenGraph + `icon.svg` monogram favicon. `pnpm lint` and `pnpm build` both pass clean (independently re-verified). Repo connected to GitHub (`origin` → `AVGe0rgiev23/BusinessPage`) and pushed.
- **2026-07-24 — Phase 1 complete.** Flagship Home page built on Opus (commit `ded3aef`): 12 sections (hero → problem → outcomes → services preview → why-custom → process preview → technology → why-AGility → open-source/GitHub → connect/LinkedIn → FAQ preview → closing CTA), composed under one `<main>` with a reusable `<Reveal>` scroll-motion primitive (server sections + thin client wrapper; `/` prerenders fully static). Independent review+fix pass on Opus (commit `d3fcb75`) fixed footer contrast (AA), placeholder-link `target="_blank"` UX bug, and minor a11y/cleanliness items; verdict: clears the "venture-backed product company" bar. `lint`/`build` clean. Pushed.
- **Deferred to human/visual judgment (revisit before deploy):** live-browser check of reveal motion feel + reduced-motion, marginal accent/eyebrow contrast on a real dark monitor, overall section pacing (12 sections is long — watch Outcomes vs Why-AGility redundancy), and the `why-custom` sticky column across breakpoints.
- **2026-07-24 — Phase 2 complete.** All 8 remaining routes built (commit `44d0b67`): `/services`, `/process`, `/about`, `/technologies`, `/work`, `/faq`, `/contact` (accessible form + stubbed Server Action), `/book`. Built as 4 parallel agents grouped by relatedness; one agent hit the session's usage limit mid-run but had already written its files to disk, so no rebuild was needed — just independent re-verification.
- **2026-07-24 — Phase 3 complete.** Four parallel read-only review agents (code/architecture, accessibility, content/positioning, performance) audited all 8 new pages, then two sequential fix agents applied the confirmed findings (commit `41f8acb`): WCAG AA contrast fix in the contact form, a site-wide skip-to-content link, `prefers-reduced-motion` support for the FAQ accordion, an unverifiable "senior team" claim removed, tagline wording aligned across pages, a shared `CtaBand` primitive replacing 8 near-duplicate CTA components, and Server Action hardening (length limits + honeypot). Performance review found no regressions. `lint`/`build` clean throughout.
- **2026-07-24 — Phase 4 complete.** Site-wide SEO pass (commit `cfb2633`): `metadataBase` + per-page canonical URLs (via `NEXT_PUBLIC_SITE_URL`, placeholder until a real domain is chosen), one shared branded OG/Twitter image generated with `next/og` from the real design tokens, `robots.ts` + `sitemap.ts` for all 9 routes, Organization JSON-LD (no fabricated `sameAs` — real fields only), and removal of unused `create-next-app` boilerplate SVGs.
- **2026-07-24 — Phase 5 (initial deploy) complete.** Deployed via Vercel CLI (project `ag777/agility-scaffold-tmp`) — first deploy was auto-assigned to production by Vercel. Confirmed the GitHub → Vercel integration actually works (a `git push` triggered a real auto-deploy despite an earlier misleading CLI error). **Live URL: https://agility-scaffold-tmp.vercel.app**
- **2026-07-25 — Real contact/social links + email delivery wired** (commit `4a4d0d6`): Resend installed via Vercel Marketplace (sandbox mode — no owned domain yet, so mail sends from `onboarding@resend.dev` and can only deliver to the Resend account's own email); `RESEND_API_KEY` set as an encrypted Vercel env var; `contact/actions.ts` now actually sends instead of discarding; verified with a real end-to-end test send. GitHub (`github.com/AVGe0rgiev23`), LinkedIn (`linkedin.com/in/alex-georgiev-028741417`), and Calendly (`calendly.com/avgeorgiev25/30min`) URLs are live everywhere, centralized in `src/lib/site-config.ts`. JSON-LD `sameAs` filled in.
- **Correction, same session:** I briefly renamed the Vercel project to `agility` hoping for a cleaner `agility.vercel.app` URL. That subdomain was already owned by an unrelated third party (global `*.vercel.app` namespace, not scoped per-account) — I verified the live URL's actual page content afterward and caught it, then renamed back to `agility-scaffold-tmp` and re-verified. **The correct, permanent URL is https://agility-scaffold-tmp.vercel.app** — do not trust any other `*.vercel.app` guess without checking the page content matches.

- **2026-08-11 — Pre-redesign verification + SEO URL fix.** Read-only audit before the redesign found that `NEXT_PUBLIC_SITE_URL` was never actually set in the deployment environment, so production had been serving the placeholder `https://agility.example.com` as its canonical URL, all 9 sitemap `<loc>`s, the `robots.txt` sitemap line, the Organization JSON-LD `url`, **and** the OpenGraph/Twitter image URLs — meaning every social preview pointed at a dead host and failed to load an image. Fixed by pointing the `siteUrl` fallback in `src/lib/site-config.ts` at the real live origin (commit `15e4641`); the env var still overrides it when a custom domain arrives. Also moved `shadcn` to `devDependencies`, started tracking `.mcp.json`, and gitignored pasted session transcripts. Verified via a real `pnpm build` (17/17 routes static, placeholder gone from all generated output) and on the deployed preview.

- **2026-08-11 — Premium frontend & interaction redesign.** The site was structurally sound and its copy was its best asset, but the visual system was the canonical AI-generated SaaS page: Geist Sans (Vercel's default), indigo-on-near-black with a radial glow repeated in three places, and one layout — centred mono eyebrow → centred h2 → centred lede → grid of `rounded-2xl` bordered cards with a `size-11` icon chip — used for eight consecutive homepage sections (**~48 near-identical cards on the home page alone**).

  **Copy was preserved throughout.** No claims, statistics, clients, or capabilities were invented. The one new persuasive surface — the custom-vs-low-code comparison table — draws every cell near-verbatim from prose already on that page; see the accuracy note in `home/why-custom.tsx` before editing it.

  What changed: a new token system ("engineering ledger" — warm graphite, bone text, one copper signal, small architectural radii, hairlines instead of card borders); a three-face typographic system doing the heavy lifting; **Framer Motion swapped for Anime.js v4** so there is exactly one motion library with one shared vocabulary of durations and easings; a measured-geometry SVG hero diagram showing manual inputs → custom software → handled outcomes (a schematic, deliberately not a fake dashboard, with a chained layout when it reflows to a single column); and a *different structural shape* for every section — ledger rows, a vertical-rule grid, one enclosed index panel, a comparison table, a connected SVG rail, a CSS-subgrid delivery matrix, a spec sheet, a sticky-column list. A shared `PointList` primitive absorbed the genuinely-repetitive list sections so the remaining variety is intentional rather than accidental.

  Verified: `tsc`, `eslint`, and `next build` (17/17 routes static) all clean; an automated sweep across 9 routes × 5 breakpoints (1920/1440/1024/768/390) found no horizontal overflow, no stuck-hidden reveals, no console errors or page exceptions, and no touch targets under the WCAG 2.2 24px minimum (applying the spec's inline-in-sentence exemption); plus a `prefers-reduced-motion` pass confirming all text renders visible without scrolling, and a keyboard pass confirming a visible focus ring on the first 20 tab stops.

  **Follow-up for you:** `/technologies` still lists "Framer Motion" under *Frontend*. That's a claim about what AGility can build with, not about this site, so it was left alone — but this site no longer uses it, so decide whether to keep it, swap it for Anime.js, or list both.

### Still open (only when you're ready)
- **A real owned domain** — canonical/sitemap/OG URLs now correctly resolve against `https://agility-scaffold-tmp.vercel.app`, so nothing is broken, but a custom domain is still wanted for branding and is required to move Resend off sandbox mode (currently limited to delivering only to your own Resend account email, not arbitrary visitors replying to your own domain). When it lands, set `NEXT_PUBLIC_SITE_URL` in the Vercel project env **and** update the fallback default in `src/lib/site-config.ts` in the same change so the two never drift.
- **Deploy target** — Vercel is the natural fit for this stack; needs your go-ahead.

### Environment notes for all downstream work (important)
- **shadcn is configured on Base UI (`@base-ui/react`), NOT Radix.** Component polymorphism uses the `render={<Link .../>}` prop, **not** Radix's `asChild`. Follow the existing `Nav`/`Button` usage as the reference.
- **`lucide-react@1.26.0` dropped brand icons** — GitHub/LinkedIn glyphs live in `src/components/icons/brand-icons.tsx` (inline Simple Icons SVG). Don't import `Github`/`Linkedin` from lucide; they don't exist.
- **Dark-only brand:** no `.dark` class, no light mode. Don't add `dark:` variants — they never activate.
- **Layout owns no `<main>`** — each page renders its own single `<main>` landmark (avoids double-`main` a11y violation).
- **Available Tailwind utilities:** `bg-bg` / `bg-bg-surface` / `bg-bg-elevated` / `bg-bg-sunken`; `text-text-primary` / `-secondary` / `-muted`; `border-border` / `border-border-strong` / `border-border-hover`; `bg-accent` / `hover:bg-accent-hover` / `bg-accent-active` / `bg-accent-subtle` / `border-accent-line`; `text-accent-foreground`. Type tokens: `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-h4` / `text-body-lg` / `text-body` / `text-small` / `text-micro` / `text-eyebrow` (pair eyebrow with `uppercase font-mono`). Motion tokens: `duration-[--duration-micro|fast|base|slow|cinematic]`, `ease-[--ease-out|in-out|standard]`. Custom utilities: `grain` (noise overlay), `rule-x` (fading hairline), `tabular` (tabular numerals). Use `Section` for vertical rhythm, `Container` for gutters, and `SectionHeading` for section openers.
- **Before building a new section, check whether it's genuinely a new *shape*.** The site's whole redesign premise is that consecutive sections must not look alike. If it's just a list of titled points, use `shared/point-list.tsx`; if it needs its own structure, give it one that isn't already in use on that page.
- **Reveal delays are in milliseconds** (they were seconds under Framer Motion). `<Reveal delay={90}>`, not `0.09`.

## Current state

### Done
- Healthy Next.js 16.2.11 + React 19.2.4 + Tailwind v4 + TypeScript scaffold, pnpm-managed, `install`/`lint`/`build` all verified passing.
- Positioning, structure, and design decisions locked (this document).
- **Phase 0 foundation** — design tokens, shadcn/ui, Nav/Footer/Container/Section primitives, metadata, favicon. Committed + pushed to GitHub.

- **Phase 2** — all 8 remaining routes built and committed.
- **Phase 3** — full QA pass (code, accessibility, content/positioning, performance) with all confirmed findings fixed and committed.
- **Phase 4** — site-wide SEO (metadata, OG image, sitemap, robots, JSON-LD) committed.

### Not done yet
Phase 5 (deploy) — see "Before going live" above. The site is otherwise feature-complete and builds/lints clean.

## Implementation plan

### Phase 0 — Foundation (in progress)
- `git init` + baseline commit.
- Install Framer Motion, lucide-react, shadcn/ui (`init`), `cn()` utility.
- Establish full design-token system (colors, type scale, spacing, radii) in `globals.css`.
- Shared primitives: `Container`/`Section`, `Nav` (with mobile menu), `Footer`, base `Button` variants.
- Real metadata (title/description/OpenGraph), replace favicon.

### Phase 1 — Home page (flagship / reference implementation)
Hero → problem statement → business outcomes → services preview → why custom software (the n8n-alternative framing) → process preview → technology → why choose AGility → GitHub section → LinkedIn section → FAQ preview → contact CTA → footer. Built first and reviewed before other pages copy its patterns.

### Phase 2 — Remaining pages (parallelized once Home is validated)
`/services`, `/process`, `/about`, `/technologies`, `/work`, `/faq`, `/contact`, `/book`.

### Phase 3 — Review & QA (subagent-driven)
- Code/architecture review (duplication, component structure).
- Accessibility (WCAG AA, keyboard nav, reduced motion, ARIA).
- Performance (Core Web Vitals, image/font loading, bundle size) — target Lighthouse 95+.
- Content/positioning review against the locked positioning rules above.
- Fix everything flagged.

### Phase 4 — SEO
Per-page metadata, OpenGraph, semantic headings, schema where relevant, alt text.

### Phase 5 — Deploy
Vercel (natural fit for the stack) — pending your confirmation when we get there.

## Working method for the rest of this build
Subagents do all building, testing, and reviewing. I gate each phase transition (verify build/lint/review results) before the next phase starts or parallelizes, so problems don't propagate across 8 pages at once.
