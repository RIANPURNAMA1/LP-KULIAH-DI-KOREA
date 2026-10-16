import { WA_NUMBER, waLink } from "@/lib/content";

/**
 * Konfigurasi nomor WhatsApp admin.
 * Diambil dari env NEXT_PUBLIC_WA_NUMBER (fallback ke nomor default di lib/content).
 * Semua tautan WhatsApp dibuat lewat `waLink()` yang memakai encodeURIComponent.
 */
export const ADMIN_WA_NUMBER = WA_NUMBER;

export type QuestionId =
  | "goal"
  | "interest"
  | "education"
  | "language"
  | "documents"
  | "finance"
  | "intake";

export type Option = {
  value: string;
  label: string;
  hint?: string;
};

export type Question = {
  id: QuestionId;
  title: string;
  helper?: string;
  options: Option[];
};

export type Answers = Partial<Record<QuestionId, string>>;

export type RecommendationSection = {
  label: string;
  value: string;
  advice: string;
};

export type Recommendation = {
  isTentative: boolean;
  major: { name: string; reason: string };
  alternative?: string;
  exploration?: string;
  language: { label: string; advice: string };
  finance: { label: string; advice: string };
  nextSteps: string[];
};

export const QUESTIONS: Question[] = [
  {
    id: "goal",
    title: "Apa tujuan utamamu kuliah di Korea?",
    helper: "Pilih yang paling menggambarkan rencanamu saat ini.",
    options: [
      { value: "fund", label: "Kuliah sambil kerja untuk membiayai sendiri" },
      { value: "career", label: "Membangun karier profesional & pengalaman kerja di Korea" },
      { value: "academic", label: "Fokus studi dan meraih gelar S1" },
      { value: "explore", label: "Masih eksplorasi peluang kuliah di Korea" },
    ],
  },
  {
    id: "interest",
    title: "Bidang mana yang paling menarik bagimu?",
    helper: "Tidak ada jawaban yang salah — ini membantu kami menyaring arah jurusan.",
    options: [
      { value: "tech", label: "Teknologi, data, dan AI" },
      { value: "hospitality", label: "Hospitality, hotel, F&B, dan pariwisata" },
      { value: "both", label: "Keduanya menarik bagiku" },
      { value: "unsure", label: "Belum tahu / masih ragu" },
    ],
  },
  {
    id: "education",
    title: "Bagaimana kondisi pendidikan terakhirmu?",
    options: [
      { value: "graduate-hs", label: "Sudah lulus SMA/SMK/sederajat" },
      { value: "final-year-hs", label: "Kelas 12 / akan lulus sebentar lagi" },
      { value: "college", label: "Sedang kuliah D3–S1, ingin pindah jalur" },
      { value: "other", label: "Lainnya" },
    ],
  },
  {
    id: "language",
    title: "Sejauh mana kesiapan bahasa Inggrismu?",
    helper: "Syarat masuk program ini adalah IELTS 5.5 (atau setara).",
    options: [
      { value: "cert-high", label: "Sudah punya sertifikat IELTS 6.5+ / TOEFL iBT 81+" },
      { value: "cert-mid", label: "Sudah punya IELTS 5.5–6.0 (atau setara)" },
      { value: "untested-ready", label: "Belum tes, tapi bahasa Inggrisku cukup lancar" },
      { value: "untested-prep", label: "Belum tes dan masih perlu banyak latihan" },
    ],
  },
  {
    id: "documents",
    title: "Sudah sejauh mana persiapan dokumenmu?",
    options: [
      { value: "ready", label: "Sudah lengkap dan siap" },
      { value: "partial", label: "Sebagian sudah siap" },
      { value: "starting", label: "Baru mulai, butuh panduan" },
      { value: "unknown", label: "Belum tahu dokumen apa saja yang dibutuhkan" },
    ],
  },
  {
    id: "finance",
    title: "Bagaimana rencana pembiayaan kuliahmu?",
    options: [
      { value: "self", label: "Dana pribadi / keluarga" },
      { value: "scholarship-work", label: "Mengandalkan beasiswa & kerja part-time" },
      { value: "mix", label: "Gabungan tabungan, beasiswa, dan kerja" },
      { value: "searching", label: "Masih mencari cara pembiayaan" },
    ],
  },
  {
    id: "intake",
    title: "Kapan targetmu mulai kuliah?",
    options: [
      { value: "spring-2027", label: "Spring 2027 (mulai Maret 2027)" },
      { value: "fall-2027", label: "Fall 2027 (mulai September 2027)" },
      { value: "unsure", label: "Belum menentukan, ingin konsultasi dulu" },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

const MAJOR_GHM = {
  name: "Global Hospitality Management",
  reason:
    "Sektor pariwisata, hotel, resort, dan F&B Korea sedang kekurangan tenaga kerja dan makin terbuka untuk talenta internasional. Cocok kalau kamu suka bertemu orang dan dunia pelayanan.",
};

const MAJOR_IC = {
  name: "Intelligent Computing",
  reason:
    "Korea adalah pusat industri semikonduktor dan AI. Permintaan talenta IT internasional tinggi. Cocok kalau kamu suka teknologi, data, dan pemecahan masalah.",
};

export function optionLabel(question: Question, value?: string): string {
  if (!value) return "-";
  return question.options.find((o) => o.value === value)?.label ?? "-";
}

export function buildRecommendation(answers: Answers): Recommendation {
  const interest = answers.interest;

  let major = MAJOR_IC;
  let alternative: string | undefined;
  let exploration: string | undefined;
  let isTentative = false;

  if (interest === "hospitality") {
    major = MAJOR_GHM;
  } else if (interest === "tech") {
    major = MAJOR_IC;
  } else if (interest === "both") {
    major = MAJOR_IC;
    alternative = MAJOR_GHM.name;
  } else {
    isTentative = true;
    major = answers.goal === "fund" || answers.goal === "explore" ? MAJOR_GHM : MAJOR_IC;
    exploration =
      "Minatmu belum jelas, dan itu wajar. Sebelum memutuskan, eksplorasi dulu kedua jurusan lewat asesmen singkat bersama admin agar pilihanmu lebih yakin.";
  }

  const languageMap: Record<string, { label: string; advice: string }> = {
    "cert-high": {
      label: "Sudah di atas syarat minimum",
      advice:
        "Kamu memenuhi syarat masuk dan berpeluang besar mendapat potongan biaya kuliah semester 1. Ini peluang, bukan jaminan beasiswa.",
    },
    "cert-mid": {
      label: "Memenuhi syarat minimum",
      advice:
        "Kamu sudah menembus syarat minimum (IELTS 5.5). Menaikkan skor dapat memperbesar peluang potongan biaya kuliah.",
    },
    "untested-ready": {
      label: "Perlu sertifikat resmi",
      advice:
        "Kemampuanmu cukup, tetapi pendaftaran butuh sertifikat resmi. Targetkan IELTS 5.5 dulu, lalu lanjut ke 6.0+ untuk peluang lebih baik.",
    },
    "untested-prep": {
      label: "Perlu persiapan bahasa",
      advice:
        "Mulai program persiapan bahasa dan targetkan IELTS 5.5 sebagai syarat minimum masuk. Kami bantu menyusun jadwal belajarmu.",
    },
  };

  const financeMap: Record<string, { label: string; advice: string }> = {
    self: {
      label: "Dana pribadi / keluarga",
      advice:
        "Kamu bisa fokus kuliah tanpa tekanan bekerja, tetapi tetap boleh kerja part-time legal untuk pengalaman dan tambahan penghasilan.",
    },
    "scholarship-work": {
      label: "Beasiswa + kerja part-time",
      advice:
        "Siapkan sertifikat bahasa untuk mengejar potongan biaya (20%–100% mulai semester 2), dan manfaatkan kerja part-time legal visa D-2.",
    },
    mix: {
      label: "Gabungan tabungan, beasiswa, dan kerja",
      advice:
        "Kombinasi ini paling umum. Susun rencana biaya per semester dan tetapkan target skor bahasa agar potongan biaya maksimal.",
    },
    searching: {
      label: "Belum ada rencana jelas",
      advice:
        "Langkah pertama: minta rincian biaya dan skema beasiswa dari admin, lalu susun target pembiayaan yang realistis per semester.",
    },
  };

  const language = languageMap[answers.language ?? ""] ?? {
    label: "Belum diisi",
    advice: "Lengkapi jawaban asesmen agar kami bisa menilai kesiapan bahasamu.",
  };
  const finance = financeMap[answers.finance ?? ""] ?? {
    label: "Belum diisi",
    advice: "Lengkapi jawaban asesmen agar kami bisa menyusun rencana pembiayaanmu.",
  };

  const documentSteps: Record<string, string> = {
    ready: "Dokumenmu sudah siap — lanjutkan ke tahap skrining dokumen.",
    partial: "Lengkapi dokumen yang tersisa. Kami sediakan checklist agar tidak ada yang terlewat.",
    starting: "Kami bantu dengan panduan dan checklist dokumen agar prosesnya lebih ringan.",
    unknown: "Kami akan menjelaskan dokumen apa saja yang dibutuhkan untuk pendaftaran.",
  };

  const intakeSteps: Record<string, string> = {
    "spring-2027": "Pendaftaran Spring 2027 ditutup November — mulai prosesnya sekarang agar tidak kehabisan waktu.",
    "fall-2027": "Kamu punya waktu menyiapkan bahasa dan dokumen dengan lebih leluasa untuk Fall 2027.",
    unsure: "Diskusikan waktu terbaik untuk mulai bersama admin agar tidak terburu-buru.",
  };

  const nextSteps = [
    documentSteps[answers.documents ?? ""] ?? "Tentukan kesiapan dokumenmu bersama admin.",
    intakeSteps[answers.intake ?? ""] ?? "Tentukan target waktu kuliahmu bersama admin.",
    "Ikuti asesmen lanjutan bersama admin untuk mengunci pilihan jurusan dan jadwalmu.",
  ];

  return {
    isTentative,
    major,
    alternative,
    exploration,
    language,
    finance,
    nextSteps,
  };
}

export function buildWhatsAppMessage(
  name: string,
  whatsapp: string,
  answers: Answers,
  recommendation: Recommendation,
): string {
  const answerLines = QUESTIONS.map(
    (q, i) => `${i + 1}. ${q.title} → ${optionLabel(q, answers[q.id])}`,
  );

  const lines = [
    "Halo Admin Karir di Korea, saya baru menyelesaikan Tes Kecocokan.",
    "",
    `Nama: ${name}`,
    `WhatsApp: ${whatsapp}`,
    "",
    `Rekomendasi jurusan: ${recommendation.major.name}${
      recommendation.isTentative ? " (masih perlu eksplorasi)" : ""
    }`,
    `Kesiapan bahasa: ${recommendation.language.label}`,
    `Rencana pembiayaan: ${recommendation.finance.label}`,
    "",
    "Ringkasan jawaban asesmen:",
    ...answerLines,
    "",
    "Mohon dibantu untuk langkah selanjutnya. Terima kasih!",
  ];

  return lines.join("\n");
}

export function whatsAppHref(name: string, whatsapp: string, answers: Answers, recommendation: Recommendation): string {
  return waLink(buildWhatsAppMessage(name, whatsapp, answers, recommendation));
}
