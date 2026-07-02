"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/data/products";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocaleHref, t } from "@/lib/i18n";

export default function ContactsClient() {
  const locale = getLocaleFromPathname(usePathname());
  const searchParams = useSearchParams();
  const productId = searchParams.get("produkts");

  const product = useMemo(() => (productId ? getProductById(productId) : null), [productId]);

  const prefillMessage = (loc, p) => {
    if (!p) return "";
    if (loc === "lt") return `Noriu pasiūlymo dėl modelio: ${p.name}`;
    if (loc === "en") return `I would like an offer for the model: ${p.name}`;
    return `Vēlos piedāvājumu par modeli: ${p.name}`;
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(() => prefillMessage(locale, product));
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [website, setWebsite] = useState("");
  // Track whether the message is still autofilled to avoid overwriting user edits
  const [isAutofilled, setIsAutofilled] = useState(!!product);
  const officeLabel = locale === "en" ? "OFFICE" : "BIROJS";
  const warehouseLabel = locale === "en" ? "WAREHOUSE" : "NOLIKTAVA";

  // If product in query changes, re-enable autofill
  useEffect(() => {
    setIsAutofilled(!!product);
  }, [product]);

  // Update prefilled message when locale or product changes, if user hasn't edited it
  useEffect(() => {
    if (isAutofilled) {
      setMessage(prefillMessage(locale, product));
    }
  }, [locale, product, isAutofilled]);

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name,
          phone,
          email,
          comment: message,
          website,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        throw new Error("send_failed");
      }

      setSubmitted(true);
    } catch {
      setSubmitError(t(locale, "contacts.sendError") || "Failed to send the request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "contacts.title")}</h1>
          {product && (
            <div className="mt-2 text-sm text-muted">
              {t(locale, "contacts.relatedToProduct")} <Link className="text-ink underline" href={withLocaleHref(locale, `/produkts/${product.id}`)}>{product.name}</Link>
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: contact info + map */}
            <div className="space-y-4">
              <div id="salons" className="rounded-sm border border-line bg-white p-4">
                <div className="text-sm font-semibold tracking-wide text-ink mb-3">{t(locale, "contacts.contactUs")}</div>
                <div className="space-y-4 text-[15px] text-ink">
                  <div>
                    <div className="font-semibold uppercase tracking-wide mb-1">{officeLabel}</div>
                    <div>Krasta iela 46, Riga, LV-1003, Latvia</div>
                    <a className="block text-ink" href="tel:+37127548999">Tel.: +37127548999</a>
                    <a className="block text-ink" href="mailto:dovgil.design@gmail.com">Email: dovgil.design@gmail.com</a>
                  </div>
                  <div>
                    <div className="font-semibold uppercase tracking-wide mb-1">{warehouseLabel}</div>
                    <div>Malu iela 28, Riga, LV-1058, Latvia</div>
                    <a className="block text-ink" href="tel:+37129991129">Tel.: +371 29991129</a>
                    <a className="block text-ink" href="mailto:info@dovgil.lv">Email: info@dovgil.lv</a>
                  </div>
                </div>
              </div>

              <div className="rounded-sm border border-line overflow-hidden">
                <iframe
                  title={t(locale, "contacts.mapTitle")}
                  src="https://www.google.com/maps?q=Krasta%20iela%2046%2C%20Riga%2C%20LV-1003%2C%20Latvia&output=embed"
                  className="w-full h-[280px] sm:h-[340px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div>
              <form onSubmit={onSubmit} className="rounded-sm border border-line bg-white p-4 space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm text-muted mb-1">{t(locale, "contacts.formName")}</label>
                    <input
                      type="text"
                      id="contact-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      aria-invalid={submitted && !name ? "true" : "false"}
                      className="w-full rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink"
                    />
                    {submitted && !name ? (
                      <div className="mt-1 text-[13px] text-destructive" role="alert">{t(locale, "errors.required") || "Lauks ir obligāts"}</div>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm text-muted mb-1">{t(locale, "contacts.formPhone")}</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      aria-invalid={submitted && !phone ? "true" : "false"}
                      className="w-full rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink"
                    />
                    {submitted && !phone ? (
                      <div className="mt-1 text-[13px] text-destructive" role="alert">{t(locale, "errors.required") || "Lauks ir obligāts"}</div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm text-muted mb-1">{t(locale, "contacts.formEmail")}</label>
                  <input
                    type="email"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={submitted && !email ? "true" : "false"}
                    className="w-full rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink"
                  />
                  {submitted && !email ? (
                    <div className="mt-1 text-[13px] text-destructive" role="alert">{t(locale, "errors.required") || "Lauks ir obligāts"}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm text-muted mb-1">{t(locale, "contacts.formMessage")}</label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setIsAutofilled(false); }}
                    rows={5}
                    className="w-full rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink"
                    placeholder={t(locale, "contacts.formPlaceholder")}
                  />
                </div>
                <div aria-hidden="true" className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
                  <input
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-accent hover:bg-accent-dark text-white rounded-sm px-5 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--color-ink] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (t(locale, "contacts.sending") || "Sending...") : t(locale, "contacts.submit")}
                  </button>
                </div>
                {submitError ? (
                  <div className="text-[13px] text-destructive" role="alert">
                    {submitError}
                  </div>
                ) : null}
                {submitted && (
                  <div className="text-ink">
                    {t(locale, "contacts.thanks")}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
