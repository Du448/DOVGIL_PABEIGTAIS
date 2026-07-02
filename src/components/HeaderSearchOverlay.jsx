"use client";

import Image from "next/image";
import { Search } from "lucide-react";

export default function HeaderSearchOverlay({
  activeIndex,
  combined,
  locale,
  openSuggest,
  popularCategories,
  query,
  router,
  selectItem,
  setActiveIndex,
  setOpenSuggest,
  setQuery,
  onClose,
  t,
  withLocaleHref,
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 md:hidden"
      onClick={onClose}
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
              onClose?.();
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
              if (e.key === "Escape") onClose?.();
              if (!openSuggest) return;
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
            }}
          />
          <button
            type="button"
            aria-label={t(locale, "a11y.close")}
            onClick={onClose}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted px-2"
          >
            ✕
          </button>
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
                            <Image src={p.images?.[0]} alt="" width={36} height={36} className="h-9 w-9 rounded-sm border border-line object-cover" />
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
  );
}
