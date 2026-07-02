"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "compare:ids";
const MAX_ITEMS = 4;
const EMPTY_COMPARE_IDS = [];
let lastCompareRaw = null;
let lastCompareIds = EMPTY_COMPARE_IDS;

export function readCompareIds() {
  if (typeof window === "undefined") return EMPTY_COMPARE_IDS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === lastCompareRaw) return lastCompareIds;

    const arr = raw ? JSON.parse(raw) : [];
    lastCompareRaw = raw;
    lastCompareIds = Array.isArray(arr) ? arr.slice(0, MAX_ITEMS) : EMPTY_COMPARE_IDS;
    return lastCompareIds;
  } catch {
    lastCompareRaw = null;
    lastCompareIds = EMPTY_COMPARE_IDS;
    return EMPTY_COMPARE_IDS;
  }
}

export function writeCompareIds(ids) {
  if (typeof window === "undefined") return;
  const next = Array.from(new Set(ids)).slice(0, MAX_ITEMS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  try {
    window.dispatchEvent(new Event("compare:change"));
  } catch {}
}

const CompareContext = createContext({
  ids: [],
  has: () => false,
  add: () => {},
  remove: () => {},
  toggle: () => {},
  clear: () => {},
  max: MAX_ITEMS,
});

export function CompareProvider({ children }) {
  const ids = useSyncExternalStore(
    useCallback((onStoreChange) => {
      if (typeof window === "undefined") return () => {};
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("compare:change", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("compare:change", onStoreChange);
      };
    }, []),
    readCompareIds,
    () => EMPTY_COMPARE_IDS
  );

  const emitChange = useCallback(() => {
    try {
      window.dispatchEvent(new Event("compare:change"));
    } catch {}
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const add = useCallback((id) => {
    if (!id) return;
    if (ids.includes(id)) return;
    const next = [...ids, id].slice(0, MAX_ITEMS);
    writeCompareIds(next);
    emitChange();
  }, [emitChange, ids]);

  const remove = useCallback((id) => {
    const next = ids.filter((x) => x !== id);
    writeCompareIds(next);
    emitChange();
  }, [emitChange, ids]);

  const toggle = useCallback((id) => {
    if (ids.includes(id)) {
      const next = ids.filter((x) => x !== id);
      writeCompareIds(next);
      emitChange();
    } else if (ids.length < MAX_ITEMS) {
      const next = [...ids, id];
      writeCompareIds(next);
      emitChange();
    }
  }, [emitChange, ids]);

  const clear = useCallback(() => {
    writeCompareIds([]);
    emitChange();
  }, [emitChange]);

  const value = useMemo(() => ({ ids, has, add, remove, toggle, clear, max: MAX_ITEMS }), [ids, has, add, remove, toggle, clear]);

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
