"use client";

import Image from "next/image";
import { t } from "@/lib/i18n";
import { useCallback, useEffect, useRef } from "react";

export default function ProductLightbox({ images = [], index = 0, setIndex, onClose, locale, productName }) {
  const hasImages = Array.isArray(images) && images.length > 0;
  const imageCount = hasImages ? images.length : 1;
  const touchStartRef = useRef({ x: 0, y: 0, active: false });
  const goPrev = useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i - 1 + imageCount) % imageCount);
  }, [hasImages, imageCount, setIndex]);
  const goNext = useCallback(() => {
    if (!hasImages) return;
    setIndex((i) => (i + 1) % imageCount);
  }, [hasImages, imageCount, setIndex]);

  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const onTouchStart = useCallback((e) => {
    const touch = e.touches?.[0];
    if (!touch) return;
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      active: true,
    };
  }, []);

  const onTouchEnd = useCallback((e) => {
    const start = touchStartRef.current;
    const touch = e.changedTouches?.[0];
    touchStartRef.current.active = false;
    if (!start.active || !touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const horizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40;

    if (!horizontalSwipe) return;
    if (deltaX > 0) goPrev();
    else goNext();
  }, [goNext, goPrev]);

  useEffect(() => {
    // Focus close button when opened
    closeBtnRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "Tab") {
        // simple focus trap
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const list = Array.from(focusables).filter((el) => !el.hasAttribute("disabled"));
        if (!list.length) return;
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, onClose]);

  if (!hasImages) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-white"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={productName}
    >
      <div
        ref={dialogRef}
        className="relative w-full h-full p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (top-right) */}
        <button
          type="button"
          className="absolute right-4 top-4 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/90 text-ink shadow-md hover:bg-ink/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white text-3xl"
          aria-label={t(locale, "product.close")}
          onClick={onClose}
          ref={closeBtnRef}
        >
          ✕
        </button>

        {/* Main image area */}
        <div className="relative mx-auto max-w-6xl h-[68vh] sm:h-[72vh] bg-white rounded-sm overflow-hidden">
          <div
            className="absolute inset-0 h-full w-full flex transition-transform duration-500 ease-out [transform:translateX(var(--slide-x))]"
            style={{ "--slide-x": `-${index * 100}%` }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {images.map((src, idx) => (
              <div key={`lightbox-${idx}`} className="relative h-full w-full shrink-0 grow-0 basis-full">
                <Image
                  src={src}
                  alt={`${productName} – palielināts attēls ${idx + 1}`}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="100vw"
                  loading="eager"
                  priority={idx === index}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Side arrows */}
          <button
            type="button"
            aria-label={t(locale, "product.previous")}
            className="absolute z-10 left-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/90 text-ink shadow-md hover:bg-ink/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] text-3xl font-bold"
            onClick={goPrev}
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={t(locale, "product.next")}
            className="absolute z-10 right-4 top-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white/90 text-ink shadow-md hover:bg-ink/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] text-3xl font-bold"
            onClick={goNext}
          >
            ›
          </button>
        </div>

        {/* Thumbnails strip */}
        <div className="mt-4 w-full flex justify-center">
          <div className="max-w-6xl w-full overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-center gap-2">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  className={`relative group h-16 w-16 shrink-0 rounded-sm border ${idx === index ? 'border-[--color-accent]' : 'border-line'} bg-[--color-soft] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink]`}
                  onClick={() => setIndex(idx)}
                  onMouseEnter={() => setIndex(idx)}
                  onFocus={() => setIndex(idx)}
                  aria-label={t(locale, "product.imageN").replace("{n}", String(idx + 1))}
                >
                  <span className="relative block h-full w-full overflow-hidden">
                    <Image src={src} alt={`${productName} thumbnails`} fill referrerPolicy="no-referrer" sizes="100px" loading="lazy" className="object-contain" />
                  </span>
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-sm ring-2 ring-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
