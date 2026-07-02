"use client";

import { Children } from "react";
import { m, useReducedMotion } from "framer-motion";

export default function RevealGrid({
  children,
  className = "",
  revealKey = "",
  y = 24,
  stagger = 0.07,
  as: Tag = "div",
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = typeof Tag === "string" && m[Tag] ? m[Tag] : m.div;
  const items = Children.toArray(children);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : stagger,
        delayChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : y,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.22,
        ease: [0.2, 0.6, 0.2, 1],
      },
    },
  };

  return (
    <MotionTag
      key={revealKey}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
    >
      {items.map((child, index) => (
        <m.div key={child.key ?? index} variants={itemVariants}>
          {child}
        </m.div>
      ))}
    </MotionTag>
  );
}
