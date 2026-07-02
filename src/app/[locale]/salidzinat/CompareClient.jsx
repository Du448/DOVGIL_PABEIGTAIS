"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { isWishlisted, toggleWishlistId } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { getProductById } from "@/data/products";
import { t, withLocaleHref } from "@/lib/i18n";

export default function CompareClient({ locale }) {
  const { ids, clear } = useCompare();
  const prods = ids.map((id) => getProductById(id)).filter(Boolean);
  const tTitle = t(locale, "compare.title");
  const title = tTitle === "compare.title" ? (locale === "lv" ? "Salīdzināšana" : locale === "lt" ? "Palyginimas" : "Comparison") : tTitle;
  const tClear = t(locale, "compare.clear");
  const clearLabel = tClear === "compare.clear" ? (locale === "lv" ? "Notīrīt" : locale === "lt" ? "Išvalyti" : "Clear") : tClear;
  const tEmpty = t(locale, "compare.empty");
  const emptyLabel = tEmpty === "compare.empty" ? (locale === "lv" ? "Nav izvēlētu produktu. Atgriezies un izvēlies līdz 4 produktiem." : locale === "lt" ? "Nėra pasirinktų produktų. Grįžkite ir pasirinkite iki 4 produktų." : "No selected products. Go back and choose up to 4 products.") : tEmpty;

  // Trigger re-render when wishlist changes so hearts reflect current state
  const [wlTick, setWlTick] = useState(0);
  useEffect(() => {
    const onWlChange = () => setWlTick((x) => x + 1);
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onWlChange);
      window.addEventListener("wishlist:change", onWlChange);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", onWlChange);
        window.removeEventListener("wishlist:change", onWlChange);
      }
    };
  }, []);

  // Locale-aware fallback for labels when i18n key is missing
  const tr = (key, lv, lt, en) => {
    const v = t(locale, key);
    if (v === key) {
      return locale === "lv" ? lv : locale === "lt" ? lt : en;
    }
    return v;
  };

  const rows = useMemo(() => {
    const norm = (v) => (v == null ? "" : String(v).trim());
    const byKey = {
      image: {
        label: tr("compare.image", "Attēls", "Paveikslėlis", "Image"),
        get: (p) => p.images?.[0] || null,
      },
      name: {
        label: tr("compare.name", "Nosaukums", "Pavadinimas", "Name"),
        get: (p) => p.name,
      },
      price: {
        label: tr("compare.price", "Cena", "Kaina", "Price"),
        get: (p) => (p.price != null ? `€${p.price}` : ""),
      },
      sizes: {
        label: tr("compare.sizes", "Izmēri", "Dydžiai", "Sizes"),
        get: (p) => (Array.isArray(p.sizes) ? p.sizes.join(", ") : ""),
      },
      frame: {
        label: tr("specs.frameThickness", "Kārbas biezums", "Staktos storis", "Frame thickness"),
        get: (p) => p.specs?.["Kārbas biezums"] || "",
      },
      leaf: {
        label: tr("specs.leafThickness", "Vērtnes biezums", "Varčios storis", "Leaf thickness"),
        get: (p) => p.specs?.["Vērtnes biezums"] || "",
      },
      locks: {
        label: tr("specs.locks", "Slēdzenes", "Spynos", "Locks"),
        get: (p) => p.specs?.["Slēdzenes"] || "",
      },
      filling: {
        label: tr("specs.filling", "Pildījums", "Užpildas", "Filling"),
        get: (p) => p.specs?.["Pildījums"] || "",
      },
      thermo: {
        label: tr("compare.thermo", "Termopārrāvums", "Termo pertrauka", "Thermal break"),
        get: (p) => (p.thermo ? (t(locale, "values.yes") || "Ir") : (t(locale, "values.no") || "Nav")),
      },
      weight: {
        label: tr("specs.weight", "Svars", "Svoris", "Weight"),
        get: (p) => p.specs?.["Svars"] || "",
      },
    };

    const keys = Object.keys(byKey);
    const data = keys.map((k) => {
      const values = prods.map((p) => norm(byKey[k].get(p)));
      const distinct = new Set(values.filter((v) => v !== "")).size > 1; // atšķirības
      return { key: k, label: byKey[k].label, values, distinct };
    });
    return data;
  }, [prods, locale]);

  // View mode: all specs vs only differences
  const [onlyDiff, setOnlyDiff] = useState(false);

  return (
    <main className="container py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        <div className="flex items-center gap-2">
          {prods.length > 0 ? (
            <div className="hidden sm:flex items-center gap-1 mr-1">
              <button
                type="button"
                className={`rounded-sm border px-3 py-1.5 text-sm ${!onlyDiff ? "bg-[--color-soft] border-line text-ink" : "border-line text-ink hover:border-[--color-muted]"}`}
                onClick={() => setOnlyDiff(false)}
                aria-pressed={!onlyDiff}
              >
                {tr("compare.showAll", "Rādīt visu", "Rodyti viską", "Show all")}
              </button>
              <button
                type="button"
                className={`rounded-sm border px-3 py-1.5 text-sm ${onlyDiff ? "bg-[--color-soft] border-line text-ink" : "border-line text-ink hover:border-[--color-muted]"}`}
                onClick={() => setOnlyDiff(true)}
                aria-pressed={onlyDiff}
              >
                {tr("compare.showDiff", "Tikai atšķirīgo", "Tik skirtumus", "Only differences")}
              </button>
            </div>
          ) : null}
          {prods.length > 0 ? (
            <button onClick={clear} className="rounded-sm border border-line px-3 py-1.5 text-sm hover:border-[--color-muted]">{clearLabel}</button>
          ) : null}
        </div>
      </div>

      {prods.length === 0 ? (
        <div className="text-muted">{emptyLabel}</div>
      ) : (
        <div className="overflow-x-auto touch-pan-x">
          <table className="min-w-[860px] w-full table-fixed border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky left-0 z-30 w-[9rem] min-w-[9rem] max-w-[9rem] bg-bg text-left text-[13px] font-semibold py-2 pr-4 text-muted shadow-[10px_0_18px_-14px_rgba(0,0,0,0.35)]"></th>
                {prods.map((p) => (
                  <th key={p.id} className="w-[220px] min-w-[220px] max-w-[220px] text-left py-2 px-3 align-top">
                    <div className="relative w-full aspect-[4/3] rounded-sm border border-line bg-[--color-soft] overflow-hidden mb-2">
                      {/* Wishlist on compare column */}
                      <button
                        type="button"
                        aria-label={t(locale, "a11y.addWishlist") || "Pievienot vēlmēm"}
                        className={`absolute right-2 top-2 z-10 rounded-sm bg-white/80 p-1.5 shadow-sm transition-colors hover:bg-white ${isWishlisted(p.id) ? "text-accent" : "text-ink"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlistId(p.id);
                          setWlTick((x) => x + 1);
                        }}
                      >
                        <Heart size={18} />
                      </button>
                      {p.images?.[0] ? (
                        <Image src={p.images[0]} alt={p.name} fill unoptimized sizes="220px" className="object-contain" />
                      ) : null}
                    </div>
                    <div className="text-[14px] text-ink font-medium mb-1 break-words" title={p.name}>{p.name}</div>
                    <div className="text-[13px] text-muted mb-2 break-words">{p.collection}</div>
                    <Link href={withLocaleHref(locale, `/kontakti?produkts=${encodeURIComponent(p.id)}`)} className="inline-block rounded-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-3 py-1.5 text-sm">{t(locale, "product.requestOffer")}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows
                .filter((row) => row.key !== "image")
                .filter((row) => (!onlyDiff ? true : row.distinct))
                .map((row) => (
                <tr key={row.key} className={row.distinct ? "bg-soft/60" : ""}>
                  <td className="sticky left-0 z-20 w-[9rem] min-w-[9rem] max-w-[9rem] bg-bg text-[13px] font-medium py-2 pr-4 align-top text-muted shadow-[10px_0_18px_-14px_rgba(0,0,0,0.35)]">{row.label}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="w-[220px] min-w-[220px] max-w-[220px] py-2 px-3 align-top text-[14px] text-ink break-words whitespace-normal">
                      {v || <span className="text-muted">—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
