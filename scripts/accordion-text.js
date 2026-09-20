// Paste this whole function into the browser's evaluate (Playwright) on a page
// with accordions (/ and /faq). Closed accordion panels are not in the server
// HTML, so scripts/snapshot-text.mjs cannot see them; this opens each one in
// turn and records the question and the answer text.
// Save the result to .snapshots/accordions-<label>-<page>.json, then compare
// with: node scripts/accordion-diff.mjs <before.json> <after.json>
async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const norm = (s) => (s || "").replace(/\s+/g, " ").trim();
  const triggers = [...document.querySelectorAll("main button[aria-expanded]")];
  const out = [];
  for (const t of triggers) {
    const q = norm(t.textContent);
    if (t.getAttribute("aria-expanded") !== "true") { t.click(); await sleep(150); }
    const id = t.getAttribute("aria-controls");
    const panel = id ? document.getElementById(id) : null;
    out.push({ q, a: norm(panel ? panel.textContent : "(NO PANEL FOUND)") });
    t.click();
    await sleep(80);
  }
  return out;
};
