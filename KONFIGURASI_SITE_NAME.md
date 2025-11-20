# 📝 Konfigurasi Site Name

## 🎯 Perubahan: Default Site Name

**Sebelum:** Jika `VITE_SITE_NAME` kosong, default adalah `'KontenKit'`

**Sekarang:** Jika `VITE_SITE_NAME` kosong, default adalah **root domain** (dari `window.location.hostname`)

---

## 📍 Lokasi Kode

**File utama:** `src/composables/useSiteName.js`

```javascript
export function useSiteName() {
  const getDefaultSiteName = () => {
    if (typeof window !== 'undefined') {
      // Get root domain from current URL
      const hostname = window.location.hostname;
      // Remove 'www.' if present
      return hostname.replace(/^www\./, '');
    }
    // Fallback for SSR
    return 'Blog';
  };

  const envSiteName = import.meta.env.VITE_SITE_NAME;
  const siteName = envSiteName && envSiteName.trim() !== '' 
    ? envSiteName 
    : getDefaultSiteName();

  return { siteName };
}
```

---

## 🔧 Cara Menggunakan

### **Di Component:**

```vue
<script setup>
import { useSiteName } from '@/composables/useSiteName.js';

const { siteName } = useSiteName();
</script>

<template>
  <h1>{{ siteName }}</h1>
</template>
```

---

## 📋 Priority Order

1. **`VITE_SITE_NAME`** environment variable (jika di-set)
2. **Root domain** dari `window.location.hostname` (jika `VITE_SITE_NAME` kosong)
3. **`'Blog'`** (fallback untuk SSR)

---

## 🌐 Contoh

### **Contoh 1: VITE_SITE_NAME di-set**

```bash
# Cloudflare Pages Environment Variable
VITE_SITE_NAME=My Awesome Blog
```

**Result:** `siteName = "My Awesome Blog"`

### **Contoh 2: VITE_SITE_NAME kosong**

**Domain:** `https://example.com`

**Result:** `siteName = "example.com"`

**Domain:** `https://www.example.com`

**Result:** `siteName = "example.com"` (www. dihapus)

**Domain:** `https://bzone.pages.dev`

**Result:** `siteName = "bzone.pages.dev"`

### **Contoh 3: SSR (Server-Side Rendering)**

**Result:** `siteName = "Blog"` (fallback)

---

## 📁 File yang Menggunakan useSiteName

Semua file berikut sudah di-update untuk menggunakan `useSiteName()`:

- ✅ `src/components/layout/Navbar.vue`
- ✅ `src/components/layout/Footer.vue`
- ✅ `src/views/BlogIndexView.vue`
- ✅ `src/views/ArticleView.vue`
- ✅ `src/views/AboutView.vue`
- ✅ `src/views/CategoryIndexView.vue`
- ✅ `src/views/NicheSelectionView.vue`
- ✅ `src/views/DisclaimerView.vue`
- ✅ `src/views/TermsOfServiceView.vue`
- ✅ `src/views/PrivacyPolicyView.vue`

---

## 🔄 Migration dari Kode Lama

### **Sebelum:**

```javascript
const siteName = import.meta.env.VITE_SITE_NAME || 'KontenKit';
```

### **Sesudah:**

```javascript
import { useSiteName } from '@/composables/useSiteName.js';

const { siteName } = useSiteName();
```

---

## ✅ Keuntungan

1. ✅ **Otomatis** - Tidak perlu set `VITE_SITE_NAME` jika ingin menggunakan domain
2. ✅ **Dinamis** - Menggunakan domain aktual dari URL
3. ✅ **Konsisten** - Semua component menggunakan composable yang sama
4. ✅ **Mudah diubah** - Cukup edit 1 file (`useSiteName.js`) untuk mengubah logic

---

## 🛠️ Customization

### **Ubah Fallback untuk SSR:**

Edit `src/composables/useSiteName.js`:

```javascript
// Fallback for SSR
return 'Your Custom Name'; // Ganti 'Blog' dengan nama custom
```

### **Ubah Logic Root Domain:**

```javascript
const getDefaultSiteName = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    // Custom logic di sini
    return hostname.replace(/^www\./, '').toUpperCase();
  }
  return 'Blog';
};
```

---

## 📝 Catatan

- **Root domain** diambil dari `window.location.hostname`
- **`www.`** otomatis dihapus jika ada
- **SSR fallback** adalah `'Blog'` (bisa diubah)
- **Environment variable** `VITE_SITE_NAME` tetap bisa digunakan untuk override

---

**Sekarang default site name adalah root domain, bukan 'KontenKit'! 🎉**

