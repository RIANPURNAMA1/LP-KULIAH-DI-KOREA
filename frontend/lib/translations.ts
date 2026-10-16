export type Lang = "id" | "en";

export const LANG_STORAGE_KEY = "lang";

export const langInitScript = `(function(){try{var l=localStorage.getItem('lang');if(l!=='id'&&l!=='en'){l='id';}document.documentElement.lang=l;}catch(e){}})();`;

/**
 * Kamus terjemahan ID -> EN.
 * Key = teks asli (Indonesia) yang dipakai di komponen,
 * Value = terjemahan bahasa Inggris.
 *
 * Dipakai lewat `t("teks indonesia")` dari LanguageProvider.
 * Teks yang belum ada di kamus akan dibiarkan apa adanya.
 */
export const translations: Record<string, string> = {
  /* ---------- Navbar ---------- */
  "Cek Kelayakan": "Check Eligibility",
  Beasiswa: "Scholarship",
  Kerja: "Work",
  Program: "Program",
  "Buka menu": "Open menu",

  /* ---------- Footer ---------- */
  "Belajar mandiri di Korea. Menuju karir profesional & bisnis global.":
    "Study independently in Korea. Toward a global professional career & business.",
  "Mitra resmi Dong-eui University, Busan":
    "Official partner of Dong-eui University, Busan",
  "Ikuti Kami": "Follow Us",
  "Hubungi Kami": "Contact Us",
  "Pertanyaan soal program Spring 2027? Admin siap membantu.":
    "Questions about the Spring 2027 program? Our admin is ready to help.",
  "Chat Admin di WhatsApp": "Chat Admin on WhatsApp",
  Halaman: "Pages",

  /* ---------- Hero ---------- */
  "Kuliah S1": "Bachelor's Degree",
  "di Korea": "in Korea",
  "Bayar dari": "Pay from",
  "gaji sendiri": "your own salary",
  "Kuliah berbahasa Inggris di Busan, peluang beasiswa hingga 100%, kerja part-time legal, dan pendampingan menuju karier profesional atau bisnis global":
    "Study in English in Busan, scholarships of up to 100%, legal part-time work, and guidance toward a professional career or global business",
  "Konsultasi Gratis": "Free Consultation",
  "Cek Kelayakan Saya": "Check My Eligibility",
  "Asesmen awal gratis · Persyaratan bahasa sesuai ketentuan program":
    "Free initial assessment · Language requirements per program rules",
  "Ayo kuliah di Busan": "Let's study in Busan",
  "Ayo kuliah di Korea!": "Let's study in Korea!",
  "≈ 2 juta ₩": "≈ ₩2 million",
  "estimasi gaji part-time / bulan": "estimated part-time wage / month",
  "Peluang Beasiswa": "Scholarship Opportunity",
  "profesor asal Indonesia": "professors from Indonesia",
  "20–40 mnt": "20–40 min",
  "20–40 menit": "20–40 minutes",
  "dari kampus ke tempat kerja": "from campus to workplace",
  "Jurusan Unggulan": "Featured Majors",

  /* ---------- Kenapa sekarang ---------- */
  "Kenapa sekarang?": "Why now?",
  "Korea lagi butuh tenaga muda": "Korea needs young talent",
  "Kamu bisa jadi salah satunya": "You can be one of them",
  "Mahasiswa internasional di Korea naik dari 3.418 orang (1999) jadi 208.962 orang (2024). Pemerintah Korea terus membuka jalan agar mahasiswa asing bisa kuliah sekaligus kerja legal":
    "International students in Korea grew from 3,418 (1999) to 208,962 (2024). The Korean government keeps opening the door for foreign students to study while working legally",
  "Sekarang yang mendominasi masih China, Vietnam, Uzbekistan, Nepal, dan Mongolia. Indonesia? Masih banyak ruang":
    "Today the largest groups are still China, Vietnam, Uzbekistan, Nepal, and Mongolia. Indonesia? There is still plenty of room",
  "Mahasiswa internasional di Korea (orang)":
    "International students in Korea (people)",
  "Korea Selatan · 1999–2024": "South Korea · 1999–2024",
  Mahasiswa: "Students",
  "Sumber: Kementerian Pendidikan Korea.":
    "Source: Korea Ministry of Education.",

  /* ---------- Kenalan dulu: Kota & kampus ---------- */
  "Kenalan Dulu": "Get to Know",
  "Kota besar, kampus besar": "Big city, big campus",
  "Kenali kota, lingkungan, dan peluang yang menantimu untuk membangun masa depan di Korea Selatan":
    "Get to know the city, the neighborhood, and the opportunities waiting for you to build a future in South Korea",
  "Kota terbesar ke-2 di Korea": "2nd largest city in Korea",
  "Hidup lebih terjangkau dari Seoul, peluang kerja tetap luas.":
    "More affordable than Seoul, with job opportunities just as wide.",
  "Pelabuhan & kawasan industri terbesar": "Largest port & industrial zone",
  "Dua pusat lapangan kerja dalam satu kota.":
    "Two job hubs in a single city.",
  "Kampus terbesar ke-4 di Busan": "4th largest campus in Busan",
  "Berdiri sejak 1977, di Gaya, Busanjin-gu, pusat kota.":
    "Founded in 1977, in Gaya, Busanjin-gu, downtown.",

  /* ---------- S1 English Track ---------- */
  "Kuliah dalam bahasa Inggris, fokus ke ilmunya":
    "Study in English, focus on the knowledge",
  "Banyak mahasiswa Indonesia tersendat karena harus kuliah dalam bahasa Korea sejak hari pertama. Di English Track, peluang lulusmu jauh lebih besar.":
    "Many Indonesian students get stuck because they have to study in Korean from day one. In the English Track, your chances of graduating are far higher.",
  "Untuk kamu yang suka melayani, bertemu banyak orang, dan tertarik dengan dunia pariwisata.":
    "For you who love serving people, meeting many people, and are interested in tourism.",
  "Untuk kamu yang penasaran dengan teknologi, data, dan kecerdasan buatan.":
    "For you who are curious about technology, data, and artificial intelligence.",

  /* ---------- Dosen ---------- */
  "Para Dosen asli Indonesia, yang pernah kuliah dan lulus di Korea,":
    "Native Indonesian lecturers who studied and graduated in Korea,",
  "mereka akan bimbing kamu meraih apa yang mereka capai di sana":
    "they will guide you to achieve what they achieved there",
  Dosen: "Lecturer",

  /* ---------- Beasiswa ---------- */
  "Skor IELTS naik,": "Higher IELTS score,",
  "biaya kuliah turun": "lower tuition",
  "Semester 1 ditentukan sertifikat bahasa. Semester 2 sampai lulus ditentukan IPK-mu: potongan 20% sampai 100% (Top 2% – Top 50%)":
    "Semester 1 is determined by your language certificate. Semester 2 through graduation is determined by your GPA: discounts from 20% up to 100% (Top 2% – Top 50%)",
  "Semester 1": "Semester 1",
  "potongan kuliah semester 1": "semester 1 tuition discount",
  "atau TOEFL iBT 81+": "or TOEFL iBT 81+",
  "atau TOEFL iBT 76+": "or TOEFL iBT 76+",
  "syarat minimal masuk": "minimum entry requirement",

  /* ---------- Kerja part-time ---------- */
  "Kerja legal, dekat kampus,": "Legal work, close to campus,",
  "semua udah disiapin": "everything is set up",
  "Kamu nggak dilepas cari kerja sendirian. Lokasi kerja, antar-jemput, sampai izin Imigrasi sudah ada jalurnya":
    "You're not left to find work on your own. Work locations, shuttle service, and even Immigration permits already have a path",
  "Upah minimum Korea 2027": "Korea minimum wage 2027",
  "10.700 ₩/jam": "₩10,700/hour",
  "± Rp 26–30 juta / bulan": "± Rp 26–30 million / month",
  "Upah jelas, standar minimum Korea": "Clear wages, Korea's minimum standard",
  "Berlaku sama untuk pekerja asing dan paruh waktu":
    "Applies equally to foreign and part-time workers",
  "Estimasi penghasilan 2–2,2 juta won/bulan (± Rp 26–30 juta)":
    "Estimated income 2–2.2 million won/month (± Rp 26–30 million)",
  Asrama: "Dormitory",
  "Asrama satu lokasi": "Single-location dormitory",
  "Katering, penatu, mushola, dan pembina":
    "Catering, laundry, prayer room, and mentors",
  "Dari izin sampai antar-jemput, sudah ada jalurnya":
    "From permits to shuttle, the path is ready",
  "~8 hari kuliah": "~8 class days",
  "per bulan, sisanya bisa kerja": "per month, the rest you can work",
  "industri, pelabuhan, wisata": "industry, port, tourism",
  "Antar-jemput": "Shuttle",
  "asrama ↔ tempat kerja": "dorm ↔ workplace",
  "Izin kerja": "Work permit",
  "dibantu Fakultas": "assisted by the Faculty",
  "Jam kerja mengikuti izin kerja paruh waktu (시간제취업) visa D-2 dari Imigrasi Korea. Penghasilan adalah estimasi, tergantung jam kerja yang diizinkan, jenis pekerjaan, dan kurs":
    "Working hours follow the part-time work permit (시간제취업) for the D-2 visa from Korean Immigration. Income is an estimate, depending on permitted working hours, job type, and exchange rate",

  /* ---------- Bonus ---------- */
  "Bonus Lulus bukan garis finish": "Bonus Graduation isn't the finish line",
  "Pilih jalurmu": "Choose your path",
  "Karir Profesional": "Professional Career",
  "Bimbingan karir komprehensif": "Comprehensive career guidance",
  "CV & resume standar Korea": "Korean-standard CV & resume",
  "Asistensi job-matching": "Job-matching assistance",
  "Karir Bisnis": "Business Career",
  "Inkubasi startup": "Startup incubation",
  "Pemagangan bisnis": "Business internship",

  /* ---------- Banner + Jadwal ---------- */
  "Kuliah mulai Maret 2027. Pendaftaran tutup November":
    "Classes start March 2027. Registration closes November",
  "Lihat jadwal": "View schedule",
  "Jadwal Dari asesmen": "Schedule From assessment",
  "sampai mulai kuliah": "to starting class",
  "NOW · OKT–NOV": "NOW · OCT–NOV",
  "Asesmen & pendaftaran": "Assessment & registration",
  "DES 2026": "DEC 2026",
  "Skrining dokumen & wawancara": "Document screening & interview",
  "JAN 2027": "JAN 2027",
  "Penerimaan & persiapan dokumen": "Acceptance & document preparation",
  "FEB 2027": "FEB 2027",
  "Visa & berangkat": "Visa & departure",
  "MAR 2027": "MAR 2027",
  "Mulai kuliah di Busan": "Start classes in Busan",
  Sekarang: "Now",

  /* ---------- Kemitraan ---------- */
  "Kemitraan resmi": "Official partnership",
  "Kerja sama resmi, bukan sekadar agen":
    "Official cooperation, not just an agency",
  "Program ini lahir dari kesepakatan resmi Dong-eui University dan Karir di Korea. Kamu didampingi di Indonesia dan di Korea":
    "This program was born from an official agreement between Dong-eui University and Karir di Korea. You're guided both in Indonesia and in Korea",

  /* ---------- FAQ ---------- */
  "Yang sering ditanya": "Frequently asked",
  "Harus bisa bahasa Korea?": "Do I have to speak Korean?",
  "Nggak. Kuliahnya berbahasa Inggris, minimal IELTS 5.5. Bahasa Korea dasar tetap ngebantu buat kerja part-time dan hidup sehari-hari.":
    "No. Classes are in English, with a minimum IELTS of 5.5. Basic Korean still helps for part-time work and daily life.",
  "Kerja part-time-nya legal?": "Is the part-time work legal?",
  "Legal. Mahasiswa visa D-2 boleh kerja paruh waktu setelah dapat izin Imigrasi Korea. Pengurusannya dibantu Fakultas.":
    "Yes. D-2 visa students may work part-time after getting a Korean Immigration permit. The Faculty helps with the paperwork.",
  "Gajinya dijamin?": "Is the salary guaranteed?",
  "Angka 2–2,2 juta won itu estimasi dari upah minimum 2027. Penghasilan nyata tergantung jam kerja yang diizinkan dan jenis pekerjaan.":
    "The 2–2.2 million won figure is an estimate based on the 2027 minimum wage. Actual income depends on permitted working hours and the type of job.",
  "Dana jaminan Rp 220 juta hangus?": "Is the Rp 220 million deposit lost?",
  "Nggak. Itu saldo rekening syarat visa, bukan biaya. Uangnya tetap punyamu.":
    "No. It's a bank balance required for the visa, not a fee. The money is still yours.",
  "Belum punya IELTS, masih bisa?": "No IELTS yet, can I still apply?",
  "Sertifikat bahasa wajib saat mendaftar. Ikut asesmen dulu, kami bantu petakan target skor dan waktu persiapanmu.":
    "A language certificate is required when you register. Join the assessment first; we'll help map your target score and preparation time.",

  /* ---------- CTA penutup ---------- */
  "Belajar mandiri di Korea": "Study independently in Korea",
  "Menuju karir profesional & bisnis global":
    "Toward a global professional career & business",
  "Mulai dari asesmen gratis. Kami cek kesiapan bahasa, jurusan yang cocok, dan rencana biayamu, sebelum kamu memutuskan apa pun":
    "Start with a free assessment. We check your language readiness, the right major, and your cost plan, before you decide anything",
  "Mulai dari pendaftaran gratis. Lengkapi data dirimu, dan tim kami bantu proses selanjutnya menuju kuliah di Korea":
    "Start with free registration. Complete your details and our team will guide you through the next steps to study in Korea",
  "Daftar Sekarang": "Register Now",
  "Pendaftaran": "Registration",
  "Pendaftaran gratis · Persyaratan bahasa sesuai ketentuan program":
    "Free registration · Language requirements follow program rules",
  "Daftar Asesmen Spring 2027": "Register for Spring 2027 Assessment",
  "Tanya Admin via WhatsApp": "Ask Admin via WhatsApp",
};
