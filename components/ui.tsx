import Link from "next/link";
import type { ReactNode } from "react";
import { waLink } from "@/lib/content";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-3 ${className}`}>{children}</div>;
}

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`py-12 md:py-16 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export function Heading({ title, accent, sub, center = true }: { title: string; accent?: string; sub?: string; center?: boolean }) {
  return (
    <div className={`mb-10 ${center ? "mx-auto text-center" : ""} max-w-2xl`}>
      <h2 className="text-3xl font-bold leading-tight md:text-4xl">
        {title} {accent && <span className="grad-text">{accent}</span>}
      </h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-slate-300">{sub}</p>}
    </div>
  );
}

type BtnProps = { href: string; children: ReactNode; variant?: "primary" | "outline" | "light"; external?: boolean; className?: string };

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: BtnProps) {
  const styles = {
    primary: "bg-crimson text-white hover:bg-crimson-dark",
    outline: "border border-white/40 text-white hover:bg-white/10",
    light: "bg-white text-brand hover:bg-slate-100",
  }[variant];
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${styles} ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  ) : (
    <Link href={href} className={cls}>{children}</Link>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-ink-card/70 p-6 ${className}`}>{children}</div>;
}

export function PageHero({ title, accent, sub }: { title: string; accent: string; sub: string }) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-brand via-[#052a68] to-ink pb-16 pt-32 md:pb-20 md:pt-40">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-glow/30 blur-3xl" />
      <Container className="relative">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          {title} <span className="grad-text">{accent}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200">{sub}</p>
      </Container>
    </header>
  );
}

export function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-light/60 to-ink-soft p-4 text-center text-xs text-slate-300 ${className}`}>
      {label}
    </div>
  );
}

export function FinalCta() {
  return (
    <Section>
      <div className="rounded-3xl bg-gradient-to-br from-brand via-brand-light to-[#0b2a73] p-8 text-center md:p-14">
        <p className="text-sm text-sky-200">지금 시작하자</p>
        <h2 className="mx-auto mt-2 max-w-2xl text-3xl font-bold md:text-4xl">Belajar mandiri di Korea. Menuju karir profesional &amp; bisnis global.</h2>
        <p className="mx-auto mt-4 max-w-xl text-slate-200">
          Mulai dari asesmen gratis. Kami cek kesiapan bahasa, jurusan yang cocok, dan rencana biayamu, sebelum kamu memutuskan apa pun.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/cek-kelayakan">Daftar Asesmen Spring 2027</ButtonLink>
          <ButtonLink href={waLink()} external variant="outline">Tanya Admin via WhatsApp</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
