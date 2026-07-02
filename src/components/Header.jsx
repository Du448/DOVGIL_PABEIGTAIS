"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, ShoppingCart, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { getLocaleFromPathname, withLocaleHref, locales, t } from "@/lib/i18n";
import { readWishlistIds } from "@/lib/wishlist";
import { products, categories } from "@/data/products";

function NavLink({ href, children, highlight, overlay = false }) {
  return (
    <Link
      href={href}
      className={`group relative ${overlay ? "px-3 py-2 text-[13px] uppercase tracking-wide" : "px-2 py-1 text-sm sm:text-[15px]"} text-ink hover:text-ink ${highlight ? "text-accent" : ""}`}
    >
      <span className="inline-block">
        {children}
      </span>
      <span className="pointer-events-none absolute inset-x-1 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const hiddenRef = useRef(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const isHome = pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;
  const [openSuggest, setOpenSuggest] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const sync = () => setWishlistCount(readWishlistIds().length);
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("wishlist:change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wishlist:change", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || isHome) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;

    const reveal = () => {
      hiddenRef.current = false;
      gsap.to(el, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: true,
        onComplete: () => gsap.set(el, { clearProps: "transform" }),
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (!reduce) {
        const goingDown = y > lastY;
        if (goingDown && y > 180 && !hiddenRef.current) {
          hiddenRef.current = true;
          gsap.to(el, { yPercent: -100, duration: 0.45, ease: "power3.out", overwrite: true });
        } else if (!goingDown && hiddenRef.current) {
          reveal();
        }
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
      hiddenRef.current = false;
    };
  }, [isHome, pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (open || showSearch) {
      gsap.killTweensOf(el);
      gsap.set(el, { clearProps: "transform" });
      hiddenRef.current = false;
    }
  }, [open, showSearch]);

  const pathnameWithoutLocale = (() => {
    const parts = pathname.split("/").filter(Boolean);
    if (locales.includes(parts[0])) {
      const rest = parts.slice(1).join("/");
      return rest ? `/${rest}` : "/";
    }
    return pathname || "/";
  })();

  const buildLangHref = (nextLocale) => {
    if (pathnameWithoutLocale === "/") return `/${nextLocale}`;
    return `/${nextLocale}${pathnameWithoutLocale}`;
  };

  // Search: compute results for products and categories
  const trimmedQ = query.trim();
  const lowerQ = trimmedQ.toLowerCase();

  const popularCategories = useMemo(() => {
    const counts = new Map();
    for (const p of products) {
      counts.set(p.category, (counts.get(p.category) || 0) + 1);
    }
    const withMeta = categories.map((c) => ({ ...c, count: counts.get(c.slug) || 0 }));
    return withMeta.sort((a, b) => b.count - a.count).slice(0, 4);
  }, []);

  const matchedProducts = useMemo(() => {
    if (!lowerQ) return [];
    return products
      .filter((p) => {
        const inName = p.name?.toLowerCase().includes(lowerQ);
        const inCollection = p.collection?.toLowerCase().includes(lowerQ);
        const inColors = (p.colors || []).some((c) => c.toLowerCase().includes(lowerQ));
        return inName || inCollection || inColors;
      })
      .slice(0, 8);
  }, [lowerQ]);

  const matchedCategories = useMemo(() => {
    if (!lowerQ) return [];
    return categories
      .filter((c) => c.name.toLowerCase().includes(lowerQ) || c.slug.toLowerCase().includes(lowerQ))
      .slice(0, 5);
  }, [lowerQ]);

  const combined = useMemo(() => {
    const items = [];
    if (matchedProducts.length) {
      items.push({ type: "section", id: "products", label: t(locale, "search.products") || "Produkti" });
      for (const p of matchedProducts) items.push({ type: "product", id: p.id, data: p });
    }
    if (matchedCategories.length) {
      items.push({ type: "section", id: "categories", label: t(locale, "search.categories") || "Kategorijas" });
      for (const c of matchedCategories) items.push({ type: "category", id: c.slug, data: c });
    }
    return items;
  }, [matchedProducts, matchedCategories, locale]);

  // Open suggestions while typing/focus
  useEffect(() => {
    if (trimmedQ.length > 0) setOpenSuggest(true);
    setActiveIndex(() => {
      // set initial active to first non-section item
      const idx = combined.findIndex((x) => x.type !== "section");
      return idx >= 0 ? idx : -1;
    });
  }, [trimmedQ, combined.length]);

  // Close on route change
  useEffect(() => {
    setOpenSuggest(false);
    setShowSearch(false);
  }, [pathname]);

  useEffect(() => {
    const onPointerDown = (event) => {
      const headerEl = headerRef.current;
      if (!headerEl) return;
      if (headerEl.contains(event.target)) return;
      setOpenSuggest(false);
      setShowSearch(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  const selectItem = (item) => {
    if (!item) return;
    if (item.type === "product") {
      router.push(withLocaleHref(locale, `/produkts/${item.data.id}`));
      setOpenSuggest(false);
    } else if (item.type === "category") {
      router.push(withLocaleHref(locale, `/kategorija/${item.data.slug}`));
      setOpenSuggest(false);
    }
  };

  const closeMobileSearch = () => {
    setShowSearch(false);
    setOpenSuggest(false);
  };

  const onKeyDown = (e) => {
    if (!openSuggest) return;
    if (e.key === "Escape") {
      setOpenSuggest(false);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!combined.length) return;
      const dir = e.key === "ArrowDown" ? 1 : -1;
      let next = activeIndex;
      for (let i = 0; i < combined.length; i++) {
        next = (next + dir + combined.length) % combined.length;
        if (combined[next].type !== "section") break;
      }
      setActiveIndex(next);
    }
    if (e.key === "Enter") {
      if (activeIndex >= 0 && combined[activeIndex] && combined[activeIndex].type !== "section") {
        e.preventDefault();
        selectItem(combined[activeIndex]);
      }
    }
  };

  return (
    <header
      ref={headerRef}
      className={`${isHome ? "absolute" : "sticky"} top-0 z-50 w-full will-change-transform ${isHome ? "bg-transparent" : "bg-bg/95 backdrop-blur supports-backdrop-filter:bg-bg/80"} ${!isHome && scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.07)]" : ""} transition-shadow duration-300`}
    >
      {/* Top promo bar */}
      <div className={`text-white text-center text-xs sm:text-sm py-2 ${isHome ? "bg-accent/90" : "bg-accent"}`}>
        {t(locale, "header.promo")}
      </div>

      {/* Main bar */}
      <div className={`${isHome ? "border-b border-white/20 bg-transparent" : "border-b border-line bg-bg"}`}>
        <div className="container flex items-center gap-4 py-3">
          {/* Left: Logo */}
          <Link
            href={withLocaleHref(locale, "/")}
            className="relative flex h-10 w-[170px] shrink-0 items-center justify-start sm:h-12 sm:w-[200px]"
            aria-label="DOVGIL SIA"
          >
            <Image
              src="https://ik.imagekit.io/ohgqgb01i/4dcbf0ec-b809-4d3d-a7b3-b38f6e58f3d1.jpeg"
              alt="DOVGIL SIA logo"
              fill
              priority
              sizes="(max-width: 640px) 170px, 200px"
              className="object-contain object-left"
            />
          </Link>

          {/* Center: Search */}
          <div className={`flex-1 hidden md:flex items-center ${isHome ? "mt-0" : ""}`}>
            <form
              className="w-full max-w-xl relative"
              onSubmit={(e) => {
                e.preventDefault();
                const q = query.trim();
                if (q.length) router.push(withLocaleHref(locale, `/meklet?q=${encodeURIComponent(q)}`));
              }}
            >
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                <Search size={18} />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(locale, "nav.searchPlaceholder")}
                className="w-full rounded-full border border-black/10 bg-white/95 shadow-sm pl-10 pr-4 h-11 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent"
                aria-label={t(locale, "a11y.search")}
                onKeyDown={onKeyDown}
                onFocus={() => {
                  if (trimmedQ) setOpenSuggest(true);
                }}
              />
              {/* Command-style suggestions */}
              {openSuggest && (
                <div
                  ref={containerRef}
                  className="absolute z-40 mt-2 w-full max-w-xl rounded-lg border border-line bg-bg/95 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur"
                >
                  {combined.length > 0 ? (
                    <ul className="max-h-[60vh] overflow-auto py-2">
                      {combined.map((item, idx) => {
                        if (item.type === "section") {
                          return (
                            <li key={item.id} className="px-3 pt-3 pb-1 text-[12px] font-semibold tracking-wide text-muted uppercase">
                              {item.label}
                            </li>
                          );
                        }
                        if (item.type === "product") {
                          const p = item.data;
                          const active = idx === activeIndex;
                          return (
                            <li key={`p-${p.id}`}>
                              <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => selectItem(item)}
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                              >
                                <img src={p.images?.[0]} alt="" className="h-9 w-9 rounded-sm object-cover border border-line" />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[14px] text-ink">{p.name}</div>
                                  <div className="truncate text-[12px] text-muted">{p.collection} • €{p.price}</div>
                                </div>
                              </button>
                            </li>
                          );
                        }
                        if (item.type === "category") {
                          const c = item.data;
                          const active = idx === activeIndex;
                          return (
                            <li key={`c-${c.slug}`}>
                              <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => selectItem(item)}
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                              >
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-soft text-[12px] font-semibold text-ink">
                                  #{c.group?.[0] || c.name?.[0]}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[14px] text-ink">{c.name}</div>
                                  <div className="truncate text-[12px] text-muted">/{c.slug}</div>
                                </div>
                              </button>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  ) : (
                    <div className="p-4">
                      <div className="text-[14px] text-ink font-medium mb-1">{t(locale, "search.noResults") || "Nav rezultātu"}</div>
                      <div className="text-[13px] text-muted mb-3">{t(locale, "search.tryPopular") || "Apskati populārākās kategorijas"}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {popularCategories.map((c) => (
                          <button
                            key={c.slug}
                            type="button"
                            onClick={() => selectItem({ type: "category", data: c })}
                            className="rounded-md border border-line bg-white px-3 py-2 text-left hover:bg-soft"
                          >
                            <div className="text-[13px] text-ink">{c.name}</div>
                            <div className="text-[12px] text-muted">{c.count} {t(locale, "search.items") || "preces"}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Right: Icons */}
          <nav className="ml-auto flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 rounded-sm border border-line bg-white/70 px-1 py-1">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={buildLangHref(l)}
                  onClick={() => {
                    if (l !== locale) router.refresh();
                  }}
                  className={`px-2 py-1 text-xs font-semibold tracking-wide ${l === locale ? "text-accent" : "text-ink"}`}
                  aria-label={t(locale, "a11y.language").replace("{code}", l.toUpperCase())}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            {/* Mobile search icon */}
            <button
              className="md:hidden p-2 text-ink"
              aria-label={t(locale, "search.title")}
              onClick={() => {
                setShowSearch((value) => {
                  if (value) {
                    setOpenSuggest(false);
                  }
                  return !value;
                });
              }}
            >
              <Search size={22} />
            </button>
            <Link href={withLocaleHref(locale, "/velmes")} aria-label={t(locale, "wishlist.title")} className="relative p-2 text-ink hover:text-ink">
              <Heart size={22} />
              {wishlistCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[11px] leading-[18px] text-center">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
            <Link href={withLocaleHref(locale, "/grozs")} aria-label={t(locale, "cart.title")} className="p-2 text-ink hover:text-ink">
              <ShoppingCart size={22} />
            </Link>
            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 ${isHome ? "text-white" : "text-ink"}`}
              aria-label={t(locale, "category.filters")}
              onClick={() => setOpen((v) => !v)}
            >
              <span className={`block h-0.5 w-5 ${isHome ? "bg-white" : "bg-ink"} mb-1`}></span>
              <span className={`block h-0.5 w-5 ${isHome ? "bg-white" : "bg-ink"} mb-1`}></span>
              <span className={`block h-0.5 w-5 ${isHome ? "bg-white" : "bg-ink"}`}></span>
            </button>
          </nav>
        </div>

        {/* Mobile search (visible under main row) */}
        <div className="container md:hidden pb-3 px-2">
          <form
            className="relative"
            onSubmit={(e) => {
              e.preventDefault();
              const q = query.trim();
              if (q.length) router.push(withLocaleHref(locale, `/meklet?q=${encodeURIComponent(q)}`));
            }}
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <Search size={18} />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(locale, "nav.searchPlaceholder")}
              className="w-full rounded-full border border-black/10 bg-white/95 shadow-sm pl-10 pr-4 h-11 text-[15px] text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[--color-accent] focus:border-transparent"
              aria-label={t(locale, "a11y.search")}
              onFocus={() => {
                if (trimmedQ) setOpenSuggest(true);
              }}
              onKeyDown={onKeyDown}
            />
            {/* Mobile suggestions */}
            {openSuggest && (
              <div className="absolute z-40 mt-2 w-full rounded-lg border border-line bg-bg/95 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur">
                {combined.length > 0 ? (
                  <ul className="max-h-[60vh] overflow-auto py-2">
                    {combined.map((item, idx) => {
                      if (item.type === "section") {
                        return (
                          <li key={item.id} className="px-3 pt-3 pb-1 text-[12px] font-semibold tracking-wide text-muted uppercase">
                            {item.label}
                          </li>
                        );
                      }
                      if (item.type === "product") {
                        const p = item.data;
                        const active = idx === activeIndex;
                        return (
                          <li key={`mp-${p.id}`}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => selectItem(item)}
                              className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                            >
                              <img src={p.images?.[0]} alt="" className="h-9 w-9 rounded-sm object-cover border border-line" />
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[14px] text-ink">{p.name}</div>
                                <div className="truncate text-[12px] text-muted">{p.collection} • €{p.price}</div>
                              </div>
                            </button>
                          </li>
                        );
                      }
                      if (item.type === "category") {
                        const c = item.data;
                        const active = idx === activeIndex;
                        return (
                          <li key={`mc-${c.slug}`}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => selectItem(item)}
                              className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                            >
                              <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-soft text-[12px] font-semibold text-ink">
                                #{c.group?.[0] || c.name?.[0]}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[14px] text-ink">{c.name}</div>
                                <div className="truncate text-[12px] text-muted">/{c.slug}</div>
                              </div>
                            </button>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                ) : (
                  <div className="p-4">
                    <div className="text-[14px] text-ink font-medium mb-1">{t(locale, "search.noResults") || "Nav rezultātu"}</div>
                    <div className="text-[13px] text-muted mb-3">{t(locale, "search.tryPopular") || "Apskati populārākās kategorijas"}</div>
                    <div className="grid grid-cols-2 gap-2">
                      {popularCategories.map((c) => (
                        <button
                          key={c.slug}
                          type="button"
                          onClick={() => selectItem({ type: "category", data: c })}
                          className="rounded-md border border-line bg-white px-3 py-2 text-left hover:bg-soft"
                        >
                          <div className="text-[13px] text-ink">{c.name}</div>
                          <div className="text-[12px] text-muted">{c.count} {t(locale, "search.items") || "preces"}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile search overlay */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={() => setShowSearch(false)}
        >
          <div
            className="absolute inset-x-0 top-0 bg-bg border-b border-line p-3"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                const q = query.trim();
                if (q.length) {
                  router.push(withLocaleHref(locale, `/meklet?q=${encodeURIComponent(q)}`));
                  setShowSearch(false);
                }
              }}
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
                <Search size={18} />
              </span>
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t(locale, "nav.searchPlaceholder")}
                className="w-full rounded-sm border border-line bg-white pl-9 pr-10 py-2 text-[15px] placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[--color-accent]"
                aria-label={t(locale, "a11y.search")}
                onBlur={() => {
                  window.setTimeout(() => setOpenSuggest(false), 120);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeMobileSearch();
                  onKeyDown(e);
                }}
              />
              <button
                type="button"
                aria-label={t(locale, "a11y.close")}
                onClick={closeMobileSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted px-2"
              >
                ✕
              </button>
              {/* Overlay suggestions (mobile full-screen overlay) */}
              {openSuggest && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 rounded-lg border border-line bg-bg/95 shadow-[0_20px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur">
                  {combined.length > 0 ? (
                    <ul className="max-h-[65vh] overflow-auto py-2">
                      {combined.map((item, idx) => {
                        if (item.type === "section") {
                          return (
                            <li key={`os-${item.id}`} className="px-3 pt-3 pb-1 text-[12px] font-semibold tracking-wide text-muted uppercase">
                              {item.label}
                            </li>
                          );
                        }
                        if (item.type === "product") {
                          const p = item.data;
                          const active = idx === activeIndex;
                          return (
                            <li key={`op-${p.id}`}>
                              <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => selectItem(item)}
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                              >
                                <img src={p.images?.[0]} alt="" className="h-9 w-9 rounded-sm object-cover border border-line" />
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[14px] text-ink">{p.name}</div>
                                  <div className="truncate text-[12px] text-muted">{p.collection} • €{p.price}</div>
                                </div>
                              </button>
                            </li>
                          );
                        }
                        if (item.type === "category") {
                          const c = item.data;
                          const active = idx === activeIndex;
                          return (
                            <li key={`oc-${c.slug}`}>
                              <button
                                type="button"
                                onMouseEnter={() => setActiveIndex(idx)}
                                onClick={() => selectItem(item)}
                                className={`flex w-full items-center gap-3 px-3 py-2 text-left ${active ? "bg-soft" : "hover:bg-soft/70"}`}
                              >
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line bg-soft text-[12px] font-semibold text-ink">
                                  #{c.group?.[0] || c.name?.[0]}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <div className="truncate text-[14px] text-ink">{c.name}</div>
                                  <div className="truncate text-[12px] text-muted">/{c.slug}</div>
                                </div>
                              </button>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  ) : (
                    <div className="p-4">
                      <div className="text-[14px] text-ink font-medium mb-1">{t(locale, "search.noResults") || "Nav rezultātu"}</div>
                      <div className="text-[13px] text-muted mb-3">{t(locale, "search.tryPopular") || "Apskati populārākās kategorijas"}</div>
                      <div className="grid grid-cols-2 gap-2">
                        {popularCategories.map((c) => (
                          <button
                            key={c.slug}
                            type="button"
                            onClick={() => selectItem({ type: "category", data: c })}
                            className="rounded-md border border-line bg-white px-3 py-2 text-left hover:bg-soft"
                          >
                            <div className="text-[13px] text-ink">{c.name}</div>
                            <div className="text-[12px] text-muted">{c.count} {t(locale, "search.items") || "preces"}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Categories bar */}
      <div className={`${isHome ? "border-b border-white/20 bg-transparent" : "border-b border-line bg-bg"}`}>
        <div className="container">
          {/* Desktop nav */}
          {!isHome ? (
            <div className="hidden md:flex items-center gap-4 py-2">
              <NavLink href={withLocaleHref(locale, "/jaunumi")}>{t(locale, "nav.news")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kategorija/ardurvis-dzivoklim")}>{t(locale, "nav.exteriorApartment")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kategorija/ardurvis-privatmajai")}>{t(locale, "nav.exteriorHouse")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kategorija/ieksdurvis")}>{t(locale, "nav.interior")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kategorija/bidamas-durvis")}>{t(locale, "nav.sliding")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kategorija/sleptas-durvis")}>{t(locale, "nav.hidden")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/akcijas")} highlight>
                {t(locale, "nav.deals")}
              </NavLink>
              <NavLink href={withLocaleHref(locale, "/par-mums")}>{t(locale, "nav.about")}</NavLink>
              <NavLink href={withLocaleHref(locale, "/kontakti")}>{t(locale, "nav.contacts")}</NavLink>
            </div>
          ) : (
            <div className="hidden md:flex items-center justify-center py-3 mt-4 md:mt-6 lg:mt-8">
              <div className="mx-4 md:mx-6 lg:mx-10 w-full rounded-sm border border-black/10 bg-white/95 shadow-sm">
                <div className="flex items-center gap-1 px-2 whitespace-nowrap overflow-x-auto no-scrollbar">
                  <NavLink overlay href={withLocaleHref(locale, "/jaunumi")}>{t(locale, "nav.news")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kategorija/ardurvis-dzivoklim")}>{t(locale, "nav.exteriorApartment")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kategorija/ardurvis-privatmajai")}>{t(locale, "nav.exteriorHouse")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kategorija/ieksdurvis")}>{t(locale, "nav.interior")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kategorija/bidamas-durvis")}>{t(locale, "nav.sliding")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kategorija/sleptas-durvis")}>{t(locale, "nav.hidden")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/akcijas")} highlight>
                    {t(locale, "nav.deals")}
                  </NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/par-mums")}>{t(locale, "nav.about")}</NavLink>
                  <NavLink overlay href={withLocaleHref(locale, "/kontakti")}>{t(locale, "nav.contacts")}</NavLink>
                </div>
              </div>
            </div>
          )}

          {/* Mobile nav */}
          {open && (
            <div
              className="fixed inset-0 z-50 md:hidden"
              onClick={() => setOpen(false)}
            >
              <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
              <div
                className="absolute inset-x-0 top-0 max-h-[85vh] overflow-auto border-b border-line bg-bg shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-3 py-3 border-b border-line">
                  <div className="text-sm font-semibold tracking-wide text-ink">{t(locale, "category.filters")}</div>
                  <button
                    type="button"
                    aria-label={t(locale, "a11y.close")}
                    className="rounded-sm border border-line px-3 py-1.5 text-sm text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {t(locale, "a11y.close")}
                  </button>
                </div>

                <div className="flex flex-col py-2">
                  <div className="flex items-center gap-2 px-3 pt-2 pb-3">
                    {locales.map((l) => (
                      <Link
                        key={l}
                        href={buildLangHref(l)}
                        onClick={() => {
                          if (l !== locale) router.refresh();
                          setOpen(false);
                        }}
                        className={`rounded-sm border border-line px-2 py-1 text-xs font-semibold tracking-wide ${l === locale ? "text-accent" : "text-ink"}`}
                      >
                        {l.toUpperCase()}
                      </Link>
                    ))}
                  </div>

                  <Link href={withLocaleHref(locale, "/jaunumi")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.news")}</Link>
                  <Link href={withLocaleHref(locale, "/kategorija/ardurvis-dzivoklim")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.exteriorApartment")}</Link>
                  <Link href={withLocaleHref(locale, "/kategorija/ardurvis-privatmajai")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.exteriorHouse")}</Link>
                  <Link href={withLocaleHref(locale, "/kategorija/ieksdurvis")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.interior")}</Link>
                  <Link href={withLocaleHref(locale, "/kategorija/bidamas-durvis")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.sliding")}</Link>
                  <Link href={withLocaleHref(locale, "/kategorija/sleptas-durvis")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.hidden")}</Link>
                  <Link href={withLocaleHref(locale, "/akcijas")} onClick={() => setOpen(false)} className="px-3 py-2 text-accent">{t(locale, "nav.deals")}</Link>
                  <Link href={withLocaleHref(locale, "/par-mums")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.about")}</Link>
                  <Link href={withLocaleHref(locale, "/kontakti")} onClick={() => setOpen(false)} className="px-3 py-2 text-ink">{t(locale, "nav.contacts")}</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
