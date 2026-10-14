# Deployment ke VPS — kuliahdikorea.com

Panduan hosting **tanpa Docker** untuk aplikasi Next.js 14 ini (Node.js + PM2 + Nginx + Let's Encrypt).

- Domain: `kuliahdikorea.com` (+ `www.kuliahdikorea.com`)
- App: Next.js 14 (App Router), jalankan sebagai Node server (`next start`) di port `3000`
- Tidak butuh database. Variabel `DB_*` di `.env.example` tidak dipakai aplikasi.
- Satu-satunya env yang dipakai: `NEXT_PUBLIC_WA_NUMBER` (di-inline saat **build**).

> Target OS: Ubuntu 22.04 / 24.04 LTS. Perintah di bawah pakai `sudo` pada bagian sistem.

---

## 0. Ringkasan arsitektur

```
Internet → Nginx (443/80) → PM2 → next start (127.0.0.1:3000)
```

VPS minimal: **1 vCPU / 1 GB RAM / 20 GB SSD** (2 GB RAM lebih nyaman saat build).

---

## 1. Persiapan awal VPS

Login sebagai root lalu buat user deploy & amankan.

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git build-essential nginx ufw

# Buat user deploy
sudo adduser deploy
sudo usermod -aG sudo deploy

# Login sebagai deploy untuk langkah berikutnya
su - deploy
```

Set timezone (opsional):

```bash
sudo timedatectl set-timezone Asia/Jakarta
```

---

## 2. Install Node.js 20 LTS (via nvm)

Jalankan sebagai user `deploy`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm alias default 20
node -v    # harus v20.x
npm -v
```

---

## 3. Install PM2 (process manager)

```bash
npm install -g pm2
pm2 -v
```

---

## 4. Ambil kode & build

Kode disimpan di `/home/deploy/kuliahdikorea` (bisa juga `git clone` dari repo).

```bash
mkdir -p ~/kuliahdikorea
# Opsi A: clone dari Git
git clone <URL_REPO_ANDA> ~/kuliahdikorea
# Opsi B: upload manual dari lokal (contoh dari komputer lokal, bukan di VPS)
#   scp -r ./karir-di-korea-landing deploy@IP_VPS:~/kuliahdikorea

cd ~/kuliahdikorea
```

Buat file environment produksi. **Nilai `NEXT_PUBLIC_*` di-baca saat build**, jadi harus ada sebelum `npm run build`.

```bash
cat > .env.production <<'EOF'
NEXT_PUBLIC_WA_NUMBER=62895391685825
EOF
```

Install dependency, lalu build:

```bash
npm ci
# sharp dipakai Next untuk optimasi gambar di produksi (disarankan)
npm install sharp
npm run build
```

Uji dulu jalan normal:

```bash
npm start
# buka di browser: http://IP_VPS:3000  → pastikan tampil
# hentikan dengan Ctrl+C
```

---

## 5. Jalankan permanen dengan PM2

Buat file konfigurasi:

```bash
nano ecosystem.config.js
```

Isi:

```js
module.exports = {
  apps: [
    {
      name: "kuliahdikorea",
      cwd: "/home/deploy/kuliahdikorea",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
      max_memory_restart: "512M",
    },
  ],
};
```

> `-H 127.0.0.1` membuat app hanya bisa diakses lewat Nginx (lebih aman).

Jalankan & simpan agar auto-start saat reboot:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
# Jalankan perintah `sudo env ...` yang dicetak PM2, lalu:
pm2 save
```

Cek status & log:

```bash
pm2 status
pm2 logs kuliahdikorea
```

---

## 6. Konfigurasi Nginx reverse proxy

Buat file site:


```bash
sudo nano /etc/nginx/sites-available/kuliahdikorea.com
```

Isi:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name kuliahdikorea.com www.kuliahdikorea.com;

    # Ukuran upload (tidak wajib, aman untuk form/aset)
    client_max_body_size 10M;

    # Gzip
    gzip on;
    gzip_comp_level 5;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript
               application/x-javascript text/xml application/xml image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }

    # Cache aset statis Next.js (immutable)
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

Aktifkan & reload:

```bash
sudo ln -s /etc/nginx/sites-available/kuliahdikorea.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # opsional, matikan default
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. SSL gratis (Let's Encrypt / Certbot)

Pastikan DNS sudah mengarah ke IP VPS (lihat langkah 9) sebelum menjalankan ini.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kuliahdikorea.com -d www.kuliahdikorea.com
```

Certbot akan mengubah konfig Nginx untuk HTTPS + redirect HTTP→HTTPS, dan memasang auto-renew.
Uji auto-renew:

```bash
sudo certbot renew --dry-run
```

---

## 8. Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Port `3000` **tidak** dibuka ke publik (hanya diakses Nginx lokal).

---

## 9. DNS

Di panel registrar/DNS domain `kuliahdikorea.com`, buat:

| Type | Name | Value       | TTL  |
|------|------|-------------|------|
| A    | @    | IP_VPS      | 3600 |
| A    | www  | IP_VPS      | 3600 |

Tunggu propagasi (beberapa menit–24 jam). Cek:

```bash
dig +short kuliahdikorea.com
dig +short www.kuliahdikorea.com
```

---

## 10. Update / deploy ulang

Setiap ada perubahan kode:

```bash
cd ~/kuliahdikorea
git pull
npm ci
# jika NEXT_PUBLIC_* berubah, edit .env.production dulu
npm run build
pm2 reload kuliahdikorea
```

> Env `NEXT_PUBLIC_*` hanya berubah kalau di-`build` ulang. Selalu `npm run build` sebelum `pm2 reload`.

Buat script cepat (opsional) `~/deploy.sh`:

```bash
#!/usr/bin/env bash
set -e
cd ~/kuliahdikorea
git pull
npm ci
npm run build
pm2 reload kuliahdikorea
echo "Deploy selesai."
```

---

## 11. Troubleshooting

- **Halaman 502 / tidak jalan** → cek `pm2 status` & `pm2 logs kuliahdikorea`; pastikan app listen di `127.0.0.1:3000`.
- **Perubahan env tidak muncul** → lupakan build ulang; jalankan `npm run build` lalu `pm2 reload`.
- **Aset CSS/JS 404** → hapus `.next` lalu build ulang: `rm -rf .next && npm run build`.
- **Gambar blur/lambat** → pastikan `sharp` terpasang (`npm install sharp`) lalu build ulang.
- **Error `Cannot find module './65.js'`** → `.next` korup (biasanya karena build saat `next dev` jalan). `rm -rf .next && npm run build`.
- **SSL gagal** → pastikan DNS sudah benar dan port 80 terbuka (`sudo ufw status`).
- **Cek port dipakai siapa** → `ss -tlnp | grep 3000`.

---

## 12. Checklist go-live

- [ ] Node 20 terpasang, `sharp` terpasang
- [ ] `.env.production` berisi `NEXT_PUBLIC_WA_NUMBER`
- [ ] `npm run build` sukses
- [ ] PM2 jalan + `pm2 save` + `pm2 startup`
- [ ] Nginx `server_name` = `kuliahdikorea.com www.kuliahdikorea.com`
- [ ] Certbot sukses, `https://kuliahdikorea.com` aman
- [ ] UFW aktif (OpenSSH + Nginx Full)
- [ ] DNS A record `@` dan `www` → IP VPS
- [ ] Uji: navbar scroll (Program/Beasiswa/Kerja/FAQ), tombol Cek Kelayakan, link WhatsApp
