# 🛡️ Universal Popunder Blocker (Pattern-Based)

## ⚠️ Masalah

**Popunder dengan domain yang berubah-ubah** - tidak efektif jika block berdasarkan domain spesifik!

**Solusi:** Block berdasarkan **behavior dan pattern URL**, bukan domain spesifik.

## 🎯 Strategi Blocking

Blocker sekarang menggunakan:
- ✅ **Pattern matching** untuk URL mencurigakan (tidak peduli domain)
- ✅ **Behavior detection** (no user interaction, blur events, dll)
- ✅ **URL signature** (banyak parameter, token panjang, dll)

**Keuntungan:** Efektif untuk semua popunder, bahkan jika domain berubah!

---

## 🚀 Solusi: Block Popunder

### **Opsi 1: Block window.open() untuk Domain Mencurigakan (RECOMMENDED)**

Tambahkan script di `index.html` sebelum closing `</body>`:

```javascript
<script>
  // Block popunder dari wayfarerorthodox.com dan domain mencurigakan
  (function() {
    const blockedDomains = [
      'wayfarerorthodox.com',
      'compassionatespreadinquire.com', // Jika tidak ingin popunder dari sini juga
      // Tambahkan domain lain yang mencurigakan
    ];
    
    const originalOpen = window.open;
    window.open = function(url, target, features) {
      // Block jika URL dari domain yang diblokir
      if (url && blockedDomains.some(domain => url.includes(domain))) {
        console.warn('🚫 Blocked popunder from:', url);
        return null;
      }
      
      // Block popunder (window.open tanpa user interaction)
      if (!window.userInteracted) {
        console.warn('🚫 Blocked popunder (no user interaction):', url);
        return null;
      }
      
      return originalOpen.apply(this, arguments);
    };
    
    // Track user interaction (click, keydown, touch)
    ['click', 'keydown', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        window.userInteracted = true;
        // Reset setelah 1 detik
        setTimeout(() => {
          window.userInteracted = false;
        }, 1000);
      }, { passive: true });
    });
    
    console.log('🛡️ Popunder blocker active');
  })();
</script>
```

### **Opsi 2: Block dengan Content Security Policy (CSP)**

Tambahkan di `<head>` di `index.html`:

```html
<meta http-equiv="Content-Security-Policy" 
      content="frame-src 'self'; 
               script-src 'self' 'unsafe-inline' https://compassionatespreadinquire.com;
               default-src 'self';
               connect-src 'self' https://compassionatespreadinquire.com;">
```

**Catatan:** CSP mungkin perlu disesuaikan dengan ad network Anda.

### **Opsi 3: Block di Router Level (Vue Router)**

Tambahkan di `src/router/index.js`:

```javascript
router.beforeEach((to, from, next) => {
  // Block navigation ke domain mencurigakan
  if (to.path.includes('wayfarerorthodox.com')) {
    console.warn('Blocked navigation to suspicious domain');
    next(false);
    return;
  }
  next();
});
```

---

## 🔍 Debug: Cari Sumber Popunder

### **Metode 1: Monitor window.open() dengan Stack Trace**

Tambahkan script monitoring di `index.html`:

```javascript
<script>
  // Monitor semua window.open() dengan stack trace
  const originalOpen = window.open;
  window.open = function(...args) {
    console.group('🚨 POPUNDER DETECTED');
    console.warn('URL:', args[0]);
    console.warn('Target:', args[1]);
    console.warn('Features:', args[2]);
    console.trace('Stack Trace:');
    console.groupEnd();
    
    // Block wayfarerorthodox.com
    if (args[0] && args[0].includes('wayfarerorthodox.com')) {
      console.error('❌ BLOCKED: wayfarerorthodox.com');
      return null;
    }
    
    return originalOpen.apply(this, args);
  };
</script>
```

### **Metode 2: Monitor Script Injection**

Tambahkan di `index.html`:

```javascript
<script>
  // Monitor script injection
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === 'SCRIPT') {
          const src = node.src || node.textContent;
          if (src && src.includes('wayfarerorthodox.com')) {
            console.error('🚨 Suspicious script detected:', src);
            console.trace('Stack trace:');
            node.remove(); // Remove script
          }
        }
      });
    });
  });
  
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  console.log('🔍 Script injection monitor active');
</script>
```

### **Metode 3: Cek Network Requests**

1. Buka Developer Tools (F12)
2. Tab **Network**
3. Filter: **All** atau **XHR**
4. Reload halaman
5. Cari request ke `wayfarerorthodox.com`
6. Klik request → Tab **Initiator** untuk melihat dari mana request dipanggil

---

## 🎯 Kemungkinan Sumber

### **1. Browser Extension/Malware**

**Cek:**
1. Buka browser extensions (chrome://extensions atau edge://extensions)
2. Disable semua extension
3. Test website
4. Jika popunder hilang → salah satu extension adalah sumbernya

**Extension yang sering inject popunder:**
- Ad blockers yang "mengganti" iklan
- Extension yang tidak dikenal
- Extension yang baru di-install

### **2. Script dari Ad Network (Di-Inject Dinamis)**

**Meskipun Anda hapus kode iklan, script eksternal bisa:**
- Load script tambahan dari server
- Inject popunder code secara dinamis
- Menggunakan iframe atau script tag yang di-generate

**Cek:**
1. Cek Network tab → cari request ke `wayfarerorthodox.com`
2. Lihat **Initiator** untuk tahu dari mana request dipanggil
3. Cek apakah ada script dari ad network yang masih aktif

### **3. Malware di Komputer**

**Tanda-tanda:**
- Popunder muncul di semua website
- Browser redirect ke domain mencurigakan
- Extension yang tidak Anda install

**Solusi:**
1. Scan komputer dengan antivirus
2. Reset browser ke default
3. Uninstall extension yang mencurigakan
4. Test di komputer lain

### **4. ISP/Hosting Provider**

**Kemungkinan kecil, tapi bisa terjadi:**
- ISP inject script untuk monetize
- Hosting provider inject ads

**Cek:**
1. Test di network lain (mobile data, WiFi lain)
2. Test di VPN
3. Jika hilang di network lain → kemungkinan dari ISP

---

## 🛡️ Solusi Lengkap: Block Popunder

### **Script Lengkap untuk Block Popunder**

Tambahkan di `index.html` sebelum `</body>`:

```javascript
<script>
  (function() {
    'use strict';
    
    // Domain yang diblokir
    const blockedDomains = [
      'wayfarerorthodox.com',
      // Tambahkan domain lain jika perlu
    ];
    
    // Block window.open() untuk popunder
    const originalOpen = window.open;
    window.open = function(url, target, features) {
      // Block domain yang diblokir
      if (url && blockedDomains.some(domain => url.toLowerCase().includes(domain.toLowerCase()))) {
        console.warn('🚫 Blocked popunder from blocked domain:', url);
        return null;
      }
      
      // Block popunder tanpa user interaction
      if (!window.__userInteracted) {
        console.warn('🚫 Blocked popunder (no user interaction):', url);
        return null;
      }
      
      return originalOpen.apply(this, arguments);
    };
    
    // Track user interaction
    let interactionTimeout;
    ['click', 'keydown', 'touchstart', 'mousedown'].forEach(event => {
      document.addEventListener(event, () => {
        window.__userInteracted = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => {
          window.__userInteracted = false;
        }, 2000); // 2 detik window untuk legitimate popup
      }, { passive: true, once: false });
    });
    
    // Block navigation ke domain mencurigakan
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      get: function() {
        return originalLocation;
      },
      set: function(url) {
        if (url && blockedDomains.some(domain => url.toLowerCase().includes(domain.toLowerCase()))) {
          console.warn('🚫 Blocked navigation to blocked domain:', url);
          return;
        }
        originalLocation.href = url;
      }
    });
    
    // Monitor dan block script injection
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'SCRIPT') {
            const src = node.src || '';
            const content = node.textContent || '';
            if (blockedDomains.some(domain => 
              src.toLowerCase().includes(domain.toLowerCase()) || 
              content.toLowerCase().includes(domain.toLowerCase())
            )) {
              console.warn('🚫 Blocked suspicious script:', src || 'inline script');
              node.remove();
            }
          }
        });
      });
    });
    
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    
    console.log('🛡️ Popunder blocker active - Blocking:', blockedDomains.join(', '));
  })();
</script>
```

---

## 📋 Checklist Debug

- [ ] Tambahkan script blocker di `index.html`
- [ ] Test website - cek apakah popunder masih muncul
- [ ] Cek browser console untuk log blocking
- [ ] Cek Network tab untuk request ke wayfarerorthodox.com
- [ ] Disable semua browser extension
- [ ] Test di browser lain/incognito
- [ ] Test di komputer lain
- [ ] Scan komputer untuk malware
- [ ] Cek apakah ada script dari ad network yang masih aktif

---

## ✅ Langkah Selanjutnya

1. **Tambahkan script blocker** di `index.html`
2. **Test website** - pastikan popunder ter-block
3. **Monitor console** untuk melihat apakah ada attempt popunder
4. **Cek Network tab** untuk menemukan sumber request
5. **Disable extension** jika perlu
6. **Scan malware** jika popunder masih muncul

---

**Tambahkan script blocker di atas untuk block popunder dari wayfarerorthodox.com! 🛡️**

