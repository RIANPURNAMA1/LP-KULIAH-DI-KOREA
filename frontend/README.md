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



<!-- seo -->
SEO teknis sudah benar (robots index/follow, sitemap, canonical, server-rendered, metadata lengkap).
Penyebab utama: domain baru (baru deploy, sitemap lastmod hari ini) & belum terindeks Google.
Belum ada di Google Search Console / sitemap belum disubmit.
Tidak ada backlink.
Steps:
1. Daftar/verifikasi di Google Search Console.
2. Submit sitemap.
3. Request indexing homepage.
4. Tunggu beberapa hari–minggu.
5. Bangun backlink.
6. Cek site:kuliahdikorea.com di Google untuk lihat status indexing.
I can also offer to add verification meta tag / google verification file if they want.
Let me write.</think>SEO teknisnya sudah benar. Aku cek langsung situs live-nya:
robots.txt → Allow: / + sitemap terdaftar ✓
sitemap.xml → semua 7 halaman ada ✓
Homepage: <meta name="robots" content="index, follow">, <title>, canonical, og:title, <h1> — semuanya ter-render di server (bukan kosong) ✓
Tidak ada noindex di mana pun ✓
Artinya masalahnya bukan di kode SEO, tapi di weindex Google.
Penyebab kenapa "kuliahdikorea" tidak muncul:
1. Domain masih terlalu baru. Sitemap lastmod-nya 2026-10-16 (baru deploy). Google butuh waktu meng-crawl + meng-index domain baru — biasanyabeberapa hari sampai beberapa minggu. Pencarian site:kuliahdikorea.com juga tidak menemukan satu pun halaman = belum terindeks sama sekali.
2. Belum didaftarkan di Google Search Console, jadi Google belum "dititipi" URL/sitemap-nya.
3. Belum ada backlink (domain baru, otoritas rendah), jadi Google malas meng-crawl.
Yang harus dilakukan (bukan ubah kode):
1. Buka Google Search Console → tambah properti kuliahdikorea.com → verifikasi (rekam DNS TXT atau upload file HTML).
2. Di Search Console → Sitemaps → submit sitemap.xml.
3. URL Inspection → tempel https://kuliahdikorea.com/ → Request Indexing (ulangi untuk halaman penting: /program, /beasiswa, /pendaftaran).
4. Tunggu beberapa hari–minggu.
5. Bangun backlink: link dari Instagram/TikTok bio, Google Business Profile, YouTube, dsb.
6. Cek berkala di Google: site:kuliahdikorea.com — kalau sudah keluar, berarti sudah terindeks.
Catatan: Host: di robots.txt itu abaikan saja — Google tidak memakainya (itu untuk Yandex), tidak merusak.
Mau aku siapkan tag verifikasi Search Console (meta google-site-verification) atau file google<...>.html di frontend/app supaya tinggal deploy? Beri tahu kode verifikasinya.