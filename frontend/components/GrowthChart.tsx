"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Point = { year: string; value: number };

export function GrowthChart({ data }: { data: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const max = Math.max(...data.map((d) => d.value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={ref} className="grid grid-cols-5 items-end gap-2 sm:gap-4">
        {data.map((s, index) => {
          const isLast = index === data.length - 1;
          const percentage = Math.max((s.value / max) * 100, 4);

          return (
            <div key={s.year} className="flex flex-col items-center">
              <span
                className={`mb-2 text-[11px] tabular-nums transition-all duration-500 sm:text-xs ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                } ${
                  isLast ? "font-bold text-[#c60e31]" : "font-medium text-foreground/60"
                }`}
                style={{ transitionDelay: `${index * 100 + 250}ms` }}
              >
                {s.value.toLocaleString("id-ID")}
              </span>

              <div className="flex h-48 w-full items-end">
                <div
                  className={`bar-3d w-full transition-all duration-[900ms] ease-out ${
                    isLast
                      ? "bg-gradient-to-t from-[#8f0a24] to-[#c60e31] shadow-lg shadow-[#c60e31]/30"
                      : "bg-gradient-to-t from-[#033378] to-[#3977c5]"
                  }`}
                  style={
                    {
                      height: visible ? `${percentage}%` : "0%",
                      transitionDelay: `${index * 100}ms`,
                      "--d": "8px",
                      "--bar-top": isLast ? "#e34a68" : "#6aa0e0",
                      "--bar-side": isLast ? "#6d0719" : "#012a63",
                    } as CSSProperties
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-5 gap-2 border-t border-line/10 pt-3 sm:gap-4">
        {data.map((s, index) => {
          const isLast = index === data.length - 1;

          return (
            <span
              key={s.year}
              className={`text-center text-[11px] transition-opacity duration-700 sm:text-xs ${
                visible ? "opacity-100" : "opacity-0"
              } ${isLast ? "font-semibold text-foreground" : "text-foreground/50"}`}
              style={{ transitionDelay: `${index * 100 + 300}ms` }}
            >
              {s.year}
            </span>
          );
        })}
      </div>
    </>
  );
}
