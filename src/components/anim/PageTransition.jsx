"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [prefersReduced, setPrefersReduced] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(!!mq.matches);
    update();
    try { mq.addEventListener("change", update); } catch { mq.addListener(update); }
    return () => {
      try { mq.removeEventListener("change", update); } catch { mq.removeListener(update); }
    };
  }, []);

  useEffect(() => {
    if (prefersReduced) return; // no animation
    const el = ref.current;
    if (!el) return;
    // start hidden then fade/slide in quickly
    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";
    el.style.transition = "opacity 220ms ease, transform 220ms ease";
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0px)";
    });
  }, [pathname, prefersReduced]);

  return (
    <div key={pathname} ref={ref}>
      {children}
    </div>
  );
}
