"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getLocaleFromPathname, withLocaleHref, t } from "@/lib/i18n";
import { readWishlistIds } from "@/lib/wishlist";
import { getProductById } from "@/data/products";

export default function WishlistClient() {
  const locale = getLocaleFromPathname(usePathname());
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const sync = () => setIds(readWishlistIds());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("wishlist:change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wishlist:change", sync);
    };
  }, []);

  const products = useMemo(() => {
    return ids
      .map((id) => getProductById(id))
      .filter(Boolean);
  }, [ids]);

  if (!products.length) {
    return (
      <div className="container py-10">
        <div className="rounded-sm border border-line bg-white p-6 text-[15px] text-muted">
          {t(locale, "wishlist.empty")}
          <div className="mt-4">
            <Link
              href={withLocaleHref(locale, "/")}
              className="inline-flex rounded-sm bg-accent px-5 py-2 text-white hover:opacity-95"
            >
              {t(locale, "search.backHome")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <div key={p.id} className="min-w-0">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
