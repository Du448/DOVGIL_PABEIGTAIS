import { NextResponse } from "next/server";

const locales = ["lt", "lv", "en"];
const defaultLocale = "lv";

function isLocaleLike(segment) {
  return /^[a-z]{2}$/i.test(segment || "");
}

function isPublicFile(pathname) {
  return pathname.includes(".");
}

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/sitemap.xml") ||
    isPublicFile(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const hasLocale = locales.includes(first);

  if (!hasLocale) {
    if (isLocaleLike(first)) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    url.search = search;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
