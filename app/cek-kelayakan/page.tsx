"use client";

import { useState } from "react";
import { PageHero, Section } from "@/components/ui";
import { waLink } from "@/lib/content";

const field = "mt-2 w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-white placeholder:text-slate-500 focus:border-brand-glow focus:outline-none";

export default function CekKelayakanPage() {
  const [f, setF] = useState({ nama: "", wa: "", jurusan: "Global Hospitality Management", bahasa: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo Admin Karir di Korea, saya ingin daftar asesmen Spring 2027.\nNama: ${f.nama}\nWhatsApp: ${f.wa}\nJurusan diminati: ${f.jurusan}\nSkor bahasa Inggris: ${f.bahasa || "Belum punya"}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageHero title="Cek kelayakan" accent="gratis." sub="Kami cek kesiapan bahasa, jurusan yang cocok, dan rencana biayamu. Syarat minimal IELTS 5.5." />
      <Section>
        <form onSubmit={submit} className="mx-auto max-w-xl space-y-5 rounded-2xl border border-white/10 bg-ink-card/70 p-6 md:p-8">
          <label className="block text-sm font-medium">Nama lengkap
            <input required className={field} value={f.nama} onChange={set("nama")} placeholder="Nama sesuai paspor" />
          </label>
          <label className="block text-sm font-medium">Nomor WhatsApp
            <input required type="tel" className={field} value={f.wa} onChange={set("wa")} placeholder="08xxxxxxxxxx" />
          </label>
          <label className="block text-sm font-medium">Jurusan yang diminati
            <select className={field} value={f.jurusan} onChange={set("jurusan")}>
              <option>Global Hospitality Management</option>
              <option>Intelligent Computing</option>
            </select>
          </label>
          <label className="block text-sm font-medium">Skor IELTS / TOEFL (kosongkan jika belum ada)
            <input className={field} value={f.bahasa} onChange={set("bahasa")} placeholder="Contoh: IELTS 5.5" />
          </label>
          <button type="submit" className="w-full rounded-full bg-crimson py-3 font-semibold transition hover:bg-crimson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Daftar Asesmen Spring 2027
          </button>
          <p className="text-center text-xs text-slate-400">Data dikirim lewat WhatsApp ke admin. Tidak disimpan di situs ini.</p>
        </form>
      </Section>
    </>
  );
}
