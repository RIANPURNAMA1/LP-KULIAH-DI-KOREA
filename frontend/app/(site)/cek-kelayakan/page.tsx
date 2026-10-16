"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Container } from "@/components/ui";
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  buildRecommendation,
  type Answers,
} from "@/lib/cek-kelayakan";
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

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
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

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M16 12h3" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="9" y1="6" x2="20" y2="6" />
      <line x1="9" y1="12" x2="20" y2="12" />
      <line x1="9" y1="18" x2="20" y2="18" />
      <circle cx="4.5" cy="6" r="1" />
      <circle cx="4.5" cy="12" r="1" />
      <circle cx="4.5" cy="18" r="1" />
    </svg>
  );
}

/* --------------------------- Kelas tombol umum -------------------------- */

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3 text-sm font-semibold text-white transition hover:bg-crimson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line/15 px-6 py-3 text-sm font-semibold text-foreground/70 transition hover:bg-card-soft hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const field =
  "mt-2 w-full rounded-xl border border-line/15 bg-card-soft px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

function ResultCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-line/10 bg-card-soft p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">{icon}</span>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/70">{children}</div>
    </div>
  );
}

/* -------------------------------- Halaman ------------------------------- */

export default function CekKelayakanPage() {
  const [step, setStep] = useState(0); // 0 intro · 1..7 pertanyaan · 8 hasil · 9 kontak
  const [answers, setAnswers] = useState<Answers>({});
  const [form, setForm] = useState({ nama: "", wa: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [kode, setKode] = useState("");

  const recommendation = useMemo(() => buildRecommendation(answers), [answers]);

  const scrollTop = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goNext = () => {
    setStep((s) => Math.min(s + 1, TOTAL_QUESTIONS + 2));
    scrollTop();
  };
  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const selectAnswer = (id: (typeof QUESTIONS)[number]["id"], value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const restart = () => {
    setAnswers({});
    setForm({ nama: "", wa: "" });
    setError("");
    setSubmitting(false);
    setSubmitted(false);
    setKode("");
    setStep(0);
    scrollTop();
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama.trim() || !form.wa.trim()) {
      setError("Mohon isi nama lengkap dan nomor WhatsApp aktifmu.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const created = await createAssessment({
        nama: form.nama.trim(),
        whatsapp: form.wa.trim(),
        jurusan: recommendation.major.name,
        bahasa: recommendation.language.label,
        answers,
        rekomendasi: recommendation,
      });
      setKode(created.kode);
      setSubmitted(true);
      scrollTop();
    } catch (err) {
      setError(
        err instanceof Error
          ? `Gagal mengirim hasil: ${err.message}. Coba lagi sebentar.`
          : "Gagal mengirim hasil. Coba lagi sebentar.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ------------------------------- Fase 0: pembuka ----------------------- */
  if (step === 0) {
    return (
      <div className="pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
              Asesmen Gratis
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Temukan Jalur Kuliah <span className="grad-text">yang Cocok untukmu.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/70 md:text-lg">
              Jawab beberapa pertanyaan singkat untuk memetakan pilihan jurusan, kesiapan bahasa Inggris, dan rencana
              pembiayaan kuliahmu di Korea Selatan.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-2 text-sm text-foreground/70">
                <ClockIcon />
                Sekitar 3 menit
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line/10 bg-card-soft px-4 py-2 text-sm text-foreground/70">
                <TagIcon />
                Tanpa biaya
              </span>
            </div>

            <div className="mt-9">
              <button type="button" onClick={goNext} className={btnPrimary}>
                Mulai Tes Kecocokan
                <ArrowRightIcon />
              </button>
            </div>

            <p className="mt-5 text-xs text-foreground/50">
              Hasil berupa rekomendasi awal, bukan keputusan penerimaan universitas atau jaminan beasiswa.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  /* ----------------------------- Fase 1: pertanyaan ---------------------- */
  if (step >= 1 && step <= TOTAL_QUESTIONS) {
    const question = QUESTIONS[step - 1];
    const selected = answers[question.id];
    const progress = Math.round((step / TOTAL_QUESTIONS) * 100);

    return (
      <div className="pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-line/10"
              role="progressbar"
              aria-valuenow={step}
              aria-valuemin={1}
              aria-valuemax={TOTAL_QUESTIONS}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-foreground/50">
              Pertanyaan {step} dari {TOTAL_QUESTIONS}
            </p>

            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">{question.title}</h2>
            {question.helper && <p className="mt-2 text-sm text-foreground/60">{question.helper}</p>}

            <div className="mt-7 grid gap-3">
              {question.options.map((opt) => {
                const isSelected = selected === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectAnswer(question.id, opt.value)}
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

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={goBack} className={btnSecondary}>
                <ArrowLeftIcon />
                Kembali
              </button>
              <button type="button" onClick={goNext} disabled={!selected} className={btnPrimary}>
                {step === TOTAL_QUESTIONS ? "Lihat Hasil" : "Lanjutkan"}
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /* -------------------------------- Fase 2: hasil ----------------------- */
  if (step === TOTAL_QUESTIONS + 1) {
    return (
      <div className="pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">Hasil asesmen</span>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
                Rekomendasi <span className="grad-text">awal untukmu</span>
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/60">
                Disusun dari jawabanmu pada {TOTAL_QUESTIONS} pertanyaan di atas.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-2">
              <ResultCard icon={<BookIcon />} title="Rekomendasi jurusan">
                <p className="text-lg font-bold text-foreground">{recommendation.major.name}</p>
                <p>{recommendation.major.reason}</p>
                {recommendation.alternative && (
                  <p className="text-foreground/60">
                    Alternatif yang sama kuat: <strong className="text-foreground">{recommendation.alternative}</strong>.
                  </p>
                )}
                {recommendation.exploration && (
                  <p className="rounded-xl bg-accent/10 p-3 text-accent">{recommendation.exploration}</p>
                )}
              </ResultCard>

              <ResultCard icon={<ChatIcon />} title="Kesiapan bahasa Inggris">
                <p className="font-semibold text-foreground">{recommendation.language.label}</p>
                <p>{recommendation.language.advice}</p>
              </ResultCard>

              <ResultCard icon={<WalletIcon />} title="Perencanaan pembiayaan">
                <p className="font-semibold text-foreground">{recommendation.finance.label}</p>
                <p>{recommendation.finance.advice}</p>
              </ResultCard>

              <ResultCard icon={<ListIcon />} title="Langkah berikutnya">
                <ul className="space-y-2">
                  {recommendation.nextSteps.map((s) => (
                    <li key={s} className="flex gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </ResultCard>
            </div>

            <div className="mt-4 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5 text-sm leading-relaxed text-amber-700 dark:text-amber-300">
              Hasil ini adalah <strong>rekomendasi awal</strong> berdasarkan jawabanmu — bukan keputusan penerimaan
              universitas dan bukan jaminan beasiswa. Keputusan akhir tetap ada di tanganmu dan pihak universitas.
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={goNext} className={btnPrimary}>
                Lanjut Isi Data untuk Admin
                <ArrowRightIcon />
              </button>
              <button type="button" onClick={restart} className={btnSecondary}>
                Ulangi Tes
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /* --------------------------- Fase 3b: sukses -------------------------- */
  if (submitted) {
    return (
      <div className="pb-20 pt-28 md:pt-32">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <CheckIcon className="h-8 w-8" />
            </span>
            <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Hasilmu sudah terkirim 🎉
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
              Terima kasih, {form.nama.trim() || "kamu"}. Hasil asesmenmu sudah masuk ke dashboard admin dan akan
              ditindaklanjuti oleh tim kami.
            </p>

            <div className="mt-8 rounded-2xl border border-line/10 bg-card-soft p-6 text-left">
              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-foreground/60">Kode pendaftaran</dt>
                  <dd className="font-mono font-semibold text-foreground">{kode || "-"}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-foreground/60">Rekomendasi jurusan</dt>
                  <dd className="font-semibold text-foreground">{recommendation.major.name}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-foreground/60">Kesiapan bahasa</dt>
                  <dd className="font-semibold text-foreground">{recommendation.language.label}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-foreground/60">Rencana pembiayaan</dt>
                  <dd className="font-semibold text-foreground">{recommendation.finance.label}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="/" className={btnPrimary}>
                Kembali ke Beranda
              </a>
              <button type="button" onClick={restart} className={btnSecondary}>
                Ulangi Tes
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  /* ------------------------------- Fase 3: kontak ----------------------- */
  return (
    <div className="pb-20 pt-28 md:pt-32">
      <Container>
        <div className="mx-auto max-w-xl">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wide text-accent">Langkah terakhir</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight md:text-4xl">Kirim hasilmu ke admin</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-foreground/60">
              Isi nama dan nomor WhatsApp aktifmu. Kami tidak meminta ulang informasi yang sudah kamu jawab di asesmen.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-line/10 bg-card-soft p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground/50">Ringkasan rekomendasi</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-foreground/60">Rekomendasi jurusan</dt>
                <dd className="font-semibold text-foreground sm:text-right">{recommendation.major.name}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-foreground/60">Kesiapan bahasa</dt>
                <dd className="font-semibold text-foreground sm:text-right">{recommendation.language.label}</dd>
              </div>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                <dt className="text-foreground/60">Rencana pembiayaan</dt>
                <dd className="font-semibold text-foreground sm:text-right">{recommendation.finance.label}</dd>
              </div>
            </dl>
          </div>

          <form onSubmit={submit} className="mt-5 space-y-5 rounded-2xl border border-line/10 bg-card-soft p-6 md:p-8">
            <label className="block text-sm font-medium">
              Nama lengkap
              <input
                required
                autoComplete="name"
                className={field}
                value={form.nama}
                onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))}
                placeholder="Nama sesuai paspor"
              />
            </label>
            <label className="block text-sm font-medium">
              Nomor WhatsApp aktif
              <input
                required
                type="tel"
                autoComplete="tel"
                className={field}
                value={form.wa}
                onChange={(e) => setForm((f) => ({ ...f, wa: e.target.value }))}
                placeholder="08xxxxxxxxxx"
              />
            </label>

            {error && <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>}

            <button type="submit" disabled={submitting} className={`${btnPrimary} w-full`}>
              <ChatIcon />
              {submitting ? "Mengirim..." : "Kirim Hasil Asesmen"}
            </button>

            <p className="text-center text-xs leading-relaxed text-foreground/50">
              Hasil asesmenmu langsung tersimpan ke dashboard admin. Tim kami akan menghubungimu lewat WhatsApp yang
              kamu isi di atas.
            </p>
          </form>

          <div className="mt-5 text-center">
            <button type="button" onClick={goBack} className={btnSecondary}>
              <ArrowLeftIcon />
              Kembali ke hasil
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
