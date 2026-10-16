"use client";

import { useLanguage } from "@/lib/i18n";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang } = useLanguage();
  const isEn = lang === "en";

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={isEn ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
      title={isEn ? "Bahasa Indonesia" : "English"}
      className={`group relative flex h-9 items-center gap-1.5 rounded-full border border-line/10 bg-foreground/5 px-2.5 text-foreground/70 transition-colors duration-300 hover:bg-foreground/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z" />
      </svg>
      <span className="text-xs font-bold uppercase tracking-wide">
        {isEn ? "EN" : "ID"}
      </span>
    </button>
  );
}
