export async function generateMetadata({ params }) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/grozs";
  const pathLv = "/lv/grozs";
  const pathEn = "/en/grozs";
  const title = locale === "lv" ? "Pieprasījums" : locale === "en" ? "Inquiry cart" : "Užklausa";
  const description =
    locale === "lv"
      ? "Izvēlēto durvju saraksts nosūtīšanai piedāvājumam."
      : locale === "en"
        ? "Your selected doors ready to send as an inquiry."
        : "Pasirinktų durų sąrašas užklausai išsiųsti.";

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

export default function GrozsLayout({ children }) {
  return children;
}
