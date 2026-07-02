import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/meklet";
  const pathLv = "/lv/meklet";
  const pathEn = "/en/meklet";

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
    alternates: {
      canonical: `${base}${locale === "lv" ? pathLv : locale === "en" ? pathEn : pathLt}`,
      languages: {
        lt: `${base}${pathLt}`,
        lv: `${base}${pathLv}`,
        en: `${base}${pathEn}`,
      },
    },
  };
}

export default async function SearchPage({ params }) {
  const { locale } = await params;

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "search.title")}</h1>
        </div>
      </section>
      <Suspense fallback={<div className="container py-6 text-muted">{t(locale, "loading.search")}</div>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
