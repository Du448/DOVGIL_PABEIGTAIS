export default function robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [`${base}/sitemap.xml`],
  };
}
