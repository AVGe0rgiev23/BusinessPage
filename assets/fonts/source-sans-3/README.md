# Source Sans 3 (static WOFF, Latin + Cyrillic)

Used only by `src/lib/og-image.tsx` for the Bulgarian share image.

`next/og` (Satori) cannot read variable fonts or WOFF2, and its bundled default
font (Geist) has no Cyrillic, so the Bulgarian card embeds these static
per-weight instances. The website itself loads Source Sans 3 through
`next/font/google` and does not use these files.

- Source: `@fontsource/source-sans-3` 5.3.0 (`files/source-sans-3-{latin,cyrillic}-{400,600}-normal.woff`)
- Upstream: https://github.com/adobe-fonts/source-sans
- License: SIL Open Font License 1.1, see `OFL.txt`
