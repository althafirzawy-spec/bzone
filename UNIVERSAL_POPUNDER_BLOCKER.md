# 🛡️ Universal Popunder Blocker (Pattern-Based)

## 🎯 Konsep

Karena **domain popunder berubah-ubah**, blocker sekarang menggunakan **pattern-based detection** bukan domain-specific blocking.

---

## ✅ Fitur Blocker

### **1. Pattern-Based URL Detection**

Block URL berdasarkan pattern, bukan domain:
- `/api/users?token=` - Pattern popunder tracking
- `token=` dengan panjang >50 chars
- URL dengan banyak parameter (5+ `&`)
- UUID dan hash panjang
- URL sangat panjang (>500 chars) dengan banyak parameter

**Keuntungan:** Block semua popunder dengan pattern sama, meskipun domain berbeda!

### **2. Behavior-Based Detection**

Block berdasarkan behavior popunder:
- ❌ **No user interaction** - Block `window.open()` tanpa user click
- ❌ **Blur events** - Block popunder yang trigger saat window blur
- ❌ **Delayed trigger** - Block popunder yang muncul >2 detik setelah interaction
- ❌ **Suspicious timing** - Block popunder yang tidak terkait dengan user action

### **3. Script Injection Monitoring**

Monitor dan block script yang di-inject:
- Block script dengan URL mencurigakan
- Block script dengan `window.open()` tanpa proper checks
- Monitor semua script yang di-inject ke DOM

---

## 📋 Pattern yang Diblokir

```javascript
const suspiciousPatterns = [
  /\/api\/users\?token=/i,        // Pattern /api/users?token=
  /token=[^&]{50,}/i,              // Token panjang (>50 chars)
  /token=.*&referer=/i,            // Token + referer
  /referer=.*&.*&.*&/i,            // Banyak parameter (3+ &)
  /uuid=[a-f0-9-]{36}/i,           // UUID
  /shu=[a-f0-9]{100,}/i,           // Hash panjang
  /\?.*&.*&.*&.*&.*&/i,           // 5+ parameter
];
```

**Plus:**
- URL panjang (>500 chars) dengan banyak parameter (>10 `&`)

---

## 🔧 Cara Kerja

### **Flow Blocking:**

1. **User Interaction Check**
   - Block jika tidak ada user click/keydown/touch
   - Allow jika ada user interaction (dalam 2 detik)

2. **Pattern Matching**
   - Cek URL dengan semua pattern mencurigakan
   - Block jika match dengan pattern apapun

3. **Behavior Check**
   - Block jika trigger saat window blur
   - Block jika terlalu lama setelah interaction
   - Block jika URL sangat panjang dengan banyak parameter

4. **Script Monitoring**
   - Monitor semua script yang di-inject
   - Block script dengan pattern mencurigakan
   - Block script dengan `window.open()` tanpa checks

---

## ✅ Keuntungan Pattern-Based

### **vs Domain-Specific:**

| Domain-Specific | Pattern-Based |
|----------------|---------------|
| ❌ Harus update setiap domain baru | ✅ Otomatis block semua domain dengan pattern sama |
| ❌ Tidak efektif jika domain berubah | ✅ Tetap efektif meskipun domain berubah |
| ❌ Mudah di-bypass dengan domain baru | ✅ Sulit di-bypass karena pattern tetap sama |
| ❌ Perlu maintenance terus | ✅ Minimal maintenance |

### **Contoh:**

**Domain berubah:**
- `wayfarerorthodox.com/api/users?token=...` ❌ Blocked
- `newdomain.com/api/users?token=...` ✅ **Masih blocked** (pattern sama!)
- `anotherdomain.com/api/users?token=...` ✅ **Masih blocked** (pattern sama!)

---

## 🎯 Pattern yang Terdeteksi

### **Contoh URL yang Ter-block:**

```
✅ wayfarerorthodox.com/api/users?token=...&referer=...
✅ anydomain.com/api/users?token=...&referer=...
✅ domain123.com/api/users?token=...&uuid=...
✅ newdomain.net/api/users?token=...&shu=...
```

**Semua ter-block karena pattern `/api/users?token=` sama!**

---

## 🔍 Debug

### **Cek Console:**

Blocker akan log semua attempt popunder:
```
🚫 Blocked popunder (no user interaction): [URL]
🚫 Blocked popunder (suspicious URL pattern): [URL]
🚫 Blocked popunder (triggered during blur): [URL]
🚫 Blocked popunder (too long after interaction): [URL]
🚫 Blocked popunder (suspicious long URL with many params): [URL]
```

### **Monitor Network:**

1. Buka Developer Tools → Network tab
2. Filter: **All** atau **XHR**
3. Cari request yang ter-block
4. Lihat **Initiator** untuk tahu sumber

---

## 📝 Customization

### **Tambahkan Pattern Baru:**

Edit `index.html`, tambahkan pattern di `suspiciousPatterns`:

```javascript
const suspiciousPatterns = [
  // Pattern existing...
  /your-custom-pattern/i,  // Tambahkan pattern baru
];
```

### **Ubah Timing:**

```javascript
// Ubah window interaction (default: 2000ms)
interactionTimeout = setTimeout(() => {
  userInteracted = false;
}, 3000); // 3 detik
```

---

## ✅ Hasil

### **Sebelum (Domain-Specific):**
- ❌ Block `wayfarerorthodox.com` → popunder pindah ke domain lain
- ❌ Harus update blocker setiap domain baru
- ❌ Tidak efektif

### **Sesudah (Pattern-Based):**
- ✅ Block semua domain dengan pattern `/api/users?token=`
- ✅ Tidak perlu update meskipun domain berubah
- ✅ Efektif untuk semua popunder dengan pattern sama

---

## 🎯 Kesimpulan

**Pattern-based blocking lebih efektif** karena:
1. ✅ Tidak peduli domain - block berdasarkan pattern
2. ✅ Otomatis block domain baru dengan pattern sama
3. ✅ Minimal maintenance
4. ✅ Sulit di-bypass

**Blocker sekarang siap untuk handle popunder dengan domain yang berubah-ubah! 🛡️**

