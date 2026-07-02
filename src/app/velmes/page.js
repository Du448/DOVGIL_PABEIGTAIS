import { headers } from "next/headers";
import { getLocaleFromPathname, t } from "@/lib/i18n";
import WishlistClient from "@/components/WishlistClient";

export async function generateMetadata() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

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
  };
}

export default async function VelmesPage() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

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
