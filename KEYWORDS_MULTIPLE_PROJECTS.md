# 📝 Memisahkan Keywords untuk Multiple Projects

## 🎯 Solusi: Multiple Keyword Files

Script sekarang mendukung **multiple keyword files** untuk memisahkan keywords per project!

### Format File Keyword:
- `keyword.txt` - Default (untuk project tanpa spesifikasi)
- `keyword-{project-name}.txt` - Spesifik untuk project tertentu
- `keyword-production.txt` - Untuk project production
- `keyword-staging.txt` - Untuk project staging
- `keyword-blog-tech.txt` - Untuk project blog-tech
- dll.

---

## 🚀 Cara Setup

### Langkah 1: Buat Keyword Files untuk Setiap Project

**Contoh struktur:**
```
repository/
  ├── keyword.txt                    # Default (fallback)
  ├── keyword-production.txt         # Untuk project "production"
  ├── keyword-staging.txt            # Untuk project "staging"
  ├── keyword-blog-tech.txt          # Untuk project "blog-tech"
  └── keyword-blog-food.txt          # Untuk project "blog-food"
```

**Format setiap file (satu keyword per baris):**
```
keyword 1
keyword 2
keyword 3
```

### Langkah 2: Set Environment Variable PROJECT_NAME

Di Cloudflare Pages, untuk setiap project, set environment variable:

**Project 1 (Production):**
- Variable name: `PROJECT_NAME`
- Value: `production`
- Environment: Production, Preview

**Project 2 (Staging):**
- Variable name: `PROJECT_NAME`
- Value: `staging`
- Environment: Production, Preview

**Project 3 (Blog Tech):**
- Variable name: `PROJECT_NAME`
- Value: `blog-tech`
- Environment: Production, Preview

### Langkah 3: Commit Files ke GitHub

```bash
# Tambahkan semua keyword files
git add keyword-production.txt keyword-staging.txt keyword-blog-tech.txt

# Commit
git commit -m "Add keyword files for multiple projects"

# Push
git push origin main
```

---

## 📋 Contoh Praktis

### Contoh 1: Production & Staging

**File: `keyword-production.txt`**
```
how to make pink food color
how to make crystal with borax
how to measure shaft length on outboard
best practices for cooking
```

**File: `keyword-staging.txt`**
```
test keyword 1
test keyword 2
test keyword 3
```

**Setup di Cloudflare:**

**Project: `bzone-production`**
- Environment variable: `PROJECT_NAME = production`
- Script akan membaca: `keyword-production.txt`

**Project: `bzone-staging`**
- Environment variable: `PROJECT_NAME = staging`
- Script akan membaca: `keyword-staging.txt`

### Contoh 2: Multiple Niche Blogs

**File: `keyword-blog-tech.txt`**
```
how to install nodejs
how to setup docker
best programming languages 2024
```

**File: `keyword-blog-food.txt`**
```
how to make pasta
best recipes for dinner
how to bake bread
```

**File: `keyword-blog-travel.txt`**
```
best places to visit in bali
how to plan a trip
budget travel tips
```

**Setup di Cloudflare:**

**Project: `blog-tech`**
- Environment variable: `PROJECT_NAME = blog-tech`
- Script akan membaca: `keyword-blog-tech.txt`

**Project: `blog-food`**
- Environment variable: `PROJECT_NAME = blog-food`
- Script akan membaca: `keyword-blog-food.txt`

**Project: `blog-travel`**
- Environment variable: `PROJECT_NAME = blog-travel`
- Script akan membaca: `keyword-blog-travel.txt`

---

## 🔄 Prioritas Pembacaan Keywords

Script akan membaca keywords dengan urutan prioritas berikut:

1. **PRIORITAS 1**: `keyword-{PROJECT_NAME}.txt` (jika `PROJECT_NAME` diset)
   - Contoh: Jika `PROJECT_NAME=production`, script akan cek `keyword-production.txt`

2. **PRIORITAS 2**: `keyword.txt` (default/fallback)
   - Digunakan jika file spesifik tidak ditemukan atau `PROJECT_NAME` tidak diset

3. **PRIORITAS 3**: Environment variable `KEYWORDS`
   - Fallback terakhir jika file tidak ditemukan

---

## 💡 Tips & Best Practices

### 1. Naming Convention

Gunakan nama yang konsisten:
- `keyword-production.txt` (bukan `keyword-prod.txt`)
- `keyword-staging.txt` (bukan `keyword-stg.txt`)
- `keyword-{project-name}.txt` (sesuai dengan PROJECT_NAME)

### 2. Default Fallback

Selalu sediakan `keyword.txt` sebagai fallback:
- Jika file spesifik tidak ditemukan
- Jika PROJECT_NAME tidak diset
- Untuk testing/development

### 3. Update Keywords

**Cara update keywords untuk project tertentu:**
```bash
# Edit file keyword untuk project tertentu
# Contoh: edit keyword-production.txt

git add keyword-production.txt
git commit -m "Update keywords for production"
git push origin main
```

**Cloudflare akan otomatis build dan generate artikel baru!**

### 4. Environment Variable PROJECT_NAME

**Cara mendapatkan PROJECT_NAME:**
- Cloudflare Pages otomatis menyediakan: `CF_PAGES_PROJECT_NAME`
- Atau set manual: `PROJECT_NAME`

**Di Cloudflare Dashboard:**
- Project → Settings → Environment variables
- Add variable: `PROJECT_NAME = production` (atau nama project)

---

## 🔍 Troubleshooting

### Problem: Script Tidak Membaca File Spesifik

**Solusi:**
1. Pastikan `PROJECT_NAME` sudah diset di Cloudflare
2. Pastikan nama file sesuai: `keyword-{PROJECT_NAME}.txt`
3. Pastikan file sudah di-commit dan push ke GitHub
4. Cek build logs untuk melihat file mana yang digunakan

### Problem: Script Menggunakan keyword.txt Padahal Ada File Spesifik

**Solusi:**
1. Pastikan `PROJECT_NAME` environment variable sudah diset
2. Pastikan nama file sesuai dengan PROJECT_NAME
3. Cek build logs:
   ```
   [INFO] Menggunakan keywords dari keyword-production.txt
   ```

### Problem: Multiple Projects Menggunakan Keywords yang Sama

**Solusi:**
1. Pastikan setiap project memiliki `PROJECT_NAME` yang berbeda
2. Pastikan setiap project memiliki file keyword yang berbeda
3. Verifikasi environment variables di setiap project

---

## 📝 Checklist Setup

- [ ] Buat keyword files untuk setiap project
- [ ] Set `PROJECT_NAME` environment variable di setiap project
- [ ] Commit dan push keyword files ke GitHub
- [ ] Verifikasi build logs untuk memastikan file yang benar digunakan
- [ ] Test generate artikel untuk setiap project

---

## 🎯 Contoh Lengkap

### Struktur Repository:
```
bzone/
  ├── keyword.txt                    # Default
  ├── keyword-production.txt         # Production keywords
  ├── keyword-staging.txt            # Staging keywords
  ├── keyword-blog-tech.txt          # Tech blog keywords
  └── keyword-blog-food.txt          # Food blog keywords
```

### Setup di Cloudflare:

**Project 1: `bzone-production`**
- `PROJECT_NAME = production`
- Menggunakan: `keyword-production.txt`

**Project 2: `bzone-staging`**
- `PROJECT_NAME = staging`
- Menggunakan: `keyword-staging.txt`

**Project 3: `blog-tech`**
- `PROJECT_NAME = blog-tech`
- Menggunakan: `keyword-blog-tech.txt`

**Project 4: `blog-food`**
- `PROJECT_NAME = blog-food`
- Menggunakan: `keyword-blog-food.txt`

---

## 📚 Referensi

- Lihat `MULTIPLE_PROJECTS.md` untuk setup multiple projects
- Lihat `TUTORIAL_INSTALASI.md` untuk setup lengkap

---

**Sekarang setiap project bisa memiliki keywords sendiri! 🎉**

