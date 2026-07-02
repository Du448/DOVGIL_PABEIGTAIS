"use client";

import { useEffect, useMemo, useState } from "react";
import { Globe2, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, t } from "@/lib/i18n";

const STORAGE_KEY = "cookie-consent"; // values: "essential" | "all"
const PREFERENCES_KEY = "cookie-consent-preferences";

const COOKIE_CATEGORIES = [
  { key: "necessary", required: true },
  { key: "statistics" },
  { key: "marketing" },
  { key: "functional" },
  { key: "unclassified" },
];

const DEFAULT_PREFERENCES = COOKIE_CATEGORIES.reduce((preferences, category) => ({
  ...preferences,
  [category.key]: Boolean(category.required),
}), {});

export default function CookieConsent() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");
  const [choice, setChoice] = useState(null);
  const [isConsentReady, setIsConsentReady] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  const categoryLabels = useMemo(() => COOKIE_CATEGORIES.map((category) => ({
    ...category,
    label: t(locale, `privacy.categories.${category.key}`) || category.key,
  })), [locale]);

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      queueMicrotask(() => {
        if (v === "essential" || v === "all") setChoice(v);
        setIsConsentReady(true);
      });
    } catch {
      queueMicrotask(() => setIsConsentReady(true));
    }
  }, []);

  const save = (v, nextPreferences) => {
    try { localStorage.setItem(STORAGE_KEY, v); } catch {}
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(nextPreferences)); } catch {}
    setChoice(v);
    // optionally, emit a custom event so loaders can react
    try { window.dispatchEvent(new CustomEvent("cookie-consent", { detail: v })); } catch {}
  };

  const saveEssential = () => save("essential", DEFAULT_PREFERENCES);
  const saveAll = () => save("all", COOKIE_CATEGORIES.reduce((nextPreferences, category) => ({
    ...nextPreferences,
    [category.key]: true,
  }), {}));

  const togglePreference = (key) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: !currentPreferences[key],
    }));
  };

  // Hide banner until local storage is checked and once a decision exists
  if (!isConsentReady || choice === "essential" || choice === "all") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/55 px-4 py-6 backdrop-blur-[1px]">
      <section className="w-full max-w-[620px] rounded-[18px] bg-[#262626] px-5 py-6 text-white shadow-2xl sm:px-10" aria-labelledby="cookie-consent-title" role="dialog" aria-modal="true">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-consent-title" className="text-[19px] font-extrabold leading-tight sm:text-[22px]">
              {t(locale, "privacy.title") || "Šajā tīmekļa vietnē tiek izmantotas sīkdatnes"}
            </h2>
            <p className="mt-3 text-[13px] font-semibold leading-relaxed text-white/90 sm:text-[14px]">
              {t(locale, "privacy.cookiesNotice") || "Lai nodrošinātu interneta vietnes darbību, mēs izmantojam obligāti nepieciešamās sīkdatnes. Turpinot lietot mūsu vietni, jūs piekrītat šo sīkdatņu izmantošanai."}
            </p>
          </div>
          <Globe2 className="mt-1 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
        </div>

        <div className="mt-5 grid overflow-hidden border-y border-white/10 sm:grid-cols-5">
          {categoryLabels.map((category) => (
            <label key={category.key} className="flex min-h-[74px] cursor-pointer items-center justify-between gap-3 border-white/10 py-3 text-[12px] font-extrabold leading-tight sm:flex-col sm:justify-center sm:border-l sm:px-2 sm:text-center">
              <span>{category.label}</span>
              <input
                type="checkbox"
                className="peer sr-only"
                checked={preferences[category.key]}
                disabled={category.required}
                onChange={() => togglePreference(category.key)}
              />
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[6px] border-2 border-white/80 bg-transparent text-[13px] font-black text-white peer-checked:border-white/30 peer-checked:bg-white/35 peer-disabled:cursor-not-allowed">
                {preferences[category.key] ? "✓" : ""}
              </span>
            </label>
          ))}
        </div>

        {isDetailsOpen ? (
          <div className="mt-4 rounded-[12px] border border-white/10 bg-white/5 p-4 text-[13px] leading-relaxed text-white/85">
            {t(locale, "privacy.details") || "Nepieciešamās sīkdatnes nodrošina vietnes darbību. Pārējās kategorijas palīdz uzlabot saturu, funkcionalitāti un mērījumus tikai ar jūsu piekrišanu."}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button type="button" className="rounded-full border-2 border-white/65 px-5 py-3 text-[12px] font-extrabold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={saveEssential}>
            {t(locale, "privacy.useNecessaryOnly") || t(locale, "privacy.rejectNonEssential") || "Izmantot tikai nepieciešamās"}
          </button>
          <button type="button" className="rounded-full border-2 border-white/65 px-5 py-3 text-[12px] font-extrabold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={saveAll}>
            {t(locale, "privacy.acceptAll") || "Atļaut visas sīkdatnes"}
          </button>
        </div>

        <button type="button" className="mt-5 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wide text-white transition hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" onClick={() => setIsDetailsOpen((open) => !open)} aria-expanded={isDetailsOpen}>
          <Settings className="h-4 w-4" aria-hidden="true" />
          {isDetailsOpen ? (t(locale, "privacy.hideDetails") || "Paslēpt detaļas") : (t(locale, "privacy.showDetails") || "Rādīt detaļas")}
        </button>
      </section>
    </div>
  );
}
