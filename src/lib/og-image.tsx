import { ImageResponse } from "next/og";

import { siteName } from "@/lib/site-config";

/**
 * Shared implementation for the site-wide OpenGraph + Twitter card image.
 *
 * `src/app/opengraph-image.tsx` and `src/app/twitter-image.tsx` both re-export
 * the `size` / `contentType` / `alt` metadata below and delegate rendering to
 * `renderSocialImage()`, so the branded artwork lives in exactly one place.
 *
 * Design note: `ImageResponse` (Satori) cannot read Tailwind classes, so every
 * value here is an inline literal pulled from the real design tokens in
 * `globals.css` (`--color-bg`, `--color-accent`, `--color-text-*`, ...). No
 * custom fonts are fetched — Satori's built-in font renders the text, which
 * keeps the route fast and dependency-free.
 */

// Standard OG / Twitter summary_large_image dimensions.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "AGility — Custom software & AI automation. Save time. Cut costs. Scale faster.";

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

export function renderSocialImage() {
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
          fontFamily: "sans-serif",
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
            Custom Software &amp; AI Automation
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
              marginTop: 28,
              fontSize: 52,
              fontWeight: 500,
              letterSpacing: -1,
              color: TEXT_SECONDARY,
            }}
          >
            Save time. Cut costs. Scale faster.
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
            Custom software, built around your business.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
