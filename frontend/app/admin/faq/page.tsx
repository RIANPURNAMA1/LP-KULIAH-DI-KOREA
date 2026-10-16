"use client";

import { useState } from "react";
import { faqs, type Faq } from "@/lib/admin-data";
import { Button, Card, DataTable, Input, Modal, SectionHeader, Textarea } from "@/components/admin/AdminUI";

const columns = [
  { key: "q", header: "Pertanyaan" },
  { key: "a", header: "Jawaban" },
  { key: "aksi", header: "Aksi", className: "text-right" },
];

export default function FaqPage() {
  const [items, setItems] = useState<Faq[]>(faqs);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState({ q: "", a: "" });

  const startAdd = () => {
    setEditing(null);
    setForm({ q: "", a: "" });
    setOpen(true);
  };
  const startEdit = (item: Faq) => {
    setEditing(item);
    setForm({ q: item.q, a: item.a });
    setOpen(true);
  };
  const save = () => {
    if (editing) {
      setItems((prev) => prev.map((it) => (it.id === editing.id ? { ...it, ...form } : it)));
    } else {
      setItems((prev) => [...prev, { id: `F-${String(prev.length + 1).padStart(3, "0")}`, ...form }]);
    }
    setOpen(false);
  };
  const remove = (id: string) => {
    if (confirm("Hapus FAQ ini?")) setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const data = items.map((f) => ({
    ...f,
    a: <p className="max-w-2xl text-sm leading-relaxed text-foreground/80">{f.a}</p>,
    aksi: (
      <div className="flex items-center justify-end gap-1.5">
        <Button size="sm" variant="ghost" onClick={() => startEdit(f)}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700" onClick={() => remove(f.id)}>
          Hapus
        </Button>
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="FAQ"
        desc="Kelola pertanyaan yang sering diajukan pada halaman publik."
        actions={<Button onClick={startAdd}>Tambah FAQ</Button>}
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
        title={editing ? "Edit FAQ" : "Tambah FAQ"}
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
          <Input label="Pertanyaan" value={form.q} onChange={(e) => setForm((f) => ({ ...f, q: e.target.value }))} required />
          <Textarea label="Jawaban" value={form.a} onChange={(e) => setForm((f) => ({ ...f, a: e.target.value }))} required />
        </div>
      </Modal>
    </div>
  );
}
