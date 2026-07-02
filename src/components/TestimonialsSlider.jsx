"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

const testimonialImages = [
  {
    src: "https://images.unsplash.com/photo-1628744876657-abd5086695dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Pabeigta ārdurvju uzstādīšana mājas fasādē",
      en: "Completed exterior door installation on a house facade",
      lt: "Užbaigtas lauko durų montavimas namo fasade",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1552819401-700b5e342b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Pabeigta durvju montāža modernā, gaišā interjerā",
      en: "Finished door installation in a modern, bright interior",
      lt: "Baigtas durų montavimas moderniame, šviesiame interjere",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1730154838368-c37b1fdebcf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Durvju piegāde un sagatavošana profesionālai uzstādīšanai",
      en: "Door delivery and preparation for professional installation",
      lt: "Durų pristatymas ir paruošimas profesionaliam montavimui",
    },
  },
  {
    src: "https://images.unsplash.com/photo-1778731660315-698ade8a0bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Konsultācija un durvju projekta apskate objektā",
      en: "On-site consultation and door project review",
      lt: "Konsultacija vietoje ir durų projekto peržiūra",
    },
  },
];

const testimonialsByLocale = {
  lv: [
    {
      name: "Laura Bērziņa",
      location: "Mārupe",
      project: "Ārdurvis privātmājai",
      quote:
        "Montāža notika precīzi laikā, un meistari visu pabeidza ļoti tīri. Durvis izskatās vēl labāk nekā gaidījām.",
      imageIndex: 0,
    },
    {
      name: "Mārtiņš Ozols",
      location: "Rīga",
      project: "Dzīvokļa ārdurvis",
      quote:
        "Piedāvāja piemērotāko modeli un palīdzēja ar krāsu izvēli. Rezultāts ir kvalitatīvs un vizuāli ļoti tīrs.",
      imageIndex: 1,
    },
    {
      name: "Inese Kalniņa",
      location: "Jūrmala",
      project: "Iekšdurvis",
      quote:
        "Ļoti labs serviss no mērījuma līdz uzstādīšanai. Komanda strādā ātri, akurāti un ar uzmanību detaļām.",
      imageIndex: 2,
    },
    {
      name: "Andris Bērziņš",
      location: "Ķekava",
      project: "Slēptās durvis",
      quote:
        "Patika, ka komunikācija bija skaidra un bez liekas vilcināšanās. Noteikti iesakām arī citiem.",
      imageIndex: 3,
    },
  ],
  en: [
    {
      name: "Laura Berzina",
      location: "Mārupe",
      project: "Exterior doors for a house",
      quote:
        "Installation was right on time and the team left everything spotless. The doors look even better than we expected.",
      imageIndex: 0,
    },
    {
      name: "Martins Ozols",
      location: "Riga",
      project: "Apartment entrance doors",
      quote:
        "They recommended the right model and helped us choose the color. The result is clean, solid and high quality.",
      imageIndex: 1,
    },
    {
      name: "Inese Kalnina",
      location: "Jurmala",
      project: "Interior doors",
      quote:
        "Great service from measuring to installation. The crew works quickly, neatly and with real attention to detail.",
      imageIndex: 2,
    },
    {
      name: "Andris Berzins",
      location: "Kekava",
      project: "Hidden doors",
      quote:
        "Communication was clear and there was no unnecessary delay. We would gladly recommend them to others.",
      imageIndex: 3,
    },
  ],
  lt: [
    {
      name: "Laura Beržinienė",
      location: "Mārupė",
      project: "Lauko durys namui",
      quote:
        "Montavimas vyko tiksliai laiku, o komanda viską paliko labai tvarkingai. Durys atrodo dar geriau nei tikėjomės.",
      imageIndex: 0,
    },
    {
      name: "Martynas Ozolas",
      location: "Ryga",
      project: "Buto įėjimo durys",
      quote:
        "Pasiūlė tinkamiausią modelį ir padėjo pasirinkti spalvą. Rezultatas yra švarus, kokybiškas ir modernus.",
      imageIndex: 1,
    },
    {
      name: "Inesa Kalninė",
      location: "Jūrmala",
      project: "Vidaus durys",
      quote:
        "Puikus aptarnavimas nuo matavimo iki montavimo. Komanda dirba greitai, tvarkingai ir atidžiai.",
      imageIndex: 2,
    },
    {
      name: "Andrius Beržinskas",
      location: "Ķekava",
      project: "Paslėptos durys",
      quote:
        "Bendravimas buvo aiškus ir be jokių nereikalingų vėlavimų. Drąsiai rekomenduotume ir kitiems.",
      imageIndex: 3,
    },
  ],
};

function getTestimonialIntro(locale) {
  if (locale === "lv") {
    return "Reāli klientu iespaidi pēc uzstādīšanas";
  }

  if (locale === "en") {
    return "Real customer impressions after installation";
  }

  return "Tikri klientų įspūdžiai po montavimo";
}

function Stars() {
  return (
    <div className="flex items-center gap-1 text-amber-500" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={`star-${index}`} size={14} className="fill-current" />
      ))}
    </div>
  );
}

function TestimonialCard({ locale, testimonial }) {
  const image = testimonialImages[testimonial.imageIndex % testimonialImages.length];

  return (
    <article className="flex h-full flex-col rounded-[24px] border border-line/70 bg-white p-5 shadow-[0_16px_36px_-26px_rgba(15,23,42,0.32)] transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-line/60 bg-[--color-soft] sm:h-24 sm:w-24">
          <Image
            src={image.src}
            alt={image.alt[locale]}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <Stars />
            <span className="rounded-full border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/8 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]">
              5.0
            </span>
          </div>

          <div className="relative">
            <Quote className="absolute -left-1 -top-1 text-[var(--color-accent)]/15" size={24} />
            <p className="relative pl-5 text-[15px] leading-7 text-ink sm:text-[16px]">
              {testimonial.quote}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
        <div>
          <div className="text-[15px] font-semibold text-ink">{testimonial.name}</div>
          <div className="text-[13px] text-muted">{testimonial.location}</div>
        </div>
        <div className="rounded-full border border-line/70 bg-[--color-soft] px-3 py-1 text-[12px] font-medium text-muted">
          {testimonial.project}
        </div>
      </div>
    </article>
  );
}

export function TestimonialsSlider({ locale }) {
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const testimonials = useMemo(() => {
    return testimonialsByLocale[locale] ?? testimonialsByLocale.lv;
  }, [locale]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener?.("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener?.("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    handleSelect();
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleSelect);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion || isHovering) return;

    const timer = window.setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);

    return () => {
      window.clearInterval(timer);
    };
  }, [emblaApi, prefersReducedMotion, isHovering]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index) => emblaApi?.scrollTo(index);

  return (
    <section className="border-y border-line/50 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,248,1)_100%)]">
      <div className="container py-8 sm:py-10">
        <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted">{t(locale, "home.testimonials.title")}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {getTestimonialIntro(locale)}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-line/70 bg-white px-3 py-2 text-[12px] font-medium text-muted shadow-sm">
              {locale === "lv" ? "5.0 / 5 klientu vērtējums" : locale === "en" ? "5.0 / 5 customer rating" : "5.0 / 5 klientų įvertinimas"}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={scrollPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm transition-transform hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
                aria-label={locale === "lv" ? "Iepriekšējā atsauksme" : locale === "en" ? "Previous testimonial" : "Ankstesnis atsiliepimas"}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm transition-transform hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)]"
                aria-label={locale === "lv" ? "Nākamā atsauksme" : locale === "en" ? "Next testimonial" : "Kitas atsiliepimas"}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          className="overflow-hidden"
          ref={viewportRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="-ml-4 flex touch-pan-x">
            {testimonials.map((testimonial) => (
              <div key={`${testimonial.name}-${testimonial.location}`} className="min-w-0 shrink-0 basis-[88%] pl-4 sm:basis-[56%] lg:basis-[33.333%]">
                <TestimonialCard locale={locale} testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={`${testimonial.name}-dot`}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={locale === "lv" ? `Atsauksme ${index + 1}` : locale === "en" ? `Testimonial ${index + 1}` : `Atsiliepimas ${index + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  isActive ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-line hover:bg-[var(--color-accent)]/40"
                )}
              />
            );
          })}
        </div>

        <div className="mt-4 flex justify-center sm:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm"
              aria-label={locale === "lv" ? "Iepriekšējā atsauksme" : locale === "en" ? "Previous testimonial" : "Ankstesnis atsiliepimas"}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink shadow-sm"
              aria-label={locale === "lv" ? "Nākamā atsauksme" : locale === "en" ? "Next testimonial" : "Kitas atsiliepimas"}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSlider;
