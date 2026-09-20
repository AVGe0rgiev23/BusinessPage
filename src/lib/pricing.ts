/**
 * The published price bands, in euros. One source of truth: the Pricing section
 * and the FAQ answer "How does pricing work?" both read these numbers, so the
 * two can never disagree. Each language supplies only the *template* around
 * them (English `€{low}–{high}`, Bulgarian `{low}–{high} €`), so the currency
 * position and number formatting follow the reader's language.
 *
 * These are commercial commitments, not marketing copy: change them only when
 * the actual offer changes.
 */
export const PRICING = {
  pilot: { low: 600, high: 900 },
  project: { low: 1800, high: 4500 },
  support: { low: 350, high: 800 },
} as const;

export type TierId = keyof typeof PRICING;
