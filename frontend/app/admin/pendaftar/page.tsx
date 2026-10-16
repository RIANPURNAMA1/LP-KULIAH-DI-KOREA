"use client";

import { useState, type ReactNode } from "react";
import type { RegistrationStatus } from "@/lib/admin-data";
import type { Assessment } from "@/lib/api";
import { createAssessment, deleteAssessment, updateAssessment } from "@/lib/api";
import { useAssessments } from "@/lib/use-assessments";
import { SECTIONS, answerLabel } from "@/lib/pendaftaran";
import { Badge, Button, Card, DataTable, Input, Modal, Pagination, SectionHeader, Select } from "@/components/admin/AdminUI";

const columns = [
  { key: "id", header: "ID", className: "whitespace-nowrap" },
  { key: "nama", header: "Nama" },
  { key: "whatsapp", header: "WhatsApp" },
  { key: "jurusan", header: "Jurusan" },
  { key: "bahasa", header: "Skor Bahasa" },
  { key: "tanggal", header: "Tanggal" },
  { key: "status", header: "Status" },
  { key: "aksi", header: "Aksi", className: "text-right" },
];

const statusOptions: RegistrationStatus[] = ["baru", "di-hubungi", "diterima", "ditolak"];

const PAGE_SIZE = 5;

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{value}</dd>
    </div>
  );
}

export default function PendaftarPage() {
  const { items, setItems, loading, error, reload } = useAssessments();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"semua" | RegistrationStatus>("semua");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Assessment | null>(null);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Assessment | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    nama: "",
    whatsapp: "",
    jurusan: "Global Hospitality Management",
    bahasa: "",
    status: "baru" as RegistrationStatus,
  });

  const filtered = items.filter((item) => {
    const matchSearch = [item.nama, item.whatsapp, item.jurusan].some((s) => s.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filter === "semua" || item.status === filter;
    return matchSearch && matchStatus;
  });

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const startAdd = () => {
    setEditing(null);
    setFormError("");
    setForm({ nama: "", whatsapp: "", jurusan: "Global Hospitality Management", bahasa: "", status: "baru" });
    setOpen(true);
  };

  const startEdit = (item: Assessment) => {
    setEditing(item);
    setFormError("");
    setForm({ nama: item.nama, whatsapp: item.whatsapp, jurusan: item.jurusan, bahasa: item.bahasa || "", status: item.status });
    setOpen(true);
  };

  const save = async () => {
    if (!form.nama || !form.whatsapp) return;
    setSaving(true);
    setFormError("");
    try {
      if (editing) {
        const updated = await updateAssessment(editing.id, {
          nama: form.nama,
          whatsapp: form.whatsapp,
          jurusan: form.jurusan,
          bahasa: form.bahasa || null,
          status: form.status,
        });
        setItems((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
      } else {
        const created = await createAssessment({
          nama: form.nama,
          whatsapp: form.whatsapp,
          jurusan: form.jurusan,
          bahasa: form.bahasa || null,
          sumber: "langsung",
        });
        setItems((prev) => [created, ...prev]);
      }
      setOpen(false);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm("Hapus pendaftar ini?")) return;
    try {
      await deleteAssessment(id);
      setItems((prev) => prev.filter((it) => it.id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Gagal menghapus data.");
    }
  };

  const statusVariant = (s: RegistrationStatus): "info" | "warning" | "success" | "danger" => {
    if (s === "baru") return "info";
    if (s === "di-hubungi") return "warning";
    if (s === "diterima") return "success";
    if (s === "ditolak") return "danger";
    return "info";
  };

  const data = paged.map((r) => ({
    ...r,
    id: r.kode,
    tanggal: r.created_at ? r.created_at.slice(0, 10) : "-",
    bahasa: r.bahasa || "-",
    whatsapp: (
      <a href={`https://wa.me/${r.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
        {r.whatsapp}
      </a>
    ),
    status: <Badge variant={statusVariant(r.status)}>{r.status}</Badge>,
    aksi: (
      <div className="flex items-center justify-end gap-1.5">
        <Button size="sm" variant="ghost" onClick={() => setDetail(r)}>
          Detail
        </Button>
        <Button size="sm" variant="ghost" onClick={() => startEdit(r)}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700" onClick={() => remove(r.id)}>
          Hapus
        </Button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Data Pendaftar"
        desc="Kelola data pendaftar dari formulir pendaftaran dan input manual."
        actions={
          <>
            <Button variant="outline" onClick={reload} disabled={loading}>
              {loading ? "Memuat..." : "Muat ulang"}
            </Button>
            <Button onClick={startAdd}>Tambah Pendaftar</Button>
          </>
        }
      />
      <Card>
        <div className="mb-5 grid gap-3 md:grid-cols-[2fr_1fr]">
          <Input
            placeholder="Cari nama, WhatsApp, atau jurusan..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as any);
              setPage(1);
            }}
          >
            <option value="semua">Semua Status</option>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
        {loading ? (
          <p className="py-10 text-center text-sm text-foreground/60">Memuat data...</p>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
            <Button variant="outline" className="mt-4" onClick={reload}>
              Coba lagi
            </Button>
          </div>
        ) : (
          <>
            <div className="-mx-4 overflow-x-auto md:-mx-6">
              <div className="min-w-[1100px] px-4 md:px-6">
                <DataTable columns={columns} data={data as any} />
              </div>
            </div>
            <Pagination
              page={currentPage}
              pageCount={pageCount}
              total={filtered.length}
              pageSize={PAGE_SIZE}
              onPageChange={setPage}
            />
          </>
        )}
      </Card>
      <Modal
        open={open}
        title={editing ? "Edit Pendaftar" : "Tambah Pendaftar"}
        onClose={() => setOpen(false)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)} disabled={saving}>
              Batal
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Simpan"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Nama lengkap" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} required />
          <Input label="Nomor WhatsApp" value={form.whatsapp} onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))} required />
          <Select label="Jurusan" value={form.jurusan} onChange={(e) => setForm((f) => ({ ...f, jurusan: e.target.value }))}>
            <option>Global Hospitality Management</option>
            <option>Intelligent Computing</option>
          </Select>
          <Input label="Skor IELTS/TOEFL (opsional)" value={form.bahasa} onChange={(e) => setForm((f) => ({ ...f, bahasa: e.target.value }))} placeholder="Contoh: IELTS 6.0" />
          <Select label="Status" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as RegistrationStatus }))}>
            {statusOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>
        {formError && <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">{formError}</p>}
      </Modal>

      <Modal
        open={Boolean(detail)}
        title="Detail Pendaftar"
        onClose={() => setDetail(null)}
        actions={
          <Button variant="outline" onClick={() => setDetail(null)}>
            Tutup
          </Button>
        }
      >
        {detail && (
          <div className="space-y-6">
            <dl className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Kode" value={detail.kode} />
              <DetailItem label="Status" value={<Badge variant={statusVariant(detail.status)}>{detail.status}</Badge>} />
              <DetailItem label="Nama lengkap" value={detail.nama} />
              <DetailItem
                label="WhatsApp"
                value={
                  <a
                    href={`https://wa.me/${detail.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    {detail.whatsapp}
                  </a>
                }
              />
              <DetailItem label="Jurusan diminati" value={detail.jurusan} />
              <DetailItem label="Skor bahasa" value={detail.bahasa || "-"} />
              <DetailItem
                label="Sumber"
                value={detail.sumber === "web-pendaftaran" ? "Formulir Pendaftaran" : "Input manual"}
              />
              <DetailItem label="Tanggal daftar" value={detail.created_at ? detail.created_at.slice(0, 10) : "-"} />
            </dl>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground/60">Data Pendaftaran</h4>
              {detail.answers ? (
                SECTIONS.map((section) => (
                  <div key={section.id} className="rounded-sm border border-line/10 bg-card-soft/50 p-3">
                    <p className="text-sm font-semibold text-foreground">
                      {section.code}. {section.title}
                    </p>
                    <dl className="mt-2 space-y-2">
                      {section.fields
                        .filter((f) => !f.showIf || f.showIf(detail.answers ?? {}))
                        .map((f) => (
                          <div key={f.name} className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
                            <dt className="text-xs text-foreground/60">{f.label}</dt>
                            <dd className="text-sm text-foreground sm:text-right">
                              {answerLabel(f, detail.answers ?? {})}
                            </dd>
                          </div>
                        ))}
                    </dl>
                  </div>
                ))
              ) : (
                <p className="text-sm text-foreground/60">
                  Pendaftar ini tidak memiliki data formulir (input manual).
                </p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
