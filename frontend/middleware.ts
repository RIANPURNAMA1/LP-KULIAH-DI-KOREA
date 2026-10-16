import { NextResponse, type NextRequest } from "next/server";
import { TOKEN_COOKIE } from "@/lib/auth";
import { siteUrl } from "@/lib/seo";

const LOOPBACK = /^(localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1\]|::1)$/i;

function hostnameOf(host: string): string {
  const value = host.trim().toLowerCase();
  if (value.startsWith("[")) {
    const end = value.indexOf("]");
    return end >= 0 ? value.slice(0, end + 1) : value;
  }
  return value.split(":")[0];
}

function resolveOrigin(request: NextRequest): string {
  // Di mode development, selalu pertahankan origin request (localhost:port apa pun).
  if (process.env.NODE_ENV !== "production") return request.nextUrl.origin;

  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const host = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = hostnameOf(host);
  const proto = (forwardedProto ?? "https").split(",")[0].trim() || "https";

  // Pakai host publik yang asli bila tersedia (mis. domain custom).
  if (hostname && !LOOPBACK.test(hostname)) return `${proto}://${host}`;

  // Reverse proxy meneruskan host internal (localhost/127.0.0.1) -> pakai
  // domain publik yang benar agar redirect tidak mengarah ke upstream.
  return siteUrl;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;

  // Belum login -> arahkan ke halaman masuk, simpan tujuan awal.
  if (pathname.startsWith("/admin") && !token) {
    const url = new URL("/login", resolveOrigin(request));
    url.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  // Sudah login -> jangan tampilkan halaman masuk lagi.
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", resolveOrigin(request)));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login"],
};
