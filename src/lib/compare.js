"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "compare:ids";
const MAX_ITEMS = 4;

export function readCompareIds() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.slice(0, MAX_ITEMS) : [];
  } catch {
    return [];
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
  const [ids, setIds] = useState([]);

  useEffect(() => {
    setIds(readCompareIds());
    const onChange = () => setIds(readCompareIds());
    window.addEventListener("storage", onChange);
    window.addEventListener("compare:change", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("compare:change", onChange);
    };
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);

  const add = useCallback((id) => {
    if (!id) return;
    if (ids.includes(id)) return;
    const next = [...ids, id].slice(0, MAX_ITEMS);
    setIds(next);
    writeCompareIds(next);
  }, [ids]);

  const remove = useCallback((id) => {
    const next = ids.filter((x) => x !== id);
    setIds(next);
    writeCompareIds(next);
  }, [ids]);

  const toggle = useCallback((id) => {
    if (ids.includes(id)) {
      const next = ids.filter((x) => x !== id);
      setIds(next);
      writeCompareIds(next);
    } else if (ids.length < MAX_ITEMS) {
      const next = [...ids, id];
      setIds(next);
      writeCompareIds(next);
    }
  }, [ids]);

  const clear = useCallback(() => {
    setIds([]);
    writeCompareIds([]);
  }, []);

  const value = useMemo(() => ({ ids, has, add, remove, toggle, clear, max: MAX_ITEMS }), [ids, has, add, remove, toggle, clear]);

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
