"use client";

import Link from "next/link";

export default function HeaderMobileDrawer({
  locale,
  locales,
  buildLangHref,
  setOpen,
  router,
  t,
  withLocaleHref,
}) {
  return (
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
  );
}
