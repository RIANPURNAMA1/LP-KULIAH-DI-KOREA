import { Card, FinalCta, Heading, PageHero, PhotoPlaceholder, Section } from "@/components/ui";
import { faqs } from "@/lib/content";

export const metadata = { title: "FAQ & Kemitraan | Karir di Korea" };

export default function FaqPage() {
  return (
    <>
      <PageHero title="Yang sering" accent="ditanya." sub="Jawaban singkat untuk pertanyaan yang paling sering masuk ke admin." />

      <Section>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-white/10 bg-ink-card/70 p-5 open:border-brand-glow">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-xl text-sky-300 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-300">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-ink-soft">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PhotoPlaceholder label="Foto penandatanganan kerja sama Dong-eui University × Karir di Korea" className="h-64 rounded-2xl" />
          <div>
            <p className="text-sm font-semibold text-sky-300">Kemitraan resmi</p>
            <h2 className="mt-2 text-3xl font-bold">Kerja sama resmi, bukan sekadar agen.</h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Program ini lahir dari kesepakatan resmi Dong-eui University dan Karir di Korea (PT Indonesia Sukses Mendunia). Kamu didampingi di Indonesia dan di Korea.
            </p>
            <Card className="mt-5 p-4 text-sm text-slate-300">
              <p><strong className="text-white">Prof. Gumkwang Bae, Ph.D.</strong> — Dean of International Affairs, Dong-eui University</p>
              <p className="mt-2"><strong className="text-white">Gilar Budi Raharja</strong> — Founder karirdikorea.com</p>
            </Card>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
