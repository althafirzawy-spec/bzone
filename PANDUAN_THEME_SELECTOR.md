# 🎨 Panduan: Variasi Themes

## ✅ Fitur Baru: Theme Selector

Sekarang website memiliki **Theme Selector** untuk memilih variasi color theme!

---

## 🎨 Themes yang Tersedia

### **1. Default** (Green)
- Primary: Green (#008000)
- Background: White
- Style: Clean dan professional

### **2. Midnight** (Dark Blue)
- Primary: Blue (#8ab4f8)
- Background: Dark (#202124)
- Style: Dark theme dengan blue accent

### **3. Windy** (Light Blue)
- Primary: Blue (#1a73e8)
- Background: Light (#f8f9fa)
- Style: Light dan fresh

### **4. Spiel** (Dark Minimal)
- Primary: White (#ffffff)
- Background: Dark (#121212)
- Style: Minimal dark theme

### **5. Ocean** (Ocean Blue) ⭐ NEW
- Primary: Ocean Blue (#00a8cc)
- Background: Light Blue (#f0f8ff)
- Style: Ocean-inspired theme

### **6. Forest** (Green Nature) ⭐ NEW
- Primary: Forest Green (#2d5016)
- Background: Light Green (#f5f9f0)
- Style: Nature-inspired theme

### **7. Sunset** (Orange) ⭐ NEW
- Primary: Orange (#ff6b35)
- Background: Light Orange (#fff5f0)
- Style: Warm sunset theme

### **8. Purple** (Purple) ⭐ NEW
- Primary: Purple (#7b2cbf)
- Background: Light Purple (#faf5ff)
- Style: Purple theme

---

## 🎯 Cara Menggunakan

### **Desktop:**
1. Klik **Theme Selector** di navbar (ikon palet warna)
2. Pilih theme dari dropdown
3. Theme akan langsung diterapkan!

### **Mobile:**
1. Buka mobile menu
2. Scroll ke bawah
3. Pilih theme dari **Theme Selector**
4. Theme akan langsung diterapkan!

---

## 💾 Persistensi

- Theme yang dipilih **disimpan di localStorage**
- Theme akan **tetap aktif** saat reload halaman
- Theme **independent** dari dark/light mode toggle

---

## 🔧 Cara Menambah Theme Baru

### **1. Buat File CSS Theme**

Buat file baru di `src/assets/themes/`:

```css
/* src/assets/themes/your-theme.css */
:root {
  --primary-color: #your-color;
  --primary-color-light: rgba(...);
  --text-primary: #your-color;
  --text-secondary: #your-color;
  --background-color: #your-color;
  --card-background: #your-color;
  --border-color: #your-color;
  --shadow-color: rgba(...);
  
  --border-radius: 8px;
  /* ... */
}

html.dark {
  /* Dark mode variant */
  --primary-color: #your-dark-color;
  /* ... */
}
```

### **2. Tambahkan ke Daftar Theme**

Edit `src/composables/useColorTheme.js`:

```javascript
export const availableThemes = [
  // ... existing themes
  { id: 'your-theme', name: 'Your Theme', description: 'Your theme description' },
];
```

### **3. Selesai!**

Theme baru akan muncul di Theme Selector!

---

## 📁 Struktur File

```
src/
├── assets/
│   └── themes/
│       ├── default.css (via main.css)
│       ├── midnight.css
│       ├── windy.css
│       ├── spiel.css
│       ├── ocean.css ⭐ NEW
│       ├── forest.css ⭐ NEW
│       ├── sunset.css ⭐ NEW
│       └── purple.css ⭐ NEW
├── components/
│   └── ui/
│       ├── ThemeToggle.vue (dark/light mode)
│       └── ThemeSelector.vue ⭐ NEW (color theme selector)
└── composables/
    ├── useTheme.js (dark/light mode)
    └── useColorTheme.js ⭐ NEW (color theme)
```

---

## 🎨 Perbedaan: Theme vs Dark/Light Mode

### **Theme Selector (Color Theme):**
- Memilih **warna utama** (green, blue, orange, dll)
- Memilih **style** (minimal, nature, ocean, dll)
- **8 variasi** themes

### **Theme Toggle (Dark/Light Mode):**
- Memilih **brightness** (dark atau light)
- **2 mode** (dark/light)
- Bekerja **bersama** dengan color theme

**Contoh:**
- Ocean Theme + Dark Mode = Ocean dark variant
- Forest Theme + Light Mode = Forest light variant

---

## ✅ Fitur

- ✅ **8 variasi themes** (Default, Midnight, Windy, Spiel, Ocean, Forest, Sunset, Purple)
- ✅ **Dark/Light mode** untuk setiap theme
- ✅ **Persistensi** (disimpan di localStorage)
- ✅ **Responsive** (desktop & mobile)
- ✅ **Smooth transition** saat ganti theme
- ✅ **Easy to extend** (tambah theme baru mudah)

---

## 🚀 Cara Test

1. Buka website
2. Klik **Theme Selector** di navbar
3. Coba semua themes
4. Toggle **Dark/Light mode** untuk melihat variant
5. Reload halaman → theme tetap aktif!

---

**Selamat! Sekarang website memiliki variasi themes yang bisa dipilih user! 🎨**

