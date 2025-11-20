# 📝 Perubahan untuk Deployment Cloudflare Pages

## ✅ File yang Dibuat

### 1. `TUTORIAL_INSTALASI.md`
Tutorial lengkap step-by-step untuk deployment ke Cloudflare Pages via GitHub. Berisi:
- Persiapan awal
- Setup GitHub repository
- Konfigurasi Cloudflare Pages
- Environment variables setup
- Troubleshooting lengkap

### 2. `PANDUAN_CEPAT.md`
Panduan cepat 5 menit untuk setup dasar. Cocok untuk yang sudah familiar dengan deployment.

### 3. `.gitignore`
File untuk mencegah file sensitif ter-commit ke GitHub. Mengabaikan:
- API keys (`apikey.txt`, `pexels_apikey.txt`)
- Keywords (`keyword.txt`)
- Environment files (`.env*`)
- Build output (`dist/`)
- Dependencies (`node_modules/`)

## 🔧 File yang Dimodifikasi

### `scripts/generate-content.js`
**Perubahan:**
- ✅ Sekarang mendukung membaca API keys dari environment variables
- ✅ Fallback ke file lokal jika env vars tidak tersedia
- ✅ Mendukung `GEMINI_API_KEY` dari environment variable
- ✅ Mendukung `PEXELS_API_KEY` dari environment variable
- ✅ Mendukung `KEYWORDS` dari environment variable

**Cara kerja:**
1. Script akan cek environment variables terlebih dahulu
2. Jika tidak ditemukan, akan membaca dari file lokal
3. Cocok untuk development lokal (pakai file) dan production (pakai env vars)

## 🚀 Langkah Selanjutnya

1. **Baca Tutorial**: Buka `TUTORIAL_INSTALASI.md` untuk panduan lengkap
2. **Atau Quick Start**: Buka `PANDUAN_CEPAT.md` untuk setup cepat
3. **Setup GitHub**: Push code ke GitHub (pastikan `.gitignore` sudah ada)
4. **Setup Cloudflare**: Connect GitHub ke Cloudflare Pages
5. **Set Environment Variables**: Tambahkan API keys di Cloudflare
6. **Deploy**: Tunggu build selesai dan website live!

## 📌 Catatan Penting

- ✅ File sensitif (`apikey.txt`, dll) **TIDAK** akan ter-push ke GitHub
- ✅ Gunakan **Environment Variables** di Cloudflare untuk API keys
- ✅ Script sudah siap untuk production deployment
- ✅ Build command: `npm install && npm run build`
- ✅ Build output: `dist/`

## 🔍 Environment Variables yang Diperlukan

Di Cloudflare Pages, set environment variables berikut:

| Variable | Deskripsi | Wajib |
|----------|-----------|-------|
| `GEMINI_API_KEY` | Google Gemini API Key | ✅ Ya |
| `PEXELS_API_KEY` | Pexels API Key untuk gambar | ⚠️ Opsional |
| `BACKDATE_DAYS` | Hari untuk backdate artikel | ⚠️ Opsional (default: 3) |
| `FUTURE_SCHEDULE_DAYS` | Hari untuk schedule artikel | ⚠️ Opsional (default: 30) |
| `NODE_VERSION` | Versi Node.js untuk build | ⚠️ Opsional (default: 18) |

---

**Selamat deployment! 🎉**

