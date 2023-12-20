// framework
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// dependencies
import Negotiator from "negotiator";
import { i18n } from "./i18n.config";
import { match as matchLocale } from "@formatjs/intl-localematcher";

/* GET LOCALE HANDLER */
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale, based on computer language or browser setting
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @tx-ignore locales are readonly
  const locales: string[] = i18n.locales;
  // try to match the system language to the list of preferred languages in i18n.config.ts file
  return matchLocale(languages, locales, i18n.defaultLocale);
  
//   const defaultLocale: string = i18n.defaultLocale;
  // try to match the system language to the list of preferred languages in i18n.config file
//   return matchLocale(languages, locales, defaultLocale)
}

/* MIDDLEWARE */
export default function middleware(request: NextRequest) {
  // console.log(request);
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect: if there is no locale value in pathname, redirect using i18n.config default value
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    //
    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
  }
}

/* MATCHER CONFIGURATION*/
// if there is a request you do not want to run the middleware, it must be included in this matcher
export const config = {
  // Matcher middleware needs to run for all requests except: api routes `/api/`, next files `/_next/` or static files like favicon
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  // matcher: ["/((?!api|_next/static|_next/image|favicon.ico|spacestation).*)"],
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image|robots.txt|sitemap).*)",
  ],
};
