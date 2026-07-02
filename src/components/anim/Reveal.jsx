"use client";

import { useEffect, useRef, useState } from "react";

export default function Reveal({
  as: Tag = "div",
  index = 0,
  stagger = 60,
  delay = 0,
  className = "",
  children,
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(!!mq.matches);
    update();
    try { mq.addEventListener("change", update); } catch { mq.addListener(update); }
    return () => { try { mq.removeEventListener("change", update); } catch { mq.removeListener(update); } };
  }, []);

  useEffect(() => {
    if (prefersReduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
          break;
        }
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [prefersReduced]);

  const style = prefersReduced ? undefined : {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(10px)",
    transition: "opacity 220ms ease, transform 220ms ease",
    transitionDelay: `${delay || index * stagger}ms`,
    willChange: "opacity, transform",
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
