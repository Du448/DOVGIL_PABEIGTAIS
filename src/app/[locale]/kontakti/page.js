import ContactsClient from "@/components/ContactsClient";
import { Suspense } from "react";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const title = `${t(locale, "contacts.title")} | DOVGIL`;
  const description = t(locale, "contacts.contactUs");

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLv = `/lv/kontakti`;
  const pathEn = `/en/kontakti`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : "lv_LV",
      siteName: "DOVGIL",
      type: "website",
    },
    alternates: {
      canonical: `${base}${locale === "en" ? pathEn : pathLv}`,
      languages: { lv: `${base}${pathLv}`, en: `${base}${pathEn}` },
    },
  };
}

export default async function ContactsPage({ params }) {
  const { locale } = await params;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "contacts.title")}</h1>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "DOVGIL",
            address: { "@type": "PostalAddress", streetAddress: "Krasta iela 46", addressLocality: "Riga", postalCode: "LV-1003", addressCountry: "LV" },
            telephone: ["+37127548999", "+37129991129"],
            email: ["dovgil.design@gmail.com", "info@dovgil.lv"],
            url: base,
          }),
        }}
      />
      <Suspense fallback={<div className="container py-6 text-muted">{t(locale, "loading.contacts")}</div>}>
        <ContactsClient />
      </Suspense>
    </main>
  );
}
