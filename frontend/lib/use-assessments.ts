"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listAssessments, type Assessment } from "@/lib/api";

export function useAssessments({ pollMs = 0 }: { pollMs?: number } = {}) {
  const [items, setItems] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const hasLoaded = useRef(false);

  const run = useCallback(async (silent: boolean) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await listAssessments();
      setItems(data);
      setUpdatedAt(new Date());
      hasLoaded.current = true;
    } catch (e) {
      if (!hasLoaded.current) {
        setError(e instanceof Error ? e.message : "Gagal memuat data pendaftar.");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const reload = useCallback(() => {
    void run(false);
  }, [run]);

  useEffect(() => {
    void run(false);
  }, [run]);

  useEffect(() => {
    if (!pollMs) return;
    const id = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      void run(true);
    }, pollMs);
    return () => clearInterval(id);
  }, [pollMs, run]);

  return { items, setItems, loading, refreshing, error, updatedAt, reload };
}
