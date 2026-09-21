import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/routing";
import { siteName } from "@/lib/site-config";

/**
 * The site-wide OpenGraph + Twitter card image, one per language
 * (`/og/en`, `/og/bg`, see src/app/og/[locale]/route.tsx).
 *
 * The artwork lives here once; the words come from `metadata.og.*` in the
 * catalogs. `size` is the standard OG / Twitter summary_large_image size and is
 * mirrored by the width/height that src/lib/seo.ts declares in the page metadata.
 *
 * Design note: `ImageResponse` (Satori) cannot read Tailwind classes, so every
 * value here is an inline literal pulled from the real design tokens in
 * `globals.css` (`--color-bg`, `--color-accent`, `--color-text-*`, ...).
 *
 * Fonts: English uses Next's bundled default (Geist, Latin only), exactly as the
 * card always has. Bulgarian needs Cyrillic, which that font lacks, so it embeds
 * Source Sans 3 — the face the Bulgarian pages themselves are set in. Satori
 * reads neither variable fonts nor WOFF2, hence the static WOFF instances in
 * `assets/fonts/source-sans-3/`. Passing `fonts` replaces the default, so the
 * Bulgarian card gets its Latin (the wordmark, "AI") and its Cyrillic from those
 * files.
 *
 * The two files are registered under two different family names and used as a
 * stack. Registering both under one name makes Satori scale the glyphs of a
 * line that mixes scripts unevenly (Cyrillic capitals came out ~10% taller than
 * the Latin "AI" beside them at 44px); as separate families every glyph is the
 * same size.
 */
export const size = { width: 1200, height: 630 };

// Literal design-token values (from globals.css — Satori can't resolve CSS vars).
// These must be kept in step with `:root` / the `@theme` block by hand; there is
// no build-time link between the two, so a palette change means editing here too.
const BG = "#0b0a09";
const SURFACE = "#121110";
const ACCENT = "#e08e43";
const TEXT_PRIMARY = "#efebe4";
const TEXT_SECONDARY = "#a39d93";
const TEXT_MUTED = "#827c74";
const BORDER = "rgba(239, 235, 228, 0.09)";

const LATIN_FACE = "SourceSans3Latin";
const CYRILLIC_FACE = "SourceSans3Cyrillic";
const FONT_DIR = join(process.cwd(), "assets", "fonts", "source-sans-3");

/**
 * Break a tagline into lines between sentences, never inside one: whole
 * sentences are packed onto a line while it stays within `max` characters (a
 * good stand-in for width at a fixed font size). A sentence longer than `max`
 * still gets a line of its own and wraps naturally.
 */
function taglineLines(text: string, max: number) {
  const lines: string[] = [];
  for (const sentence of text.split(/(?<=[.!?])\s+/)) {
    const last = lines.length - 1;
    if (last >= 0 && lines[last].length + 1 + sentence.length <= max) lines[last] += ` ${sentence}`;
    else lines.push(sentence);
  }
  return lines;
}

async function bulgarianFonts() {
  const [latin, cyrillic] = await Promise.all(
    ["latin", "cyrillic"].map((subset) =>
      readFile(join(FONT_DIR, `source-sans-3-${subset}-400-normal.woff`)),
    ),
  );
  return [
    { name: LATIN_FACE, data: latin, weight: 400 as const, style: "normal" as const },
    { name: CYRILLIC_FACE, data: cyrillic, weight: 400 as const, style: "normal" as const },
  ];
}

export async function renderSocialImage(locale: Locale) {
  const t = await getTranslations({ locale, namespace: "metadata.og" });
  const bulgarian = locale === "bg";
  const fonts = bulgarian ? await bulgarianFonts() : undefined;
  // The Bulgarian tagline is three short sentences that no longer fit on one
  // line; break it between sentences ("…разходите." / "Растете по-бързо."), not
  // wherever the width runs out. English keeps its single line unchanged.
  const tagline = bulgarian ? taglineLines(t("tagline"), 38) : [t("tagline")];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          // Warm copper wash pushed off-centre, echoing the site hero rather
          // than the symmetrical top-centre glow the old design used.
          backgroundImage:
            "radial-gradient(900px 620px at 82% -12%, rgba(224, 142, 67, 0.16), rgba(11, 10, 9, 0) 62%)",
          padding: 80,
          fontFamily: bulgarian ? `${LATIN_FACE}, ${CYRILLIC_FACE}` : "sans-serif",
        }}
      >
        {/* Top row: monogram + category eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 76,
              height: 76,
              borderRadius: 12,
              backgroundColor: SURFACE,
              border: `1px solid ${BORDER}`,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* The "A" peak from src/app/icon.svg, scaled up. */}
            <svg width="46" height="46" viewBox="0 0 32 32" fill="none">
              <path
                d="M9 25 L16 7 L23 25"
                stroke={ACCENT}
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.2 18.6 H19.8"
                stroke={ACCENT}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: TEXT_MUTED,
              fontWeight: 500,
            }}
          >
            {t("eyebrow")}
          </div>
        </div>

        {/* Main block: wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 700,
              letterSpacing: -6,
              color: TEXT_PRIMARY,
              lineHeight: 1,
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              // The Bulgarian tagline is longer and takes two lines, so it is
              // set a little smaller and tighter to keep the card's spacing.
              fontSize: bulgarian ? 48 : 52,
              lineHeight: bulgarian ? 1.15 : undefined,
              fontWeight: 500,
              letterSpacing: -1,
              color: TEXT_SECONDARY,
            }}
          >
            {tagline.map((line) => (
              <div key={line} style={{ display: "flex" }}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: accent rule + wordmark caption */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 4,
              borderRadius: 2,
              backgroundColor: ACCENT,
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: TEXT_MUTED }}>
            {t("caption")}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
