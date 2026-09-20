# Bulgarian Localisation (EN + BG) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve the whole AGility site in unchanged English and accurate, natural Bulgarian, with English at existing URLs and Bulgarian under `/bg`.

**Architecture:** next-intl v4 with a `[locale]` segment and `localePrefix: "as-needed"`; copy moves from JSX into per-area JSON catalogs (`messages/{en,bg}/<area>.json`); a `proxy.ts` rewrites unprefixed URLs to `en`; Bulgarian gets its own font family, share image, metadata and hreflang. Two custom tools guard quality: an English text-snapshot diff (proves the refactor changed nothing) and `pnpm i18n:check` (parity, placeholders, glossary, typography).

**Tech Stack:** Next.js 16.2 (App Router), React 19, next-intl 4.x, Tailwind v4, pnpm, Node 22, `node:test`, `node-html-parser` (dev), Playwright MCP for the layout audit.

**Spec:** `docs/superpowers/specs/2026-09-21-bulgarian-i18n-design.md`

## Global Constraints

- Work only on branch `feat/bulgarian-i18n`. **Never touch `main` until the owner says go.** Pushing `main` is the production deploy.
- Commit trailer on every commit: `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
- English pages must stay **text-identical** to the pre-refactor build (proven by the snapshot diff, Task 1) and visually unchanged.
- `localePrefix: "as-needed"`, `localeDetection: false`. **No automatic locale redirects** of any kind.
- Locales: `en` (default) and `bg`. Bulgarian URLs are `/bg`, `/bg/services`, …
- Glossary is **frozen** (`messages/glossary.json`, spec §4). One concept = one Bulgarian term; never alternate «видеоанализ» / «анализ на видео» / «видеоревю».
- Nav: Услуги · Процес · Технологии · Проекти · За мен · Въпроси · Контакти. «Work» is «Проекти», never «Работа».
- Bulgarian style: lowercase «вие»; first-person singular; no gendered first-person forms; „…“ quotes; spaced en dash « – », never an em dash; decimal comma; NBSP before `€`; sentence-case headings; hero headline lines ≤ ~13 characters; short button labels («Безплатен видеоанализ»).
- Never translated: `AGility`, tech/product names, acronyms (CRM, API, AI, CI/CD, SaaS), URLs, the owner's email.
- Fonts: Source Sans 3 (`wght` axis only, Latin + Cyrillic) applied only under `:lang(bg)`; wordmark stays Archivo; JetBrains Mono gains its Cyrillic subset; English pages must not download or preload the Bulgarian family.
- Contact: the notification email to the owner stays English and carries `Site language: English|Bulgarian`. **Never submit the contact form successfully while testing** (it sends a real email via Resend) unless the owner has said so; exercise validation paths only.
- The `/work` cards whose body is `TODO: …` are translated 1:1, not invented.
- Do not commit `.snapshots/`, `.next/`, or `public/__layout-audit.html`.
- **Stop servers only by port** (the PowerShell one-liner used in the steps below). Never `taskkill /IM node.exe`: Claude Code and the Playwright MCP server are Node processes.
- Never write files from an inline `node -e` (it stalls on a permission check when nobody is at the terminal); put the code in a script file and run it.

## File Structure

| Path | Responsibility |
|---|---|
| `scripts/snapshot-text.mjs` | Extract visible text + SEO head fields from prerendered HTML for diffing |
| `scripts/i18n-check.mjs` (+ `.test.mjs`) | Catalog parity / placeholder / glossary / typography checks |
| `messages/glossary.json` | Machine-readable frozen glossary, `avoid` lists, `keepLatin`, `keyRules` |
| `messages/{en,bg}/<area>.json` | Copy per area; file name = top-level namespace |
| `src/i18n/routing.ts` | Locales, default, prefix, detection off |
| `src/i18n/navigation.ts` | Locale-aware `Link`, `usePathname`, `getPathname` |
| `src/i18n/messages.ts` | `AREAS`, `loadMessages`, `pickMessages` |
| `src/i18n/request.ts` | next-intl request config |
| `src/i18n/client-messages.tsx` | Scoped `NextIntlClientProvider` for client components |
| `src/proxy.ts` | next-intl routing proxy (Next 16 name for middleware) |
| `src/lib/seo.ts` | Per-route metadata, canonical, hreflang, OG locale |
| `src/lib/pricing.ts` | Single source for price bands |
| `src/components/layout/language-switcher.tsx` | EN \| БГ switcher |
| `src/app/[locale]/**` | All routes (moved from `src/app/**`) |
| `src/app/og/[locale]/route.tsx` | Per-locale share image |
| `src/app/sitemap.ts`, `robots.ts` | Stay at `src/app` root |
| `scripts/layout-audit.html` | In-page layout audit (copied to `public/` only while running) |

---

## Phase A — Verification tools

### Task 1: English text-snapshot harness and baseline

**Files:**
- Create: `scripts/snapshot-text.mjs`, `scripts/accordion-text.js`, `scripts/accordion-diff.mjs`
- Modify: `package.json` (devDependency), `.gitignore`

**Interfaces:**
- Produces: `node scripts/snapshot-text.mjs --out <dir> [--locale en|bg]` writing one `<slug>.txt` per route (`home.txt`, `services.txt`, …). Later tasks diff against `.snapshots/en-before`.

- [ ] **Step 1: Install the parser and ignore snapshots**

```bash
cd /d/agility-scaffold-tmp
pnpm add -D node-html-parser
printf '\n# Text snapshots used to prove the i18n refactor changed nothing\n.snapshots/\n' >> .gitignore
```

- [ ] **Step 2: Write the snapshot script**

```js
#!/usr/bin/env node
// Usage: node scripts/snapshot-text.mjs --out <dir> [--locale en|bg]
// Reads the prerendered HTML from .next/server/app and writes, per route, the
// SEO head fields plus all visible text and text-bearing attributes, so two
// builds can be compared with `diff -ru`.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "node-html-parser";

const ROUTES = [
  ["home", "/"], ["services", "/services"], ["process", "/process"],
  ["technologies", "/technologies"], ["work", "/work"], ["about", "/about"],
  ["faq", "/faq"], ["book", "/book"], ["contact", "/contact"],
];
const BLOCK = new Set(["p","h1","h2","h3","h4","h5","h6","li","div","section","header","footer","main","nav","dt","dd","dl","ul","ol","table","tr","td","th","caption","figcaption","button","label","form","option","select","textarea","article"]);
const ATTRS = ["aria-label", "alt", "title", "placeholder"];

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const out = opt("out");
const locale = opt("locale", "en");
if (!out) { console.error("usage: snapshot-text.mjs --out <dir> [--locale en|bg]"); process.exit(2); }

const appDir = join(process.cwd(), ".next", "server", "app");
// Before the refactor pages are app/<slug>.html; after it, app/<locale>.html and app/<locale>/<slug>.html.
const localized = existsSync(join(appDir, `${locale}.html`));
const htmlFor = (route) => {
  const slug = route === "/" ? null : route.slice(1);
  if (localized) return slug ? join(appDir, locale, `${slug}.html`) : join(appDir, `${locale}.html`);
  return join(appDir, `${slug ?? "index"}.html`);
};

function collect(node, acc) {
  if (node.nodeType === 3) { acc.push(node.rawText); return; }
  if (node.nodeType !== 1) return;
  for (const c of node.childNodes) collect(c, acc);
  if (BLOCK.has(node.rawTagName?.toLowerCase())) acc.push("\n");
}
const decode = (s) => s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#x27;|&#39;|&apos;/g,"'").replace(/&nbsp;/g," ");

function snapshot(file) {
  const root = parse(readFileSync(file, "utf8"));
  const meta = (sel) => root.querySelector(sel)?.getAttribute("content") ?? "";
  const head = [
    `lang: ${root.querySelector("html")?.getAttribute("lang") ?? ""}`,
    `title: ${decode(root.querySelector("title")?.text ?? "")}`,
    `description: ${decode(meta('meta[name="description"]'))}`,
    `canonical: ${root.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? ""}`,
    `og:title: ${decode(meta('meta[property="og:title"]'))}`,
    `og:description: ${decode(meta('meta[property="og:description"]'))}`,
    `og:type: ${meta('meta[property="og:type"]')}`,
    `twitter:card: ${meta('meta[name="twitter:card"]')}`,
    `twitter:title: ${decode(meta('meta[name="twitter:title"]'))}`,
    `twitter:description: ${decode(meta('meta[name="twitter:description"]'))}`,
  ];
  const body = root.querySelector("body");
  const attrs = [];
  for (const el of body.querySelectorAll("*")) for (const a of ATTRS) {
    const v = el.getAttribute(a);
    if (v) attrs.push(`${a}: ${decode(v)}`);
  }
  body.querySelectorAll("script, style, noscript, template").forEach((n) => n.remove());
  const acc = []; collect(body, acc);
  const text = decode(acc.join("")).split("\n").map((l) => l.replace(/\s+/g, " ").trim()).filter(Boolean).join("\n");
  return [...head, "--- text ---", text, "--- attributes ---", ...attrs.sort()].join("\n") + "\n";
}

mkdirSync(out, { recursive: true });
for (const [name, route] of ROUTES) {
  const file = htmlFor(route);
  if (!existsSync(file)) { console.error(`missing ${file}`); process.exit(1); }
  writeFileSync(join(out, `${name}.txt`), snapshot(file));
}
console.log(`snapshot: ${ROUTES.length} routes -> ${out}`);
```

- [ ] **Step 3: Build the current, unmodified site and capture the baseline**

Run: `pnpm build` (timeout 600000ms), then `node scripts/snapshot-text.mjs --out .snapshots/en-before`
Expected: build succeeds; prints `snapshot: 9 routes -> .snapshots/en-before`.

- [ ] **Step 4: Prove the harness is deterministic and sensitive**

```bash
node scripts/snapshot-text.mjs --out .snapshots/en-before-2
diff -ru .snapshots/en-before .snapshots/en-before-2 && echo "DETERMINISTIC"
# sensitivity: change one word in a copy, the diff must fail
cp -r .snapshots/en-before .snapshots/en-tampered
sed -i '0,/Get a free teardown/s//Get a free teardownX/' .snapshots/en-tampered/home.txt
diff -ru .snapshots/en-before .snapshots/en-tampered > /dev/null && echo "BAD: tamper not detected" || echo "SENSITIVE"
rm -rf .snapshots/en-before-2 .snapshots/en-tampered
```
Expected: prints `DETERMINISTIC` then `SENSITIVE`.

- [ ] **Step 5: Capture the closed accordions (the text snapshot cannot see them)**

Closed accordion panels are not in the server HTML — the answers live only in the streamed React payload — so `snapshot-text.mjs` never sees FAQ answers. Capture them in a browser instead. With `pnpm start` running, in Playwright open `/faq` and evaluate the function in `scripts/accordion-text.js`, saving the result as `.snapshots/accordions-en-before-faq.json` (22 items, no missing panels); repeat on `/` for `.snapshots/accordions-en-before-home.json` (6 items). Stop the server by port. `node scripts/accordion-diff.mjs <before> <after>` later compares two captures and must print `ACCORDIONS IDENTICAL`; it exits 1 and prints the difference on any change.

- [ ] **Step 6: Confirm the baseline contains real copy, then commit**

Run: `grep -c "moving data" .snapshots/en-before/home.txt` — Expected: `1`.

```bash
git add scripts/snapshot-text.mjs scripts/accordion-text.js scripts/accordion-diff.mjs package.json pnpm-lock.yaml .gitignore
git commit -m "chore: add English text-snapshot harness for the i18n refactor

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

### Task 2: `i18n:check` tool and frozen glossary (TDD)

**Files:**
- Create: `scripts/i18n-check.mjs`, `scripts/i18n-check.test.mjs`, `messages/glossary.json`
- Modify: `package.json` (scripts)

**Interfaces:**
- Produces: `checkMessages({ dir, glossary, areas?, strict? }) → { errors, warnings }` where each item is `{ code, where, detail }`. Codes: `MISSING_FILE`, `MISSING_KEY`, `EXTRA_KEY`, `EMPTY`, `PLACEHOLDER_MISMATCH`, `UNTRANSLATED` (an error only when `strict`, otherwise one summary warning), `AVOID_TERM`, `KEY_RULE`, `TYPO_EMDASH`, `TYPO_QUOTE`. The glossary, key-rule and typography rules apply **only to strings that differ from the English**: a string still equal to the English (an unreplaced seed copy) is reported once, as `UNTRANSLATED`, not once per rule (two extra tests pin this, 15 in total). Also exports `flatten(obj)` and `tokens(message)`.
- CLI: `pnpm i18n:check [--areas a,b] [--strict] [--dir messages] [--glossary path]`; exit 1 on any error.

- [ ] **Step 1: Write the failing tests**

```js
// scripts/i18n-check.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkMessages, flatten, tokens } from "./i18n-check.mjs";

function fixture(en, bg) {
  const dir = mkdtempSync(join(tmpdir(), "i18n-"));
  for (const [loc, areas] of [["en", en], ["bg", bg]]) {
    mkdirSync(join(dir, loc));
    for (const [area, data] of Object.entries(areas)) {
      writeFileSync(join(dir, loc, `${area}.json`), JSON.stringify(data));
    }
  }
  return dir;
}
const glossary = {
  keepLatin: ["AGility", "CRM", "Next.js"],
  keyRules: [{ key: "common.nav.work", equals: "Проекти" }],
  terms: [{ en: "workflow", bg: "работен процес", avoid: ["работен поток"] }],
};
const run = (en, bg, extra = {}) => checkMessages({ dir: fixture(en, bg), glossary, ...extra });
const codes = (r) => r.errors.map((e) => e.code);

test("flatten joins nested keys and rejects non-string leaves", () => {
  assert.deepEqual(flatten({ a: { b: "x" }, c: "y" }), { "a.b": "x", c: "y" });
  assert.throws(() => flatten({ a: [1] }), /Non-string leaf/);
});

test("tokens lists top-level ICU args and rich tags, ignoring plural bodies", () => {
  assert.deepEqual(tokens("<book>Hi</book> {low}–{high}"), ["</book>", "<book>", "{high}", "{low}"]);
  assert.deepEqual(tokens("{n, plural, one {# a} other {# b}}"), ["{n}"]);
});

test("a clean translated pair passes", () => {
  const r = run({ home: { a: "Hello {name}" } }, { home: { a: "Здравейте, {name}" } });
  assert.deepEqual(r.errors, []);
});

test("reports missing and extra keys", () => {
  const r = run({ home: { a: "A", b: "B" } }, { home: { a: "А", c: "В" } });
  assert.deepEqual(codes(r).sort(), ["EXTRA_KEY", "MISSING_KEY"]);
});

test("reports a missing file", () => {
  assert.deepEqual(codes(run({ home: { a: "A" }, faq: { a: "A" } }, { home: { a: "А" } })), ["MISSING_FILE"]);
});

test("reports placeholder and tag mismatches", () => {
  const r = run(
    { home: { a: "Pay {low}", b: "<book>x</book>" } },
    { home: { a: "Платете", b: "<contact>x</contact>" } },
  );
  assert.deepEqual(codes(r), ["PLACEHOLDER_MISMATCH", "PLACEHOLDER_MISMATCH"]);
});

test("reports empty Bulgarian strings", () => {
  assert.deepEqual(codes(run({ home: { a: "A" } }, { home: { a: "  " } })), ["EMPTY"]);
});

test("untranslated is a warning normally and an error in strict mode", () => {
  const en = { home: { a: "Hello there" } };
  const loose = run(en, en);
  assert.deepEqual(loose.errors, []);
  assert.equal(loose.warnings[0].code, "UNTRANSLATED");
  assert.deepEqual(codes(run(en, en, { strict: true })), ["UNTRANSLATED"]);
});

test("identical strings made only of kept names or numbers are allowed", () => {
  const en = { home: { a: "Next.js", b: "AGility CRM", c: "01" } };
  assert.deepEqual(run(en, en, { strict: true }).errors, []);
});

test("avoid-list terms are flagged on Cyrillic word boundaries", () => {
  const en = { home: { a: "A", b: "B" } };
  const r = run(en, { home: { a: "Автоматизиран работен поток", b: "Автоматизиран работен процес" } });
  assert.deepEqual(r.errors.map((e) => e.where), ["home.a"]);
  assert.equal(r.errors[0].code, "AVOID_TERM");
});

test("key rules pin frozen labels", () => {
  const en = { common: { nav: { work: "Work" } } };
  assert.deepEqual(codes(run(en, { common: { nav: { work: "Работа" } } })), ["KEY_RULE"]);
  assert.deepEqual(run(en, { common: { nav: { work: "Проекти" } } }).errors, []);
});

test("typography: em dash, straight quotes, English closing quote, unbalanced „“", () => {
  const en = { home: { a: "A", b: "B", c: "C", d: "D", e: "E" } };
  const r = run(en, { home: { a: "Ал — Бе", b: 'Ал "Бе"', c: "Ал ”Бе”", d: "Ал „Бе", e: "Ал „Бе“" } });
  assert.deepEqual(r.errors.map((e) => e.where), ["home.a", "home.b", "home.c", "home.d"]);
});

test("--areas limits the check to the named areas", () => {
  const r = run({ home: { a: "A" }, faq: { a: "A" } }, { home: { a: "А" } }, { areas: ["home"] });
  assert.deepEqual(r.errors, []);
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `node --test scripts/i18n-check.test.mjs`
Expected: FAIL — `Cannot find module './i18n-check.mjs'`.

- [ ] **Step 3: Implement the checker**

```js
#!/usr/bin/env node
// Guards the catalogs: parity, placeholders, glossary, typography.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";

export function flatten(obj, prefix = "", out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") out[key] = v;
    else if (v && typeof v === "object" && !Array.isArray(v)) flatten(v, key, out);
    else throw new Error(`Non-string leaf at ${key}`);
  }
  return out;
}

/** Top-level ICU argument names and rich-text tags of a message, sorted. */
export function tokens(message) {
  const args = [];
  let depth = 0;
  for (let i = 0; i < message.length; i++) {
    const ch = message[i];
    if (ch === "{") {
      if (depth === 0) {
        const m = /^\{\s*([A-Za-z0-9_]+)/.exec(message.slice(i));
        if (m) args.push(`{${m[1]}}`);
      }
      depth++;
    } else if (ch === "}") depth = Math.max(0, depth - 1);
  }
  const tags = [...message.matchAll(/<\/?[A-Za-z][\w-]*\s*\/?>/g)].map((m) => m[0].replace(/\s+/g, ""));
  return [...args, ...tags].sort();
}

function isAllowedIdentical(value, keep) {
  const words = value
    .split(/[^\p{L}\p{N}.+#/_-]+/u)
    .map((w) => w.replace(/^[.\-/]+|[.\-/]+$/g, ""))
    .filter(Boolean);
  return words.every((w) => /^\d[\d.,]*$/.test(w) || keep.has(w.toLowerCase()) || /^[^\p{L}]*$/u.test(w));
}

function containsTerm(text, term) {
  const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?<![\\p{L}\\p{N}])${esc}(?![\\p{L}\\p{N}])`, "iu").test(text);
}

function typography(text, where, errors) {
  if (text.includes("—")) errors.push({ code: "TYPO_EMDASH", where, detail: "use a spaced en dash ' – '" });
  if (/["”]/.test(text)) errors.push({ code: "TYPO_QUOTE", where, detail: 'use „…“, not " or ”' });
  const open = (text.match(/„/g) ?? []).length;
  const close = (text.match(/“/g) ?? []).length;
  if (open !== close) errors.push({ code: "TYPO_QUOTE", where, detail: "unbalanced „ “" });
}

export function checkMessages({ dir, glossary, areas, strict = false }) {
  const errors = [];
  const warnings = [];
  const keep = new Set((glossary.keepLatin ?? []).map((w) => w.toLowerCase()));
  const listAreas = (loc) =>
    existsSync(join(dir, loc))
      ? readdirSync(join(dir, loc)).filter((f) => f.endsWith(".json")).map((f) => basename(f, ".json")).sort()
      : [];
  const enAreas = listAreas("en");
  const bgAreas = listAreas("bg");
  const scope = areas ?? [...new Set([...enAreas, ...bgAreas])].sort();
  let untranslated = 0;

  for (const area of scope) {
    if (!enAreas.includes(area) || !bgAreas.includes(area)) {
      errors.push({ code: "MISSING_FILE", where: area, detail: enAreas.includes(area) ? "bg" : "en" });
      continue;
    }
    const load = (loc) => flatten(JSON.parse(readFileSync(join(dir, loc, `${area}.json`), "utf8")));
    const en = load("en");
    const bg = load("bg");
    for (const k of Object.keys(en)) if (!(k in bg)) errors.push({ code: "MISSING_KEY", where: `${area}.${k}`, detail: "missing in bg" });
    for (const k of Object.keys(bg)) if (!(k in en)) errors.push({ code: "EXTRA_KEY", where: `${area}.${k}`, detail: "not in en" });

    for (const [k, b] of Object.entries(bg)) {
      if (!(k in en)) continue;
      const where = `${area}.${k}`;
      const e = en[k];
      if (!b.trim()) { errors.push({ code: "EMPTY", where, detail: "" }); continue; }
      if (tokens(e).join("|") !== tokens(b).join("|")) {
        errors.push({ code: "PLACEHOLDER_MISMATCH", where, detail: `en [${tokens(e)}] vs bg [${tokens(b)}]` });
      }
      if (b.trim() === e.trim() && !isAllowedIdentical(b, keep)) {
        untranslated++;
        if (strict) errors.push({ code: "UNTRANSLATED", where, detail: b.slice(0, 60) });
      }
      for (const term of glossary.terms ?? [])
        for (const a of term.avoid ?? [])
          if (containsTerm(b, a)) errors.push({ code: "AVOID_TERM", where, detail: `"${a}" → use "${term.bg}"` });
      typography(b, where, errors);
    }

    for (const rule of glossary.keyRules ?? []) {
      const [ruleArea, ...rest] = rule.key.split(".");
      const key = rest.join(".");
      if (ruleArea === area && key in bg && bg[key] !== rule.equals) {
        errors.push({ code: "KEY_RULE", where: rule.key, detail: `expected "${rule.equals}", got "${bg[key]}"` });
      }
    }
  }
  if (!strict && untranslated) warnings.push({ code: "UNTRANSLATED", where: "(all)", detail: `${untranslated} strings still identical to English` });
  return { errors, warnings };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
  const dir = opt("dir") ?? "messages";
  const glossary = JSON.parse(readFileSync(opt("glossary") ?? join(dir, "glossary.json"), "utf8"));
  const { errors, warnings } = checkMessages({ dir, glossary, areas: opt("areas")?.split(","), strict: args.includes("--strict") });
  for (const w of warnings) console.warn(`warn  [${w.code}] ${w.where} — ${w.detail}`);
  for (const e of errors) console.error(`ERROR [${e.code}] ${e.where} — ${e.detail}`);
  console.log(`i18n:check ${errors.length ? "FAILED" : "ok"} (${errors.length} errors, ${warnings.length} warnings)`);
  process.exit(errors.length ? 1 : 0);
}
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `node --test scripts/i18n-check.test.mjs`
Expected: the first 13 tests PASS (the two seed-copy tests are added in Task 5 when the seeded English copies first trip the rules).

- [ ] **Step 5: Add the frozen glossary and the npm scripts**

`messages/glossary.json` (the `bg` field documents the canonical term; the check enforces `avoid` and `keyRules`):

```json
{
  "keepLatin": ["AGility", "TypeScript", "JavaScript", "Python", "SQL", "React", "Next.js", "Tailwind", "CSS", "Framer", "Motion", "Node.js", "REST", "API", "APIs", "GraphQL", "Webhooks", "Trigger.dev", "PostgreSQL", "Redis", "Vercel", "AWS", "Docker", "CI/CD", "n8n", "OpenAI", "Anthropic", "LLM", "RAG", "CRM", "CRMs", "AI", "SaaS", "Slack", "GitHub", "LinkedIn", "Calendly", "Resend", "LeadGenius"],
  "keyRules": [
    { "key": "common.nav.services", "equals": "Услуги" },
    { "key": "common.nav.process", "equals": "Процес" },
    { "key": "common.nav.technologies", "equals": "Технологии" },
    { "key": "common.nav.work", "equals": "Проекти" },
    { "key": "common.nav.about", "equals": "За мен" },
    { "key": "common.nav.faq", "equals": "Въпроси" },
    { "key": "common.nav.contact", "equals": "Контакти" },
    { "key": "home.teardown.subject", "equals": "Заявка за видеоанализ" }
  ],
  "terms": [
    { "en": "workflow", "bg": "работен процес", "avoid": ["работен поток", "работни потоци", "воркфлоу", "уъркфлоу"] },
    { "en": "video teardown", "bg": "видеоанализ", "avoid": ["анализ на видео", "видеоревю", "видео ревю", "видео анализ", "тийрдаун", "teardown"] },
    { "en": "proposal / quote", "bg": "оферта", "avoid": ["котировка"] },
    { "en": "discovery", "bg": "проучване", "avoid": ["дискавъри", "discovery"] },
    { "en": "deploy / implementation", "bg": "внедряване", "avoid": ["деплой", "деплойване", "деплойнат", "разгръщане"] },
    { "en": "delivery model", "bg": "модел на предоставяне", "avoid": ["модел на доставка", "модел на доставяне", "модел за предоставяне"] },
    { "en": "fully managed", "bg": "пълно управление", "avoid": ["мениджиран", "мениджърски модел"] },
    { "en": "dashboard", "bg": "табло", "avoid": ["дашборд", "дашборди"] },
    { "en": "lead", "bg": "потенциален клиент", "avoid": ["лийд", "лийдове", "лидове"] },
    { "en": "ticket", "bg": "заявка", "avoid": ["тикет", "тикети"] },
    { "en": "repository", "bg": "хранилище с код", "avoid": ["репозитори", "репозиторий", "репозитории", "репозиторита"] },
    { "en": "source code", "bg": "изходен код", "avoid": ["сорс код", "сорс кода"] },
    { "en": "email", "bg": "имейл", "avoid": ["е-мейл", "емейл", "e-mail", "е-поща"] },
    { "en": "custom software", "bg": "софтуер по поръчка", "avoid": ["индивидуален софтуер", "персонализиран софтуер", "софтуер по заявка"] },
    { "en": "spreadsheet", "bg": "електронна таблица", "avoid": ["спредшийт", "спредшит"] },
    { "en": "code review", "bg": "ревю на кода", "avoid": ["код ревю", "кодово ревю"] },
    { "en": "open source", "bg": "отворен код", "avoid": ["опен сорс", "опенсорс"] }
  ]
}
```

Add to `package.json` `"scripts"`: `"i18n:check": "node scripts/i18n-check.mjs"` and `"test:i18n": "node --test scripts/i18n-check.test.mjs"`.

Run: `pnpm test:i18n` — Expected: 13 pass (15 after Task 5).

- [ ] **Step 6: Commit**

```bash
git add scripts/i18n-check.mjs scripts/i18n-check.test.mjs messages/glossary.json package.json
git commit -m "feat(i18n): add i18n:check tool and the frozen Bulgarian glossary

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Phase B — i18n foundation (English text still inline)

### Task 3: next-intl foundation, `[locale]` routes, locale-aware links

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/navigation.ts`, `src/i18n/messages.ts`, `src/i18n/request.ts`, `src/i18n/init-locale.ts`, `src/i18n/client-messages.tsx`, `src/proxy.ts`, `global.d.ts`, `messages/en/common.json`, `messages/bg/common.json`, `src/app/og/[locale]/route.tsx`
- Modify: `next.config.ts`, `src/app/[locale]/layout.tsx` (moved), the 19 files importing `next/link`, `src/components/layout/nav.tsx`, `src/components/contact/contact-form.tsx` (import path)
- Move: `src/app/layout.tsx`, `page.tsx`, `about/ book/ contact/ faq/ process/ services/ technologies/ work/` → `src/app/[locale]/`
- Delete: `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`

**Interfaces:**
- Produces: `routing`, `type Locale` (`@/i18n/routing`); `Link`, `usePathname`, `useRouter`, `redirect`, `getPathname` (`@/i18n/navigation`); `AREAS`, `loadMessages(locale)`, `pickMessages(messages, paths)` (`@/i18n/messages`); `initLocale(params): Promise<Locale>` (`@/i18n/init-locale`); `<ClientMessages paths={string[]}>` (`@/i18n/client-messages`).
- Convention: every area task adds its name to `AREAS`, adds its JSON type to `global.d.ts`, and seeds `messages/bg/<area>.json` as a copy of the English file until it is translated.

- [ ] **Step 1: Install next-intl and create the i18n modules**

Run: `pnpm add next-intl`. pnpm 11 then reports `ERR_PNPM_IGNORED_BUILDS` and writes placeholders into `pnpm-workspace.yaml`; next-intl only needs those build scripts for optional message-extraction features this project does not use, so set `'@parcel/watcher': false` and `'@swc/core': false` under `allowBuilds`, then confirm `pnpm install --frozen-lockfile` exits 0 (Vercel runs the same install).

```ts
// src/i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "bg"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  // Owner decision: no automatic redirects from browser language or cookie.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
```

```ts
// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, usePathname, useRouter, redirect, getPathname } =
  createNavigation(routing);
```

```ts
// src/i18n/messages.ts
import type { Locale } from "./routing";

/** Top-level namespaces; each is messages/<locale>/<area>.json. Grows as areas are extracted. */
export const AREAS = ["common"] as const;
export type Messages = Record<string, unknown>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    AREAS.map(
      async (area) =>
        [area, (await import(`../../messages/${locale}/${area}.json`)).default] as const,
    ),
  );
  return Object.fromEntries(entries);
}

/** Pick dotted paths ("home.hero") out of the full catalog, preserving nesting. */
export function pickMessages(messages: Messages, paths: string[]): Messages {
  const out: Messages = {};
  for (const path of paths) {
    const parts = path.split(".");
    let src: unknown = messages;
    let dst = out;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      src = (src as Messages | undefined)?.[key];
      if (src === undefined) throw new Error(`pickMessages: no messages at "${path}"`);
      if (i === parts.length - 1) dst[key] = src;
      else dst = (dst[key] ??= {}) as Messages;
    }
  }
  return out;
}
```

```ts
// src/i18n/request.ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { loadMessages } from "./messages";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: await loadMessages(locale) };
});
```

```ts
// src/i18n/init-locale.ts
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "./routing";

/** Resolve the [locale] param, enable static rendering for it, and return it typed. */
export async function initLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return locale;
}
```

```tsx
// src/i18n/client-messages.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { pickMessages } from "./messages";

/** Gives only the named message paths to the client components below it. */
export async function ClientMessages({
  paths,
  children,
}: {
  paths: string[];
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pickMessages(messages, paths)}>
      {children}
    </NextIntlClientProvider>
  );
}
```

```ts
// src/proxy.ts  (Next 16's name for middleware)
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, the share-image route and any path with a file extension.
  matcher: ["/((?!api|og|_next|_vercel|.*\\..*).*)"],
};
```

```ts
// global.d.ts  (typed message keys; each area task adds its JSON here)
import type common from "./messages/en/common.json";
import type { routing } from "./src/i18n/routing";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: { common: typeof common };
  }
}
```

Seed catalogs (`messages/en/common.json` and an identical `messages/bg/common.json`):

```json
{ "skipToContent": "Skip to content" }
```

- [ ] **Step 2: Wire the plugin and keep old share-image URLs alive**

```ts
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    // The share image moved from file-based routes to /og/<locale>; keep the old
    // URLs alive for social cards that already cached them.
    return [
      { source: "/opengraph-image", destination: "/og/en", permanent: true },
      { source: "/twitter-image", destination: "/og/en", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
```

```tsx
// src/app/og/[locale]/route.tsx  (Task 15 makes the image itself locale-aware)
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { renderSocialImage } from "@/lib/og-image";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return new Response("Not found", { status: 404 });
  return renderSocialImage();
}
```

- [ ] **Step 3: Move the routes under `[locale]`**

```bash
cd /d/agility-scaffold-tmp
mkdir -p "src/app/[locale]"
git mv src/app/layout.tsx "src/app/[locale]/layout.tsx"
git mv src/app/page.tsx "src/app/[locale]/page.tsx"
for d in about book contact faq process services technologies work; do git mv "src/app/$d" "src/app/[locale]/$d"; done
git rm -q src/app/opengraph-image.tsx src/app/twitter-image.tsx
sed -i 's#@/app/contact/actions#@/app/[locale]/contact/actions#' src/components/contact/contact-form.tsx
grep -rn "@/app/" src | grep -v "\[locale\]" || echo "no stale @/app imports"
```
Expected: `no stale @/app imports`.

- [ ] **Step 4: Update the layout and initialise the locale in every page**

In `src/app/[locale]/layout.tsx`: change `import "./globals.css"` to `import "../globals.css"`; add the imports and `generateStaticParams`; make the component async; render `<html lang={locale}>`; take the skip-link text from the catalog. Keep every other line (fonts, `metadata`, the inline script, `Nav`, `Footer`) exactly as it is.

```tsx
import { getTranslations } from "next-intl/server";
import { initLocale } from "@/i18n/init-locale";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "common" });
  // <html lang={locale} …existing attributes…> … <a href="#main" …>{t("skipToContent")}</a> …
```

Wrap everything inside `<body>` in `<NextIntlClientProvider messages={{}}>` (import it from `next-intl`). next-intl's client `Link` and `usePathname` read the locale from it — without it the build fails at prerender inside `usePathname` — and `messages={{}}` keeps copy out of the client bundle (components that need strings get a slice from `<ClientMessages>`).

In each of the nine `page.tsx` files, make the default export `async`, accept `params`, and call `initLocale` first, e.g.:

```tsx
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await initLocale(params);
  // …unchanged JSX…
}
```
(import `initLocale` from `@/i18n/init-locale`; the home page's function is `Home`.)

- [ ] **Step 5: Swap in locale-aware links**

```bash
grep -rl 'from "next/link"' src | xargs sed -i 's#import Link from "next/link";#import { Link } from "@/i18n/navigation";#'
sed -i 's#import { usePathname } from "next/navigation";#import { usePathname } from "@/i18n/navigation";#' src/components/layout/nav.tsx
grep -rn "next/link" src || echo "no next/link left"
grep -n "usePathname" src/components/layout/nav.tsx | head -2
```
Expected: `no next/link left`; nav imports `usePathname` from `@/i18n/navigation`.

- [ ] **Step 6: Typecheck, lint, build**

First delete the stale generated types (`rm -rf .next/types .next/dev/types`; they still point at the old `src/app/...` paths and make `tsc` fail). Run: `pnpm exec tsc --noEmit && pnpm lint && pnpm build` (timeout 600000ms)
Expected: all pass; the route table lists `/[locale]` and every subpage as SSG with both `/en/…` and `/bg/…` params, plus `/og/[locale]`. If `tsc` reports an API difference from the installed next-intl, adapt to its types — the required behaviour is unchanged: `as-needed` prefix, detection off, English at unprefixed URLs.

- [ ] **Step 7: Prove English is unchanged and smoke-test routing**

```bash
node scripts/snapshot-text.mjs --out .snapshots/en-task3
diff -ru .snapshots/en-before .snapshots/en-task3 && echo "ENGLISH IDENTICAL"
(pnpm start > /tmp/start.log 2>&1 &) ; sleep 6
for p in / /services /bg /bg/services; do curl -s -o /dev/null -w "$p -> %{http_code}\n" "http://localhost:3000$p"; done
curl -s http://localhost:3000/bg | grep -o '<html[^>]*lang="[a-z]*"' | head -1
curl -s -o /dev/null -w "/en -> %{http_code} %{redirect_url}\n" http://localhost:3000/en
powershell.exe -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force }"
```
Expected: `ENGLISH IDENTICAL`; all four paths `200`; the `/bg` page reports `lang="bg"` (its text is still English); `/en` is a redirect to `/` (canonicalising an explicit default-locale prefix — not language detection). Stop the server afterwards.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(i18n): add next-intl with [locale] routes, proxy and locale-aware links

English stays at unprefixed URLs (rewrite, no detection); Bulgarian routes exist
and currently render English text. Share image moves to /og/<locale>.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Phase C — Metadata, SEO and site chrome

### Task 4: Per-route metadata, hreflang, sitemap, JSON-LD

**Files:**
- Create: `messages/en/metadata.json`, `messages/bg/metadata.json`, `src/lib/seo.ts`
- Modify: `src/i18n/messages.ts` (add `"metadata"` to `AREAS`), `global.d.ts`, `src/app/[locale]/layout.tsx`, the nine `src/app/[locale]/**/page.tsx`, `src/app/sitemap.ts`, `src/components/seo/organization-schema.tsx`, `src/lib/site-config.ts`

**Interfaces:**
- Produces: `ROUTES`, `type RouteKey`, `localizedPath(locale, route)`, `routeMetadata(locale, route): Promise<Metadata>` from `@/lib/seo`.
- Catalog shape `metadata.<route>.{title,description}` for `home | services | process | technologies | work | about | faq | book | contact`, plus `metadata.og.{alt,eyebrow,tagline,caption}`.

- [ ] **Step 1: Create the English metadata catalog from the current strings**

Copy each route's `title` and `description` **verbatim** from its current `const title` / `const description` (for `home`, the values of `siteTitle` / `siteDescription` in `src/lib/site-config.ts`). Add the share-image strings from `src/lib/og-image.tsx`:

```json
{
  "home": { "title": "…", "description": "…" },
  "services": { "title": "…", "description": "…" },
  "process": { "title": "…", "description": "…" },
  "technologies": { "title": "…", "description": "…" },
  "work": { "title": "…", "description": "…" },
  "about": { "title": "…", "description": "…" },
  "faq": { "title": "…", "description": "…" },
  "book": { "title": "…", "description": "…" },
  "contact": { "title": "…", "description": "…" },
  "og": {
    "alt": "AGility — Custom software & AI automation. Save time. Cut costs. Scale faster.",
    "eyebrow": "Custom Software & AI Automation",
    "tagline": "Save time. Cut costs. Scale faster.",
    "caption": "Custom software, built around your business."
  }
}
```
(The `…` above stand for the exact existing strings — copy them from the files; nothing is reworded.) Seed `messages/bg/metadata.json` as a copy. Add `"metadata"` to `AREAS` and `metadata: typeof metadata` to `global.d.ts`.

- [ ] **Step 2: Write the SEO helper**

```ts
// src/lib/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export const ROUTES = {
  home: "/",
  services: "/services",
  process: "/process",
  technologies: "/technologies",
  work: "/work",
  about: "/about",
  faq: "/faq",
  book: "/book",
  contact: "/contact",
} as const;
export type RouteKey = keyof typeof ROUTES;

const OG_LOCALE: Record<Locale, string> = { en: "en_US", bg: "bg_BG" };

/** Public path of a route in a locale: "/" and "/bg", "/services" and "/bg/services", … */
export const localizedPath = (locale: Locale, route: RouteKey) =>
  getPathname({ locale, href: ROUTES[route] });

export async function routeMetadata(locale: Locale, route: RouteKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, route)]),
  );
  return {
    title: t(`${route}.title`),
    description: t(`${route}.description`),
    alternates: {
      canonical: localizedPath(locale, route),
      languages: { ...languages, "x-default": localizedPath(routing.defaultLocale, route) },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      images: [{ url: `/og/${locale}`, width: 1200, height: 630, alt: t("og.alt") }],
    },
    twitter: { card: "summary_large_image", images: [`/og/${locale}`] },
  };
}
```

- [ ] **Step 3: Use it in the layout and every page**

Layout: replace the whole `title`/`description` constants and the `metadata` object with `export const metadata: Metadata = { metadataBase: new URL(siteUrl) };` and delete the now-unused `siteDescription`, `siteTitle` imports.

Each page (example — `services`): delete the `const title`, `const description` and `export const metadata`, then

```tsx
import type { Metadata } from "next";
import { initLocale } from "@/i18n/init-locale";
import { routeMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return routeMetadata(await initLocale(params), "services");
}
```
Route keys: home `page.tsx` → `"home"`, and `"services" | "process" | "technologies" | "work" | "about" | "faq" | "book" | "contact"` for the others.

- [ ] **Step 4: Sitemap with language alternates (18 URLs)**

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { ROUTES, localizedPath, type RouteKey } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

type Freq = MetadataRoute.Sitemap[number]["changeFrequency"];
// Same weighting as before: home and the two conversion pages rank highest.
const WEIGHT: Record<RouteKey, { changeFrequency: Freq; priority: number }> = {
  home: { changeFrequency: "monthly", priority: 1.0 },
  services: { changeFrequency: "monthly", priority: 0.9 },
  book: { changeFrequency: "monthly", priority: 0.9 },
  contact: { changeFrequency: "monthly", priority: 0.8 },
  process: { changeFrequency: "yearly", priority: 0.7 },
  about: { changeFrequency: "yearly", priority: 0.7 },
  work: { changeFrequency: "yearly", priority: 0.7 },
  technologies: { changeFrequency: "yearly", priority: 0.6 },
  faq: { changeFrequency: "yearly", priority: 0.5 },
};

const absolute = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return (Object.keys(ROUTES) as RouteKey[]).flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absolute(localizedPath(locale, route)),
      lastModified,
      ...WEIGHT[route],
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((l) => [l, absolute(localizedPath(l, route))]),
          ),
          "x-default": absolute(localizedPath(routing.defaultLocale, route)),
        },
      },
    })),
  );
}
```

- [ ] **Step 5: Language-aware JSON-LD**

Make `OrganizationSchema` an async server component. Keep the existing Organization object (its `description` now comes from `metadata.home.description`, the same text as before) and add a second script for the site's language:

```tsx
// src/components/seo/organization-schema.tsx
import { getLocale, getTranslations } from "next-intl/server";
import { githubUrl, linkedinUrl, siteName, siteUrl } from "@/lib/site-config";

export async function OrganizationSchema() {
  const locale = await getLocale();
  const t = await getTranslations("metadata");
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    description: t("home.description"),
    sameAs: [githubUrl, linkedinUrl],
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: locale === "en" ? siteUrl : `${siteUrl}/${locale}`,
    inLanguage: locale,
  };
  return (
    <>
      {[organization, website].map((data) => (
        <script
          key={data["@type"]}
          type="application/ld+json"
          // JSON.stringify output is safe to inline; no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
```
Then remove `siteTitle` and `siteDescription` from `src/lib/site-config.ts` after `grep -rn "siteTitle\|siteDescription" src` shows no remaining users.

- [ ] **Step 6: Verify**

```bash
pnpm exec tsc --noEmit && pnpm lint && pnpm build
node scripts/snapshot-text.mjs --out .snapshots/en-task4
diff -ru .snapshots/en-before .snapshots/en-task4 && echo "ENGLISH IDENTICAL"
(pnpm start > /tmp/start.log 2>&1 &) ; sleep 6
curl -s http://localhost:3000/services | grep -io '<link rel="alternate"[^>]*>' 
curl -s http://localhost:3000/bg/services | grep -io '<link rel="canonical"[^>]*>\|property="og:locale" content="[^"]*"'
curl -s http://localhost:3000/sitemap.xml | grep -c "<loc>"
powershell.exe -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force }"
```
Expected: `ENGLISH IDENTICAL` (title, description, canonical, og and twitter text all unchanged); `/services` lists alternates for `en`, `bg` and `x-default`; `/bg/services` has canonical `…/bg/services` and `og:locale` `bg_BG`; the sitemap prints `18`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(i18n): per-locale metadata, hreflang, 18-URL sitemap and language-aware JSON-LD

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

## Extraction rules (apply to every extraction task: Tasks 5 and 7–14)

- **R1 — Keys.** `messages/en/<area>.json`: top level is the area, then the component/section id (camelCase), then the field. Lists use stable ids (`items.<id>.<field>`) with the ordered ids held in code as `as const` arrays, so keys stay type-checked (`t(\`items.${id}.title\`)`). Never use English text as a React `key`.
- **R2 — Values.** The English value is the **exact** string currently in the component, verbatim: `&apos;` → `'`, `&ldquo;`/`&rdquo;` → “ ”, `&amp;` → `&`, `{" "}`-joined text becomes one string. The snapshot diff is the judge.
- **R3 — Server components** become `async` and read `const t = await getTranslations("<area>.<section>")`. **Client components** read `const t = useTranslations("<area>.<section>")`, and the place that renders them is wrapped in `<ClientMessages paths={["<area>.<section>"]}>` (`@/i18n/client-messages`).
- **R4 — Rich text.** Inline links and highlights use `t.rich("key", { book: (chunks) => <Link href="/book" className={linkClass}>{chunks}</Link> })` with the source string `…<book>book a consultation</book>…`. A highlight span becomes an `<em>…</em>` tag mapped to the same span classes.
- **R5 — Props.** Copy in prop defaults (e.g. `DeliveryModels`) is removed; callers pass translated strings. Shared component APIs do not change.
- **R6 — Seed.** After creating `messages/en/<area>.json`, run `cp messages/en/<area>.json messages/bg/<area>.json`, add the area to `AREAS` in `src/i18n/messages.ts`, and add `<area>: typeof <area>` (with its `import type`) to `global.d.ts`.
- **R7 — Verify.** `pnpm exec tsc --noEmit && pnpm lint && pnpm build`; `node scripts/snapshot-text.mjs --out .snapshots/en-<task>`; `diff -ru <previous snapshot> .snapshots/en-<task>` must print nothing (the previous snapshot is the last one that was clean); `pnpm i18n:check --areas <area>` must exit 0 (the "still identical to English" warning is expected until translation). For tasks that touch accordion content (`home`, `faq`) also capture the accordions in the browser with `scripts/accordion-text.js` and run `node scripts/accordion-diff.mjs .snapshots/accordions-en-before-<page>.json <new capture>` — it must print `ACCORDIONS IDENTICAL`.
- **R8 — Commit** once per task, message `feat(i18n): extract <area> copy into catalogs`, with the Co-Authored-By trailer.

### Task 5: Extract site chrome (nav, footer, skip link) into `common`

**Files:**
- Modify: `messages/en/common.json` and `messages/bg/common.json`, `src/components/layout/nav.tsx`, `src/components/layout/footer.tsx`, `src/app/[locale]/layout.tsx`, possibly `src/components/ui/sheet.tsx`

**Interfaces:**
- Produces catalog keys used by later tasks: `common.nav.{services,process,technologies,work,about,faq,contact,cta,primary,mobile,openMenu}`, `common.brand.homeLabel`, `common.footer.*`. (The frozen-label key rules in `messages/glossary.json` pin `common.nav.*` in Bulgarian.)

- [ ] **Step 1: Write the English `common` catalog from the current strings**

```json
{
  "skipToContent": "Skip to content",
  "brand": { "homeLabel": "AGility — home" },
  "nav": {
    "primary": "Primary",
    "mobile": "Mobile",
    "openMenu": "Open menu",
    "services": "Services",
    "process": "Process",
    "technologies": "Technologies",
    "work": "Work",
    "about": "About",
    "faq": "FAQ",
    "contact": "Contact",
    "cta": "Book a consultation"
  },
  "footer": {
    "tagline": "Custom software and AI automation that reclaims the hours lost to repetitive work and cuts operating costs — delivered the way you choose to run it.",
    "groups": { "company": "Company", "services": "Services", "getStarted": "Get started" },
    "links": {
      "about": "About", "process": "Process", "work": "Work",
      "services": "Services", "technologies": "Technologies", "faq": "FAQ",
      "contact": "Contact", "book": "Book a consultation"
    },
    "socials": { "github": "AGility on GitHub", "linkedin": "AGility on LinkedIn" },
    "rights": "© {year} AGility. All rights reserved.",
    "caption": "Custom software & AI automation"
  }
}
```
Run `cp messages/en/common.json messages/bg/common.json`.

- [ ] **Step 2: Convert the nav (client component)**

Keep the structure; only the strings change. Import `useTranslations` from `next-intl`, and turn the link table into keys:

```tsx
const NAV_LINKS = [
  { key: "services", href: "/services" },
  { key: "process", href: "/process" },
  { key: "technologies", href: "/technologies" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "faq", href: "/faq" },
  { key: "contact", href: "/contact" },
] as const;

export function Nav() {
  const t = useTranslations("common");
  // …
  // aria-label="AGility — home"  →  aria-label={t("brand.homeLabel")}
  // aria-label="Primary"         →  aria-label={t("nav.primary")}
  // {link.label}                 →  {t(`nav.${link.key}`)}          (desktop and mobile lists)
  // "Book a consultation"        →  {t("nav.cta")}                  (both buttons)
  // aria-label="Open menu"       →  aria-label={t("nav.openMenu")}
  // aria-label="Mobile"          →  aria-label={t("nav.mobile")}
}
```
`activeHref` uses `link.href`, which is unchanged. Run `grep -n "sr-only\|aria-label" src/components/ui/sheet.tsx`; if it contains an English close label, add an optional `closeLabel` prop to `SheetContent`, add `"close": "Close"` under `common.nav`, and pass `closeLabel={t("nav.close")}` from the nav.

- [ ] **Step 3: Convert the footer (server component)**

Make it `async`, read `const t = await getTranslations("common")`, and key the link groups:

```tsx
const FOOTER_SECTIONS = [
  { id: "company", links: [{ key: "about", href: "/about" }, { key: "process", href: "/process" }, { key: "work", href: "/work" }] },
  { id: "services", links: [{ key: "services", href: "/services" }, { key: "technologies", href: "/technologies" }, { key: "faq", href: "/faq" }] },
  { id: "getStarted", links: [{ key: "contact", href: "/contact" }, { key: "book", href: "/book" }] },
] as const;
```
Render `t(`footer.groups.${section.id}`)`, `t(`footer.links.${link.key}`)`, the socials' `aria-label` from `t("footer.socials.github" | "footer.socials.linkedin")`, the tagline, `t("footer.rights", { year })`, and `t("footer.caption")`. The home link uses `aria-label={t("brand.homeLabel")}`.

- [ ] **Step 4: Provide the nav's messages from the layout**

In `src/app/[locale]/layout.tsx`: `import { ClientMessages } from "@/i18n/client-messages";` and render `<ClientMessages paths={["common"]}><Nav /></ClientMessages>`. Keep `<Footer />` as is (it is a server component now).

- [ ] **Step 5: Verify, then commit**

Apply rule R7: `snapshot` to `.snapshots/en-task5`, diff against `.snapshots/en-task4` — must print nothing; `pnpm i18n:check --areas common,metadata` exits 0. Commit `feat(i18n): extract site chrome copy into common catalog`.

### Task 6: Language switcher (EN | БГ)

**Files:**
- Create: `src/components/layout/language-switcher.tsx`
- Modify: `messages/en/common.json` + `messages/bg/common.json` (add `language`), `src/components/layout/nav.tsx`, `src/components/layout/footer.tsx`

**Interfaces:**
- Produces: `<LanguageSwitcher className? />` (client). Consumes `common.language.{label,en,bg}`.

- [ ] **Step 1: Add the catalog keys (both languages, identical — these are self-names)**

Add to `common` in `messages/en/common.json` and `messages/bg/common.json`:

```json
"language": { "label": "Language", "en": "English", "bg": "Български" }
```
(The Bulgarian file keeps the English label «Language» until Task 17 translates it to «Език»; `en`/`bg` are self-names and never change.)

- [ ] **Step 2: Write the component**

```tsx
// src/components/layout/language-switcher.tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn, focusRing } from "@/lib/utils";

const SHORT = { en: "EN", bg: "БГ" } as const;

/** EN | БГ — each link goes to the same page in the other language. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common.language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("flex items-center font-mono text-eyebrow uppercase", className)}
    >
      {routing.locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 ? (
            <span aria-hidden="true" className="px-1 text-border-hover">|</span>
          ) : null}
          <Link
            href={pathname}
            locale={locale}
            lang={locale}
            hrefLang={locale}
            aria-label={t(locale)}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              "rounded-sm px-1.5 py-2 transition-colors duration-[--duration-fast]",
              focusRing,
              locale === current
                ? "text-text-primary"
                : "text-text-muted hover:text-text-primary",
            )}
          >
            {SHORT[locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Place it**

- `nav.tsx`, right-hand group (`<div className="flex items-center gap-2">`): render `<LanguageSwitcher />` **first**, before the CTA button and the menu trigger — one instance, visible at every width (desktop: between nav and CTA; mobile: beside the menu button).
- `nav.tsx`, inside `SheetContent`, above the CTA in the bottom block: `<LanguageSwitcher className="mb-4" />`.
- `footer.tsx`, in the bottom row beside the caption: wrap with `<ClientMessages paths={["common.language"]}><LanguageSwitcher /></ClientMessages>`.

- [ ] **Step 4: Verify — the English diff is exactly the switcher, nothing else**

```bash
pnpm exec tsc --noEmit && pnpm lint && pnpm build
node scripts/snapshot-text.mjs --out .snapshots/en-task6
diff -ru .snapshots/en-task5 .snapshots/en-task6 | grep '^[+-]' | grep -v '^+++\|^---' | sort | uniq -c
```
Expected: only added (`+`) lines, each one of `EN|БГ`, `aria-label: English`, `aria-label: Български`, `aria-label: Language` (per page). Anything else is a regression. From here on `.snapshots/en-task6` is the clean baseline for R7.

- [ ] **Step 5: Commit**

`feat(i18n): add EN | БГ language switcher to header, mobile menu and footer`.

---

## Phase D — Extract the English copy, area by area

Each task below follows rules R1–R8. Namespace = the area name. "Client" marks components that need `<ClientMessages>`. When a component contains a visible string, an `aria-label`, an `sr-only` text, a `placeholder` or a `title`, it moves to the catalog — the snapshot diff will catch anything missed.

### Task 7: `home` area

**Files:**
- Create: `messages/en/home.json`, `messages/bg/home.json`, `src/lib/pricing.ts`
- Modify: `src/i18n/messages.ts`, `global.d.ts`, `src/app/[locale]/page.tsx`, and `src/components/home/`: `hero.tsx` (client), `system-diagram.tsx` (client), `problem.tsx`, `outcomes.tsx`, `services-preview.tsx`, `why-custom.tsx`, `process-preview.tsx` (client), `technology.tsx`, `why-agility.tsx`, `open-source.tsx`, `connect.tsx`, `pricing.tsx`, `faq-preview.tsx`, `teardown.tsx`, `closing-cta.tsx`

**Interfaces:**
- Produces: `PRICING` (`@/lib/pricing`); catalog namespaces `home.hero`, `home.systemDiagram`, `home.problem`, `home.outcomes`, `home.servicesPreview`, `home.whyCustom`, `home.processPreview`, `home.technology`, `home.whyAgility`, `home.openSource`, `home.connect`, `home.pricing`, `home.faqPreview`, `home.teardown` (incl. `subject` and `terms`), `home.closingCta`.

- [ ] **Step 1: Worked example — `hero` (client)**

`messages/en/home.json` (`hero` and the diagram labels; the other sections follow the same rules):

```json
{
  "hero": {
    "eyebrow": "Custom AI & automation",
    "headline": { "line1": "Your team is", "line2": "moving data", "accent": "by hand." },
    "lede": "Between the CRM, the inbox and the spreadsheet, someone is the connection — re-keying the same rows, chasing the same updates. I build the software that does that part instead, shaped around how your business actually runs, and delivered on terms you choose.",
    "primaryCta": "Get a free teardown",
    "secondaryCta": "See how I work",
    "reassurance": { "first": "No obligation", "second": "Honest answers either way" }
  },
  "systemDiagram": {
    "inputs": { "inbox": "Inbox", "documents": "Documents", "crmRecords": "CRM records", "spreadsheets": "Spreadsheets", "webForms": "Web forms" },
    "outputs": { "enquiries": "Enquiries answered", "data": "Data captured", "systems": "Systems in sync", "hours": "Hours returned" }
  }
}
```
Every other visible string in `system-diagram.tsx` (the system node, the column headings, the `figcaption`) is added to `systemDiagram` verbatim.

In `hero.tsx`:

```tsx
import { useTranslations } from "next-intl";
// inside Hero():
const t = useTranslations("home.hero");
// <p …>…Custom AI &amp; automation</p>         → {t("eyebrow")}
// <span className="block">Your team is</span>   → <span className="block">{t("headline.line1")}</span>  (line2, accent likewise)
// the lede paragraph                            → {t("lede")}
// "Get a free teardown" / "See how I work"      → {t("primaryCta")} / {t("secondaryCta")}
// "No obligation" … "Honest answers either way" → {t("reassurance.first")} … {t("reassurance.second")}
```
In `system-diagram.tsx` the `INPUTS`/`OUTPUTS` arrays become `{ id, key }` lists (ids `in-0…`, keys `inbox…`); labels are read with `t(`inputs.${key}`)` from `useTranslations("home.systemDiagram")`.

In `page.tsx` (`Home`): `const locale = await initLocale(params)` already runs; wrap the client sections:

```tsx
<ClientMessages paths={["home.hero", "home.systemDiagram"]}>
  <Hero />
</ClientMessages>
// …
<ClientMessages paths={["home.processPreview"]}>
  <ProcessPreview />
</ClientMessages>
```

- [ ] **Step 2: Prices come from one source**

```ts
// src/lib/pricing.ts
/** The published price bands (EUR). Pricing section and FAQ answer both read these. */
export const PRICING = {
  pilot: { low: 600, high: 900 },
  project: { low: 1800, high: 4500 },
  support: { low: 350, high: 800 },
} as const;
export type TierId = keyof typeof PRICING;
```
Catalog: `"price": "€{low, number}–{high, number}"` for each of `home.pricing.tiers.pilot|project|support`, rendered with `t(`tiers.${id}.price`, PRICING[id])` — English output stays `€600–900`, `€1,800–4,500`, `€350–800`.

- [ ] **Step 3: The remaining components (rules R1–R5)**

- `teardown.tsx`: `SUBJECT` → `t("subject")` (`"Teardown request"`); the three `TERMS` → `terms.<id>`; "Opens your email to {contactEmail}" → `"Opens your email to {email}"` with `t("opensEmail", { email: contactEmail })`; the curly quotes stay as “ ” in the JSON string.
- `why-custom.tsx`: the comparison table's rows/columns become id-keyed lists; the `<caption className="sr-only">` moves to `caption`.
- `faq-preview.tsx`: the six Q&As become `items.<id>.{q,a}`; its `Link` uses the locale-aware `Link` already.
- `pricing.tsx`, `process-preview.tsx`, `services-preview.tsx`, `outcomes.tsx`, `problem.tsx`, `technology.tsx`, `why-agility.tsx`, `open-source.tsx`, `connect.tsx`, `closing-cta.tsx`: every string, `aria-label`, `sr-only` text → catalog; list items get stable ids.
- The `<DeliveryModels index="06" />` call stays for now (Task 8 extracts it).

- [ ] **Step 4: Verify and commit (R6, R7, R8)**

Seed `bg/home.json`, add `"home"` to `AREAS` and `global.d.ts`. Snapshot `en-task7`, diff against `en-task6` must print nothing (the home route is the one that changes; all nine must still match). `pnpm i18n:check --areas home` exits 0. Capture the home accordions and run the accordion diff against `.snapshots/accordions-en-before-home.json`: `ACCORDIONS IDENTICAL (6 items)`.

### Task 8: `services` and `shared` (delivery models) areas

**Files:**
- Create: `messages/{en,bg}/services.json`, `messages/{en,bg}/shared.json`
- Modify: `src/i18n/messages.ts`, `global.d.ts`, `src/app/[locale]/services/page.tsx`, `src/components/services/{services-catalog,services-cta,why-custom-callout}.tsx`, `src/components/shared/delivery-models.tsx`, `src/app/[locale]/page.tsx` (only if its `DeliveryModels` call needs new props)

**Interfaces:**
- Produces: `shared.deliveryModels.{eyebrow,heading,intro,infrastructureLabel,runsLabel,footer,models.<id>.{name,tagline,body,owns,operates}}` with model ids `managed | clientOwned | hybrid`; `services.page.{eyebrow,title,subtitle}`, `services.delivery.{eyebrow,heading,intro}`, `services.catalog.groups.<id>.{name,blurb,services.<id>.{title,body}}` with group ids `automate | customers | systems | products` and their service ids in `as const` arrays.

- [ ] **Step 1: Extract `DeliveryModels` into `shared`**

The component becomes `async`, reads `getTranslations("shared.deliveryModels")`, and its prop defaults (`eyebrow`, `heading`, `intro`) are read from the catalog when the prop is absent — the home page passes none, the services page passes its own three strings from `services.delivery`. Model rows are id-keyed; labels `Infrastructure & accounts` / `Runs & maintains it` become `infrastructureLabel` / `runsLabel`. The closing paragraph uses one rich tag for the highlighted sentence:

```json
"footer": "In every model, the custom software I build for you is intended to be yours under the project agreement, and your data stays your data. What changes is who holds the infrastructure and who keeps it running. <em>Not sure which fits? I'll recommend a setup based on your technical team, security and compliance requirements, budget, and how much you want to manage yourself.</em>"
```
rendered with `t.rich("footer", { em: (chunks) => <span className="text-text-primary">{chunks}</span> })`. Preserve the single space that `{" "}` produced before the span.

- [ ] **Step 2: Extract the services page and catalog**

`PageHeader` props (`eyebrow`, `title`, `subtitle`) and `DeliveryModels` overrides come from `services.page` / `services.delivery`. In `services-catalog.tsx` the `Eyebrow>Group<` label becomes `services.catalog.groupLabel`; `key={group.id}` / `key={service.id}` replace English-text keys; the `id={`${group.id}-heading`}` values keep their **current English slug ids** (`automate-repetitive-work`, `talk-to-customers-at-scale`, `connect-your-systems`, `custom-products`) so anchors and the snapshot do not change — map them through a `SLUG` constant, separate from the catalog ids.

- [ ] **Step 3: Verify and commit (R6–R8)**

Seed both `bg` files, register `"services"` and `"shared"` in `AREAS` and `global.d.ts`. Snapshot `en-task8` vs `en-task7` — must print nothing (home and services both render `DeliveryModels`). `pnpm i18n:check --areas services,shared` exits 0.

### Task 9: `process` area

**Files:** create `messages/{en,bg}/process.json`; modify `src/app/[locale]/process/page.tsx`, `src/components/process/{process-steps,working-with-us,process-cta}.tsx`, `src/i18n/messages.ts`, `global.d.ts`.

- [ ] **Step 1: Extract**

`process.page.{eyebrow,title,subtitle}`; `process.steps.<id>.{title,lead,deliverable,transparency}` for ids `discovery | scoping | build | deploy | support` (ids in an `as const` array in code, replacing `key={step.title}`); `process.steps.{eyebrow,title,lede}` for the section heading; the two definition labels `What you walk away with` / `How you stay in the loop` → `process.steps.labels.{deliverable,transparency}`; the `Step 01` label becomes `"stepLabel": "Step {number}"` with `t("stepLabel", { number: String(i + 1).padStart(2, "0") })`. `working-with-us` and `process-cta` follow R1–R5 (list items by id; CTA strings by key).

- [ ] **Step 2: Verify and commit (R6–R8)** — snapshot `en-task9` vs `en-task8` prints nothing; `pnpm i18n:check --areas process` exits 0.

### Task 10: `technologies` area

**Files:** create `messages/{en,bg}/technologies.json`; modify `src/app/[locale]/technologies/page.tsx`, `src/components/technologies/{tech-stack,why-this-stack,technologies-cta}.tsx`, `src/i18n/messages.ts`, `global.d.ts`.

- [ ] **Step 1: Extract**

`technologies.page.*`; `technologies.stack.{eyebrow,title,lede}`; `technologies.stack.groups.<id>.{label,items.<itemId>}` for group ids `languages | frontend | backend | jobs | data | ai | infrastructure | integrations` and item ids taken from the tool name in camelCase (`typescript`, `nextjs`, `tailwindCss`, `retriesAndConcurrencyControls`, …). Tool and product names keep their exact English spelling in the catalog (they are the `keepLatin` allow-list); prose-like items (`Queues`, `Scheduled jobs`, `Retries & concurrency controls`, `Background workers`, `Third-party APIs`, `Email & messaging`, …) are ordinary strings to be translated later. `why-this-stack` contains curly quotes and follows R2.

- [ ] **Step 2: Verify and commit (R6–R8)** — snapshot `en-task10` vs `en-task9`; `pnpm i18n:check --areas technologies`.

### Task 11: `work` area

**Files:** create `messages/{en,bg}/work.json`; modify `src/app/[locale]/work/page.tsx`, `src/components/work/{selected-work,philosophy,engineering-practice,github-projects,work-cta}.tsx`, `src/i18n/messages.ts`, `global.d.ts`.

- [ ] **Step 1: Extract**

`work.selectedWork.builds.<id>.{name,label,body,linkLabel}` with ids `leadGenius | hackathon01 | hackathon02`; **the two `TODO:` bodies are copied verbatim** (they are translated 1:1 later, not invented). `href` values stay in code. The `sr-only` suffix ` — {name}` becomes `"linkSuffix": " — {name}"`. `engineering-practice` (six practices by id), `philosophy`, `github-projects` (`PROOF` points by id, heading, body, button label) and `work-cta` follow R1–R5.

- [ ] **Step 2: Verify and commit (R6–R8)** — snapshot `en-task11` vs `en-task10`; `pnpm i18n:check --areas work`.

### Task 12: `about` area

**Files:** create `messages/{en,bg}/about.json`; modify `src/app/[locale]/about/page.tsx`, `src/components/about/{mission,principles,how-we-build,who-we-serve,engineering-in-the-open,about-cta}.tsx`, `src/i18n/messages.ts`, `global.d.ts`.

- [ ] **Step 1: Extract**

`about.page.*`, one namespace per component (`mission`, `principles`, `howWeBuild`, `whoWeServe`, `engineeringInTheOpen`, `cta`); principle and audience lists by id. `mission.tsx` contains customer-voice sentences with curly quotes (`“automation.”`) and plural "we" — copy them exactly (R2). Section ids such as `how-we-build` and `who-we-serve` stay as they are in the markup.

- [ ] **Step 2: Verify and commit (R6–R8)** — snapshot `en-task12` vs `en-task11`; `pnpm i18n:check --areas about`.

### Task 13: `faq` area (largest page) and shared prices

**Files:** create `messages/{en,bg}/faq.json`; modify `src/app/[locale]/faq/page.tsx`, `src/components/faq/{faq-group,faq-cta}.tsx`, `src/components/home/faq-preview.tsx` (only for de-duplication), `src/i18n/messages.ts`, `global.d.ts`.

**Interfaces:**
- Produces: `faq.page.{eyebrow,title,subtitle}`, `faq.groups.<groupId>.{index?,eyebrow,heading,items.<itemId>.{q,a}}` where `a` is either one string or an object of paragraphs `{ p1, p2, … }`.

- [ ] **Step 1: Extract the FAQ page**

The page keeps its group arrays (`WORKING_TOGETHER`, `PRICING_TIMELINES`, …) as ordered lists of ids in code; each answer is built from the catalog. Paragraph answers render `p1…pN` in the existing `<div className="flex flex-col gap-4">` with `t.rich(...)`, using one shared tag map so every link stays a real, locale-aware link:

```tsx
const tags = {
  book: (chunks: React.ReactNode) => <Link href="/book" className={linkClass}>{chunks}</Link>,
  contact: (chunks: React.ReactNode) => <Link href="/contact" className={linkClass}>{chunks}</Link>,
  pricing: (chunks: React.ReactNode) => <Link href="/#pricing" className={linkClass}>{chunks}</Link>,
};
```
Source strings such as `"You can <book>book a consultation</book> or <contact>send me a message</contact> whenever you're ready."` (adjust tag names to the links that actually exist in each answer). Escaped quotes in the source (`\"this bit of our week is a mess\"`) become “ ” characters in the JSON.

- [ ] **Step 2: Prices in the pricing answer come from `PRICING`**

The "How does pricing work?" answer gets ICU arguments instead of literals:

```json
"p1": "The bands are published on the <pricing>home page</pricing>: a pilot is {pilot} at a fixed price, a full workflow project is {project} at a fixed price, and ongoing support runs {support} a month. Where a project lands inside a band depends on its scope."
```
with values produced by the same formatter the Pricing section uses:

```tsx
const price = await getTranslations("home.pricing");
const values = {
  pilot: price("tiers.pilot.price", PRICING.pilot),
  project: price("tiers.project.price", PRICING.project),
  support: price("tiers.support.price", PRICING.support),
};
// t.rich("groups.pricing.items.pricing.a.p1", { ...tags, ...values })
```

- [ ] **Step 3: De-duplicate identical copy with the home FAQ preview**

```bash
node -e 'const fs=require("fs");const seen={};for(const l of ["en"])for(const f of fs.readdirSync(`messages/${l}`)){const walk=(o,p)=>{for(const[k,v]of Object.entries(o)){const key=`${f.replace(".json","")}.${p}${k}`;typeof v==="string"?(v.length>=40&&(seen[v]??=[]).push(key)):walk(v,`${p}${k}.`)}};walk(JSON.parse(fs.readFileSync(`messages/${l}/${f}`,"utf8")),"")}for(const[v,ks]of Object.entries(seen))if(ks.length>1)console.log(ks.join("  =  "),"\n   ",v.slice(0,70))'
```
For every pair it prints, make the later component read the earlier key (and delete the duplicate entry). If it prints nothing, the copy is genuinely separate and nothing changes.

- [ ] **Step 4: Verify and commit (R6–R8)** — snapshot `en-task13` vs `en-task12` prints nothing **and** the accordion diff against `.snapshots/accordions-en-before-faq.json` prints `ACCORDIONS IDENTICAL (22 items)` (closed panels are not in the server HTML, so the text snapshot alone cannot see FAQ answers); `pnpm i18n:check --areas faq`.

### Task 14: `book` and `contact` areas (form, server action, locale-aware validation)

**Files:**
- Create: `messages/{en,bg}/book.json`, `messages/{en,bg}/contact.json`
- Modify: `src/app/[locale]/book/page.tsx`, `src/components/book/{booking-cta,expectations,preparation}.tsx`, `src/app/[locale]/contact/page.tsx`, `src/components/contact/{contact-form,contact-aside}.tsx`, `src/app/[locale]/contact/actions.ts`, `src/lib/contact-options.ts`, `src/i18n/messages.ts`, `global.d.ts`

**Interfaces:**
- Produces: `contact.errors.{name.required,name.tooLong,email.required,email.tooLong,email.invalid,company.tooLong,message.required,message.tooShort,message.tooLong,form}`; `contact.form.*` (labels, hints, placeholder, `required`, `optional`, `select`, `sending`, `send`, `honeypot`, `success.*`); `contact.form.workingModels.{unsure,managed,client-owned,hybrid,handoff}`.
- `submitContactForm(formData)` reads a hidden `locale` field; `WORKING_MODELS` keeps only `value`.

- [ ] **Step 1: Extract `book`** by R1–R5 (`book.page.*`, `book.bookingCta`, `book.expectations`, `book.preparation`, with the Calendly link left in code).

- [ ] **Step 2: Extract the contact form (client)**

`contact-form.tsx` reads `useTranslations("contact")` and is wrapped where it is rendered: `<ClientMessages paths={["contact"]}><ContactForm /></ClientMessages>`. The catalog values are the current strings verbatim, with numbers as ICU arguments:

```json
"errors": {
  "name": { "required": "Please enter your name.", "tooLong": "Please keep your name under {max, number} characters." },
  "email": { "required": "Please enter your email address.", "tooLong": "Please keep your email under {max, number} characters.", "invalid": "Please enter a valid email address." },
  "company": { "tooLong": "Please keep your company name under {max, number} characters." },
  "message": {
    "required": "Please tell me a little about what you need.",
    "tooShort": "Please add a little more detail so I can help — at least {min, number} characters.",
    "tooLong": "Please keep your message under {max, number} characters."
  },
  "form": "Please fix the highlighted fields and try again.",
  "send": "Something went wrong sending your message. Please try again, or email me directly."
}
```
(`{max, number}` prints `100`, `254` and `5,000` in English — identical to the current text.) The client `validate()` becomes `validate(values, t)` using these keys. The form adds `formData.set("locale", useLocale())`. `<option>` labels come from `contact.form.workingModels.<value>`; the placeholder, hints, `(required)`/`(optional)` text, the honeypot label and the success panel move to `contact.form.*`. The success panel's "Book a consultation" `Link` is the locale-aware one.

- [ ] **Step 3: Make the server action locale-aware, keep the email English**

```ts
// src/app/[locale]/contact/actions.ts (changes only)
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { WORKING_MODELS } from "@/lib/contact-options";

export async function submitContactForm(formData: FormData): Promise<ContactResult> {
  const raw = String(formData.get("locale") ?? "");
  const locale: Locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "contact.errors" });
  const enModels = await getTranslations({ locale: "en", namespace: "contact.form.workingModels" });
  // …honeypot and normalisation unchanged…
  const chosen = String(formData.get("workingModel") ?? "").trim();
  const workingModel = WORKING_MODELS.some((m) => m.value === chosen)
    ? enModels(chosen as (typeof WORKING_MODELS)[number]["value"])
    : null;
  // each fieldErrors.* uses t("name.required") … t("message.tooLong", { max: MAX_MESSAGE_LENGTH })
  // formError: t("form");  send failure: t("send")
  // email text lines (still English): add
  //   `Site language: ${locale === "bg" ? "Bulgarian" : "English"}`
  // directly after the Preferred working model line.
}
```
`src/lib/contact-options.ts` drops every `label` and `workingModelLabel`; it exports only `WORKING_MODELS` (values) and its type.

- [ ] **Step 4: Verify without sending mail, then commit (R6–R8)**

Snapshot `en-task14` vs `en-task13` prints nothing. Exercise **validation only** with `pnpm start` and the browser: submit the empty form at `/contact` and `/bg/contact`, confirm the inline errors render (English on both until translation) and that no request reaches Resend. Do **not** submit a valid message. `pnpm i18n:check --areas book,contact` exits 0.

---

## Phase E — Bulgarian typography and share image

### Task 15: Source Sans 3 for Bulgarian, Cyrillic-safe tokens, wordmark pinned

**Files:**
- Modify: `src/app/[locale]/layout.tsx`, `src/app/globals.css`, `src/components/layout/brand.tsx`

**Interfaces:**
- Produces: CSS variables `--face-display` / `--face-sans` (indirection over the next/font variables) and next/font variables `--font-source-sans`, `--font-jetbrains-mono-cyr`.

- [ ] **Step 1: Read the current font tokens**

Run: `grep -n "font-display\|font-sans\|font-mono\|@theme\|letter-spacing: 0.004em" src/app/globals.css` and read lines 60–75 and 225–240. Note whether the theme block is `@theme` or `@theme inline`; the indirection in Step 3 works for both.

- [ ] **Step 2: Load the Bulgarian faces (English pays nothing)**

In `src/app/[locale]/layout.tsx`:

```tsx
import { Archivo, Instrument_Sans, JetBrains_Mono, Source_Sans_3 } from "next/font/google";

// JetBrains Mono is split in two instances so English preloads only the Latin
// subset; the Cyrillic file is fetched only when Bulgarian text uses it.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});
const jetbrainsMonoCyrillic = JetBrains_Mono({
  variable: "--font-jetbrains-mono-cyr",
  subsets: ["cyrillic"],
  display: "swap",
  preload: false,
});

// Bulgarian-only family (Archivo and Instrument Sans have no Cyrillic). Nothing
// on English pages uses it, so browsers never fetch it there; preload is off so
// English pages do not hint it either. `wght` axis only, Latin + Cyrillic.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
});
```
Add `${jetbrainsMonoCyrillic.variable} ${sourceSans.variable}` to the `<html>` `className` (keep the existing three variables and classes).

- [ ] **Step 3: Indirect the faces and add the Bulgarian overrides in `globals.css`**

Point the theme's `--font-display` / `--font-sans` at two indirection variables, extend the mono stack, then override under `:lang(bg)`:

```css
/* Faces are indirected so Bulgarian pages can swap them: Archivo and Instrument
   Sans have no Cyrillic. The wordmark pins var(--font-archivo) directly. */
:root {
  --face-display: var(--font-archivo);
  --face-sans: var(--font-instrument-sans);
}
html:lang(bg) {
  --face-display: var(--font-source-sans);
  --face-sans: var(--font-source-sans);

  /* Display tokens were tuned for Latin. Cyrillic has many vertical stems and
     taller marks («Й» breve, tails on «Щ Ц Д»), so it needs air. Final values
     are tuned against the «Щ Й Ц Д» stress heading (Task 27). */
  --text-display--letter-spacing: -0.025em;
  --text-display--line-height: 1.02;
  --text-h1--letter-spacing: -0.02em;
  --text-h1--line-height: 1.06;
  --text-h2--letter-spacing: -0.016em;
  --text-h2--line-height: 1.12;
  --text-h3--letter-spacing: -0.008em;
}
/* The 0.004em body tracking was chosen for Instrument Sans. */
html:lang(bg) body { letter-spacing: 0; }
/* Safety net for long Bulgarian words on narrow screens; no auto-hyphenation. */
html:lang(bg) :is(h1, h2, h3, h4) { overflow-wrap: break-word; }
```
and in the theme block: `--font-display: var(--face-display), ui-sans-serif, system-ui, sans-serif;`, `--font-sans: var(--face-sans), ui-sans-serif, system-ui, sans-serif;`, `--font-mono: var(--font-jetbrains-mono), var(--font-jetbrains-mono-cyr), ui-monospace, SFMono-Regular, monospace;`.

- [ ] **Step 4: Pin the wordmark to Archivo in both languages**

In `brand.tsx`, on the text `<span>` of `Wordmark`, remove the `font-display` class and add `style={{ fontFamily: "var(--font-archivo), ui-sans-serif, system-ui, sans-serif" }}`, keeping every other class.

- [ ] **Step 5: Verify fonts, tokens and English purity**

```bash
pnpm exec tsc --noEmit && pnpm lint && pnpm build
(pnpm start > /tmp/start.log 2>&1 &) ; sleep 6
curl -s http://localhost:3000/ | grep -o '<link rel="preload"[^>]*as="font"' | wc -l
```
Expected: `3` (Archivo, Instrument Sans, JetBrains Mono Latin — the same three as before). Then in the browser (Playwright) load `http://localhost:3000/` and `http://localhost:3000/bg` and evaluate:

```js
() => ({
  h1Font: getComputedStyle(document.querySelector("h1")).fontFamily.slice(0, 60),
  h1Tracking: getComputedStyle(document.querySelector("h1")).letterSpacing,
  wordmark: getComputedStyle(document.querySelector("header a span span:last-child")).fontFamily.slice(0, 40),
  fontFiles: performance.getEntriesByType("resource").filter(r => /\.woff2/.test(r.name)).length,
})
```
Expected on `/`: Archivo, the original tracking, **3** font files (no Source Sans). Expected on `/bg`: Source Sans 3 in `h1Font`, tracking ≈ −2px at 1280px wide, the wordmark still Archivo, and the extra Source Sans (Latin/Cyrillic) files present. If `h1Tracking` did not change, the theme block is `@theme inline`; move the four `--text-*` overrides onto the utility level (`html:lang(bg) .text-display { letter-spacing: … }` etc.) and re-check. Stop the server. Snapshot `en-task15` vs `en-task6`/`task14` must print nothing.

- [ ] **Step 6: Commit** — `feat(i18n): Source Sans 3 and Cyrillic-safe tokens for Bulgarian pages`.

---

## Phase F — Bulgarian copy

### Bulgarian review checklist (used in Step 4 of every translation task)

1. **Faithful:** every claim, number, hedge and condition in the English is present, and nothing is added (e.g. "intended to be yours under the project agreement" keeps its hedge).
2. **Register:** polite lowercase «вие / ви / ваш»; no «ти», no capital «Вие».
3. **Voice:** first-person singular, pronoun dropped unless contrast needs it; **no gendered first-person forms** (no «-ъл/-ла» participles or «готов/готова» pairs) — including in strings the *visitor* speaks (e.g. the form's «Не знам – препоръчайте ми» instead of a gendered «Не съм сигурен»).
4. **Glossary:** every concept uses the frozen term (see `messages/glossary.json`); the same concept is never worded two ways on the site.
5. **Natural Bulgarian:** reads like a Bulgarian business wrote it — no calques («работен поток», «на ръка» used literally where a native would say otherwise), no word-for-word order.
6. **Typography:** „…“ quotes, spaced en dash « – », no em dash, decimal comma, NBSP before `€`, sentence-case headings.
7. **Length:** hero headline lines ≤ ~13 characters; button/CTA labels short (≈ ≤ 24 characters); eyebrows short.
8. **Untouched tokens:** placeholders (`{year}`, `{low, number}`), rich tags (`<book>…</book>`), brand and tech names are byte-identical to the English.

### Task 16: Translate `common` and `metadata`

**Files:** modify `messages/bg/common.json`, `messages/bg/metadata.json`.

- [ ] **Step 1: Read** `messages/en/common.json` and `messages/en/metadata.json` in full.
- [ ] **Step 2: Write the Bulgarian files** with identical keys. Frozen values: nav — Услуги, Процес, Технологии, Проекти, За мен, Въпроси, Контакти; `nav.cta` — «Запазете консултация»; `language.label` — «Език»; `language.en` / `language.bg` stay «English» / «Български»; `footer.rights` — «© {year} AGility. Всички права запазени.»; `skipToContent` — «Към съдържанието». Titles ≤ ~60 characters and descriptions ≤ ~160 where the English already is; `metadata.og.eyebrow/tagline/caption` are short (they are set in uppercase mono/large type in the image).
- [ ] **Step 3: Check:** `pnpm i18n:check --areas common,metadata --strict` exits 0.
- [ ] **Step 4: Review** against checklist items 1–8.
- [ ] **Step 5: Spot-check and commit:** `pnpm build`, open `/bg` and `/bg/services` in the browser (nav, footer, `<title>`); commit `feat(i18n): Bulgarian copy for site chrome and metadata`.

### Task 17: Bulgarian share image

**Files:**
- Create: `assets/fonts/SourceSans3-SemiBold.ttf`, `assets/fonts/SourceSans3-Bold.ttf`
- Modify: `src/lib/og-image.tsx`, `src/app/og/[locale]/route.tsx`

**Interfaces:**
- Produces: `renderSocialImage(locale: Locale): Promise<ImageResponse>` (strings from `metadata.og.*`; Bulgarian bundles Source Sans 3).

- [ ] **Step 1: Generate static, subset TTFs** (Satori reads static TTF/OTF/WOFF, not woff2 or variable files)

```bash
python -m pip install --quiet --target /tmp/pylib fonttools
curl -sfL -o /tmp/SourceSans3.ttf "https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf"
mkdir -p assets/fonts
for w in 600:SemiBold 700:Bold; do
  PYTHONPATH=/tmp/pylib python -m fontTools.varLib.instancer /tmp/SourceSans3.ttf wght=${w%%:*} -o /tmp/ss3-${w##*:}.ttf
  PYTHONPATH=/tmp/pylib python -m fontTools.subset /tmp/ss3-${w##*:}.ttf --unicodes="U+0020-007E,U+00A0-00FF,U+0400-045F,U+2010-2027,U+2030-203A,U+20AC" --output-file=assets/fonts/SourceSans3-${w##*:}.ttf
done
ls -l assets/fonts
```
Expected: two files, each well under 100 KB.

- [ ] **Step 2: Make the image locale-aware**

In `src/lib/og-image.tsx`: keep the tokens, `size` and layout exactly; change the function to

```tsx
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

const font = (file: string) => readFile(join(process.cwd(), "assets", "fonts", file));

export async function renderSocialImage(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "metadata.og" });
  const bg = locale === "bg";
  const fonts = bg
    ? [
        { name: "Source Sans 3", data: await font("SourceSans3-SemiBold.ttf"), weight: 600 as const, style: "normal" as const },
        { name: "Source Sans 3", data: await font("SourceSans3-Bold.ttf"), weight: 700 as const, style: "normal" as const },
      ]
    : undefined;
  return new ImageResponse(
    (/* same JSX as today, with: fontFamily: bg ? "Source Sans 3" : "sans-serif",
        the eyebrow text → {t("eyebrow")}, the tagline → {t("tagline")}, the caption → {t("caption")} */),
    { ...size, fonts },
  );
}
```
Remove the old `alt` export (the alt text now comes from `metadata.og.alt` in `routeMetadata`). In `route.tsx` call `renderSocialImage(locale)`.

- [ ] **Step 3: Verify Cyrillic renders**

```bash
pnpm build
(pnpm start > /tmp/start.log 2>&1 &) ; sleep 6
curl -s -o /tmp/og-bg.png -w "%{http_code} %{content_type}\n" http://localhost:3000/og/bg
curl -s -o /tmp/og-en.png -w "%{http_code} %{content_type}\n" http://localhost:3000/og/en
powershell.exe -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force }"
```
Expected: `200 image/png` twice. Open `/tmp/og-bg.png` (Read tool) and confirm real Cyrillic letters, no empty boxes, nothing clipped; open `/tmp/og-en.png` and confirm it matches the previous English card. If Satori shows boxes, the subset range or the weight mapping is wrong — fix before continuing.

- [ ] **Step 4: Commit** — `feat(i18n): Bulgarian share image with bundled Source Sans 3`.

### Task 18: Translate `home`

**Files:** modify `messages/bg/home.json`.

- [ ] **Step 1: Read** `messages/en/home.json` in full (hero, systemDiagram, problem, outcomes, servicesPreview, whyCustom, processPreview, technology, whyAgility, openSource, connect, pricing, faqPreview, teardown, closingCta).
- [ ] **Step 2: Write** the Bulgarian file with identical keys. Fixed points: `hero.primaryCta` = «Безплатен видеоанализ», `hero.secondaryCta` = «Вижте как работя»; the three headline keys are ≤ ~13 characters each (a working set from review: «Екипът ви» / «пренася данни» / «на ръка.» — verified at 1280/1440px in Task 27); `pricing.tiers.<id>.price` = `"{low, number}–{high, number} €"` with a **non-breaking space (U+00A0)** before `€`; tier names «Пилотен проект», «Цялостен проект за работен процес», «Текуща поддръжка»; `pricing` basis «Фиксирана цена» / «На месец»; `teardown.subject` = «Заявка за видеоанализ» and the eyebrow/CTA use «Безплатен видеоанализ» — the offer is called **видеоанализ** everywhere, the recorded 5-minute screen review, keeping the "sometimes the honest answer is buy an existing tool" admission and the "three a week" cap; diagram chips use the glossary terms even if longer (shorten the surrounding words, never swap the term).
- [ ] **Step 3: Check** `pnpm i18n:check --areas home --strict` exits 0.
- [ ] **Step 4: Review** against checklist items 1–8 plus: no line in `hero.headline.*` above ~13 characters; the FAQ-preview answers keep every hedge.
- [ ] **Step 5: Spot-check and commit:** `pnpm build`; view `/bg` at 1440px and 375px; commit `feat(i18n): Bulgarian copy for the home page`.

### Task 19: Translate `services` and `shared`

**Files:** modify `messages/bg/services.json`, `messages/bg/shared.json`.

- [ ] **Step 1: Read** both English files.
- [ ] **Step 2: Write** the Bulgarian files with identical keys. Fixed points: delivery-model names «Пълно управление» / «Във ваша собственост» / «Хибриден модел» and the term «модел на предоставяне» wherever the English says "delivery model" **or** "operating model"; «инфраструктура и акаунти» for the infrastructure label; «AGility» stays in the third person in the `owns` / `operates` cells exactly where the English uses it; ownership stays hedged ("intended to be yours under the project agreement" → a «по договора за проекта» formulation that keeps "intended to"); service titles use the glossary («AI асистенти», «CRM интеграции», «API интеграции», «табла»).
- [ ] **Step 3: Check** `pnpm i18n:check --areas services,shared --strict`.
- [ ] **Step 4: Review** checklist 1–8 plus: the three models are worded in parallel; the `footer` rich tag `<em>…</em>` wraps the same sentence as in English.
- [ ] **Step 5: Spot-check and commit:** view `/bg/services` and the home delivery section; commit `feat(i18n): Bulgarian copy for services and delivery models`.

### Task 20: Translate `process`

**Files:** modify `messages/bg/process.json`.

- [ ] **Step 1: Read** `messages/en/process.json`.
- [ ] **Step 2: Write** it. Fixed step titles: **Проучване**, **Обхват и проектиране**, **Разработка**, **Внедряване**, **Поддръжка и развитие**; `stepLabel` = «Стъпка {number}»; «оферта» for proposal and «обхват» for scope in the prose; «модел на предоставяне» for the operating model.
- [ ] **Step 3: Check** `pnpm i18n:check --areas process --strict`.
- [ ] **Step 4: Review** checklist 1–8.
- [ ] **Step 5: Spot-check and commit:** view `/bg/process`; commit `feat(i18n): Bulgarian copy for the process page`.

### Task 21: Translate `technologies`

**Files:** modify `messages/bg/technologies.json`.

- [ ] **Step 1: Read** `messages/en/technologies.json`.
- [ ] **Step 2: Write** it. Tool and product names stay exactly as in English (TypeScript, Next.js, Trigger.dev, PostgreSQL, …). Translate the category labels and prose-like items («Опашки», «Планирани задачи», «Повторни опити и контрол на паралелността», …); keep «Frontend» and «Backend» in Latin as written by Bulgarian professionals; «технологичен стек» for stack; `why-this-stack` uses „…“ quotes.
- [ ] **Step 3: Check** `pnpm i18n:check --areas technologies --strict`.
- [ ] **Step 4: Review** checklist 1–8.
- [ ] **Step 5: Spot-check and commit:** view `/bg/technologies`; commit `feat(i18n): Bulgarian copy for the technologies page`.

### Task 22: Translate `work`

**Files:** modify `messages/bg/work.json`.

- [ ] **Step 1: Read** `messages/en/work.json`.
- [ ] **Step 2: Write** it. The two `TODO:` card bodies are translated **1:1** (keep the literal token `TODO:`, translate the words after it) — do not invent what the builds were. «GitHub» and «LeadGenius» stay Latin; «хранилище с код» for repository; «история на промените» for commit history; «ревю на кода» for code review; the card labels keep "not client work" prominent («…– не е клиентска работа»).
- [ ] **Step 3: Check** `pnpm i18n:check --areas work --strict`.
- [ ] **Step 4: Review** checklist 1–8.
- [ ] **Step 5: Spot-check and commit:** view `/bg/work`; commit `feat(i18n): Bulgarian copy for the work page`.

### Task 23: Translate `about`

**Files:** modify `messages/bg/about.json`.

- [ ] **Step 1: Read** `messages/en/about.json`.
- [ ] **Step 2: Write** it. Keep the truth that AGility is one person ("one person with a simple belief"); the customer-voice sentences in `mission` («we're wasting hours…») are plural «ние» forms and use „…“ around «автоматизация»; no gendered first-person forms in the owner's voice.
- [ ] **Step 3: Check** `pnpm i18n:check --areas about --strict`.
- [ ] **Step 4: Review** checklist 1–8.
- [ ] **Step 5: Spot-check and commit:** view `/bg/about`; commit `feat(i18n): Bulgarian copy for the about page`.

### Task 24: Translate `faq`

**Files:** modify `messages/bg/faq.json`.

- [ ] **Step 1: Read** `messages/en/faq.json` (≈2.6k words) group by group.
- [ ] **Step 2: Write** it group by group, committing nothing until the check passes. Visitor-voice questions use the plural «ние» («Не разбираме от технологии – проблем ли е?»); answers keep every hedge, condition and number; the pricing answer keeps its `{pilot}` `{project}` `{support}` arguments and the `<pricing>` tag; product/vendor names (OpenAI, Anthropic, Trigger.dev, AWS) stay Latin; «оферта», «Проучване», «модел на предоставяне», «Внедряване» exactly as frozen.
- [ ] **Step 3: Check** `pnpm i18n:check --areas faq --strict`.
- [ ] **Step 4: Review** checklist 1–8 — this is the longest page, so re-read every answer once for glossary drift (the same term worded two ways) before moving on.
- [ ] **Step 5: Spot-check and commit:** open every accordion group on `/bg/faq`, confirm the three inline links land on `/bg/book`, `/bg/contact`, `/bg#pricing`; commit `feat(i18n): Bulgarian copy for the FAQ`.

### Task 25: Translate `book` and `contact`

**Files:** modify `messages/bg/book.json`, `messages/bg/contact.json`.

- [ ] **Step 1: Read** both English files.
- [ ] **Step 2: Write** them. Form: `required` sr-only text «(задължително)», `optional` «(по избор)»; validation messages keep `{max, number}` / `{min, number}`; the working-model options use the frozen models («Пълно управление от AGility», «Инфраструктура във ваша собственост», «Хибриден модел – …», «Еднократно предаване») and the "not sure" option is worded **without a gendered form** («Нямам предпочитание – препоръчайте ми»); the honeypot label is translated (it is `aria-hidden`); buttons stay short («Изпратете съобщение», «Запазете консултация»).
- [ ] **Step 3: Check** `pnpm i18n:check --areas book,contact --strict`.
- [ ] **Step 4: Review** checklist 1–8.
- [ ] **Step 5: Verify the form without sending mail and commit:** on `/bg/contact` submit the **empty** form and confirm every error is Bulgarian and focus moves to the first invalid field; do **not** submit a valid message. Commit `feat(i18n): Bulgarian copy for book and contact`.

---

## Phase G — Enforcement, verification and rollout

### Task 26: Enforce the checks in the build and document the workflow

**Files:**
- Modify: `package.json`, `README.md`

- [ ] **Step 1: Make drift impossible to ship**

In `package.json` set `"build": "node scripts/i18n-check.mjs --strict && next build"` (an explicit chain, not a `prebuild` hook, so it runs under any pnpm version and on Vercel). Keep `"i18n:check"` and `"test:i18n"`.

- [ ] **Step 2: Prove the gate works (and then undo the damage)**

```bash
pnpm i18n:check --strict && echo "CLEAN"
sed -i '0,/"Услуги"/s//"Работа"/' messages/bg/common.json
pnpm build 2>&1 | grep -E "KEY_RULE|FAILED" | head -3
git checkout -- messages/bg/common.json
```
Expected: `CLEAN`; the tampered nav label stops the build with a `KEY_RULE` error; the checkout restores the file.

- [ ] **Step 3: Document it**

Add a "Languages" section to `README.md` covering: URLs (`/` English, `/bg` Bulgarian), catalogs in `messages/{en,bg}/`, `pnpm i18n:check` (rules and the glossary), how to add or change copy (edit `en`, then `bg`; the build fails on drift), the fixed Bulgarian typography (`:lang(bg)` in `globals.css`, Source Sans 3), that the notification email stays English, and that `/og/<locale>` are the share images. Update the "Project structure" list with `src/i18n`, `messages`, `scripts`.

- [ ] **Step 4: Commit** — `feat(i18n): fail the build on catalog drift and document the workflow`.

### Task 27: Full verification (nothing is claimed until this passes)

**Files:**
- Create: `scripts/layout-audit.html`
- Temporary (never committed): `public/__layout-audit.html`

- [ ] **Step 1: Static checks and build**

```bash
pnpm test:i18n && pnpm lint && pnpm exec tsc --noEmit && pnpm build
```
Expected: 15 tests pass; lint and types clean; the build prints the strict `i18n:check ok (0 errors, 0 warnings)` line and lists 18 prerendered pages plus `/og/en` and `/og/bg`.

- [ ] **Step 2: English is text-identical (except the switcher)**

```bash
node scripts/snapshot-text.mjs --out .snapshots/en-final
diff -ru .snapshots/en-task6 .snapshots/en-final && echo "ENGLISH IDENTICAL"
```
Expected: `ENGLISH IDENTICAL` (`en-task6` is the baseline that already contains the switcher). Then capture the accordions on `/faq` and `/` in the browser and run the accordion diff against both `en-before` captures: `ACCORDIONS IDENTICAL (22 items)` and `(6 items)`.

- [ ] **Step 3: Bulgarian leftovers scan**

```bash
node scripts/snapshot-text.mjs --out .snapshots/bg-final --locale bg
grep -nE "[A-Za-z]{4,} [a-z]{3,} [a-z]{3,}" .snapshots/bg-final/*.txt | grep -v "^.*lang:\|canonical:" | head -30
```
Review each hit: brand/tech names are fine; any English sentence fragment is a missed string — fix the catalog and re-run.

- [ ] **Step 4: SEO output on both locales**

With `pnpm start` running:

```bash
for p in "" /services /faq; do
  echo "== /bg$p"; curl -s "http://localhost:3000/bg$p" | grep -io '<html[^>]*lang="[a-z]*"\|<link rel="canonical"[^>]*>\|rel="alternate" hrefLang="[^"]*"[^>]*\|property="og:locale" content="[^"]*"\|property="og:image" content="[^"]*"'
done
curl -s http://localhost:3000/sitemap.xml | grep -c "<loc>"
curl -s http://localhost:3000/robots.txt | head -5
```
Expected: `lang="bg"`; canonical `…/bg…`; alternates for `en`, `bg`, `x-default`; `og:locale` `bg_BG`; `og:image` ends `/og/bg`; sitemap `18`; `robots.txt` still lists the sitemap.

- [ ] **Step 5: Layout audit harness**

```html
<!-- scripts/layout-audit.html — copied to public/__layout-audit.html while auditing -->
<!doctype html>
<meta charset="utf-8" />
<title>layout audit</title>
<body>
<script>
const PATHS = ["", "/services", "/process", "/technologies", "/work", "/about", "/faq", "/book", "/contact"];
const LABEL = (el) => `${el.tagName.toLowerCase()} "${(el.textContent || "").trim().slice(0, 40)}"`;
const TEXT = "a, button, h1, h2, h3, h4, dt, dd, li, p, label";

function inScroller(el, win) {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const o = win.getComputedStyle(p).overflowX;
    if (o === "auto" || o === "scroll") return true;
  }
  return false;
}

function audit(doc, win) {
  const issues = [];
  if (doc.documentElement.scrollWidth > win.innerWidth + 1) {
    issues.push(`page scrolls horizontally: ${doc.documentElement.scrollWidth} > ${win.innerWidth}`);
  }
  for (const el of doc.querySelectorAll(TEXT)) {
    const r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) continue;
    const cs = win.getComputedStyle(el);
    if (cs.position === "fixed" || inScroller(el, win)) continue;
    if (r.right > win.innerWidth + 1) issues.push(`past viewport: ${LABEL(el)} (right ${Math.round(r.right)})`);
    const clips = ["hidden", "clip"].includes(cs.overflowX);
    if (clips && el.scrollWidth > el.clientWidth + 1) issues.push(`clipped text: ${LABEL(el)} (${el.scrollWidth} > ${el.clientWidth})`);
  }
  return [...new Set(issues)];
}

// One locale × one width per call (about 10 s), returning only the failures.
window.__audit = async (prefix, width) => {
  const out = [];
  for (const p of PATHS) {
    const url = `${prefix}${p}` || "/";
    const frame = document.createElement("iframe");
    frame.style.cssText = `width:${width}px;height:900px;border:0;position:absolute;left:0;top:0;visibility:hidden`;
    frame.src = url;
    document.body.appendChild(frame);
    await new Promise((res) => frame.addEventListener("load", res, { once: true }));
    await frame.contentWindow.document.fonts.ready;
    await new Promise((r) => setTimeout(r, 400));
    const issues = audit(frame.contentDocument, frame.contentWindow);
    if (issues.length) out.push({ url, width, issues });
    frame.remove();
  }
  return out;
};
</script>
</body>
```

- [ ] **Step 6: Run the audit in both languages at five widths**

```bash
cp scripts/layout-audit.html public/__layout-audit.html
pnpm build && (pnpm start > /tmp/start.log 2>&1 &) ; sleep 6
```
In the browser (Playwright): navigate to `http://localhost:3000/__layout-audit.html`, then for each prefix in `""` and `"/bg"` and each width in `320, 375, 768, 1024, 1440`, evaluate `() => window.__audit("<prefix>", <width>)`. Expected: `[]` every time. **English must already be `[]`** (a non-empty English result is a harness false positive — fix the harness, not the site); every Bulgarian finding is a real layout defect — fix it (shorten the string in the catalog, or adjust the Bulgarian token overrides / nav breakpoint) and re-run. Known hot spots to look at first: hero headline lines, `whitespace-nowrap` buttons, the desktop nav at 1024px, the hero diagram chips, the `why-custom` comparison table.

- [ ] **Step 7: Stress heading and visual review**

On `/bg` in the browser, inject a heading at each size and screenshot it:

```js
() => {
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;inset:0;background:#0b0a09;z-index:99999;padding:24px;overflow:auto";
  for (const cls of ["text-display", "text-h1", "text-h2", "text-h3"]) {
    const h = document.createElement("div");
    h.className = `${cls} font-semibold text-text-primary`;
    h.style.cssText = "max-width:9ch;margin-bottom:16px";
    h.textContent = "Щедро Йерархично Цялостно Дебело Щастие";
    wrap.appendChild(h);
  }
  document.body.appendChild(wrap);
}
```
Confirm the tails of «Щ Ц Д» never touch the breve of «Й» in the line below at any size; loosen the `html:lang(bg)` leading/tracking overrides if they do. Then screenshot and look at `/bg`, `/bg/services`, `/bg/faq`, `/bg/contact` at 1440px and 375px, and `/` at 1440px for a final English comparison.

- [ ] **Step 8: Runtime font check**

Evaluate on `/` and on `/bg`: `() => performance.getEntriesByType("resource").filter(r => /\.woff2/.test(r.name)).map(r => r.name.split("/").pop())`. Expected: `/` loads exactly the same three woff2 files as before Task 15; `/bg` additionally loads the Source Sans 3 files. English must not fetch any Bulgarian font.

- [ ] **Step 9: Clean up and commit the harness only**

```bash
rm public/__layout-audit.html
powershell.exe -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id \$_.OwningProcess -Force }"
git status --short   # only scripts/layout-audit.html (and any string fixes) should appear
git add scripts/layout-audit.html messages
git commit -m "test(i18n): add the in-page layout audit and fix findings from the Bulgarian pass"
```

### Task 28: Preview deploy (no production change)

- [ ] **Step 1: Push the branch** (the owner approved a preview push; `main` is not touched)

```bash
git push -u origin feat/bulgarian-i18n
```

- [ ] **Step 2: Find the preview build and confirm it is ready**

Load the Vercel tools (`ToolSearch` → `select:mcp__plugin_vercel_vercel__list_deployments,mcp__plugin_vercel_vercel__get_deployment,mcp__plugin_vercel_vercel__web_fetch_vercel_url`), read `.vercel/project.json` for `projectId` and `orgId`, list deployments for that project, and pick the one whose git ref is `feat/bulgarian-i18n`. Expected: state `READY` and target `preview` (not `production`). If it failed, read the build log, fix on the branch, push again.

- [ ] **Step 3: Smoke-test the preview** (preview URLs are SSO-protected — use the authenticated fetch tool)

Fetch `/`, `/bg`, `/bg/faq`, `/sitemap.xml` and `/og/bg`. Expected: 200s; `/bg` has `lang="bg"` and Bulgarian text; sitemap lists 18 URLs.

- [ ] **Step 4: Hand over to the owner**

Report the preview URL, what changed (18 pages, switcher, Bulgarian copy, share image), the checks that passed, and anything not verified (notably: the successful contact submit, which sends real mail, and real-device rendering). Ask the owner to skim the Bulgarian on the preview. **Stop here until the owner replies.**

### Task 29: Production (only after an explicit owner "go")

- [ ] **Step 1: Confirm the go** — do nothing on `main` unless the owner has said to ship. If they list Bulgarian changes, make them on the branch, re-run Task 27 steps 1–3, push, and re-check the preview first.

- [ ] **Step 2: Merge and push**

```bash
git switch main
git merge --no-ff feat/bulgarian-i18n -m "feat: Bulgarian localisation (EN + BG)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
git push origin main
```
(Pushing `main` is the production deploy through the GitHub → Vercel integration.)

- [ ] **Step 3: Verify production**

Find the production deployment for the merge commit, confirm `READY` and target `production`, then fetch `https://agility-scaffold-tmp.vercel.app/` (English unchanged), `/bg`, `/bg/faq`, `/sitemap.xml` (18 URLs), `/robots.txt` and `/og/bg`. Report the result plainly, including anything that did not verify.

---

## Self-review against the spec

| Spec section | Where it is implemented |
|---|---|
| §2 next-intl, `[locale]`, `as-needed`, proxy, no detection | Task 3 |
| §2 locale-aware links, switcher (header/mobile menu/footer, a11y) | Tasks 3, 6 |
| §2 canonical, hreflang, `x-default`, `og:locale`, JSON-LD `inLanguage`, sitemap (18) | Task 4 |
| §2 Bulgarian share image with bundled static font | Tasks 3, 17 |
| §2 contact form: locale-aware messages, English email + language line, localised `mailto` subject | Tasks 14, 18 (`home.teardown.subject`) |
| §3 catalogs per area, id-keyed lists, scoped client messages, rich text, hero lines, prices from one source, never-translated set, de-duplication | Rules R1–R8, Tasks 3, 5, 7–14 |
| §4 glossary, style rules, `avoid` list, `i18n:check` (6 rule groups), runs in build | Tasks 2, 26; Phase F checklist; Tasks 16, 18–25 |
| §5 Source Sans 3, `:lang(bg)` tokens, JetBrains Mono Cyrillic, wordmark pinned, English pays nothing, overflow-wrap | Task 15 (verified in Task 27 steps 7–8) |
| §5 layout hot spots and stress heading | Task 27 steps 6–7 |
| §6 English snapshot proof, checks, audit, SEO output, contact validation only, self-review + owner reading | Tasks 1, 5–14 (R7), 25, 27, 28 |
| §7 branch, preview, production only on go | Tasks 28, 29 |
| §8 `/work` TODO cards 1:1; next-intl/Next 16 specifics; preload; nav at 1024px; Satori font | Tasks 11, 22; 3; 15 and 27; 27 step 6; 17 step 3 |

Placeholder scan: the only ellipses are the `…` markers in Task 4 Step 1 (which stand for strings that already exist in the pages and are copied verbatim) and the "same JSX as today" note in Task 17 Step 2 (an unchanged block). Type consistency: `Locale`, `RouteKey`, `initLocale`, `ClientMessages`, `pickMessages`, `renderSocialImage(locale)`, `PRICING`/`TierId`, `checkMessages` and the catalog keys named in later tasks match their definitions in Tasks 2–4, 7 and 14.
