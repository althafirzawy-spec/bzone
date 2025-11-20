# 🚀 Panduan Cepat Setup Cloudflare Pages

## Checklist 5 Menit

### ✅ 1. Persiapan GitHub (2 menit)
```bash
# Di folder proyek
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/bzone.git
git push -u origin main
```

**PENTING**: Pastikan file `.gitignore` sudah ada dan file sensitif tidak ter-commit!

### ✅ 2. Setup Cloudflare Pages (2 menit)

1. Login ke [dash.cloudflare.com](https://dash.cloudflare.com)
2. **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**
3. Pilih **GitHub** → Authorize → Pilih repository `bzone`
4. Isi konfigurasi:
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (kosongkan)

### ✅ 3. Set Environment Variables (1 menit)

Di halaman project Cloudflare Pages → **Settings** → **Environment variables**, tambahkan:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GEMINI_API_KEY` | (dari `apikey.txt`) | Production, Preview |
| `PEXELS_API_KEY` | (dari `pexels_apikey.txt`) | Production, Preview |
| `BACKDATE_DAYS` | `3` | Production, Preview |
| `FUTURE_SCHEDULE_DAYS` | `30` | Production, Preview |
| `NODE_VERSION` | `20` | Production, Preview |

### ✅ 4. Deploy!

Klik **"Save and Deploy"** dan tunggu build selesai (3-5 menit).

Website Anda akan live di: `https://bzone.pages.dev`

---

## 🔧 Troubleshooting Cepat

### Build gagal?
- ✅ Cek environment variables sudah diset
- ✅ Cek build logs untuk error detail
- ✅ Pastikan Node.js version = 20 (wajib untuk cheerio)

### API key error?
- ✅ Pastikan `GEMINI_API_KEY` format benar (mulai dengan `AIzaSy`)
- ✅ Pastikan API key masih aktif

### Website blank?
- ✅ Cek build output directory = `dist`
- ✅ Pastikan build command benar

---

## 📚 Dokumentasi Lengkap

Lihat file **TUTORIAL_INSTALASI.md** untuk tutorial detail dan troubleshooting lengkap.

---

**Selamat! 🎉**

