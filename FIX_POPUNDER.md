# 🛡️ Fix: Hapus Iklan Popunder

## ⚠️ Kemungkinan Sumber Popunder

**Script dari `compassionatespreadinquire.com`** MUNGKIN menjadi sumber popunder, meskipun Anda pasang sebagai banner.

**Catatan:** Script eksternal (`invoke.js`) bisa saja memiliki behavior popunder tergantung setting di dashboard ad network.

---

## 🚀 Solusi Cepat

### **Opsi 1: Hapus Semua Script Eksternal (PALING AMAN)**

**Kosongkan file-file berikut:**

1. **`public/ads-content/homepage.html`** - Kosongkan atau hapus isinya
2. **`public/ads-content/in-article.html`** - Kosongkan atau hapus isinya
3. **`public/ads-content/under-nav.html`** - Kosongkan atau hapus isinya
4. **`public/ads-content/sidebar.html`** - Kosongkan atau hapus isinya

**Cara cepat:**
```bash
# Windows PowerShell
echo "" > public/ads-content/homepage.html
echo "" > public/ads-content/in-article.html
echo "" > public/ads-content/under-nav.html
echo "" > public/ads-content/sidebar.html
```

### **Opsi 2: Disable Semua Ads via Config**

**Edit `src/adConfig.js`:**

```javascript
export const adSlots = {
  homepage: {
    enabled: false,  // ← Disable
  },
  inArticle: {
    enabled: false,  // ← Disable
  },
  sidebar: {
    enabled: false,  // ← Disable
  },
  underNav: {
    enabled: false,  // ← Disable
  },
  floating: {
    enabled: false,  // ← Disable
  },
};
```

### **Opsi 3: Hapus Script Floating Ad**

**Hapus script di `index.html` (line 40-82):**

Hapus seluruh block:
```javascript
<script type="text/javascript">
  (function() {
    // ... seluruh kode floating ad
  })();
</script>
```

**Hapus function di `src/App.vue` (line 26-87):**

Hapus function `showFloatingAd` dan pemanggilannya di `onMounted`.

---

## 📋 Checklist Pembersihan

- [ ] Kosongkan `public/ads-content/homepage.html`
- [ ] Kosongkan `public/ads-content/in-article.html`
- [ ] Kosongkan `public/ads-content/under-nav.html`
- [ ] Kosongkan `public/ads-content/sidebar.html`
- [ ] Disable ads di `src/adConfig.js` (opsional)
- [ ] Hapus script floating ad di `index.html` (opsional)
- [ ] Test website - pastikan tidak ada popunder
- [ ] Commit dan push perubahan

---

## ✅ Setelah Pembersihan

**Test:**
1. Buka website di browser
2. Cek apakah masih ada popunder
3. Cek console browser untuk error
4. Test di beberapa halaman

**Jika masih ada popunder:**
- Cek browser extension (bisa inject popunder)
- Cek malware di komputer
- Clear browser cache
- Test di browser lain/incognito

---

**Lakukan pembersihan sekarang untuk menghilangkan popunder! 🛡️**

