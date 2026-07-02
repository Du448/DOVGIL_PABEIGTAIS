"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, t, withLocaleHref } from "@/lib/i18n";

export default function GlobalError({ error, reset }) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname || "/");

  return (
    <main className="min-h-[60vh] bg-[--color-bg]">
      <section className="border-b border-line">
        <div className="container py-10 text-center">
          <div className="text-8xl font-bold text-accent">500</div>
          <h1 className="mt-3 text-3xl font-semibold text-ink">{t(locale, "errors.somethingWrong") || "Kaut kas nogāja greizi"}</h1>
          <p className="mt-2 text-muted">{t(locale, "errors.tryAgain") || "Lūdzu, mēģiniet vēlreiz vai atgriezieties sākumlapā."}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={() => reset?.()} className="inline-block rounded-sm bg-accent px-6 py-2.5 text-white hover:bg-accent-dark">
              {t(locale, "common.retry") || "Mēģināt vēlreiz"}
            </button>
            <Link href={withLocaleHref(locale, "/")} className="inline-block rounded-sm border border-line px-6 py-2.5">
              {t(locale, "common.backHome") || "Sākumlapa"}
            </Link>
          </div>
          {process.env.NODE_ENV !== "production" && error ? (
            <pre className="mx-auto mt-6 max-w-3xl overflow-auto rounded-sm bg-soft p-3 text-left text-[12px] text-ink/80">
              {String(error?.stack || error?.message || "")}
            </pre>
          ) : null}
        </div>
      </section>
    </main>
  );
}
