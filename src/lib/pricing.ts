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
  pilot: { low: 290, high: 1090 },
  project: { low: 1800, high: 4500 },
  support: { low: 350, high: 800 },
} as const;

export type TierId = keyof typeof PRICING;

/**
 * The "from" price of each service on the Services page: the simplest useful
 * version for a small business, in euros. `monthly` is hosting + AI (null:
 * set in the proposal); `per` says what the setup or monthly price counts.
 * Worked out from first-year ROI in the owner's notes (AGility Overview,
 * "Services and prices"); the same commercial-commitment rule as PRICING.
 */
export const SERVICE_PRICES = {
  emailAutomation: { setup: 590, monthly: 29 },
  documentProcessing: { setup: 490, monthly: 29, per: "documents" },
  workflowAutomation: { setup: 690, monthly: 29 },
  internalCompanyTools: { setup: 1490, monthly: 29 },
  aiAssistants: { setup: 890, monthly: 49 },
  aiChatbots: { setup: 290, monthly: 29 },
  customerSupportSystems: { setup: 1090, monthly: 49 },
  crmIntegrations: { setup: 590, monthly: 19 },
  apiIntegrations: { setup: 390, monthly: 19, per: "connection" },
  aiPoweredDashboards: { setup: 990, monthly: 29 },
  customSaasProducts: { setup: 4500, monthly: null },
  bespokeAiSolutions: { setup: 1800, monthly: null },
} as const;

export type ServiceId = keyof typeof SERVICE_PRICES;
