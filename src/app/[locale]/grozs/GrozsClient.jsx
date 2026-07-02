"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRfq } from "@/lib/rfq";
import { getProductById } from "@/data/products";
import { t } from "@/lib/i18n";

export default function GrozsClient({ locale }) {
  const { items, remove, setQty, clear } = useRfq();
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");

  const rows = useMemo(() => items.map((it, index) => {
    const p = getProductById(it.id);
    return { index, it, p };
  }), [items]);

  const rfqItems = useMemo(() => rows.map(({ it, p }) => ({
    id: it.id,
    name: p?.name || it.id,
    qty: Number(it.qty) || 1,
    size: it.size || "",
    color: it.color || "",
    price: Number(p?.price) || 0,
  })), [rows]);

  const clearForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setComment("");
    setWebsite("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    const payload = {
      type: "rfq",
      name,
      phone,
      email,
      address,
      comment,
      items: rfqItems,
      website,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.ok) {
        throw new Error("send_failed");
      }

      setSent(true);
      clear();
      clearForm();
    } catch {
      setSubmitError(t(locale, "rfq.sendError") || "Neizdevās nosūtīt pieprasījumu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="border-b border-line">
        <div className="container py-6">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-ink">{t(locale, "rfq.title") || "Mans pieprasījums"}</h1>
          <p className="mt-2 text-muted">{t(locale, "rfq.subtitle") || "Izvēlēto durvju saraksts nosūtīšanai piedāvājumam."}</p>
        </div>
      </section>

      <section>
        <div className="container py-6">
          {rows.length === 0 ? (
            <div className="text-muted">{t(locale, "rfq.empty") || "Saraksts ir tukšs. Pievienojiet produktus no produktu lapas vai katalogiem."}</div>
          ) : (
            <div className="space-y-6">
              <div className="divide-y divide-[--color-line] border border-line rounded-sm bg-white">
                {rows.map(({ index, it, p }) => (
                  <div key={`${it.id}-${index}`} className="grid grid-cols-1 sm:grid-cols-[120px_1fr_auto] items-center gap-3 px-3 py-3">
                    <div className="relative h-24 w-24 rounded-sm border border-line bg-[--color-soft] overflow-hidden">
                      {p?.images?.[0] ? <Image src={p.images[0]} alt={p.name} fill unoptimized sizes="100px" className="object-contain" /> : null}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[15px] text-ink font-medium">{p?.name || it.id}</div>
                      <div className="text-[13px] text-muted">{p?.collection}</div>
                      <div className="mt-1 text-[13px] text-ink/80 flex flex-wrap gap-3">
                        {it.color ? <span>{t(locale, "rfq.color") || "Krāsa"}: {it.color}</span> : null}
                        {it.size ? <span>{t(locale, "rfq.size") || "Izmērs"}: {it.size}</span> : null}
                        {p?.price != null ? <span>{t(locale, "rfq.price") || "Cena"}: €{p.price}</span> : null}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={it.qty}
                        onChange={(e) => setQty(index, e.target.value)}
                        className="w-16 rounded-sm border border-line bg-white px-2 py-1 text-[14px] text-ink"
                        aria-label={t(locale, "rfq.quantity") || "Daudzums"}
                      />
                      <button type="button" onClick={() => remove(index)} className="rounded-sm border border-line px-2 py-1.5 text-[13px] hover:border-[--color-muted]">
                        {t(locale, "rfq.remove") || "Noņemt"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submission form */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-3 border border-line rounded-sm bg-white p-4"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-[13px] text-muted">{t(locale, "rfq.name") || "Vārds"}</label>
                  <input name="name" required value={name} onChange={(e) => setName(e.target.value)} className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-[13px] text-muted">{t(locale, "rfq.phone") || "Tālrunis"}</label>
                  <input name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-[13px] text-muted">{t(locale, "rfq.email") || "E-pasts"}</label>
                  <input name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink" />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label className="text-[13px] text-muted">{t(locale, "rfq.address") || "Objekta adrese"}</label>
                  <input name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink" />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 gap-2">
                  <label className="text-[13px] text-muted">{t(locale, "rfq.comment") || "Komentārs"}</label>
                  <textarea name="comment" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} className="rounded-sm border border-line bg-white px-3 py-2 text-[15px] text-ink" />
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
                <div className="md:col-span-2 flex items-center justify-between">
                  <button type="button" onClick={clear} className="rounded-sm border border-line px-4 py-2 text-[14px] hover:border-[--color-muted]">{t(locale, "rfq.clearAll") || "Notīrīt sarakstu"}</button>
                  <button type="submit" disabled={isSubmitting} className="rounded-sm bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white px-5 py-2.5 text-[14px] shadow-premium disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? (t(locale, "rfq.sending") || "Nosūta...") : (t(locale, "rfq.send") || "Nosūtīt pieprasījumu")}</button>
                </div>
                {submitError ? <div className="md:col-span-2 text-[13px] text-destructive" role="alert">{submitError}</div> : null}
              </form>

              {sent ? (
                <div className="rounded-sm border border-line bg-[--color-soft] p-4 text-ink">
                  {t(locale, "rfq.thanks") || "Paldies! Sazināsimies tuvākajā laikā."}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
