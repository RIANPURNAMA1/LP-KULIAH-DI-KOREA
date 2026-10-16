/**
 * Konfigurasi formulir pendaftaran kuliah di Korea Selatan.
 * Mengikuti bagan resmi "Formulir Pendaftaran Kuliah di Korea Selatan".
 */

export type Answers = Record<string, string>;

export type FieldType = "text" | "email" | "tel" | "date" | "textarea" | "radio" | "select";

export type Option = {
  value: string;
  label: string;
};

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  options?: Option[];
  placeholder?: string;
  helper?: string;
  required?: boolean;
  full?: boolean;
  showIf?: (answers: Answers) => boolean;
};

export type Section = {
  code: string;
  id: string;
  title: string;
  desc?: string;
  fields: Field[];
};

const YA_TIDAK: Option[] = [
  { value: "ya", label: "Sudah" },
  { value: "tidak", label: "Belum" },
];

export const SECTIONS: Section[] = [
  {
    code: "A",
    id: "diri",
    title: "Data Diri Calon Mahasiswa",
    desc: "Isi seluruh data dengan benar dan sesuai dokumen resmi (paspor/KTP).",
    fields: [
      {
        name: "nama_lengkap",
        label: "Nama lengkap sesuai paspor/KTP",
        type: "text",
        required: true,
        placeholder: "Nama sesuai paspor",
      },
      { name: "tempat_lahir", label: "Tempat lahir", type: "text", required: true, placeholder: "Contoh: Jakarta" },
      { name: "tanggal_lahir", label: "Tanggal lahir", type: "date", required: true },
      {
        name: "jenis_kelamin",
        label: "Jenis kelamin",
        type: "radio",
        required: true,
        options: [
          { value: "laki-laki", label: "Laki-laki" },
          { value: "perempuan", label: "Perempuan" },
        ],
      },
      { name: "whatsapp", label: "Nomor WhatsApp aktif", type: "tel", required: true, placeholder: "08xxxxxxxxxx" },
      { name: "email", label: "Alamat email aktif", type: "email", required: true, placeholder: "nama@email.com" },
      {
        name: "alamat",
        label: "Alamat domisili lengkap",
        type: "textarea",
        required: true,
        full: true,
        placeholder: "Jalan, RT/RW, kelurahan, kecamatan, kota, provinsi, kode pos",
      },
      {
        name: "status_pernikahan",
        label: "Status pernikahan",
        type: "select",
        helper: "Opsional, jika diperlukan.",
        options: [
          { value: "belum-menikah", label: "Belum menikah" },
          { value: "menikah", label: "Menikah" },
          { value: "lainnya", label: "Lainnya" },
        ],
      },
    ],
  },
  {
    code: "B",
    id: "pendidikan",
    title: "Data Pendidikan",
    fields: [
      {
        name: "pendidikan_terakhir",
        label: "Pendidikan terakhir",
        type: "radio",
        required: true,
        full: true,
        options: [
          { value: "sma", label: "SMA/SMK/MA" },
          { value: "d3-d4", label: "D3/D4" },
          { value: "s1", label: "S1" },
          { value: "s2", label: "S2" },
          { value: "lainnya", label: "Lainnya" },
        ],
      },
      {
        name: "nama_sekolah",
        label: "Nama sekolah atau perguruan tinggi terakhir",
        type: "text",
        required: true,
        full: true,
      },
      { name: "jurusan_terakhir", label: "Jurusan terakhir", type: "text", required: true },
      { name: "tahun_lulus", label: "Tahun lulus", type: "text", required: true, placeholder: "Contoh: 2024" },
      {
        name: "nilai",
        label: "Nilai rata-rata atau IPK",
        type: "text",
        required: true,
        placeholder: "Contoh: 85 atau 3.50",
      },
    ],
  },
  {
    code: "C",
    id: "rencana",
    title: "Rencana Kuliah di Korea",
    fields: [
      {
        name: "jenjang",
        label: "Jenjang pendidikan yang diminati",
        type: "radio",
        required: true,
        options: [
          { value: "s1", label: "S1" },
          { value: "s2", label: "S2" },
        ],
      },
      {
        name: "jurusan_diminati",
        label: "Jurusan yang diminati",
        type: "select",
        required: true,
        full: true,
        options: [
          {
            value: "Global Hospitality Management",
            label: "Hospitality & Tourism · S1 — Global Hospitality Management",
          },
          {
            value: "Intelligent Computing",
            label: "Technology & AI · S1 — Intelligent Computing",
          },
        ],
      },
      {
        name: "target_masuk",
        label: "Target masuk perkuliahan",
        type: "text",
        required: true,
        placeholder: "Contoh: Spring 2027 / Maret 2027",
      },
      {
        name: "alasan",
        label: "Alasan ingin kuliah di Korea Selatan",
        type: "textarea",
        required: true,
        full: true,
      },
      { name: "paspor", label: "Apakah sudah memiliki paspor?", type: "radio", required: true, options: YA_TIDAK },
    ],
  },
  {
    code: "D",
    id: "bahasa",
    title: "Kemampuan Bahasa",
    fields: [
      {
        name: "belajar_korea",
        label: "Apakah sudah pernah belajar bahasa Korea?",
        type: "radio",
        required: true,
        options: YA_TIDAK,
      },
      {
        name: "sertifikat_topik",
        label: "Apakah memiliki sertifikat TOPIK?",
        type: "radio",
        required: true,
        options: YA_TIDAK,
      },
      {
        name: "topik_level",
        label: "Jika memiliki sertifikat TOPIK, sebutkan levelnya",
        type: "text",
        placeholder: "Contoh: TOPIK II Level 4",
        showIf: (a) => a.sertifikat_topik === "ya",
      },
      {
        name: "sertifikat_inggris",
        label: "Apakah memiliki sertifikat kemampuan bahasa Inggris (IELTS/TOEFL)?",
        type: "radio",
        required: true,
        options: YA_TIDAK,
      },
      {
        name: "inggris_skor",
        label: "Jika memiliki, sebutkan jenis dan skornya",
        type: "text",
        placeholder: "Contoh: IELTS 6.0 / TOEFL iBT 80",
        showIf: (a) => a.sertifikat_inggris === "ya",
      },
    ],
  },
  {
    code: "F",
    id: "biaya",
    title: "Kesiapan Biaya dan Keberangkatan",
    fields: [
      {
        name: "sumber_pembiayaan",
        label: "Sumber pembiayaan kuliah",
        type: "radio",
        required: true,
        full: true,
        options: [
          { value: "pribadi", label: "Biaya pribadi" },
          { value: "orang-tua", label: "Orang tua/keluarga" },
          { value: "beasiswa", label: "Beasiswa" },
          { value: "lainnya", label: "Lainnya" },
        ],
      },
      {
        name: "tahu_biaya",
        label:
          "Apakah sudah mengetahui bahwa kuliah di luar negeri membutuhkan biaya pendidikan, biaya hidup, dan biaya pengurusan dokumen?",
        type: "radio",
        required: true,
        full: true,
        options: YA_TIDAK,
      },
      {
        name: "bersedia_proses",
        label: "Apakah bersedia mengikuti proses seleksi dan melengkapi dokumen sesuai persyaratan universitas?",
        type: "radio",
        required: true,
        full: true,
        options: [
          { value: "ya", label: "Ya" },
          { value: "tidak", label: "Tidak" },
        ],
      },
      {
        name: "orang_tua_tahu",
        label: "Apakah orang tua/wali mengetahui rencana kuliah di Korea Selatan?",
        type: "radio",
        required: true,
        full: true,
        options: YA_TIDAK,
      },
      {
        name: "target_keberangkatan",
        label: "Kapan target keberangkatan yang diinginkan?",
        type: "text",
        required: true,
        full: true,
        placeholder: "Contoh: Februari 2027",
      },
    ],
  },
];

export const TOTAL_SECTIONS = SECTIONS.length;

export function isFieldVisible(field: Field, answers: Answers): boolean {
  return field.showIf ? field.showIf(answers) : true;
}

export function optionLabel(field: Field, value?: string): string {
  if (!value) return "-";
  return field.options?.find((o) => o.value === value)?.label ?? value;
}

/** Field wajib pertama yang belum terisi pada sebuah bagian (null jika lengkap). */
export function firstMissingField(section: Section, answers: Answers): Field | null {
  return (
    section.fields.find((field) => {
      if (!isFieldVisible(field, answers)) return false;
      if (!field.required) return false;
      return !answers[field.name]?.trim();
    }) ?? null
  );
}

/** Ringkasan jawaban satu field untuk ditampilkan di halaman admin. */
export function answerLabel(field: Field, answers: Answers): string {
  const value = answers[field.name];
  if (!value) return "-";
  if (field.type === "radio" || field.type === "select") return optionLabel(field, value);
  return value;
}
