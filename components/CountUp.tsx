"use client";

import { useEffect, useMemo, useState } from "react";

export function CountUp({
  value,
  duration = 1200,
  delay = 0,
}: {
  value: string;
  duration?: number;
  delay?: number;
}) {
  const parts = useMemo(() => value.split(/(\d+)/), [value]);
  const hasNumber = useMemo(() => parts.some((p) => /^\d+$/.test(p)), [parts]);
  const [progress, setProgress] = useState(hasNumber ? 0 : 1);

  useEffect(() => {
    if (!hasNumber) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    let start = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [hasNumber, duration, delay]);

  return (
    <>
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <span key={i}>{Math.round(Number(part) * progress)}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
