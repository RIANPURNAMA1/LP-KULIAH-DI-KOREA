"use client";

import { useState, type ReactNode } from "react";
import { Container } from "@/components/ui";
import {
  SECTIONS,
  TOTAL_SECTIONS,
  firstMissingField,
  answerLabel,
  type Answers,
  type Field,
} from "@/lib/pendaftaran";
import { createAssessment } from "@/lib/api";

/* ----------------------------- Ikon kecil ------------------------------ */

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15.5 14" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.6 13.4 12 22l-9-9V4a1 1 0 0 1 1-1h9l7.6 7.6a2 2 0 0 1 0 2.8z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.3A8.4 8.4 0 1 1 21 11.5z" />
    </svg>
  );
}

/* --------------------------- Kelas tombol umum -------------------------- */

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition hover:bg-crimson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line/15 px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:bg-card-soft hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const fieldBase =
  "w-full rounded-xl border border-line/15 bg-card-soft px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

/* --------------------------- Render satu field -------------------------- */

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: string;
  onChange: (name: string, value: string) => void;
}) {
  const labelId = `field-${field.name}`;

  return (
    <div className={field.full ? "md:col-span-2" : undefined}>
      <label htmlFor={labelId} className="block text-sm font-medium text-foreground">
        {field.label}
        {field.required && <span className="ml-0.5 text-crimson">*</span>}
      </label>
      {field.helper && <p className="mt-1 text-xs text-foreground/50">{field.helper}</p>}

      {field.type === "radio" && field.options ? (
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {field.options.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(field.name, opt.value)}
                aria-pressed={isSelected}
                className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? "border-accent bg-accent/5 ring-1 ring-accent/40"
                    : "border-line/10 bg-card-soft hover:border-accent/40"
                }`}
              >
                <span className="text-sm font-medium text-foreground">{opt.label}</span>
                <span
                  aria-hidden="true"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                    isSelected ? "border-accent bg-accent text-background" : "border-line/25 text-transparent"
                  }`}
                >
                  <CheckIcon />
                </span>
              </button>
            );
          })}
        </div>
      ) : field.type === "select" ? (
        <select
          id={labelId}
          className={`mt-2 ${fieldBase}`}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
        >
          <option value="">— Pilih —</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={labelId}
          rows={3}
          className={`mt-2 ${fieldBase}`}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ) : (
        <input
          id={labelId}
          type={field.type}
          autoComplete={field.name === "email" ? "email" : field.name === "whatsapp" ? "tel" : "on"}
          className={`mt-2 ${fieldBase}`}
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}
    </div>
  );
}

/* --------------------------- Kartu ringkasan ---------------------------- */

function SummaryRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-foreground/60">{label}</dt>
      <dd className="font-semibold text-foreground sm:text-right">{value}</dd>
    </div>
  );
}

/* -------------------------------- Halaman ------------------------------- */

export default function PendaftaranPage() {
  const [step, setStep] = useState(0); // 0 intro · 1..N bagian · N+1 tinjau
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [kode, setKode] = useState("");

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const setAnswer = (name: string, value: string) => {
    setError("");
    setAnswers((prev) => {
      const next = { ...prev, [name]: value };
      if ((name === "sertifikat_topik" && value === "tidak") || (name === "sertifikat_inggris" && value === "tidak")) {
        delete next.topik_level;
        delete next.inggris_skor;
      }
      return next;
    });
  };

  const goNextSection = (section: (typeof SECTIONS)[number]) => {
    const missing = firstMissingField(section, answers);
    if (missing) {
      setError(`Mohon lengkapi: ${missing.label}`);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, TOTAL_SECTIONS + 1));
    scrollTop();
  };

  const restart = () => {
    setAnswers({});
    setError("");
    setSubmitting(false);
    setSubmitted(false);
    setKode("");
    setStep(0);
    scrollTop();
  };

  const submit = async () => {
    setError("");
    setSubmitting(true);
    try {
      const nama = answers.nama_lengkap?.trim() ?? "";
      const whatsapp = answers.whatsapp?.trim() ?? "";
      const jurusan = answers.jurusan_diminati?.trim() || "Belum ditentukan";

      const bahasaParts: string[] = [];
      if (answers.sertifikat_topik === "ya") {
        bahasaParts.push(answers.topik_level ? `TOPIK ${answers.topik_level}` : "TOPIK");
      }
      if (answers.sertifikat_inggris === "ya") {
        bahasaParts.push(answers.inggris_skor?.trim() || "IELTS/TOEFL");
      }

      const created = await createAssessment({
        nama,
        whatsapp,
        jurusan,
        bahasa: bahasaParts.join(" · ") || null,
        answers,
        sumber: "web-pendaftaran",
      });
      setKode(created.kode);
      setSubmitted(true);
      scrollTop();
    } catch (err) {
      setError(
        err instanceof Error
          ? `Gagal mengirim pendaftaran: ${err.message}. Coba lagi sebentar.`
          : "Gagal mengirim pendaftaran. Coba lagi sebentar.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------------------- Fase 0: pembuka ----------------------- */
  if (step === 0) {
    return (
      <div className="no-reveal pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
              Formulir Pendaftaran
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Daftar Kuliah di <span className="grad-text">Dong-Eui University.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Formulir ini digunakan untuk pendataan awal calon mahasiswa yang berminat melanjutkan pendidikan di
              Dong-Eui University, Korea Selatan. Mohon isi seluruh data dengan benar dan sesuai dokumen resmi.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-2 text-sm text-foreground/70">
                <ClockIcon />
                Sekitar 5 menit
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-2 text-sm text-foreground/70">
                <TagIcon />
                Tanpa biaya
              </span>
            </div>

            <div className="mt-9">
              <button type="button" onClick={() => { setStep(1); scrollTop(); }} className={btnPrimary}>
                Mulai Mengisi Formulir
                <ArrowRightIcon />
              </button>
            </div>

            <p className="mt-5 text-xs text-foreground/50">
              Data hanya digunakan untuk proses pendaftaran dan tidak dibagikan tanpa izinmu.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  /* ------------------------------ Fase 1: bagian ------------------------- */
  if (step >= 1 && step <= TOTAL_SECTIONS) {
    const section = SECTIONS[step - 1];
    const progress = Math.round((step / (TOTAL_SECTIONS + 1)) * 100);
    const isLast = step === TOTAL_SECTIONS;

    return (
      <div className="no-reveal pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-line/10"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_SECTIONS}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground/50">
              Bagian {section.code} · Langkah {step} dari {TOTAL_SECTIONS}
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">{section.title}</h2>
            {section.desc && <p className="mt-2 text-sm text-foreground/60">{section.desc}</p>}

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {section.fields
                .filter((f) => !f.showIf || f.showIf(answers))
                .map((f) => (
                  <FieldControl key={f.name} field={f} value={answers[f.name] ?? ""} onChange={setAnswer} />
                ))}
            </div>

            {error && <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={goBack} className={btnSecondary}>
                <ArrowLeftIcon />
                Kembali
              </button>
              <button type="button" onClick={() => goNextSection(section)} className={btnPrimary}>
                {isLast ? "Tinjau Pendaftaran" : "Lanjutkan"}
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /* --------------------------- Fase 2: sukses ---------------------------- */
  if (submitted) {
    return (
      <div className="no-reveal pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Pendaftaranmu sudah terkirim 🎉
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
              Terima kasih, {answers.nama_lengkap?.trim() || "kamu"}. Data pendaftaranmu sudah masuk ke dashboard admin
              dan akan ditindaklanjuti oleh tim kami.
            </p>

            <div className="mt-8 rounded-2xl border border-line/10 bg-card-soft p-6 text-left">
              <dl className="space-y-3 text-sm">
                <SummaryRow label="Kode pendaftaran" value={<span className="font-mono">{kode || "-"}</span>} />
                <SummaryRow label="Jenjang" value={answerLabel(SECTIONS[2].fields[0], answers)} />
                <SummaryRow label="Jurusan diminati" value={answers.jurusan_diminati || "-"} />
                <SummaryRow label="WhatsApp" value={answers.whatsapp || "-"} />
              </dl>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/" className={btnPrimary}>
                Kembali ke Beranda
              </a>
              <button type="button" onClick={restart} className={btnSecondary}>
                Isi Formulir Baru
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /* --------------------------- Fase 3: tinjau ---------------------------- */
  return (
    <div className="no-reveal pb-20 pt-28 md:pt-32">
      <Container>
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">Langkah terakhir</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">Tinjau data pendaftaran</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
              Periksa kembali seluruh data di bawah ini sebelum dikirim ke admin.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {SECTIONS.map((section) => (
              <div key={section.id} className="rounded-2xl border border-line/10 bg-card-soft p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">
                  {section.code}. {section.title}
                </h2>
                <dl className="mt-4 space-y-3 text-sm">
                  {section.fields
                    .filter((f) => !f.showIf || f.showIf(answers))
                    .map((f) => (
                      <SummaryRow key={f.name} label={f.label} value={answerLabel(f, answers)} />
                    ))}
                </dl>
              </div>
            ))}
          </div>

          {error && <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>}

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={submit} disabled={submitting} className={btnPrimary}>
              <ChatIcon />
              {submitting ? "Mengirim..." : "Kirim Pendaftaran"}
            </button>
            <button type="button" onClick={goBack} className={btnSecondary}>
              <ArrowLeftIcon />
              Kembali
            </button>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-foreground/50">
            Data pendaftaranmu langsung tersimpan ke dashboard admin. Tim kami akan menghubungimu lewat WhatsApp yang
            kamu isi.
          </p>
        </div>
      </Container>
    </div>
  );
}
