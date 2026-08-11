# AGility

Marketing website for **AGility** — a custom software and AI automation company.
The site sells business outcomes (save time, cut costs, scale) rather than
technology for its own sake, with a fixed dark-only brand.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** with a token-driven design system in `src/app/globals.css`
- **shadcn/ui** (Base UI primitives) in `src/components/ui`
- **Anime.js v4** — the single motion library; tokens live in `src/lib/motion.ts`
- **TypeScript**, **pnpm**

## Design system

The visual language is **"engineering ledger"**: warm graphite ground, bone-white
text, hairline rules doing the structural work, monospace annotation, and one
signal colour (copper) spent sparingly. Three rules keep it coherent:

1. **Copper is a signal, not a decoration.** It marks the primary action, the
   current state, and live data lines — nothing else.
2. **Structure comes from hairlines and type weight**, not from wrapping every
   thought in a bordered rounded card.
3. **Radii are small and architectural.** `rounded-full` is reserved for status
   dots; buttons are rectangles.

Typography does most of the work: **Archivo** (narrowed, via its width axis) for
headings, **Instrument Sans** for body, **JetBrains Mono** for labels and data.

Sections are deliberately given *different shapes* — a ledger, a comparison
table, a connected rail, a subgrid matrix, an enclosed index — rather than one
card grid repeated. `src/components/shared/point-list.tsx` is the default for
plain lists of titled points; reach for it before inventing another layout, but
don't use it everywhere or the variety collapses again.

## Getting started

```bash
pnpm install
pnpm dev      # start the dev server at http://localhost:3000
pnpm build    # production build
pnpm lint     # eslint
```

## Deployment

Live at **https://agility-scaffold-tmp.vercel.app** (Vercel scope `ag777`, project
`agility-scaffold-tmp`).

**Pushing `main` is the deploy.** The GitHub → Vercel integration builds and
promotes production from `main`; any other branch gets a preview build instead.
There is no manual `vercel --prod` step in the normal flow.

Preview deployments are **SSO-protected** and will 302 any logged-out request to
`vercel.com/sso-api`. That is Deployment Protection working correctly, not a
broken build — judge a preview by its `Ready` state and smoke-test public URLs
against production.

Every route prerenders as static. The only server-side code is the contact
Server Action, which needs `RESEND_API_KEY` (set encrypted on Production,
Preview, and Development).

`NEXT_PUBLIC_SITE_URL` is **not** set; `src/lib/site-config.ts` falls back to the
real production origin, which is what canonical URLs, the sitemap, `robots.txt`,
the JSON-LD `url`, and the OG/Twitter image URLs are built from. If you ever set
that env var, update the fallback in the same change so the two cannot drift.

```bash
vercel ls agility-scaffold-tmp   # recent deployments
vercel inspect <url>             # state, aliases, build output
vercel logs <url> --json         # runtime logs
vercel env ls                    # configured env vars
```

## Project structure

- `src/app` — App Router routes, root layout, global styles, favicon (`icon.svg`)
- `src/components/layout` — shared primitives: `Container`, `Section`, `SectionHeading`, `Nav`, `Footer`, `CtaBand`, `PageHeader`
- `src/components/shared` — cross-page content blocks: `PointList`, `DeliveryModels`
- `src/components/motion` — `Reveal` / `RevealGroup` scroll-entrance primitives
- `src/components/ui` — shadcn/ui components
- `src/lib/motion.ts` — motion tokens + the shared IntersectionObserver
- `src/lib/utils.ts` — `cn()`, `focusRing`, `arrowLink`
- `BUILD_PLAN.md` — positioning, decisions, and the phased build plan (source of truth)

## Design tokens

Colors, type scale, spacing, radii, **and motion** are defined once in
`src/app/globals.css`. Because the brand is dark-only (no theme toggle), all
values live directly in `:root`; there is no `.dark` override. Use the exposed
utilities (`bg-bg-surface`, `text-text-secondary`, `border-border-hover`,
`bg-accent-subtle`, `text-display`, `text-eyebrow`, ...) rather than ad-hoc hex.

Durations and easings exist twice, deliberately: as `--duration-*` / `--ease-*`
for CSS transitions, and as matching values in `src/lib/motion.ts` for anime.js.
**Change one, change the other** — they are what keep a CSS hover and a scripted
tween on the same element moving at the same rate.

Two values are duplicated by necessity and must be updated by hand alongside
`globals.css`: the literal hex values in `src/lib/og-image.tsx` (Satori cannot
resolve CSS variables) and the select-chevron data URI in the contact form.

## Motion

`Reveal` wraps a single block; `RevealGroup` choreographs a set of siblings from
one observer. Both honour `prefers-reduced-motion` by rendering content visible
and static.

Elements are hidden pre-animation by CSS scoped to `html.js-reveal`, a class an
inline script in `layout.tsx` sets before first paint. If JavaScript never runs,
the class is never added and **everything renders visible** — so a broken bundle
degrades to a plain page, not a blank one. `<html>` carries
`suppressHydrationWarning` for exactly this reason.
