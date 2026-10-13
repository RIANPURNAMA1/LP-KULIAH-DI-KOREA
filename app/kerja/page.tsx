import { Card, FinalCta, Heading, PageHero, Section } from "@/components/ui";
import { bonus, workPerks } from "@/lib/content";

export const metadata = { title: "Kerja Part-time | Karir di Korea" };

export default function KerjaPage() {
  return (
    <>
      <PageHero title="Kerja legal, dekat kampus," accent="semua udah disiapin." sub="Kamu nggak dilepas cari kerja sendirian. Lokasi kerja, antar-jemput, sampai izin Imigrasi sudah ada jalurnya." />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-brand to-brand-light">
            <p className="text-sm text-sky-200">Upah minimum Korea 2027</p>
            <p className="mt-2 text-5xl font-bold">10.700 ₩/jam</p>
          </Card>
          <Card>
            <p className="leading-relaxed text-slate-200">
              Berlaku sama untuk pekerja asing dan paruh waktu. Estimasi penghasilan 2–2,2 juta won/bulan (± Rp 26–30 juta).
            </p>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {workPerks.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-semibold text-sky-300">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{p.text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-400">
          Jam kerja mengikuti izin kerja paruh waktu (시간제취업) visa D-2 dari Imigrasi Korea. Penghasilan adalah estimasi, tergantung jam kerja yang diizinkan, jenis pekerjaan, dan kurs.
        </p>
      </Section>

      <Section className="bg-ink-soft">
        <Heading title="Bonus: lulus bukan garis finish." accent="Pilih jalurmu." />
        <div className="grid gap-5 md:grid-cols-2">
          {bonus.map((b) => (
            <Card key={b.title}>
              <h3 className="text-xl font-bold">{b.title}</h3>
              <ul className="mt-4 space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex gap-3 text-slate-200">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                    {i}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
