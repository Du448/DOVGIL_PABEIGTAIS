"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, Truck, Wrench } from "lucide-react";
import RevealGrid from "@/components/anim/RevealGrid";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

const experienceImage =
  "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/502404645_1292190382915069_1796644839425524743_n.jpg";
const installationImage =
  "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/519981165_18410902468104686_7110788039135785938_n.jpg";
const warrantyImage =
  "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/497452186_1277301794403928_7848546331637606100_n.jpg";
const deliveryImage =
  "https://ik.imagekit.io/ohgqgb01i/Bildes_priek%C5%A1_m%C4%81jaslapas/502428305_1288632209937553_5694618781465885469_n.jpg";

const columns = [
  {
    id: "left",
    items: [
      {
        id: "experience",
        titleKey: "home.benefits.experience",
        icon: BadgeCheck,
        image: experienceImage,
        imageClass: "object-[50%_34%]",
        isLarge: true,
      },
      {
        id: "installation",
        titleKey: "home.benefits.installation",
        icon: Wrench,
        image: installationImage,
        imageClass: "object-[50%_64%]",
        isLarge: false,
      },
    ],
  },
  {
    id: "right",
    items: [
      {
        id: "warranty",
        titleKey: "home.benefits.warranty",
        icon: BadgeCheck,
        image: warrantyImage,
        imageClass: "object-[50%_30%]",
        isLarge: false,
      },
      {
        id: "delivery",
        titleKey: "home.benefits.delivery",
        icon: Truck,
        image: deliveryImage,
        imageClass: "object-[50%_70%]",
        isLarge: true,
      },
    ],
  },
];

function ShowcaseCard({ locale, item, active, hasActiveSibling, onActivate, onDeactivate }) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onDeactivate}
      onBlur={onDeactivate}
      aria-label={t(locale, item.titleKey)}
      aria-pressed={active}
      className={cn(
        "group relative flex min-h-[170px] w-full overflow-hidden rounded-[24px] border border-line text-left shadow-sm transition-[flex-grow,box-shadow,border-color,transform] duration-500 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:min-h-[210px] lg:min-h-0",
        active
          ? "border-[var(--color-ink)] shadow-premium"
          : "bg-white hover:-translate-y-0.5 hover:shadow-premium",
        hasActiveSibling && !active ? "opacity-95" : "opacity-100",
        item.isLarge ? (active ? "flex-[1.6]" : "flex-[0.72]") : active ? "flex-[2.05]" : "flex-[0.38]"
      )}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className={cn(
          "object-cover grayscale transform-none transition-[filter] duration-500 ease-out",
          item.imageClass,
          active ? "grayscale-0" : "brightness-[0.72] contrast-[1.05]"
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/26 to-black/8" />

      <div className="relative z-10 flex h-full w-full items-end p-5 sm:p-6">
        <div className="max-w-[85%]">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/95 backdrop-blur-[2px]">
            <Icon size={18} />
          </span>
          <div className="text-[16px] font-semibold leading-snug tracking-[-0.02em] text-white sm:text-[18px]">
            {t(locale, item.titleKey)}
          </div>
        </div>
      </div>
    </button>
  );
}

function ShowcaseColumn({ locale, items, activeId, setActiveId }) {
  const hasActive = items.some((item) => item.id === activeId);

  return (
    <div className="flex flex-col gap-4 lg:h-[560px]">
      {items.map((item) => {
        const active = activeId === item.id;

        return (
          <ShowcaseCard
            key={item.id}
            locale={locale}
            item={item}
            active={active}
            hasActiveSibling={hasActive}
            onActivate={() => setActiveId(item.id)}
            onDeactivate={() => setActiveId(null)}
          />
        );
      })}
    </div>
  );
}

export default function HomeBenefitsShowcase({ locale }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="-mt-10 border-b border-line bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,1)_100%)] sm:-mt-12 lg:-mt-16">
      <div className="container pb-8 pt-0 sm:pb-10 lg:pb-12">
        <div className="mb-6 sm:mb-7">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{t(locale, "home.benefitsShowcaseEyebrow")}</p>
          <h2 className="mt-3 text-[clamp(2.25rem,3.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">
            {t(locale, "home.benefitsShowcaseTitle")}
          </h2>
        </div>

        <RevealGrid className="grid gap-4 lg:grid-cols-2" revealKey="home-benefits-showcase" y={28} stagger={0.1}>
          {columns.map((column) => (
            <ShowcaseColumn
              key={column.id}
              locale={locale}
              items={column.items}
              activeId={activeId}
              setActiveId={setActiveId}
            />
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}
