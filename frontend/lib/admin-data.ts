import type { ReactNode } from "react";

export type RegistrationStatus = "baru" | "di-hubungi" | "diterima" | "ditolak";

export type Registration = {
  id: string;
  nama: string;
  whatsapp: string;
  jurusan: string;
  bahasa: string | null;
  tanggal: string; // ISO date
  status: RegistrationStatus;
  sumber: "web-cek-kelayakan" | "langsung";
};

export type Major = {
  id: string;
  no: string;
  nama: string;
  deskripsi: string;
  tags: string[];
};

export type Scholarship = {
  id: string;
  skor: string;
  alt: string;
  pct: string;
};

export type Lecturer = {
  id: string;
  nama: string;
  peran: string;
  phd: string;
  foto?: string;
};

export type Faq = {
  id: string;
  q: string;
  a: string;
};

export type SiteSetting = {
  key: string;
  label: string;
  value: string;
  type?: "text" | "number" | "url" | "phone";
};

export const registrations: Registration[] = [
  {
    id: "R-001",
    nama: "Andi Pratama",
    whatsapp: "6281234000001",
    jurusan: "Global Hospitality Management",
    bahasa: "IELTS 6.0",
    tanggal: "2026-10-10",
    status: "baru",
    sumber: "web-cek-kelayakan",
  },
  {
    id: "R-002",
    nama: "Sarah Amalia",
    whatsapp: "6281234000002",
    jurusan: "Intelligent Computing",
    bahasa: "TOEFL iBT 83",
    tanggal: "2026-10-11",
    status: "di-hubungi",
    sumber: "web-cek-kelayakan",
  },
  {
    id: "R-003",
    nama: "Rizky Hidayat",
    whatsapp: "6281234000003",
    jurusan: "Intelligent Computing",
    bahasa: null,
    tanggal: "2026-10-12",
    status: "baru",
    sumber: "web-cek-kelayakan",
  },
  {
    id: "R-004",
    nama: "Nadia Putri",
    whatsapp: "6281234000004",
    jurusan: "Global Hospitality Management",
    bahasa: "IELTS 7.0",
    tanggal: "2026-10-13",
    status: "diterima",
    sumber: "web-cek-kelayakan",
  },
  {
    id: "R-005",
    nama: "Dimas Aditya",
    whatsapp: "6281234000005",
    jurusan: "Intelligent Computing",
    bahasa: "IELTS 5.5",
    tanggal: "2026-10-14",
    status: "baru",
    sumber: "web-cek-kelayakan",
  },
];

export const majors: Major[] = [
  {
    id: "M-001",
    no: "Jurusan 01",
    nama: "Global Hospitality Management",
    deskripsi: "Buat kamu yang suka melayani, ketemu orang, dan dunia pariwisata.",
    tags: ["Hotel & resort", "F&B", "Travel"],
  },
  {
    id: "M-002",
    no: "Jurusan 02",
    nama: "Intelligent Computing",
    deskripsi: "Buat kamu yang penasaran sama teknologi, data, dan AI.",
    tags: ["Software", "Data", "AI"],
  },
];

export const scholarships: Scholarship[] = [
  { id: "S-001", skor: "IELTS 6.5+", alt: "atau TOEFL iBT 81+", pct: "100%" },
  { id: "S-002", skor: "IELTS 6.0", alt: "atau TOEFL iBT 76+", pct: "50%" },
  { id: "S-003", skor: "IELTS 5.5", alt: "syarat minimal masuk", pct: "30%" },
];

export const lecturers: Lecturer[] = [
  {
    id: "L-001",
    nama: "Muhammad Firdaus, Ph.D.",
    peran: "Asst. Prof · Intelligent Computing",
    phd: "Ph.D. Pukyong National Univ.",
  },
  {
    id: "L-002",
    nama: "Ridho Hendra Yoga Perdana, Ph.D.",
    peran: "Asst. Prof · Intelligent Computing",
    phd: "Ph.D. Hongik University",
  },
  {
    id: "L-003",
    nama: "Narariya Dita Handani, Ph.D.",
    peran: "Asst. Prof · Global Hospitality Mgmt",
    phd: "Ph.D. Dong-A University",
  },
  {
    id: "L-004",
    nama: "Yushintia Pramitarini, Ph.D.",
    peran: "Asst. Prof · Intelligent Computing",
    phd: "Ph.D. Hongik University",
  },
];

export const faqs: Faq[] = [
  {
    id: "F-001",
    q: "Harus bisa bahasa Korea?",
    a: "Tidak wajib. Kuliah memakai bahasa Inggris lewat English Track, jadi kamu bisa fokus ke ilmunya sejak hari pertama.",
  },
  {
    id: "F-002",
    q: "Kerja part-time-nya legal?",
    a: "Legal. Mahasiswa visa D-2 boleh kerja paruh waktu setelah dapat izin Imigrasi Korea. Pengurusannya dibantu Fakultas.",
  },
  {
    id: "F-003",
    q: "Gajinya dijamin?",
    a: "Angka gaji adalah estimasi, bukan jaminan. Penghasilan bergantung pada jam kerja yang diizinkan, jenis pekerjaan, dan kurs.",
  },
];

export const siteSettings: SiteSetting[] = [
  { key: "siteName", label: "Nama Situs", value: "Karir di Korea" },
  { key: "whatsapp", label: "Nomor WhatsApp Admin", value: "6281234567890", type: "phone" },
  { key: "whatsappChannel", label: "Link Channel WhatsApp", value: "https://whatsapp.com/channel", type: "url" },
  { key: "tiktok", label: "TikTok", value: "https://www.tiktok.com/@karirdikorea", type: "url" },
  { key: "instagram", label: "Instagram", value: "https://www.instagram.com/karirdikorea", type: "url" },
];

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: "home" as const },
  { href: "/admin/pendaftar", label: "Pendaftar Asesmen", icon: "users" as const },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: "settings" as const },
];
