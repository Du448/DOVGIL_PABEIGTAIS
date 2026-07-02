"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocaleHref, t } from "@/lib/i18n";

export default function SearchClient() {
  const locale = getLocaleFromPathname(usePathname());
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();
  const lower = q.toLowerCase();

  const results = lower
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          (p.collection || "").toLowerCase().includes(lower)
      )
    : [];

  return (
    <>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "search.title")}</h1>
          <p className="mt-2 text-muted">
            {t(locale, "search.results")}: &quot;{q}&quot; ({results.length} {t(locale, "search.found")})
          </p>
        </div>
      </section>

      <section>
        <div className="container py-6">
          {q && results.length === 0 ? (
            <div className="text-ink">
              {t(locale, "search.nothingFound")} <Link className="text-accent underline" href={withLocaleHref(locale, "/")}>{t(locale, "search.backHome")}</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
