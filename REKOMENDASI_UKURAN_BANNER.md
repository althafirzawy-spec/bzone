# Rekomendasi Ukuran Banner Iklan

## 📐 Ukuran Banner per Posisi

### 1. **floating.html** (Popup Modal)
- ✅ **Rekomendasi**: **300x250** (Medium Rectangle)
- ✅ Alternatif: 336x280 (Large Rectangle)
- ❌ Hindari: 468x60 (terlalu panjang untuk popup)

### 2. **homepage.html** (Halaman Utama)
- ✅ **Rekomendasi**: **728x90** (Leaderboard) - Desktop
- ✅ Alternatif: **300x250** (Medium Rectangle) - Mobile
- ✅ Bisa juga: **468x60** (Full Banner) - Desktop

### 3. **in-article.html** (Di Tengah Artikel)
- ✅ **Rekomendasi**: **300x250** (Medium Rectangle)
- ✅ Alternatif: 336x280 (Large Rectangle)
- ⚠️ **468x60 TIDAK DISARANKAN** - Terlalu panjang horizontal, mengganggu alur baca artikel

### 4. **sidebar.html** (Sidebar - Lebar 320px)
- ✅ **Rekomendasi**: **300x250** (Medium Rectangle)
- ✅ Alternatif: **300x600** (Half Page) - Jika ingin lebih tinggi
- ❌ Hindari: 468x60 (terlalu lebar untuk sidebar 320px)

### 5. **under-nav.html** (Di Bawah Navbar)
- ✅ **Rekomendasi**: **728x90** (Leaderboard) - Desktop
- ✅ Alternatif: **320x50** (Mobile Banner) - Mobile
- ✅ **468x60 COCOK** untuk posisi ini (tidak mengganggu artikel)

---

## 📊 Standar Ukuran IAB (Interactive Advertising Bureau)

| Ukuran | Nama | Cocok Untuk |
|--------|------|-------------|
| 728x90 | Leaderboard | Header, bawah navbar |
| 970x250 | Billboard | Header besar |
| 300x250 | Medium Rectangle | Sidebar, in-article, popup |
| 336x280 | Large Rectangle | Sidebar, in-article |
| 300x600 | Half Page | Sidebar tinggi |
| 468x60 | Full Banner | Header, bawah navbar |
| 320x50 | Mobile Banner | Mobile header |

---

## ⚠️ Catatan Penting

### Tentang 468x60 (Full Banner):
- ✅ **COCOK** untuk:
  - `under-nav.html` (di bawah navbar)
  - `homepage.html` (di halaman utama)
  
- ❌ **TIDAK DISARANKAN** untuk:
  - `in-article.html` - Terlalu panjang horizontal, **mengganggu alur baca artikel**
  - `sidebar.html` - Terlalu lebar (sidebar hanya 320px)
  - `floating.html` - Terlalu panjang untuk popup modal

### Best Practices:
1. **In-Article**: Gunakan banner **vertikal** (300x250) agar tidak memotong alur baca
2. **Sidebar**: Maksimal lebar **300px** (sidebar 320px dengan padding)
3. **Mobile**: Selalu sediakan alternatif ukuran mobile (320x50 atau 300x250)
4. **Responsive**: Pastikan banner bisa menyesuaikan ukuran layar

---

## 🎯 Rekomendasi Final

| File | Ukuran Desktop | Ukuran Mobile |
|------|----------------|---------------|
| `floating.html` | 300x250 | 300x250 |
| `homepage.html` | 728x90 atau 468x60 | 320x50 |
| `in-article.html` | 300x250 | 300x250 |
| `sidebar.html` | 300x250 | 300x250 |
| `under-nav.html` | 728x90 atau 468x60 | 320x50 |

---

## 💡 Tips Implementasi

1. Gunakan **responsive ad units** yang bisa menyesuaikan ukuran otomatis
2. Test di berbagai ukuran layar (mobile, tablet, desktop)
3. Pastikan banner tidak overlap dengan konten artikel
4. Untuk in-article, posisikan di antara paragraf, bukan di tengah paragraf

