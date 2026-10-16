"use client";

import { useState } from "react";
import { majors, type Major } from "@/lib/admin-data";
import { Badge, Button, Card, DataTable, Input, Modal, SectionHeader, Textarea } from "@/components/admin/AdminUI";

const columns = [
  { key: "no", header: "No", className: "whitespace-nowrap" },
  { key: "nama", header: "Nama Jurusan" },
  { key: "deskripsi", header: "Deskripsi" },
  { key: "tags", header: "Tags" },
  { key: "aksi", header: "Aksi", className: "text-right" },
];

export default function JurusanPage() {
  const [items, setItems] = useState<Major[]>(majors);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Major | null>(null);
  const [form, setForm] = useState({ no: "", nama: "", deskripsi: "", tags: "" });

  const startAdd = () => {
    setEditing(null);
    setForm({ no: "Jurusan XX", nama: "", deskripsi: "", tags: "" });
    setOpen(true);
  };

  const startEdit = (item: Major) => {
    setEditing(item);
    setForm({ no: item.no, nama: item.nama, deskripsi: item.deskripsi, tags: item.tags.join(", ") });
    setOpen(true);
  };

  const save = () => {
    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    if (editing) {
      setItems((prev) =>
        prev.map((it) => (it.id === editing.id ? { ...it, no: form.no, nama: form.nama, deskripsi: form.deskripsi, tags } : it))
      );
    } else {
      const newItem: Major = {
        id: `M-${String(items.length + 1).padStart(3, "0")}`,
        no: form.no,
        nama: form.nama,
        deskripsi: form.deskripsi,
        tags,
      };
      setItems((prev) => [newItem, ...prev]);
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    if (confirm("Hapus jurusan ini?")) setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const data = items.map((m) => ({
    ...m,
    tags: (
      <div className="flex flex-wrap gap-1.5">
        {m.tags.map((t) => (
          <Badge key={t} variant="default">
            {t}
          </Badge>
        ))}
      </div>
    ),
    aksi: (
      <div className="flex items-center justify-end gap-1.5">
        <Button size="sm" variant="ghost" onClick={() => startEdit(m)}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700" onClick={() => remove(m.id)}>
          Hapus
        </Button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Jurusan"
        desc="Kelola daftar program studi yang ditawarkan."
        actions={<Button onClick={startAdd}>Tambah Jurusan</Button>}
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
        title={editing ? "Edit Jurusan" : "Tambah Jurusan"}
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
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Kode/No Jurusan" value={form.no} onChange={(e) => setForm((f) => ({ ...f, no: e.target.value }))} required />
            <Input label="Nama Jurusan" value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} required />
          </div>
          <Textarea label="Deskripsi" value={form.deskripsi} onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))} required />
          <Input label="Tags (pisahkan dengan koma)" value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} placeholder="Contoh: Hotel & resort, F&B, Travel" />
        </div>
      </Modal>
    </div>
  );
}
