import { useCallback, useEffect, useState } from "react";

const CHECKED_KEY = "mcp-security-checklist:v1:checked";
const OPEN_KEY = "mcp-security-checklist:v1:open-sections";

function loadStringSet(key: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x): x is string => typeof x === "string"));
  } catch {
    return new Set();
  }
}

function saveStringSet(key: string, set: Set<string>) {
  try {
    window.localStorage.setItem(key, JSON.stringify([...set]));
  } catch {
    // ignore quota / privacy mode
  }
}

export function useChecked() {
  const [checked, setChecked] = useState<Set<string>>(() =>
    loadStringSet(CHECKED_KEY),
  );

  useEffect(() => {
    saveStringSet(CHECKED_KEY, checked);
  }, [checked]);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => setChecked(new Set()), []);

  return { checked, toggle, reset };
}

export function useOpenSection() {
  const [open, setOpen] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(OPEN_KEY);
      return raw && typeof raw === "string" ? raw : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (open === null) window.localStorage.removeItem(OPEN_KEY);
      else window.localStorage.setItem(OPEN_KEY, open);
    } catch {
      // ignore
    }
  }, [open]);

  const toggle = useCallback((id: string) => {
    setOpen((prev) => (prev === id ? null : id));
  }, []);

  const collapse = useCallback(() => setOpen(null), []);

  return { open, toggle, collapse };
}
