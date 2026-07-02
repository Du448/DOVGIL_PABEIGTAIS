import Link from "next/link";
import Image from "next/image";
import { Layers, Wrench, ShieldCheck, MessageCircle } from "lucide-react";
import { withLocaleHref, t } from "@/lib/i18n";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt/par-mums";
  const pathLv = "/lv/par-mums";
  const pathEn = "/en/par-mums";
  const title = `${t(locale, "pages.about.title")} | DOVGIL`;
  const description =
    locale === "lv"
      ? "DOVGIL — kvalitatīvas ārdurvis un iekšdurvis ar piegādi un montāžu visā Latvijā."
      : locale === "en"
        ? "DOVGIL — quality exterior and interior doors with delivery and installation across Latvia."
        : "DOVGIL — kokybiškos lauko ir vidaus durys su pristatymu ir montavimu visoje Latvijoje.";

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

export default async function AboutPage({ params }) {
  const { locale } = await params;

  return (
    <main>
      {/* Intro */}
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "pages.about.title")}</h1>
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4 text-[15px] text-ink">
              <p>
                {t(locale, "pages.about.intro1")}
              </p>
              <p>
                {t(locale, "pages.about.intro2")}
              </p>
              <p>
                {t(locale, "pages.about.intro3")}
              </p>
              <div>
                <Link href={withLocaleHref(locale, "/kontakti")} className="inline-block bg-accent hover:bg-accent-dark text-white rounded-sm px-5 py-2">
                  {t(locale, "pages.about.cta")}
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-sm border border-line bg-[--color-soft] aspect-16/10 w-full">
              <Image
                src="https://images.unsplash.com/photo-1613544723301-176686aa9f09?auto=format&fit=crop&w=1800&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="container py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-sm border border-line bg-white p-4">
              <div className="mb-2 text-ink inline-flex items-center gap-2">
                <Layers size={18} />
                <span className="font-semibold">{t(locale, "pages.about.featuresTitle1")}</span>
              </div>
              <p className="text-[15px] text-muted">{t(locale, "pages.about.featuresDesc1")}</p>
            </div>
            <div className="rounded-sm border border-line bg-white p-4">
              <div className="mb-2 text-ink inline-flex items-center gap-2">
                <Wrench size={18} />
                <span className="font-semibold">{t(locale, "pages.about.featuresTitle2")}</span>
              </div>
              <p className="text-[15px] text-muted">{t(locale, "pages.about.featuresDesc2")}</p>
            </div>
            <div className="rounded-sm border border-line bg-white p-4">
              <div className="mb-2 text-ink inline-flex items-center gap-2">
                <ShieldCheck size={18} />
                <span className="font-semibold">{t(locale, "pages.about.featuresTitle3")}</span>
              </div>
              <p className="text-[15px] text-muted">{t(locale, "pages.about.featuresDesc3")}</p>
            </div>
            <div className="rounded-sm border border-line bg-white p-4">
              <div className="mb-2 text-ink inline-flex items-center gap-2">
                <MessageCircle size={18} />
                <span className="font-semibold">{t(locale, "pages.about.featuresTitle4")}</span>
              </div>
              <p className="text-[15px] text-muted">{t(locale, "pages.about.featuresDesc4")}</p>
            </div>
          </div>
          {/* Second placeholder image row */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative overflow-hidden rounded-sm border border-line bg-[--color-soft] aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1771354959667-96360bf59eab?auto=format&fit=crop&w=1400&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm border border-line bg-[--color-soft] aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1572297862992-4d366ab34d63?auto=format&fit=crop&w=1400&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-sm border border-line bg-[--color-soft] aspect-4/3">
              <Image
                src="https://images.unsplash.com/photo-1748027869634-fc2e545cfb0c?auto=format&fit=crop&w=1400&q=80"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
