"use client";

import { useEffect, useState } from "react";
import { updateAccount } from "@/lib/api";
import { getStoredUser, getToken, setSession } from "@/lib/auth";
import { siteSettings, type SiteSetting } from "@/lib/admin-data";
import { Button, Card, Input, SectionHeader } from "@/components/admin/AdminUI";

function AccountCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword && newPassword.length < 8) {
      setError("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      const updated = await updateAccount({
        name: name.trim(),
        email: email.trim(),
        ...(newPassword
          ? {
              current_password: currentPassword,
              password: newPassword,
              password_confirmation: confirmPassword,
            }
          : {}),
      });

      const token = getToken();
      if (token) setSession(token, updated);

      setSuccess("Akun admin berhasil diperbarui.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan akun.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Akun Admin</h2>
        <p className="mt-1 text-sm text-foreground/70">Perbarui nama, email, atau kata sandi akun yang sedang login.</p>
      </div>

      <form onSubmit={submit} className="flex flex-col gap-5" noValidate>
        <div className="grid gap-5 md:grid-cols-2">
          <Input label="Nama" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="rounded-sm border border-line/10 bg-card-soft/40 p-4">
          <p className="text-sm font-medium">Ganti kata sandi</p>
          <p className="mt-1 text-xs text-foreground/60">Kosongkan bila tidak ingin mengubah kata sandi.</p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            <Input
              label="Kata sandi saat ini"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              label="Kata sandi baru"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Konfirmasi kata sandi"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-sm border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-300">
            {error}
          </p>
        )}
        {success && (
          <p role="status" className="rounded-sm border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-300">
            {success}
          </p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Menyimpan..." : "Simpan Akun"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

function SitePreferencesCard() {
  const [settings, setSettings] = useState<SiteSetting[]>(siteSettings);
  const [saved, setSaved] = useState(false);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, value } : s)));
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Preferensi Situs</h2>
        <p className="mt-1 text-sm text-foreground/70">Konfigurasi dasar situs dan kontak.</p>
      </div>
      {settings.map((s) => (
        <Input
          key={s.key}
          label={s.label}
          type={s.type === "number" ? "number" : "text"}
          value={s.value}
          onChange={(e) => handleChange(s.key, e.target.value)}
        />
      ))}
      {saved && <p className="text-sm text-emerald-600 dark:text-emerald-400">Pengaturan berhasil disimpan (UI saja).</p>}
      <div className="flex justify-end">
        <Button variant="outline" onClick={save}>
          Simpan Preferensi
        </Button>
      </div>
    </Card>
  );
}

export default function PengaturanPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Pengaturan" desc="Kelola akun admin dan konfigurasi dasar situs." />
      <AccountCard />
      <SitePreferencesCard />
    </div>
  );
}
