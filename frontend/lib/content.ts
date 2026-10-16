export const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "6281234567890";

export function waLink(text = "Halo Admin Karir di Korea, saya ingin mendaftar program Dong-eui Spring 2027.") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "#program", label: "Program" },
  { href: "#beasiswa", label: "Beasiswa" },
  { href: "#kerja", label: "Kerja" },
  { href: "#faq", label: "FAQ" },
];

export const heroStats = [
  { value: "≈ 2 juta ₩", label: "estimasi gaji part-time / bulan" },
  { value: "Up to 100%", label: "Peluang Beasiswa" },
  { value: "4", label: "profesor asal Indonesia" },
  { value: "20–40 mnt", label: "dari kampus ke tempat kerja" },
  { value: "2", label: "Jurusan Unggulan" },
];

export const studentGrowth = [
  { year: "1999", value: 3418 },
  { year: "2012", value: 86878 },
  { year: "2017", value: 123858 },
  { year: "2023", value: 181842 },
  { year: "2024", value: 208962 },
];

export const city = [
  { kr: "부산", title: "Kota terbesar ke-2 di Korea", text: "Hidup lebih terjangkau dari Seoul, peluang kerja tetap luas." },
  { kr: "항구 · 산업", title: "Pelabuhan & kawasan industri terbesar", text: "Dua pusat lapangan kerja dalam satu kota." },
  { kr: "동의대학교", title: "Kampus terbesar ke-4 di Busan", text: "Berdiri sejak 1977, di Gaya, Busanjin-gu, pusat kota." },
];

export const majors = [
  { no: "Jurusan 01", name: "Global Hospitality Management", desc: "Sektor pariwisata dan jasa di Korea menghadapi krisis kelangkaan tenaga kerja akibat depopulasi populasi usia produktif. Lulusan jurusan ini berpeluang besar mengisi posisi strategis hingga manajerial di industri hotel, resort, dan F&B global Korea yang makin terbuka bagi talenta internasional.", tags: ["Hotel & resort", "F&B", "Travel"] },
  { no: "Jurusan 02", name: "Intelligent Computing", desc: "Korea Selatan adalah pusat produksi chip AI dan inovasi teknologi dunia. Di tengah krisis penyusutan angkatan kerja lokal, industri semikonduktor & AI Korea membutuhkan talenta IT asing berkualitas untuk langsung diserap di ekosistem teknologi global mereka.", tags: ["Software", "Data", "AI"] },
];

export const lecturers = [
  { name: "Muhammad Firdaus, Ph.D.", role: "Asst. Prof · Intelligent Computing", phd: "Ph.D. Pukyong National Univ." },
  { name: "Ridho Hendra Yoga Perdana, Ph.D.", role: "Asst. Prof · Intelligent Computing", phd: "Ph.D. Hongik University" },
  { name: "Narariya Dita Handani, Ph.D.", role: "Asst. Prof · Global Hospitality Mgmt", phd: "Ph.D. Dong-A University" },
  { name: "Yushintia Pramitarini, Ph.D.", role: "Asst. Prof · Intelligent Computing", phd: "Ph.D. Hongik University" },
];

export const scholarships = [
  { score: "IELTS 6.5+", alt: "atau TOEFL iBT 81+", pct: "100%" },
  { score: "IELTS 6.0", alt: "atau TOEFL iBT 76+", pct: "50%" },
  { score: "IELTS 5.5", alt: "syarat minimal masuk", pct: "30%" },
];

export const workPerks = [
  { title: "~8 hari kuliah", text: "per bulan, sisanya bisa kerja" },
  { title: "20–40 menit", text: "industri, pelabuhan, wisata" },
  { title: "Antar-jemput", text: "asrama ↔ tempat kerja" },
  { title: "Izin kerja", text: "dibantu Fakultas" },
  { title: "Asrama satu lokasi", text: "Katering, penatu, mushola, dan pembina" },
];

export const bonus = [
  { title: "Karir Profesional", items: ["Bimbingan karir komprehensif", "CV & resume standar Korea", "Asistensi job-matching"] },
  { title: "Karir Bisnis", items: ["Business mentorship", "Inkubasi startup", "Pemagangan bisnis"] },
];

export const costRows = [
  { item: "Pendaftaran", h: "Rp 0,8 jt", c: "Rp 0,8 jt" },
  { item: "Kuliah semester 1 (beasiswa 30%)", h: "Rp 32 jt", c: "Rp 42 jt" },
  { item: "Dokumen + aplikasi visa", h: "Rp 6 jt", c: "Rp 6 jt" },
  { item: "Tiket + transport lokal", h: "Rp 6 jt", c: "Rp 6 jt" },
  { item: "Penempatan kerja", h: "Rp 15 jt", c: "Rp 15 jt" },
];

export const living = [
  { item: "Asrama", v: "Rp 2 jt" },
  { item: "Makan & harian", v: "Rp 2–3 jt" },
  { item: "Asuransi kesehatan", v: "Rp 1,5 jt" },
];

export const simulation = [
  { label: "Gaji (2 jt ₩)", v: "Rp 26 jt" },
  { label: "Cicilan kuliah", v: "Rp 10 jt" },
  { label: "Biaya hidup", v: "Rp 6 jt" },
  { label: "Sisa tabungan", v: "± Rp 10 jt" },
];

export const timeline = [
  { when: "Okt–Nov", title: "Asesmen & pendaftaran", now: true },
  { when: "Des 2026", title: "Skrining dokumen & wawancara" },
  { when: "Jan 2027", title: "Penerimaan & persiapan dokumen" },
  { when: "Feb 2027", title: "Visa & berangkat" },
  { when: "Mar 2027", title: "Mulai kuliah di Busan" },
];

export const faqs = [
  { q: "Harus bisa bahasa Korea?", a: "Tidak wajib. Kuliah memakai bahasa Inggris lewat English Track, jadi kamu bisa fokus ke ilmunya sejak hari pertama." },
  { q: "Kerja part-time-nya legal?", a: "Legal. Mahasiswa visa D-2 boleh kerja paruh waktu setelah dapat izin Imigrasi Korea. Pengurusannya dibantu Fakultas." },
  { q: "Gajinya dijamin?", a: "Angka gaji adalah estimasi, bukan jaminan. Penghasilan bergantung pada jam kerja yang diizinkan, jenis pekerjaan, dan kurs." },
  { q: "Dana jaminan Rp 220 juta hangus?", a: "Tidak. Itu bukan biaya. Imigrasi Korea meminta saldo rekening sebagai bukti kemampuan finansial, dan uangnya tetap milikmu." },
  { q: "Belum punya IELTS, masih bisa?", a: "Syarat minimal masuk adalah IELTS 5.5. Mulai dari asesmen gratis agar kami bisa cek kesiapan bahasamu dan menyusun rencana yang sesuai sebelum pendaftaran ditutup November." },
];
