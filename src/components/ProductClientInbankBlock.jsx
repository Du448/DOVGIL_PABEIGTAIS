"use client";

import InbankCalculator from "@/components/InbankCalculator";

export default function ProductClientInbankBlock({ price, locale }) {
  return (
    <div className="mt-4">
      <InbankCalculator price={price} locale={locale} />
    </div>
  );
}
