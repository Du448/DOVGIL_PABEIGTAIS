"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, t } from "@/lib/i18n";

const prefersReduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroSlider({ slides }) {
  const locale = getLocaleFromPathname(usePathname());
  const safeSlides = Array.isArray(slides) && slides.length > 0 ? slides : [];
  const count = safeSlides.length;
  const kickerClassName = "text-white/78 text-[11px] sm:text-[12px] uppercase tracking-[0.28em]";
  const titleClassName = "text-white text-[clamp(3.4rem,6vw,6.6rem)] font-semibold leading-[0.92] tracking-[-0.07em] max-w-[12ch]";
  const subtitleClassName = "mt-4 max-w-xl text-white/82 text-[1rem] sm:text-[1.125rem] leading-8";
  const ctaClassName =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] sm:text-[1rem] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 active:translate-y-0";

  const rootRef = useRef(null);
  const slideRefs = useRef([]);
  const splitRef = useRef(null);
  const animatingRef = useRef(false);
  const activeRef = useRef(0);
  const touchStartRef = useRef({ x: 0, y: 0, active: false });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [gsapLib, setGsapLib] = useState(null);

  // Lazy-load GSAP and plugins on the client
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { SplitText } = await import("gsap/SplitText");
        if (mounted) {
          gsap.registerPlugin(ScrollTrigger, SplitText);
          setGsapLib(gsap);
        }
      } catch {
        // If GSAP fails to load, slider still functions without animations
        setGsapLib(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const animateContentIn = useCallback((slideEl, delay = 0) => {
    if (!gsapLib) return null;
    const img = slideEl.querySelector("[data-hero-img]");
    const card = slideEl.querySelector("[data-hero-card]");
    const titleEl = slideEl.querySelector("[data-hero-title]");
    const els = slideEl.querySelectorAll("[data-hero-el]");
    const tl = gsapLib.timeline({ delay, defaults: { ease: "power3.out" } });

    if (img) tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0);
    if (card) tl.fromTo(card, { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.15);
    if (titleEl) {
      if (splitRef.current?.revert) {
        splitRef.current.revert();
        splitRef.current = null;
      }
      try {
        // SplitText is registered on gsapLib
        const split = gsapLib.plugins?.SplitText?.create
          ? gsapLib.plugins.SplitText.create(titleEl, { type: "lines", mask: "lines" })
          : null;
        if (split) {
          splitRef.current = split;
          tl.from(split.lines, { yPercent: 110, duration: 0.85, stagger: 0.1 }, 0.3);
        } else {
          tl.fromTo(titleEl, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.3);
        }
      } catch {
        tl.fromTo(titleEl, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.3);
      }
    }
    if (els.length) tl.fromTo(els, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.09 }, 0.45);
    return tl;
  }, [gsapLib]);

  // Initialize slide state and parallax when GSAP is available
  useEffect(() => {
    if (!count) return;
    // Set initial visibility without gsap as well
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = i === 0 ? 1 : 0;
      el.style.zIndex = i === 0 ? 1 : 0;
    });

    if (!gsapLib || prefersReduced()) return;

    if (slideRefs.current[0]) animateContentIn(slideRefs.current[0], 0.15);

    const imgs = rootRef.current?.querySelectorAll("[data-hero-img]");
    if (imgs?.length) {
      gsapLib.to(imgs, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, [count, gsapLib, animateContentIn]);

  const goTo = useCallback((rawNext) => {
    if (!count || animatingRef.current) return;
    const next = ((rawNext % count) + count) % count;
    const cur = activeRef.current;
    if (next === cur) return;
    const curEl = slideRefs.current[cur];
    const nextEl = slideRefs.current[next];
    if (!curEl || !nextEl) return;

    activeRef.current = next;
    setActive(next);

    if (prefersReduced() || !gsapLib) {
      curEl.style.opacity = 0;
      curEl.style.zIndex = 0;
      nextEl.style.opacity = 1;
      nextEl.style.zIndex = 1;
      return;
    }

    animatingRef.current = true;
    gsapLib.set(nextEl, { zIndex: 2 });
    gsapLib.set(curEl, { zIndex: 1 });

    const tl = gsapLib.timeline({
      onComplete: () => {
        gsapLib.set(curEl, { autoAlpha: 0, zIndex: 0 });
        gsapLib.set(nextEl, { zIndex: 1 });
        animatingRef.current = false;
      },
    });
    tl.fromTo(nextEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.85, ease: "power2.inOut" }, 0);
    tl.add(animateContentIn(nextEl), 0.1);
  }, [count, gsapLib, animateContentIn]);

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setInterval(() => goTo(activeRef.current + 1), 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, paused]);

  const onKey = (e) => {
    if (e.key === "ArrowLeft") goTo(activeRef.current - 1);
    if (e.key === "ArrowRight") goTo(activeRef.current + 1);
  };

  const onTouchStart = (e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      active: true,
    };
  };

  const onTouchEnd = (e) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches?.[0];
    touchStartRef.current.active = false;
    if (!start.active || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40;

    if (!horizontalSwipe) return;
    if (deltaX > 0) goTo(activeRef.current - 1);
    else goTo(activeRef.current + 1);
  };

  return (
    <div
      ref={rootRef}
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKey}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      aria-label={t(locale, "hero.carouselLabel")}
    >
      <div className="relative h-[88vh] min-h-[720px] lg:h-screen lg:min-h-[860px] bg-white">
        {count ? (
          safeSlides.map((slide, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 1 : 0 }}
              aria-hidden={i !== active}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div data-hero-img className="relative h-full w-full max-w-none will-change-transform">
                  <Image
                    src={slide.image}
                    alt={slide.alt || slide.title || t(locale, "hero.imageAlt")}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10">
                <div className="container pb-6 sm:pb-8 lg:pb-10">
                  <div className="max-w-4xl">
                    <div
                      data-hero-card
                      className="max-w-3xl rounded-none border-0 bg-transparent p-0 shadow-none backdrop-blur-0"
                    >
                      {slide.kicker ? (
                        <div data-hero-el className={kickerClassName}>{slide.kicker}</div>
                      ) : null}
                      <div className="mt-3 flex flex-col">
                        {slide.title ? (
                          i === 0 ? (
                            <h1 data-hero-title className={titleClassName}>
                              {slide.title}
                            </h1>
                          ) : (
                            <p data-hero-title className={titleClassName}>
                              {slide.title}
                            </p>
                          )
                        ) : null}
                        {slide.subtitle ? (
                          <p data-hero-el className={subtitleClassName}>
                            {slide.subtitle}
                          </p>
                        ) : null}
                        {slide.cta ? (
                          <div data-hero-el className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
                            {slide.cta.map((btn, j) => {
                              const isPrimary = j === 0 || btn.variant !== "outline";
                              const isSecondary = !isPrimary;

                              if (isSecondary) {
                                return (
                                  <Link
                                    key={j}
                                    href={btn.href}
                                    tabIndex={i === active ? 0 : -1}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-white/92 transition-colors duration-200 hover:text-white"
                                  >
                                    <span>{btn.label}</span>
                                    <span aria-hidden="true">→</span>
                                  </Link>
                                );
                              }

                              return (
                                <Link
                                  key={j}
                                  href={btn.href}
                                  tabIndex={i === active ? 0 : -1}
                                  className={`${isPrimary ? "bg-white text-ink hover:bg-white/90 hover:shadow-premium" : "border border-white/30 bg-white/10 text-white hover:bg-white/15"} ${ctaClassName}`}
                                >
                                  <span>{btn.label}</span>
                                  <span aria-hidden="true">→</span>
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">{t(locale, "hero.noSlides")}</div>
        )}
      </div>

      {/* Controls */}
      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(activeRef.current - 1)}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-white/10 p-3 text-white backdrop-blur-md transition-[background-color,transform,box-shadow] duration-200 hover:bg-white/18 hover:shadow-premium hover:scale-[1.03] active:scale-95"
            aria-label={t(locale, "hero.prevSlide")}
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeRef.current + 1)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-white/10 p-3 text-white backdrop-blur-md transition-[background-color,transform,box-shadow] duration-200 hover:bg-white/18 hover:shadow-premium hover:scale-[1.03] active:scale-95"
            aria-label={t(locale, "hero.nextSlide")}
          >
            <ChevronRight />
          </button>

          <div className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/60"}`}
                aria-label={t(locale, "hero.goToSlide").replace("{n}", String(i + 1))}
              />)
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
