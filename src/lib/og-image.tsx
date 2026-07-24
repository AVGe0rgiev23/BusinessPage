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
const BG = "#0a0a0d";
const SURFACE = "#101014";
const ACCENT = "#5a6eff";
const TEXT_PRIMARY = "#f5f5f7";
const TEXT_SECONDARY = "#a1a1aa";
const TEXT_MUTED = "#71717a";
const BORDER = "rgba(255, 255, 255, 0.08)";

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
          // Soft Electric Indigo glow, top-centre, matching the site's accent.
          backgroundImage:
            "radial-gradient(1000px 600px at 50% -10%, rgba(90, 110, 255, 0.22), rgba(10, 10, 13, 0) 60%)",
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
              borderRadius: 16,
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
              height: 5,
              borderRadius: 999,
              backgroundColor: ACCENT,
            }}
          />
          <div style={{ display: "flex", fontSize: 26, color: TEXT_MUTED }}>
            Software you own, built around your business.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
