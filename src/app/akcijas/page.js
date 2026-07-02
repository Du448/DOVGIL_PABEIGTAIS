import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { headers } from "next/headers";
import { getLocaleFromPathname, t } from "@/lib/i18n";

export async function generateMetadata() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/akcijas";
  const pathLv = "/lv/akcijas";
  const pathEn = "/en/akcijas";
  const title = `${t(locale, "pages.deals.title")} | DOVGIL`;
  const description = t(locale, "pages.deals.description");

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

export default async function AkcijasPage() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  const discounted = products.filter((p) => p.oldPrice != null);

  const title = t(locale, "pages.deals.title");
  const description = t(locale, "pages.deals.description");

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{title}</h1>
          <p className="mt-2 text-muted">{description}</p>
        </div>
      </section>

      <section>
        <div className="container py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {discounted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
