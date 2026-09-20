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
