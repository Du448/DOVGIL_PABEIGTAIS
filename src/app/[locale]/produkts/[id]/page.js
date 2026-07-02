import { products, getProductById } from "@/data/products";
import ProductClient from "@/components/ProductClient";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id, locale } = await params;

  const product = getProductById(id);
  if (!product) return { title: t(locale, "product.notFound") };
  const title =
    locale === "en"
      ? `${product.name} — ${product.collection} doors | DOVGIL`
      : locale === "lv"
        ? `${product.name} — ${product.collection} | DOVGIL`
        : `${product.name} — ${product.collection} durys | DOVGIL`;

  const description =
    locale === "en"
      ? `${product.collection} collection doors. Price from €${product.price}. Installation and delivery across Latvia.`
      : locale === "lv"
        ? `${product.collection} kolekcijas durvis. Cena no €${product.price}. Montāža un piegāde visā Latvijā.`
        : `${product.collection} kolekcijos durys. Kaina nuo €${product.price}. Montavimas ir pristatymas visoje Latvijoje.`;

  const ogLocale = locale === "lv" ? "lv_LV" : locale === "en" ? "en_US" : "lt_LT";
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = `/lt/produkts/${id}`;
  const pathLv = `/lv/produkts/${id}`;
  const pathEn = `/en/produkts/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: ogLocale,
      siteName: "DOVGIL",
      type: "website",
    },
    alternates: {
      canonical: `${base}${locale === "lv" ? pathLv : locale === "en" ? pathEn : pathLt}`,
      languages: { lt: `${base}${pathLt}`, lv: `${base}${pathLv}`, en: `${base}${pathEn}` },
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  return <ProductClient id={id} />;
}
