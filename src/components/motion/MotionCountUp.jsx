"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function MotionCountUp({
  value,
  format = (nextValue) => String(Math.round(nextValue)),
  duration = 0.28,
  delay = 0,
  className = "",
  as: Tag = "span",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const [animatedValue, setAnimatedValue] = useState(0);
  const currentValueRef = useRef(animatedValue);

  useEffect(() => {
    currentValueRef.current = animatedValue;
  }, [animatedValue]);

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion) return;

    let rafId = 0;
    const from = currentValueRef.current;
    const to = value;
    const startAt = performance.now() + delay * 1000;

    const tick = (now) => {
      if (now < startAt) {
        rafId = window.requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startAt;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = from + (to - from) * eased;

      setAnimatedValue(nextValue);

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [delay, duration, inView, prefersReducedMotion, value]);

  const displayValue = prefersReducedMotion ? value : animatedValue;

  return (
    <Tag ref={ref} className={className}>
      {format(displayValue)}
    </Tag>
  );
}
