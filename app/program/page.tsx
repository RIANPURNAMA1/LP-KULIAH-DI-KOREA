import { Card, FinalCta, Heading, PageHero, Section } from "@/components/ui";
import { city, lecturers, majors } from "@/lib/content";

export const metadata = { title: "Program & Kampus | Karir di Korea" };

export default function ProgramPage() {
  return (
    <>
      <PageHero title="S1 English Track:" accent="fokus ke ilmunya, bukan ke bahasanya." sub="Banyak mahasiswa Indonesia tersendat karena harus kuliah dalam bahasa Korea sejak hari pertama. Di English Track, peluang lulusmu jauh lebih besar." />

      <Section>
        <Heading title="Kenalan dulu:" accent="kota besar, kampus besar." sub="Peluang kerja di depan mata." />
        <div className="grid gap-5 md:grid-cols-3">
          {city.map((c) => (
            <Card key={c.kr}>
              <p className="text-2xl font-bold grad-text">{c.kr}</p>
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-slate-300">{c.text}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center font-medium text-sky-300">Kamu nggak sendirian: 4 profesor asal Indonesia ngajar di sini.</p>
      </Section>

      <Section className="bg-ink-soft">
        <Heading title="Pilih jurusanmu" sub="Dua jurusan, keduanya diajarkan dalam bahasa Inggris." />
        <div className="grid gap-5 md:grid-cols-2">
          {majors.map((m) => (
            <Card key={m.name} className="border-l-4 border-l-crimson">
              <p className="text-sm text-slate-400">{m.no}</p>
              <h3 className="mt-1 text-2xl font-bold">{m.name}</h3>
              <p className="mt-3 text-slate-300">{m.desc}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand px-3 py-1 text-sm">{t}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <Heading title="Dosen yang paham rasanya" accent="jadi mahasiswa Indonesia di Korea." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lecturers.map((l) => (
            <Card key={l.name} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-light to-brand-glow text-xl font-bold">
                {l.name.split(" ").slice(0, 2).map((w) => w[0]).join("")}
              </div>
              <h3 className="mt-4 font-semibold leading-snug">{l.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{l.role}</p>
              <p className="mt-2 text-xs text-sky-300">{l.phd}</p>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
