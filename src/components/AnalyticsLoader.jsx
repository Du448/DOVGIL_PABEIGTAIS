"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// This component only injects analytics when:
// 1) user consented to non-essential cookies (localStorage: cookie-consent === 'all'), and
// 2) a public env is configured (NEXT_PUBLIC_PLAUSIBLE_DOMAIN or NEXT_PUBLIC_GA_ID)
// Provide your IDs/domains via env; do NOT hardcode secrets.

export default function AnalyticsLoader() {
  const [consented, setConsented] = useState(false);
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    const read = () => {
      try { setConsented(localStorage.getItem("cookie-consent") === "all"); } catch { setConsented(false); }
    };
    read();
    const onChange = (e) => read();
    window.addEventListener("cookie-consent", onChange);
    return () => window.removeEventListener("cookie-consent", onChange);
  }, []);

  if (!consented) return null;

  // Only render when one of env vars is provided — otherwise no-op
  return (
    <>
      {plausibleDomain ? (
        <Script
          id="plausible"
          strategy="afterInteractive"
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
        />
      ) : null}
      {gaId ? (
        <>
          <Script id="ga" strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
          <Script id="ga-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
    </>
  );
}
