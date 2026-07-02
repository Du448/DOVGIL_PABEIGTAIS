"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Heart, Shield, ChevronUp, ChevronDown, Truck, Ruler, Wrench, ShieldCheck, ChevronRight, Layers } from "lucide-react";
import AccordionItem from "@/components/anim/AccordionItem";
import MagneticButton from "@/components/anim/MagneticButton";
import MotionReveal from "@/components/motion/MotionReveal";
import MotionCountUp from "@/components/motion/MotionCountUp";
import { getProductById, getProductsByCategory } from "@/data/products";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, translateColorLabel, withLocaleHref, t } from "@/lib/i18n";
import { ikSrc } from "@/lib/imagekit";
import { cn } from "@/lib/utils";
import { isWishlisted, toggleWishlistId } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";
import { useRfq } from "@/lib/rfq";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const Lightbox = dynamic(() => import("./ProductLightbox"), { ssr: false, loading: () => null });
const ProductClientInbankBlock = dynamic(() => import("./ProductClientInbankBlock"), {
  ssr: false,
  loading: () => <Skeleton className="mt-4 h-36 w-full max-w-2xl rounded-2xl" />,
});
const ProductClientSimilarProducts = dynamic(() => import("./ProductClientSimilarProducts"), {
  ssr: false,
  loading: () => (
    <section>
      <div className="container">
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-8 w-40 rounded-md" />
          <div className="hidden md:flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-sm" />
            <Skeleton className="h-10 w-10 rounded-sm" />
          </div>
        </div>
        <div className="flex gap-4 overflow-hidden pb-2">
          <Skeleton className="h-[320px] w-[260px] shrink-0 rounded-2xl" />
          <Skeleton className="h-[320px] w-[260px] shrink-0 rounded-2xl" />
          <Skeleton className="h-[320px] w-[260px] shrink-0 rounded-2xl" />
          <Skeleton className="h-[320px] w-[260px] shrink-0 rounded-2xl" />
        </div>
      </div>
    </section>
  ),
});

const measurementCityOptions = [
  { id: "riga", label: "Rīga", price: 20, distance: null },
  { id: "olaine", label: "Olaine", price: 31, distance: 21 },
  { id: "ozolnieki", label: "Ozolnieki", price: 38, distance: null },
  { id: "jelgava", label: "Jelgava", price: 40, distance: 40 },
  { id: "jurmala-dzintari", label: "Jūrmala, Dzintari", price: 35, distance: 18 },
  { id: "jurmala-asari", label: "Jūrmala, Asari", price: 38, distance: 26 },
  { id: "jurmala-kauguri-sloka", label: "Jūrmala, Kauguri/Sloka", price: 41, distance: 38 },
  { id: "jurmala-kemeri", label: "Jūrmala, Ķemeri", price: 46, distance: 42 },
  { id: "babite", label: "Babīte", price: 25, distance: 9 },
  { id: "iecava-26", label: "Iecava", price: 33, distance: 26 },
  { id: "marupe", label: "Mārupe", price: 26, distance: 11 },
  { id: "salaspils", label: "Salaspils", price: 31, distance: 21 },
  { id: "kekava", label: "Ķekava", price: 30, distance: 20 },
  { id: "carnikava", label: "Carnikava", price: 32, distance: 23 },
  { id: "saulkrasti", label: "Saulkrasti", price: 41, distance: 42 },
  { id: "incukalns", label: "Inčukalns", price: 39, distance: 37 },
  { id: "ropazi", label: "Ropaži", price: 36, distance: 32 },
  { id: "malpils", label: "Mālpils", price: 46, distance: 52 },
  { id: "stopini", label: "Stopiņi", price: 35, distance: 30 },
  { id: "tuja", label: "Tūja", price: 36, distance: 32 },
  { id: "ogre", label: "Ogre", price: 36, distance: 32 },
  { id: "lielvarde-39", label: "Lielvārde", price: 40, distance: 39 },
  { id: "kegums", label: "Ķegums", price: 42, distance: 44 },
  { id: "lielvarde-55", label: "Lielvārde", price: 48, distance: 55 },
  { id: "baldone", label: "Baldone", price: 33, distance: 26 },
  { id: "vecumnieki", label: "Vecumnieki", price: 43, distance: 46 },
  { id: "iecava-42", label: "Iecava", price: 41, distance: 42 },
  { id: "bauska", label: "Bauska", price: 51, distance: 62 },
  { id: "sigulda", label: "Sigulda", price: 45, distance: 50 },
  { id: "ragana", label: "Ragana", price: 41, distance: 44 },
  { id: "turaida", label: "Turaida", price: 47, distance: 53 },
  { id: "ligatne", label: "Līgatne", price: 54, distance: 67 },
  { id: "ledmane", label: "Lēdmane", price: 49, distance: 57 },
  { id: "smarde", label: "Smārde", price: 45, distance: 49 },
  { id: "tukums", label: "Tukums", price: 49, distance: 57 },
];

const deliveryCityOptions = [
  { id: "riga", label: "Rīga", price: 25, noteKey: null },
  { id: "olaine", label: "Olaine", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ozolnieki", label: "Ozolnieki", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "jelgava", label: "Jelgava", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "jurmala-dzintari", label: "Jūrmala, Dzintari", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "jurmala-asari", label: "Jūrmala, Asari", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "jurmala-kauguri-sloka", label: "Jūrmala, Kauguri/Sloka", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "jurmala-kemeri", label: "Jūrmala, Ķemeri", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "babite", label: "Babīte", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "iecava-26", label: "Iecava", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "marupe", label: "Mārupe", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "salaspils", label: "Salaspils", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "kekava", label: "Ķekava", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "carnikava", label: "Carnikava", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "saulkrasti", label: "Saulkrasti", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "incukalns", label: "Inčukalns", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ropazi", label: "Ropaži", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "malpils", label: "Mālpils", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "stopini", label: "Stopiņi", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "tuja", label: "Tūja", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ogre", label: "Ogre", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "lielvarde-39", label: "Lielvārde", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "kegums", label: "Ķegums", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "lielvarde-55", label: "Lielvārde", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "baldone", label: "Baldone", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "vecumnieki", label: "Vecumnieki", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "iecava-42", label: "Iecava", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "bauska", label: "Bauska", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "sigulda", label: "Sigulda", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ragana", label: "Ragana", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "turaida", label: "Turaida", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ligatne", label: "Līgatne", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "ledmane", label: "Lēdmane", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "smarde", label: "Smārde", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
  { id: "tukums", label: "Tukums", price: 50, noteKey: "product.deliveryOnlyCourierNote" },
];

const deliveryInstallationCityOptions = [
  { id: "riga", label: "Rīga", price: 120 },
  { id: "olaine", label: "Olaine", distance: 21, price: 141 },
  { id: "ozolnieki", label: "Ozolnieki", distance: 35, price: 155 },
  { id: "jelgava", label: "Jelgava", distance: 40, price: 160 },
  { id: "jurmala-dzintari", label: "Jūrmala, Dzintari", distance: 18, price: 143 },
  { id: "jurmala-asari", label: "Jūrmala, Asari", distance: 26, price: 151 },
  { id: "jurmala-kauguri-sloka", label: "Jūrmala, Kauguri/Sloka", distance: 38, price: 161 },
  { id: "jurmala-kemeri", label: "Jūrmala, Ķemeri", distance: 42, price: 165 },
  { id: "babite", label: "Babīte", distance: 9, price: 129 },
  { id: "iecava-26", label: "Iecava", distance: 26, price: 146 },
  { id: "marupe", label: "Mārupe", distance: 11, price: 131 },
  { id: "salaspils", label: "Salaspils", distance: 21, price: 141 },
  { id: "kekava", label: "Ķekava", distance: 20, price: 140 },
  { id: "carnikava", label: "Carnikava", distance: 23, price: 143 },
  { id: "saulkrasti", label: "Saulkrasti", distance: 42, price: 162 },
  { id: "incukalns", label: "Inčukalns", distance: 37, price: 157 },
  { id: "ropazi", label: "Ropaži", distance: 32, price: 152 },
  { id: "malpils", label: "Mālpils", distance: 52, price: 172 },
  { id: "stopini", label: "Stopiņi", distance: 30, price: 150 },
  { id: "tuja", label: "Tūja", distance: 32, price: 152 },
  { id: "ogre", label: "Ogre", distance: 32, price: 152 },
  { id: "lielvarde-39", label: "Lielvārde", distance: 39, price: 159 },
  { id: "kegums", label: "Ķegums", distance: 44, price: 164 },
  { id: "lielvarde-55", label: "Lielvārde", distance: 55, price: 175 },
  { id: "baldone", label: "Baldone", distance: 26, price: 146 },
  { id: "vecumnieki", label: "Vecumnieki", distance: 46, price: 166 },
  { id: "iecava-42", label: "Iecava", distance: 42, price: 162 },
  { id: "bauska", label: "Bauska", distance: 62, price: 182 },
  { id: "sigulda", label: "Sigulda", distance: 50, price: 170 },
  { id: "ragana", label: "Ragana", distance: 44, price: 164 },
  { id: "turaida", label: "Turaida", distance: 53, price: 173 },
  { id: "ligatne", label: "Līgatne", distance: 67, price: 187 },
  { id: "ledmane", label: "Lēdmane", distance: 57, price: 177 },
  { id: "smarde", label: "Smārde", distance: 49, price: 169 },
  { id: "tukums", label: "Tukums", distance: 57, price: 177 },
];

const deliveryInstallationFieldOptions = [
  {
    id: "woodDoorDemolition",
    labelKey: "product.installationWoodDoorDemolition",
    defaultValue: "no-demolition",
    options: [
      { value: "no-demolition", label: "Bez demontāžas" },
      { value: "1-piece", label: "1gb - €15.00" },
      { value: "2-piece", label: "2gb - €30.00" },
    ],
  },
  {
    id: "metalPvcDoorDemolition",
    labelKey: "product.installationMetalPvcDoorDemolition",
    defaultValue: "no-demolition",
    options: [
      { value: "no-demolition", label: "Bez demontāžas" },
      { value: "1-piece", label: "1gb - €25.00" },
      { value: "2-piece", label: "2gb - €50.00" },
    ],
  },
  {
    id: "utilization",
    labelKey: "product.installationUtilization",
    defaultValue: "no-utilization",
    options: [
      { value: "no-utilization", label: "Bez utilizācijas" },
      { value: "1-piece", label: "1gb - €15.00" },
      { value: "2-piece", label: "2gb - €30.00" },
    ],
  },
  {
    id: "freightLift",
    labelKey: "product.installationFreightLift",
    defaultValue: "has-freight-lift",
    options: [
      { value: "has-freight-lift", label: "Ir kravas lifts" },
      { value: "1-floor", label: "1. Stāvs - €5.00" },
      { value: "2-floor", label: "2. Stāvs - €10.00" },
      { value: "3-floor", label: "3. Stāvs - €15.00" },
      { value: "4-floor", label: "4. Stāvs - €20.00" },
      { value: "5-floor", label: "5. Stāvs - €25.00" },
      { value: "6-floor", label: "6. Stāvs - €30.00" },
      { value: "7-floor", label: "7. Stāvs - €35.00" },
      { value: "8-floor", label: "8. Stāvs - €40.00" },
      { value: "9-floor", label: "9. Stāvs - €45.00" },
      { value: "10-floor", label: "10. Stāvs - €50.00" },
      { value: "11-floor", label: "11. Stāvs - €55.00" },
      { value: "12-floor", label: "12. Stāvs - €60.00" },
    ],
  },
  {
    id: "wallWidening",
    labelKey: "product.installationWallWidening",
    defaultValue: "no-widening",
    options: [
      { value: "no-widening", label: "Bez ailes paplašināšanas" },
      { value: "top-1m", label: "Ailes augšējā daļa 1 metrs - €40.00" },
      { value: "side-2m", label: "Ailes malējā daļa 2 metri - €80.00" },
      { value: "602-series", label: "602. sērija - €225.00" },
      { value: "467-new-box", label: "467. sērija, jaunās kārbas biezumā - €90.00" },
      { value: "467-full-wall", label: "467. sērija, pilnā sienas biezumā - €400.00" },
    ],
  },
  {
    id: "mdfFinishing",
    labelKey: "product.installationMdfFinishing",
    defaultValue: "no-finishing",
    options: [
      { value: "no-finishing", label: "Bez ailes apdares" },
      { value: "up-to-200", label: "Sienas biezumam līdz 200MM - €150.00" },
      { value: "up-to-400", label: "Sienas biezumam līdz 400MM - €180.00" },
    ],
  },
  {
    id: "digitalDoorbell",
    labelKey: "product.installationDigitalDoorbell",
    defaultValue: "no-doorbell",
    options: [
      { value: "no-doorbell", label: "Bez digitālā zvana" },
      { value: "noston-520ad", label: "Noston 520AD HD - €89.00" },
      { value: "noston-2mp", label: "Noston 2MP WiFi - €125.00" },
      { value: "axa-dds-2", label: "AXA DDS-2 - €130.00" },
      { value: "ezviz-dp2", label: "EZVIZ DP2 - €225.00" },
    ],
  },
];

const formatDeliveryCityOption = (city, locale) =>
  `${city.label} - €${city.price.toFixed(2)}${city.noteKey ? ` (${t(locale, city.noteKey)})` : ""}`;

const formatMeasurementCityOption = (city) =>
  `${city.label}${city.distance != null ? ` - ${city.distance} km` : ""} - €${city.price.toFixed(2)}`;

const formatInstallationCityOption = (city) =>
  `${city.label}${city.distance != null ? ` - ${city.distance} km` : ""} - €${city.price.toFixed(2)}`;

const installationFieldPriceMaps = {
  woodDoorDemolition: {
    "no-demolition": 0,
    "1-piece": 15,
    "2-piece": 30,
  },
  metalPvcDoorDemolition: {
    "no-demolition": 0,
    "1-piece": 25,
    "2-piece": 50,
  },
  utilization: {
    "no-utilization": 0,
    "1-piece": 15,
    "2-piece": 30,
  },
  freightLift: {
    "has-freight-lift": 0,
    "1-floor": 5,
    "2-floor": 10,
    "3-floor": 15,
    "4-floor": 20,
    "5-floor": 25,
    "6-floor": 30,
    "7-floor": 35,
    "8-floor": 40,
    "9-floor": 45,
    "10-floor": 50,
    "11-floor": 55,
    "12-floor": 60,
  },
  wallWidening: {
    "no-widening": 0,
    "top-1m": 40,
    "side-2m": 80,
    "602-series": 225,
    "467-new-box": 90,
    "467-full-wall": 400,
  },
  mdfFinishing: {
    "no-finishing": 0,
    "up-to-200": 150,
    "up-to-400": 180,
  },
  digitalDoorbell: {
    "no-doorbell": 0,
    "noston-520ad": 89,
    "noston-2mp": 125,
    "axa-dds-2": 130,
    "ezviz-dp2": 225,
  },
};

const getInstallationFieldPrice = (fieldId, value) => installationFieldPriceMaps[fieldId]?.[value] ?? 0;

const formatEuroAmount = (amount) => `€${amount.toFixed(2)}`;

export default function ProductClient({ id }) {
  const locale = getLocaleFromPathname(usePathname());
  const product = getProductById(id);
  const productImages = product?.images && product.images.length > 0 ? product.images : ["placeholder"];
  const images = productImages;
  const isBostonAg4 = product?.collection === "BOSTON" || /AG4/i.test(product?.name || "");
  const galleryImageClassName = isBostonAg4
    ? "object-contain object-center transition-transform duration-300 ease-out [transform-origin:var(--zoom-origin)] group-hover:scale-[1.03]"
    : "object-contain object-top transition-transform duration-300 ease-out [transform-origin:var(--zoom-origin)] group-hover:scale-[1.05]";
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeSize, setActiveSize] = useState(product?.sizes?.[0] || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [specSectionsOpen, setSpecSectionsOpen] = useState(false);
  const [serviceSectionsOpen, setServiceSectionsOpen] = useState(false);
  const thumbsRef = useRef(null);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [slideDir, setSlideDir] = useState(1); // 1 => forward, -1 => backward
  const { has, toggle, ids, max } = useCompare();
  const { add: addRfq } = useRfq();

  const scrollThumbs = (dir) => {
    const el = thumbsRef.current;
    if (!el) return;
    const firstBtn = el.querySelector("button");
    const step = firstBtn ? firstBtn.getBoundingClientRect().height + 8 : 80; // 8 = gap-2
    el.scrollBy({ top: dir * step, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const el = thumbsRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollHeight - el.clientHeight);
    const top = el.scrollTop;
    setCanScrollUp(top > 0);
    setCanScrollDown(top < max);
  };

  useEffect(() => {
    if (!product?.id) return;
    const sync = () => setWishlisted(isWishlisted(product.id));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("wishlist:change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("wishlist:change", sync);
    };
  }, [product?.id]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") setLightboxIdx((i) => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setLightboxIdx((i) => (i + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, images.length]);

  useEffect(() => {
    updateScrollButtons();
    const el = thumbsRef.current;
    if (!el) return;
    const onScroll = () => updateScrollButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [images.length]);

  // Hover-activated slideshow for main gallery (ping-pong)
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const id = setInterval(() => {
      setActiveIdx((i) => {
        const next = i + slideDir;
        if (next >= images.length) {
          setSlideDir(-1);
          return Math.max(0, images.length - 2);
        }
        if (next < 0) {
          setSlideDir(1);
          return Math.min(1, images.length - 1);
        }
        return next;
      });
    }, 1200);
    return () => clearInterval(id);
  }, [autoPlay, images.length, slideDir]);

  if (!product) {
    return (
      <main className="container py-10">
        <div className="text-ink">{t(locale, "product.notFound")}</div>
      </main>
    );
  }

  const hasOffer = product.oldPrice != null && product.oldPrice > product.price;
  const discount = hasOffer ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const similar = getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  const descriptionSections = product.descriptionSections || { specification: "", set: "" };
  const serviceOptions = product.serviceOptions || [];
  const [measurementCity, setMeasurementCity] = useState(measurementCityOptions[0]?.id || "");
  const [deliveryCity, setDeliveryCity] = useState(deliveryCityOptions[0]?.id || "");
  const [installationCity, setInstallationCity] = useState(deliveryInstallationCityOptions[0]?.id || "");
  const [installationSelections, setInstallationSelections] = useState(() =>
    Object.fromEntries(deliveryInstallationFieldOptions.map((field) => [field.id, field.defaultValue]))
  );
  const [serviceSelections, setServiceSelections] = useState(() =>
    Object.fromEntries(serviceOptions.map((option) => [option.id, false]))
  );
  const [showPricesWithoutVat, setShowPricesWithoutVat] = useState(false);

  useEffect(() => {
    setMeasurementCity(measurementCityOptions[0]?.id || "");
    setDeliveryCity(deliveryCityOptions[0]?.id || "");
    setInstallationCity(deliveryInstallationCityOptions[0]?.id || "");
    setInstallationSelections(Object.fromEntries(deliveryInstallationFieldOptions.map((field) => [field.id, field.defaultValue])));
    setServiceSelections(Object.fromEntries(serviceOptions.map((option) => [option.id, false])));
    setShowPricesWithoutVat(false);
  }, [product?.id]);

  const selectedInstallationCity = deliveryInstallationCityOptions.find((city) => city.id === installationCity) || deliveryInstallationCityOptions[0];
  const selectedMeasurementCity = measurementCityOptions.find((city) => city.id === measurementCity) || measurementCityOptions[0];
  const selectedDeliveryCity = deliveryCityOptions.find((city) => city.id === deliveryCity) || deliveryCityOptions[0];
  const isMeasurementSelected = Boolean(serviceSelections.measurement);
  const isDeliveryOnlySelected = Boolean(serviceSelections["delivery-only"]);
  const isDeliveryInstallationSelected = Boolean(serviceSelections["delivery-installation"]);
  const measurementServiceTotal = isMeasurementSelected ? selectedMeasurementCity?.price || 0 : 0;
  const deliveryOnlyServiceTotal = isDeliveryOnlySelected ? selectedDeliveryCity?.price || 0 : 0;
  const installationLaborExtras = deliveryInstallationFieldOptions
    .filter((field) => field.id !== "digitalDoorbell")
    .reduce((total, field) => total + getInstallationFieldPrice(field.id, installationSelections[field.id]), 0);
  const installationAccessoryTotal = getInstallationFieldPrice("digitalDoorbell", installationSelections.digitalDoorbell);
  const installationLaborTotal = isDeliveryInstallationSelected ? (selectedInstallationCity?.price || 0) + installationLaborExtras : 0;
  const installationAccessoryTotalSelected = isDeliveryInstallationSelected ? installationAccessoryTotal : 0;
  const installationSummaryTotal =
    product.price + measurementServiceTotal + deliveryOnlyServiceTotal + installationLaborTotal + installationAccessoryTotalSelected;
  const vatMultiplier = showPricesWithoutVat ? 1 / 1.21 : 1;

  const specLabelKeys = {
    "Vērtnes biezums": "specs.leafThickness",
    "Kārbas biezums": "specs.frameThickness",
    "Svars": "specs.weight",
    "Slēdzenes": "specs.locks",
    "Slēdzene": "specs.locks",
    "Pildījums": "specs.filling",
    "Ārējā apdare": "specs.outsideFinish",
    "Iekšējā apdare": "specs.insideFinish",
    "Apdare": "specs.finish",
    "Actiņa": "specs.peephole",
    "Furnitūra": "specs.hardware",
    "Slieksnis": "specs.threshold",
    "Nakts aizbīdnis": "specs.nightLock",
    "Stikla pakete": "specs.glassPack",
    "Eņģes": "specs.hinges",
    "Blīvējuma kontūru skaits": "specs.seals",
    "Blīvējuma kontūri": "specs.seals",
    "Vērtnes siltinājums": "specs.insulation",
    "Kārbas pildījums": "specs.boxFilling",
    "Durvju svars": "specs.weight",
    "Durvju blīvējuma regulators": "specs.sealAdjuster",
    "Siltuma vadīšanas koeficients": "specs.thermalCoefficient",
    "Skaņas izolācija": "specs.soundInsulation",
    "Vērtnes metāla biezums": "specs.leafMetalThickness",
    "Kārbas metāla biezums": "specs.frameMetalThickness",
    "Ārējās metāla loksnes biezums": "specs.outerSheetThickness",
    "Vērtnes konstrukciju metāla biezums": "specs.structureMetalThickness",
    "Eņģu pretnoņemamie aizsargi": "specs.antiRemovalPins",
    "Stingruma ribas": "specs.stiffeners",
  };

  const specLabelOverrides = {
    "specs.leafThickness": "Vērtnes biezums",
    "specs.frameThickness": "Kārbas biezums",
    "specs.weight": "Svars",
    "specs.locks": "Slēdzenes",
    "specs.filling": "Pildījums",
    "specs.outsideFinish": "Ārējā apdare",
    "specs.insideFinish": "Iekšējā apdare",
    "specs.finish": "Apdare",
    "specs.peephole": "Actiņa",
    "specs.hardware": "Furnitūra",
    "specs.threshold": "Slieksnis",
    "specs.nightLock": "Nakts aizbīdnis",
    "specs.glassPack": "Stikla pakete",
    "specs.hinges": "Eņģes",
    "specs.seals": "Blīvējuma kontūru skaits",
    "specs.insulation": "Vērtnes siltinājums",
    "specs.boxFilling": "Kārbas pildījums",
    "specs.sealAdjuster": "Durvju blīvējuma regulators",
    "specs.thermalCoefficient": "Siltuma vadīšanas koeficients",
    "specs.soundInsulation": "Skaņas izolācija",
    "specs.leafMetalThickness": "Vērtnes metāla biezums",
    "specs.frameMetalThickness": "Kārbas metāla biezums",
    "specs.outerSheetThickness": "Ārējās metāla loksnes biezums",
    "specs.structureMetalThickness": "Vērtnes konstrukciju metāla biezums",
    "specs.antiRemovalPins": "Eņģu pretnoņemamie aizsargi",
    "specs.stiffeners": "Stingruma ribas",
  };

  const getSpecLabel = (key) => {
    if (specLabelOverrides[key]) return specLabelOverrides[key];

    if (specLabelKeys[key]) {
      const translatedKey = specLabelKeys[key];
      return specLabelOverrides[translatedKey] || key;
    }

    if (key.startsWith("specs.")) {
      return key
        .slice(6)
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([a-z])([0-9]+)/gi, "$1 $2")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return key;
  };

  const parseDescriptionRows = (text, fallbackEntries) => {
    if (typeof text === "string" && text.trim()) {
      return text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          if (line.startsWith("⚠")) {
            return { type: "note", text: line };
          }

          const colonIndex = line.indexOf(":");
          if (colonIndex === -1) {
            return { type: "note", text: line };
          }

          const key = line.slice(0, colonIndex).trim();

          return {
            type: "row",
            key,
            label: getSpecLabel(key),
            value: line.slice(colonIndex + 1).trim(),
          };
        });
    }

    if (!fallbackEntries?.length) {
      return [];
    }

    return fallbackEntries.map(([key, value]) => {
      const rawValue = typeof value === "string" ? value : String(value);
      const formattedValue =
        rawValue === "Ir"
          ? t(locale, "values.yes")
          : rawValue === "Nav"
            ? t(locale, "values.no")
            : rawValue;

      return {
        type: "row",
        key,
        label: getSpecLabel(key),
        value: formattedValue,
      };
    });
  };

  const renderStructuredSection = (text, fallbackEntries, fallbackDescription) => {
    const rows = parseDescriptionRows(text, fallbackEntries);
    const notes = rows.filter((row) => row.type === "note");
    const kvRows = rows.filter((row) => row.type === "row");

    if (!kvRows.length && !notes.length) {
      return <div className="text-sm leading-6 text-muted">{fallbackDescription}</div>;
    }

    return (
      <div className="space-y-3 py-1">
        {notes.length ? (
          <div className="rounded-sm border-l-2 border-amber-300 bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">
            {notes.map((note) => note.text).join(" ")}
          </div>
        ) : null}

        <div className="divide-y divide-gray-100">
          {kvRows.map((row, index) => (
            <div
              key={`${row.key}-${index}`}
              className={cn(
                "grid grid-cols-1 gap-2 rounded-sm px-3 py-3 transition-colors sm:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] sm:items-start sm:gap-6 odd:bg-white even:bg-gray-50"
              )}
            >
              <div className="text-[15px] leading-6 text-ink/70">{row.label || row.key}</div>
              <div className="text-[15px] font-medium leading-6 text-ink sm:text-right">{row.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // JSON-LD breadcrumbs
  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t(locale, "common.home"),
        item: withLocaleHref(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: withLocaleHref(locale, `/produkts/${product.id}`),
      },
    ],
  };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dovgil.lv";

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }} />
      {product ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              image: Array.isArray(images) && images.length ? images : undefined,
              description: product.short || product.name,
              brand: { "@type": "Brand", name: "DOVGIL", url: baseUrl },
              seller: { "@type": "Organization", name: "DOVGIL", url: baseUrl },
              publisher: { "@type": "Organization", name: "DOVGIL", url: baseUrl },
              offers: {
                "@type": "Offer",
                priceCurrency: "EUR",
                price: String(product.price),
                availability: "https://schema.org/InStock",
                url: `${baseUrl}/produkts/${product.id}`,
              },
            }),
          }}
        />
      ) : null}

      <section className="-mt-10 lg:-mt-16 relative z-10">
        <div className="container py-0">
          <nav aria-label="Breadcrumbs" className="w-fit px-3 py-1.5 rounded-sm border border-line/80 bg-white/80 backdrop-blur text-xs shadow-premium">
            <ol className="flex items-center gap-1 text-muted">
              <li>
                <Link
                  className="inline-flex items-center gap-1 text-muted hover:text-ink underline-offset-4 hover:underline"
                  href={withLocaleHref(locale, "/")}
                >
                  {t(locale, "common.home")}
                </Link>
              </li>
              <li aria-hidden className="text-muted px-0.5">
                <ChevronRight size={14} />
              </li>
              <li className="text-ink font-medium truncate max-w-[70vw] lg:max-w-none">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="-mt-16 lg:-mt-28">
        <div className="container pt-0 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Gallery */}
            <MotionReveal className="lg:-mt-12" index={0} y={18}>
              {images.every((src) => src === "placeholder") ? (
                <div className="relative aspect-[3/4] overflow-hidden bg-transparent">
                  <div className="w-full h-full bg-[--color-soft] flex items-center justify-center text-muted">
                    <span>{t(locale, "product.image")}</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                  <div className="order-2 flex w-full items-center gap-2 overflow-x-auto no-scrollbar lg:order-1 lg:h-[clamp(22rem,52vw,34rem)] lg:w-[76px] lg:flex-col lg:items-stretch lg:overflow-y-auto lg:overflow-x-hidden lg:pr-1">
                    <button
                      type="button"
                      onClick={() => scrollThumbs(-1)}
                      disabled={!canScrollUp}
                      aria-label="Scroll thumbnails up"
                      className="hidden h-8 w-full items-center justify-center rounded-sm border border-line bg-white text-ink transition-colors hover:border-[--color-muted] disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
                    >
                      <ChevronUp size={16} />
                    </button>

                    <div
                      ref={thumbsRef}
                      className="flex w-full gap-2 overflow-x-auto no-scrollbar lg:min-h-0 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden"
                    >
                      {images.map((src, idx) => (
                        <button
                          key={`${src}-${idx}`}
                          type="button"
                          onClick={() => {
                            setActiveIdx(idx);
                            setLightboxIdx(idx);
                          }}
                          onMouseEnter={() => setActiveIdx(idx)}
                          onFocus={() => setActiveIdx(idx)}
                          aria-label={t(locale, "product.imageN").replace("{n}", String(idx + 1))}
                          className={`relative group h-20 w-14 shrink-0 overflow-hidden rounded-sm border bg-[--color-soft] transition-colors lg:h-20 lg:w-full ${idx === activeIdx ? "border-[--color-accent]" : "border-line hover:border-[--color-muted]"}`}
                        >
                          <span className="relative block h-full w-full overflow-hidden">
                            <Image
                              src={src}
                              alt={`${product.name} thumbnail ${idx + 1}`}
                              fill
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              sizes="96px"
                              className="object-contain"
                            />
                          </span>
                          <span aria-hidden className="pointer-events-none absolute inset-0 rounded-sm ring-2 ring-[var(--color-ink)] opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollThumbs(1)}
                      disabled={!canScrollDown}
                      aria-label="Scroll thumbnails down"
                      className="hidden h-8 w-full items-center justify-center rounded-sm border border-line bg-white text-ink transition-colors hover:border-[--color-muted] disabled:cursor-not-allowed disabled:opacity-40 lg:flex"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setLightboxIdx(activeIdx);
                      setLightboxOpen(true);
                    }}
                    className="order-1 relative block aspect-[3/4] w-full overflow-hidden bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:order-2"
                    onMouseEnter={() => setAutoPlay(true)}
                    onMouseLeave={() => setAutoPlay(false)}
                    aria-label={`${t(locale, "product.openImage")} — ${product.name}`}
                  >
                    <Image
                      src={ikSrc(images[activeIdx], { w: 1200 })}
                      alt={
                        activeIdx === 0
                          ? `${product.name} — galvenais produkta attēls`
                          : `${product.name} — produkta attēls ${activeIdx + 1}`
                      }
                      fill
                      referrerPolicy="no-referrer"
                      loading="eager"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className={galleryImageClassName}
                    />
                  </button>
                </div>
              )}
            </MotionReveal>

            {/* Right: Info (sticky on desktop) */}
            <MotionReveal className="h-fit lg:-mt-12" index={1} y={18}>
              <div className="text-[12px] font-semibold tracking-wide text-ink">{product.collection}</div>
              <h1 className="mt-0 text-2xl sm:text-3xl font-semibold tracking-wide text-ink">{product.name}</h1>

              <div className="mt-2 flex items-baseline gap-2">
                {hasOffer ? (
                  <>
                    <MotionCountUp
                      value={product.price}
                      format={(value) => formatEuroAmount(value)}
                      className="text-accent text-2xl font-semibold"
                    />
                    <span className="text-muted line-through">€{product.oldPrice}</span>
                    <span className="text-accent font-semibold">-{discount}%</span>
                  </>
                ) : (
                  <MotionCountUp
                    value={product.price}
                    format={(value) => formatEuroAmount(value)}
                    className="text-ink text-2xl font-semibold"
                  />
                )}
              </div>

              {/* Colors: interactive swatches that try to switch to related image */}
              {product.colors?.length ? (
                <div className="mt-5">
                  <div className="text-sm text-muted mb-2">{t(locale, "product.colorLabel")}</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {product.colors.map((c, idx) => {
                      const label = translateColorLabel(locale, c);
                      const isActive = selectedIdx === idx;
                      return (
                        <button
                          key={c + idx}
                          type="button"
                          className={`rounded-sm border px-3 py-1.5 text-[15px] transition-colors ${isActive ? "border-[--color-accent] text-ink" : "border-line text-ink hover:border-[--color-muted]"}`}
                          onClick={() => {
                            // Heuristic: try to find an image that includes a token of the color label
                            const token = String(c).split(" ")[0].toLowerCase();
                            const matchIdx = images.findIndex((u) => String(u).toLowerCase().includes(token));
                            const nextIdx = matchIdx >= 0 ? matchIdx : 0;
                            setSelectedIdx(nextIdx);
                            setActiveIdx(nextIdx);
                          }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              {/* Sizes */}
              {product.sizes?.length ? (
                <div className="mt-5">
                  <div className="text-sm text-muted mb-2">{t(locale, "product.size")}</div>
                  <select
                    value={activeSize}
                    onChange={(e) => setActiveSize(e.target.value)}
                    className="min-h-11 rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink transition-colors hover:border-[--color-muted] focus:outline-none focus:ring-2 focus:ring-[--color-accent]"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ) : null}

              {/* Security class */}
              {product.security ? (
                <div className="mt-3 flex items-center gap-2 text-[15px] text-muted">
                  <Shield size={16} />
                  <span>{product.security}</span>
                </div>
              ) : null}

              {/* Actions */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                <MagneticButton className="block w-full">
                  <Link
                    href={withLocaleHref(locale, `/kontakti?produkts=${encodeURIComponent(product.id)}`)}
                    className="flex h-12 w-full items-center justify-center rounded-sm bg-accent px-4 py-2.5 text-center text-sm font-medium leading-tight text-white transition-colors duration-300 hover:bg-accent-dark"
                  >
                    {t(locale, "product.requestOffer")}
                  </Link>
                </MagneticButton>
                <button
                  type="button"
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-center text-sm font-medium leading-tight transition-[border-color,transform] duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] ${has(product.id) ? "border-[--color-accent] text-accent" : "border-line text-ink hover:border-[--color-muted]"}`}
                  onClick={() => { if (!has(product.id) && ids.length >= max) return; toggle(product.id); }}
                  aria-label={has(product.id) ? (t(locale, "compare.remove") || "Noņemt no salīdzināšanas") : (t(locale, "product.addToCompare") || "Pievienot salīdzināšanai")}
                >
                  <Layers size={18} />
                  {has(product.id) ? (t(locale, "compare.remove") || "Noņemt no salīdzināšanas") : (t(locale, "product.addToCompare") || "Pievienot salīdzināšanai")}
                </button>
                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-line px-4 py-2.5 text-center text-sm font-medium leading-tight transition-[border-color,transform] duration-200 hover:border-[--color-muted] active:scale-[0.97] text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink]"
                  onClick={() => {
                    const color = Array.isArray(product.colors) ? (product.colors[selectedIdx] || product.colors[0]) : undefined;
                    addRfq({ id: product.id, qty: 1, size: activeSize || undefined, color });
                  }}
                  aria-label={t(locale, "rfq.add")}
                >
                  {t(locale, "rfq.add") || "Pievienot pieprasījumam"}
                </button>
                <button
                  type="button"
                  className={`flex h-12 w-full items-center justify-center gap-2 rounded-sm border border-line px-4 py-2.5 text-center text-sm font-medium leading-tight transition-[border-color,transform] duration-200 hover:border-[--color-muted] active:scale-[0.97] ${wishlisted ? "text-accent" : "text-ink"} focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink]`}
                  onClick={() => toggleWishlistId(product.id)}
                  aria-label={t(locale, "product.addWishlist")}
                >
                  <Heart size={18} />
                  {t(locale, "product.addWishlist")}
                </button>
              </div>

              {/* Trust icons row */}
              <div className="mt-4 flex w-full items-center justify-between gap-2 sm:gap-3">
                {[
                  { key: "trust.measurement", label: t(locale, "trust.measurement") || "Uzmērīšana", Icon: Ruler },
                  { key: "trust.installation", label: t(locale, "trust.installation") || "Montāža", Icon: Wrench },
                  { key: "trust.warranty", label: t(locale, "trust.warranty") || "Garantija", Icon: ShieldCheck },
                  { key: "trust.delivery", label: t(locale, "trust.delivery") || "Piegāde", Icon: Truck },
                ].map(({ key, label, Icon }) => (
                  <Tooltip key={key}>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        aria-label={label}
                        className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/70 bg-white/80 text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-[--color-muted] hover:shadow-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[--color-soft] transition-colors group-hover:bg-[--color-soft]">
                          <Icon size={16} />
                        </span>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top">{label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <ProductClientInbankBlock price={product.price} locale={locale} />

              {serviceOptions.length ? (
                <TooltipProvider delayDuration={150}>
                  <div className="mt-5 w-full max-w-2xl rounded-2xl border border-border/70 bg-slate-100/80 px-4 py-4 shadow-sm backdrop-blur-sm">
                    <div className="space-y-2">
                      {serviceOptions.map((option) => {
                        const isSelected = Boolean(serviceSelections[option.id]);
                        const label = t(locale, option.labelKey);

                        return (
                          <div key={option.id} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 transition-colors hover:border-slate-300 hover:bg-slate-50">
                            <div className="flex items-center justify-between gap-4">
                              <button
                                type="button"
                                className="flex min-w-0 flex-1 items-center gap-3 rounded-xl text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                aria-pressed={isSelected}
                                onClick={() => {
                                  setServiceSelections((current) => ({
                                    ...current,
                                    [option.id]: !current[option.id],
                                  }));
                                }}
                              >
                                <span
                                  className={cn(
                                    "relative inline-flex h-6 w-11 shrink-0 rounded-full border transition-colors duration-200",
                                    isSelected ? "border-primary bg-primary" : "border-line bg-gray-200"
                                  )}
                                  aria-hidden
                                >
                                  <span
                                    className={cn(
                                      "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                                      isSelected ? "translate-x-5" : "translate-x-0"
                                    )}
                                  />
                                </span>
                                <span className={cn("min-w-0 flex-1 text-[16px] leading-6 text-ink transition-colors", isSelected && "font-semibold text-primary")}>{label}</span>
                              </button>

                              {option.infoKey ? (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      type="button"
                                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[15px] font-semibold text-ink transition-colors hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                                      aria-label={t(locale, option.infoKey)}
                                    >
                                      ?
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="left">{t(locale, option.infoKey)}</TooltipContent>
                                </Tooltip>
                              ) : (
                                <span className="h-8 w-8 shrink-0" aria-hidden />
                              )}
                            </div>

                            {option.id === "measurement" && isSelected ? (
                              <div className="pl-14 pt-4">
                                <label htmlFor={`measurement-city-${product.id}`} className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.08em] text-ink/80">
                                  {t(locale, "product.measurementCities")}
                                </label>
                                <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                                  <select
                                    id={`measurement-city-${product.id}`}
                                    value={measurementCity}
                                    onChange={(e) => setMeasurementCity(e.target.value)}
                                    className="block h-11 w-full appearance-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-ink shadow-none outline-none focus:ring-0"
                                  >
                                    {measurementCityOptions.map((city) => (
                                      <option key={city.id} value={city.id}>
                                        {formatMeasurementCityOption(city)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/70"
                                  />
                                </div>
                              </div>
                            ) : null}

                            {option.id === "delivery-only" && isSelected ? (
                              <div className="pl-14 pt-4">
                                <label htmlFor={`delivery-city-${product.id}`} className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.08em] text-ink/80">
                                  {t(locale, "product.deliveryCity")}
                                </label>
                                <div className="relative rounded-xl border border-border bg-white px-3 py-2 shadow-sm">
                                  <select
                                    id={`delivery-city-${product.id}`}
                                    value={deliveryCity}
                                    onChange={(e) => setDeliveryCity(e.target.value)}
                                    className="block h-11 w-full appearance-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-ink shadow-none outline-none focus:ring-0"
                                  >
                                    {deliveryCityOptions.map((city) => (
                                      <option key={city.id} value={city.id}>
                                        {formatDeliveryCityOption(city, locale)}
                                      </option>
                                    ))}
                                  </select>
                                  <ChevronDown
                                    size={16}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/70"
                                  />
                                </div>
                              </div>
                            ) : null}

                            {option.id === "delivery-installation" && isSelected ? (
                              <div className="pl-14 pt-4 space-y-4">
                                <div>
                                  <label htmlFor={`installation-city-${product.id}`} className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.08em] text-ink/80">
                                    {t(locale, "product.installationCities")}
                                  </label>
                                  <div className="relative rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                                    <select
                                      id={`installation-city-${product.id}`}
                                      value={installationCity}
                                      onChange={(e) => setInstallationCity(e.target.value)}
                                      className="block h-11 w-full appearance-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-ink shadow-none outline-none focus:ring-0"
                                    >
                                      {deliveryInstallationCityOptions.map((city) => (
                                        <option key={city.id} value={city.id}>
                                          {formatInstallationCityOption(city)}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown
                                      size={16}
                                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/70"
                                    />
                                  </div>
                                </div>

                                {deliveryInstallationFieldOptions.map((field) => (
                                  <div key={field.id} className="rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
                                    <label htmlFor={`${field.id}-${product.id}`} className="mb-2 block text-[14px] font-semibold uppercase tracking-[0.08em] text-ink/80">
                                      {t(locale, field.labelKey)}
                                    </label>
                                    <div className="relative">
                                      <select
                                        id={`${field.id}-${product.id}`}
                                        value={installationSelections[field.id]}
                                        onChange={(e) => {
                                          setInstallationSelections((current) => ({
                                            ...current,
                                            [field.id]: e.target.value,
                                          }));
                                        }}
                                        className="block h-11 w-full appearance-none rounded-xl border border-border bg-slate-50 px-4 py-2.5 pr-10 text-[15px] leading-6 text-ink shadow-none outline-none transition-colors hover:bg-white focus:border-[--color-muted] focus:bg-white focus:ring-0"
                                      >
                                        {field.options.map((option) => (
                                          <option key={option.value} value={option.value}>
                                            {option.label || (option.labelKey ? t(locale, option.labelKey) : "")}
                                          </option>
                                        ))}
                                      </select>
                                      <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/70"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </TooltipProvider>
              ) : null}

              {serviceOptions.length ? (
                <div className="mt-5 w-full max-w-2xl rounded-2xl border border-border/70 bg-slate-50 p-4 shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                      <span className="text-[16px] font-semibold text-ink">
                        {t(locale, "product.priceSummaryShowWithoutVat")}
                      </span>
                      <button
                        type="button"
                        aria-pressed={showPricesWithoutVat}
                        onClick={() => setShowPricesWithoutVat((current) => !current)}
                        className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                          showPricesWithoutVat ? "bg-primary" : "bg-gray-300"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                            showPricesWithoutVat ? "translate-x-5" : "translate-x-0.5"
                          )}
                        />
                      </button>
                    </div>

                    <div className="space-y-2 text-[16px] leading-6 text-ink">
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-medium text-ink/90">{t(locale, "product.priceSummaryProduct")}</span>
                        <MotionCountUp value={product.price * vatMultiplier} format={(value) => formatEuroAmount(value)} className="font-semibold tabular-nums text-ink" />
                      </div>
                      {isMeasurementSelected ? (
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-medium text-ink/90">{t(locale, "product.serviceMeasurement")}</span>
                          <MotionCountUp value={measurementServiceTotal * vatMultiplier} format={(value) => formatEuroAmount(value)} className="font-semibold tabular-nums text-ink" />
                        </div>
                      ) : null}
                      {isDeliveryOnlySelected ? (
                        <div className="flex items-start justify-between gap-4">
                          <span className="font-medium text-ink/90">{t(locale, "product.serviceDeliveryOnly")}</span>
                          <MotionCountUp value={deliveryOnlyServiceTotal * vatMultiplier} format={(value) => formatEuroAmount(value)} className="font-semibold tabular-nums text-ink" />
                        </div>
                      ) : null}
                      {isDeliveryInstallationSelected ? (
                        <>
                          <div className="flex items-start justify-between gap-4">
                            <span className="font-medium text-ink/90">{t(locale, "product.priceSummaryLabor")}</span>
                            <MotionCountUp value={installationLaborTotal * vatMultiplier} format={(value) => formatEuroAmount(value)} className="font-semibold tabular-nums text-ink" />
                          </div>
                          <div className="flex items-start justify-between gap-4">
                            <span className="font-medium text-ink/90">{t(locale, "product.priceSummaryAccessories")}</span>
                            <MotionCountUp value={installationAccessoryTotalSelected * vatMultiplier} format={(value) => formatEuroAmount(value)} className="font-semibold tabular-nums text-ink" />
                          </div>
                        </>
                      ) : null}
                      <div className="flex items-start justify-between gap-4 border-t border-slate-200 pt-3 text-[17px] font-semibold">
                        <span className="text-ink">{t(locale, "product.priceSummaryTotal")}</span>
                        <MotionCountUp value={installationSummaryTotal * vatMultiplier} format={(value) => formatEuroAmount(value)} className="tabular-nums text-ink" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[var(--color-accent-dark)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-ink] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto sm:min-w-[220px]"
                    >
                      {t(locale, "product.priceSummaryDownload")}
                    </button>
                  </div>
                </div>
              ) : null}

            </MotionReveal>
          </div>
        </div>

        {/* Product details sections */}
        <MotionReveal className="container relative z-10 mt-6 border-t border-gray-200 pt-4 pb-6 lg:mt-8 lg:pt-4" index={2} y={16}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-0 md:grid-cols-2">
            <AccordionItem title={t(locale, "product.specs")} open={specSectionsOpen} onOpenChange={setSpecSectionsOpen}>
              {renderStructuredSection(descriptionSections.specification, Object.entries(product.specs || {}), t(locale, "pages.services.description"))}
            </AccordionItem>
            <AccordionItem title={t(locale, "product.set")} open={specSectionsOpen} onOpenChange={setSpecSectionsOpen}>
              {renderStructuredSection(descriptionSections.set, [], product.short || t(locale, "pages.services.description"))}
            </AccordionItem>
            <AccordionItem title={t(locale, "product.installDelivery")} open={serviceSectionsOpen} onOpenChange={setServiceSectionsOpen}>
              {t(locale, "product.freeServices")}
            </AccordionItem>
            <AccordionItem title={t(locale, "product.warranty")} open={serviceSectionsOpen} onOpenChange={setServiceSectionsOpen}>
              {t(locale, "pages.about.featuresDesc3")}
            </AccordionItem>
          </div>
        </MotionReveal>
      </section>

      <ProductClientSimilarProducts locale={locale} similar={similar} />

      {lightboxOpen && (
        <Lightbox
          images={images}
          index={lightboxIdx}
          setIndex={setLightboxIdx}
          onClose={() => setLightboxOpen(false)}
          locale={locale}
          productName={product.name}
        />
      )}
    </main>
  );
}
