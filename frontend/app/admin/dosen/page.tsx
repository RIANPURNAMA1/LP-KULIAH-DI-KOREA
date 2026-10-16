"use client";

import { useState } from "react";
import { lecturers, type Lecturer } from "@/lib/admin-data";
import { Button, Card, DataTable, Input, Modal, SectionHeader } from "@/components/admin/AdminUI";

const columns = [
  { key: "nama", header: "Nama" },
  { key: "peran", header: "Peran" },
  { key: "phd", header: "Riwayat Ph.D." },
  { key: "aksi", header: "Aksi", className: "text-right" },
];

export default function DosenPage() {
  const [items, setItems] = useState<Lecturer[]>(lecturers);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Lecturer | null>(null);
  const [form, setForm] = useState({ nama: "", peran: "", phd: "", foto: "" });

  const startAdd = () => {
    setEditing(null);
    setForm({ nama: "", peran: "", phd: "", foto: "" });
    setOpen(true);
  };
  const startEdit = (item: Lecturer) => {
    setEditing(item);
    setForm({ nama: item.nama, peran: item.peran, phd: item.phd, foto: item.foto || "" });
    setOpen(true);
  };
  const save = () => {
    if (editing) {
      setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...form, foto: form.foto || undefined } : it)));
    } else {
      setItems((prev) => [...prev, { id: `L-${String(prev.length + 1).padStart(3, "0")}`, ...form, foto: form.foto || undefined }]);
    }
    setOpen(false);
  };
  const remove = (id: string) => {
    if (confirm("Hapus data dosen ini?")) setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const data = items.map((l) => ({
    ...l,
    aksi: (
      <div className="flex items-center justify-end gap-1.5">
        <Button size="sm" variant="ghost" onClick={() => startEdit(l)}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700" onClick={() => remove(l.id)}>
          Hapus
        </Button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Dosen"
        desc="Kelola profil dosen yang ditampilkan di halaman publik."
        actions={<Button onClick={startAdd}>Tambah Dosen</Button>}
      />
      <Card>
        <div className="-mx-4 overflow-x-auto md:-mx-6">
          <div className="min-w-[900px] px-4 md:px-6">
            <DataTable columns={columns} data={data as any} />
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        title={editing ? "Edit Dosen" : "Tambah Dosen"}
        onClose={() => setOpen(false)}
        actions={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Batal
            </Button>
            <Button onClick={save}>{editing ? "Simpan Perubahan" : "Simpan"}</Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input label="Nama lengkap" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} required />
          <Input label="Peran" value={form.peran} onChange={(e) => setForm((f) => ({ ...f, peran: e.target.value }))} placeholder="Asst. Prof · Intelligent Computing" required />
          <Input label="Riwayat Ph.D." value={form.phd} onChange={(e) => setForm((f) => ({ ...f, phd: e.target.value }))} placeholder="Ph.D. Pukyong National Univ." required />
          <Input label="URL Foto (opsional)" value={form.foto} onChange={(e) => setForm((f) => ({ ...f, foto: e.target.value }))} placeholder="/dosen1.jpg" />
        </div>
      </Modal>
    </div>
  );
}
