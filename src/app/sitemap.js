import { categories, products } from "@/data/products";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const locales = ["lt", "lv", "en"];

  const staticPaths = ["/", "/par-mums", "/kontakti", "/akcijas", "/pakalpojumi", "/jaunumi"];
  const categoryPaths = categories.map((c) => `/kategorija/${c.slug}`);
  const productPaths = products.map((p) => `/produkts/${p.id}`);

  const all = [...staticPaths, ...categoryPaths, ...productPaths];

  const urls = [];
  for (const path of all) {
    for (const loc of locales) {
      urls.push({ url: `${base}/${loc}${path}`, lastModified: new Date().toISOString() });
    }
  }
  return urls;
}
