import Link from "next/link";
import Image from "next/image";
import {
  ButtonLink,
  Card,
  FinalCta,
  Heading,
  PhotoPlaceholder,
  Section,
} from "@/components/ui";
import { heroStats, studentGrowth, waLink } from "@/lib/content";

/* ---------- Data section (khusus halaman ini) ---------- */

const city = [
  {
    ko: "부산",
    title: "Kota terbesar ke-2 di Korea",
    text: "Hidup lebih terjangkau dari Seoul, peluang kerja tetap luas.",
  },
  {
    ko: "항구 · 산업",
    title: "Pelabuhan & kawasan industri terbesar",
    text: "Dua pusat lapangan kerja dalam satu kota.",
  },
  {
    ko: "동의대학교",
    title: "Kampus terbesar ke-4 di Busan",
    text: "Berdiri sejak 1977, di Gaya, Busanjin-gu, pusat kota.",
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
    photo: "",
  },
  {
    name: "Ridho Hendra Yoga Perdana, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    desc: "Ph.D. Hongik University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "",
  },
  {
    name: "Narariya Dita Handani, Ph.D.",
    role: "Asst. Prof · Global Hospitality Mgmt",
    desc: "Ph.D. Dong-A University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "",
  },
  {
    name: "Yushintia Pramitarini, Ph.D.",
    role: "Asst. Prof · Intelligent Computing",
    desc: "Ph.D. Hongik University",
    tag: "Dosen",
    bg: "#0F3E81",
    photo: "",
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
    q: "Dana jaminan Rp 220 juta hangus?",
    a: "Nggak. Itu saldo rekening syarat visa, bukan biaya. Uangnya tetap punyamu.",
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

export default function Home() {
  const max = Math.max(...studentGrowth.map((s) => s.value));

  return (
    <>
      {/* HERO SECTION — Dong-eui University */}
      <section className="relative isolate min-h-[650px] overflow-hidden bg-[#033378] pt-24 pb-0 md:min-h-[680px] md:pt-28">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Red ambient glow */}
          <div className="absolute -left-32 -top-24 h-[380px] w-[380px] rounded-full bg-[#c60e31]/45 blur-[110px]" />

          <div className="absolute -right-32 top-10 h-[400px] w-[400px] rounded-full bg-[#c60e31]/30 blur-[120px]" />

          {/* Blue light */}
          <div className="absolute left-1/3 top-1/4 h-[420px] w-[420px] rounded-full bg-[#1760ad]/30 blur-[130px]" />

          {/* Bottom atmosphere */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#011d48]/55 via-[#033378]/20 to-transparent" />

          {/* Transparent background image */}
          <Image
            src="/deu.png"
            alt=""
            fill
            priority
            aria-hidden="true"
            className="object-cover object-center opacity-5"
          />

          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "linear-gradient(to bottom, black, transparent 95%)",
            }}
          />
        </div>

        {/* Main content */}
        <div className="relative z-10 mx-auto grid max-w-[1280px] items-center gap-8 px-3 md:min-h-[510px] md:grid-cols-[0.92fr_1.08fr] md:gap-4 lg:px-4">
          {/* LEFT — Headline */}
          <div className="relative z-20 max-w-[570px] pb-12 pt-8 md:pb-20 md:pt-0">
            <h1 className="text-[clamp(2.65rem,5vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-white">
              Kuliah S1
              <br />
              di Korea.
              <br />
              <span className="mt-1 inline-block bg-gradient-to-r from-white via-[#ffb2c1] to-[#c60e31] bg-clip-text text-transparent">
                Bayar dari
                <br />
                gaji sendiri.
              </span>
            </h1>

            <p className="mt-6 max-w-[490px] text-base leading-relaxed text-white/85 md:text-lg">
              Kuliah berbahasa Inggris di Busan, peluang beasiswa hingga 100%,
              kerja part-time legal, dan pendampingan menuju karier profesional
              atau bisnis global.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              {/* WhatsApp */}
              <ButtonLink
                href={waLink()}
                external
                variant="outline"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/85 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-[#033378]"
              >
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
                Konsultasi Gratis
              </ButtonLink>

              {/* Eligibility CTA */}
              <ButtonLink
                href="/cek-kelayakan"
                className="inline-flex items-center justify-center rounded-full bg-[#c60e31] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#c60e31]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a90b29]"
              >
                Cek Kelayakan Saya
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
                Asesmen awal gratis · Persyaratan bahasa sesuai ketentuan
                program
              </p>
            </div>
          </div>

          {/* RIGHT — Hero image */}
          <div className="relative mx-auto w-full max-w-[650px]">
            {/* Red accent behind image */}
            <div className="pointer-events-none absolute right-[3%] top-[14%] h-[230px] w-[230px] rounded-full bg-[#c60e31] opacity-80 blur-[1px] md:h-[300px] md:w-[300px]" />

            {/* Soft blue glow */}
            <div className="pointer-events-none absolute left-[15%] top-[25%] h-[260px] w-[260px] rounded-full bg-[#2779d4]/35 blur-[80px]" />

            {/* Main image */}
            <div className="relative z-10">
              <Image
                src="/8.png"
                alt="Mahasiswa internasional Dong-eui University di Busan, Korea Selatan"
                width={1000}
                height={1000}
                priority
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-[8%] right-[2%] z-20 rounded-sm border border-white bg-[#033378]/95 px-4 py-3 shadow-2xl shadow-black/25 backdrop-blur-md md:bottom-[9%] md:right-[1%] md:px-5 md:py-4">
              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm font-bold tracking-wide text-white md:text-base">
                    부산에서 공부하자!
                  </p>

                  <p className="mt-1 text-xs text-white/75">
                    Ayo kuliah di Busan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* City skyline */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 z-0 h-[100px] w-full bg-[url('/city-silhouette.png')] bg-repeat-x bg-bottom bg-contain opacity-50 md:h-[145px]"
        />

        {/* Bottom blend */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-8 w-full bg-gradient-to-t from-[#011632]/40 to-transparent" />

        <div className="mx-auto mb-9 max-w-[1280px] px-3 lg:px-4">
          <div className="grid grid-cols-2 gap-y-6 rounded-sm border  bg-gradient-to-b from-[#033378] to-[#001738] px-4 py-7 md:grid-cols-5 md:gap-0 md:px-6">
            {heroStats.map((s, index) => (
              <div
                key={s.label}
                className={`text-center px-3 ${
                  index % 2 === 0
                    ? "border-r border-[#c60e31]/30 md:border-r-0"
                    : ""
                } ${
                  index !== heroStats.length - 1
                    ? "md:border-r md:border-[#c60e31]/30"
                    : ""
                }`}
              >
                <p className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {s.value}
                </p>

                <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KENAPA SEKARANG */}
      <Section className="!bg-[#0C0D0E]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fbaff]">
                Kenapa sekarang?
              </p>
            </div>

            <h2 className="mt-5 max-w-xl bg-gradient-to-r from-white via-[#e6f0ff] to-[#8fbaff] bg-clip-text text-3xl font-extrabold leading-tight tracking-tight text-transparent md:text-[48px]">
              Korea lagi butuh tenaga muda.
              <br />
              Kamu bisa jadi salah satunya.
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              Mahasiswa internasional di Korea naik dari 3.418 orang (1999) jadi
              208.962 orang (2024). Pemerintah Korea terus membuka jalan agar
              mahasiswa asing bisa kuliah sekaligus kerja legal.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              Sekarang yang mendominasi masih China, Vietnam, Uzbekistan, Nepal,
              dan Mongolia. Indonesia? Masih banyak ruang.
            </p>
          </div>

          {/* RIGHT — GROWTH CHART (card) */}
          <div className="relative  md:p-8">
            {/* Chart heading */}
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Education in numbers
                </p>
                <h3 className="mt-2 text-lg font-bold text-white md:text-xl">
                  Mahasiswa internasional di Korea (orang)
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  Korea Selatan · 1999–2024
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
            <div className="grid grid-cols-2 gap-6 border-b border-white/10 py-7">
              <div>
                <p className="text-xs text-white/50">1999</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {studentGrowth[0].value.toLocaleString("id-ID")}
                </p>
                <p className="mt-1 text-xs text-white/50">Mahasiswa</p>
              </div>

              <div className="border-l border-white/10 pl-5">
                <p className="text-xs text-white/50">2024</p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-[#c60e31] md:text-3xl">
                  {studentGrowth[studentGrowth.length - 1].value.toLocaleString(
                    "id-ID",
                  )}
                </p>
                <p className="mt-1 text-xs text-white/50">Mahasiswa</p>
              </div>
            </div>

            {/* Vertical bar chart */}
            <div className="pt-7">
              <div className="grid grid-cols-5 items-end gap-2 sm:gap-4">
                {studentGrowth.map((s, index) => {
                  const isLast = index === studentGrowth.length - 1;
                  const percentage = Math.max((s.value / max) * 100, 4);

                  return (
                    <div key={s.year} className="flex flex-col items-center">
                      <span
                        className={`mb-2 text-[11px] tabular-nums sm:text-xs ${
                          isLast
                            ? "font-bold text-[#c60e31]"
                            : "font-medium text-white/60"
                        }`}
                      >
                        {s.value.toLocaleString("id-ID")}
                      </span>

                      <div className="flex h-48 w-full items-end">
                        <div
                          className={`w-full rounded-t-lg transition-all duration-700 ${
                            isLast
                              ? "bg-gradient-to-t from-[#8f0a24] to-[#c60e31] shadow-lg shadow-[#c60e31]/30"
                              : "bg-gradient-to-t from-[#033378] to-[#3977c5]"
                          }`}
                          style={{ height: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 grid grid-cols-5 gap-2 border-t border-white/10 pt-3 sm:gap-4">
                {studentGrowth.map((s, index) => {
                  const isLast = index === studentGrowth.length - 1;

                  return (
                    <span
                      key={s.year}
                      className={`text-center text-[11px] sm:text-xs ${
                        isLast ? "font-semibold text-white" : "text-white/50"
                      }`}
                    >
                      {s.year}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Source */}
            <p className="mt-7 border-t border-white/10 pt-4 text-[11px] leading-5 text-white/40">
              Sumber: Kementerian Pendidikan Korea.
            </p>
          </div>
        </div>
      </Section>

      {/* KENALAN DULU: BUSAN & KAMPUS */}
      <Section className="!bg-[#0C0D0E] !py-20 md:!py-24">
        <div className="mx-auto max-w-7xl px-3 md:px-4">
          {/* Section Heading */}
          <div className="mb-12 max-w-2xl text-left md:mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#8fbaff]">
              Kenalan Dulu
            </p>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-[48px]">
              Kota besar,{" "}
              <span className="bg-gradient-to-r from-[#dceaff] to-[#6fa7ff] bg-clip-text text-transparent">
                kampus besar.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-white/50 md:text-base">
              Kenali kota, lingkungan, dan peluang yang menantimu untuk
              membangun masa depan di Korea Selatan.
            </p>
          </div>

          {/* City Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.map((c, index) => (
              <div
                key={c.ko}
                className="group relative h-full overflow-hidden rounded-md bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
              >
                {/* Rotating shine border (one loop on hover) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                  }}
                />

                <article className="relative z-10 flex h-full flex-col overflow-hidden rounded-[5px] bg-[#111111] p-6 md:p-7">
                  {/* Number & Korean Name */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs font-medium tracking-widest text-white/30">
                      0{index + 1}
                    </span>

                    <span
                      className="inline-flex items-center rounded-sm
                  border border-[#8fbaff]/20
                  bg-[#0F3E81]/20 px-2.5 py-1
                  text-xs font-medium text-[#a9caff]"
                    >
                      Korea Selatan
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-[#8fbaff] md:text-2xl">
                    {c.ko}
                  </h3>

                  <h4 className="mt-3 text-lg font-semibold text-white">
                    {c.title}
                  </h4>

                  <p className="mt-3 flex-1 text-sm leading-7 text-white/50">
                    {c.text}
                  </p>
                </article>
              </div>
            ))}
          </div>

          {/* Plain note below cards */}
          <div className="mt-10 text-start">
            <h3 className="text-lg font-semibold text-white md:text-xl">
              Kamu nggak sendirian.
            </h3>

            <p className="mt-1 text-sm leading-6 text-white/50">
              Ada 4 profesor asal Indonesia yang mengajar di sini.
            </p>
          </div>
        </div>
      </Section>

      {/* S1 ENGLISH TRACK */}
      <Section className="!bg-[#0C0D0E] !py-20 md:!py-24">
        <div className="mx-auto max-w-7xl px-3 md:px-4">
          {/* SECTION HEADING */}
          <div className="mb-12 max-w-3xl text-left md:mb-14">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8fbaff]">
                S1 English Track
              </p>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Kuliah pakai bahasa{" "}
              <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                Inggris.
              </span>
              <br />
              <span className="text-white/90">
                Fokus ke ilmunya, bukan ke bahasanya.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              Banyak mahasiswa Indonesia tersendat karena harus kuliah dalam
              bahasa Korea sejak hari pertama. Di English Track, peluang lulusmu
              jauh lebih besar.
            </p>
          </div>

          {/* MAJOR CARDS */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* JURUSAN 01 — GLOBAL HOSPITALITY MANAGEMENT */}
            <div
              className="group relative h-full overflow-hidden rounded-sm
          bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                }}
              />

              <article
                className="relative z-10 grid h-full overflow-hidden rounded-[1px]
          bg-[#101116] sm:grid-cols-[40%_60%]"
              >
                <div className="relative min-h-[120px] overflow-hidden sm:min-h-0">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85"
                    alt="Hotel dan resort untuk bidang hospitality management"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-4 md:p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] ">
                    Hospitality &amp; Tourism · S1
                  </span>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
                    Global Hospitality Management
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-white/55">
                    Buat kamu yang suka melayani, ketemu orang, dan dunia
                    pariwisata.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Hotel & Resort", "F&B", "Travel"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10
                  bg-white/[0.03] px-3 py-1
                  text-xs font-medium text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>

            {/* JURUSAN 02 — INTELLIGENT COMPUTING */}
            <div
              className="group relative h-full overflow-hidden rounded-sm
          bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                }}
              />

              <article
                className="relative z-10 grid h-full overflow-hidden rounded-[1px]
          bg-[#101116] sm:grid-cols-[40%_60%]"
              >
                <div className="relative min-h-[120px] overflow-hidden sm:min-h-0">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85"
                    alt="Komponen teknologi dan komputasi untuk bidang Intelligent Computing"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-4 md:p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] ">
                    Technology &amp; AI · S1
                  </span>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">
                    Intelligent Computing
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-white/55">
                    Buat kamu yang penasaran sama teknologi, data, dan AI.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Software", "Data", "AI"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10
                  bg-white/[0.03] px-3 py-1
                  text-xs font-medium text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </Section>

      {/* DOSEN */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <h2 className="max-w-3xl text-left text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
            Dosen yang paham{" "}
            <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
              rasanya
            </span>
            <br />
            <span className="text-white/90">
              jadi mahasiswa Indonesia di Korea.
            </span>
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
                      sizes="192px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white/70">
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
                    {d.tag}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
                    {d.name}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-white">
                    {d.role}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                    {d.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEASISWA */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            {/* Heading */}
            <div className="max-w-xl text-left">
              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Skor IELTS{" "}
                <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                  naik,
                </span>
                <br />
                <span className="text-white/90">biaya kuliah turun.</span>
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-slate-400 md:text-base">
                Semester 1 ditentukan sertifikat bahasa. Semester 2 sampai lulus
                ditentukan IPK-mu: potongan 20% sampai 100% (Top 2% – Top 50%).
              </p>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-6">
              {scholarships.map((s, index) => (
                <div
                  key={s.score}
                  className="group relative overflow-hidden rounded-md bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                    }}
                  />

                  <article className="relative z-10 flex items-center justify-between gap-4 overflow-hidden rounded-[5px] bg-[#111111] px-5 py-4 md:px-6 md:py-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium tracking-widest text-white/30">
                          0{index + 1}
                        </span>

                        <span className="inline-flex items-center rounded-sm border border-[#8fbaff]/20 bg-[#0F3E81]/20 px-2.5 py-1 text-xs font-medium text-[#a9caff]">
                          Semester 1
                        </span>
                      </div>

                      <h3 className="mt-2 text-lg font-bold tracking-tight text-[#8fbaff] md:text-xl">
                        {s.score}
                      </h3>

                      <p className="mt-0.5 text-xs text-white/50">{s.alt}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="bg-white bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                        {s.pct}
                      </p>
                      <p className="mt-1 text-[11px] text-white/50">
                        potongan kuliah semester 1
                      </p>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note
          <div className="mt-10 flex justify-center">
            <p className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-center text-sm font-semibold text-white">
              Belajar IELTS serius hari ini ={" "}
              <span className="text-[#efbf38]">hemat puluhan juta besok.</span>
            </p>
          </div> */}
        </div>
      </section>

      {/* KERJA PART-TIME */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Kerja legal, dekat kampus,
              <br />
              <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                semua udah disiapin.
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-400 md:text-base">
              Kamu nggak dilepas cari kerja sendirian. Lokasi kerja,
              antar-jemput, sampai izin Imigrasi sudah ada jalurnya.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative mt-16 md:mt-24">
            {/* Garis putus-putus */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-6 top-6 border-l border-dashed border-white/20"
            />

            <div className="space-y-20 md:space-y-28">
              {/* STEP 1 — Upah */}
              <div className="relative pl-16 md:pl-24">
                <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a1b1e] text-lg font-bold text-white">
                  1
                </span>

                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  {/* Visual: wage card */}
                  <div className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                      }}
                    />
                    <article className="relative z-10 flex h-full flex-col justify-center overflow-hidden rounded-[1px] bg-[#111111] p-8 md:p-10">
                      <p className="text-sm text-white/50">
                        Upah minimum Korea 2027
                      </p>
                      <p className="mt-3 bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
                        10.700 ₩/jam
                      </p>
                      <p className="mt-4 text-sm text-white/40">
                        ± Rp 26–30 juta / bulan
                      </p>
                    </article>
                  </div>

                  {/* Teks */}
                  <div>
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                      Upah jelas,{" "}
                      <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                        standar minimum Korea.
                      </span>
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {[
                        "Berlaku sama untuk pekerja asing dan paruh waktu",
                        "Estimasi penghasilan 2–2,2 juta won/bulan (± Rp 26–30 juta)",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-white/70 md:text-lg">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* STEP 2 — Perks + Asrama */}
              <div className="relative pl-16 md:pl-24">
                <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#1a1b1e] text-lg font-bold text-white">
                  2
                </span>

                <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
                  {/* Visual: asrama card */}
                  <div className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                      }}
                    />
                    <article className="relative z-10 flex h-full flex-col justify-center overflow-hidden rounded-[1px] bg-[#111111] p-8 md:p-10">
                      <span className="inline-block w-fit rounded-md bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                        Asrama
                      </span>
                      <p className="mt-4 text-2xl font-extrabold tracking-tight text-white md:text-3xl">
                        Asrama satu lokasi
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/50 md:text-base">
                        Katering, penatu, mushola, dan pembina
                      </p>
                    </article>
                  </div>

                  {/* Teks */}
                  <div>
                    <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
                      Dari izin sampai antar-jemput,{" "}
                      <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                        sudah ada jalurnya.
                      </span>
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {workPerks.map((w) => (
                        <li key={w.title} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-white/70 md:text-lg">
                            <span className="font-semibold text-white">
                              {w.title}.
                            </span>{" "}
                            {w.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-16 max-w-3xl text-center text-xs leading-relaxed text-white/40">
            Jam kerja mengikuti izin kerja paruh waktu (시간제취업) visa D-2
            dari Imigrasi Korea. Penghasilan adalah estimasi, tergantung jam
            kerja yang diizinkan, jenis pekerjaan, dan kurs.
          </p>
        </div>
      </section>

      {/* BONUS */}
      {/* BONUS */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto text-start">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Bonus.{" "}
              <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                Lulus bukan garis finish.
              </span>
              <br />
              <span className="text-white/90">Pilih jalurmu.</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2">
            {bonus.map((b, index) => (
              <div
                key={b.title}
                className="group relative h-full overflow-hidden rounded-sm bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                  }}
                />

                <article className="relative z-10 flex h-full flex-col overflow-hidden rounded-[1px] bg-[#000000] p-6 md:p-8">
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
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black" />
                  </div>

                  {/* Konten */}
                  <div className="relative z-10 flex h-full max-w-[62%] flex-col md:max-w-[58%]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#1a1b1e] text-sm font-bold text-white">
                      {index + 1}
                    </span>

                    <h3 className="mt-5 text-xl font-extrabold tracking-tight md:text-2xl">
                      <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                        {b.title}
                      </span>
                    </h3>

                    <ul className="mt-5 space-y-3.5">
                      {b.items.map((i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckIcon />
                          <span className="text-base leading-relaxed text-white/70">
                            {i}
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
              <tr className="border-b border-white/10 text-slate-300">
                <th className="px-5 py-4 font-semibold">Persiapan & keberangkatan</th>
                <th className="px-5 py-4 font-semibold">Hospitality</th>
                <th className="px-5 py-4 font-semibold">Computing</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((r) => (
                <tr key={r.item} className="border-b border-white/5">
                  <td className="px-5 py-3 text-slate-200">{r.item}</td>
                  <td className="px-5 py-3">{r.hosp}</td>
                  <td className="px-5 py-3">{r.comp}</td>
                </tr>
              ))}
              <tr className="bg-white/5 font-bold">
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
            <p className="mt-2 text-slate-300">
              Ini bukan biaya. Imigrasi Korea minta saldo rekening sebagai bukti kemampuan finansial. Uangnya tetap milikmu.
            </p>
          </Card>
          <Card>
            <p className="mb-3 font-semibold">Biaya hidup di Busan / bulan</p>
            <dl className="space-y-2 text-sm md:text-base">
              {living.map((l) => (
                <div key={l.label} className="flex justify-between">
                  <dt className="text-slate-300">{l.label}</dt>
                  <dd className="font-semibold">{l.value}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-white/10 pt-2">
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
                <p className="text-xs text-slate-300">
                  {s.op && <span className="mr-1 font-bold text-sky-300">{s.op}</span>}
                  {s.label}
                </p>
                <p className="mt-1 text-xl font-bold grad-text">{s.value}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            Mulai semester 2, biaya kuliah dicicil 4× per semester. Di bulan tanpa cicilan tabungan bisa lebih besar. Semua angka estimasi; tergantung jam kerja, beasiswa, dan kurs.
          </p>
        </div>
      </Section> */}

      {/* BANNER + JADWAL */}
      <div className="border-y border-[#c60e31]/30 bg-[#C60C31] py-5 text-center text-sm text-white md:text-base">
        <div className="mx-auto max-w-6xl px-6">
          <strong className="font-bold">
            Kuliah mulai Maret 2027. Pendaftaran tutup November.
          </strong>{" "}
          <Link
            href="#jadwal"
            className="font-semibold text-[#8fbaff] underline underline-offset-4 transition-colors hover:text-white"
          >
            Lihat jadwal
          </Link>
        </div>
      </div>

      <section id="jadwal" className="scroll-mt-24 bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto  text-start">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Jadwal.{" "}
              <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                Dari asesmen
              </span>
              <br />
              <span className="text-white/90">sampai mulai kuliah.</span>
            </h2>
          </div>

          {/* Timeline */}
          <ol className="relative mt-14 space-y-6 md:mt-16 md:space-y-8">
            {/* Garis timeline */}
            <div
              aria-hidden="true"
              className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-[#c60e31] via-[#8fbaff]/30 to-transparent"
            />

            {timeline.map((t, index) => (
              <li key={t.when} className="relative flex items-start gap-5">
                {/* Titik / nomor */}
                <span
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                    t.now
                      ? "border-[#c60e31] bg-[#c60e31] text-white"
                      : "border-white/15 bg-[#111111] text-[#8fbaff]"
                  }`}
                >
                  {index + 1}
                </span>

                {/* Konten */}
                <div className="flex-1 pt-1.5">
                  <div className="flex items-center gap-3">
                    <p
                      className={`text-xs font-bold uppercase tracking-wide ${
                        t.now ? "text-[#ff9db0]" : "text-[#8fbaff]"
                      }`}
                    >
                      {t.when}
                    </p>
                    {t.now && (
                      <span className="rounded-sm bg-[#c60e31] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Sekarang
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-semibold leading-snug text-white">
                    {t.title}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* KEMITRAAN */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            {/* Foto */}
            <div className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 hover:-translate-y-1">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                }}
              />

              <div className="relative z-10 h-72 w-full overflow-hidden rounded-[1px] bg-[#111111] md:h-96">
                <img
                  src="https://www.shutterstock.com/image-photo/closeup-businessman-hand-signing-contract-260nw-2740588571.jpg"
                  alt="Penandatanganan kerja sama Dong-eui University × Karir di Korea"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#8fbaff]">
                Kemitraan resmi
              </p>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
                Kerja sama resmi,{" "}
                <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                  bukan sekadar agen.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-slate-400 md:text-base">
                Program ini lahir dari kesepakatan resmi Dong-eui University dan
                Karir di Korea. Kamu didampingi
                di Indonesia dan di Korea.
              </p>

              {/* Penandatangan */}
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {[
                  {
                    name: "Prof. Gumkwang Bae, Ph.D.",
                    role: "Dean of International Affairs, Dong-eui University",
                    photo: "/kemitraan/bae.svg",
                  },
                  {
                    name: "Gilar Budi Raharja",
                    role: "Founder karirdikorea.com",
                    photo: "/kemitraan/gilar.svg",
                  },
                ].map((p) => (
                  <div key={p.name} className="flex items-start gap-4">
                    <img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{p.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/50">
                        {p.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0C0D0E] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {/* Heading */}
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Yang sering{" "}
              <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                ditanya.
              </span>
            </h2>
          </div>

          {/* Accordion FAQ */}
          <div className="mx-auto mt-14 max-w-3xl space-y-4 md:mt-16">
            {faqs.map((f, index) => (
              <details
                key={f.q}
                className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-white/30 via-white/10 to-[#0F3E81] p-px transition-all duration-300 open:via-[#8fbaff] hover:-translate-y-1"
              >
                <summary className="relative z-10 flex cursor-pointer list-none items-center gap-4 rounded-[1px] bg-[#111111] px-5 py-5 md:px-6">
                  <span className="text-xs font-semibold tracking-widest text-[#8fbaff]">
                    0{index + 1}
                  </span>
                  <span className="flex-1 text-base font-bold leading-snug text-white md:text-lg">
                    {f.q}
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1a1b1e] text-lg leading-none text-[#8fbaff] transition-transform duration-300 group-open:rotate-45 group-open:bg-[#1685ff] group-open:text-white">
                    +
                  </span>
                </summary>

                {/* Border berputar biru */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 animate-border-spin opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.9) 40deg, #8fbaff 90deg, transparent 150deg)",
                  }}
                />

                <div className="relative z-10 rounded-[1px] bg-[#111111] px-5 pb-6 pl-[3.75rem] pr-5 md:pl-[4.25rem] md:pr-6">
                  <p className="text-sm leading-relaxed text-white/60 md:text-base">
                    {f.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      
      {/* CTA PENUTUP */}
      <section id="daftar" className="scroll-mt-24 bg-[#0C0D0E]">
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Gambar peta kecil transparan di tengah belakang */}
          <img
            src="hero-maps.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute left-1/2 top-1/2 w-[30rem] -translate-x-1/2 -translate-y-1/2 object-contain opacity-20 md:w-[34rem] lg:w-[40rem]"
          />
          {/* Dekorasi latar */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-[#1685ff]/30 blur-3xl"
          />
         
         

          <div className="relative grid items-end md:min-h-[520px] md:grid-cols-[1.15fr_0.85fr]">
            {/* Teks */}
            <div className="pb-12 pt-16 md:pb-20 md:pt-24">
                  <span className="inline-block rounded-sm bg-[#c60e31] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                    지금 시작하자
                  </span>

                  <h2 className="mt-5 text-3xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl">
                    Belajar mandiri di Korea.
                    <br />
                    <span className="bg-gradient-to-r from-[#dceaff] to-[#1685ff] bg-clip-text text-transparent">
                      Menuju karir profesional & bisnis global.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
                    Mulai dari asesmen gratis. Kami cek kesiapan bahasa, jurusan
                    yang cocok, dan rencana biayamu, sebelum kamu memutuskan apa
                    pun.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="#daftar-asesmen"
                      className="inline-flex items-center justify-center rounded-full bg-[#c60e31] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#c60e31]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a90b29]"
                    >
                      Daftar Asesmen Spring 2027
                    </Link>
                    <a
                      href="https://wa.me/62XXXXXXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a]"
                    >
                      Tanya Admin via WhatsApp
                      <WhatsAppIcon />
                    </a>
                  </div>
                </div>

                {/* Foto + chip */}
                <div className="relative mx-auto h-80 w-full max-w-sm self-end md:h-full md:min-h-[460px] md:max-w-none">
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
                  {/* <div className="absolute left-0 top-8 hidden items-center gap-3 rounded-sm border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:flex md:-left-4">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-white/50">
                        Kuliah mulai
                      </p>
                      <p className="text-sm font-bold text-white">Maret 2027</p>
                    </div>
                  </div> */}

                  {/* <div className="absolute bottom-10 right-0 hidden items-center gap-3 rounded-sm border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md sm:flex md:-right-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#c60e31]" />
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-white/50">
                        Pendaftaran tutup
                      </p>
                      <p className="text-sm font-bold text-white">November</p>
                    </div>
                  </div> */}
                </div>
            </div>
          </div>
      </section>
      {/* FOOTER */}

      {/* CTA AKHIR (지금 시작하자) */}
      {/* <FinalCta /> */}
    </>
  );
}
