"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronDownCircle, Check, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import MotionReveal from "@/components/motion/MotionReveal";
import RevealGrid from "@/components/anim/RevealGrid";
import { getProductsByCategory, getCategoryBySlug } from "@/data/products";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getLocaleFromPathname, withLocaleHref, t } from "@/lib/i18n";
import { categories as allCategoriesData } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function CategoryClient({ slug }) {
  const locale = getLocaleFromPathname(usePathname());
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const category = getCategoryBySlug(slug);
  const allProducts = getProductsByCategory(slug);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const collectionOptions = Array.from(new Set(allProducts.map((p) => p.collection).filter(Boolean)));
  const colorOptions = Array.from(new Set(allProducts.flatMap((p) => p.colors || [])));

  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [collectionSearch, setCollectionSearch] = useState("");
  const [colorSearch, setColorSearch] = useState("");

  const colorTokenMaps = {
    en: {
      antracīts: "anthracite",
      antracits: "anthracite",
      balts: "white",
      melns: "black",
      mats: "matte",
      supermats: "super matte",
      dienvidu: "southern",
      betons: "concrete",
      oksīds: "oxide",
      oksids: "oxide",
      tumšs: "dark",
      tums: "dark",
      koks: "wood",
      ozols: "oak",
      tabakas: "tobacco",
      sudraba: "silver",
      sudrabots: "silver",
      horizontāls: "horizontal",
      horizontal: "horizontal",
      pelēks: "grey",
      peleks: "grey",
      zelta: "gold",
      priede: "pine",
      provanss: "provence",
      tīka: "teak",
      tika: "teak",
      sonomas: "sonoma",
      sagrēns: "textured",
      sagrēns: "textured",
    },
    lt: {
      antracīts: "antracitas",
      antracits: "antracitas",
      balts: "balta",
      melns: "juoda",
      mats: "matinis",
      supermats: "super matinis",
      dienvidu: "pietų",
      betons: "betonas",
      oksīds: "oksidas",
      oksids: "oksidas",
      tumšs: "tamsus",
      tums: "tamsus",
      koks: "mediena",
      ozols: "ąžuolas",
      tabakas: "tabako",
      sudraba: "sidabro",
      sudrabots: "sidabrinis",
      horizontāls: "horizontalus",
      horizontal: "horizontalus",
      pelēks: "pilkas",
      peleks: "pilkas",
      zelta: "auksinis",
      priede: "pušis",
      provanss: "provansas",
      tīka: "tikas",
      tika: "tikas",
      sonomas: "sonomos",
      sagrēns: "faktūrinė",
      sagrēns: "faktūrinė",
    },
  };

  const translateColorLabel = (value) => {
    if (locale === "lv") return value;

    const map = locale === "en" ? colorTokenMaps.en : colorTokenMaps.lt;
    const parts = String(value).split(" ");

    const translated = parts.map((p) => {
      const lower = p.toLowerCase();
      if (lower.startsWith("ral")) return p.toUpperCase();
      const next = map[lower];
      if (!next) return p;
      const isCapitalized = p[0] === p[0]?.toUpperCase();
      return isCapitalized ? `${next[0].toUpperCase()}${next.slice(1)}` : next;
    });

    return translated.join(" ");
  };

  const selectedCollections = searchParams?.getAll("kolekcija") || [];
  const selectedColors = searchParams?.getAll("krasa") || [];
  const priceMin = searchParams?.get("cena_no") || "";
  const priceMax = searchParams?.get("cena_lidz") || "";
  const thermoParam = searchParams?.get("termo") || "all";
  const thermoFilter = ["all", "yes", "no"].includes(thermoParam) ? thermoParam : "all";
  const glassOnly = searchParams?.get("stikls") === "1";
  const newOnly = searchParams?.get("jaunumi") === "1";
  const clearanceOnly = searchParams?.get("akcija") === "1";
  const sortParam = searchParams?.get("kartot") || "popular";
  const sort = ["popular", "cheap", "expensive", "new"].includes(sortParam) ? sortParam : "popular";

  const updateSearchParams = (updater) => {
    const sp = new URLSearchParams(searchParams?.toString() || "");
    updater(sp);
    const nextQS = sp.toString();
    router.replace(nextQS ? `${pathname}?${nextQS}` : pathname, { scroll: false });
  };

  const setMultiValueParam = (param, values) => {
    updateSearchParams((sp) => {
      sp.delete(param);
      values.forEach((value) => sp.append(param, value));
    });
  };

  const toggleMultiValueParam = (param, values, value) => {
    const nextValues = values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
    setMultiValueParam(param, nextValues);
  };

  const setSingleValueParam = (param, value, defaultValue = "") => {
    updateSearchParams((sp) => {
      if (value === "" || value === defaultValue) {
        sp.delete(param);
        return;
      }
      sp.set(param, String(value));
    });
  };

  const clearFilters = () => {
    updateSearchParams((sp) => {
      ["kolekcija", "krasa", "cena_no", "cena_lidz", "termo", "stikls", "jaunumi", "akcija"].forEach((key) => sp.delete(key));
    });
  };

  let filtered = [...allProducts];
  if (selectedCollections.length) filtered = filtered.filter((p) => selectedCollections.includes(p.collection));
  if (selectedColors.length) filtered = filtered.filter((p) => (p.colors || []).some((c) => selectedColors.includes(c)));
  if (priceMin !== "") {
    const min = Number(priceMin);
    if (!Number.isNaN(min)) filtered = filtered.filter((p) => p.price >= min);
  }
  if (priceMax !== "") {
    const max = Number(priceMax);
    if (!Number.isNaN(max)) filtered = filtered.filter((p) => p.price <= max);
  }
  if (thermoFilter !== "all") {
    const want = thermoFilter === "yes";
    filtered = filtered.filter((p) => (typeof p.thermo === "boolean" ? p.thermo === want : false));
  }
  if (glassOnly) filtered = filtered.filter((p) => p.glass === true);
  if (newOnly) filtered = filtered.filter((p) => p.isNew === true);
  if (clearanceOnly) filtered = filtered.filter((p) => p.clearance === true);

  switch (sort) {
    case "cheap":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "expensive":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "new":
      filtered.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    default:
      break;
  }

  if (!category) {
    return (
      <main className="container py-10">
        <div className="text-ink">{t(locale, "category.notFound")}</div>
      </main>
    );
  }

  const categoryName =
    t(locale, `categories.details.${slug}.name`) !== `categories.details.${slug}.name`
      ? t(locale, `categories.details.${slug}.name`)
      : t(locale, `categories.${slug}`);

  const resolvedDescription =
    t(locale, `categories.details.${slug}.description`) !== `categories.details.${slug}.description`
      ? t(locale, `categories.details.${slug}.description`)
      : category.description;

  const isPrivateHouse = slug === "ardurvis-privatmajai";

  const typeOptions = [
    "ardurvis-dzivoklim",
    "ardurvis-privatmajai",
    "ieksdurvis",
    "bidamas-durvis",
    "sleptas-durvis",
  ];

  const typeTitle = t(locale, "category.doorTypeTitle");

  const labelForSlug = (s) => {
    const k1 = t(locale, `categories.details.${s}.name`);
    if (k1 !== `categories.details.${s}.name`) return k1;
    const k2 = t(locale, `categories.${s}`);
    if (k2 !== `categories.${s}`) return k2;
    const fromData = allCategoriesData.find((c) => c.slug === s)?.name;
    return fromData || s;
  };

  const searchPlaceholder = t(locale, "category.searchPlaceholder");
  const collectionQuery = collectionSearch.trim().toLowerCase();
  const colorQuery = colorSearch.trim().toLowerCase();
  const filteredCollections = collectionOptions.filter((c) => c.toLowerCase().includes(collectionQuery));
  const filteredColors = colorOptions.filter((c) => {
    const base = String(c).toLowerCase();
    const translated = String(translateColorLabel(c)).toLowerCase();
    return base.includes(colorQuery) || translated.includes(colorQuery);
  });
  const normalizeFilterText = (value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const anthraciteColorValues = colorOptions.filter((c) => {
    const raw = normalizeFilterText(c);
    const translated = normalizeFilterText(translateColorLabel(c));
    return raw.includes("antracit") || translated.includes("anthrac");
  });
  const anthraciteFilterKey = anthraciteColorValues.slice().sort().join("|");
  const selectedColorKey = selectedColors.slice().sort().join("|");
  const isAnthraciteActive = anthraciteColorValues.length > 0 && anthraciteFilterKey === selectedColorKey;
  const hasActiveFilters =
    selectedCollections.length ||
    selectedColors.length ||
    priceMin !== "" ||
    priceMax !== "" ||
    thermoFilter !== "all" ||
    glassOnly ||
    newOnly ||
    clearanceOnly;
  const quickFilters = [
    {
      key: "anthracite",
      label: t(locale, "category.quickFilterAnthracite"),
      active: isAnthraciteActive,
      disabled: anthraciteColorValues.length === 0,
      onClick: () => setMultiValueParam("krasa", isAnthraciteActive ? [] : anthraciteColorValues),
    },
    {
      key: "thermo",
      label: t(locale, "category.quickFilterThermo"),
      active: thermoFilter === "yes",
      disabled: !allProducts.some((p) => p.thermo === true),
      onClick: () => setSingleValueParam("termo", thermoFilter === "yes" ? "all" : "yes", "all"),
    },
    {
      key: "glass",
      label: t(locale, "category.quickFilterGlass"),
      active: glassOnly,
      disabled: !allProducts.some((p) => p.glass === true),
      onClick: () => setSingleValueParam("stikls", glassOnly ? "" : "1"),
    },
    {
      key: "budget",
      label: t(locale, "category.quickFilterBudget"),
      active: priceMin === "" && priceMax === "400",
      disabled: !allProducts.some((p) => p.price <= 400),
      onClick: () => {
        const isActive = priceMin === "" && priceMax === "400";
        updateSearchParams((sp) => {
          sp.delete("cena_no");
          if (isActive) {
            sp.delete("cena_lidz");
            return;
          }
          sp.set("cena_lidz", "400");
        });
      },
    },
    {
      key: "premium",
      label: t(locale, "category.quickFilterPremium"),
      active: priceMin === "800" && priceMax === "",
      disabled: !allProducts.some((p) => p.price >= 800),
      onClick: () => {
        const isActive = priceMin === "800" && priceMax === "";
        updateSearchParams((sp) => {
          sp.delete("cena_lidz");
          if (isActive) {
            sp.delete("cena_no");
            return;
          }
          sp.set("cena_no", "800");
        });
      },
    },
    {
      key: "new",
      label: t(locale, "category.quickFilterNew"),
      active: newOnly,
      disabled: !allProducts.some((p) => p.isNew === true),
      onClick: () => setSingleValueParam("jaunumi", newOnly ? "" : "1"),
    },
    {
      key: "sale",
      label: t(locale, "category.quickFilterSale"),
      active: clearanceOnly,
      disabled: !allProducts.some((p) => p.clearance === true),
      onClick: () => setSingleValueParam("akcija", clearanceOnly ? "" : "1"),
    },
  ];

  const Filters = (
    <div className="w-full max-w-[220px] shrink-0 md:sticky md:top-20 relative z-0">
      <div className="mb-6">
        <div className="mb-3 border-b border-line pb-2 text-[13px] font-semibold uppercase tracking-wider text-ink">{typeTitle}</div>
        <div className="space-y-0.5">
          {typeOptions.map((s) => (
            <label key={s} className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
              <input
                type="radio"
                name="door-type"
                className="h-4 w-4 accent-[--color-accent]"
                checked={slug === s}
                onChange={() => router.push(withLocaleHref(locale, `/kategorija/${s}`))}
              />
              <span>{labelForSlug(s)}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setCollectionsOpen((v) => { const next = !v; if (next) setColorsOpen(false); return next; })}
          aria-expanded={collectionsOpen}
          className="mb-3 flex w-full items-center justify-between border-b border-line pb-2 text-[13px] font-semibold uppercase tracking-wider text-ink hover:text-ink"
        >
          <span>{t(locale, "category.collection")}</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm text-muted group-hover:text-ink">
            {collectionsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
        {collectionsOpen ? (
          <>
            <div className="mb-2">
              <input
                type="text"
                value={collectionSearch}
                onChange={(e) => setCollectionSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-h-9 w-full rounded-sm border border-line bg-white px-2 py-1 text-[13px] text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
              />
            </div>
            <div className="max-h-80 overflow-y-auto pr-1"><div className="space-y-0.5">
              {filteredCollections.map((c) => (
                <label key={c} className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[--color-accent]"
                    checked={selectedCollections.includes(c)}
                    onChange={() => toggleMultiValueParam("kolekcija", selectedCollections, c)}
                  />
                  <span>{c}</span>
                </label>
              ))}
              {!filteredCollections.length ? (
                <div className="px-2 py-2 text-sm text-muted">—</div>
              ) : null}
            </div></div>
          </>
        ) : null}
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setColorsOpen((v) => { const next = !v; if (next) setCollectionsOpen(false); return next; })}
          aria-expanded={colorsOpen}
          className="mb-3 flex w-full items-center justify-between border-b border-line pb-2 text-[13px] font-semibold uppercase tracking-wider text-ink hover:text-ink"
        >
          <span>{t(locale, "category.color")}</span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm text-muted group-hover:text-ink">
            {colorsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>
        {colorsOpen ? (
          <>
            <div className="mb-2">
              <input
                type="text"
                value={colorSearch}
                onChange={(e) => setColorSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-h-9 w-full rounded-sm border border-line bg-white px-2 py-1 text-[13px] text-ink transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
              />
            </div>
            <div className="max-h-80 overflow-y-auto pr-1"><div className="space-y-0.5">
              {filteredColors.map((c) => (
                <label key={c} className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[--color-accent]"
                    checked={selectedColors.includes(c)}
                    onChange={() => toggleMultiValueParam("krasa", selectedColors, c)}
                  />
                  <span>{translateColorLabel(c)}</span>
                </label>
              ))}
              {!filteredColors.length ? (
                <div className="px-2 py-2 text-sm text-muted">—</div>
              ) : null}
            </div></div>
          </>
        ) : null}
      </div>

      <div className="mb-6">
        <div className="mb-3 border-b border-line pb-2 text-[13px] font-semibold uppercase tracking-wider text-ink">{t(locale, "category.price")}</div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder={t(locale, "category.from")}
            value={priceMin}
            onChange={(e) => setSingleValueParam("cena_no", e.target.value)}
            className="min-h-10 w-[88px] rounded-sm border border-line bg-white px-2 py-1 text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            inputMode="numeric"
            placeholder={t(locale, "category.to")}
            value={priceMax}
            onChange={(e) => setSingleValueParam("cena_lidz", e.target.value)}
            className="min-h-10 w-[88px] rounded-sm border border-line bg-white px-2 py-1 text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
          />
        </div>
      </div>

      {isPrivateHouse && (
        <div className="mb-6">
          <div className="mb-3 border-b border-line pb-2 text-[12px] font-semibold uppercase tracking-wider text-ink">{t(locale, "category.thermo")}</div>
          <div className="space-y-0.5">
            <label className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
              <input
                type="radio"
                name="thermo"
                className="h-4 w-4 accent-[--color-accent]"
                checked={thermoFilter === "all"}
                onChange={() => setSingleValueParam("termo", "all", "all")}
              />
              <span>{t(locale, "category.all")}</span>
            </label>
            <label className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
              <input
                type="radio"
                name="thermo"
                className="h-4 w-4 accent-[--color-accent]"
                checked={thermoFilter === "yes"}
                onChange={() => setSingleValueParam("termo", "yes", "all")}
              />
              <span>{t(locale, "category.yes")}</span>
            </label>
            <label className="-mx-2 flex min-h-10 cursor-pointer items-center gap-2.5 rounded-sm px-2 text-[14px] text-ink transition-colors duration-200 hover:bg-[--color-soft]">
              <input
                type="radio"
                name="thermo"
                className="h-4 w-4 accent-[--color-accent]"
                checked={thermoFilter === "no"}
                onChange={() => setSingleValueParam("termo", "no", "all")}
              />
              <span>{t(locale, "category.no")}</span>
            </label>
          </div>
        </div>
      )}

      <button
        onClick={clearFilters}
        className="min-h-10 rounded-sm border border-line px-4 py-1.5 text-[13px] text-ink transition-[border-color,transform] duration-200 hover:border-[--color-muted] active:scale-[0.97]"
      >
        {t(locale, "category.clearFilters")}
      </button>
    </div>
  );

  return (
    <main>
      <section className="hidden border-b border-line md:block" style={{ paddingBlockStart: '2rem', paddingBlockEnd: '1.75rem' }}>
        <div className="container max-w-[1280px]">
          <div className="flex items-center gap-1.5 text-xs text-muted tracking-wide">
            <Link className="hover:text-[--color-accent] transition-colors duration-150" href={withLocaleHref(locale, "/")}>{t(locale, "common.home")}</Link>
            <span>/</span>
            <span className="text-[--color-accent]">{categoryName}</span>
          </div>
          <h2 className="mt-3" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>{categoryName}</h2>
          {resolvedDescription ? (
            <p className="mt-2 max-w-2xl text-sm text-muted leading-relaxed">{resolvedDescription}</p>
          ) : null}
        </div>
      </section>

      <section className="-mt-1" style={{ paddingBlockStart: '1.25rem' }}>
        <div className="container max-w-[1280px] pt-0 pb-6">
          <div className="mb-0 flex min-h-[112px] flex-col gap-3 md:min-h-0">
            <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max min-w-full items-center gap-2">
                {quickFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    aria-pressed={filter.active}
                    disabled={filter.disabled}
                    onClick={filter.onClick}
                    className={cn(
                      "inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                      filter.active
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border bg-background text-foreground hover:bg-muted",
                      filter.disabled && "cursor-not-allowed opacity-45 hover:bg-background"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm text-muted">{filtered.length} {t(locale, "category.models")}</div>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-2 px-3 text-[13px]">
                      <ChevronDownCircle size={16} /> {t(locale, "category.sort")}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t(locale, "category.sort")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSingleValueParam("kartot", "popular", "popular")} className="justify-between">
                      {t(locale, "category.sortPopular")} {sort === "popular" && <Check className="ml-2" size={14} />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSingleValueParam("kartot", "cheap", "popular")} className="justify-between">
                      {t(locale, "category.sortCheap")} {sort === "cheap" && <Check className="ml-2" size={14} />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSingleValueParam("kartot", "expensive", "popular")} className="justify-between">
                      {t(locale, "category.sortExpensive")} {sort === "expensive" && <Check className="ml-2" size={14} />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSingleValueParam("kartot", "new", "popular")} className="justify-between">
                      {t(locale, "category.sortNew")} {sort === "new" && <Check className="ml-2" size={14} />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="md:hidden h-8 gap-2 px-3 text-[13px]">
                      <SlidersHorizontal size={16} /> {t(locale, "category.filters")}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85%] max-w-[360px]">
                    <SheetHeader>
                      <SheetTitle>{t(locale, "category.filters")}</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">{Filters}</div>
                    <div className="mt-6">
                      <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                        {t(locale, "category.showResults")} ({filtered.length})
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {selectedCollections.map((c) => (
                <Badge key={`col-${c}`} variant="secondary" className="gap-2">
                  {c}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => toggleMultiValueParam("kolekcija", selectedCollections, c)}>×</button>
                </Badge>
              ))}
              {isAnthraciteActive ? (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.quickFilterAnthracite")}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setMultiValueParam("krasa", [])}>×</button>
                </Badge>
              ) : (
                selectedColors.map((c) => (
                  <Badge key={`clr-${c}`} variant="secondary" className="gap-2">
                    {translateColorLabel(c)}
                    <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => toggleMultiValueParam("krasa", selectedColors, c)}>×</button>
                  </Badge>
                ))
              )}
              {priceMin !== "" && (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.from")} €{priceMin}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("cena_no", "")}>×</button>
                </Badge>
              )}
              {priceMax !== "" && (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.to")} €{priceMax}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("cena_lidz", "")}>×</button>
                </Badge>
              )}
              {thermoFilter !== "all" && (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.thermo")}: {thermoFilter === "yes" ? t(locale, "category.yes") : t(locale, "category.no")}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("termo", "all", "all")}>×</button>
                </Badge>
              )}
              {glassOnly ? (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.quickFilterGlass")}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("stikls", "")}>×</button>
                </Badge>
              ) : null}
              {newOnly ? (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.quickFilterNew")}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("jaunumi", "")}>×</button>
                </Badge>
              ) : null}
              {clearanceOnly ? (
                <Badge variant="secondary" className="gap-2">
                  {t(locale, "category.quickFilterSale")}
                  <button aria-label={t(locale, "a11y.removeFilter") || "Noņemt filtru"} className="-mr-1 -my-1 inline-flex h-11 w-11 items-center justify-center text-muted-foreground" onClick={() => setSingleValueParam("akcija", "")}>×</button>
                </Badge>
              ) : null}
              {hasActiveFilters ? (
                <Button variant="ghost" className="h-8" onClick={clearFilters}>{t(locale, "category.clearFilters")}</Button>
              ) : null}
            </div>
          </div>

          <div className="flex gap-3 xl:gap-5">
            <div className="hidden md:block">{Filters}</div>
            <div className="flex-1">
              <>
                <RevealGrid
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-4"
                  revealKey={`${slug}|${sort}|${filtered.map((p) => p.id).join(",")}`}
                >
                  {filtered.slice(0, visibleCount).map((p, i) => (
                    <MotionReveal key={p.id} index={i}>
                      <ProductCard
                        product={p}
                        variant="catalog"
                        imagePriority={i < 4}
                        imageSizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </MotionReveal>
                  ))}
                </RevealGrid>
                {visibleCount < filtered.length ? (
                  <div className="mt-6 flex justify-center">
                    <Button
                      variant="outline"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setVisibleCount((c) => c + 16);
                      }}
                    >
                      {t(locale, "category.loadMore")}
                    </Button>
                  </div>
                ) : null}
              </>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
