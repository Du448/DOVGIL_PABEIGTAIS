"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useCompare } from "@/lib/compare";
import { getProductById } from "@/data/products";
import { getLocaleFromPathname, withLocaleHref } from "@/lib/i18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function CompareBar() {
  const { ids, remove } = useCompare();
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const products = useMemo(() => ids.map((id) => getProductById(id)).filter(Boolean), [ids]);
  const removeLabel = locale === "lv" ? "Noņemt no salīdzināšanas" : locale === "lt" ? "Pašalinti iš palyginimo" : "Remove from compare";

  // Collapsible state persisted in localStorage
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("compareBar:collapsed");
      setCollapsed(raw === "1");
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("compareBar:collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  if (!ids.length) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur shadow-[0_-10px_30px_-20px_rgba(0,0,0,0.35)]">
      <div className="container py-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="rounded-sm border border-line px-2 py-1 text-[12px] text-ink hover:border-[--color-muted]"
              aria-pressed={collapsed}
            >
              {collapsed ? "Atvērt" : "Samazināt"}
            </button>
            <div className="text-[14px] text-ink font-medium shrink-0">Salīdzināt ({ids.length})</div>
          </div>

          {ids.length >= 2 ? (
            <Link href={withLocaleHref(locale, "/salidzinat")} className="rounded-md bg-[var(--color-accent)] px-4 py-2 text-white text-sm font-semibold hover:bg-[var(--color-accent-dark)] shadow-premium">
              Skatīt salīdzinājumu
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                alert((locale === "lv" ? "Lai skatītu salīdzinājumu, izvēlieties vismaz 2 produktus." : (locale === "lt" ? "Norėdami peržiūrėti palyginimą, pasirinkite bent 2 produktus." : "Select at least 2 products to view comparison.")));
              }}
              className="rounded-md bg-[var(--color-accent)]/70 px-4 py-2 text-white/90 text-sm font-semibold cursor-not-allowed"
              aria-disabled
            >
              Skatīt salīdzinājumu
            </button>
          )}
        </div>

        {!collapsed ? (
          <div className="mt-2 overflow-x-auto touch-pan-x snap-x snap-mandatory">
            <div className="flex items-center gap-3 pb-1">
              {products.map((p) => (
                <div key={p.id} className="relative flex items-center gap-2 rounded-sm border border-line bg-white pl-2 pr-6 py-1 min-w-0 snap-start">
                  <div className="relative h-10 w-12 rounded-sm border border-line bg-[--color-soft] overflow-hidden shrink-0">
                    {p.images?.[0] ? (
                      <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-contain" />
                    ) : null}
                  </div>
                  <div className="truncate max-w-[18ch] text-[13px] text-ink" title={p.name}>{p.name}</div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={removeLabel}
                        className="absolute right-1 top-1 inline-flex h-5 w-5 items-center justify-center rounded-sm text-muted hover:text-ink"
                        onClick={() => remove(p.id)}
                      >
                        ×
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{removeLabel}</TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
