# Deployment ke VPS — kuliahdikorea.com

Panduan hosting **tanpa Docker** untuk **monorepo** ini:

- **Frontend** — Next.js 14 (App Router), dijalankan sebagai Node server (`next start`) via PM2.
- **Backend** — Laravel 12 (API + Sanctum), dijalankan via PHP-FPM.
- **Database** — MySQL.

Struktur repo:

```
kuliahdikorea/          <- root repo (git)
├── frontend/           <- Next.js 14
└── backend/            <- Laravel 12
```

Arsitektur domain:

- `kuliahdikorea.com` (+ `www`) → Next.js (PM2, `127.0.0.1:3000`)
- `api.kuliahdikorea.com` → Laravel (`backend/public`, PHP-FPM)

> Target OS: Ubuntu 22.04 / 24.04 LTS. Perintah sistem pakai `sudo`.

---

## 0. Ringkasan arsitektur

```
Internet → Nginx (443/80)
              ├── kuliahdikorea.com      → PM2 → next start (127.0.0.1:3000)
              └── api.kuliahdikorea.com  → php-fpm → backend/public (Laravel)
                                                        └── MySQL
```

VPS minimal: **2 vCPU / 2 GB RAM / 40 GB SSD** (build Next + Composer lebih nyaman di 2 GB).

---

## 1. Persiapan awal VPS

Login sebagai root, buat user deploy & amankan.

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip build-essential nginx ufw software-properties-common

# Buat user deploy
sudo adduser deploy
sudo usermod -aG sudo deploy

# Lanjut sebagai deploy
su - deploy
```

Set timezone (opsional):

```bash
sudo timedatectl set-timezone Asia/Jakarta
```

---

## 2. Install Node.js 20 LTS (via nvm)

Sebagai user `deploy`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 20
nvm alias default 20
node -v    # harus v20.x
npm -v
```

---

## 3. Install PHP 8.2, Composer, MySQL

Laravel 12 butuh **PHP >= 8.2**.

```bash
# PHP-FPM + ekstensi
sudo apt install -y php8.2-fpm php8.2-cli php8.2-mysql php8.2-mbstring \
  php8.2-xml php8.2-curl php8.2-zip php8.2-gd php8.2-bcmath php8.2-intl
```

> Ubuntu 24.04 menyediakan **PHP 8.3** secara default — aman (juga >= 8.2). Ganti `php8.2-*` menjadi `php8.3-*` dan sesuaikan socket FPM (`php8.3-fpm.sock`) di langkah Nginx.

```bash
# Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer -V

# MySQL
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Install PM2:

```bash
npm install -g pm2
pm2 -v
```

---

## 4. Ambil kode (monorepo)

```bash
sudo mkdir -p /var/www
sudo chown deploy:deploy /var/www

git clone https://github.com/RIANPURNAMA1/LP-KULIAH-DI-KOREA.git /var/www/kuliahdikorea
cd /var/www/kuliahdikorea
```

> Jika repo privat: pakai **Personal Access Token** (`https://<TOKEN>@github.com/...`) atau **deploy key** SSH.


## 5. Setup Backend (Laravel)

### 5.1 Buat database & user MySQL

```bash
sudo mysql
```

```sql
CREATE DATABASE kuliahdikorea_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'kdk'@'localhost' IDENTIFIED BY 'GANTI_PASSWORD_DB_KUAT';
GRANT ALL PRIVILEGES ON kuliahdikorea_db.* TO 'kdk'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5.2 File `.env` produksi

```bash
cd /var/www/kuliahdikorea/backend
cp .env.example .env
nano .env
```

Isi (sesuaikan):

```dotenv
APP_NAME="Karir di Korea"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://api.kuliahdikorea.com

APP_LOCALE=id
APP_FALLBACK_LOCALE=en

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kuliahdikorea_db
DB_USERNAME=kdk
DB_PASSWORD=GANTI_PASSWORD_DB_KUAT

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database
FILESYSTEM_DISK=local

# Akun admin default (dibuat oleh database/seeders/AdminSeeder.php)
ADMIN_NAME="Admin Karir di Korea"
ADMIN_EMAIL=admin@karirdikorea.com
ADMIN_PASSWORD=GANTI_PASSWORD_ADMIN_KUAT
```

> **Wajib** ganti `ADMIN_PASSWORD` (default dev `admin12345` TIDAK boleh dipakai di produksi) dan `DB_PASSWORD`. File `.env` sudah di-`.gitignore`.

### 5.3 Install, migrate, seed, optimasi

```bash
composer install --no-dev --optimize-autoloader

php artisan key:generate
php artisan migrate --force
php artisan db:seed --force          # menjalankan DatabaseSeeder -> AdminSeeder saja

php artisan optimize                 # cache config + route + view
```

> `DatabaseSeeder` hanya memanggil `AdminSeeder` (tidak ada data demo).

### 5.4 Permission storage

```bash
sudo chown -R deploy:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### 5.5 Uji cepat

```bash
php artisan serve --host=127.0.0.1 --port=8000
# di terminal lain:
curl -s http://127.0.0.1:8000/api/health
# -> {"status":"ok"}
```

---

## 6. Setup Frontend (Next.js)

```bash
cd /var/www/kuliahdikorea/frontend
```

Buat `.env.production` (nilai `NEXT_PUBLIC_*` **di-inline saat build**):

```bash
cat > .env.production <<'EOF'
NEXT_PUBLIC_WA_NUMBER=62895391685825
NEXT_PUBLIC_API_URL=https://api.kuliahdikorea.com/api
NEXT_PUBLIC_SITE_URL=https://kuliahdikorea.com
EOF
```

> `.env.production` lebih diprioritaskan daripada `.env` saat `npm run build` (production), jadi nilai `localhost` di `.env` tidak akan terpakai di VPS. Sebaiknya tambahkan `.env.production` ke `frontend/.gitignore`.

Install & build:

```bash
npm ci
npm install sharp        # optimasi gambar di produksi (disarankan)
npm run build
```

Uji dulu:

```bash
npm start
# buka http://IP_VPS:3000 → pastikan tampil. Hentikan dengan Ctrl+C.
```

### 6.1 PM2

Buat `ecosystem.config.js` di **root repo** (`/var/www/kuliahdikorea`):

```bash
cd /var/www/kuliahdikorea
nano ecosystem.config.js
```

```js
module.exports = {
  apps: [
    {
      name: "kuliahdikorea",
      cwd: "/var/www/kuliahdikorea/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000 -H 127.0.0.1",
      instances: 1,
      exec_mode: "fork",
      env: { NODE_ENV: "production" },
      max_memory_restart: "512M",
    },
  ],
};
```

Jalankan & auto-start saat reboot:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
# jalankan perintah `sudo env ...` yang dicetak PM2, lalu:
pm2 save
```

Cek:

```bash
pm2 status
pm2 logs kuliahdikorea
```

---

## 7. Konfigurasi Nginx

### 7.1 Frontend — `kuliahdikorea.com`

```bash
sudo nano /etc/nginx/sites-available/kuliahdikorea.com
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name kuliahdikorea.com www.kuliahdikorea.com;

    client_max_body_size 10M;

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

    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

### 7.2 Backend API — `api.kuliahdikorea.com`

```bash
sudo nano /etc/nginx/sites-available/api.kuliahdikorea.com
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name api.kuliahdikorea.com;

    root /var/www/kuliahdikorea/backend/public;
    index index.php;

    client_max_body_size 10M;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.2-fpm.sock;   # sesuaikan: php8.3-fpm.sock bila PHP 8.3
    }

    location ~ /\.(?!well-known).* { deny all; }
}
```

### 7.3 Aktifkan & reload

```bash
sudo ln -s /etc/nginx/sites-available/kuliahdikorea.com /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/api.kuliahdikorea.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default   # opsional
sudo nginx -t
sudo systemctl reload nginx
```

---

## 8. SSL gratis (Let's Encrypt / Certbot)

Pastikan DNS sudah mengarah ke IP VPS (langkah 10) sebelum menjalankan ini.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d kuliahdikorea.com -d www.kuliahdikorea.com -d api.kuliahdikorea.com
```

Certbot memasang HTTPS + redirect HTTP→HTTPS + auto-renew. Uji:

```bash
sudo certbot renew --dry-run
```

---

## 9. CORS backend

Frontend memanggil API via domain berbeda (`api.`), jadi backend harus mengizinkan origin frontend. Edit `backend/config/cors.php`:

```php
'allowed_origins' => [
    'https://kuliahdikorea.com',
    'https://www.kuliahdikorea.com',
],
```

Lalu rebuild cache config:

```bash
cd /var/www/kuliahdikorea/backend
php artisan config:clear
php artisan optimize
```

> Autentikasi memakai Bearer token (Sanctum), jadi `supports_credentials` tetap `false`.

---

## 10. Firewall (UFW) & DNS

### UFW

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

Port `3000` **tidak** dibuka ke publik (hanya diakses Nginx lokal).

### DNS

| Type | Name | Value  | TTL  |
|------|------|--------|------|
| A    | @    | IP_VPS | 3600 |
| A    | www  | IP_VPS | 3600 |
| A    | api  | IP_VPS | 3600 |

```bash
dig +short kuliahdikorea.com
dig +short api.kuliahdikorea.com
```

---

## 11. Alur push dari lokal → GitHub → VPS

### Di komputer lokal

```bash
# dari root repo
cd "C:\Users\User\Desktop\PROJECT\KARIR DI KOREA - KULIAH"

git status
git add -A
git commit -m "deploy: update"
git push origin main
```

### Di VPS

```bash
cd /var/www/kuliahdikorea
git pull
```

Lalu update sesuai bagian yang berubah (lihat langkah 12). Jika hanya frontend yang berubah, cukup `npm run build` + `pm2 reload`. Jika backend berubah, jalankan Composer/migrate + optimize.

---

## 12. Update / deploy ulang

Setiap ada perubahan kode di VPS:

```bash
cd /var/www/kuliahdikorea
git pull

# Backend (bila berubah)
cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize

# Frontend (bila berubah / env NEXT_PUBLIC_* berubah)
cd ../frontend
npm ci
npm run build
pm2 reload kuliahdikorea
```

> Env `NEXT_PUBLIC_*` hanya berlaku setelah `npm run build`. Selalu build ulang sebelum `pm2 reload`.

Script cepat `~/deploy.sh`:

```bash
#!/usr/bin/env bash
set -e
cd /var/www/kuliahdikorea
git pull

cd backend
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan optimize

cd ../frontend
npm ci
npm run build

pm2 reload kuliahdikorea
echo "Deploy selesai."
```

```bash
chmod +x ~/deploy.sh
./deploy.sh
```

---

## 13. Troubleshooting

- **Frontend 502 / tidak jalan** → `pm2 status` & `pm2 logs kuliahdikorea`; pastikan listen di `127.0.0.1:3000`.
- **API 500** → cek `backend/storage/logs/laravel.log`; pastikan `APP_KEY` terisi, permission `storage`/`bootstrap/cache` benar, DB creds benar.
- **CORS error di browser** → sesuaikan `backend/config/cors.php`, lalu `php artisan config:clear && php artisan optimize`.
- **API 401 terus** → token kedaluwarsa/terhapus; login ulang di `/login`.
- **`502` dari Nginx ke PHP** → cek socket FPM di config (`/run/php/php8.2-fpm.sock`), `sudo systemctl status php8.2-fpm`.
- **Perubahan env frontend tidak muncul** → lupa build ulang; `npm run build` lalu `pm2 reload`.
- **Aset CSS/JS 404** → `rm -rf frontend/.next && npm run build`.
- **Error `Cannot find module './65.js'`** → `.next` korup (build saat `next dev` jalan). `rm -rf .next && npm run build`.
- **Gambar blur/lambat** → pastikan `sharp` terpasang (`npm install sharp`) lalu build ulang.
- **MySQL access denied** → cek `DB_USERNAME`/`DB_PASSWORD` di `.env` & grant user.
- **Cek port 3000 dipakai siapa** → `ss -tlnp | grep 3000`.

---

## 14. Checklist go-live

- [ ] Node 20, PHP 8.2+ (FPM), Composer, MySQL, PM2 terpasang
- [ ] Database `kuliahdikorea_db` + user MySQL dibuat
- [ ] `backend/.env`: `APP_ENV=production`, `APP_DEBUG=false`, `APP_KEY` terisi, kredensial DB benar
- [ ] `ADMIN_PASSWORD` & `DB_PASSWORD` sudah diganti (bukan default)
- [ ] `composer install --no-dev` + `php artisan migrate --force` + `db:seed --force` sukses
- [ ] Permission `storage` & `bootstrap/cache` benar
- [ ] `frontend/.env.production`: `NEXT_PUBLIC_API_URL=https://api.kuliahdikorea.com/api`, `NEXT_PUBLIC_WA_NUMBER`, `NEXT_PUBLIC_SITE_URL`
- [ ] `npm run build` sukses; `sharp` terpasang
- [ ] PM2 jalan + `pm2 save` + `pm2 startup`
- [ ] Nginx: 2 site aktif (`kuliahdikorea.com` + `api.kuliahdikorea.com`), `nginx -t` OK
- [ ] Certbot sukses untuk ketiga domain; redirect HTTP→HTTPS jalan
- [ ] `backend/config/cors.php` hanya mengizinkan domain frontend
- [ ] UFW aktif (OpenSSH + Nginx Full)
- [ ] DNS A record `@`, `www`, `api` → IP VPS
- [ ] Uji: `https://api.kuliahdikorea.com/api/health` = `{"status":"ok"}`
- [ ] Uji: form Cek Kelayakan tersimpan, login admin di `https://kuliahdikorea.com/login`, dashboard & chart tampil, ganti status pendaftar
