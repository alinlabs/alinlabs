
# AlinLabs Indonesia - Platform Ekosistem Digital

![Status](https://img.shields.io/badge/Status-Production_Ready-blue)
![Tech](https://img.shields.io/badge/Built_With-React_19_+_Vite-61DAFB)
![Style](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC)

**AlinLabs Indonesia** adalah sebuah *Single Page Application* (SPA) modern yang berfungsi sebagai profil perusahaan agensi digital, portofolio interaktif, dan sistem simulasi biaya proyek (kalkulator estimasi) yang terintegrasi.

Aplikasi ini dirancang dengan fokus pada **performa tinggi**, **interaksi pengguna yang fluid**, dan **kemudahan pengelolaan konten** melalui arsitektur berbasis JSON (Headless-like).

---

## 🌟 Fitur Utama

### 1. Sistem Navigasi & Routing Kustom
Aplikasi ini tidak menggunakan *React Router* standar, melainkan menggunakan **State-Based Routing (`ViewState`)**.
- **Transisi Mulus:** Perpindahan halaman terjadi secara instan tanpa reload browser.
- **Mobile-First Navigation:** Sidebar responsif, Bottom Navigation Bar (mirip aplikasi native) dengan tombol *Floating Action* untuk menu prioritas.
- **Deep Linking:** Mendukung navigasi URL manual dan *browser history* (back button) menggunakan `window.history.pushState`.

### 2. Simulasi Biaya & Keranjang Belanja (Project Calculator)
Fitur unggulan untuk calon klien menghitung estimasi biaya proyek.
- **Multi-Kategori:** Mendukung layanan Web, App, Digital Marketing, dan Kreatif.
- **Opsi Pembayaran Fleksibel:** Menangani logika harga *Subscription* (Bulanan/Tahunan) vs *One-Time Purchase* (Beli Putus).
- **Domain Checker UI:** Antarmuka simulasi pengecekan ketersediaan domain.
- **Live Cart:** Keranjang belanja *overlay* yang menghitung subtotal secara *real-time*.
- **Cetak Penawaran (PDF):** Menghasilkan dokumen estimasi penawaran resmi secara otomatis via browser print API.
- **Checkout WhatsApp:** Mengirimkan detail pesanan yang terformat rapi langsung ke WhatsApp admin.

### 3. Manajemen Data Hibrida (Data Resolver)
Sistem pengambilan data yang cerdas (`services/dataResolver.ts`) untuk performa maksimal.
- **JSON-Based CMS:** Seluruh konten (teks, gambar, harga) disimpan dalam file JSON statis di folder `public/data/`.
- **Intelligent Caching:** Data yang sudah dimuat disimpan dalam *memory cache* untuk navigasi instan saat pengguna kembali ke halaman sebelumnya.
- **Fail-Safe Mechanism:** Mekanisme fallback otomatis untuk memastikan data tetap tampil meskipun terjadi gangguan jaringan minor.

### 4. Asisten Chat Cerdas (Aira)
Bot layanan pelanggan mandiri (`components/chat/`).
- **Logic-Based Response:** Menggunakan pencocokan kata kunci (*keyword matching*) lokal untuk mendeteksi intensi pengguna (Harga, Layanan, Kontak, dll).
- **Tanpa Server Eksternal:** Berjalan sepenuhnya di sisi klien (browser), sangat cepat dan privasi terjaga.
- **Eskalasi ke Manusia:** Opsi untuk beralih ke agen asli via WhatsApp jika bot tidak dapat menjawab.

### 5. Portofolio Interaktif
- **Filter Kategori:** Penyaringan proyek berdasarkan jenis layanan.
- **Detail Proyek:** Halaman detail dengan galeri foto, metrik keberhasilan (grafik), dan teknologi yang digunakan.
- **Preview Embed:** Fitur pratinjau situs/video (YouTube) langsung di dalam aplikasi tanpa meninggalkan halaman.

---

## 🛠️ Teknologi & Stack

Aplikasi ini dibangun menggunakan teknologi web modern terkini:

| Kategori | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Core** | React 19, TypeScript | Library UI dan bahasa pemrograman tipe kuat. |
| **Build Tool** | Vite | Bundler super cepat untuk pengembangan dan produksi. |
| **Styling** | Tailwind CSS | Utility-first CSS framework untuk desain responsif. |
| **Icons** | Lucide React | Ikon vektor ringan dan konsisten. |
| **Animation** | Lottie (DotLottie) | Animasi vektor kompleks (JSON) yang ringan. |
| **Charts** | Custom SVG Logic | Komponen grafik lingkaran dan batang tanpa library berat. |

---

## 📂 Struktur Proyek

Struktur folder dirancang untuk skalabilitas dan keterbacaan:

```
alinlabs-indonesia/
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── chat/             # Logika dan UI Chatbot (Aira)
│   ├── seo/              # Manajemen Meta Tag dinamis
│   ├── ui/               # Komponen atomik (Lottie wrapper, Charts)
│   ├── Navbar.tsx        # Navigasi Desktop & Mobile Header
│   ├── Sidebar.tsx       # Menu samping (Drawer)
│   └── ...
├── halaman/              # Halaman-halaman utama (Views)
│   ├── beranda/          # Komponen Landing Page (Hero, Features)
│   ├── layanan/          # Halaman Produk & Detail Paket
│   ├── portofolio/       # Galeri & Detail Proyek
│   ├── simulasi/         # Kalkulator Harga, Cart, & Domain
│   └── ...
├── public/
│   ├── data/             # DATABASE JSON (Edit konten di sini)
│   │   ├── beranda.json
│   │   ├── layanan.json
│   │   ├── simulasi.json
│   │   └── ...
│   └── lottie/           # Aset animasi JSON
├── services/
│   ├── AppRouting.ts     # Logika pemetaan View ke Data
│   └── dataResolver.ts   # Fetcher & Caching layer
├── types.ts              # Definisi tipe TypeScript global
├── App.tsx               # Root Component & Routing Logic
└── main.tsx              # Entry Point
```

---

## 🚀 Panduan Instalasi & Pengembangan

Pastikan Anda telah menginstal **Node.js** (versi 18+ direkomendasikan).

1.  **Clone Repositori** (atau unduh source code):
    ```bash
    git clone https://github.com/username/alinlabs-indonesia.git
    cd alinlabs-indonesia
    ```

2.  **Instal Dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan Mode Pengembangan:**
    ```bash
    npm run dev
    ```
    Aplikasi akan berjalan di `http://localhost:3000`.

4.  **Build untuk Produksi:**
    ```bash
    npm run build
    ```
    Hasil build akan berada di folder `dist/`.

---

## 📝 Cara Mengubah Konten (CMS)

Aplikasi ini tidak memerlukan backend database (MySQL/Mongo) untuk konten. Cukup edit file **JSON** di folder `public/data/`.

### Contoh: Mengubah Harga Paket
Buka file `public/data/simulasi.json`:
```json
{
  "id": "compro",
  "nama": "Company Profile Corporate",
  "opsiHarga": [
      { 
        "label": "1 Tahun", 
        "harga": 900000,  <-- Ubah angka ini
        "tipe": "subscription", 
        "durasi": 12 
      }
  ]
}
```

### Contoh: Mengubah Respon Chatbot
Buka file `components/chat/respon.ts` dan edit array string sesuai intent yang diinginkan.

---

## 🎨 Kustomisasi Desain

- **Warna & Tema:** Diatur melalui class utility Tailwind CSS. Cek `tailwind.config.js` (jika ada kustomisasi) atau cari kode hex warna utama `#4a8cdf` (Biru AlinLabs) di seluruh file.
- **Animasi Lottie:** Ganti file `.lottie` atau `.json` di folder `public/lottie/` dan perbarui referensinya di file JSON data.

---

## 📄 Lisensi

Hak Cipta © 2024 AlinLabs Indonesia.
Seluruh kode sumber dan aset desain adalah hak milik AlinLabs Indonesia kecuali komponen *open source* yang digunakan.

---

*Dokumen ini dibuat secara otomatis untuk referensi teknis pengembang.*
