import type { Metadata } from "next";
import { Card, FinalCta, Heading, PageHero, Section } from "@/components/ui";
import { costRows, living, simulation, timeline } from "@/lib/content";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Biaya & Jadwal",
  description:
    "Rincian biaya persiapan dan keberangkatan, biaya hidup di Busan, simulasi tabungan, serta jadwal pendaftaran Spring 2027. Kuliah mulai Maret 2027.",
  alternates: { canonical: "/biaya" },
  openGraph: { url: "/biaya", images: [ogImage] },
};

export default function BiayaPage() {
  return (
    <>
      <PageHero title="Transparan dari awal." accent="No hidden fee." sub="Rincian biaya persiapan dan keberangkatan, biaya hidup di Busan, simulasi tabungan, dan jadwal pendaftaran." />

      <Section>
        <Heading title="Persiapan & keberangkatan" />
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[520px] text-left text-sm md:text-base">
            <thead className="bg-brand">
              <tr>
                <th className="px-5 py-4 font-semibold">Rincian</th>
                <th className="px-5 py-4 font-semibold">Hospitality</th>
                <th className="px-5 py-4 font-semibold">Computing</th>
              </tr>
            </thead>
            <tbody>
              {costRows.map((r) => (
                <tr key={r.item} className="border-t border-white/10">
                  <td className="px-5 py-4">{r.item}</td>
                  <td className="px-5 py-4">{r.h}</td>
                  <td className="px-5 py-4">{r.c}</td>
                </tr>
              ))}
              <tr className="border-t border-white/10 bg-crimson/20 font-bold">
                <td className="px-5 py-4">Estimasi total</td>
                <td className="px-5 py-4">Rp 59,8 jt</td>
                <td className="px-5 py-4">Rp 69,8 jt</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Card className="mt-6 border-sky-400/40">
          <h3 className="text-lg font-semibold">Dana jaminan visa Rp 220 juta?</h3>
          <p className="mt-2 text-slate-300">Ini bukan biaya. Imigrasi Korea minta saldo rekening sebagai bukti kemampuan finansial. Uangnya tetap milikmu.</p>
        </Card>
      </Section>

      <Section className="bg-ink-soft">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold">Biaya hidup di Busan / bulan</h2>
            <Card>
              {living.map((l) => (
                <div key={l.item} className="flex justify-between border-b border-white/10 py-3 text-slate-200">
                  <span>{l.item}</span>
                  <span className="font-semibold">{l.v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 text-lg font-bold">
                <span>Total</span>
                <span className="grad-text">± Rp 6 jt</span>
              </div>
            </Card>
          </div>
          <div>
            <h2 className="mb-5 text-2xl font-bold">Simulasi: gaji part-time nutup kuliah, masih bisa nabung.</h2>
            <Card>
              {simulation.map((s, i) => (
                <div key={s.label} className={`flex justify-between py-3 ${i === simulation.length - 1 ? "mt-1 border-t border-white/20 pt-4 text-lg font-bold" : "border-b border-white/10 text-slate-200"}`}>
                  <span>{i === 1 || i === 2 ? "− " : i === 3 ? "= " : ""}{s.label}</span>
                  <span className={i === 3 ? "grad-text" : "font-semibold"}>{s.v}</span>
                </div>
              ))}
            </Card>
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-400">
          Mulai semester 2, biaya kuliah dicicil 4× per semester. Di bulan tanpa cicilan tabungan bisa lebih besar. Semua angka estimasi; tergantung jam kerja, beasiswa, dan kurs.
        </p>
      </Section>

      <Section id="jadwal">
        <Heading title="Kuliah mulai Maret 2027." accent="Pendaftaran tutup November." />
        <ol className="mx-auto max-w-2xl space-y-0">
          {timeline.map((t, i) => (
            <li key={t.title} className="relative flex gap-5 pb-8 last:pb-0">
              {i < timeline.length - 1 && <span className="absolute left-[11px] top-6 h-full w-px bg-white/20" />}
              <span className={`relative mt-1 h-6 w-6 shrink-0 rounded-full border-4 ${t.now ? "border-crimson bg-white" : "border-brand-light bg-ink"}`} />
              <div>
                <p className="text-sm font-semibold text-sky-300">{t.now ? "Sekarang · " : ""}{t.when}</p>
                <p className="text-lg font-semibold">{t.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <FinalCta />
    </>
  );
}
