# 🔗 Konfigurasi Root URL untuk Sitemap dan SEO

## 🎯 Masalah

URL hardcoded `https://www.kontenkit.com` di beberapa file akan mempengaruhi:
- ✅ Generate sitemap (URL di sitemap.xml)
- ✅ Generate RSS feed (URL di rss.xml)
- ✅ Social sharing (Open Graph, Twitter Cards)
- ✅ Canonical URLs
- ✅ SEO

## ✅ Solusi: Menggunakan Environment Variables

Semua file sudah diperbaiki untuk menggunakan **environment variables** dengan prioritas:

### **Prioritas URL (dari tertinggi ke terendah):**

1. **`VITE_SITE_URL`** - Custom URL yang Anda set manual
2. **`CF_PAGES_URL`** - URL otomatis dari Cloudflare Pages (contoh: `https://bzone.pages.dev`)
3. **`CF_PAGES_BRANCH_URL`** - URL untuk branch tertentu
4. **Default fallback** - `https://bzone.pages.dev` atau `window.location.origin` (di browser)

---

## 🚀 Cara Setup

### **Metode 1: Set VITE_SITE_URL di Cloudflare (RECOMMENDED)**

**Untuk Custom Domain atau URL Khusus:**

1. Buka Cloudflare Pages → Project → Settings → Environment variables
2. Tambahkan:
   - **Variable name**: `VITE_SITE_URL`
   - **Value**: URL website Anda
     - Custom domain: `https://www.yourdomain.com`
     - Cloudflare Pages: `https://bzone.pages.dev`
     - Atau URL lain yang Anda inginkan
   - **Environment**: Production, Preview
3. Save

**Contoh:**
```
VITE_SITE_URL = https://www.yourdomain.com
```

### **Metode 2: Biarkan Otomatis (Menggunakan CF_PAGES_URL)**

**Jika tidak set `VITE_SITE_URL`:**
- Cloudflare Pages otomatis menyediakan `CF_PAGES_URL`
- URL akan otomatis: `https://{project-name}.pages.dev`
- Tidak perlu setup tambahan!

**Contoh:**
- Project name: `bzone` → URL: `https://bzone.pages.dev`
- Project name: `blog-tech` → URL: `https://blog-tech.pages.dev`

---

## 📋 File yang Sudah Diperbaiki

### **1. Scripts (Build Time):**

**`scripts/generate-sitemap.js`**
```javascript
const SITE_URL = process.env.VITE_SITE_URL || 
                 process.env.CF_PAGES_URL || 
                 process.env.CF_PAGES_BRANCH_URL || 
                 'https://bzone.pages.dev';
```

**`scripts/generate-rss.js`**
```javascript
const SITE_URL = process.env.VITE_SITE_URL || 
                 process.env.CF_PAGES_URL || 
                 'https://example.com';
```

### **2. Vue Components (Runtime):**

**Semua file Vue sudah diperbaiki:**
- `src/views/BlogIndexView.vue`
- `src/views/ArticleView.vue`
- `src/views/CategoryIndexView.vue`
- `src/views/AboutView.vue`
- `src/views/NicheSelectionView.vue`

**Format:**
```javascript
const siteUrl = import.meta.env.VITE_SITE_URL || 
                import.meta.env.CF_PAGES_URL || 
                (typeof window !== 'undefined' ? window.location.origin : 'https://bzone.pages.dev');
```

---

## 🔍 Verifikasi

### **1. Cek Sitemap**

Setelah build, cek file `dist/sitemap.xml`:
```xml
<url>
  <loc>https://bzone.pages.dev/</loc>
  ...
</url>
```

URL harus sesuai dengan yang Anda set di environment variable.

### **2. Cek RSS Feed**

Cek file `dist/rss.xml`:
```xml
<link>https://bzone.pages.dev</link>
```

### **3. Cek Meta Tags**

Inspect HTML di browser, cek:
- `<link rel="canonical" href="...">`
- `<meta property="og:url" content="...">`
- `<meta property="og:image" content="...">`

---

## 💡 Tips & Best Practices

### **1. Custom Domain**

Jika menggunakan custom domain:
```
VITE_SITE_URL = https://www.yourdomain.com
```

**Pastikan:**
- ✅ Custom domain sudah diset di Cloudflare Pages
- ✅ DNS sudah dikonfigurasi dengan benar
- ✅ SSL certificate aktif

### **2. Multiple Projects**

Jika punya multiple projects dengan URL berbeda:

**Project 1 (Production):**
```
VITE_SITE_URL = https://blog.example.com
```

**Project 2 (Staging):**
```
VITE_SITE_URL = https://staging-blog.example.com
```

**Project 3 (Tech Blog):**
```
VITE_SITE_URL = https://tech.example.com
```

### **3. Environment Variables per Environment**

**Production:**
```
VITE_SITE_URL = https://www.yourdomain.com
```

**Preview (untuk preview deployments):**
```
VITE_SITE_URL = https://preview-blog.example.com
```

Atau biarkan kosong untuk menggunakan `CF_PAGES_URL` otomatis.

---

## 🔄 Update URL

### **Cara Update URL:**

1. **Via Cloudflare Dashboard:**
   - Project → Settings → Environment variables
   - Edit `VITE_SITE_URL`
   - Save
   - Trigger deployment baru

2. **Via Git (jika menggunakan .env):**
   ```bash
   # Edit .env file (jika ada)
   VITE_SITE_URL=https://new-url.com
   
   # Commit dan push
   git add .env
   git commit -m "Update site URL"
   git push origin main
   ```

**Catatan:** `.env` file tidak akan ter-load di Cloudflare Pages. Gunakan Cloudflare Environment Variables!

---

## ⚠️ Troubleshooting

### **Problem: Sitemap Masih Menggunakan URL Lama**

**Solusi:**
1. Pastikan `VITE_SITE_URL` sudah diset di Cloudflare
2. Trigger deployment baru (build ulang)
3. Cek build logs untuk memastikan env var ter-load
4. Verifikasi file `dist/sitemap.xml` setelah build

### **Problem: URL Tidak Sesuai dengan Custom Domain**

**Solusi:**
1. Set `VITE_SITE_URL` dengan custom domain Anda
2. Pastikan custom domain sudah dikonfigurasi di Cloudflare Pages
3. Pastikan DNS sudah benar
4. Trigger deployment baru

### **Problem: URL di Browser vs Build Time**

**Penjelasan:**
- **Build time** (sitemap, RSS): Menggunakan `process.env.VITE_SITE_URL` atau `CF_PAGES_URL`
- **Runtime** (browser): Menggunakan `import.meta.env.VITE_SITE_URL` atau `window.location.origin`

**Solusi:**
- Set `VITE_SITE_URL` di Cloudflare untuk konsistensi
- Atau biarkan menggunakan `CF_PAGES_URL` otomatis

---

## 📝 Checklist

- [ ] Set `VITE_SITE_URL` di Cloudflare Pages (jika menggunakan custom domain)
- [ ] Atau biarkan kosong untuk menggunakan `CF_PAGES_URL` otomatis
- [ ] Trigger deployment baru
- [ ] Verifikasi sitemap.xml menggunakan URL yang benar
- [ ] Verifikasi rss.xml menggunakan URL yang benar
- [ ] Verifikasi meta tags di HTML menggunakan URL yang benar
- [ ] Test social sharing (Open Graph, Twitter Cards)

---

## 🎯 Kesimpulan

**Sekarang:**
- ✅ Semua file menggunakan environment variables
- ✅ URL otomatis dari Cloudflare Pages jika tidak diset manual
- ✅ Sitemap dan RSS feed akan menggunakan URL yang benar
- ✅ SEO dan social sharing akan menggunakan URL yang benar

**Rekomendasi:**
- Set `VITE_SITE_URL` jika menggunakan custom domain
- Biarkan kosong jika menggunakan Cloudflare Pages URL default
- URL akan otomatis sesuai dengan project name

---

**URL sekarang akan otomatis sesuai dengan environment! 🎉**

