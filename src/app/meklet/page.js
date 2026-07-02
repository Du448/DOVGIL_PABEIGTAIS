import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { headers } from "next/headers";
import { getLocaleFromPathname, t } from "@/lib/i18n";

export async function generateMetadata() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  const title = `${t(locale, "search.title")} | DOVGIL`;
  const description = t(locale, "search.results");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "lv" ? "lv_LV" : locale === "en" ? "en_US" : "lt_LT",
      siteName: "DOVGIL",
      type: "website",
    },
  };
}

export default async function SearchPage() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  return (
    <main>
      <Suspense fallback={<div className="container py-6 text-muted">{t(locale, "loading.search")}</div>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
