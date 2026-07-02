import { headers } from "next/headers";
import { getLocaleFromPathname, t } from "@/lib/i18n";

export async function generateMetadata() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/pakalpojumi";
  const pathLv = "/lv/pakalpojumi";
  const pathEn = "/en/pakalpojumi";
  const title = `${t(locale, "pages.services.title")} | DOVGIL`;
  const description = t(locale, "pages.services.description");

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
      languages: { lt: `${base}${pathLt}`, lv: `${base}${pathLv}`, en: `${base}${pathEn}` },
    },
  };
}

export default async function PakalpojumiPage() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "pages.services.title")}</h1>
          <p className="mt-2 text-muted">{t(locale, "pages.services.description")}</p>
        </div>
      </section>
    </main>
  );
}
