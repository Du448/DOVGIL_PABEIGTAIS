"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Ruler, Truck, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

const slides = [
  {
    key: "consultation",
    image: "https://images.unsplash.com/photo-1758448500596-ce0e0239f1be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Konsultācija par durvju projektu modernā dzīvojamā interjerā",
      en: "Door project consultation in a modern residential interior",
      lt: "Durų projekto konsultacija moderniame gyvenamajame interjere",
    },
  },
  {
    key: "measurement",
    image: "https://images.unsplash.com/photo-1542354642-233af003db87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Precīza durvju ailes mērīšana objektā",
      en: "Precise door opening measurement on site",
      lt: "Tikslus durų angos matavimas objekte",
    },
  },
  {
    key: "delivery",
    image: "https://images.unsplash.com/photo-1730154838368-c37b1fdebcf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Piegādes brīdis ar sagatavotu iepakojumu un pārcelšanu uz objektu",
      en: "Delivery moment with prepared packaging and transport to the site",
      lt: "Pristatymo momentas su paruošta pakuote ir pervežimu į objektą",
    },
  },
  {
    key: "installation",
    image: "https://images.unsplash.com/photo-1778731660315-698ade8a0bd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600",
    alt: {
      lv: "Durvju uzstādīšana pabeigtā, gaišā interjerā",
      en: "Door installation in a finished, bright interior",
      lt: "Durų montavimas užbaigtame, šviesiame interjere",
    },
  },
];

function formatStepNumber(value) {
  return String(value).padStart(2, "0");
}

export default function HowWeWorkSlider({ locale }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
    if (prefersReducedMotion || isHovering) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isHovering, prefersReducedMotion]);

  const goToSlide = (nextIndex) => {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  };

  const steps = [
    {
      key: "consultation",
      number: 1,
      title: t(locale, "home.howWeWork.consultation"),
      description: t(locale, "home.howWeWork.consultationDesc"),
      icon: BadgeCheck,
    },
    {
      key: "measurement",
      number: 2,
      title: t(locale, "home.howWeWork.measurement"),
      description: t(locale, "home.howWeWork.measurementDesc"),
      icon: Ruler,
    },
    {
      key: "delivery",
      number: 3,
      title: t(locale, "home.howWeWork.delivery"),
      description: t(locale, "home.howWeWork.deliveryDesc"),
      icon: Truck,
    },
    {
      key: "installation",
      number: 4,
      title: t(locale, "home.howWeWork.installation"),
      description: t(locale, "home.howWeWork.installationDesc"),
      icon: Wrench,
    },
  ];

  return (
    <section>
      <div className="container">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">
              {t(locale, "home.howWeWork.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] leading-8 text-muted">
              {locale === "lv"
                ? "No pirmās sarunas līdz uzstādīšanai — viss notiek vienā plūsmā."
                : locale === "en"
                  ? "From first contact to installation — everything happens in one smooth flow."
                  : "Nuo pirmo pokalbių iki montavimo — viskas vyksta sklandžiai vienoje plūsmos."}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="group relative overflow-hidden rounded-[28px] border border-line bg-[--color-soft] shadow-premium"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
                <div className="absolute right-0 top-1/2 h-[24rem] w-[24rem] translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,170,115,0.16)_0%,rgba(212,170,115,0.06)_34%,transparent_72%)] blur-3xl" />
                <div className="absolute inset-x-[18%] bottom-[10%] h-16 rounded-[999px] bg-[linear-gradient(90deg,transparent_0%,rgba(212,170,115,0.22)_20%,rgba(212,170,115,0.06)_50%,rgba(212,170,115,0.22)_80%,transparent_100%)] blur-2xl" />
              </div>
              {slides.map((slide, index) => (
                <div
                  key={slide.key}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-out motion-reduce:transition-none",
                    index === activeIndex
                      ? "translate-x-0 opacity-100 scale-100"
                      : index < activeIndex
                        ? "-translate-x-6 opacity-0 scale-[1.02]"
                        : "translate-x-6 opacity-0 scale-[1.02]"
                  )}
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt?.[locale] || t(locale, `home.howWeWork.${slide.key}`) || slide.key}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-black/5 to-transparent" />
                </div>
              ))}

              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-2 p-4 sm:p-5">
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex - 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/82 text-ink backdrop-blur transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"
                  aria-label={locale === "lv" ? "Iepriekšējais slaids" : locale === "en" ? "Previous slide" : "Ankstesnė skaidrė"}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => goToSlide(activeIndex + 1)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 bg-white/82 text-ink backdrop-blur transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"
                  aria-label={locale === "lv" ? "Nākamais slaids" : locale === "en" ? "Next slide" : "Kita skaidrė"}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === activeIndex;
              const isCompleted = index < activeIndex;

              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "group flex w-full items-start gap-4 rounded-[24px] border px-5 py-5 text-left transition-all duration-300 hover:-translate-y-0.5 motion-reduce:transition-none",
                    isActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/5 shadow-premium"
                      : isCompleted
                        ? "border-[var(--color-accent)]/25 bg-white"
                        : "border-line bg-white/90"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold transition-all duration-300",
                      isActive
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                        : isCompleted
                          ? "border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                          : "border-line bg-white text-muted"
                    )}
                  >
                    {step.number}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-[16px] font-semibold tracking-[-0.02em] text-ink">
                      <Icon size={15} className={cn(isActive ? "text-[var(--color-accent)]" : "text-muted")} />
                      {step.title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-7 text-muted">{step.description}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={t(locale, `home.howWeWork.${slide.key}`)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeIndex ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-line hover:bg-[var(--color-accent)]/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
