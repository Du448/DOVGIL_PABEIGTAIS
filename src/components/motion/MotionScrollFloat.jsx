"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function MotionScrollFloat({
  children,
  className = "",
  range = 12,
  as: Tag = m.div,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [range, 0, -range]);
  const MotionTag = typeof Tag === "string" && m[Tag] ? m[Tag] : Tag;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { y }}
    >
      {children}
    </MotionTag>
  );
}
