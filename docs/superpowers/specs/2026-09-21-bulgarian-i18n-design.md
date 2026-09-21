# Bulgarian localisation (EN + BG) — design

**Date:** 2026-09-21
**Status:** Approved to build. The owner approved sections 1–3 in review and then chose
"build now, preview first" (branch → Vercel preview → owner reviews the Bulgarian →
production only after an explicit go). Section 6 (quality process) is the proposal that
was described in review and is carried into the plan exactly as written here.

## 1. Goal and scope

Serve the whole AGility site in **English (unchanged)** and **Bulgarian**. The Bulgarian
must be accurate, natural and terminologically consistent — written as a Bulgarian
business would write it, not translated word for word.

**In scope:** all 9 routes, nav/footer/CTAs, page metadata, OG/Twitter share images,
JSON-LD, the contact form (labels, validation, success/error states), accessibility
strings, a language switcher, sitemap/hreflang.

**Out of scope:** more languages (the architecture allows them), automatic locale
redirects, GitHub- or Calendly-hosted content, any change to English copy or design,
outlining the wordmark to SVG (optional follow-up).

## 2. Architecture — routing, URLs, SEO

- **next-intl v4** with a `[locale]` route segment (`src/app/[locale]/…`). Peer support for
  Next 16 / React 19 was verified against the registry (4.14.5).
- Locales `en` (default) and `bg`, `localePrefix: "as-needed"`:
  English stays at `/`, `/services`, …; Bulgarian lives at `/bg`, `/bg/services`, ….
  Existing indexed English URLs, canonicals and inbound links do not change.
- `src/proxy.ts` (Next 16's name for middleware) serves English at unprefixed URLs by
  **rewrite**, not redirect. **`localeDetection: false` — no automatic redirects based
  on browser language, cookie or `Accept-Language`.** This is an explicit owner decision.
- Every route prerenders for both locales (9 → 18 static pages): `generateStaticParams`
  plus `setRequestLocale` in the layout and each page.
- Locale-aware `Link` / `usePathname` from `src/i18n/navigation.ts` replace `next/link`
  (19 files) and the `usePathname` in the nav.
- **Language switcher, EN | БГ.** Visible in the header at every width (desktop: between
  nav and CTA; mobile: beside the menu button), also in the mobile menu and the footer.
  Each link goes to the same page in the other language, carries `lang` and `hreflang`,
  has accessible names «English» / «Български», and marks the current one `aria-current`.
- **Per-locale SEO:** `<html lang>`; canonical; `alternates.languages` (`en`, `bg`,
  `x-default` → English); `og:locale` (`en_US` / `bg_BG`); translated title and
  description on every route; JSON-LD `inLanguage`. Sitemap lists all 18 URLs with their
  language alternates. `robots` unchanged.
- **Share image:** a separate Bulgarian OG/Twitter image. It bundles a static
  (non-variable) Source Sans 3 TTF because Satori cannot read woff2. The English image
  keeps Satori's built-in font, so it is unchanged. (Assumption to confirm when
  rendering: the built-in font has no Cyrillic.)
- **Contact form.** Client and server validators keep their logic but read messages from
  the same `contact.errors.*` keys. The visitor's locale travels with the submission and
  is validated against the allowed list server-side. Validation, success and error
  messages appear in the visitor's language. **The notification email to the owner stays
  in English** and gains a clear line naming the site version it came from
  (`Site language: English` / `Site language: Bulgarian`). `WORKING_MODELS` keeps only
  its `value`s; the email renders the label from the `en` catalog, so there is one
  source of truth. The "free video analysis" `mailto:` subject is localised for the
  visitor: «Заявка за видеоанализ».

## 3. String storage and structure

- **Words in catalogs, structure in code.** One file per area under `messages/en/*.json`
  and `messages/bg/*.json` (`common`, `metadata`, `home`, `services`, `process`,
  `technologies`, `work`, `about`, `faq`, `book`, `contact`, `shared`). Server components
  read via `getTranslations`; the client components (`contact-form`, `hero`,
  `process-preview`, `system-diagram`, `nav`, `sheet`) receive only their own namespaces
  through a scoped provider, so ~13k words are not shipped to every browser.
- **Lists are id-keyed.** FAQ items, steps, tiers, services and points keep their order
  and stable ids in code; text lives under those ids. This also replaces the current use
  of English strings as React `key`s.
- **Shared components keep their APIs** (`SectionHeading`, `PointList`, `FaqGroup`,
  `CtaBand`, `PageHeader`). Copy hiding in prop defaults (`DeliveryModels`) moves to
  catalogs. No markup or visual changes.
- **Inline markup** is minimal (links inside FAQ answers, one highlight span). It becomes
  `t.rich` tags such as `<book>…</book>` so Bulgarian can reorder words freely. Curly
  quotes are real characters in the JSON (Bulgarian: „…“).
- **Hero headline:** three separate keys, so each language sets its own line breaks.
- **Prices from one source.** A shared `pricing.ts` (600–900, 1800–4500, 350–800) feeds
  both the Pricing section and the FAQ answer, replacing the "edit both by hand" rule.
  Each language supplies a template: English `€{low}–{high}` → `€1,800–4,500` (identical
  to today); Bulgarian `{low}–{high} €` → `1800–4500 €` (non-breaking space before `€`;
  Intl does not group 4-digit Bulgarian numbers).
- **Never translated:** `AGility`, tech and product names (Next.js, n8n, Trigger.dev,
  PostgreSQL, …), acronyms (CRM, API, AI, CI/CD, SaaS), URLs and the owner's email.
- **Duplicate copy** (e.g. the home FAQ preview vs the FAQ page) shares one catalog entry
  only where the English text is identical; otherwise entries stay separate.

## 4. Terminology and style (glossary FROZEN by the owner)

**Consistency rule:** one concept = one Bulgarian term everywhere. Never alternate between
«видеоанализ», «анализ на видео» and «видеоревю» (or between literal alternatives for
variety) unless grammar genuinely requires an inflected form.

**Navigation:** Услуги · Процес · Технологии · **Проекти** · За мен · Въпроси · Контакти.
«Work» is «Проекти», **never «Работа»** (reads as "jobs" in Bulgarian).

| English | Bulgarian |
|---|---|
| Custom software | софтуер по поръчка |
| AI automation | AI автоматизация («AI» stays Latin) |
| Free teardown / video teardown | **видеоанализ** (canonical); visible CTA «Безплатен видеоанализ»; email subject «Заявка за видеоанализ» |
| Pilot | пилотен проект |
| Full workflow project | цялостен проект за работен процес |
| Ongoing support | текуща поддръжка |
| Fixed price | фиксирана цена |
| Proposal / quote | **оферта** |
| Book a consultation | Запазете консултация |
| Discovery / research | **Проучване** |
| Scoping & design | Обхват и проектиране |
| Build | Разработка |
| Deploy / implementation | **Внедряване** |
| Support & iterate | Поддръжка и развитие |
| Scope | обхват |
| Handover / hand-off | предаване |
| Delivery model / operating model | **модел на предоставяне** (one term for both) |
| Fully managed / Client-owned / Hybrid | Пълно управление / Във ваша собственост / Хибриден модел |
| Infrastructure & accounts | инфраструктура и акаунти |
| Project agreement | договор за проекта |
| Third-party | трети страни |
| Source code | изходен код |
| Workflow | работен процес (never «работен поток») |
| Automation / Integration | автоматизация / интеграция |
| Dashboard | табло (pl. табла) |
| Chatbot / AI assistant | чатбот / AI асистент |
| Lead | потенциален клиент |
| Ticket | заявка |
| Open source | отворен код |
| Repository | хранилище с код |
| Commit history | история на промените |
| Code review | ревю на кода |
| Automated tests | автоматизирани тестове |
| Cloud | облак / облачна инфраструктура |
| Hosting / monitoring | хостинг / мониторинг |
| Stack | технологичен стек |
| Low-code | low-code (Latin) |
| Email | имейл |
| Spreadsheet | електронна таблица |

**Style rules**
- Polite lowercase **«вие»** (not capital «Вие»).
- First-person singular; the pronoun is dropped unless contrast needs it («Аз поемам…»).
  **Write around gendered first-person forms** — e.g. «Не се придържам догматично към един
  подход», «Ще ви кажа честно» — never «…догматичен/а».
- Punctuation: „…“ quotes; spaced en dash « – » instead of the English em dash; decimal
  comma; non-breaking space before `€`; ranges with an unspaced en dash.
- Headings in sentence case (Bulgarian does not title-case).
- Natural phrasing over calques. English is kept only where Bulgarian professionals write
  the English word (CRM, API, AI, Slack, Frontend/Backend, low-code).
- Hero headline lines ≤ ~13 characters (same rule as English).
- Button labels stay short (buttons are `whitespace-nowrap`): «Безплатен видеоанализ», not
  «Получете безплатен видеоанализ».
- Hedges in the English are part of the meaning and are preserved (e.g. the software is
  "intended to be yours under the project agreement").

**Machine-readable glossary and `pnpm i18n:check`** (approved behaviour). The glossary
ships as `messages/glossary.json` with an `avoid` list per term. `i18n:check` fails on:
1. key or file-set mismatch between `en` and `bg`;
2. ICU placeholders or rich-text tags that differ between a pair;
3. empty Bulgarian strings;
4. Bulgarian strings still identical to English (allow-list for the never-translated
   items above);
5. any glossary `avoid` form present in a Bulgarian string;
6. typography: em dash `—`, straight `"` or English curly quotes in Bulgarian strings.
It runs as part of `pnpm build`, so Bulgarian cannot silently drift from English.

## 5. Typography and layout for Cyrillic

Evidence (16 families screened, four rendered in Chromium against real tokens): Archivo
and Instrument Sans have no Cyrillic; most popular Cyrillic fonts lack Bulgarian
letterforms (`BGR` `locl`) and would silently show Russian-style shapes under `lang="bg"`.

> **Decision changed during the build.** Rendering showed that Source Sans 3's `BGR` forms
> are the *cursive-style* shapes (m-shaped «т», u-shaped «и», n-shaped «п», k-shaped «к»:
> «Контакти» reads «Kohmakmu»), and it applies them to **upright** text. Nearly every
> Bulgarian website, bank and book sets upright text with the standard forms, so the site
> turns `locl` off (`font-feature-settings: "locl" 0` on `html:lang(bg)`), which keeps
> `lang="bg"` for screen readers and search. The "Russian-style shapes" worry above
> therefore does not apply, and Source Sans 3 stays for the reasons below (fit and
> Latin + Cyrillic coverage). To use the Bulgarian forms instead, delete that one line
> in `globals.css`.

- **Bulgarian family: Source Sans 3**, one family for headings (600) and body (400/500),
  `wght` axis only, Latin **and** Cyrillic subsets (so `CRM`, `API`, `AI` inside Bulgarian
  sentences share a typeface). It is the only screened candidate whose hero headline
  fits the 559px column (533px with looser tracking) and whose desktop nav is estimated to
  fit at 1024px. Alternative if the owner prefers more character: IBM Plex Sans (needs
  ~3–4% smaller display size, a nav tweak, +27 KB).
- Applied through `:lang(bg)` overriding `--font-display` and `--font-sans`; English pages
  are untouched and must not download or preload it (verify in the build output).
- **JetBrains Mono** gains its Cyrillic subset (+11.8 KB, Bulgarian only) for eyebrows.
- **The AGility wordmark stays Archivo in both languages.** Bulgarian pages therefore
  still load Archivo: ≈132 KB of fonts vs 103 KB for English. Outlining the wordmark to
  SVG would bring Bulgarian to ≈98 KB (optional follow-up, not in scope).
- **`:lang(bg)` token overrides:** display tracking −0.04em → ≈−0.025em and leading
  0.95 → ≈1.02 (room for the breve on «Й» and tails on «Щ/Ц/Д»); h1–h3 tracking loosened
  proportionally; body tracking re-tuned (today's 0.004em was chosen for Instrument Sans).
  Final values are tuned by eye against a stress heading built from «Щ Й Ц Д».
- Headings get `overflow-wrap: break-word` as a safety net. No reliance on auto-hyphenation.
- Layout hot spots: hero headline (3 hand-set lines), `whitespace-nowrap` buttons, the
  desktop nav at 1024px (if it does not fit, move the menu breakpoint rather than shrink
  text), the hero system diagram, the `why-custom` comparison table, uppercase mono
  eyebrows.

## 6. Quality process and verification

**Translation order**
1. **Extract English only.** Snapshot the rendered text and head metadata of all 9 English
   routes from the current build *before* touching components. After moving copy into
   `en` catalogs, the English pages must match the snapshot exactly — proof that the
   refactor changed nothing visible.
2. Freeze the glossary (done — section 4).
3. Translate area by area into `bg`, running `i18n:check` after each area.

**Checks**
- `pnpm lint`, `tsc --noEmit`, `pnpm build` (18 static pages), `pnpm i18n:check`.
- English snapshot equality, final run.
- **Automated layout audit:** all 18 pages × 320 / 375 / 768 / 1024 / 1440px — no
  horizontal scroll, no clipped or overflowing text, no button-label overflow — plus the
  «Щ Й Ц Д» stress heading at every heading size. Screenshots of every page at 375 and
  1440 for both languages are reviewed.
- SEO: rendered `<head>` on both locales shows canonical, `hreflang` (`en`, `bg`,
  `x-default`), `og:locale`; sitemap has 18 URLs with alternates; Bulgarian OG image renders
  Cyrillic correctly.
- Contact form in both languages: validation messages localised; the notification email
  carries the language line. **The successful-submit path sends a real email through
  Resend, so it is only exercised with the owner's go-ahead.**
- **Bulgarian review:** a structured self-review per area against a checklist (grammar,
  register «вие», gendered forms, glossary, calques, faithfulness to the English incl.
  hedges) plus the automated checks. The strongest independent check is the owner reading
  the preview. A separate reviewer agent is only used if the owner asks for one.

## 7. Rollout

- Work on branch `feat/bulgarian-i18n`, committing as areas complete.
- Push the branch → Vercel **preview** (SSO-protected; judged by `Ready` state and by
  authenticated fetch). The owner skims the Bulgarian there.
- **`main` (production) is not touched until the owner says go.** Pushing `main` is the
  production deploy (GitHub → Vercel integration).

## 8. Known risks and open items

- `/work` renders two cards whose body is literally `TODO: what it was, what it did, …`
  (`selected-work.tsx`). Default: translate 1:1 so both languages match; fix both in one
  place when real text exists. Not invented by this project.
- next-intl specifics for Next 16 (`proxy.ts` matcher; a root `not-found` when the root
  layout lives under `[locale]`) are verified against the installed package while building.
- Font preloading: confirm English pages get no preload hint for Source Sans 3; measure the
  Bulgarian hero swap and consider conditional preload only if it is visible.
- Nav at 1024px is an estimate (wordmark and switcher widths assumed) until the audit runs.
- Satori's built-in font is assumed Latin-only; confirmed when the Bulgarian image renders.
