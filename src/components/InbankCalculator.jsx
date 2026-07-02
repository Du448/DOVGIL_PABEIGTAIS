"use client";

import { useEffect, useRef } from "react";

const SCRIPT_ID = "inbank-calculator-loader";
const SCRIPT_URL = process.env.NEXT_PUBLIC_INBANK_SCRIPT_URL || "https://calculator.inbank.eu/api/calculator";

let calculatorWidgetPromise = null;

function mapLocale(locale) {
  if (locale === "lv") return "lv";
  if (locale === "lt") return "lt";
  return "en";
}

function waitForCalculatorWidget(resolve, reject) {
  const maxAttempts = 300;
  let attempts = 0;

  const poll = () => {
    if (typeof window !== "undefined" && window.CalculatorWidget) {
      if (typeof window.CalculatorWidget.init !== "function") {
        reject(new Error("CalculatorWidget.init is not available."));
        return;
      }

      resolve(window.CalculatorWidget);
      return;
    }

    attempts += 1;
    if (attempts >= maxAttempts) {
      reject(new Error("CalculatorWidget did not become available in time."));
      return;
    }

    window.setTimeout(poll, 100);
  };

  poll();
}

function loadCalculatorWidget() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Inbank calculator can only load in the browser."));
  }

  if (window.CalculatorWidget) {
    if (typeof window.CalculatorWidget.init !== "function") {
      return Promise.reject(new Error("CalculatorWidget.init is not available."));
    }

    return Promise.resolve(window.CalculatorWidget);
  }

  if (calculatorWidgetPromise) {
    return calculatorWidgetPromise;
  }

  calculatorWidgetPromise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID);

    if (existingScript) {
      waitForCalculatorWidget(resolve, reject);
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = SCRIPT_URL;

    script.addEventListener("load", () => {
      if (!window.CalculatorWidget || typeof window.CalculatorWidget.init !== "function") {
        reject(new Error("CalculatorWidget.init is not available."));
        return;
      }

      resolve(window.CalculatorWidget);
    });

    script.addEventListener("error", () => {
      reject(new Error("Failed to load the Inbank calculator script."));
    });

    document.head.appendChild(script);
  }).catch((error) => {
    calculatorWidgetPromise = null;
    throw error;
  });

  return calculatorWidgetPromise;
}

export default function InbankCalculator({ price, locale }) {
  const containerRef = useRef(null);
  const lastInitKeyRef = useRef("");
  const inFlightKeyRef = useRef("");

  const shopUuid = process.env.NEXT_PUBLIC_INBANK_SHOP_UUID;
  const productCode = process.env.NEXT_PUBLIC_INBANK_PRODUCT_CODE;
  const isEnabled = process.env.NEXT_PUBLIC_FEATURE_INBANK === "true";
  const normalizedPrice = Number(price);
  const shouldRender =
    isEnabled &&
    !!shopUuid &&
    !!productCode &&
    Number.isFinite(normalizedPrice) &&
    normalizedPrice > 0;
  const initKey = `${normalizedPrice}|${locale}`;

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    let cancelled = false;

    const run = async () => {
      try {
        const CalculatorWidget = await loadCalculatorWidget();

        if (cancelled || !containerRef.current) {
          return;
        }

        const container = containerRef.current;
        const hasChildren = container.childElementCount > 0;
        const sameKey = lastInitKeyRef.current === initKey;

        if (hasChildren && sameKey) {
          return;
        }

        if (inFlightKeyRef.current === initKey && !hasChildren) {
          return;
        }

        inFlightKeyRef.current = initKey;
        container.innerHTML = "";

        CalculatorWidget.init("inbank-calculator", {
          layout: "default",
          variant: "calculator-indivy-plan",
          shop_uuid: shopUuid,
          product_code: productCode,
          amount: normalizedPrice,
          mode: "white",
          lang: ({ lv: "lv", lt: "lt", en: "en" })[locale] || "en",
          region: process.env.NEXT_PUBLIC_INBANK_REGION || "lv",
        });

        lastInitKeyRef.current = initKey;
      } catch (err) {
        console.error("[Inbank]", err);
      } finally {
        if (inFlightKeyRef.current === initKey) {
          inFlightKeyRef.current = "";
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      if (inFlightKeyRef.current === initKey) {
        inFlightKeyRef.current = "";
      }
    };
  }, [initKey, locale, normalizedPrice, productCode, shouldRender, shopUuid]);

  if (!shouldRender) {
    return null;
  }

  return <div id="inbank-calculator" ref={containerRef} />;
}
