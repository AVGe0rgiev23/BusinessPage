import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, the share-image route and any path with a file extension.
  matcher: ["/((?!api|og|_next|_vercel|.*\\..*).*)"],
};
