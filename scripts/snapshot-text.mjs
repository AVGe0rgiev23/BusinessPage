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
