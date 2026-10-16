"use client";

import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import {
  Card,
  FinalCta,
  Heading,
  PhotoPlaceholder,
  Section,
} from "@/components/ui";
import { studentGrowth, waLink } from "@/lib/content";
import { GrowthChart } from "@/components/GrowthChart";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { courseSchema, faqSchema } from "@/lib/structured-data";
import { useLanguage } from "@/lib/i18n";

/* ---------- Data section (khusus halaman ini) ---------- */

const city = [
  {
    ko: "부산",
    title: "Kota terbesar ke-2 di Korea",
    text: "Hidup lebih terjangkau dari Seoul, peluang kerja tetap luas.",
    img: "/Busan%20Senja_%20Jembatan%20dan%20Teluk%20Berkilau.png",
    imgAlt: "Pemandangan Busan saat senja dengan jembatan dan teluk berkilau",
  },
  {
    ko: "항구 · 산업",
    title: "Pelabuhan & kawasan industri terbesar",
    text: "Dua pusat lapangan kerja dalam satu kota.",
    img: "/Pelabuhan%20Kontainer%20Saat%20Matahari%20Terbenam.png",
    imgAlt: "Pelabuhan kontainer saat matahari terbenam",
  },
  {
    ko: "동의대학교",
    title: "Kampus terbesar ke-4 di Busan",
    text: "Berdiri sejak 1977, di Gaya, Busanjin-gu, pusat kota.",
    img: "/University%20Campus%20Beneath%20the%20Green%20Mountain.png",
    imgAlt: "Kampus universitas di bawah gunung hijau",
  },
];

const majors = [
  {
    no: "Jurusan 01",
    title: "Global Hospitality Management",
    text: "Buat kamu yang suka melayani, ketemu orang, dan dunia pariwisata.",
    tags: ["Hotel & resort", "F&B", "Travel"],
  },
  {
    no: "Jurusan 02",
    title: "Intelligent Computing",
    text: "Buat kamu yang penasaran sama teknologi, data, dan AI.",
    tags: ["Software", "Data", "AI"],
  },
];

const professors = [
  {
    name: "Muhammad Firdaus, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    alma: "Ph.D. Pukyong National Univ.",
  },
  {
    name: "Ridho Hendra Yoga Perdana, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    alma: "Ph.D. Hongik University",
  },
  {
    name: "Narariya Dita Handani, Ph.D.",
    role: "Asst. Prof · Global Hospitality Mgmt",
    alma: "Ph.D. Dong-A University",
  },
  {
    name: "Yushintia Pramitarini, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    alma: "Ph.D. Hongik University",
  },
];

const DOSEN = [
  {
    name: "Muhammad Firdaus, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    desc: "Ph.D. Pukyong National Univ.",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "/dosen1.jpg",
  },
  {
    name: "Ridho Hendra Yoga Perdana, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    desc: "Ph.D. Hongik University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "/dosen2.jpg",
  },
  {
    name: "Narariya Dita Handani, Ph.D.",
    role: "Asst. Prof · Global Hospitality Mgmt",
    desc: "Ph.D. Dong-A University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "/dosen3.png",
  },
  {
    name: "Yushintia Pramitarini, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    desc: "Ph.D. Hongik University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "/dosen4.png",
  },
];

const scholarships = [
  {
    score: "IELTS 6.5+",
    alt: "atau TOEFL iBT 81+",
    pct: "100%",
    featured: true,
  },
  {
    score: "IELTS 6.0",
    alt: "atau TOEFL iBT 76+",
    pct: "50%",
    featured: false,
  },
  {
    score: "IELTS 5.5",
    alt: "syarat minimal masuk",
    pct: "30%",
    featured: false,
  },
];

const workPerks = [
  { title: "~8 hari kuliah", text: "per bulan, sisanya bisa kerja" },
  { title: "20–40 menit", text: "industri, pelabuhan, wisata" },
  { title: "Antar-jemput", text: "asrama ↔ tempat kerja" },
  { title: "Izin kerja", text: "dibantu Fakultas" },
];

const costRows = [
  { item: "Pendaftaran", hosp: "Rp 0,8 jt", comp: "Rp 0,8 jt" },
  {
    item: "Kuliah semester 1 (beasiswa 30%)",
    hosp: "Rp 32 jt",
    comp: "Rp 42 jt",
  },
  { item: "Dokumen + aplikasi visa", hosp: "Rp 6 jt", comp: "Rp 6 jt" },
  { item: "Tiket + transport lokal", hosp: "Rp 6 jt", comp: "Rp 6 jt" },
  { item: "Penempatan kerja", hosp: "Rp 15 jt", comp: "Rp 15 jt" },
];

const living = [
  { label: "Asrama", value: "Rp 2 jt" },
  { label: "Makan & harian", value: "Rp 2–3 jt" },
  { label: "Asuransi kesehatan", value: "Rp 1,5 jt" },
];

const simulation = [
  { label: "Gaji (2 jt ₩)", value: "Rp 26 jt", op: "" },
  { label: "Cicilan kuliah", value: "Rp 10 jt", op: "−" },
  { label: "Biaya hidup", value: "Rp 6 jt", op: "−" },
  { label: "Sisa tabungan", value: "± Rp 10 jt", op: "=" },
];

const timeline = [
  { when: "NOW · OKT–NOV", title: "Asesmen & pendaftaran", now: true },
  { when: "DES 2026", title: "Skrining dokumen & wawancara", now: false },
  { when: "JAN 2027", title: "Penerimaan & persiapan dokumen", now: false },
  { when: "FEB 2027", title: "Visa & berangkat", now: false },
  { when: "MAR 2027", title: "Mulai kuliah di Busan", now: false },
];

const faqs = [
  {
    q: "Harus bisa bahasa Korea?",
    a: "Nggak. Kuliahnya berbahasa Inggris, minimal IELTS 5.5. Bahasa Korea dasar tetap ngebantu buat kerja part-time dan hidup sehari-hari.",
  },
  {
    q: "Kerja part-time-nya legal?",
    a: "Legal. Mahasiswa visa D-2 boleh kerja paruh waktu setelah dapat izin Imigrasi Korea. Pengurusannya dibantu Fakultas.",
  },
  {
    q: "Gajinya dijamin?",
    a: "Angka 2–2,2 juta won itu estimasi dari upah minimum 2027. Penghasilan nyata tergantung jam kerja yang diizinkan dan jenis pekerjaan.",
  },
  {
    q: "Belum punya IELTS, masih bisa?",
    a: "Sertifikat bahasa wajib saat mendaftar. Ikut asesmen dulu, kami bantu petakan target skor dan waktu persiapanmu.",
  },
];

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.3A8.4 8.4 0 1 1 21 11.5z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8a3.5 3.5 0 0 1-1.5-1.5l.8-.8-1-2L9 9.5z" />
    </svg>
  );
}

function ConciergeBell({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
      <path d="M20 16a8 8 0 1 0-16 0" />
      <path d="M12 4v4" />
      <path d="M10 4h4" />
    </svg>
  );
}

function Cpu({ strokeWidth = 2, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}

const bonus = [
  {
    title: "Karir Profesional",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
    items: [
      "Bimbingan karir komprehensif",
      "CV & resume standar Korea",
      "Asistensi job-matching",
    ],
  },
  {
    title: "Karir Bisnis",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
    items: ["Business mentorship", "Inkubasi startup", "Pemagangan bisnis"],
  },
];

function CheckIcon() {
  return (
    <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1685ff]">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    </span>
  );
}
/* ---------- Page ---------- */

export default function HomeContent() {
  const { t } = useLanguage();
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={courseSchema} />
      {/* HERO SECTION — Dong-eui University */}
      <Hero />

      {/* KENAPA SEKARANG */}
      <Section className="!bg-background">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0E69FD]">
                {t("Kenapa sekarang?")}
              </p>
            </div>

            <h2 className="mt-5 max-w-2xl w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-extrabold leading-tight tracking-tight text-transparent">
              <span className="block">{t("Korea lagi butuh tenaga muda")}</span>
              <span className="block">
                {t("Kamu bisa jadi salah satunya")}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-[20px] leading-7 text-foreground">
              {t(
                "Mahasiswa internasional di Korea naik dari 3.418 orang (1999) jadi 208.962 orang (2024). Pemerintah Korea terus membuka jalan agar mahasiswa asing bisa kuliah sekaligus kerja legal",
              )}
            </p>

            <p className="mt-4 max-w-xl text-[20px] leading-7 text-foreground">
              {t(
                "Sekarang yang mendominasi masih China, Vietnam, Uzbekistan, Nepal, dan Mongolia. Indonesia? Masih banyak ruang",
              )}
            </p>
          </div>

          {/* RIGHT — GROWTH CHART (card) */}
          <div className="relative  md:p-8">
            {/* Chart heading */}
            <div className="flex items-end justify-between gap-4 border-b border-line/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/50">
                  Education in numbers
                </p>
                <h3 className="mt-2 text-lg font-bold text-foreground md:text-xl">
                  {t("Mahasiswa internasional di Korea (orang)")}
                </h3>
                <p className="mt-1 text-sm text-foreground/50">
                  {t("Korea Selatan · 1999–2024")}
                </p>
              </div>

              <svg
                width="38"
                height="38"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <path
                  d="M5 31L15 22L22 25L35 9"
                  stroke="#c60e31"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M25 9H35V19"
                  stroke="#c60e31"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Key figures */}
            <div className="grid grid-cols-2 gap-6 border-b border-line/10 py-7">
              <div>
                <p className="text-xs text-foreground/50">1999</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {studentGrowth[0].value.toLocaleString("id-ID")}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  {t("Mahasiswa")}
                </p>
              </div>

              <div className="border-l border-line/10 pl-5">
                <p className="text-xs text-foreground/50">2024</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-[#c60e31] md:text-3xl">
                  {studentGrowth[studentGrowth.length - 1].value.toLocaleString(
                    "id-ID",
                  )}
                </p>
                <p className="mt-1 text-xs text-foreground/50">
                  {t("Mahasiswa")}
                </p>
              </div>
            </div>

            {/* Vertical bar chart */}
            <div className="pt-7">
              <GrowthChart data={studentGrowth} />
            </div>

            {/* Source */}
            <p className="mt-7 border-t border-line/10 pt-4 text-[11px] leading-5 text-foreground/40">
              {t("Sumber: Kementerian Pendidikan Korea.")}
            </p>
          </div>
        </div>
      </Section>

      {/* KENALAN DULU: BUSAN & KAMPUS */}
      <Section className="!bg-background !py-12 md:!py-14">
        <div className="mx-auto max-w-7xl px-3 md:px-4">
          {/* Section Heading */}
          <div className="mb-12 max-w-2xl text-left md:mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E69FD]">
              {t("Kenalan Dulu")}
            </p>

            <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Kota besar, kampus besar")}
            </h2>

            <p className="mt-4 max-w-lg text-[20px] leading-7 text-foreground">
              {t(
                "Kenali kota, lingkungan, dan peluang yang menantimu untuk membangun masa depan di Korea Selatan",
              )}
            </p>
          </div>

          {/* City Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.map((c) => (
              <article
                key={c.ko}
                className="group flex h-full flex-col overflow-hidden rounded-md bg-white dark:bg-[#0C0D0E]"
              >
                {/* Foto */}
                <div className="relative aspect-[2/1] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.imgAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Overlay biru transparan */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[#0E69FD]/30"
                  />
                </div>

                <div className="flex flex-1 flex-col py-6 md:py-7">
                  <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {c.ko}
                  </h3>

                  <h4 className="mt-3 text-lg font-semibold text-foreground">
                    {t(c.title)}
                  </h4>

                  <p className="mt-3 flex-1 text-sm leading-7 text-foreground/50">
                    {t(c.text)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* S1 ENGLISH TRACK */}
      <Section id="program" className="!bg-background !py-14 md:!py-16">
        <div className="mx-auto max-w-7xl px-4">
          {/* HEADING */}
          <div className="mb-10 max-w-2xl md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0E69FD]">
              S1 English Track
            </p>

            <h2 className="mt-3 w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Kuliah dalam bahasa Inggris, fokus ke ilmunya")}
            </h2>

            <p className="mt-4 text-base leading-7 text-foreground/70 md:text-lg">
              {t(
                "Banyak mahasiswa Indonesia tersendat karena harus kuliah dalam bahasa Korea sejak hari pertama. Di English Track, peluang lulusmu jauh lebih besar.",
              )}
            </p>
          </div>

          {/* MAJOR CARDS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: ConciergeBell,
                label: "Hospitality & Tourism · S1",
                title: "Global Hospitality Management",
                desc: "Sektor pariwisata dan jasa di Korea menghadapi krisis kelangkaan tenaga kerja akibat depopulasi populasi usia produktif. Lulusan jurusan ini berpeluang besar mengisi posisi strategis hingga manajerial di industri hotel, resort, dan F&B global Korea yang makin terbuka bagi talenta internasional.",
                tags: ["Hotel & Resort", "F&B", "Travel"],
              },
              {
                icon: Cpu,
                label: "Technology & AI · S1",
                title: "Intelligent Computing",
                desc: "Korea Selatan adalah pusat produksi chip AI dan inovasi teknologi dunia. Di tengah krisis penyusutan angkatan kerja lokal, industri semikonduktor & AI Korea membutuhkan talenta IT asing berkualitas untuk langsung diserap di ekosistem teknologi global mereka.",
                tags: ["Software", "Data", "AI"],
              },
            ].map(({ icon: Icon, ...major }) => (
              <div
                key={major.title}
                className="group relative h-full overflow-hidden rounded-md p-px transition-colors duration-300 hover:bg-gradient-to-br hover:from-foreground/20 hover:via-foreground/10 hover:to-[#0F3E81]"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                  }}
                />

                <article className="relative z-10 flex h-full flex-col overflow-hidden rounded-md bg-card-soft p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="mt-5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#0E69FD]">
                    {t(major.label)}
                  </span>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {major.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {t(major.desc)}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {major.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-line/10 px-2.5 py-1 text-xs font-medium text-foreground/70"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* DOSEN */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <h2 className="max-w-3xl w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-left text-[36px] font-bold leading-tight tracking-tight text-transparent">
            {t("Para Dosen asli Indonesia, yang pernah kuliah dan lulus di Korea,")}
            <br />
            {t("mereka akan bimbing kamu meraih apa yang mereka capai di sana")}
          </h2>
          {/* Grid */}
          <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-10 md:mt-20 md:grid-cols-2">
            {DOSEN.map((d) => (
              <article
                key={d.name}
                className="flex items-center gap-5 sm:gap-6"
              >
                {/* Foto */}
                <div
                  className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-48"
                  style={{ backgroundColor: d.bg }}
                >
                  {d.photo ? (
                    <Image
                      src={d.photo}
                      alt={d.name}
                      fill
                      quality={95}
                      sizes="(min-width: 640px) 384px, 320px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-foreground/70">
                      {d.name
                        .split(" ")
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                  )}
                </div>

                {/* Teks */}
                <div className="min-w-0">
                  <span className="inline-block rounded-md bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    {t(d.tag)}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
                    {d.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {d.role}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/50 sm:text-[15px]">
                    {d.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEASISWA */}
      <section
        id="beasiswa"
        className="scroll-mt-24 bg-background py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            {/* Heading */}
            <div className="max-w-xl text-left">
              <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
                {t("Skor IELTS naik,")}
                <br />
                {t("biaya kuliah turun")}
              </h2>
              <p className="mt-5 text-[20px] leading-relaxed text-foreground">
                {t(
                  "Semester 1 ditentukan sertifikat bahasa. Semester 2 sampai lulus ditentukan IPK-mu: potongan 20% sampai 100% (Top 2% – Top 50%)",
                )}
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {scholarships.map((s, index) => (
                <div
                  key={s.score}
                  className="group relative overflow-hidden rounded-md bg-gradient-to-br from-foreground/20 via-foreground/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                    }}
                  />

                  <article className="relative z-10 flex items-center justify-between gap-4 overflow-hidden rounded-md bg-card-soft px-5 py-4 md:px-6 md:py-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium tracking-widest text-foreground/30">
                          0{index + 1}
                        </span>

                        <span className="inline-flex items-center rounded-sm border border-[#8fbaff]/20 bg-[#0F3E81]/20 px-2.5 py-1 text-xs font-medium text-foreground">
                          {t("Semester 1")}
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold tracking-tight text-foreground md:text-xl">
                        {s.score}
                      </h3>

                      <p className="mt-0.5 text-xs text-foreground/50">
                        {t(s.alt)}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="bg-foreground bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                        {s.pct}
                      </p>
                      <p className="mt-1 text-[11px] text-foreground/50">
                        {t("potongan kuliah semester 1")}
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note
          <div className="mt-10 flex justify-center">
            <p className="rounded-full border border-line/10 bg-foreground/5 px-5 py-2.5 text-center text-sm font-semibold text-foreground">
              Belajar IELTS serius hari ini ={" "}
              <span className="text-[#efbf38]">hemat puluhan juta besok.</span>
            </p>
          </div> */}
        </div>
      </section>

      {/* KERJA PART-TIME */}
      <section id="kerja" className="scroll-mt-24 bg-background py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="max-w-3xl text-left">
            <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Kerja legal, dekat kampus,")}
              <br />
              {t("semua udah disiapin")}
            </h2>
            <p className="mt-5 text-[20px] leading-relaxed text-foreground">
              {t(
                "Kamu nggak dilepas cari kerja sendirian. Lokasi kerja, antar-jemput, sampai izin Imigrasi sudah ada jalurnya",
              )}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16 md:mt-24">
            {/* Garis putus-putus */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-6 top-6 border-l border-dashed border-line/20"
            />

            <div className="space-y-20 md:space-y-28">
              {/* STEP 1 — Upah */}
              <div className="relative pl-16 md:pl-24">
                <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line/10 bg-chip text-lg font-bold text-foreground">
                  1
                </span>

                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  {/* Visual: wage card */}
                  <div className="group relative overflow-hidden rounded-md bg-gradient-to-br from-foreground/20 via-foreground/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                      }}
                    />
                    <article className="relative z-10 flex h-full flex-col justify-center overflow-hidden rounded-md bg-card-soft p-8 md:p-10">
                      <p className="text-sm text-foreground/50">
                        {t("Upah minimum Korea 2027")}
                      </p>
                      <p className="mt-3 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
                        {t("10.700 ₩/jam")}
                      </p>
                      <p className="mt-4 text-sm text-foreground/40">
                        {t("± Rp 26–30 juta / bulan")}
                      </p>
                    </article>
                  </div>

                  {/* Teks */}
                  <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                      {t("Upah jelas, standar minimum Korea")}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {[
                        "Berlaku sama untuk pekerja asing dan paruh waktu",
                        "Estimasi penghasilan 2–2,2 juta won/bulan (± Rp 26–30 juta)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-foreground/70 md:text-lg">
                            {t(item)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* STEP 2 — Perks + Asrama */}
              <div className="relative pl-16 md:pl-24">
                <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-line/10 bg-chip text-lg font-bold text-foreground">
                  2
                </span>

                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  {/* Visual: asrama card */}
                  <div className="group relative overflow-hidden rounded-md bg-gradient-to-br from-foreground/20 via-foreground/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                      }}
                    />
                    <article className="relative z-10 flex h-full flex-col justify-center overflow-hidden rounded-md bg-card-soft p-8 md:p-10">
                      <span className="inline-block w-fit rounded-md bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        {t("Asrama")}
                      </span>
                      <p className="mt-4 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                        {t("Asrama satu lokasi")}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/50 md:text-base">
                        {t("Katering, penatu, mushola, dan pembina")}
                      </p>
                    </article>
                  </div>

                  {/* Teks */}
                  <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                      {t("Dari izin sampai antar-jemput, sudah ada jalurnya")}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {workPerks.map((w) => (
                        <li key={w.title} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-foreground/70 md:text-lg">
                            <span className="font-semibold text-foreground">
                              {t(w.title)}.
                            </span>{" "}
                            {t(w.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-foreground/40">
            {t(
              "Jam kerja mengikuti izin kerja paruh waktu (시간제취업) visa D-2 dari Imigrasi Korea. Penghasilan adalah estimasi, tergantung jam kerja yang diizinkan, jenis pekerjaan, dan kurs",
            )}
          </p>
        </div>
      </section>

      {/* BONUS */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto text-start">
            <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Bonus Lulus bukan garis finish")}
              <br />
              {t("Pilih jalurmu")}
            </h2>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2">
            {bonus.map((b, index) => (
              <div
                key={b.title}
                className="group relative h-full overflow-hidden rounded-md bg-gradient-to-br from-foreground/20 via-foreground/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                  }}
                />

                <article className="relative z-10 flex h-full flex-col overflow-hidden rounded-md bg-card p-6 md:p-8">
                  {/* Gambar kanan + gradasi ke hitam */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-0 top-0 h-full w-1/2 md:w-[55%]"
                  >
                    <img
                      src={b.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-card/40 to-card" />
                  </div>

                  {/* Konten */}
                  <div className="relative z-10 flex h-full max-w-[62%] flex-col md:max-w-[58%]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line/10 bg-chip text-sm font-bold text-foreground">
                      {index + 1}
                    </span>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                      {t(b.title)}
                    </h3>

                    <ul className="mt-5 space-y-3.5">
                      {b.items.map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-foreground/70">
                            {t(i)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIAYA */}
      {/* <Section>
        <Heading title="Biaya." accent="Transparan dari awal. No hidden fee." />
        <Card className="overflow-x-auto !p-0">
          <table className="w-full min-w-[480px] text-left text-sm md:text-base">
            <thead>
              <tr className="border-b border-line/10 text-foreground/70">
                <th className="px-5 py-4 font-semibold">Persiapan & keberangkatan</th>
                <th className="px-5 py-4 font-semibold">Hospitality</th>
                <th className="px-5 py-4 font-semibold">Computing</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((r) => (
                <tr key={r.item} className="border-b border-line/5">
                  <td className="px-5 py-3 text-foreground/80">{r.item}</td>
                  <td className="px-5 py-3">{r.hosp}</td>
                  <td className="px-5 py-3">{r.comp}</td>
                </tr>
              ))}
              <tr className="bg-foreground/5 font-bold">
                <td className="px-5 py-4">Estimasi total</td>
                <td className="px-5 py-4 grad-text">Rp 59,8 jt</td>
                <td className="px-5 py-4 grad-text">Rp 69,8 jt</td>
              </tr>
            </tbody>
          </table>
        </Card>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Card className="!border-crimson/60">
            <p className="font-semibold">Dana jaminan visa Rp 220 juta?</p>
            <p className="mt-2 text-foreground/70">
              Ini bukan biaya. Imigrasi Korea minta saldo rekening sebagai bukti kemampuan finansial. Uangnya tetap milikmu.
            </p>
          </Card>
          <Card>
            <p className="mb-3 font-semibold">Biaya hidup di Busan / bulan</p>
            <dl className="space-y-2 text-sm md:text-base">
              {living.map((l) => (
                <div key={l.label} className="flex justify-between">
                  <dt className="text-foreground/70">{l.label}</dt>
                  <dd className="font-semibold">{l.value}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-line/10 pt-2">
                <dt className="font-semibold">Total</dt>
                <dd className="font-bold grad-text">± Rp 6 jt</dd>
              </div>
            </dl>
          </Card>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-center text-lg font-semibold">Simulasi: gaji part-time nutup kuliah, masih bisa nabung.</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {simulation.map((s) => (
              <Card key={s.label} className="text-center">
                <p className="text-xs text-foreground/70">
                  {s.op && <span className="mr-1 font-bold text-accent">{s.op}</span>}
                  {s.label}
                </p>
                <p className="mt-1 text-xl font-bold grad-text">{s.value}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-foreground/50">
            Mulai semester 2, biaya kuliah dicicil 4× per semester. Di bulan tanpa cicilan tabungan bisa lebih besar. Semua angka estimasi; tergantung jam kerja, beasiswa, dan kurs.
          </p>
        </div>
      </Section> */}

      {/* BANNER + JADWAL */}
      <div className="border-y border-[#c60e31]/30 bg-[#C60C31] py-5 text-center text-sm text-white md:text-base">
        <div className="mx-auto max-w-6xl px-6">
          <strong className="font-bold">
            {t("Kuliah mulai Maret 2027. Pendaftaran tutup November")}
          </strong>{" "}
          <Link
            href="#jadwal"
            className="font-semibold text-accent underline underline-offset-4 transition-colors hover:text-foreground"
          >
            {t("Lihat jadwal")}
          </Link>
        </div>
      </div>

      <section
        id="jadwal"
        className="scroll-mt-24 bg-background py-12 md:py-16"
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto  text-start">
            <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Jadwal Dari asesmen")}
              <br />
              {t("sampai mulai kuliah")}
            </h2>
          </div>

          {/* Timeline */}
          <ol className="relative mt-14 space-y-6 md:mt-16 md:space-y-8">
            {/* Garis timeline */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-[#c60e31] via-[#8fbaff]/30 to-transparent"
            />

            {timeline.map((step, index) => (
              <li key={step.when} className="relative flex items-start gap-5">
                {/* Titik / nomor */}
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                    step.now
                      ? "border-[#c60e31] bg-[#c60e31] text-white"
                      : "border-line/15 bg-card-soft text-accent"
                  }`}
                >
                  {index + 1}
                </span>

                {/* Konten */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center gap-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#0E69FD]">
                      {t(step.when)}
                    </p>
                    {step.now && (
                      <span className="rounded-sm bg-[#c60e31] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        {t("Sekarang")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-semibold leading-snug text-foreground">
                    {t(step.title)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* KEMITRAAN */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Foto */}
            <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-foreground/20 via-foreground/10 to-[#0F3E81] p-px">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgb(var(--foreground) / 0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                }}
              />

              <div className="relative z-10 h-72 w-full overflow-hidden rounded-md bg-card-soft md:h-96">
                <img
                  src="/tandatangan.jpg"
                  alt="Penandatanganan kerja sama Dong-eui University × Karir di Korea"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />

                {/* Overlay gradasi */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0C0D0E]/80 via-transparent to-[#1685ff]/15"
                />

                {/* Label foto */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-md bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    Dong-eui University × Karir di Korea
                  </span>
                </div>
              </div>
            </div>

            {/* Teks */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#0E69FD]">
                {t("Kemitraan resmi")}
              </p>

              <h2 className="w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
                {t("Kerja sama resmi, bukan sekadar agen")}
              </h2>

              <p className="mt-5 text-[20px] leading-relaxed text-foreground">
                {t(
                  "Program ini lahir dari kesepakatan resmi Dong-eui University dan Karir di Korea. Kamu didampingi di Indonesia dan di Korea",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="relative isolate scroll-mt-24 overflow-hidden bg-background py-16 md:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mx-auto w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-tight tracking-tight text-transparent">
              {t("Yang sering ditanya")}
            </h2>
          </div>

          {/* Accordion FAQ */}
          <div className="mx-auto mt-12 max-w-[840px] space-y-3 md:mt-16">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-lg border border-line/10 bg-card-soft transition-colors duration-300 hover:border-line/20 open:border-line/20 open:bg-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                  <span className="text-[15px] font-semibold leading-snug text-foreground md:text-base">
                    {t(f.q)}
                  </span>

                  {/* Ikon + / - */}
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 text-foreground/90"
                  >
                    <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-current transition-all duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>

                <div className="faq-answer px-5 pb-5">
                  <div className="border-t border-line/10 pt-4">
                    <p className="text-sm leading-relaxed text-foreground/65 md:text-[15px]">
                      {t(f.a)}
                    </p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA PENUTUP */}
      <section
        id="daftar"
        className="scroll-mt-24 overflow-hidden bg-background"
      >
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Gambar peta kecil transparan di tengah belakang */}
          <img
            src="hero-maps.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute left-1/2 top-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-20 md:w-[34rem] lg:w-[40rem]"
          />
          <div className="relative grid items-end md:min-h-[520px] md:grid-cols-[1.15fr_0.85fr]">
            {/* Teks */}
            <div className="pb-12 pt-10 md:pb-20 md:pt-24">
              <span className="inline-block rounded-sm bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                지금 시작하자
              </span>

              <h2 className="mt-5 w-fit bg-gradient-to-r from-foreground from-70% via-accent via-85% to-accent dark:via-[#0E69FD] dark:to-[#0E69FD] bg-clip-text text-[36px] font-bold leading-[1.15] tracking-tight text-transparent">
                {t("Belajar mandiri di Korea")}
                <br />
                {t("Menuju karir profesional & bisnis global")}
              </h2>

              <p className="mt-5 max-w-xl text-[20px] leading-relaxed text-foreground">
                {t(
                  "Mulai dari pendaftaran gratis. Lengkapi data dirimu, dan tim kami bantu proses selanjutnya menuju kuliah di Korea",
                )}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/pendaftaran"
                  className="inline-flex items-center justify-center rounded-full bg-[#c60e31] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#c60e31]/20 transition-all duration-300"
                >
                  {t("Daftar Sekarang")}
                </Link>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
                >
                  {t("Tanya Admin via WhatsApp")}
                  <WhatsAppIcon />
                </a>
              </div>
            </div>

            {/* Foto + chip */}
            <div className="relative mx-auto h-80 w-full max-w-sm self-end md:h-full md:min-h-[460px] md:max-w-none">
              {/* Dekorasi latar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[58%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1685ff]/30 blur-3xl md:h-[28rem] md:w-[28rem]"
              />
              {/* Glow di belakang foto */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gradient-to-t from-[#1685ff]/50 to-transparent blur-2xl md:h-96 md:w-96"
              />

              <img
                src="9.png"
                alt="Konsultan Karir di Korea"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
              />

              {/* Chip kaca */}
              {/* <div className="absolute left-0 top-8 hidden items-center gap-3 rounded-sm border border-line/15 bg-foreground/10 px-4 py-3 backdrop-blur-md sm:flex md:-left-4">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-foreground/50">
                        Kuliah mulai
                      </p>
                      <p className="text-sm font-bold text-foreground">Maret 2027</p>
                    </div>
                  </div> */}

              {/* <div className="absolute bottom-10 right-0 hidden items-center gap-3 rounded-sm border border-line/15 bg-foreground/10 px-4 py-3 backdrop-blur-md sm:flex md:-right-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#c60e31]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-foreground/50">
                        Pendaftaran tutup
                      </p>
                      <p className="text-sm font-bold text-foreground">November</p>
                    </div>
                  </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
