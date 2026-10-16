"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { adminNav } from "@/lib/admin-data";
import { clearSession, getStoredUser, SESSION_EVENT, type AdminUser } from "@/lib/auth";
import { logout as logoutApi } from "@/lib/api";
import ThemeToggle from "@/components/ThemeToggle";

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

const iconPaths = {
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </>
  ),
  "user-circle": (
    <>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  "help-circle": (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>
  ),
  dot: <circle cx="12" cy="12" r="3" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  menu: (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </>
  ),
  close: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  "chevrons-left": (
    <>
      <polyline points="11 17 6 12 11 7" />
      <polyline points="18 17 13 12 18 7" />
    </>
  ),
  "chevron-down": <polyline points="6 9 12 15 18 9" />,
  logout: (
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>
  ),
  external: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
} as const satisfies Record<string, ReactNode>;

type IconName = keyof typeof iconPaths;

function Icon({ name, size = 18, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {iconPaths[name]}
    </svg>
  );
}

const resolveIcon = (name: string): IconName => (name in iconPaths ? (name as IconName) : "dot");

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

type NavEntry = { href: string; label: string; icon: IconName };

const navItems: NavEntry[] = adminNav.map((item) => ({
  href: item.href,
  label: item.label,
  icon: resolveIcon(String(item.icon)),
}));

const homeEntry: NavEntry = { href: "/", label: "Kembali ke beranda", icon: "external" };

const navGroupOrder: Array<{ title?: string; hrefs: string[] }> = [
  { hrefs: ["/admin"] },
  {
    title: "Kuliah di Korea",
    hrefs: ["/admin/pendaftar"],
  },
  { hrefs: ["/admin/pengaturan"] },
];

const navGroups = navGroupOrder
  .map((group) => ({
    title: group.title,
    items: group.hrefs
      .map((href) => navItems.find((item) => item.href === href))
      .filter((item): item is NavEntry => Boolean(item)),
  }))
  .filter((group) => group.items.length > 0);

// Judul halaman yang lebih lengkap dari label menu.
const pageTitles: Array<[prefix: string, title: string]> = [
  ["/admin/pendaftar", "Pendaftar Asesmen"],
  ["/admin/jurusan", "Jurusan"],
  ["/admin/beasiswa", "Beasiswa"],
  ["/admin/dosen", "Dosen"],
  ["/admin/faq", "FAQ"],
  ["/admin/pengaturan", "Pengaturan"],
];

const isActivePath = (pathname: string, href: string) =>
  href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);

/* -------------------------------------------------------------------------- */
/*  Command palette (Ctrl/⌘ + K)                                              */
/* -------------------------------------------------------------------------- */

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const results = useMemo(() => {
    const all = [...navItems, homeEntry];
    const q = query.trim().toLowerCase();
    return q ? all.filter((item) => item.label.toLowerCase().includes(q)) : all;
  }, [query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setIndex(0);
  }, [query]);

  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[index];
      if (target) go(target.href);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]">
      <button type="button" aria-label="Tutup pencarian" onClick={onClose} className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cari menu"
        className="relative w-full max-w-lg overflow-hidden rounded-md border border-line/10 bg-background shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-line/10 px-4">
          <Icon name="search" size={18} className="text-foreground/50" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Cari menu admin…"
            aria-label="Cari menu admin"
            className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
          />
        </div>

        <ul role="listbox" aria-label="Hasil pencarian" className="max-h-72 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-8 text-center text-sm text-foreground/60">Menu tidak ditemukan. Coba kata kunci lain.</li>
          ) : (
            results.map((item, i) => (
              <li key={item.href} role="option" aria-selected={i === index}>
                <button
                  type="button"
                  onClick={() => go(item.href)}
                  onMouseEnter={() => setIndex(i)}
                  className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm transition-colors ${
                    i === index ? "bg-brand text-white" : "text-foreground/80"
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span className="flex-1">{item.label}</span>
                  {i === index && <span className="text-xs text-white/70">Enter</span>}
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-line/10 bg-card-soft/60 px-4 py-2 text-xs text-foreground/50">
          <span>↑ ↓ untuk memilih</span>
          <span>Enter untuk membuka</span>
          <span className="ml-auto">Esc untuk menutup</span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Shell                                                                     */
/* -------------------------------------------------------------------------- */

type AdminShellProps = {
  children: ReactNode;
  /** Jika diisi, tombol "Keluar" muncul di menu akun. */
  onLogout?: () => void;
};

export default function AdminShell({ children, onLogout }: AdminShellProps) {
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [online, setOnline] = useState(true);
  const [modKey, setModKey] = useState("Ctrl");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  // Tutup panel yang terbuka setiap pindah halaman.
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  // Deteksi platform & muat info akun tersimpan.
  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setModKey("⌘");
    setUser(getStoredUser());
  }, []);

  // Selaraskan info akun saat sesi berubah (login / edit akun / logout).
  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    window.addEventListener(SESSION_EVENT, sync);
    return () => window.removeEventListener(SESSION_EVENT, sync);
  }, []);

  // Bayangan header saat halaman digulir.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Status koneksi yang sebenarnya.
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Pintasan keyboard: Ctrl/⌘ + K membuka pencarian, Esc menutup panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
        setUserMenuOpen(false);
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Kunci scroll body saat drawer mobile terbuka.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Klik di luar menu akun untuk menutup.
  useEffect(() => {
    if (!userMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [userMenuOpen]);

  const handleLogout = async () => {
    if (onLogout) {
      onLogout();
      return;
    }
    setLoggingOut(true);
    try {
      await logoutApi();
    } catch {
      /* token mungkin sudah tidak valid, tetap lanjut bersihkan sesi */
    } finally {
      clearSession();
      router.replace("/login");
      router.refresh();
    }
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
    : "AD";
  const displayName = user?.name ?? "Admin";
  const displayEmail = user?.email ?? "admin@karirdikorea.com";

  const pageTitle =
    pathname === "/admin"
      ? "Dashboard"
      : pageTitles.find(([prefix]) => pathname.startsWith(prefix))?.[1] ??
        navItems.find((item) => item.href !== "/admin" && isActivePath(pathname, item.href))?.label ??
        "Admin";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Lewati ke konten
      </a>

      {/* ------------------------------ Sidebar ------------------------------ */}
      <aside
        id="admin-sidebar"
        aria-label="Navigasi admin"
        className={`fixed inset-y-0 left-0 z-[55] flex w-72 flex-col border-r border-slate-200 bg-white text-slate-900 transition-transform duration-200 motion-reduce:transition-none dark:border-white/10 dark:bg-ink-soft dark:text-white lg:w-64 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-slate-200 px-4 dark:border-white/10">
          <Link href="/admin" aria-label="Dashboard Karir di Korea" className="flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand">
            <Image
              src="/LOGO2.png"
              alt="Karir di Korea"
              width={130}
              height={38}
              className="h-9 w-auto dark:hidden"
              priority
            />
            <Image
              src="/LOGO%20KARIR%20DI%20KOREA.png"
              alt="Karir di Korea"
              width={130}
              height={38}
              className="hidden h-9 w-auto dark:block dark:brightness-0 dark:invert"
              priority
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Tutup navigasi"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 outline-none transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-brand dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
          >
            <Icon name="close" />
          </button>
        </div>

        <nav aria-label="Menu utama" className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-4">
            {navGroups.map((group, gi) => (
              <div key={group.title ?? `group-${gi}`} className="flex flex-col gap-1">
                {group.title && (
                  <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/40">
                    {group.title}
                  </p>
                )}
                <ul className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={`relative flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand ${
                            active ? "bg-brand/10 text-brand dark:bg-white/15 dark:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                          }`}
                        >
                          {active && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-[3px] rounded-r bg-brand dark:bg-[#efbf38]" />}
                          <Icon name={item.icon} className="shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="shrink-0 border-t border-slate-200 p-3 dark:border-white/10">
          <Link
            href={homeEntry.href}
            className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-brand dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Icon name={homeEntry.icon} className="shrink-0" />
            <span>{homeEntry.label}</span>
          </Link>
        </div>
      </aside>

      {/* ------------------------------ Konten ------------------------------- */}
      <div className="relative min-h-screen lg:pl-64">
        <header
          className={`sticky top-0 z-50 border-b border-line/10 bg-background/85 backdrop-blur-md transition-shadow ${
            scrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="flex h-16 items-center gap-3 px-4 md:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Buka navigasi"
              aria-controls="admin-sidebar"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line/10 text-foreground/70 outline-none transition hover:bg-card-soft hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
            >
              <Icon name="menu" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-foreground/50">Panel admin</p>
              <h1 className="truncate text-lg font-semibold leading-tight md:text-xl">{pageTitle}</h1>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Cari menu"
                className="flex h-9 items-center gap-2 rounded-md border border-line/10 bg-card-soft/60 px-2.5 text-sm text-foreground/60 outline-none transition hover:bg-card-soft hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand md:w-56 md:justify-between"
              >
                <span className="flex items-center gap-2">
                  <Icon name="search" size={16} />
                  <span className="hidden md:inline">Cari menu…</span>
                </span>
                <kbd className="hidden rounded border border-line/10 bg-background px-1.5 py-0.5 text-[11px] font-medium text-foreground/50 md:inline">
                  {modKey} K
                </kbd>
              </button>

              <div
                role="status"
                className={`items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs ${
                  online
                    ? "hidden border-line/10 bg-card-soft/60 text-foreground/60 xl:flex"
                    : "flex border-amber-400/40 bg-amber-400/10 text-amber-600 dark:text-amber-300"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${online ? "bg-emerald-500" : "bg-amber-500"}`} />
                <span>{online ? "Online" : "Offline, periksa koneksi"}</span>
              </div>

              <ThemeToggle className="border-line/10 bg-transparent" />

              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                  aria-label="Menu akun"
                  className="flex items-center gap-2 rounded-md border border-line/10 bg-card-soft/60 py-1 pl-1 pr-2 outline-none transition hover:bg-card-soft focus-visible:ring-2 focus-visible:ring-brand"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">{initials}</span>
                  <span className="hidden text-left text-sm leading-tight sm:block">
                    <span className="block max-w-[10rem] truncate font-medium">{displayName}</span>
                    <span className="block max-w-[10rem] truncate text-xs text-foreground/50">{displayEmail}</span>
                  </span>
                  <Icon
                    name="chevron-down"
                    size={16}
                    className={`hidden text-foreground/50 transition-transform duration-150 motion-reduce:transition-none sm:block ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    aria-label="Menu akun"
                    className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-md border border-line/10 bg-background shadow-xl"
                  >
                    <div className="border-b border-line/10 px-4 py-3">
                      <p className="truncate text-sm font-medium">{displayName}</p>
                      <p className="truncate text-xs text-foreground/50">{displayEmail}</p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        href="/admin/pengaturan"
                        role="menuitem"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-card-soft hover:text-foreground"
                      >
                        <Icon name="settings" size={16} />
                        Pengaturan
                      </Link>
                      <Link
                        href="/"
                        role="menuitem"
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground/80 transition hover:bg-card-soft hover:text-foreground"
                      >
                        <Icon name="external" size={16} />
                        Buka situs
                      </Link>
                      <div className="my-1.5 border-t border-line/10" />
                      <button
                        type="button"
                        role="menuitem"
                        disabled={loggingOut}
                        onClick={() => {
                          setUserMenuOpen(false);
                          void handleLogout();
                        }}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-[#c60e31] transition hover:bg-[#c60e31]/10 disabled:opacity-60"
                      >
                        <Icon name="logout" size={16} />
                        {loggingOut ? "Keluar…" : "Keluar"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main id="main-content" className="mx-auto w-full max-w-[90rem] px-4 py-6 md:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {/* Latar belakang drawer mobile */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup navigasi"
          className="fixed inset-0 z-[54] bg-ink/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}