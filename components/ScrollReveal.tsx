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

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(SELECTOR),
    ).filter((el) => !el.classList.contains("is-visible"));

    if (targets.length === 0) return;

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

    targets.forEach((el) => {
      const parent = el.parentElement;
      if (parent) {
        const index = Array.prototype.indexOf.call(parent.children, el);
        el.style.transitionDelay = `${Math.min(index, 6) * 60}ms`;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
