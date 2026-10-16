import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/seo";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg,#0C0D0E 0%,#06215a 55%,#033378 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: 999,
              background: "#c60e31",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            DONG-EUI UNIVERSITY × KARIR DI KOREA
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            Kuliah S1 English Track di Korea
          </div>
          <div style={{ fontSize: 40, color: "#73aaff", fontWeight: 600 }}>
            Beasiswa sampai 100% · Kerja legal · Batch Spring 2027
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <span>Busan, Korea Selatan</span>
          <span>{siteUrl.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
