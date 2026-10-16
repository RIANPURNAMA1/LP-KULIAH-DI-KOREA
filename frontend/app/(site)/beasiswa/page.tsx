import type { Metadata } from "next";
import { Card, FinalCta, Heading, PageHero, Section } from "@/components/ui";
import { scholarships } from "@/lib/content";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Beasiswa",
  description:
    "Beasiswa hingga 100% berdasarkan skor IELTS dan peringkat IPK (Top 2%–Top 50%) di Dong-eui University. Skor IELTS naik, biaya kuliah turun.",
  alternates: { canonical: "/beasiswa" },
  openGraph: { url: "/beasiswa", images: [ogImage] },
};

export default function BeasiswaPage() {
  return (
    <>
      <PageHero title="Skor IELTS naik," accent="biaya kuliah turun." sub="Semester 1 ditentukan sertifikat bahasa. Semester 2 sampai lulus ditentukan IPK-mu: potongan 20% sampai 100% (Top 2% – Top 50%)." />

      <Section>
        <Heading title="Beasiswa semester 1" sub="Belajar IELTS serius hari ini = hemat puluhan juta besok." />
        <div className="grid gap-5 md:grid-cols-3">
          {scholarships.map((s, i) => (
            <Card key={s.score} className={i === 0 ? "border-crimson bg-gradient-to-b from-crimson/20 to-card-soft" : ""}>
              <p className="text-xl font-bold">{s.score}</p>
              <p className="text-sm text-foreground/70">{s.alt}</p>
              <p className={`mt-6 text-6xl font-bold ${i === 0 ? "grad-red" : "grad-text"}`}>{s.pct}</p>
              <p className="mt-1 text-sm text-foreground/50">potongan biaya kuliah</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-card-soft">
        <div className="mx-auto max-w-3xl">
          <Heading title="Semester 2 sampai lulus:" accent="IPK yang menentukan." center={false} />
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">Potongan berdasarkan peringkat IPK</p>
                <p className="mt-1 text-sm text-foreground/70">Top 2% hingga Top 50% di angkatanmu.</p>
              </div>
              <p className="text-3xl font-bold grad-text">20% – 100%</p>
            </div>
          </Card>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
