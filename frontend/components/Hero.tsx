"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui";
import { heroStats, waLink } from "@/lib/content";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { CountUp } from "@/components/CountUp";
import { useLanguage } from "@/lib/i18n";

/**
 * mx / my : pergeseran (px) mengikuti mouse
 * sy      : pergeseran (px) per 1px scroll (positif = turun, lebih lambat dari halaman;
 *           negatif = naik, terasa lebih dekat)
 */
const layer = (mx = 0, my = 0, sy = 0): CSSProperties => ({
  transform: `translate3d(calc(var(--mx, 0) * ${mx}px), calc(var(--my, 0) * ${my}px + var(--sy, 0) * ${sy}px), 0)`,
  willChange: "transform",
});

export function Hero() {
  const heroRef = useHeroParallax<HTMLElement>();
  const { t } = useLanguage();

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-[650px] overflow-hidden bg-[#033378] pt-24 pb-0 md:min-h-[680px] md:pt-28"
    >
      {/* Background effects (layer terjauh) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Red ambient glow */}
        <div className="absolute inset-0" style={layer(18, 12, 0.22)}>
          <div className="absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-[#c60e31]/45 blur-[110px]" />
          <div className="absolute -right-32 top-10 h-[400px] w-[400px] rounded-full bg-[#c60e31]/30 blur-[120px]" />
        </div>

        {/* Blue light */}
        <div className="absolute inset-0" style={layer(-22, -14, 0.14)}>
          <div className="absolute left-1/3 top-1/4 h-[420px] w-[420px] rounded-full bg-[#1760ad]/30 blur-[130px]" />
        </div>

        {/* Bottom atmosphere */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#011d48]/55 via-[#033378]/20 to-transparent" />

        {/* Background image — dibuat lebih besar agar tidak terlihat tepinya saat bergeser */}
        <div className="absolute -inset-[8%]" style={layer(-8, -6, 0.38)}>
          <Image
            src="/bg-hero.jpg"
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-cover object-center opacity-30"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-8 px-3 md:min-h-[510px] md:grid-cols-[0.92fr_1.08fr] md:gap-4 lg:px-4">
        {/* LEFT — Headline */}
        <div
          className="relative z-20 max-w-[570px] pb-12 pt-8 md:pb-20 md:pt-0"
          style={layer(4, 3, 0)}
        >
          <h1 className="font-sans text-[clamp(2.65rem,5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-white">
            {t("Kuliah S1")}
            <br />
            {t("di Korea")}
            <br />
            <span className="mt-1 inline-block bg-gradient-to-r from-white via-[#ffb2c1] to-[#c60e31] bg-clip-text text-transparent">
              {t("Bayar dari")}
              <br />
              {t("gaji sendiri")}
            </span>
          </h1>

          <p className="mt-6 max-w-[490px] text-base leading-relaxed text-white/85 md:text-lg">
            {t(
              "Kuliah berbahasa Inggris di Busan, peluang beasiswa hingga 100%, kerja part-time legal, dan pendampingan menuju karier profesional atau bisnis global",
            )}
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            {/* WhatsApp */}
            <ButtonLink
              href={waLink()}
              external
              variant="outline"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-white/85 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 origin-left scale-x-0 bg-[#25D366] transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 inline-flex items-center gap-2">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                {t("Konsultasi Gratis")}
              </span>
            </ButtonLink>

            {/* Eligibility CTA */}
            <ButtonLink
              href="/pendaftaran"
              className="inline-flex items-center justify-center rounded-full bg-[#c60e31] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#c60e31]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a90b29]"
            >
              {t("Daftar Sekarang")}
            </ButtonLink>
          </div>

          {/* Program information */}
          <div className="mt-7 space-y-2">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-4 py-2 text-xs font-medium text-white/95 backdrop-blur-sm">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              Dong-eui University · Busan · Spring 2027
            </p>

            <p className="pl-1 text-xs leading-relaxed text-white/70">
              {t(
                "Pendaftaran gratis · Persyaratan bahasa sesuai ketentuan program",
              )}
            </p>
          </div>
        </div>

        {/* RIGHT — Hero image */}
        <div className="relative mx-auto w-full max-w-[650px]">
          {/* Red accent behind image (layer tengah) */}
          <div
            className="pointer-events-none absolute right-[3%] top-[14%]"
            style={layer(12, 9, 0)}
          >
            <div className="h-[230px] w-[230px] rounded-full bg-[#c60e31] opacity-80 blur-[1px] md:h-[300px] md:w-[300px]" />
          </div>

          {/* Soft blue glow */}
          <div
            className="pointer-events-none absolute left-[15%] top-[25%]"
            style={layer(-16, -10, 0)}
          >
            <div className="h-[260px] w-[260px] rounded-full bg-[#2779d4]/35 blur-[80px]" />
          </div>

          {/* Main image (layer terdekat dari konten) */}
          <div className="relative z-10" style={layer(-16, -10, 0)}>
            <Image
              src="/8.png"
              alt="Mahasiswa internasional Dong-eui University di Busan, Korea Selatan"
              width={1000}
              height={1000}
              priority
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>

          {/* Floating badge (layer paling depan) */}
          <div
            className="absolute bottom-[8%] right-[2%] z-20 md:bottom-[9%] md:right-[1%]"
            style={layer(-16, -10, 0)}
          >
            <div
              className="hero-float rounded-md border border-white bg-[#033378]/95 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-md md:px-5 md:py-4"
              style={{ animation: "hero-float 5s ease-in-out infinite" }}
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-bold tracking-wide text-white md:text-base">
                    {t("Ayo kuliah di Korea!")}
                  </p>
                  <p className="mt-1 text-xs text-white/75">
                    부산에서 공부하자!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City skyline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-0 h-[100px] w-full md:h-[145px]"
        style={layer(6, 0, 0.12)}
      >
        <div className="h-full w-full bg-[url('/city-silhouette.png')] bg-repeat-x bg-bottom bg-contain opacity-50" />
      </div>

      {/* Bottom blend */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-8 w-full bg-gradient-to-t from-[#011632]/40 to-transparent" />

      {/* Stats */}
      <div
        className="relative z-30 mx-auto mb-10 max-w-[1280px] px-3 lg:px-4"
        style={layer(-16, -10, 0)}
      >
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_20px_60px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          {/* Top shine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          <dl className="grid grid-cols-2 md:grid-cols-5">
            {heroStats.map((s, index) => (
              <div
                key={s.label}
                className={`group relative px-4 py-6 text-center transition-colors duration-300 md:px-5 md:py-7 hover:bg-white/[0.06] ${
                  index % 2 === 0 && index < 4
                    ? "border-r border-white/10"
                    : ""
                } ${
                  index < 4 ? "border-b border-white/10 md:border-b-0" : ""
                } ${
                  index < heroStats.length - 1
                    ? "md:border-r md:border-white/10"
                    : ""
                } ${index === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <dd className="bg-gradient-to-b from-white to-[#9dc4ff] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent md:text-[1.75rem]">
                  <CountUp value={t(s.value)} delay={index * 100} />
                </dd>

                <dt className="mt-2 text-[11px] font-medium uppercase leading-relaxed tracking-wide text-white/55 sm:text-xs">
                  {t(s.label)}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
