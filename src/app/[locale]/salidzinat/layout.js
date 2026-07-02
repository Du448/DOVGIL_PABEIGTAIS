export async function generateMetadata({ params }) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/salidzinat";
  const pathLv = "/lv/salidzinat";
  const pathEn = "/en/salidzinat";
  const title = locale === "lv" ? "Salīdzināt" : locale === "en" ? "Compare" : "Palyginti";
  const description =
    locale === "lv"
      ? "Salīdziniet līdz 4 durvju modeļiem un pārskatiet atšķirības."
      : locale === "en"
        ? "Compare up to 4 door models and review the differences."
        : "Palyginkite iki 4 durų modelių ir peržiūrėkite jų skirtumus.";

  return {
    title: `${title} | DOVGIL`,
    description,
    openGraph: {
      title: `${title} | DOVGIL`,
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

export default function CompareLayout({ children }) {
  return children;
}
