import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { renderSocialImage } from "@/lib/og-image";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Task 17 makes the image itself locale-aware.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return new Response("Not found", { status: 404 });
  return renderSocialImage();
}
