"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccordionItem({ title, children, defaultOpen = false, open, onOpenChange }) {
  const isControlled = typeof open === "boolean";
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [hover, setHover] = useState(false);
  const bodyRef = useRef(null);
  const contentId = useId();
  const isOpen = isControlled ? open : internalOpen;

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;

    gsap.killTweensOf(body);
    gsap.set(body, { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 });
  }, [isOpen]);

  const toggle = () => {
    const body = bodyRef.current;
    const next = !isOpen;

    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);

    if (!body) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(body);

    if (reduce) {
      gsap.set(body, { height: next ? "auto" : 0, opacity: next ? 1 : 0 });
      return;
    }

    if (next) {
      gsap.fromTo(
        body,
        { height: 0, opacity: 0, y: -6 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => gsap.set(body, { height: "auto" }),
        }
      );
    } else {
      gsap.to(body, { height: 0, opacity: 0, y: -6, duration: 0.35, ease: "power2.inOut" });
    }
  };

  return (
    <div className="group overflow-hidden border-b border-gray-200">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-3 px-0 py-5 text-left text-ink transition-colors duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          isOpen || hover ? "" : ""
        )}
      >
        <span className="relative z-10 text-[18px] font-semibold tracking-tight sm:text-[19px]">{title}</span>
        <span
          className={cn(
            "relative z-10 inline-flex text-ink transition-transform duration-200 ease-out will-change-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        >
          <ChevronDown size={18} strokeWidth={1.8} />
        </span>
      </button>
      <div
        id={contentId}
        ref={bodyRef}
        className="overflow-hidden border-t border-gray-200 px-0"
        style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      >
        <div className="pb-5 pt-5 text-[15px] text-ink">{children}</div>
      </div>
    </div>
  );
}
