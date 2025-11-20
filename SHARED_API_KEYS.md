# 🔑 Shared API Keys untuk Multiple Projects

## 🎯 Masalah

Jika Anda punya multiple projects di Cloudflare Pages dan ingin menggunakan API keys yang sama, update manual satu per satu sangat merepotkan!

## ✅ Solusi: Sync API Keys ke Multiple Projects

Sekarang Anda bisa **update 1 file config** dan sync ke semua projects sekaligus!

---

## 🚀 Cara Setup

### **Langkah 1: Install Dependencies**

```bash
npm install axios dotenv
```

### **Langkah 2: Dapatkan Cloudflare API Token**

1. Buka: https://dash.cloudflare.com/profile/api-tokens
2. Create Token → Custom token
3. Permissions:
   - **Account** → **Cloudflare Pages** → **Edit**
4. Account Resources: Select your account
5. Create Token
6. **Copy token** (hanya muncul sekali!)

### **Langkah 3: Dapatkan Account ID**

1. Cloudflare Dashboard → Right sidebar → **Account ID**
2. Copy Account ID

### **Langkah 4: Buat Config File**

1. Copy `api-keys-config.example.json` menjadi `api-keys-config.json`:
   ```bash
   cp api-keys-config.example.json api-keys-config.json
   ```

2. Edit `api-keys-config.json` dengan API keys dan project names Anda:
   ```json
   {
     "apiKeys": {
       "GEMINI_API_KEY": "AIzaSy...your_key_here",
       "PEXELS_API_KEY": "your_pexels_key",
       "BACKDATE_DAYS": "3",
       "FUTURE_SCHEDULE_DAYS": "30",
       "NODE_VERSION": "20"
     },
     "projects": [
       "bzone",
       "bzone-staging",
       "blog-tech",
       "blog-food"
     ]
   }
   ```

### **Langkah 5: Set Environment Variables**

```bash
# Windows PowerShell
$env:CLOUDFLARE_API_TOKEN="your_token_here"
$env:CLOUDFLARE_ACCOUNT_ID="your_account_id"

# Windows CMD
set CLOUDFLARE_API_TOKEN=your_token_here
set CLOUDFLARE_ACCOUNT_ID=your_account_id

# Linux/Mac
export CLOUDFLARE_API_TOKEN="your_token_here"
export CLOUDFLARE_ACCOUNT_ID="your_account_id"
```

**Atau buat file `.env` (jangan commit ke GitHub!):**
```
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id
```

### **Langkah 6: Jalankan Script**

```bash
node scripts/sync-api-keys.js
```

Script akan:
- ✅ Sync semua API keys ke semua projects yang terdaftar
- ✅ Update environment variables di setiap project
- ✅ Menampilkan progress dan hasil

---

## 📋 Contoh Penggunaan

### **Update API Key untuk Semua Projects**

1. **Edit `api-keys-config.json`:**
   ```json
   {
     "apiKeys": {
       "GEMINI_API_KEY": "AIzaSy...NEW_KEY_HERE"
     },
     "projects": [
       "bzone",
       "bzone-staging",
       "blog-tech"
     ]
   }
   ```

2. **Jalankan script:**
   ```bash
   node scripts/sync-api-keys.js
   ```

3. **Hasil:**
   ```
   🚀 Starting API keys sync...
   📋 Projects to sync: 3
   🔑 API keys to sync: 1
   
   📦 Syncing API keys to project: bzone
     ✅ GEMINI_API_KEY synced successfully
   
   📦 Syncing API keys to project: bzone-staging
     ✅ GEMINI_API_KEY synced successfully
   
   📦 Syncing API keys to project: blog-tech
     ✅ GEMINI_API_KEY synced successfully
   
   ✅ Sync completed!
   ✅ Success: 3
   ❌ Failed: 0
   ```

### **Add Project Baru**

1. **Edit `api-keys-config.json`:**
   ```json
   {
     "projects": [
       "bzone",
       "bzone-staging",
       "blog-tech",
       "blog-food"  // ← Project baru
     ]
   }
   ```

2. **Jalankan script** - API keys akan otomatis di-sync ke project baru!

---

## 🔄 Workflow Update API Key

### **Cara Update API Key untuk Semua Projects:**

1. **Edit `api-keys-config.json`** dengan API key baru
2. **Jalankan script:**
   ```bash
   node scripts/sync-api-keys.js
   ```
3. **Selesai!** Semua projects sudah ter-update

**Tidak perlu:**
- ❌ Login ke Cloudflare dashboard
- ❌ Update manual satu per satu
- ❌ Copy-paste berulang kali

---

## 💡 Tips & Best Practices

### **1. Backup Config File**

Simpan backup `api-keys-config.json`:
```bash
cp api-keys-config.json api-keys-config.backup.json
```

### **2. Version Control (Tanpa API Keys)**

**JANGAN commit `api-keys-config.json` dengan real API keys!**

Buat `api-keys-config.example.json` (tanpa real keys) dan commit:
```bash
# .gitignore sudah include env-vars-*.json
# Tapi pastikan api-keys-config.json juga di-ignore
```

### **3. Multiple Config Files**

Jika punya multiple sets of API keys:

**`api-keys-config-production.json`:**
```json
{
  "apiKeys": {
    "GEMINI_API_KEY": "production_key"
  },
  "projects": ["bzone-production"]
}
```

**`api-keys-config-staging.json`:**
```json
{
  "apiKeys": {
    "GEMINI_API_KEY": "staging_key"
  },
  "projects": ["bzone-staging"]
}
```

**Modifikasi script untuk support multiple config files.**

### **4. Selective Sync**

Jika hanya ingin sync beberapa variables:

Edit script atau buat config terpisah:
```json
{
  "apiKeys": {
    "GEMINI_API_KEY": "new_key"  // Hanya ini yang di-sync
  },
  "projects": ["bzone", "bzone-staging"]
}
```

---

## ⚠️ Catatan Penting

### **1. Security**

- ✅ **JANGAN commit** `api-keys-config.json` dengan real API keys ke GitHub
- ✅ Simpan di local atau password manager
- ✅ Gunakan `.env` untuk API token (sudah di `.gitignore`)

### **2. API Limitations**

- ⚠️ Cloudflare Pages API format mungkin berbeda
- ⚠️ Script mungkin perlu disesuaikan dengan API terbaru
- ⚠️ Rate limits mungkin berlaku

### **3. Manual Fallback**

Jika script tidak bekerja:
- Gunakan Cloudflare Dashboard untuk update manual
- Atau gunakan Cloudflare API langsung
- Atau gunakan Wrangler CLI

---

## 🔍 Troubleshooting

### **Problem: "CLOUDFLARE_API_TOKEN tidak ditemukan"**

**Solusi:**
1. Pastikan environment variable sudah diset
2. Atau buat file `.env` dengan token
3. Pastikan script menggunakan `dotenv/config`

### **Problem: "Failed to sync"**

**Solusi:**
1. Cek API token permissions (harus ada Cloudflare Pages.Edit)
2. Cek Account ID benar
3. Cek project name benar (case-sensitive)
4. Cek Cloudflare API documentation untuk format terbaru

### **Problem: "Project not found"**

**Solusi:**
1. Pastikan project name benar (case-sensitive)
2. Pastikan project ada di account yang sama
3. Cek di Cloudflare Dashboard

---

## 📚 Alternatif: Manual Sync (Jika Script Tidak Bekerja)

### **Metode 1: Copy-Paste dari Template**

1. Buka `env-vars-template.json`
2. Edit dengan API keys baru
3. Copy-paste ke setiap project di Cloudflare Dashboard

### **Metode 2: Cloudflare Dashboard Bulk Update**

1. Buka project pertama → Settings → Environment variables
2. Screenshot atau copy semua values
3. Paste ke project lain (lebih cepat dari input ulang)

### **Metode 3: Wrangler CLI (Advanced)**

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Set env var untuk satu project
wrangler pages project update bzone --env-var GEMINI_API_KEY="your_key"
```

---

## ✅ Checklist

- [ ] Install dependencies (`axios`, `dotenv`)
- [ ] Dapatkan Cloudflare API Token
- [ ] Dapatkan Account ID
- [ ] Buat `api-keys-config.json` dari example
- [ ] Set environment variables (API_TOKEN, ACCOUNT_ID)
- [ ] Test script dengan 1 project dulu
- [ ] Sync ke semua projects
- [ ] Verifikasi di Cloudflare Dashboard

---

## 🎯 Kesimpulan

**Sekarang:**
- ✅ Update 1 file config → sync ke semua projects
- ✅ Tidak perlu update manual satu per satu
- ✅ Lebih cepat dan efisien
- ✅ Bisa automate dengan script

**Rekomendasi:**
- Gunakan script untuk bulk update
- Simpan config file dengan aman (tidak di GitHub)
- Backup config file sebelum update besar

---

**Update API key sekarang lebih mudah! 🚀**

