"use client";

import { useState } from "react";
import { scholarships, type Scholarship } from "@/lib/admin-data";
import { Button, Card, DataTable, Input, Modal, SectionHeader } from "@/components/admin/AdminUI";

const columns = [
  { key: "skor", header: "Skor Bahasa Inggris" },
  { key: "alt", header: "Alternatif" },
  { key: "pct", header: "Beasiswa (%)" },
  { key: "aksi", header: "Aksi", className: "text-right" },
];

export default function BeasiswaPage() {
  const [items, setItems] = useState<Scholarship[]>(scholarships);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Scholarship | null>(null);
  const [form, setForm] = useState({ skor: "", alt: "", pct: "" });

  const startAdd = () => {
    setEditing(null);
    setForm({ skor: "", alt: "", pct: "" });
    setOpen(true);
  };
  const startEdit = (item: Scholarship) => {
    setEditing(item);
    setForm({ skor: item.skor, alt: item.alt, pct: item.pct });
    setOpen(true);
  };
  const save = () => {
    if (editing) {
      setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...form } : it)));
    } else {
      setItems((prev) => [...prev, { id: `S-${String(prev.length + 1).padStart(3, "0")}`, ...form }]);
    }
    setOpen(false);
  };
  const remove = (id: string) => {
    if (confirm("Hapus aturan beasiswa ini?")) setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const data = items.map((s) => ({
    ...s,
    aksi: (
      <div className="flex items-center justify-end gap-1.5">
        <Button size="sm" variant="ghost" onClick={() => startEdit(s)}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700" onClick={() => remove(s.id)}>
          Hapus
        </Button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Beasiswa"
        desc="Atur tabel skema beasiswa berdasarkan skor bahasa Inggris."
        actions={<Button onClick={startAdd}>Tambah Aturan</Button>}
      />
      <Card>
        <div className="-mx-4 overflow-x-auto md:-mx-6">
          <div className="min-w-[700px] px-4 md:px-6">
            <DataTable columns={columns} data={data as any} />
          </div>
        </div>
      </Card>
      <Modal
        open={open}
        title={editing ? "Edit Aturan Beasiswa" : "Tambah Aturan Beasiswa"}
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
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Skor" value={form.skor} onChange={(e) => setForm((f) => ({ ...f, skor: e.target.value }))} placeholder="IELTS 6.5+" required />
          <Input label="Alternatif" value={form.alt} onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))} placeholder="atau TOEFL iBT 81+" required />
          <Input label="Persentase (%)" value={form.pct} onChange={(e) => setForm((f) => ({ ...f, pct: e.target.value }))} placeholder="100%" required />
        </div>
      </Modal>
    </div>
  );
}
