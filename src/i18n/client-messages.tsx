import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { pickMessages } from "./messages";

/** Gives only the named message paths to the client components below it. */
export async function ClientMessages({
  paths,
  children,
}: {
  paths: string[];
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <NextIntlClientProvider messages={pickMessages(messages, paths)}>
      {children}
    </NextIntlClientProvider>
  );
}
