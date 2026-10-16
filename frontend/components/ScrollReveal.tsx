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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const observeElement = (el: HTMLElement) => {
      if (el.classList.contains("is-visible")) return;
      if ((el as HTMLElement & { __revealObserved?: boolean }).__revealObserved) return;
      (el as HTMLElement & { __revealObserved?: boolean }).__revealObserved = true;
      const parent = el.parentElement;
      if (parent) {
        const index = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = `${Math.min(index, 6) * 60}ms`;
      }
      observer.observe(el);
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(SELECTOR)
        .forEach((el) => observeElement(el));
    };

    scan();

    // Konten yang dirender setelah mount (mis. langkah asesmen) juga harus direveal.
    const mutations = new MutationObserver(() => scan());
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
