"use client";

function mapLocale(locale) {
  if (locale === "en") return "en";
  if (locale === "lt") return "lt";
  return "lv";
}

export default function InbankCalculator({ price, locale }) {
  const shopUuid = process.env.NEXT_PUBLIC_INBANK_SHOP_UUID;
  const productCode = process.env.NEXT_PUBLIC_INBANK_PRODUCT_CODE;
  const isEnabled = process.env.NEXT_PUBLIC_FEATURE_INBANK === "true";

  if (!isEnabled || !shopUuid || !productCode || price == null) {
    return null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_INBANK_CALCULATOR_URL || "https://calculator.inbank.ee/calculator/indivy/plan";
  const url = new URL(baseUrl);
  const normalizedPrice = Number(price);

  if (!Number.isFinite(normalizedPrice) || normalizedPrice <= 0) {
    return null;
  }

  url.searchParams.set("amount", String(normalizedPrice));
  url.searchParams.set("shop_uuid", shopUuid);
  url.searchParams.set("product_code", productCode);
  url.searchParams.set("currency", "eur");
  url.searchParams.set("lang", mapLocale(locale));
  url.searchParams.set("template", "editable_amount");
  url.searchParams.set("mode", "white");
  url.searchParams.set("logo", "true");
  url.searchParams.set("show_sample", "false");
  url.searchParams.set("start_session", "false");

  return (
    <div className="h-[450px] lg:h-[350px] w-full overflow-hidden rounded-2xl border border-[#d7def2] bg-white p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-3">
      <iframe
        src={url.toString()}
        frameBorder="0"
        scrolling="no"
        width="100%"
        height="100%"
        loading="lazy"
        title="Inbank kalkulators"
        className="block h-full w-full"
      />
    </div>
  );
}
