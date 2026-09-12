# EcoCycle AI - Web Application

Repositori frontend web untuk proyek **EcoCycle AI** (Invention Unud). Dibangun menggunakan **React 19**, **Vite**, **Tailwind CSS v4**, dan komponen **shadcn/ui**.

---

## 🇮🇩 Panduan Memulai (Bahasa Indonesia)

Panduan ini dibuat khusus agar teman-teman tim yang baru pertama kali membuka proyek ini bisa langsung menjalankannya di laptop masing-masing tanpa kendala.

### 1. Prasyarat (Yang Harus Sudah Terinstall)

Sebelum memulai, pastikan laptop kamu sudah terinstall software berikut:
1. **Node.js** (Rekomendasi versi LTS, minimal versi 18 atau 20+): [Download Node.js](https://nodejs.org/)
2. **Git**: [Download Git](https://git-scm.com/)
3. **VS Code** (atau text editor pilihanmu): [Download VS Code](https://code.visualstudio.com/)

> **Cara Cek Apakah Sudah Terinstall:**  
> Buka Terminal / Command Prompt / PowerShell, lalu ketik:
> ```bash
> node -v
> npm -v
> git --version
> ```
> Jika muncul nomor versi (contoh: `v20.x.x`), artinya sudah terpasang!

---

### 2. Langkah-langkah Menjalankan Proyek

#### **Langkah A: Ambil Kode dari GitHub (Jika baru pertama kali)**
Jika kamu belum mendownload repository ini sama sekali:
```bash
git clone https://github.com/araselthenilo/ecocycle-ai-web.git
cd ecocycle-ai-web
```

#### **Langkah B: Tarik Update Terbaru (Jika sudah pernah clone sebelumnya)**
Buka folder proyek di terminal, pastikan kamu berada di branch yang tepat, lalu tarik perubahan terbaru:
```bash
git pull origin [nama_kalian]
# atau jika menggunakan branch main / branch masing-masing:
# git pull
```

#### **Langkah C: Install Dependensi (PENTING)**
Folder `node_modules` tidak diunggah ke GitHub demi efisiensi. Oleh karena itu, kamu wajib menginstall library/paket yang diperlukan terlebih dahulu:
```bash
npm install
```
*Tunggu hingga proses download package selesai.*

#### **Langkah D: Jalankan Server Development**
Setelah proses install selesai, jalankan perintah berikut:
```bash
npm run dev
```

#### **Langkah E: Buka di Browser**
Setelah muncul tulisan seperti ini di terminal:
```bash
  VITE v8.x.x  ready in 200 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```
Buka browser (Chrome, Edge, Firefox, dll) lalu kunjungi: **`http://localhost:5173`** atau tekan `Ctrl + Klik` pada link tersebut di terminal.

---

### 3. Perintah Terminal yang Sering Digunakan

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan web di mode development (auto reload saat code diedit) |
| `npm run dev:host` | Menjalankan web di mode network agar bisa diakses via IP/Tailscale |
| `.\start-tailscale.ps1` | Menjalankan web + otomatis mendeteksi & menampilkan link Tailscale |
| `npm run build` | Membuat bundle file produksi (hasil ada di folder `dist/`) |
| `npm run preview` | Menjalankan preview dari hasil build produksi |
| `npm run lint` | Mengecek error / standar penulisan kode dengan ESLint |

---

### 4. Alur Kerja Git untuk Anggota Tim (Best Practice)

Agar tidak terjadi bentrok kode (conflict) dengan anggota tim lain:

1. **Selalu tarik update terbaru sebelum mulai ngoding:**
   ```bash
   git pull
   ```
2. **Setelah selesai membuat perubahan / fitur:**
   ```bash
   git add .
   git commit -m "Deskripsi singkat apa yang kamu ubah atau tambahkan"
   git push
   ```

---

### 5. Troubleshooting (Masalah yang Sering Terjadi)

- **Error: `command not found: npm` atau `node`:**
  - Pastikan Node.js sudah diinstall dan restart VS Code / Terminal kamu.
- **Port 5173 sudah terpakai:**
  - Vite akan otomatis mengalihkan ke port berikutnya (misalnya `http://localhost:5174`). Cek link yang muncul di terminal.
- **Error styling / komponen tidak muncul setelah `git pull`:**
  - Kemungkinan ada package baru yang ditambahkan oleh teman tim. Cukup jalankan kembali:
    ```bash
    npm install
    ```
- **Error dependensi berantakan:**
  - Hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` kembali.

---
---

## 🇬🇧 Getting Started Guide (English)

A simple and comprehensive guide to running the **EcoCycle AI** frontend web project locally after cloning or pulling from GitHub.

### 1. Prerequisites

Make sure you have the following installed on your machine:
1. **Node.js** (LTS version recommended, v18 or v20+): [Download Node.js](https://nodejs.org/)
2. **Git**: [Download Git](https://git-scm.com/)
3. **VS Code** (or your favorite code editor): [Download VS Code](https://code.visualstudio.com/)

> **Verify Installation:**
> ```bash
> node -v
> npm -v
> git --version
> ```

---

### 2. Step-by-Step Setup

#### **Step A: Clone the Repository (First-time setup)**
```bash
git clone https://github.com/araselthenilo/ecocycle-ai-web.git
cd ecocycle-ai-web
```

#### **Step B: Pull Latest Changes (If already cloned)**
```bash
git pull
```

#### **Step C: Install Dependencies**
```bash
npm install
```

#### **Step D: Start the Development Server**
```bash
npm run dev
```

#### **Step E: Open in Browser**
Navigate to: **`http://localhost:5173`**

---

### 3. Available Scripts

- `npm run dev` - Runs the app in development mode with HMR (Hot Module Replacement).
- `npm run build` - Builds the app for production into the `dist/` folder.
- `npm run preview` - Locally previews the production build.
- `npm run lint` - Runs ESLint to check for code quality issues.

---

### 4. Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) / [Base UI](https://base-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
