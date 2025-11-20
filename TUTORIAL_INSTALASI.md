# Tutorial Lengkap: Instalasi dan Deployment ke Cloudflare Pages via GitHub

## 📋 Daftar Isi
1. [Persiapan Awal](#persiapan-awal)
2. [Setup GitHub Repository](#setup-github-repository)
3. [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
4. [Setup Cloudflare Pages](#setup-cloudflare-pages)
5. [Konfigurasi Build Settings](#konfigurasi-build-settings)
6. [Deployment dan Testing](#deployment-dan-testing)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Persiapan Awal

### 1. Prerequisites
Pastikan Anda sudah memiliki:
- ✅ Akun GitHub (gratis)
- ✅ Akun Cloudflare (gratis)
- ✅ Node.js versi 20 atau lebih tinggi terinstall di komputer lokal (wajib >= 20.18.1 untuk cheerio)
- ✅ Git terinstall di komputer lokal
- ✅ API Key Google Gemini (dari `apikey.txt`)
- ✅ API Key Pexels (dari `pexels_apikey.txt`)

### 2. Verifikasi File yang Diperlukan
Pastikan file-file berikut ada di folder proyek:
- `package.json` - Dependencies dan scripts
- `vite.config.js` - Konfigurasi build
- `apikey.txt` - Google Gemini API Key
- `pexels_apikey.txt` - Pexels API Key
- `keyword.txt` - Keywords untuk generate konten
- `index.html` - Entry point aplikasi

---

## 📦 Setup GitHub Repository

### Langkah 1: Buat Repository Baru di GitHub

1. Login ke [GitHub.com](https://github.com)
2. Klik tombol **"+"** di pojok kanan atas → pilih **"New repository"**
3. Isi detail repository:
   - **Repository name**: `bzone` (atau nama lain yang Anda inginkan)
   - **Description**: (opsional) Deskripsi proyek Anda
   - **Visibility**: Pilih **Public** atau **Private**
   - **JANGAN** centang "Initialize with README" (karena kita sudah punya file)
4. Klik **"Create repository"**

### Langkah 2: Inisialisasi Git di Folder Lokal

Buka terminal/command prompt di folder proyek `bzone` dan jalankan:

```bash
# Inisialisasi git repository
git init

# Tambahkan semua file ke staging
git add .

# Buat commit pertama
git commit -m "Initial commit: Vue 3 blog dengan SSG"
```

**💡 Tips: Jika Muncul Dialog CredentialHelperSelector**

Saat pertama kali commit, Windows mungkin menampilkan dialog **CredentialHelperSelector**. Pilih salah satu:

- ✅ **Git Credential Manager** (RECOMMENDED) - Menyimpan credentials dengan aman, tidak perlu input username/password setiap push
- ✅ **Git Credential Manager Core** - Alternatif yang juga bagus
- ⚠️ **None / No helper** - Hanya pilih ini jika Anda ingin input credentials manual setiap kali

**Rekomendasi**: Pilih **"Git Credential Manager"** untuk kemudahan penggunaan.

### Langkah 3: Setup Authentication untuk Push ke GitHub

**🔐 Jika Signup GitHub Pakai SSO Gmail (Tidak Ada Password)**

Jika Anda signup GitHub menggunakan SSO Gmail, Anda tidak punya password. Gunakan **Personal Access Token (PAT)** sebagai pengganti password.

#### Cara Membuat Personal Access Token:

1. **Login ke GitHub** → Klik foto profil (pojok kanan atas) → **Settings**
2. Scroll ke bawah → **Developer settings** (di sidebar kiri)
3. Klik **Personal access tokens** → **Tokens (classic)**
4. Klik **Generate new token** → **Generate new token (classic)**
5. Isi form:
   - **Note**: `Git Push Access` (atau nama lain)
   - **Expiration**: Pilih durasi (90 days, atau No expiration)
   - **Scopes**: Centang **`repo`** (akan otomatis centang semua sub-options)
6. Klik **Generate token** di bagian bawah
7. **⚠️ PENTING**: Copy token yang muncul (contoh: `ghp_xxxxxxxxxxxxxxxxxxxx`)
   - Token hanya muncul sekali! Simpan dengan aman.
   - **JANGAN** commit token ke GitHub! Token harus tetap rahasia.

#### Cara Menggunakan Token:

Saat melakukan `git push`, Git akan meminta:
- **Username**: Masukkan username GitHub Anda (contoh: `althafirzawy-spec`)
- **Password**: **JANGAN masukkan password**, tapi **paste Personal Access Token** yang sudah dibuat

```bash
# Tambahkan remote repository GitHub
# Ganti USERNAME dengan username GitHub Anda (contoh: althafirzawy-spec)
git remote add origin https://github.com/USERNAME/bzone.git

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Saat diminta credentials:**
- **Username**: `althafirzawy-spec` (username GitHub Anda)
- **Password**: `ghp_xxxxxxxxxxxxxxxxxxxx` (Personal Access Token, BUKAN password)

Git Credential Manager akan menyimpan token ini, jadi Anda tidak perlu input lagi di push berikutnya.

**💡 Alternatif: Gunakan SSH (Lebih Aman)**

Jika ingin lebih aman, bisa setup SSH key:
1. Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
2. Copy public key: `cat ~/.ssh/id_ed25519.pub`
3. Tambahkan ke GitHub: Settings → SSH and GPG keys → New SSH key
4. Ubah remote URL: `git remote set-url origin git@github.com:USERNAME/bzone.git`
```

**⚠️ PENTING: Jangan Push File Sensitif!**

File `.gitignore` sudah disediakan di proyek ini dan akan otomatis mengabaikan file-file sensitif. Pastikan file `.gitignore` sudah ada sebelum melakukan commit pertama.

File `.gitignore` yang sudah dibuat berisi:
- `apikey.txt` - **TIDAK** di-commit (informasi sensitif)
- `pexels_apikey.txt` - **TIDAK** di-commit (informasi sensitif)
- `keyword.txt` - **BISA** di-commit (bukan informasi sensitif, lebih mudah untuk update)
- `node_modules/`
- `.env` dan file environment lainnya
- `dist/`
- File-file sistem lainnya

Jika file sensitif sudah ter-commit sebelumnya, hapus dari history:

```bash
# Hapus file dari git tracking (tapi tetap di local)
git rm --cached apikey.txt
git rm --cached pexels_apikey.txt
# keyword.txt TIDAK perlu dihapus karena bisa di-commit

# Commit perubahan
git commit -m "Remove sensitive files from git"

# Push ulang
git push
```

---

## 🔐 Konfigurasi Environment Variables

Karena file `apikey.txt` dan `pexels_apikey.txt` tidak boleh di-push ke GitHub, kita akan menggunakan **Cloudflare Environment Variables** untuk menyimpan API keys.

### Langkah 1: Baca Isi File API Keys

Buka file-file berikut dan catat isinya:
- `apikey.txt` - Google Gemini API Key
- `pexels_apikey.txt` - Pexels API Key
- `keyword.txt` - Keywords (opsional, bisa diisi manual nanti)

**Simpan nilai-nilai ini dengan aman!**

### Langkah 2: Script Sudah Mendukung Environment Variables

**✅ Script `generate-content.js` sudah dimodifikasi** untuk mendukung environment variables! Script akan otomatis:
1. Mencoba membaca dari environment variables terlebih dahulu (`GEMINI_API_KEY`, `PEXELS_API_KEY`, `KEYWORDS`)
2. Jika tidak ditemukan, fallback ke file lokal (`apikey.txt`, `pexels_apikey.txt`, `keyword.txt`)

Ini berarti Anda bisa menggunakan environment variables di Cloudflare Pages tanpa perlu memodifikasi script lagi.

---

## ☁️ Setup Cloudflare Pages

### Langkah 1: Login ke Cloudflare

1. Buka [dash.cloudflare.com](https://dash.cloudflare.com)
2. Login dengan akun Cloudflare Anda
3. Jika belum punya akun, daftar gratis di [cloudflare.com](https://www.cloudflare.com)

### Langkah 2: Connect GitHub ke Cloudflare

1. Di dashboard Cloudflare, klik **"Workers & Pages"** di sidebar kiri
2. Klik **"Create application"**
3. Pilih tab **"Pages"**
4. Klik **"Connect to Git"**
5. Pilih **"GitHub"** sebagai provider
6. Authorize Cloudflare untuk mengakses GitHub Anda
7. Pilih repository `bzone` yang sudah dibuat sebelumnya
8. Klik **"Begin setup"**

### Langkah 3: Konfigurasi Build Settings

Isi form konfigurasi dengan detail berikut:

#### Project Name
- **Project name**: `bzone` (atau nama yang Anda inginkan)

#### Production Branch
- **Production branch**: `main` (atau `master` jika menggunakan branch master)

#### Build Command
```
npm install && npm run build
```

#### Build Output Directory
```
dist
```

#### Root Directory
```
/ (kosongkan atau biarkan default)
```

#### Environment Variables
Klik **"Add variable"** dan tambahkan variabel berikut:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `GEMINI_API_KEY` | (isi dengan API key dari `apikey.txt`) | Production, Preview |
| `PEXELS_API_KEY` | (isi dengan API key dari `pexels_apikey.txt`) | Production, Preview |
| `BACKDATE_DAYS` | `3` | Production, Preview |
| `FUTURE_SCHEDULE_DAYS` | `30` | Production, Preview |
| `NODE_VERSION` | `20` | Production, Preview |
| `VITE_SITE_NAME` | `Blog` (opsional) | Production, Preview |
| `VITE_SITE_URL` | `https://bzone.pages.dev` (opsional) | Production, Preview |
| `VITE_OG_TITLE` | `Blog` (opsional) | Production, Preview |
| `VITE_OG_DESCRIPTION` | `Blog Description` (opsional) | Production, Preview |
| `KEYWORDS` | (keywords untuk generate artikel, dipisah koma) - **OPSIONAL**, lebih baik gunakan `keyword.txt` di GitHub | Production, Preview |

**💡 Format GEMINI_API_KEY untuk Multiple Keys:**

Jika Anda memiliki **beberapa API keys** (untuk menghindari rate limit), Anda bisa memasukkan semuanya dengan format:

**Format 1: Dipisah dengan koma (RECOMMENDED untuk Cloudflare)**
```
AIzaSy...key1,AIzaSy...key2,AIzaSy...key3
```

**Format 2: Dipisah dengan koma dan spasi**
```
AIzaSy...key1, AIzaSy...key2, AIzaSy...key3
```

**Format 3: Satu key per baris (untuk file lokal)**
```
AIzaSy...key1
AIzaSy...key2
AIzaSy...key3
```

**Contoh di Cloudflare Environment Variable:**
```
GEMINI_API_KEY = AIzaSy1234567890abcdef,AIzaSy0987654321fedcba
```

Script akan otomatis mendeteksi dan menggunakan semua keys secara bergantian jika salah satu mencapai rate limit.

**💡 Format KEYWORDS untuk Generate Artikel:**

Untuk generate artikel, Anda perlu memasukkan keywords. Ada **2 cara** untuk menyimpan keywords:

### **Cara 1: Simpan di GitHub (RECOMMENDED - Lebih Mudah Update)**

**✅ Keyword.txt BISA di-commit ke GitHub** karena bukan informasi sensitif. Ini cara yang lebih mudah untuk update keywords.

1. Edit file `keyword.txt` di local (satu keyword per baris):
   ```
   how to make pink food color
   how to make crystal with borax
   how to measure shaft length on outboard
   how to get to salem ma from boston
   how to plant flowers in pot
   how to print a book from word
   ```

2. Commit dan push ke GitHub:
   ```bash
   git add keyword.txt
   git commit -m "Update keywords"
   git push origin main
   ```

3. Script akan otomatis membaca dari `keyword.txt` saat build di Cloudflare.

**Keuntungan:**
- ✅ Lebih mudah update (edit file → commit → push)
- ✅ Version control (bisa lihat history perubahan)
- ✅ Tidak perlu akses Cloudflare dashboard untuk update

### **Cara 2: Simpan di Cloudflare Environment Variable**

Jika Anda lebih suka menggunakan environment variable:

**Format di Cloudflare (dipisah koma):**
```
KEYWORDS = how to make pink food color,how to make crystal with borax,how to measure shaft length on outboard,how to get to salem ma from boston,how to plant flowers in pot
```

**Catatan:**
- Setiap keyword akan digunakan untuk generate satu artikel
- Script akan skip keyword yang sudah memiliki artikel (berdasarkan slug)
- Script akan otomatis menggunakan `keyword.txt` jika ada, jika tidak baru cek environment variable `KEYWORDS`
- Jika tidak ada keduanya, script akan tetap berjalan tapi tidak generate artikel baru

**Cara menambahkan:**
1. Klik **"Add variable"**
2. Masukkan **Variable name** (misal: `GEMINI_API_KEY`)
3. Masukkan **Value** (paste API key Anda, atau multiple keys dipisah koma)
4. Centang **Production** dan **Preview**
5. Klik **"Save"**
6. Ulangi untuk semua variabel

### Langkah 4: Script Sudah Siap untuk Environment Variables

**✅ Tidak perlu modifikasi script!** Script `generate-content.js` sudah dimodifikasi untuk membaca environment variables. Langkah ini bisa dilewati.

### Langkah 5: Save and Deploy

1. Setelah semua konfigurasi selesai, klik **"Save and Deploy"**
2. Cloudflare akan mulai build project Anda
3. Proses build biasanya memakan waktu 3-5 menit
4. Anda bisa melihat progress build di halaman deployment

---

## ⚙️ Konfigurasi Build Settings Lanjutan

### Custom Domain (Opsional)

Jika Anda punya domain sendiri:

1. Di halaman project Cloudflare Pages, klik tab **"Custom domains"**
2. Klik **"Set up a custom domain"**
3. Masukkan domain Anda (misal: `blog.example.com`)
4. Cloudflare akan memberikan instruksi untuk setup DNS
5. Ikuti instruksi untuk menambahkan CNAME record di DNS provider Anda

### Build Settings untuk Development

Jika ingin setup untuk development/preview:

1. Di halaman project, klik **"Settings"**
2. Scroll ke **"Builds & deployments"**
3. Anda bisa mengatur:
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
   - **Node.js version**: `20` (wajib, karena cheerio memerlukan Node.js >= 20.18.1)

---

## 🚀 Deployment dan Testing

### Langkah 1: Trigger Deployment

Deployment otomatis akan terjadi ketika:
- ✅ Push commit baru ke branch `main`
- ✅ Manual trigger dari dashboard Cloudflare

Untuk trigger manual:
1. Buka halaman project di Cloudflare Pages
2. Klik **"Retry deployment"** pada deployment terakhir
3. Atau klik **"Create deployment"** → pilih branch → **"Deploy"**

### Langkah 2: Monitor Build Process

1. Klik pada deployment yang sedang berjalan
2. Anda akan melihat log build real-time
3. Perhatikan jika ada error atau warning

### Langkah 3: Verifikasi Deployment

Setelah build selesai:

1. Cloudflare akan memberikan URL seperti: `https://bzone.pages.dev`
2. Buka URL tersebut di browser
3. Verifikasi bahwa website berfungsi dengan baik:
   - ✅ Homepage load dengan benar
   - ✅ Navigation bekerja
   - ✅ Artikel bisa diakses
   - ✅ Tidak ada error di console browser

### Langkah 4: Test Content Generation

Karena script `generate-content.js` memerlukan API keys, pastikan:

1. Environment variables sudah diset dengan benar
2. Build process berhasil menjalankan `npm run generate`
3. File `public/articles.json` ter-generate dengan benar

**Catatan**: Jika build gagal karena generate content, Anda bisa:
- Skip step generate untuk sementara
- Atau generate content secara lokal dan commit file `articles.json`

---

## 🔧 Troubleshooting

### Problem 1: Build Gagal - "Cannot find module" atau "Unsupported engine"

**Error yang muncul:**
```
npm warn EBADENGINE package: 'cheerio@1.1.2', required: { node: '>=20.18.1' }
SyntaxError: Cannot use import statement outside a module
```

**Solusi:**

1. **Pastikan Node.js Version = 20:**
   - File `.nvmrc` dan `.node-version` sudah dibuat dengan value `20`
   - Atau set environment variable `NODE_VERSION = 20` di Cloudflare Pages
   - Cloudflare akan otomatis menggunakan Node.js 20 jika file `.nvmrc` ada

2. **Verifikasi di Cloudflare:**
   - Buka Cloudflare Pages → Project → Settings → Environment variables
   - Pastikan `NODE_VERSION = 20` sudah diset
   - Atau pastikan file `.nvmrc` dengan value `20` sudah di-commit ke GitHub

3. **Test build lokal:**
   ```bash
   # Pastikan package.json ada dan dependencies lengkap
   npm install
   npm run build
   ```

Jika build lokal berhasil tapi di Cloudflare gagal, pastikan:
- Node.js version di Cloudflare = 20 (wajib, karena cheerio memerlukan >= 20.18.1)
- Semua dependencies ada di `package.json` (bukan hanya `devDependencies`)
- File `.nvmrc` atau `.node-version` sudah di-commit ke GitHub

### Problem 2: Build Gagal - "API Key not found"

**Solusi:**
1. Pastikan environment variables sudah diset di Cloudflare Pages
2. Pastikan nama variable sesuai dengan yang digunakan di script
3. Cek di build logs apakah env vars ter-load

### Problem 3: Build Gagal - "generate-content.js error"

**Solusi:**
1. Pastikan API keys valid
2. Cek rate limit Google Gemini API
3. Pastikan keyword.txt ada atau script bisa berjalan tanpa keyword file
4. Untuk sementara, bisa skip generate dengan modifikasi `package.json`:
   ```json
   "build": "npm run build:site"
   ```
   (hapus `npm run generate &&`)

### Problem 4: Website Blank atau Error 404

**Solusi:**
1. Pastikan build output directory adalah `dist`
2. Pastikan file `index.html` ada di root `dist`
3. Cek Cloudflare Pages settings → Build output directory

### Problem 5: Environment Variables Tidak Ter-load

**Solusi:**
1. Pastikan environment variables diset untuk **Production** dan **Preview**
2. Restart deployment setelah menambahkan env vars
3. Cek di build logs apakah env vars muncul (jangan tampilkan value di log untuk security)

### Problem 6: GitHub Connection Error

**Solusi:**
1. Re-authorize GitHub di Cloudflare
2. Pastikan repository visibility (public atau private dengan akses)
3. Cek GitHub permissions untuk Cloudflare

---

## 📝 Checklist Deployment

Gunakan checklist ini untuk memastikan semua langkah sudah dilakukan:

- [ ] Repository GitHub sudah dibuat
- [ ] File `.gitignore` sudah dibuat dan file sensitif tidak ter-commit
- [ ] Code sudah di-push ke GitHub
- [ ] Cloudflare Pages sudah connect ke GitHub
- [ ] Build settings sudah dikonfigurasi dengan benar
- [ ] Environment variables sudah diset (GEMINI_API_KEY, PEXELS_API_KEY, dll)
- [ ] Build pertama sudah berhasil
- [ ] Website sudah bisa diakses via URL Cloudflare
- [ ] Custom domain sudah diset (jika ada)
- [ ] Content generation berjalan dengan baik
- [ ] Semua fitur website sudah ditest

---

## 🔄 Workflow Development Selanjutnya

Setelah setup awal selesai, workflow development Anda:

### Untuk Update Code:
```bash
# 1. Edit code di local
# 2. Commit perubahan
git add .
git commit -m "Update: deskripsi perubahan"

# 3. Push ke GitHub
git push origin main

# 4. Cloudflare akan otomatis build dan deploy
```

### Untuk Update Environment Variables:
1. Buka Cloudflare Pages → Project → Settings → Environment variables
2. Edit atau tambah variable
3. Trigger deployment baru (atau tunggu commit berikutnya)

### Untuk Generate Content Baru (Update Keywords):
**Cara Termudah - Update via GitHub:**

1. Edit file `keyword.txt` di local (satu keyword per baris):
   ```
   how to make pink food color
   how to make crystal with borax
   keyword baru 1
   keyword baru 2
   ```

2. Commit dan push:
   ```bash
   git add keyword.txt
   git commit -m "Add new keywords"
   git push origin main
   ```

3. Cloudflare akan otomatis build dan generate artikel untuk keywords baru

**Atau via Cloudflare Environment Variable:**
1. Update `KEYWORDS` di Cloudflare Pages → Settings → Environment variables
2. Trigger deployment baru

---

## 📚 Referensi Tambahan

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [GitHub Actions untuk CI/CD](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)
- [Vue 3 Documentation](https://vuejs.org/)

---

## 🆘 Butuh Bantuan?

Jika mengalami masalah yang tidak teratasi:

1. **Cek Build Logs** di Cloudflare Pages untuk error detail
2. **Cek GitHub Issues** untuk masalah yang sudah pernah dilaporkan
3. **Cloudflare Community** - [community.cloudflare.com](https://community.cloudflare.com)
4. **Stack Overflow** - Tag: `cloudflare-pages`, `vite`, `vue3`

---

**Selamat! Website Anda sudah live di Cloudflare Pages! 🎉**

