# 🔒 Fix: Token Ter-expose di GitHub

## ⚠️ PENTING: Token Sudah Ter-expose!

Token Personal Access Token Anda (`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`) sudah ter-expose di commit GitHub. 

**LANGKAH WAJIB:**

### 1. Revoke Token yang Ter-expose (SEGERA!)

1. Login ke GitHub → **Settings** → **Developer settings**
2. **Personal access tokens** → **Tokens (classic)**
3. Cari token yang ter-expose → Klik **Revoke**
4. **Konfirmasi revoke**

**⚠️ Token yang ter-expose TIDAK AMAN lagi dan harus di-revoke!**

### 2. Hapus Token dari Commit History

Karena ini commit pertama, cara termudah adalah **reset commit**:

```bash
# Hapus commit terakhir (tapi tetap file perubahan)
git reset --soft HEAD~1

# Commit ulang tanpa token
git add .
git commit -m "Initial commit: Vue 3 blog dengan SSG (token removed)"

# Force push (karena ini commit pertama, aman)
git push -f origin main
```

**Atau jika sudah ada commit lain:**

```bash
# Hapus token dari file (sudah dilakukan)
git add TUTORIAL_INSTALASI.md
git commit -m "Remove exposed token from tutorial"

# Push
git push origin main
```

### 3. Buat Token Baru

Setelah revoke token lama:

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Isi form seperti sebelumnya
4. **Generate token**
5. **Simpan token baru dengan aman** (jangan commit ke GitHub!)

### 4. Gunakan Token Baru

Saat `git push`, gunakan token baru (bukan yang lama).

---

## ✅ Checklist

- [ ] Token lama sudah di-revoke di GitHub
- [ ] Token sudah dihapus dari file `TUTORIAL_INSTALASI.md` (sudah dilakukan)
- [ ] Commit baru tanpa token sudah dibuat
- [ ] Token baru sudah dibuat
- [ ] Token baru disimpan dengan aman (tidak di-commit)

---

## 🛡️ Pencegahan

- ✅ Jangan pernah commit token, password, atau secret ke GitHub
- ✅ Gunakan `.gitignore` untuk file sensitif
- ✅ Gunakan environment variables untuk production
- ✅ GitHub akan otomatis scan dan block push yang mengandung secret

---

**Token sudah dihapus dari file. Sekarang revoke token lama dan buat yang baru!**

