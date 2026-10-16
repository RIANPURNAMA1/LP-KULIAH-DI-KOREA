import { siteDescription, siteName, siteUrl } from "./seo";

export const organizationSchema = {
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/logo-karir-di-korea.png`,
  description: siteDescription,
  areaServed: "ID",
  knowsLanguage: ["id", "ko", "en"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: siteName,
  inLanguage: "id-ID",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "S1 English Track — Dong-eui University (Batch Spring 2027)",
  description:
    "Program sarjana (S1) berbahasa Inggris di Dong-eui University, Busan, Korea. Dua jurusan: Global Hospitality Management dan Intelligent Computing. Beasiswa berdasarkan IELTS dan IPK hingga 100%, didampingi kerja part-time legal.",
  inLanguage: "en",
  url: siteUrl,
  provider: {
    "@type": "EducationalOrganization",
    name: siteName,
    url: siteUrl,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "on-campus",
    location: {
      "@type": "Place",
      name: "Dong-eui University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Busan",
        addressCountry: "KR",
      },
    },
  },
};
