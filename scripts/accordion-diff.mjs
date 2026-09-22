#!/usr/bin/env node
// Usage: node scripts/accordion-diff.mjs <before.json> <after.json>
// Compares the question/answer pairs captured with scripts/accordion-text.js.
// Closed accordion panels are not in the server HTML, so the text snapshot
// (scripts/snapshot-text.mjs) cannot see them.
import { readFileSync } from "node:fs";

const [beforeFile, afterFile] = process.argv.slice(2);
if (!beforeFile || !afterFile) {
  console.error("usage: accordion-diff.mjs <before.json> <after.json>");
  process.exit(2);
}
const load = (f) => JSON.parse(readFileSync(f, "utf8"));
const before = load(beforeFile);
const after = load(afterFile);

let bad = 0;
if (before.length !== after.length) {
  console.error(`item count differs: ${before.length} vs ${after.length}`);
  bad++;
}
for (let i = 0; i < Math.max(before.length, after.length); i++) {
  const b = before[i];
  const a = after[i];
  if (!b || !a) { console.error(`#${i}: present on only one side`); bad++; continue; }
  if (b.q !== a.q) { console.error(`#${i} question differs:\n  - ${b.q}\n  + ${a.q}`); bad++; }
  if (b.a !== a.a) { console.error(`#${i} answer differs (${b.q}):\n  - ${b.a}\n  + ${a.a}`); bad++; }
}
console.log(bad ? `ACCORDIONS DIFFER (${bad})` : `ACCORDIONS IDENTICAL (${before.length} items)`);
process.exit(bad ? 1 : 0);
