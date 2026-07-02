export function ikSrc(url, { w, q = 75 } = {}) {
  if (typeof url !== "string" || !url.includes("ik.imagekit.io")) {
    return url;
  }

  const width = Number(w);
  if (!Number.isFinite(width) || width <= 0) {
    return url;
  }

  const hashIndex = url.indexOf("#");
  const base = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
  const separator = base.includes("?") ? "&" : "?";

  return `${base}${separator}tr=w-${width},f-auto,q-${q}${hash}`;
}
