"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "rfq:items";
const EMPTY_RFQ_ITEMS = [];
let lastRfqRaw = null;
let lastRfqItems = EMPTY_RFQ_ITEMS;

// item shape: { id: string, qty: number, size?: string, color?: string }

function readRaw() {
  if (typeof window === "undefined") return EMPTY_RFQ_ITEMS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === lastRfqRaw) return lastRfqItems;

    const arr = raw ? JSON.parse(raw) : [];
    lastRfqRaw = raw;
    lastRfqItems = Array.isArray(arr) ? arr : EMPTY_RFQ_ITEMS;
    return lastRfqItems;
  } catch {
    lastRfqRaw = null;
    lastRfqItems = EMPTY_RFQ_ITEMS;
    return EMPTY_RFQ_ITEMS;
  }
}

function writeRaw(items) {
  if (typeof window === "undefined") return;
  const next = Array.isArray(items) ? items : EMPTY_RFQ_ITEMS;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  lastRfqRaw = JSON.stringify(next);
  lastRfqItems = next;
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
  const items = useSyncExternalStore(
    useCallback((onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("rfq:change", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("rfq:change", onStoreChange);
      };
    }, []),
    readRaw,
    () => EMPTY_RFQ_ITEMS
  );

  const emitChange = useCallback(() => {
    try {
      window.dispatchEvent(new Event("rfq:change"));
    } catch {}
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
    writeRaw(next);
    emitChange();
  }, [emitChange, items]);

  const remove = useCallback((idxOrId) => {
    let next = items;
    if (typeof idxOrId === "number") {
      next = items.filter((_, i) => i !== idxOrId);
    } else {
      next = items.filter((x) => x.id !== idxOrId);
    }
    writeRaw(next);
    emitChange();
  }, [emitChange, items]);

  const clear = useCallback(() => { writeRaw([]); emitChange(); }, [emitChange]);

  const setQty = useCallback((index, qty) => {
    const q = Math.max(1, Math.min(99, Number(qty) || 1));
    const next = items.map((x, i) => i === index ? { ...x, qty: q } : x);
    writeRaw(next);
    emitChange();
  }, [emitChange, items]);

  const value = useMemo(() => ({ items, add, remove, clear, setQty, has }), [items, add, remove, clear, setQty, has]);

  return <RfqContext.Provider value={value}>{children}</RfqContext.Provider>;
}

export function useRfq() {
  return useContext(RfqContext);
}
