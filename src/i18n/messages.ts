import type { Locale } from "./routing";

/** Top-level namespaces; each is messages/<locale>/<area>.json. Grows as areas are extracted. */
export const AREAS = ["common", "metadata", "home"] as const;
export type Messages = Record<string, unknown>;

export async function loadMessages(locale: Locale): Promise<Messages> {
  const entries = await Promise.all(
    AREAS.map(
      async (area) =>
        [area, (await import(`../../messages/${locale}/${area}.json`)).default] as const,
    ),
  );
  return Object.fromEntries(entries);
}

/** Pick dotted paths ("home.hero") out of the full catalog, preserving nesting. */
export function pickMessages(messages: Messages, paths: string[]): Messages {
  const out: Messages = {};
  for (const path of paths) {
    const parts = path.split(".");
    let src: unknown = messages;
    let dst = out;
    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      src = (src as Messages | undefined)?.[key];
      if (src === undefined) throw new Error(`pickMessages: no messages at "${path}"`);
      if (i === parts.length - 1) dst[key] = src;
      else dst = (dst[key] ??= {}) as Messages;
    }
  }
  return out;
}
