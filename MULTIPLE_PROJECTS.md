# 🚀 Multiple Projects dari Satu Repository GitHub

## ✅ Jawaban Singkat

**Ya, 1 repository GitHub bisa digunakan untuk membuat beberapa project di Cloudflare Pages!**

Setiap project bisa memiliki:
- ✅ Konfigurasi build yang berbeda
- ✅ Environment variables yang berbeda
- ✅ Custom domain yang berbeda
- ✅ Branch yang berbeda
- ✅ Root directory yang berbeda

---

## 📋 Use Cases

### 1. Staging & Production Environment

**Setup:**
- **Project 1** (`bzone-production`): Branch `main` → Production
- **Project 2** (`bzone-staging`): Branch `staging` → Staging/Testing

**Keuntungan:**
- Test perubahan di staging sebelum production
- Environment variables terpisah
- URL berbeda: `bzone-production.pages.dev` vs `bzone-staging.pages.dev`

### 2. Multiple Websites dari Satu Codebase

**Setup:**
- **Project 1** (`blog-tech`): Root directory `/` → Tech blog
- **Project 2** (`blog-food`): Root directory `/` → Food blog
- Environment variables berbeda untuk keywords/API keys

**Keuntungan:**
- Satu codebase, multiple websites
- Content berbeda per website
- Domain berbeda per website

### 3. Monorepo dengan Multiple Projects

**Struktur Repository:**
```
repository/
  ├── frontend/
  │   ├── package.json
  │   └── ...
  ├── blog/
  │   ├── package.json
  │   └── ...
  └── docs/
      ├── package.json
      └── ...
```

**Setup:**
- **Project 1** (`frontend`): Root directory `/frontend`
- **Project 2** (`blog`): Root directory `/blog`
- **Project 3** (`docs`): Root directory `/docs`

---

## 🔧 Cara Setup

### Langkah 1: Buat Project Pertama (Sudah Ada)

Project pertama sudah dibuat dengan konfigurasi:
- **Project name**: `bzone`
- **Repository**: `althafirzawy-spec/bzone`
- **Branch**: `main`
- **Root directory**: `/`

### Langkah 2: Buat Project Kedua

1. **Buka Cloudflare Pages Dashboard**
   - Workers & Pages → Create application → Pages → Connect to Git

2. **Pilih Repository yang Sama**
   - Pilih repository: `althafirzawy-spec/bzone` (sama dengan project pertama)

3. **Konfigurasi Project Baru**
   - **Project name**: `bzone-staging` (atau nama lain)
   - **Production branch**: `main` (atau branch lain)
   - **Root directory**: `/` (atau subdirectory jika perlu)
   - **Build command**: `npm install && npm run build`
   - **Build output directory**: `dist`

4. **Set Environment Variables**
   - Set environment variables khusus untuk project ini
   - **PENTING**: Set `PROJECT_NAME` untuk menggunakan keyword file spesifik
   - Contoh: `PROJECT_NAME = staging` (akan menggunakan `keyword-staging.txt`)
   - Bisa berbeda dengan project pertama

5. **Save and Deploy**

### Langkah 3: Verifikasi

Setelah setup, Anda akan memiliki:
- **Project 1**: `https://bzone.pages.dev`
- **Project 2**: `https://bzone-staging.pages.dev`

Kedua project akan:
- ✅ Deploy otomatis saat ada commit baru
- ✅ Memiliki environment variables sendiri
- ✅ Bisa memiliki custom domain sendiri

---

## ⚙️ Konfigurasi Lanjutan

### Environment Variables per Project

Setiap project memiliki environment variables sendiri:

**Project 1 (Production):**
```
GEMINI_API_KEY = production_key
KEYWORDS = production_keywords
VITE_SITE_NAME = Production Blog
```

**Project 2 (Staging):**
```
GEMINI_API_KEY = staging_key (atau sama)
KEYWORDS = test_keywords
VITE_SITE_NAME = Staging Blog
```

### Custom Domain per Project

Setiap project bisa memiliki custom domain sendiri:

- **Project 1**: `blog.example.com`
- **Project 2**: `staging-blog.example.com`

### Branch Strategy

**Option 1: Branch Berbeda**
- Production: `main` branch
- Staging: `staging` branch
- Development: `dev` branch

**Option 2: Branch Sama, Environment Berbeda**
- Semua project menggunakan `main` branch
- Perbedaan hanya di environment variables

---

## 📝 Contoh Praktis

### Contoh 1: Staging & Production

```bash
# 1. Buat branch staging
git checkout -b staging
git push origin staging

# 2. Di Cloudflare, buat 2 projects:
#    - bzone-production (branch: main)
#    - bzone-staging (branch: staging)

# 3. Set environment variables berbeda
#    Production: KEYWORDS = production_keywords
#    Staging: KEYWORDS = test_keywords
```

### Contoh 2: Multiple Niche Blogs

```bash
# 1. Semua project menggunakan branch main yang sama
# 2. Buat 3 projects di Cloudflare:
#    - blog-tech (KEYWORDS = tech_keywords)
#    - blog-food (KEYWORDS = food_keywords)
#    - blog-travel (KEYWORDS = travel_keywords)

# 3. Set custom domain:
#    - blog-tech → tech.example.com
#    - blog-food → food.example.com
#    - blog-travel → travel.example.com
```

---

## 💡 Tips & Best Practices

### 1. Naming Convention

Gunakan nama project yang jelas:
- `bzone-production`
- `bzone-staging`
- `bzone-dev`

### 2. Environment Variables

- Gunakan prefix untuk membedakan: `PROD_`, `STAGING_`
- Atau set berbeda per project (lebih mudah)

### 3. Branch Strategy

- **Production**: `main` atau `master`
- **Staging**: `staging` atau `develop`
- **Feature**: `feature/*`

### 4. Monitoring

- Monitor build logs untuk setiap project
- Set up notifications untuk build failures
- Track deployment history per project

---

## ⚠️ Catatan Penting

1. **Build Time**: Setiap project akan build secara terpisah
   - Jika ada 3 projects, setiap commit akan trigger 3 builds
   - Pastikan build time tidak terlalu lama

2. **API Rate Limits**: 
   - Jika menggunakan API keys yang sama, perhatikan rate limits
   - Pertimbangkan menggunakan API keys berbeda per project

3. **Cost**: 
   - Cloudflare Pages gratis untuk unlimited projects
   - Tidak ada biaya tambahan untuk multiple projects

4. **Deployment**: 
   - Setiap project deploy secara independen
   - Satu project gagal tidak mempengaruhi project lain

---

## 🔍 Troubleshooting

### Problem: Build Gagal di Satu Project

**Solusi:**
- Cek build logs untuk project yang gagal
- Pastikan environment variables sudah diset dengan benar
- Pastikan branch yang digunakan ada di repository

### Problem: Environment Variables Tidak Ter-load

**Solusi:**
- Pastikan environment variables diset per project (bukan global)
- Cek apakah variable name benar
- Restart deployment setelah menambahkan env vars

### Problem: Multiple Projects Deploy dari Commit yang Sama

**Ini Normal!**
- Setiap project akan build dari commit yang sama
- Tapi environment variables bisa berbeda
- Hasil build bisa berbeda karena env vars berbeda

---

## 📚 Referensi

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Multiple Projects Guide](https://developers.cloudflare.com/pages/platform/build-configuration/)

---

**Selamat! Sekarang Anda bisa membuat multiple projects dari satu repository! 🎉**

