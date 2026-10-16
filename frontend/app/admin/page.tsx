"use client";

import { useMemo } from "react";
import { Badge, Button, Card, DataTable, SectionHeader, StatCard } from "@/components/admin/AdminUI";
import { MajorBars, Sparkline, StatusDonut, TrendAreaChart } from "@/components/admin/AdminCharts";
import type { RegistrationStatus } from "@/lib/admin-data";
import type { Assessment } from "@/lib/api";
import { useAssessments } from "@/lib/use-assessments";

const statusVariant = (s: RegistrationStatus): "info" | "warning" | "success" | "danger" => {
  if (s === "baru") return "info";
  if (s === "di-hubungi") return "warning";
  if (s === "diterima") return "success";
  if (s === "ditolak") return "danger";
  return "info";
};

const STATUS_META: { key: RegistrationStatus; label: string; color: string }[] = [
  { key: "baru", label: "Baru", color: "#2f6bff" },
  { key: "di-hubungi", label: "Di-hubungi", color: "#f59e0b" },
  { key: "diterima", label: "Diterima", color: "#10b981" },
  { key: "ditolak", label: "Ditolak", color: "#c60e31" },
];

const recentColumns = [
  { key: "id", header: "ID" },
  { key: "nama", header: "Nama" },
  { key: "whatsapp", header: "WhatsApp" },
  { key: "jurusan", header: "Jurusan" },
  { key: "bahasa", header: "Skor Bahasa" },
  { key: "tanggal", header: "Tanggal Daftar" },
  { key: "status", header: "Status" },
];

function buildTrend(items: Assessment[], days = 14) {
  const today = new Date();
  const buckets: { iso: string; label: string }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    buckets.push({ iso: d.toISOString().slice(0, 10), label: `${d.getDate()}/${d.getMonth() + 1}` });
  }

  const countBy = (pred: (it: Assessment) => boolean) =>
    buckets.map(
      (b) => items.filter((it) => (it.created_at || "").slice(0, 10) === b.iso && pred(it)).length,
    );

  return {
    labels: buckets.map((b) => b.label),
    total: countBy(() => true),
    baru: countBy((it) => it.status === "baru"),
    diterima: countBy((it) => it.status === "diterima"),
    followUp: countBy((it) => it.status === "di-hubungi"),
  };
}

export default function AdminDashboard() {
  const { items, loading, refreshing, error, updatedAt, reload } = useAssessments({ pollMs: 15000 });

  const statusData = useMemo(
    () =>
      STATUS_META.map((m) => ({
        label: m.label,
        color: m.color,
        value: items.filter((i) => i.status === m.key).length,
      })),
    [items],
  );

  const majorData = useMemo(() => {
    const map = new Map<string, number>();
    items.forEach((i) => map.set(i.jurusan, (map.get(i.jurusan) ?? 0) + 1));
    return Array.from(map.entries())
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [items]);

  const trendSeries = useMemo(() => buildTrend(items), [items]);
  const trendData = useMemo(
    () => trendSeries.labels.map((label, i) => ({ label, value: trendSeries.total[i] })),
    [trendSeries],
  );

  const formatDate = (iso: string) => (iso ? iso.slice(0, 10) : "-");

  const summary = [
    {
      title: "Total Pendaftar",
      value: items.length,
      delta: { value: "total masuk", positive: true },
      chart: <Sparkline data={trendSeries.total} color="#2f6bff" />,
    },
    {
      title: "Pendaftar Baru",
      value: items.filter((i) => i.status === "baru").length,
      delta: { value: "belum di-hubungi", positive: true },
      chart: <Sparkline data={trendSeries.baru} color="#1550b8" />,
    },
    {
      title: "Diterima",
      value: items.filter((i) => i.status === "diterima").length,
      delta: { value: "status diterima", positive: true },
      chart: <Sparkline data={trendSeries.diterima} color="#10b981" />,
    },
    {
      title: "Perlu Follow-up",
      value: items.filter((i) => i.status === "di-hubungi").length,
      delta: { value: "menunggu aksi", positive: false },
      chart: <Sparkline data={trendSeries.followUp} color="#f59e0b" />,
    },
  ];

  const recentData = items.slice(0, 5).map((r) => ({
    id: r.kode,
    nama: r.nama,
    bahasa: r.bahasa || "-",
    jurusan: r.jurusan,
    tanggal: formatDate(r.created_at),
    whatsapp: (
      <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
        {r.whatsapp}
      </a>
    ),
    status: <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Ringkasan"
        desc="Pantau perkembangan pendaftaran Spring 2027 secara ringkas."
        actions={
          <>
            <span className="flex items-center gap-2 text-xs text-foreground/60">
              <span className={`h-2 w-2 rounded-full ${refreshing ? "animate-pulse bg-amber-500" : "bg-emerald-500"}`} />
              {refreshing
                ? "Memperbarui data..."
                : updatedAt
                  ? `Live · diperbarui ${updatedAt.toLocaleTimeString("id-ID")}`
                  : "Menghubungkan..."}
            </span>
            <Button variant="outline" onClick={reload} disabled={loading || refreshing}>
              {loading || refreshing ? "Memuat..." : "Muat ulang"}
            </Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} delta={item.delta} chart={item.chart} />
        ))}
      </div>

      {loading ? (
        <Card>
          <p className="py-16 text-center text-sm text-foreground/60">Memuat grafik...</p>
        </Card>
      ) : error ? (
        <Card>
          <p className="py-16 text-center text-sm text-rose-600 dark:text-rose-400">{error}</p>
        </Card>
      ) : (
        <>
          <Card>
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Tren Pendaftaran</h2>
                <p className="text-sm text-foreground/70">Jumlah pendaftar 14 hari terakhir.</p>
              </div>
              <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand dark:bg-brand-glow/20 dark:text-brand-glow">
                14 hari
              </span>
            </div>
            <TrendAreaChart data={trendData} />
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Distribusi Status</h2>
                <p className="text-sm text-foreground/70">Sebaran status seluruh pendaftar.</p>
              </div>
              <StatusDonut data={statusData} />
            </Card>

            <Card>
              <div className="mb-5">
                <h2 className="text-lg font-semibold">Pendaftar per Jurusan</h2>
                <p className="text-sm text-foreground/70">Minat jurusan pendaftar.</p>
              </div>
              {majorData.length === 0 ? (
                <p className="py-10 text-center text-sm text-foreground/60">Belum ada data.</p>
              ) : (
                <MajorBars data={majorData} colors={["#033378", "#c60e31", "#2f6bff", "#f59e0b"]} />
              )}
            </Card>
          </div>
        </>
      )}

      <Card>
        <div className="mb-4 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-lg font-semibold">Pendaftar Terbaru</h2>
            <p className="text-sm text-foreground/70">5 entri terakhir dari formulir pendaftaran.</p>
          </div>
        </div>
        {loading ? (
          <p className="py-10 text-center text-sm text-foreground/60">Memuat data...</p>
        ) : error ? (
          <p className="py-10 text-center text-sm text-rose-600 dark:text-rose-400">{error}</p>
        ) : (
          <div className="-mx-4 overflow-x-auto md:-mx-6">
            <div className="min-w-[920px] px-4 md:px-6">
              <DataTable columns={recentColumns} data={recentData as any} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
