# To-Do: Master Data Implementation (Business Unit & Product Category)

Daftar tugas yang telah dikerjakan dan rencana pengembangan untuk modul **Master Data**.

## 1. Implementasi Selesai (Completed Tasks)
- [x] Mendefinisikan entity `MasterBusinessUnit` dan `MasterProductCategory`.
- [x] Menyiapkan skrip seeder `src/scripts/seed-master-data.ts`.
- [x] Menjalankan seeding data awal (Unit Bisnis & Kategori Produk Digital).
- [x] Membuat Use Case `GetBusinessUnitsUseCase`.
- [x] Membuat Use Case `GetProductCategoriesUseCase`.
- [x] Membuat Controller `MasterDataController`.
- [x] Membuat Module `MasterDataModule`.
- [x] Mendaftarkan `MasterDataModule` ke dalam `AppModule`.
- [x] Dokumentasi Swagger mendaftarkan tag `Master Data`.

## 2. Implementasi Berjalan (In Progress)
- [ ] Implementasi GET API untuk `MasterRiskLevel`.
- [ ] Implementasi GET API untuk `MasterAssessmentOption`.

## 3. Rencana Ke Depan (Backlog / Next Steps)
- [ ] Menambahkan validasi pada `Product` agar `business_unit_id` dan `product_category_id` wajib diisi saat pembuatan produk.
- [ ] Implementasi CRUD dasar untuk admin mengelola Master Data.
- [ ] Penambahan fitur caching (Redis) untuk query Master Data.
- [ ] Integrasi dengan dashboard Frontend untuk penggunaan dropdown pada form Assessment.

---
**Status Terakhir:** 4 April 2026  
**Oleh:** Antigravity (AI Assistant)
