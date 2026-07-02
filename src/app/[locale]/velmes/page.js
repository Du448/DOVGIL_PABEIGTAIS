import { t } from "@/lib/i18n";
import WishlistClient from "@/components/WishlistClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/velmes";
  const pathLv = "/lv/velmes";
  const pathEn = "/en/velmes";

  const title = `${t(locale, "wishlist.title")} | DOVGIL`;
  const description = t(locale, "wishlist.description");

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

export default async function VelmesPage({ params }) {
  const { locale } = await params;

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "wishlist.title")}</h1>
          <p className="mt-2 text-muted">{t(locale, "wishlist.description")}</p>
        </div>
      </section>

      <WishlistClient />
    </main>
  );
}
