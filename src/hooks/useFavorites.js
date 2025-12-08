import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "pinnedSkins";

export function useFavorites() {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to read favorites from localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to write favorites to localStorage", e);
    }
    try {
      const ev = new CustomEvent("pinnedSkins:changed", { detail: items });
      window.dispatchEvent(ev);
    } catch (e) {
      // ignore
    }
  }, [items]);

  useEffect(() => {
    function onCustom(e) {
      const next = e && e.detail ? e.detail : null;
      if (next && JSON.stringify(next) !== JSON.stringify(items)) setItems(next);
    }

    function onStorage(e) {
      if (e.key !== STORAGE_KEY) return;
      try {
        const next = e.newValue ? JSON.parse(e.newValue) : [];
        if (JSON.stringify(next) !== JSON.stringify(items)) setItems(next);
      } catch (err) {
        // ignore
      }
    }

    window.addEventListener("pinnedSkins:changed", onCustom);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("pinnedSkins:changed", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, [items]);

  const add = useCallback((market_hash_name) => {
    setItems((prev) => {
      if (prev.includes(market_hash_name)) return prev;
      return [...prev, market_hash_name];
    });
  }, []);

  const remove = useCallback((market_hash_name) => {
    setItems((prev) => prev.filter((p) => p !== market_hash_name));
  }, []);

  const toggle = useCallback((market_hash_name) => {
    setItems((prev) => (prev.includes(market_hash_name) ? prev.filter((p) => p !== market_hash_name) : [...prev, market_hash_name]));
  }, []);

  const isFavorite = useCallback((market_hash_name) => items.includes(market_hash_name), [items]);

  return { items, add, remove, toggle, isFavorite };
}
