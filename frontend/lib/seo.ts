export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kuliahdikorea.com"
).replace(/\/$/, "");

export const siteName = "Karir di Korea";

export const siteTagline =
  "Kuliah S1 English Track di Korea, beasiswa sampai 100%";

export const siteDescription =
  "Kuliah S1 English Track di Dong-eui University, Busan, Korea. Beasiswa sampai 100%, kerja part-time legal, dan didampingi 4 profesor asal Indonesia. Pendaftaran Spring 2027 dibuka.";

export const ogImageAlt =
  "Karir di Korea × Dong-eui University — Pendaftaran Spring 2027";

export const ogImage = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: ogImageAlt,
};

export const keywords = [
  "kuliah di korea",
  "kuliah di korea bahasa inggris",
  "beasiswa korea",
  "dong-eui university",
  "kerja part-time korea",
  "english track korea",
  "kuliah s1 korea",
  "program kuliah korea untuk indonesia",
  "spring 2027 korea",
  "karir di korea",
];

export function canonical(path = "/") {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}
