"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api";
import { setSession } from "@/lib/auth";
import { Button, Card } from "@/components/admin/AdminUI";
import ThemeToggle from "@/components/ThemeToggle";

const fieldBase =
  "block w-full rounded-sm border border-line/15 bg-background px-4 py-2.5 text-sm shadow-sm placeholder:text-foreground/40 focus:border-brand-glow focus:outline-none focus:ring-2 focus:ring-brand-glow/20 disabled:opacity-60 dark:border-line/30";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { token, user } = await login(email.trim(), password);
      setSession(token, user);
      router.replace(redirectTo);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal masuk. Coba lagi.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 text-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-[-10%] h-72 w-72 rounded-full bg-brand/20 blur-3xl dark:bg-brand-glow/20" />
        <div className="absolute -right-16 bottom-[-15%] h-80 w-80 rounded-full bg-crimson/15 blur-3xl" />
      </div>

      <div className="absolute right-4 top-4 z-10">
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight">Masuk</h1>
          <p className="mt-2 text-sm text-foreground/60">Panel admin Karir di Korea.</p>
        </div>

        <Card className="p-6 sm:p-7">
          <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
            <label className="block text-sm font-medium">
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="nama@email.com"
                required
                autoFocus
                className={`mt-2 ${fieldBase}`}
              />
            </label>

            <label className="block text-sm font-medium">
              Kata sandi
              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className={`${fieldBase} pr-24`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-medium text-foreground/60 transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-glow/40"
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? "Sembunyikan" : "Lihat"}
                </button>
              </div>
            </label>

            {error && (
              <p
                role="alert"
                className="rounded-sm border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-300"
              >
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Memasuki..." : "Masuk"}
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-foreground/60">
          <Link href="/" className="font-medium text-brand hover:underline dark:text-brand-glow">
            ← Kembali ke beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
