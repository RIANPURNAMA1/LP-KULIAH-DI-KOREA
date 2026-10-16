import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran Kuliah di Korea Selatan",
  robots: { index: false, follow: false },
};

export default function CekKelayakanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
