import type { Metadata } from "next";
import {
  Archivo,
  Instrument_Sans,
  JetBrains_Mono,
  Source_Sans_3,
} from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import "../globals.css";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { ClientMessages } from "@/i18n/client-messages";
import { initLocale } from "@/i18n/init-locale";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-config";

/*
  Three variable faces, latin subset only — one woff2 each, ~103 KB preloaded
  in total.

  Archivo carries every heading. Its `wdth` axis is deliberately NOT requested:
  including it takes this file from 34 KB to 88 KB, and all it buys is roughly
  a 6% narrowing that almost nobody would consciously notice. 54 KB is a lot to
  pay for that. The headings get their character from size, weight and tight
  tracking instead, which costs nothing.
*/
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

/*
  Bulgarian only. English pages must not pay for it: browsers fetch a font file
  only when text on the page uses it, and Source Sans 3 is reachable only
  through `html:lang(bg)` in globals.css. `preload: false` keeps English pages
  from even hinting at it.

  Archivo and Instrument Sans have no Cyrillic; Source Sans 3 does. It replaces
  both for Bulgarian (headings 600, body 400/500), `wght` axis only, Latin and
  Cyrillic so that `CRM` or `API` inside a Bulgarian sentence is set in the same
  typeface. (Its Bulgarian-specific letterforms are switched off in globals.css:
  they are the cursive shapes, and readers expect the standard upright ones.)

  JetBrains Mono needs nothing extra: next/font already declares its Cyrillic
  subset as a unicode-range face, fetched only when Cyrillic mono text is
  rendered. (A second JetBrains_Mono instance would define the same @font-face
  rules twice, so the browser would pick the copy that is not preloaded and
  download the Latin file twice.)
*/
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
});

// Only the origin lives here. Every route builds its own title, description,
// canonical, hreflang alternates and share image in `routeMetadata`
// (src/lib/seo.ts), because a page-level `openGraph` object replaces a
// layout-level one wholesale and would drop the image.
export const metadata: Metadata = {
  // Resolves every relative URL (canonical, OpenGraph/Twitter images, ...)
  // against the site origin. Set NEXT_PUBLIC_SITE_URL for production.
  metadataBase: new URL(siteUrl),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = await initLocale(params);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      // The inline script below adds `js-reveal` to this element before React
      // hydrates, so the client's className is intentionally one class longer
      // than the server's. That is the only difference, and it is the whole
      // point of the script — suppress the warning rather than give up the
      // no-JS fallback.
      suppressHydrationWarning
      className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        {/*
          Sets `js-reveal` on <html> before first paint, which is what arms the
          CSS that hides `[data-reveal]` elements ahead of their scroll-in
          animation. Doing it here rather than in the stylesheet means the
          hidden state only ever exists when JavaScript is running to undo it —
          with JS off or broken, the class is never added and every section
          renders visible. It also lands before paint, so there is no flash of
          content that then jumps back to hidden.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js-reveal')`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/*
          next-intl's client `Link` and `usePathname` read the locale from this
          provider. `messages={{}}` keeps the copy out of the client bundle;
          components that need strings get their own slice via <ClientMessages>.
        */}
        <NextIntlClientProvider messages={{}}>
          <OrganizationSchema />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-small focus:font-medium focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-bg"
          >
            {t("skipToContent")}
          </a>
          <ClientMessages paths={["common"]}>
            <Nav />
          </ClientMessages>
          <div className="flex flex-1 flex-col">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
