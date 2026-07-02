"use client";

import Link from "next/link";
import { getLocaleFromPathname, withLocaleHref, t } from "@/lib/i18n";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);

  return (
    <footer className="mt-24 border-t border-line bg-[--color-soft] text-ink">
      <div className="container py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{t(locale, "footer.assortment")}</h3>
            <ul className="space-y-2.5 text-[15px] leading-7 text-ink">
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kategorija/ardurvis-dzivoklim")}>{t(locale, "nav.exteriorApartment")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kategorija/ardurvis-privatmajai")}>{t(locale, "nav.exteriorHouse")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kategorija/ieksdurvis")}>{t(locale, "nav.interior")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kategorija/bidamas-durvis")}>{t(locale, "nav.sliding")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kategorija/sleptas-durvis")}>{t(locale, "nav.hidden")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{t(locale, "footer.services")}</h3>
            <ul className="space-y-2.5 text-[15px] leading-7 text-ink">
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/pakalpojumi/uzmerisana")}>{t(locale, "footer.measurement")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/pakalpojumi/montaza")}>{t(locale, "footer.installation")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/pakalpojumi/garantija")}>{t(locale, "footer.warranty")}</Link></li>
              <li><Link className="transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/pakalpojumi/piegade")}>{t(locale, "footer.delivery")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{t(locale, "footer.company")}</h3>
            <div className="space-y-4 text-[14px] leading-7 text-ink">
              <div>
                <div className="font-semibold uppercase tracking-[0.18em]">DOVGIL SIA</div>
                <div>Reg.nr. LV40103528516</div>
              </div>
              <div>
                <div className="text-muted">Juridiskā adrese:</div>
                <div>Olaine novads, Kandavas iela 10, LV-2127</div>
              </div>
              <div>
                <div className="text-muted">A/S SWEDBANK</div>
                <div>LV75HABA0551033112333</div>
              </div>
              <div className="pt-1">
                <Link className="block transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/par-mums")}>{t(locale, "nav.about")}</Link>
                <Link className="block transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/kontakti")}>{t(locale, "nav.contacts")}</Link>
                <Link className="block text-accent transition-colors hover:text-[var(--color-accent-dark)]" href={withLocaleHref(locale, "/akcijas")}>{t(locale, "nav.deals")}</Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-muted">{t(locale, "footer.contacts")}</h3>
            <div className="space-y-4 text-[14px] leading-7">
              <div>
                <div className="font-semibold uppercase tracking-[0.18em] text-ink">BIROJS</div>
                <div className="text-ink">Krasta iela 46, Riga, LV-1003, Latvia</div>
                <a className="block text-ink transition-colors hover:text-[var(--color-accent-dark)]" href="tel:+37127548999">Tel.: +37127548999</a>
                <a className="block text-ink transition-colors hover:text-[var(--color-accent-dark)]" href="mailto:dovgil.design@gmail.com">Email: dovgil.design@gmail.com</a>
              </div>
              <div>
                <div className="font-semibold uppercase tracking-[0.18em] text-ink">NOLIKTAVA</div>
                <div className="text-ink">Malu iela 28, Riga, LV-1058, Latvia</div>
                <a className="block text-ink transition-colors hover:text-[var(--color-accent-dark)]" href="tel:+37129991129">Tel.: +371 29991129</a>
                <a className="block text-ink transition-colors hover:text-[var(--color-accent-dark)]" href="mailto:info@dovgil.lv">Email: info@dovgil.lv</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container py-5 text-center text-sm text-muted">
          Copyright © 2006 - 2026 SIA DOVGIL - All rights reserved.
        </div>
      </div>
    </footer>
  );
}
