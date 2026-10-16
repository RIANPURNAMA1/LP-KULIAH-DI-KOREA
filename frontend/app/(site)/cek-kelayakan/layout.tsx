import type { Metadata } from "next";
import { ogImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cek Kelayakan Gratis",
  description:
    "Cek kesiapan bahasa, jurusan yang cocok, dan rencana biaya kuliahmu di Korea. Syarat minimal IELTS 5.5. Daftar asesmen Spring 2027 gratis.",
  alternates: { canonical: "/cek-kelayakan" },
  openGraph: { url: "/cek-kelayakan", images: [ogImage] },
};

export default function CekKelayakanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
