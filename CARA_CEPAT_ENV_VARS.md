# ⚡ Cara Cepat Set Environment Variables di Cloudflare Pages

## 🎯 Metode Tercepat

### **Metode 1: Copy-Paste Template (PALING CEPAT - 2 Menit)**

**Langkah:**

1. **Buka file `env-vars-template.json`** dan edit dengan values Anda:
   ```json
   {
     "GEMINI_API_KEY": "AIzaSy...your_key_here",
     "PEXELS_API_KEY": "your_pexels_key",
     "BACKDATE_DAYS": "3",
     "FUTURE_SCHEDULE_DAYS": "30",
     "NODE_VERSION": "20"
   }
   ```

2. **Buka Cloudflare Pages Dashboard:**
   - Project → Settings → Environment variables

3. **Copy-paste satu per satu** (masih lebih cepat dari mengetik):
   - Copy variable name dari template
   - Paste di Cloudflare
   - Copy value dari template
   - Paste di Cloudflare
   - Centang Production & Preview
   - Save
   - Ulangi untuk variable berikutnya

**Keuntungan:**
- ✅ Tidak perlu install tools
- ✅ Tidak perlu API token
- ✅ Lebih cepat dari mengetik manual
- ✅ Bisa reuse template untuk multiple projects

---

### **Metode 2: Menggunakan Browser Extension (AUTO-FILL)**

**Langkah:**

1. **Install browser extension untuk auto-fill** (contoh: AutoFill, Password Manager)
2. **Setup template** dengan values dari `env-vars-template.json`
3. **Gunakan auto-fill** saat input di Cloudflare dashboard

**Keuntungan:**
- ✅ Sangat cepat untuk multiple projects
- ✅ Bisa save template untuk reuse

---

### **Metode 3: Menggunakan Cloudflare API (ADVANCED)**

**Persiapan:**

1. **Dapatkan API Token:**
   - Buka: https://dash.cloudflare.com/profile/api-tokens
   - Create Token → Custom token
   - Permissions: `Account.Cloudflare Pages.Edit`
   - Account Resources: Select your account
   - Create Token
   - **Copy token** (hanya muncul sekali!)

2. **Dapatkan Account ID:**
   - Cloudflare Dashboard → Right sidebar → Account ID
   - Copy Account ID

3. **Edit `env-vars-template.json`** dengan values Anda

4. **Jalankan script:**
   ```bash
   # Set environment variables
   export CLOUDFLARE_API_TOKEN="your_token_here"
   export CLOUDFLARE_ACCOUNT_ID="your_account_id"
   export PROJECT_NAME="bzone"
   
   # Jalankan script
   node scripts/set-env-vars.js
   ```

**Catatan:**
- ⚠️ Cloudflare Pages API untuk environment variables mungkin berbeda
- ⚠️ Script ini mungkin perlu disesuaikan dengan API terbaru
- ✅ Lebih cocok untuk automation/CI/CD

---

### **Metode 4: Duplicate Project (UNTUK MULTIPLE PROJECTS)**

Jika Anda sudah setup project pertama dan ingin membuat project kedua dengan env vars yang sama:

1. **Buat project baru** di Cloudflare Pages
2. **Copy environment variables** dari project pertama:
   - Project 1 → Settings → Environment variables
   - Screenshot atau copy semua values
   - Project 2 → Settings → Environment variables
   - Paste values (lebih cepat dari mengetik ulang)

**Keuntungan:**
- ✅ Sangat cepat untuk multiple projects
- ✅ Tidak perlu input ulang semua values

---

## 📋 Template Environment Variables

### **Template Minimal (Wajib):**
```json
{
  "GEMINI_API_KEY": "AIzaSy...",
  "PEXELS_API_KEY": "...",
  "NODE_VERSION": "20"
}
```

### **Template Lengkap (Recommended):**
```json
{
  "GEMINI_API_KEY": "AIzaSy...key1,AIzaSy...key2",
  "PEXELS_API_KEY": "your_pexels_key",
  "BACKDATE_DAYS": "3",
  "FUTURE_SCHEDULE_DAYS": "30",
  "NODE_VERSION": "20",
  "VITE_SITE_NAME": "Blog",
  "VITE_SITE_URL": "https://bzone.pages.dev",
  "VITE_OG_TITLE": "Blog",
  "VITE_OG_DESCRIPTION": "Blog Description"
}
```

### **Template untuk Multiple Projects:**

**Production:**
```json
{
  "GEMINI_API_KEY": "production_key",
  "VITE_SITE_NAME": "Production Blog",
  "VITE_SITE_URL": "https://blog.example.com"
}
```

**Staging:**
```json
{
  "GEMINI_API_KEY": "staging_key",
  "VITE_SITE_NAME": "Staging Blog",
  "VITE_SITE_URL": "https://staging-blog.example.com"
}
```

---

## 🚀 Quick Setup untuk Project Baru

### **Step 1: Copy Template**
```bash
# Copy template file
cp env-vars-template.json env-vars-production.json

# Edit dengan values Anda
# (edit file dengan text editor)
```

### **Step 2: Setup di Cloudflare**
1. Buka Cloudflare Pages → Project → Settings → Environment variables
2. Buka file `env-vars-production.json`
3. Copy-paste variables satu per satu (atau gunakan auto-fill)

### **Step 3: Verify**
- Cek semua variables sudah ter-set
- Trigger deployment baru
- Cek build logs untuk memastikan env vars ter-load

---

## 💡 Tips & Tricks

### **1. Gunakan Text Editor dengan Multi-Cursor**
- VS Code: `Ctrl+Alt+Down` untuk multi-cursor
- Copy-paste lebih cepat dengan multi-cursor

### **2. Save Template di Password Manager**
- Simpan template di password manager
- Auto-fill saat setup project baru

### **3. Gunakan Spreadsheet**
- Buat spreadsheet dengan columns: Variable Name | Value | Environment
- Copy-paste dari spreadsheet ke Cloudflare

### **4. Browser Bookmarklet (Advanced)**
- Buat bookmarklet untuk auto-fill form
- Klik bookmark saat di halaman environment variables

---

## ⚠️ Catatan Penting

1. **Security:**
   - Jangan commit `env-vars-template.json` dengan real values ke GitHub
   - Gunakan `.gitignore` untuk file dengan real values
   - Template file sudah di-ignore di `.gitignore`

2. **API Limitations:**
   - Cloudflare Pages API untuk bulk set env vars mungkin terbatas
   - Metode manual masih paling reliable

3. **Best Practice:**
   - Simpan template untuk reuse
   - Dokumentasikan values yang digunakan
   - Gunakan naming convention yang konsisten

---

## 📚 Referensi

- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)
- [Cloudflare API Documentation](https://developers.cloudflare.com/api/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

---

**Rekomendasi: Gunakan Metode 1 (Copy-Paste Template) untuk setup cepat! 🚀**

