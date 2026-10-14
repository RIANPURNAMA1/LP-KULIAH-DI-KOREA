# Karir di Korea — Landing Page (Dong-eui University Spring 2027)

Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Jalankan
```bash
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_WA_NUMBER + NEXT_PUBLIC_SITE_URL
npm run dev
```
Buka http://localhost:3000

## Halaman
/ · /program · /beasiswa · /kerja · /biaya · /faq · /cek-kelayakan

## Catatan
- Warna brand: #033378 (biru), #c60e31 (merah). Edit di `tailwind.config.ts`.
- Semua teks ada di `lib/content.ts`.
- Foto masih placeholder (`PhotoPlaceholder`); ganti dengan `next/image` setelah aset tersedia.


<!-- biaya jngn di tampilkan -->