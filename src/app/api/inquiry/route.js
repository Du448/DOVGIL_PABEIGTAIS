import { NextResponse } from "next/server";

const MAX_BODY_BYTES = 50 * 1024;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = globalThis.__dovgilInquiryRateLimitStore || new Map();
globalThis.__dovgilInquiryRateLimitStore = rateLimitStore;

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0]?.trim();
    if (ip) return ip;
  }

  return request.headers.get("x-real-ip") || "unknown";
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCurrency(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(numeric);
}

function buildTextField(label, value) {
  if (value == null || value === "") return "";
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function buildItemsTable(items) {
  if (!Array.isArray(items) || !items.length) return "";

  let total = 0;
  const rows = items
    .map((item) => {
      const qty = Number(item?.qty) || 0;
      const price = Number(item?.price) || 0;
      const rowTotal = qty * price;
      total += rowTotal;

      return `
        <tr>
          <td>${escapeHtml(item?.name || "")}</td>
          <td>${escapeHtml(item?.size || "")}</td>
          <td>${escapeHtml(item?.color || "")}</td>
          <td style="text-align:right;">${escapeHtml(String(qty))}</td>
          <td style="text-align:right;">${escapeHtml(formatCurrency(price))}</td>
        </tr>`;
    })
    .join("");

  return `
    <table style="border-collapse:collapse;width:100%;margin-top:16px;">
      <thead>
        <tr>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Nosaukums</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Izmērs</th>
          <th style="text-align:left;border-bottom:1px solid #ddd;padding:8px;">Krāsa</th>
          <th style="text-align:right;border-bottom:1px solid #ddd;padding:8px;">Skaits</th>
          <th style="text-align:right;border-bottom:1px solid #ddd;padding:8px;">Cena</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        <tr>
          <td colspan="4" style="text-align:right;border-top:1px solid #ddd;padding:8px;font-weight:700;">Kopā</td>
          <td style="text-align:right;border-top:1px solid #ddd;padding:8px;font-weight:700;">${escapeHtml(formatCurrency(total))}</td>
        </tr>
      </tbody>
    </table>`;
}

function buildHtml({ type, name, phone, email, address, comment, items }) {
  const safeType = type === "rfq" ? "Cenu pieprasījums" : "Ziņojums";
  const contentParts = [
    `<h2 style="margin:0 0 16px;">${escapeHtml(safeType)}</h2>`,
    buildTextField("Vārds", name),
    buildTextField("Tālrunis", phone),
    buildTextField("E-pasts", email),
    buildTextField("Adrese", address),
    comment ? `<p><strong>Komentārs:</strong></p><p>${escapeHtml(comment).replaceAll("\n", "<br />")}</p>` : "",
    type === "rfq" ? buildItemsTable(items) : "",
  ].filter(Boolean);

  return `
    <html>
      <body style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
        ${contentParts.join("")}
      </body>
    </html>`;
}

function validatePayload(payload) {
  const type = payload?.type;
  const name = normalizeText(payload?.name);
  const phone = normalizeText(payload?.phone);
  const email = normalizeText(payload?.email);
  const address = normalizeText(payload?.address);
  const comment = normalizeText(payload?.comment);

  if (type !== "contact" && type !== "rfq") {
    return { error: "Invalid type" };
  }

  if (!name || !phone || !email) {
    return { error: "Name, phone and email are required" };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Invalid email" };
  }

  const items = Array.isArray(payload?.items)
    ? payload.items
        .map((item) => ({
          id: normalizeText(item?.id),
          name: normalizeText(item?.name),
          qty: Number(item?.qty) || 0,
          size: normalizeText(item?.size),
          color: normalizeText(item?.color),
          price: Number(item?.price) || 0,
        }))
        .filter((item) => item.id || item.name)
    : [];

  return { data: { type, name, phone, email, address, comment, items } };
}

export async function POST(request) {
  const ip = getClientIp(request);
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recentHits = (rateLimitStore.get(ip) || []).filter((timestamp) => timestamp >= windowStart);

  if (recentHits.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recentHits);
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  recentHits.push(now);
  rateLimitStore.set(ip, recentHits);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large" }, { status: 400 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const website = normalizeText(payload?.website);
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const validation = validatePayload(payload);
  if (validation.error) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { type, name, phone, email, address, comment, items } = validation.data;
  const to = process.env.INQUIRY_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!to || !apiKey) {
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  const subject =
    type === "rfq"
      ? `Jauns cenu pieprasījums — ${name} (${items.length} preces)`
      : `Jauns ziņojums no mājaslapas — ${name}`;

  const html = buildHtml({ type, name, phone, email, address, comment, items });

  // TODO: switch to noreply@dovgil.lv once the domain is verified in Resend.
  const from = "DOVGIL <onboarding@resend.dev>";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        reply_to: email,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok || data?.error) {
      throw new Error(data?.error?.message || "Failed to send inquiry");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry email send failed:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
