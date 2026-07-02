import Link from "next/link";
import Image from "next/image";
import { categories, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/components/HeroSlider";
import HomeBenefitsShowcase from "@/components/HomeBenefitsShowcase";
import HowWeWorkSlider from "@/components/HowWeWorkSlider";
import GoogleReviews from "@/components/GoogleReviews";
import RevealGrid from "@/components/anim/RevealGrid";
import MagneticButton from "@/components/anim/MagneticButton";
import HomeSpotlightCarousel from "@/components/HomeSpotlightCarousel";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { withLocaleHref, t } from "@/lib/i18n";
import { ikSrc } from "@/lib/imagekit";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";
  const pathLt = "/lt";
  const pathLv = "/lv";
  const pathEn = "/en";
  const title =
    locale === "lv"
      ? "DOVGIL — ārdurvis un iekšdurvis Latvijā"
      : locale === "en"
        ? "DOVGIL — exterior and interior doors in Latvia"
        : "DOVGIL — lauko ir vidaus durys Latvijoje";
  const description =
    locale === "lv"
      ? "DOVGIL: ārdurvis un iekšdurvis, profesionāla montāža un piegāde visā Latvijā. Plašs sortiments, konsultācijas un garantija."
      : locale === "en"
        ? "DOVGIL: exterior and interior doors, professional installation and delivery across Latvia. Wide assortment, consultations and warranty."
        : "DOVGIL: lauko ir vidaus durys, profesionalus montavimas ir pristatymas visoje Latvijoje. Platus asortimentas, konsultacijos ir garantija.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "DOVGIL",
      locale: locale === "lv" ? "lv_LV" : locale === "en" ? "en_US" : "lt_LT",
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

function formatSpotlightPrice(locale, price) {
  return new Intl.NumberFormat(locale === "lv" ? "lv-LV" : locale === "en" ? "en-IE" : "lt-LT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getSpotlightContent(product, locale) {
  const specs = product.specs ?? {};
  const shared = {
    eyebrow: locale === "lv" ? "Izcelts modelis" : locale === "en" ? "Spotlight model" : "Išskirtinis modelis",
    viewLabel: locale === "lv" ? "Skatīt modeli" : locale === "en" ? "View model" : "Peržiūrėti modelį",
    priceLabel:
      locale === "lv"
        ? `Cena no ${formatSpotlightPrice(locale, product.price)}`
        : locale === "en"
          ? `From ${formatSpotlightPrice(locale, product.price)}`
          : `Kaina nuo ${formatSpotlightPrice(locale, product.price)}`,
  };

  switch (product.id) {
    case "boston-6012":
      return {
        ...shared,
        tagline:
          locale === "lv"
            ? `Alumīnija termo durvis. ${specs["Siltumvadītspēja"]}. ${specs["Skaņas izolācija"]} klusums.`
            : locale === "en"
              ? `Aluminium thermal door. ${specs["Siltumvadītspēja"]}. ${specs["Skaņas izolācija"]} quiet.`
              : `Aliuminio termo durys. ${specs["Siltumvadītspēja"]}. ${specs["Skaņas izolācija"]} tylos.`,
        details: [shared.priceLabel, specs["Stikla pakete"], specs["Skaņas izolācija"]].filter(Boolean),
      };
    case "termix-adele":
      return {
        ...shared,
        tagline:
          locale === "lv"
            ? `Termo durvis ar ${specs["Stikla pakete"]?.toLowerCase()}. ${specs["Kārbas biezums"]}. Nakts aizbīdnis.`
            : locale === "en"
              ? `Thermal door with ${specs["Stikla pakete"]?.toLowerCase()} glazing. ${specs["Kārbas biezums"]}. Night latch.`
              : `Termo durys su ${specs["Stikla pakete"]?.toLowerCase()}. ${specs["Kārbas biezums"]}. Naktinis skląstis.`,
        details: [shared.priceLabel, specs["Kārbas biezums"], specs["Vērtnes biezums"]].filter(Boolean),
      };
    case "termotrend-gluds":
      return {
        ...shared,
        tagline:
          locale === "lv"
            ? `Premium termo durvis. ${specs["Slēdzene"]}. ${specs["Vērtnes biezums"]} vērtne.`
            : locale === "en"
              ? `Premium thermal door. ${specs["Slēdzene"]}. ${specs["Vērtnes biezums"]} leaf.`
              : `Premium termo durys. ${specs["Slēdzene"]}. ${specs["Vērtnes biezums"]} varčia.`,
        details: [shared.priceLabel, specs["Vērtnes biezums"], specs["Pildījums"]].filter(Boolean),
      };
    default:
      return {
        ...shared,
        tagline: product.short,
        details: [shared.priceLabel, product.collection].filter(Boolean),
      };
  }
}

export default async function Home({ params }) {
  const { locale } = await params;

  const categoryImages = {
    "ardurvis-dzivoklim": {
      src: "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/0119-01-1.jpg",
      fit: "contain",
      alt: {
        lv: "Dzīvokļa ieejas zona modernā gaitenī",
        en: "Apartment entrance area in a modern hallway",
        lt: "Buto įėjimo zona moderniame koridoriuje",
      },
    },
    "ardurvis-privatmajai": {
      images: [
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0033.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0040.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0036.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0034.jpg",
      ],
      alt: {
        lv: "Privātmājas ieejas durvis ar mūsdienīgu, drošu fasādi",
        en: "House entrance doors with a modern, secure facade",
        lt: "Namo įėjimo durys su moderniu, saugiu fasadu",
      },
    },
    "ieksdurvis": {
      images: [
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0056.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0072.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0065.jpg",
        "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/IMG-20250402-WA0063.jpg",
      ],
      alt: {
        lv: "Gaišas iekšdurvis minimālistiskā, siltā interjerā",
        en: "Light interior doors in a minimal, warm interior",
        lt: "Šviesios vidaus durys minimalistiniame, jaukiame interjere",
      },
    },
    "bidamas-durvis": {
      src: "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/LOFT%20baltas.jpg",
      alt: {
        lv: "Bīdāmās durvis gaišā modernā telpā",
        en: "Sliding doors in a bright modern space",
        lt: "Stumdomos durys šviesioje modernioje erdvėje",
      },
    },
    "sleptas-durvis": {
      src: "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/invisidoor-invisible-door-optimized.webp",
      alt: {
        lv: "Slēptas minimālistiskas durvis klusā interjerā",
        en: "Hidden minimal door in a quiet interior",
        lt: "Paslėptos minimalistinės durys tyliame interjere",
      },
    },
  };

  const newProducts = products.filter((p) => p.isNew);
  const popularExterior = products
    .filter((p) => p.category.startsWith("ardurvis-"))
    .slice(0, 4);
  const spotlightProducts = ["boston-6012", "termix-adele", "termotrend-gluds"]
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  const spotlightItems = spotlightProducts.map((product) => {
    const spotlightContent = getSpotlightContent(product, locale);

    return {
      id: product.id,
      name: product.name,
      short: product.short,
      image: product.images?.[0] || "/next.svg",
      alt:
        locale === "lv"
          ? `${product.name} — premium durvju modelis reālā vidē`
          : locale === "en"
            ? `${product.name} — premium door model in a real setting`
            : `${product.name} — aukštos klasės durų modelis tikroje aplinkoje`,
      eyebrow: spotlightContent.eyebrow,
      viewLabel: spotlightContent.viewLabel,
      tagline: spotlightContent.tagline,
      details: spotlightContent.details,
    };
  });

  const faqItems = [
    {
      key: "warranty",
      question: t(locale, "home.faq.q.warranty"),
      answer: t(locale, "home.faq.a.warranty"),
    },
    {
      key: "installTime",
      question: t(locale, "home.faq.q.installTime"),
      answer: t(locale, "home.faq.a.installTime"),
    },
    {
      key: "delivery",
      question: t(locale, "home.faq.q.delivery"),
      answer: t(locale, "home.faq.a.delivery"),
    },
    {
      key: "customSizes",
      question: t(locale, "home.faq.q.customSizes"),
      answer: t(locale, "home.faq.a.customSizes"),
    },
    {
      key: "colorChange",
      question: t(locale, "home.faq.q.colorChange"),
      answer: t(locale, "home.faq.a.colorChange"),
    },
    {
      key: "payment",
      question: t(locale, "home.faq.q.payment"),
      answer: t(locale, "home.faq.a.payment"),
    },
    {
      key: "measurement",
      question: t(locale, "home.faq.q.measurement"),
      answer: t(locale, "home.faq.a.measurement"),
    },
    {
      key: "materials",
      question: t(locale, "home.faq.q.materials"),
      answer: t(locale, "home.faq.a.materials"),
    },
  ];

  const faqIntroTitle = locale === "lv" ? "Biežāk uzdotie jautājumi" : "Frequently asked questions";
  const faqIntroText =
    locale === "lv"
      ? "Ātras un skaidras atbildes par svarīgākajiem jautājumiem."
      : "Clear, quick answers to the questions people ask most.";

  const bottomLinks =
    locale === "lt"
      ? [
          { href: withLocaleHref(locale, "/kontakti"), label: "Gauti nemokamą konsultaciją →" },
          { href: withLocaleHref(locale, "/kontakti#salons"), label: "Aplankyti saloną Rygoje →" },
          { href: withLocaleHref(locale, "/#kategorijas"), label: "Peržiūrėti visą asortimentą →" },
        ]
      : locale === "en"
        ? [
            { href: withLocaleHref(locale, "/kontakti"), label: "Request a free consultation →" },
            { href: withLocaleHref(locale, "/kontakti#salons"), label: "Visit the showroom in Riga →" },
            { href: withLocaleHref(locale, "/#kategorijas"), label: "View the full assortment →" },
          ]
        : [
            { href: withLocaleHref(locale, "/kontakti"), label: "Pieprasīt bezmaksas konsultāciju →" },
            { href: withLocaleHref(locale, "/kontakti#salons"), label: "Apmeklēt salonu Rīgā →" },
            { href: withLocaleHref(locale, "/#kategorijas"), label: "Skatīt visu sortimentu →" },
          ];

  return (
    <main className="overflow-hidden">
      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            name: "DOVGIL",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Krasta iela 46",
              addressLocality: "Riga",
              postalCode: "LV-1003",
              addressCountry: "LV",
            },
            telephone: ["+37127548999", "+37129991129"],
            email: ["dovgil.design@gmail.com", "info@dovgil.lv"],
            url: process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv",
          }),
        }}
      />
      {/* HERO SLIDER */}
      <section className="relative pt-0 pb-0">
        <HeroSlider
            slides={[
              {
                image: "https://images.unsplash.com/photo-1613544723301-176686aa9f09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2400",
                kicker: locale === "lv" ? "IEEJAS DURVIS" : locale === "en" ? "ENTRANCE DOORS" : "ĮĖJIMO DURYS",
                title: locale === "lv" ? "Cilvēcīgi silts, vizuāli kluss ieejas risinājums" : locale === "en" ? "A quietly dramatic entrance statement" : "Tyliai dramatiškas įėjimo sprendimas",
                subtitle: locale === "lv" ? "Premium durvis reālā vidē, kur forma, drošība un komforts jūtami no pirmā skatiena." : locale === "en" ? "Premium doors in a real setting where form, security and comfort are felt at first glance." : "Aukščiausios klasės durys tikroje aplinkoje, kur forma, saugumas ir komfortas jaučiami iš pirmo žvilgsnio.",
                cta: [
                  { label: locale === "lv" ? "Skatīt kolekciju" : locale === "en" ? "View collection" : "Peržiūrėti kolekciją", href: withLocaleHref(locale, "/kategorija/ardurvis-privatmajai") },
                  { label: locale === "lv" ? "Pieprasīt piedāvājumu" : locale === "en" ? "Request a quote" : "Prašyti pasiūlymo", href: withLocaleHref(locale, "/kontakti") },
                ],
              },
              {
                image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2400",
                alt:
                  locale === "lv"
                    ? "Ārdurvis elegantā fasādē ar izteiktu, drošu raksturu"
                    : locale === "en"
                      ? "Exterior doors on an elegant facade with a strong, secure character"
                      : "Lauko durys elegantiškame fasade su ryškiu, saugiu charakteriu",
                kicker: locale === "lv" ? "ĀRDURVIS" : locale === "en" ? "EXTERIOR DOORS" : "LAUKO DURYS",
                title: locale === "lv" ? "Stiprs pirmais iespaids ārpusē" : locale === "en" ? "A strong first impression outside" : "Stiprus pirmasis įspūdis išorėje",
                subtitle: locale === "lv" ? "Aizsardzība, energoefektivitāte un mierīgs dizains vienā kadrā." : locale === "en" ? "Protection, energy efficiency and calm design in one frame." : "Apsauga, energinis efektyvumas ir ramus dizainas viename kadre.",
                cta: [
                  { label: locale === "lv" ? "Skatīt kolekciju" : locale === "en" ? "View collection" : "Peržiūrėti kolekciją", href: withLocaleHref(locale, "/kategorija/ardurvis-privatmajai") },
                  { label: locale === "lv" ? "Pieprasīt piedāvājumu" : locale === "en" ? "Request a quote" : "Prašyti pasiūlymo", href: withLocaleHref(locale, "/kontakti") },
                ],
              },
              {
                image: "https://images.unsplash.com/photo-1552819401-700b5e342b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2400",
                alt:
                  locale === "lv"
                    ? "Gaišas iekšdurvis klusā, minimālistiskā interjerā"
                    : locale === "en"
                      ? "Light interior doors in a quiet, minimalist interior"
                      : "Šviesios vidaus durys tyliame, minimalistiniame interjere",
                kicker: locale === "lv" ? "IEKŠDURVIS" : locale === "en" ? "INTERIOR DOORS" : "VIDAUS DURYS",
                title: locale === "lv" ? "Tīrs interjers ar klusu raksturu" : locale === "en" ? "A clean interior with quiet character" : "Švarus interjeras su ramiu charakteriu",
                subtitle: locale === "lv" ? "Mierīgs, gaismā tīrs kadrējums ikdienas telpām, kur svarīga ir detaļa." : locale === "en" ? "A calm, light-filled frame for everyday spaces where detail matters." : "Ramus, šviesos pripildytas kadras kasdienėms erdvėms, kur svarbi detalė.",
                cta: [
                  { label: locale === "lv" ? "Skatīt kolekciju" : locale === "en" ? "View collection" : "Peržiūrėti kolekciją", href: withLocaleHref(locale, "/kategorija/ieksdurvis") },
                  { label: locale === "lv" ? "Pieprasīt piedāvājumu" : locale === "en" ? "Request a quote" : "Prašyti pasiūlymo", href: withLocaleHref(locale, "/kontakti") },
                ],
              },
            ]}
          />
      </section>
      <HomeBenefitsShowcase locale={locale} />
      <HomeSpotlightCarousel locale={locale} items={spotlightItems} />

      {/* KATEGORIJAS */}
      <section id="kategorijas">
        <div className="container">
          <h2 className="mb-6 text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] max-w-3xl">
            {t(locale, "home.popularCategories")}
          </h2>
          <RevealGrid className="grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 overflow-x-auto pb-2">
            {categories.map((c) => {
              const categoryImage = categoryImages[c.slug] ?? null;
              const categoryName = t(locale, `categories.${c.slug}`) || c.name;

              return (
                <Link
                  key={c.slug}
                  href={withLocaleHref(locale, `/kategorija/${c.slug}`)}
                  className="group relative flex h-full overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_8px_24px_rgba(15,23,42,0.05)] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_12%)] hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="relative aspect-[4/5] min-h-[320px] w-full overflow-hidden bg-[--color-soft] sm:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[5/6]">
                    {categoryImage ? (
                      Array.isArray(categoryImage.images) ? (
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5 bg-[--color-soft]">
                          {categoryImage.images.map((src, index) => (
                            <div key={`${c.slug}-${index}`} className="relative overflow-hidden">
                              <Image
                                src={ikSrc(src, { w: 800 })}
                                alt={categoryImage.alt[locale] || categoryName}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08] motion-reduce:transition-none"
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Image
                          src={ikSrc(categoryImage.src, { w: 800 })}
                          alt={categoryImage.alt[locale] || categoryName}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1279px) 50vw, 33vw"
                          className={categoryImage.fit === "contain"
                            ? "object-contain bg-white transition-transform duration-700 ease-out motion-reduce:transition-none"
                            : "object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.08] motion-reduce:transition-none"}
                        />
                      )
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/20 to-black/0 transition-[opacity,background] duration-300 group-hover:from-black/78 group-hover:via-black/30" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <div className="inline-flex max-w-[90%] items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-[0.95rem] font-medium tracking-[-0.02em] text-white backdrop-blur-md transition-transform duration-300 ease-out group-hover:-translate-y-1">
                        <span>{categoryName}</span>
                        <ArrowRight className="h-4 w-4 flex-none transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </RevealGrid>
        </div>
      </section>

      {/* JAUNUMI */}
      <section>
        <div className="container">
          <h2 className="mb-4">{t(locale, "home.newArrivals")}</h2>
          <RevealGrid className="grid grid-flow-col auto-cols-[72%] gap-4 overflow-x-auto pb-2 sm:auto-cols-[46%] md:auto-cols-[32%] lg:auto-cols-[24%]">
            {newProducts.map((p) => (
              <div key={p.id} className="min-w-0">
                <ProductCard product={p} />
              </div>
            ))}
          </RevealGrid>
        </div>
      </section>

      {/* POPULĀRĀKĀS ĀRDURVIS */}
      <section>
        <div className="container">
          <h2 className="mb-6 text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] max-w-3xl">
            {t(locale, "home.popularExterior")}
          </h2>
          <RevealGrid className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {popularExterior.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </RevealGrid>
        </div>
      </section>

      <HowWeWorkSlider locale={locale} />

      {/* FAQ */}
      <section>
        <div className="container">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-muted">{t(locale, "home.faq.title")}</div>
            <h2 className="mt-3 text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">{faqIntroTitle}</h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-8 text-muted">{faqIntroText}</p>
          </div>

          <Accordion type="single" collapsible>
            {faqItems.map((item) => (
              <AccordionItem key={item.key} value={item.key}>
                <AccordionTrigger>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <GoogleReviews locale={locale} />

      {/* CTA teksta rindas */}
      <section>
        <div className="container">
          <div className="border-y border-line">
            {bottomLinks.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-300 ease-out hover:text-[var(--color-accent-dark)] sm:py-6 ${
                  index < bottomLinks.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="max-w-4xl text-[clamp(1.55rem,3vw,2.95rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-ink transition-transform duration-300 ease-out group-hover:translate-x-1">
                  {item.label}
                </span>
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-line text-ink transition-[transform,border-color,background-color] duration-300 ease-out group-hover:translate-x-1 group-hover:border-[color-mix(in_oklch,var(--border),var(--foreground)_14%)] group-hover:bg-white">
                  <ChevronRight className="h-5 w-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA josla */}
      <section>
        <div className="container">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-line bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(246,246,244,1)_100%)] px-6 py-7 sm:flex-row sm:items-center sm:px-10 sm:py-9">
            <div className="max-w-2xl text-[1.2rem] font-semibold leading-tight tracking-[-0.03em] text-ink sm:text-[1.6rem]">
              {t(locale, "home.ctaTitle")}
            </div>
            <MagneticButton>
              <Link
                href={withLocaleHref(locale, "/kontakti")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-white transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-premium"
              >
                {t(locale, "home.ctaButton")}
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
      {/* Floating CTA (mobile) */}
      <a
        href={withLocaleHref(locale, "/kontakti")}
        className="fixed right-3 bottom-3 z-40 inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-4 py-3 text-white shadow-premium hover:bg-[var(--color-accent-dark)] md:hidden"
        aria-label={t(locale, "home.floatingCta")}
      >
        <Phone size={18} /> {t(locale, "home.floatingCta")}
      </a>
    </main>
  );
}

