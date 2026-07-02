import Link from "next/link";
import { headers } from "next/headers";
import { getLocaleFromPathname, t, withLocaleHref } from "@/lib/i18n";

export default async function NotFound() {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || "/";
  const locale = getLocaleFromPathname(pathname);

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-10 text-center">
          <div className="text-8xl font-bold text-accent">404</div>
          <h1 className="mt-3 text-3xl font-semibold text-ink">{t(locale, "errors.notFound") || "Lapa nav atrasta"}</h1>
          <p className="mt-2 text-muted">{t(locale, "errors.notFoundDesc") || "Diemžēl meklētā lapa neeksistē vai ir pārvietota."}</p>
          <div className="mt-6">
            <Link href={withLocaleHref(locale, "/")} className="inline-block bg-accent hover:bg-accent-dark text-white rounded-sm px-6 py-2.5">
              {t(locale, "common.backHome") || "Atpakaļ uz sākumlapu"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
