import Link from "next/link";
import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-sm border border-line/10 bg-card p-6 shadow-sm transition-colors dark:border-line/20 ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon,
  delta,
  chart,
  tone = "default",
}: {
  title: string;
  value: string | number;
  icon?: ReactNode;
  delta?: { value: string; positive?: boolean };
  chart?: ReactNode;
  tone?: "default" | "brand" | "crimson" | "success" | "warning";
}) {
  const toneCls = {
    default: "bg-card-soft/70",
    brand: "bg-brand/10 text-brand dark:bg-brand-glow/20",
    crimson: "bg-crimson/10 text-crimson",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  }[tone];

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground/70">{title}</p>
        {icon && <div className={`flex h-10 w-10 items-center justify-center rounded-full ${toneCls}`}>{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{value}</h3>
        {delta && (
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${delta.positive ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"}`}>
            {delta.value}
          </span>
        )}
      </div>
      {chart && <div className="-mt-3">{chart}</div>}
    </Card>
  );
}

export function Badge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "info" | "success" | "warning" | "danger";
}) {
  const styles = {
    default: "bg-foreground/80 text-background",
    info: "bg-blue-600 text-white",
    success: "bg-emerald-600 text-white",
    warning: "bg-amber-500 text-white",
    danger: "bg-rose-600 text-white",
  }[variant];
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles}`}>{children}</span>;
}

export function SectionHeader({
  title,
  desc,
  actions,
}: {
  title: string;
  desc?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {desc && <p className="mt-2 text-sm text-foreground/70 md:text-base">{desc}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function EmptyState({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      {desc && <p className="mt-2 max-w-md text-sm text-foreground/70">{desc}</p>}
      {action && <div className="mt-5">{action}</div>}
    </Card>
  );
}

export function Input({
  label,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  const base = "mt-2 block w-full rounded-sm border border-line/15 bg-background px-4 py-2.5 text-sm shadow-sm placeholder:text-foreground/40 focus:border-brand-glow focus:outline-none focus:ring-2 focus:ring-brand-glow/20 disabled:opacity-60 dark:border-line/30";
  return label ? (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      <input className={base} {...props} />
    </label>
  ) : (
    <input className={`${base} ${className}`} {...props} />
  );
}

export function Select({
  label,
  children,
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; children: ReactNode }) {
  const base = "mt-2 block w-full appearance-none rounded-sm border border-line/15 bg-background px-4 py-2.5 text-sm shadow-sm focus:border-brand-glow focus:outline-none focus:ring-2 focus:ring-brand-glow/20 disabled:opacity-60 dark:border-line/30";
  return label ? (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      <select className={base} {...props}>
        {children}
      </select>
    </label>
  ) : (
    <select className={`${base} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Textarea({
  label,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  const base = "mt-2 block w-full rounded-sm border border-line/15 bg-background px-4 py-2.5 text-sm shadow-sm placeholder:text-foreground/40 focus:border-brand-glow focus:outline-none focus:ring-2 focus:ring-brand-glow/20 disabled:opacity-60 dark:border-line/30";
  return label ? (
    <label className={`block text-sm font-medium ${className}`}>
      {label}
      <textarea className={base} rows={4} {...props} />
    </label>
  ) : (
    <textarea className={`${base} ${className}`} rows={4} {...props} />
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as,
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "a" | "button" | "link";
} & any) {
  const variantMap = {
    primary: "bg-crimson text-white hover:bg-crimson-dark focus:ring-crimson/40",
    outline: "border border-line/20 bg-background/80 hover:bg-card-soft focus:ring-brand-glow/30",
    ghost: "hover:bg-card-soft/80 focus:ring-brand-glow/20",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500/40",
  } as const;
  const sizeMap = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  } as const;
  const styles = variantMap[variant as keyof typeof variantMap];
  const sizes = sizeMap[size as keyof typeof sizeMap];
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 ${styles} ${sizes} ${className}`;

  if (as === "a" || (props as any).href) {
    const { href, ...rest } = props as any;
    return (
      <Link href={href || "#"} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
  actions,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center px-4 pb-6 md:items-center md:px-0 md:pb-0">
      <button
        type="button"
        aria-label="Tutup modal"
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-sm border border-line/10 bg-card shadow-xl transition-colors">
        <div className="flex items-center justify-between border-b border-line/10 px-6 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/60 transition hover:bg-card-soft hover:text-foreground"
          >
            ✕
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {actions && <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line/10 bg-card-soft/40 px-6 py-4">{actions}</div>}
      </div>
    </div>
  );
}

export function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  className = "",
}: {
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}) {
  if (total === 0) return null;

  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pageCount, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const pages: number[] = [];
  for (let i = start; i <= end; i += 1) pages.push(i);

  const navBtn = "inline-flex h-9 min-w-9 items-center justify-center rounded-md border border-line/15 px-2.5 text-sm font-medium text-foreground/70 transition hover:bg-card-soft hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className={`mt-5 flex flex-col items-center justify-between gap-3 sm:flex-row ${className}`}>
      <p className="text-sm text-foreground/60">
        Menampilkan{" "}
        <span className="font-medium text-foreground">
          {from}–{to}
        </span>{" "}
        dari <span className="font-medium text-foreground">{total}</span> data
      </p>
      <div className="flex items-center gap-1">
        <button type="button" className={navBtn} onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Sebelumnya
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-2.5 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
              p === page
                ? "border-brand bg-brand text-white"
                : "border-line/15 text-foreground/70 hover:bg-card-soft hover:text-foreground"
            }`}
          >
            {p}
          </button>
        ))}
        <button type="button" className={navBtn} onClick={() => onPageChange(page + 1)} disabled={page >= pageCount}>
          Berikutnya
        </button>
      </div>
    </div>
  );
}

export function DataTable({ columns, data }: { columns: { key: string; header: string; className?: string }[]; data: Record<string, any>[] }) {
  return (
    <div className="overflow-hidden rounded-sm border border-line/10 shadow-sm">
      <table className="min-w-full divide-y divide-line/10 bg-card">
        <thead className="bg-card-soft/70">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-foreground/70 md:px-6 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line/10 bg-card">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-foreground/60 md:px-6">
                Tidak ada data.
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="transition hover:bg-card-soft/50">
                {columns.map((col) => (
                  <td key={`${i}-${col.key}`} className={`px-4 py-3 text-sm text-foreground md:px-6 ${col.className || ""}`}>
                    {row[col.key] ?? ""}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
