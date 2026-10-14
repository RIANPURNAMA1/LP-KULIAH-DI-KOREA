"use client";

import { useEffect, useRef } from "react";

export function useHeroParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hormati preferensi pengguna: tanpa animasi
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;

    const tick = () => {
      raf = 0;
      if (!visible) return;

      // Easing mouse supaya gerakan terasa lembut
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      // Batasi scroll agar tidak terus bergeser setelah hero lewat
      const sy = Math.min(window.scrollY, el.offsetHeight * 1.2);

      el.style.setProperty("--mx", current.x.toFixed(3));
      el.style.setProperty("--my", current.y.toFixed(3));
      el.style.setProperty("--sy", sy.toFixed(1));

      const settled =
        Math.abs(target.x - current.x) < 0.001 &&
        Math.abs(target.y - current.y) < 0.001;

      if (!settled) raf = requestAnimationFrame(tick);
    };

    const request = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2; // -1 .. 1
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2; // -1 .. 1
      request();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      request();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) request();
    });
    io.observe(el);

    window.addEventListener("scroll", request, { passive: true });
    if (canHover) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }
    request();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", request);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return ref;
}
