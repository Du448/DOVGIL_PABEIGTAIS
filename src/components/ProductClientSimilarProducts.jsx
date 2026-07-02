"use client";

import ProductCard from "@/components/ProductCard";
import MotionReveal from "@/components/motion/MotionReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "@/lib/i18n";

export default function ProductClientSimilarProducts({ locale, similar }) {
  const items = Array.isArray(similar) ? similar : [];

  return (
    <section>
      <div className="container">
        <MotionReveal className="mb-3 flex items-center justify-between" index={0} y={12}>
          <h2 className="text-2xl font-semibold">{t(locale, "product.similar")}</h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              className="rounded-sm border border-line p-2 text-ink hover:border-[--color-muted]"
              onClick={() => {
                const scroller = document.getElementById("similar-scroll");
                if (scroller) scroller.scrollBy({ left: -320, behavior: "smooth" });
              }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="rounded-sm border border-line p-2 text-ink hover:border-[--color-muted]"
              onClick={() => {
                const scroller = document.getElementById("similar-scroll");
                if (scroller) scroller.scrollBy({ left: 320, behavior: "smooth" });
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </MotionReveal>
        <div id="similar-scroll" className="flex gap-4 overflow-x-auto no-scrollbar touch-pan-x snap-x snap-mandatory pb-2">
          {items.map((product, index) => (
            <MotionReveal key={product.id} index={index} className="snap-start shrink-0 w-[260px]" y={14}>
              <ProductCard product={product} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
