# AGility

Marketing website for **AGility** — a custom software and AI automation company.
The site sells business outcomes (save time, cut costs, scale) rather than
technology for its own sake, with a fixed dark-only "Electric Indigo" brand.

## Stack

- **Next.js 16** (App Router) + **React 19**
- **Tailwind CSS v4** with a token-driven design system in `src/app/globals.css`
- **shadcn/ui** (Base UI primitives) in `src/components/ui`
- **Framer Motion** for tasteful, restrained motion
- **TypeScript**, **pnpm**

## Getting started

```bash
pnpm install
pnpm dev      # start the dev server at http://localhost:3000
pnpm build    # production build
pnpm lint     # eslint
```

## Project structure

- `src/app` — App Router routes, root layout, global styles, favicon (`icon.svg`)
- `src/components/layout` — shared primitives: `Container`, `Section`, `Nav`, `Footer`
- `src/components/ui` — shadcn/ui components
- `src/lib/utils.ts` — the `cn()` class-merging helper
- `BUILD_PLAN.md` — positioning, decisions, and the phased build plan (source of truth)

## Design tokens

Colors, type scale, spacing, and radii are defined once in `src/app/globals.css`.
Because the brand is dark-only (no theme toggle), all values live directly in
`:root`; there is no `.dark` override. Use the exposed utilities
(`bg-bg-surface`, `text-text-secondary`, `border-border-hover`,
`bg-accent-subtle`, `text-display`, `text-eyebrow`, ...) rather than ad-hoc hex.
