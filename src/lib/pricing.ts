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
 * version for a small business, in euros, and its running fee, which depends
 * on the setup price:
 *   yearly  — under €500: hosting + AI for a year, no monthly bills;
 *   monthly — €500–999: hosting + AI;
 *   care    — €1,000 and up: hosting + AI plus upkeep (monitoring, fixes,
 *             provider changes, a little change time); `from` when the
 *             proposal sets the final amount.
 * `per` says what the setup price or fee counts. Worked out from first-year
 * ROI in the owner's notes (AGility Overview, "Services and prices"); the same
 * commercial-commitment rule as PRICING.
 */
type Fee =
  | { kind: "yearly" | "monthly"; amount: number }
  | { kind: "care"; amount: number; from?: true };

export const SERVICE_PRICES = {
  emailAutomation: { setup: 590, fee: { kind: "monthly", amount: 29 } },
  documentProcessing: { setup: 490, fee: { kind: "yearly", amount: 290 }, per: "documents" },
  workflowAutomation: { setup: 690, fee: { kind: "monthly", amount: 29 } },
  internalCompanyTools: { setup: 1490, fee: { kind: "care", amount: 79 } },
  aiAssistants: { setup: 890, fee: { kind: "monthly", amount: 49 } },
  aiChatbots: { setup: 290, fee: { kind: "yearly", amount: 290 } },
  customerSupportSystems: { setup: 1090, fee: { kind: "care", amount: 79 } },
  crmIntegrations: { setup: 590, fee: { kind: "monthly", amount: 19 } },
  apiIntegrations: { setup: 390, fee: { kind: "yearly", amount: 190 }, per: "connection" },
  aiPoweredDashboards: { setup: 990, fee: { kind: "monthly", amount: 29 } },
  customSaasProducts: { setup: 4500, fee: { kind: "care", amount: 249, from: true } },
  bespokeAiSolutions: { setup: 1800, fee: { kind: "care", amount: 149, from: true } },
} as const satisfies Record<string, { setup: number; fee: Fee; per?: "documents" | "connection" }>;

export type ServiceId = keyof typeof SERVICE_PRICES;
