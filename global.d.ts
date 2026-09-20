import type common from "./messages/en/common.json";
import type { routing } from "./src/i18n/routing";

// Typed message keys. Each area task adds its English JSON here.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: { common: typeof common };
  }
}
