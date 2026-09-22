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
  identicalKeys: ["common.language.bg"],
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
    { home: { a: "Платете", b: "<contact>текст</contact>" } },
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

test("seeded English copies are reported as untranslated, not as glossary or typography errors", () => {
  const en = { home: { a: "Fast — and simple", b: "Free work", c: 'He said "hi"' } };
  const loose = run(en, en);
  assert.deepEqual(loose.errors, []);
  assert.equal(loose.warnings[0].code, "UNTRANSLATED");
  assert.deepEqual(codes(run(en, en, { strict: true })), ["UNTRANSLATED", "UNTRANSLATED", "UNTRANSLATED"]);
});

test("pinned key rules only apply once the string is translated", () => {
  const en = { common: { nav: { work: "Work" } } };
  assert.deepEqual(run(en, en).errors, []);
  assert.deepEqual(codes(run(en, en, { strict: true })), ["UNTRANSLATED"]);
});

test("keys that are identical by design are neither untranslated nor allowed to change", () => {
  const en = { common: { language: { bg: "Български" } } };
  assert.deepEqual(run(en, en, { strict: true }).errors, []);
  const translated = { common: { language: { bg: "Bulgarian" } } };
  assert.deepEqual(codes(run(en, translated, { strict: true })), ["MUST_MATCH"]);
});

test("first-person past participles that reveal gender are errors; present and future are fine", () => {
  const en = { home: { a: "I built it", b: "I would build it", c: "I build it", d: "I will build it" } };
  const bg = { home: { a: "Съм изградил това", b: "Бих изградила това", c: "Изграждам това", d: "Ще го изградя" } };
  assert.deepEqual(codes(run(en, bg)), ["GENDERED_FORM", "GENDERED_FORM"]);
});

test("an English word left in a Bulgarian sentence is an error; kept names and tokens are fine", () => {
  const en = { home: { a: "Fast delivery", b: "Book on <contact>Zoom</contact> in {year}", c: "Run in CRM and Next.js" } };
  const bg = { home: { a: "Бърза delivery", b: "Запазете в <contact>Zoom</contact> през {year}", c: "Пуснете в CRM и Next.js" } };
  // "delivery" and "Zoom" are not on this fixture's keep list; CRM and Next.js are,
  // and the {year} placeholder and <contact> tag are not words.
  assert.deepEqual(codes(run(en, bg)), ["LATIN_WORD", "LATIN_WORD"]);
});

test("the informal «ти» is an error; the polite «вие» and its forms are fine", () => {
  const en = { home: { a: "Your team", b: "Tell me", c: "Thank you" } };
  const bg = { home: { a: "Твоят екип", b: "Кажи ми какво ти трябва", c: "Благодаря ви, вашият екип" } };
  assert.deepEqual(codes(run(en, bg)), ["INFORMAL_ADDRESS", "INFORMAL_ADDRESS"]);
});
