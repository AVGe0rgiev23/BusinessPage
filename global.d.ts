import type common from "./messages/en/common.json";
import type home from "./messages/en/home.json";
import type metadata from "./messages/en/metadata.json";
import type process from "./messages/en/process.json";
import type services from "./messages/en/services.json";
import type shared from "./messages/en/shared.json";
import type { routing } from "./src/i18n/routing";

// Typed message keys. Each area task adds its English JSON here.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: {
      common: typeof common;
      home: typeof home;
      metadata: typeof metadata;
      process: typeof process;
      services: typeof services;
      shared: typeof shared;
    };
  }
}
