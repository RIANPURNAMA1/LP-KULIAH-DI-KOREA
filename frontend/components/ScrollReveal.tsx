"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "article",
  "li",
  "dd",
  "dt",
  "details",
  "blockquote",
  "figure",
];

const SELECTOR = TAGS.map((t) => `main ${t}`).join(",");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -64px 0px" },
    );

    const isInViewport = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const revealIfVisible = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) return;
      // Konten yang sudah terlihat langsung ditampilkan agar tidak "hilang"
      // ketika langkah form diganti atau animasi gagal terpicu.
      if (isInViewport(el)) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    };

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) return;
      if ((el as HTMLElement & { __revealObserved?: boolean }).__revealObserved) {
        revealIfVisible(el);
        return;
      }
      (el as HTMLElement & { __revealObserved?: boolean }).__revealObserved = true;
      const parent = el.parentElement;
      if (parent) {
        const index = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = `${Math.min(index, 6) * 60}ms`;
      }
      observer.observe(el);
      revealIfVisible(el);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(SELECTOR)
        .forEach((el) => observeElement(el));
    };

    scan();

    // Konten yang dirender setelah mount (mis. langkah form) juga harus direveal.
    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    // Jaring pengaman: pastikan tidak ada teks yang tetap tersembunyi.
    const safety = window.setInterval(scan, 700);

    return () => {
      window.clearInterval(safety);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
