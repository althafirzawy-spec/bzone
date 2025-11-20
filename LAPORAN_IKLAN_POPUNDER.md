# 🔍 Laporan: Deteksi Iklan Popunder

## ⚠️ Temuan

Setelah melakukan scan menyeluruh, ditemukan **script eksternal** yang **MUNGKIN** menjadi sumber iklan popunder.

**Catatan:** Script dari `compassionatespreadinquire.com` adalah iklan banner yang Anda pasang. Tapi script eksternal (`invoke.js`) bisa saja mengandung behavior popunder yang tidak terlihat di source code.

---

## 🎯 Sumber Iklan Popunder

### **Script Eksternal yang Ditemukan:**

**1. Script dari `compassionatespreadinquire.com`**

Ditemukan di file-file berikut:
- `public/ads-content/homepage.html`
- `public/ads-content/in-article.html`
- `public/ads-content/under-nav.html`

**Kode yang ditemukan:**
```html
<script type="text/javascript">
	atOptions = {
		'key' : '91a39ac0a51a598defad8593abe571c2',
		'format' : 'iframe',
		'height' : 250,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//compassionatespreadinquire.com/91a39ac0a51a598defad8593abe571c2/invoke.js"></script>
```

**⚠️ Script eksternal ini (`invoke.js`) MUNGKIN mengandung kode popunder yang di-execute secara dinamis, meskipun Anda pasang sebagai banner.**

**Catatan:** Beberapa ad network menggunakan script yang sama untuk banner dan popunder, tergantung setting di dashboard mereka.

**2. Script dari `histats.com` (Counter/Tracking)**

Ditemukan di:
- `public/ads-content/sidebar.html`

**Kode yang ditemukan:**
```html
<!-- Histats.com  START (html only)-->
<a href="/" alt="page hit counter" target="_blank" >
<embed src="//s10.histats.com/24.swf" ... />
<img  src="//sstatic1.histats.com/0.gif?4879372&101" alt="histats.com" border="0">
<!-- Histats.com  END  -->
```

**Catatan:** Histats biasanya hanya untuk counter, tapi bisa juga mengandung tracking/ads.

---

## 📍 Lokasi File yang Menggunakan Script Eksternal

### **File Ads Content:**

1. **`public/ads-content/homepage.html`** ✅ Ditemukan script eksternal
2. **`public/ads-content/in-article.html`** ✅ Ditemukan script eksternal
3. **`public/ads-content/under-nav.html`** ✅ Ditemukan script eksternal
4. **`public/ads-content/sidebar.html`** ✅ Ditemukan Histats counter
5. **`public/ads-content/floating.html`** ⚠️ File kosong (tidak ada script)

### **File yang Load Ads:**

1. **`index.html`** - Load `floating.html` (line 40-82)
2. **`src/App.vue`** - Load `floating.html` (line 26-87)
3. **`src/components/ads/FloatingAd.vue`** - Load `floating.html` (line 19-44)
4. **`src/components/ads/AdRenderer.vue`** - Load semua file ads-content (line 33-50)

---

## 🔧 Cara Menghapus/Menonaktifkan Iklan Popunder

### **Opsi 1: Hapus Script Eksternal (RECOMMENDED)**

**Hapus atau kosongkan file-file berikut:**

1. **`public/ads-content/homepage.html`** - Hapus atau kosongkan
2. **`public/ads-content/in-article.html`** - Hapus atau kosongkan
3. **`public/ads-content/under-nav.html`** - Hapus atau kosongkan
4. **`public/ads-content/sidebar.html`** - Hapus atau kosongkan (jika tidak perlu counter)

**Atau ganti dengan kode iklan yang aman (contoh: Google AdSense):**

```html
<!-- Contoh: Google AdSense (aman, tidak ada popunder) -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### **Opsi 2: Disable Ads via Config**

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

**Atau hapus script di `index.html` dan `src/App.vue`:**

- Hapus script floating ad di `index.html` (line 40-82)
- Hapus function `showFloatingAd` di `src/App.vue` (line 26-87)

### **Opsi 3: Ganti dengan Ad Network yang Aman**

**Rekomendasi Ad Networks yang Aman (tidak ada popunder):**
- ✅ Google AdSense
- ✅ Media.net
- ✅ PropellerAds (dengan setting yang benar)
- ✅ Ezoic
- ✅ AdThrive

**JANGAN gunakan:**
- ❌ Ad networks yang tidak dikenal
- ❌ Script dari domain yang mencurigakan
- ❌ Script yang formatnya `invoke.js` atau sejenisnya

---

## 🛡️ Cara Mencegah Popunder di Masa Depan

### **1. Validasi Script Sebelum Load**

Modifikasi `AdRenderer.vue` untuk validasi:

```javascript
// Cek apakah script dari domain yang diizinkan
const allowedDomains = [
  'googlesyndication.com',
  'googleadservices.com',
  'media.net',
  // tambahkan domain yang diizinkan
];

function isScriptAllowed(scriptSrc) {
  if (!scriptSrc) return false;
  return allowedDomains.some(domain => scriptSrc.includes(domain));
}
```

### **2. Sandbox iframe untuk Ads**

Gunakan iframe dengan sandbox untuk isolate ads:

```html
<iframe 
  src="about:blank" 
  sandbox="allow-scripts allow-same-origin"
  style="width: 300px; height: 250px;">
</iframe>
```

### **3. Content Security Policy (CSP)**

Tambahkan CSP header untuk block script eksternal yang tidak diizinkan:

```html
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://googlesyndication.com https://pagead2.googlesyndication.com;">
```

---

## 🔍 Checklist Pembersihan

- [ ] Hapus script dari `compassionatespreadinquire.com`
- [ ] Hapus atau ganti script di `homepage.html`
- [ ] Hapus atau ganti script di `in-article.html`
- [ ] Hapus atau ganti script di `under-nav.html`
- [ ] Hapus atau ganti script di `sidebar.html` (jika tidak perlu)
- [ ] Test website untuk memastikan tidak ada popunder
- [ ] Ganti dengan ad network yang aman (jika ingin tetap monetize)
- [ ] Atau disable semua ads via `adConfig.js`

---

## 📝 Rekomendasi

### **Jika Tidak Ingin Monetize:**
1. **Disable semua ads** via `adConfig.js`
2. **Hapus script** di `index.html` dan `src/App.vue`
3. **Kosongkan semua file** di `public/ads-content/`

### **Jika Ingin Monetize dengan Aman:**
1. **Ganti dengan Google AdSense** atau ad network yang terpercaya
2. **Hapus semua script** dari `compassionatespreadinquire.com`
3. **Validasi script** sebelum load (tambahkan whitelist domain)
4. **Gunakan CSP** untuk security

---

## ⚠️ Catatan Penting

1. **Script eksternal** dari domain yang tidak dikenal **SANGAT BERISIKO**
2. Script tersebut bisa **berubah kapan saja** tanpa sepengetahuan Anda
3. Popunder biasanya **di-execute secara dinamis** oleh script eksternal
4. **Browser extension** atau **malware** juga bisa inject popunder (cek browser Anda)

---

## 🔧 Langkah Selanjutnya

1. **Hapus script eksternal** yang mencurigakan
2. **Test website** untuk memastikan popunder hilang
3. **Ganti dengan ad network yang aman** (jika perlu)
4. **Monitor** website secara berkala

---

**Saran: Hapus semua script dari `compassionatespreadinquire.com` dan ganti dengan ad network yang terpercaya! 🛡️**

