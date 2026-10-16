"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
// Pastikan Anda menyesuaikan path import nav jika diperlukan
import { nav } from "@/lib/content";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/lib/i18n";

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line/10 bg-background/70 backdrop-blur-md" : "border-line/10 bg-elevated"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground text-xl tracking-tight" onClick={() => setOpen(false)}>
          <Image
            src="/LOGO%20KARIR%20DI%20KOREA.png"
            alt="Karir di Korea"
            width={140}
            height={40}
            className="h-10 w-auto hidden dark:block dark:brightness-0 dark:invert"
            priority
          />
          <Image
            src="/LOGO2.png"
            alt="Karir di Korea"
            width={140}
            height={40}
            className="h-10 w-auto block dark:hidden"
            priority
          />
        </Link>

        {/* CENTER NAV LINKS */}
        <ul className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname === n.href ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {t(n.label)}
                {/* Menambahkan panah dropdown tiruan seperti di referensi untuk menu tertentu jika diperlukan */}
                {/* Anda bisa menambahkan kondisi n.hasDropdown di objek nav Anda */}
                {n.label === "Learning Programs" && (
                   <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 opacity-70">
                     <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {/* Toggle tema terang/gelap */}
          <LanguageToggle />
          <ThemeToggle />

          {/* Tombol Biru Solid seperti "Login" */}
          <Link 
              href="#daftar" 
            className="group relative overflow-hidden flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c60e31] to-[#8f0a24] px-5 py-2 text-sm font-semibold text-white transition-colors hover:from-[#b00c2c] hover:to-[#7c0820] shadow-[0_0_10px_rgba(198,14,49,0.25)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            {/* Ikon User kecil */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="relative">{t("Cek Kelayakan")}</span>
          </Link>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            aria-label={t("Buka menu")}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center text-foreground/70"
          >
            <span className="text-2xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <div className={`border-t px-6 py-4 md:hidden transition-colors duration-300 ${scrolled ? "border-line/10 bg-elevated/80 backdrop-blur-md" : "border-line/10 bg-elevated"}`}>
          <ul className="flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link 
                  href={n.href} 
                  onClick={() => setOpen(false)} 
                  className="block py-3 text-base text-foreground/70 hover:text-foreground border-b border-line/10"
                >
                  {t(n.label)}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 flex flex-col gap-3">
            <Link 
            href="#daftar" 
              onClick={() => setOpen(false)} 
              className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c60e31] to-[#8f0a24] py-3 text-center text-sm font-semibold text-white"
            >
               <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="relative">{t("Cek Kelayakan")}</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}