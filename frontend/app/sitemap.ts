import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const routes: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/program", priority: 0.9, changeFrequency: "monthly" },
  { path: "/beasiswa", priority: 0.8, changeFrequency: "monthly" },
  { path: "/kerja", priority: 0.8, changeFrequency: "monthly" },
  { path: "/biaya", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pendaftaran", priority: 0.9, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: r.path === "/" ? siteUrl : `${siteUrl}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
