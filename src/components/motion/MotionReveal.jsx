"use client";

import { m, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function MotionReveal({
  as: Tag = m.div,
  index = 0,
  stagger = 0.06,
  delay = 0,
  className = "",
  children,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const d = delay || index * stagger;
  const MotionTag = typeof Tag === "string" && m[Tag] ? m[Tag] : Tag;

  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: prefersReducedMotion ? 0 : 0.22, delay: prefersReducedMotion ? 0 : d, ease: [0.2, 0.6, 0.2, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
