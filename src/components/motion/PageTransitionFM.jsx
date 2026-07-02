"use client";

import { usePathname } from "next/navigation";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";

export default function PageTransitionFM({ children }) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={pathname}
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: [0.2, 0.6, 0.2, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
