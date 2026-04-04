# Planner: Master Data (Business Unit & Product Category)

Dokumen ini memuat perencanaan dan status implementasi untuk modul **Master Data** yang digunakan sebagai referensi pada berbagai modul lain, terutama di Product Owner Workspace.

## 1. Latar Belakang
Dalam pengisian assessment produk, Product Owner perlu memilih **Business Unit** dan **Product Category** dari daftar yang sudah ditentukan (dropdown). Hal ini penting untuk:
- Standardisasi pelaporan produk.
- Memudahkan filter dan pencarian pada dashboard.
- Memastikan integritas data pada relasi tabel `products`.

## 2. Status Implementasi Saat Ini
Berikut adalah komponen yang telah berhasil diimplementasikan:

### A. Seeding Data Master
- **Skrip:** `src/scripts/seed-master-data.ts`
- **Data Business Unit:** Digital Services, Retail Banking, SME & Wholesale, Corporate Banking, Information Technology.
- **Data Product Category:** Mobile Application, Web Platform, API Service, Payment System, Internal Tool.
- **Status:** Berhasil dijalankan (Upsert).

### B. Use Cases (Business Logic)
- `get-business-units.usecase.ts`: Mengambil daftar Business Unit yang aktif (`is_active: true`).
- `get-product-categories.usecase.ts`: Mengambil daftar Kategori Produk yang aktif (`is_active: true`).

### C. Controller & Endpoint
- `src/modules/master-data/master-data.controller.ts`
- **Prefix:** `v1/master-data`
- **Endpoints:**
  - `GET /business-units`: Mengembalikan daftar unit bisnis.
  - `GET /product-categories`: Mengembalikan daftar kategori produk.
- **Security:** Dilindungi oleh `JwtAuthGuard`.

### D. Module Registration
- `src/modules/master-data/master-data.module.ts`: Menangani registrasi entity, use case, dan controller.
- **AppModule:** Sudah didaftarkan sebagai bagian dari modul aplikasi utama.

## 3. Rencana Pengembangan Selanjutnya (Next Steps)
Berikut adalah beberapa pengembangan yang dapat dilakukan pada modul Master Data:

### A. Master Data Tambahan
- **Risk Levels:** Implementasi GET API untuk `MasterRiskLevel`.
- **Assessment Options:** Implementasi GET API untuk `MasterAssessmentOption` (untuk pertanyaan tipe select/option).

### B. Manajemen Master Data (Admin Only)
- Pembuatan CRUD (Create, Update, Delete) untuk unit bisnis dan kategori produk agar admin dapat mengelola daftar tersebut melalui UI.

### C. Caching
- Mengingat data master cenderung jarang berubah (static), implementasi caching menggunakan Redis dapat dipertimbangkan untuk meningkatkan performa.

---
**Status Terakhir:** 4 April 2026  
**Oleh:** Antigravity (AI Assistant)
