# Planner: Get Technical Review Queue

Fungsi ini bertujuan untuk menampilkan daftar assessment yang membutuhkan perhatian dari Technical Reviewer.

## 1. Analisis Kebutuhan
Technical Reviewer perlu melihat antrean assessment yang:
- Telah di-submit oleh Product Owner (`overall_status = submitted`).
- Sedang dalam proses review teknis (`technical_status = in_progress`).
- Sudah pernah di-review namun perlu dicek kembali (re-review).

## 2. Logika Bisnis
- Mengambil data dari `ProductAssessment` yang join dengan `Product`.
- Filter:
  - Jika `technical_status` adalah `not_started`, maka `overall_status` harus `submitted`.
  - Jika `technical_status` adalah `in_progress`, maka reviewer yang sedang mengerjakan harus bisa melihatnya kembali.
- Paginasi: Mendukung `page` dan `limit`.
- Search: Mendukung pencarian berdasarkan nama produk atau kode produk.

## 3. Komponen Teknis
- **Use Case:** `GetTechnicalQueueUseCase`
- **Method:** `execute(page: number, limit: number, loggedUser: any, status?: string)`
- **QueryBuilder:** Menggunakan TypeORM QueryBuilder untuk filtering dinamis.

## 4. Keamanan
- Hanya dapat diakses oleh user dengan role `technical_reviewer`.
- Menggunakan `res.locals.logged` untuk identifikasi aktor.

---
**Status:** Planned  
**Oleh:** Antigravity
