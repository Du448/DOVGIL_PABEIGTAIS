"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MotionScrollFloat from "@/components/motion/MotionScrollFloat";
import { t, withLocaleHref } from "@/lib/i18n";

export default function HomeSpotlightCarousel({ locale, items }) {
  const safeItems = Array.isArray(items) ? items : [];
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
    if (safeItems.length < 2 || prefersReducedMotion || isHovering) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % safeItems.length);
    }, 5200);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isHovering, prefersReducedMotion, safeItems.length]);

  const goToSlide = (nextIndex) => {
    setActiveIndex((nextIndex + safeItems.length) % safeItems.length);
  };

  if (!safeItems.length) {
    return null;
  }

  const activeThemeDark = activeIndex % 2 === 1;

  return (
    <section
      className={activeThemeDark ? "bg-ink !py-0" : "bg-[--color-soft] !py-0"}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container py-[clamp(2rem,4vw,3.5rem)]">
        <div className="relative overflow-visible">
          <div className="relative lg:min-h-[640px]">
            {safeItems.map((item, index) => {
              const isActive = index === activeIndex;
              const isDark = index % 2 === 1;

              return (
                <div
                  key={item.id}
                  className={isActive ? "relative translate-x-0 opacity-100 transition-all duration-700 ease-out lg:absolute lg:inset-0" : index < activeIndex ? "pointer-events-none absolute inset-0 -translate-x-8 opacity-0 transition-all duration-700 ease-out" : "pointer-events-none absolute inset-0 translate-x-8 opacity-0 transition-all duration-700 ease-out"}
                  aria-hidden={!isActive}
                >
                  <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(360px,1fr)] lg:gap-16">
                    <div className={isDark ? "text-[--color-soft]" : "text-ink"}>
                      <div className={isDark ? "text-xs font-semibold uppercase tracking-[0.28em] text-white/60" : "text-xs font-semibold uppercase tracking-[0.28em] text-muted"}>
                        {item.eyebrow}
                      </div>
                      <h2 className={isDark ? "mt-4 max-w-3xl text-[clamp(3.25rem,7vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-[--color-soft]" : "mt-4 max-w-3xl text-[clamp(3.25rem,7vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-ink"}>
                        {item.name}
                      </h2>
                      <p className={isDark ? "mt-5 max-w-2xl text-[1.15rem] leading-8 text-white/80 sm:text-[1.25rem]" : "mt-5 max-w-2xl text-[1.15rem] leading-8 text-muted sm:text-[1.25rem]"}>
                        {item.tagline}
                      </p>
                      <p className={isDark ? "mt-4 max-w-2xl text-[0.98rem] leading-7 text-white/60" : "mt-4 max-w-2xl text-[0.98rem] leading-7 text-muted"}>
                        {item.short}
                      </p>
                      <div className="mt-8 flex flex-wrap gap-3">
                        <Button asChild size="lg" className="min-w-[11.5rem]">
                          <Link href={withLocaleHref(locale, `/produkts/${item.id}`)}>
                            {item.viewLabel}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          size="lg"
                          variant={isDark ? "secondary" : "outline"}
                          className={isDark ? "min-w-[13rem] border-transparent bg-white/10 text-[--color-soft] hover:bg-white/15 hover:text-[--color-soft]" : "min-w-[13rem] bg-white/80"}
                        >
                          <Link href={withLocaleHref(locale, `/kontakti?produkts=${encodeURIComponent(item.id)}`)}>
                            {t(locale, "product.requestOffer")}
                          </Link>
                        </Button>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-2.5">
                        {item.details.map((detail) => (
                          <span
                            key={`${item.id}-${detail}`}
                            className={isDark ? "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium tracking-[-0.01em] text-white/90" : "inline-flex items-center rounded-full border border-line bg-white/80 px-4 py-2 text-sm font-medium tracking-[-0.01em] text-ink"}
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    <MotionScrollFloat className="relative" range={10}>
                      <div className="relative mx-auto aspect-[4/4.6] w-full max-w-[620px] overflow-hidden">
                        <Image
                          src={item.image || "/next.svg"}
                          alt={item.alt || item.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 46vw"
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </MotionScrollFloat>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden -translate-y-1/2 lg:-inset-x-8 lg:flex lg:items-center lg:justify-between xl:-inset-x-12">
            <button
              type="button"
              onClick={() => goToSlide(activeIndex - 1)}
              className={activeThemeDark ? "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-premium" : "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"}
              aria-label={locale === "lv" ? "Iepriekšējais spotlight" : locale === "en" ? "Previous spotlight" : "Ankstesnis spotlight"}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeIndex + 1)}
              className={activeThemeDark ? "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-premium" : "pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"}
              aria-label={locale === "lv" ? "Nākamais spotlight" : locale === "en" ? "Next spotlight" : "Kitas spotlight"}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {safeItems.length > 1 ? (
            <>
              <div className="mt-8 flex items-center justify-between gap-4 pr-4 sm:pr-6">
                <div className="flex items-center gap-2">
                  {safeItems.map((item, index) => (
                    <button
                      key={`${item.id}-dot`}
                      type="button"
                      onClick={() => goToSlide(index)}
                      aria-label={`${item.name} ${index + 1}`}
                      className={index === activeIndex ? activeThemeDark ? "h-2 w-8 rounded-full bg-white transition-all duration-300" : "h-2 w-8 rounded-full bg-[var(--color-accent)] transition-all duration-300" : activeThemeDark ? "h-2 w-2 rounded-full bg-white/30 transition-all duration-300 hover:bg-white/60" : "h-2 w-2 rounded-full bg-line transition-all duration-300 hover:bg-[var(--color-accent)]/40"}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 lg:hidden">
                  <button
                    type="button"
                    onClick={() => goToSlide(activeIndex - 1)}
                    className={activeThemeDark ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-premium" : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"}
                    aria-label={locale === "lv" ? "Iepriekšējais spotlight" : locale === "en" ? "Previous spotlight" : "Ankstesnis spotlight"}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToSlide(activeIndex + 1)}
                    className={activeThemeDark ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-premium" : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-premium"}
                    aria-label={locale === "lv" ? "Nākamais spotlight" : locale === "en" ? "Next spotlight" : "Kitas spotlight"}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
