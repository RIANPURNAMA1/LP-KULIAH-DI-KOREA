import Link from "next/link";
import { nav, waLink } from "@/lib/content";

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2-5.3A8.4 8.4 0 1 1 21 11.5z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-.8.8a3.5 3.5 0 0 1-1.5-1.5l.8-.8-1-2L9 9.5z" />
    </svg>
  );
}

const socialClass =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#141414] transition-transform duration-300 hover:-translate-y-0.5";

export default function Footer() {
  return (
    <footer className="bg-[#141414]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.4fr_1fr] md:gap-20 md:py-16">
        {/* Kiri */}
        <div>
          <p className="flex items-center gap-3 text-3xl font-extrabold tracking-tight text-white">
            <img
              src="/LOGO%20KARIR%20DI%20KOREA.png"
              alt="Logo Karir di Korea"
              loading="lazy"
              className="h-14 w-auto"
            />
          </p>

          <p className="mt-5 max-w-md text-[15px] font-medium leading-relaxed text-white">
            Belajar mandiri di Korea. Menuju karir profesional &amp; bisnis
            global.
          </p>

          <h3 className="mt-8 text-lg font-bold text-white">
            PT Indonesia Sukses Mendunia
          </h3>
          <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/50">
            Mitra resmi Dong-eui University, Busan
          </p>

          <h3 className="mt-8 text-lg font-bold text-white">Ikuti Kami</h3>
          <div className="mt-4 flex gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className={socialClass}
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={socialClass}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={socialClass}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M14 8h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V10H8v3h2.5v7h3v-7H16l.5-3h-3V8.6c0-.3.2-.6.5-.6z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Kanan */}
        <div>
          <h3 className="text-xl font-bold text-white">Hubungi Kami</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-white/50">
            Pertanyaan soal program Spring 2027? Admin siap membantu.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 font-bold text-white transition-colors hover:text-[#8fbaff]"
          >
            Chat Admin di WhatsApp
          </a>
          <p className="mt-1 font-bold text-white">karirdikorea.com</p>

          <h3 className="mt-8 text-xl font-bold text-white">Halaman</h3>
          <ul className="mt-3 space-y-2 text-[15px] text-white/50">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="transition-colors hover:text-white"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/cek-kelayakan"
                className="transition-colors hover:text-white"
              >
                Cek Kelayakan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © 2026 karirdikorea.com · PT Indonesia Sukses Mendunia
      </div>
    </footer>
  );
}