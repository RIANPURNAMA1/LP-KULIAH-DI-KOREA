import type { Metadata } from "next";
import { Card, FinalCta, Heading, PageHero, PhotoPlaceholder, Section } from "@/components/ui";
import { faqs } from "@/lib/content";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/structured-data";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ & Kemitraan",
  description:
    "Jawaban pertanyaan umum seputar kuliah, beasiswa, dan kerja part-time di Korea, serta kerja sama resmi Dong-eui University × Karir di Korea.",
  alternates: { canonical: "/faq" },
  openGraph: { url: "/faq", images: [ogImage] },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <PageHero title="Yang sering" accent="ditanya." sub="Jawaban singkat untuk pertanyaan yang paling sering masuk ke admin." />

      <Section>
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-line/10 bg-card-soft p-5 open:border-brand-glow">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                {f.q}
                <span className="text-xl text-accent transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-foreground/70">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-card-soft">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PhotoPlaceholder label="Foto penandatanganan kerja sama Dong-eui University × Karir di Korea" className="h-64 rounded-2xl" />
          <div>
            <p className="text-sm font-semibold text-accent">Kemitraan resmi</p>
            <h2 className="mt-2 text-3xl font-bold">Kerja sama resmi, bukan sekadar agen.</h2>
            <p className="mt-4 leading-relaxed text-foreground/70">
              Program ini lahir dari kesepakatan resmi Dong-eui University dan Karir di Korea (PT Indonesia Sukses Mendunia). Kamu didampingi di Indonesia dan di Korea.
            </p>
            <Card className="mt-5 p-4 text-sm text-foreground/70">
              <p><strong className="text-foreground">Prof. Gumkwang Bae, Ph.D.</strong> — Dean of International Affairs, Dong-eui University</p>
              <p className="mt-2"><strong className="text-foreground">Gilar Budi Raharja</strong> — Founder karirdikorea.com</p>
            </Card>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
