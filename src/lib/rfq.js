"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "rfq:items";

// item shape: { id: string, qty: number, size?: string, color?: string }

function readRaw() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeRaw(items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  try { window.dispatchEvent(new Event("rfq:change")); } catch {}
}

const RfqContext = createContext({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  setQty: () => {},
  has: () => false,
});

export function RfqProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readRaw());
    const on = () => setItems(readRaw());
    window.addEventListener("storage", on);
    window.addEventListener("rfq:change", on);
    return () => {
      window.removeEventListener("storage", on);
      window.removeEventListener("rfq:change", on);
    };
  }, []);

  const has = useCallback((id) => items.some((x) => x.id === id), [items]);

  const add = useCallback((payload) => {
    const { id, qty = 1, size, color } = payload || {};
    if (!id) return;
    const existing = items.find((x) => x.id === id && x.size === size && x.color === color);
    let next;
    if (existing) {
      next = items.map((x) => x === existing ? { ...x, qty: Math.min(99, (x.qty || 1) + (qty || 1)) } : x);
    } else {
      next = [...items, { id, qty: Math.max(1, Math.min(99, qty || 1)), size, color }];
    }
    setItems(next);
    writeRaw(next);
  }, [items]);

  const remove = useCallback((idxOrId) => {
    let next = items;
    if (typeof idxOrId === "number") {
      next = items.filter((_, i) => i !== idxOrId);
    } else {
      next = items.filter((x) => x.id !== idxOrId);
    }
    setItems(next);
    writeRaw(next);
  }, [items]);

  const clear = useCallback(() => { setItems([]); writeRaw([]); }, []);

  const setQty = useCallback((index, qty) => {
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    const next = items.map((x, i) => i === index ? { ...x, qty: q } : x);
    setItems(next);
    writeRaw(next);
  }, [items]);

  const value = useMemo(() => ({ items, add, remove, clear, setQty, has }), [items, add, remove, clear, setQty, has]);

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfq() {
  return useContext(RfqContext);
}
