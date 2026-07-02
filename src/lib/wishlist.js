const STORAGE_KEY = "wishlistIds";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function readWishlistIds() {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? safeParse(raw) : null;
  if (!Array.isArray(parsed)) return [];
  return parsed.filter((x) => typeof x === "string");
}

export function writeWishlistIds(ids) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("wishlist:change"));
}

export function toggleWishlistId(id) {
  const ids = readWishlistIds();
  const next = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  writeWishlistIds(next);
  return next;
}

export function isWishlisted(id) {
  return readWishlistIds().includes(id);
}
