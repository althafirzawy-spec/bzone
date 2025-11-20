# 🔍 Debug: Mencari Sumber Popunder yang Sebenarnya

## ⚠️ Catatan Penting

Jika Anda melihat popunder tapi tidak pernah memasang kode popunder, kemungkinan:

1. **Script eksternal** yang di-load mengandung popunder (meskipun Anda pasang sebagai banner)
2. **Browser extension** atau malware yang inject popunder
3. **Script yang di-execute secara dinamis** oleh ad network

---

## 🔍 Cara Debug Popunder

### **Metode 1: Cek Browser Console**

1. Buka website di browser
2. Buka Developer Tools (F12)
3. Tab **Console**
4. Cari error atau warning yang terkait dengan popunder
5. Tab **Network** - Cek request ke domain yang mencurigakan

### **Metode 2: Monitor window.open()**

Tambahkan script monitoring di `index.html` (sementara untuk debug):

```javascript
// Tambahkan di index.html sebelum closing </body>
<script>
  // Monitor semua window.open()
  const originalOpen = window.open;
  window.open = function(...args) {
    console.warn('🚨 window.open() called:', args);
    console.trace('Stack trace:');
    return originalOpen.apply(this, args);
  };
  
  // Monitor addEventListener untuk blur/focus
  const originalAddEventListener = window.addEventListener;
  window.addEventListener = function(type, listener, options) {
    if (type === 'blur' || type === 'focus' || type === 'beforeunload') {
      console.warn('🚨 Event listener added:', type, listener);
      console.trace('Stack trace:');
    }
    return originalAddEventListener.apply(this, arguments);
  };
</script>
```

### **Metode 3: Cek Script yang Di-Load**

1. Buka Developer Tools → Network tab
2. Filter: **JS** (JavaScript files)
3. Reload halaman
4. Cek semua script yang di-load
5. Cari script dari domain yang mencurigakan

### **Metode 4: Test di Browser Lain/Incognito**

1. Test di browser lain (Chrome, Firefox, Edge)
2. Test di mode incognito/private
3. Test tanpa extension (disable semua extension)
4. Jika popunder hilang di incognito → kemungkinan extension/malware

---

## 🎯 Kemungkinan Sumber Popunder

### **1. Script Eksternal dari Ad Network**

**Meskipun Anda pasang sebagai banner, script eksternal bisa:**
- Mengubah behavior menjadi popunder
- Inject kode popunder secara dinamis
- Menggunakan event listener untuk trigger popunder

**Cek:**
- Script dari `compassionatespreadinquire.com/invoke.js`
- Script lain yang di-load dari ad network

### **2. Browser Extension**

**Extension yang bisa inject popunder:**
- Ad blockers yang "mengganti" iklan
- Extension yang tidak dikenal
- Malware extension

**Cek:**
1. Buka browser extensions
2. Disable semua extension
3. Test website
4. Jika popunder hilang → salah satu extension adalah sumbernya

### **3. Malware di Komputer**

**Malware bisa:**
- Inject script ke semua website
- Modify browser behavior
- Add popunder ke semua website

**Cek:**
- Scan komputer dengan antivirus
- Test di komputer lain
- Test di browser lain

### **4. Script yang Di-Load Secara Dinamis**

**Script yang di-execute oleh AdRenderer bisa:**
- Load script tambahan
- Inject popunder code
- Modify window behavior

---

## 🛡️ Solusi: Block Popunder

### **Opsi 1: Sandbox Script Eksternal**

Modifikasi `AdRenderer.vue` untuk sandbox script:

```vue
<template>
  <!-- Gunakan iframe untuk isolate ads -->
  <iframe 
    v-if="htmlContent" 
    :srcdoc="htmlContent"
    sandbox="allow-scripts allow-same-origin"
    class="ad-renderer-wrapper"
    style="width: 100%; height: 250px; border: none;"
  ></iframe>
</template>
```

**Keuntungan:**
- ✅ Script tidak bisa akses parent window
- ✅ Tidak bisa trigger popunder
- ✅ Isolated dari website utama

**Kekurangan:**
- ⚠️ Beberapa ad network mungkin tidak bekerja di iframe
- ⚠️ Perlu test dengan ad network Anda

### **Opsi 2: Content Security Policy (CSP)**

Tambahkan CSP header untuk block popunder:

```html
<!-- Di index.html <head> -->
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' https://compassionatespreadinquire.com; 
               frame-ancestors 'self';
               base-uri 'self';">
```

### **Opsi 3: Block window.open() untuk Popunder**

Tambahkan script di `index.html`:

```javascript
// Block popunder (window.open di belakang)
(function() {
  const originalOpen = window.open;
  window.open = function(url, target, features) {
    // Block jika tidak ada user interaction
    if (!window.userInteracted) {
      console.warn('Blocked popunder:', url);
      return null;
    }
    return originalOpen.apply(this, arguments);
  };
  
  // Track user interaction
  ['click', 'keydown', 'touchstart'].forEach(event => {
    document.addEventListener(event, () => {
      window.userInteracted = true;
      setTimeout(() => {
        window.userInteracted = false;
      }, 1000);
    }, { once: true });
  });
})();
```

---

## 📋 Checklist Debug

- [ ] Cek browser console untuk error/warning
- [ ] Monitor window.open() dengan script di atas
- [ ] Cek Network tab untuk script yang di-load
- [ ] Test di browser lain/incognito
- [ ] Disable semua browser extension
- [ ] Scan komputer untuk malware
- [ ] Test di komputer lain
- [ ] Cek script dari compassionatespreadinquire.com/invoke.js

---

## 💡 Rekomendasi

### **Jika Popunder dari Script Eksternal:**

1. **Kontak Ad Network** - Tanyakan apakah mereka support popunder
2. **Ganti Ad Network** - Gunakan ad network yang tidak menggunakan popunder
3. **Sandbox Script** - Gunakan iframe untuk isolate ads
4. **Block Popunder** - Tambahkan script untuk block window.open()

### **Jika Popunder dari Browser/Extension:**

1. **Disable Extension** yang mencurigakan
2. **Scan Malware** di komputer
3. **Reset Browser** ke default settings
4. **Ganti Browser** jika perlu

---

## 🔧 Script Monitoring (Temporary)

Tambahkan script ini di `index.html` untuk monitor popunder:

```javascript
<script>
  // Monitor popunder
  console.log('🔍 Popunder Monitor Active');
  
  // Monitor window.open()
  const originalOpen = window.open;
  window.open = function(...args) {
    console.warn('🚨 POPUNDER DETECTED:', {
      url: args[0],
      target: args[1],
      features: args[2],
      stack: new Error().stack
    });
    return originalOpen.apply(this, args);
  };
  
  // Monitor blur/focus events (popunder trigger)
  window.addEventListener('blur', () => {
    console.warn('🚨 Window blur detected - possible popunder trigger');
  });
</script>
```

---

**Gunakan script monitoring di atas untuk menemukan sumber popunder yang sebenarnya! 🔍**

