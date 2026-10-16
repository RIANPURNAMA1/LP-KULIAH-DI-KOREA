import type { Metadata } from "next";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran Kuliah di Korea Selatan",
  description:
    "Daftar kuliah di Korea Dong-Eui University, Korea Selatan. Isi formulir pendaftaran calon mahasiswa: data diri, pendidikan, rencana kuliah, kemampuan bahasa, dan kesiapan biaya.",
  alternates: { canonical: "/pendaftaran" },
  openGraph: { url: "/pendaftaran", images: [ogImage] },
};

export default function PendaftaranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
