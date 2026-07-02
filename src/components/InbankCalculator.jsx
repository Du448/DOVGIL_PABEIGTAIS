"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CALCULATOR_SCRIPT_ID = "inbank-calculator-loader";
const CALCULATOR_SCRIPT_SRC = "https://calculator.inbank.eu/api/calculator";

let calculatorWidgetPromise = null;

function mapLocale(locale) {
  if (locale === "en") return "en";
  if (locale === "lt") return "lt";
  return "lv";
}

function waitForCalculatorWidget(resolve, reject) {
  const maxAttempts = 200;
  let attempts = 0;

  const poll = () => {
    if (typeof window !== "undefined" && window.CalculatorWidget) {
      resolve(window.CalculatorWidget);
      return;
    }

    attempts += 1;
    if (attempts >= maxAttempts) {
      reject(new Error("Inbank CalculatorWidget did not become available in time."));
      return;
    }

    window.setTimeout(poll, 50);
  };

  poll();
}

function loadCalculatorWidget() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Inbank calculator can only load in the browser."));
  }

  if (window.CalculatorWidget) {
    return Promise.resolve(window.CalculatorWidget);
  }

  if (calculatorWidgetPromise) {
    return calculatorWidgetPromise;
  }

  const promise = new Promise((resolve, reject) => {
    const existingScript = document.getElementById(CALCULATOR_SCRIPT_ID);

    if (existingScript) {
      waitForCalculatorWidget(resolve, reject);
      return;
    }

    const script = document.createElement("script");
    script.id = CALCULATOR_SCRIPT_ID;
    script.async = true;
    script.src = CALCULATOR_SCRIPT_SRC;

    script.addEventListener("load", () => {
      if (window.CalculatorWidget) {
        resolve(window.CalculatorWidget);
        return;
      }

      waitForCalculatorWidget(resolve, reject);
    });

    script.addEventListener("error", () => {
      reject(new Error("Failed to load the Inbank calculator script."));
    });

    document.head.appendChild(script);
  }).catch((error) => {
    calculatorWidgetPromise = null;
    throw error;
  });

  calculatorWidgetPromise = promise;
  return calculatorWidgetPromise;
}

function describeCalculatorWidget(CalculatorWidget) {
  const keys = Object.keys(CalculatorWidget || {});
  const variantKeys = ["variants", "supportedVariants", "supported_variants", "availableVariants", "available_variants"].filter(
    (key) => key in (CalculatorWidget || {}),
  );

  console.debug("[InbankCalculator] CalculatorWidget available", {
    keys,
    variantKeys,
    hasInit: typeof CalculatorWidget?.init === "function",
    initArity: typeof CalculatorWidget?.init === "function" ? CalculatorWidget.init.length : null,
  });

  for (const key of variantKeys) {
    console.debug(`[InbankCalculator] CalculatorWidget.${key}`, CalculatorWidget[key]);
  }
}

export default function InbankCalculator({ price, locale }) {
  const shopUuid = process.env.NEXT_PUBLIC_INBANK_SHOP_UUID;
  const productCode = process.env.NEXT_PUBLIC_INBANK_PRODUCT_CODE;
  const isEnabled = process.env.NEXT_PUBLIC_FEATURE_INBANK === "true";
  const containerRef = useRef(null);
  const initTokenRef = useRef(0);
  const reactId = useId();
  const containerId = `inbank-calculator-${reactId.replace(/:/g, "")}`;
  const [isLoading, setIsLoading] = useState(true);
  const normalizedPrice = Number(price);
  const shouldRender = isEnabled && !!shopUuid && !!productCode && Number.isFinite(normalizedPrice) && normalizedPrice > 0;

  useEffect(() => {
    if (!shouldRender) {
      return undefined;
    }

    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let cancelled = false;
    const initToken = initTokenRef.current + 1;
    initTokenRef.current = initToken;

    const renderWidget = async () => {
      setIsLoading(true);
      console.debug("[InbankCalculator] awaiting CalculatorWidget", {
        containerId,
        amount: normalizedPrice,
        lang: mapLocale(locale),
        region: process.env.NEXT_PUBLIC_INBANK_REGION || "lv",
      });

      try {
        const CalculatorWidget = await loadCalculatorWidget();

        if (cancelled || initTokenRef.current !== initToken || !containerRef.current) {
          console.debug("[InbankCalculator] init aborted before widget init", {
            containerId,
            initToken,
            currentToken: initTokenRef.current,
            cancelled,
          });
          return;
        }

        describeCalculatorWidget(CalculatorWidget);
        container.innerHTML = "";
        const initConfig = {
          layout: "default",
          variant: "calculator-indivy-plan",
          shop_uuid: shopUuid,
          product_code: productCode,
          amount: normalizedPrice,
          template: "non_editable_amount",
          mode: "white",
          lang: mapLocale(locale),
          region: process.env.NEXT_PUBLIC_INBANK_REGION || "lv",
        };

        console.debug("[InbankCalculator] calling CalculatorWidget.init", {
          containerId,
          config: initConfig,
        });

        const initResult = CalculatorWidget.init(containerId, initConfig);
        setIsLoading(false);

        console.debug("[InbankCalculator] CalculatorWidget.init returned", {
          containerId,
          resultType: initResult === null ? "null" : typeof initResult,
          isPromise: !!initResult && typeof initResult.then === "function",
        });

        if (initResult && typeof initResult.then === "function") {
          await initResult;
          console.debug("[InbankCalculator] CalculatorWidget.init promise resolved", {
            containerId,
          });
        }

        if (!cancelled && initTokenRef.current === initToken) {
          // Widget owns the container DOM from this point.
        }
      } catch (error) {
        if (!cancelled) {
          console.error("[InbankCalculator] Failed to initialize Inbank calculator", error);
          setIsLoading(false);
        }
      }
    };

    renderWidget();

    return () => {
      cancelled = true;
      initTokenRef.current += 1;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [containerId, locale, normalizedPrice, productCode, shopUuid, shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div className={`relative w-full rounded-2xl border border-[#d7def2] bg-white p-2.5 shadow-[0_12px_30px_rgba(15,23,42,0.06)] sm:p-3 ${isLoading ? "min-h-[120px]" : ""}`}>
      {isLoading ? <Skeleton className="h-[120px] w-full rounded-xl" /> : null}
      <div ref={containerRef} id={containerId} className="w-full" />
    </div>
  );
}
