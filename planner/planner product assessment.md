# Planner: Product Assessment (Product Owner Workspace)

Dokumen ini memuat rangkuman status pengembangan saat ini serta perencanaan langkah selanjutnya (Next Steps) untuk modul **Product Assessment** di backend, berdasarkan source code yang ada.

## 1. Status Implementasi Saat Ini

Berikut adalah komponen dan fitur yang telah berhasil diimplementasikan:

### A. Data Transfer Object (DTO)
- `src/modules/product-assessments/dto/product-assessment.dto.ts`
  - Telah mendefinisikan `CreateProductAssessmentDto` untuk memvalidasi payload saat proses pembuatan product assessment.
  - Memanfaatkan `class-validator` dan sudah didekorasi untuk kebutuhan Swagger (`@ApiProperty`).
  - Telah mendefinisikan `UpdateProductAssessmentDto` yang mewarisi (extends) keseluruhan skema dari proses "Create".

### B. Use Cases (Business Logic)
- `create-assessment.usecase.ts`
  - **Fungsi:** Membuat data `Product` baru atau melakukan perbaruan jika `product_code` eksis, kemudian membuat draft `ProductAssessment`.
  - **Fitur Spesifik:** Auto-generate nomor assessment dengan format berdasar tanggal (contoh: `PA-YYYYMMDD-001`) dan perekaman jejak audit (`createAuditFields`).
- `get-assessments.usecase.ts`
  - **Fungsi:** Menangani logika pengambilan banyak data beserta fitur paginasi untuk kebutuhan *dashboard list*.
  - **Fitur Spesifik:** Menyajikan rangkuman perhitungan status (*summary count*), filter berdasarkan `status`, dan pengambilan data mendetail 1 Assessment (`findOne`) menggunakan pengecekan sekuriti untuk menjaga data agar hanya diakses oleh pemiliknya (Product Owner bersangkutan).
- `update-assessment.usecase.ts`
  - **Fungsi:** Memperbarui data untuk entity `Product` dan `ProductAssessment`.
  - **Fitur Spesifik:** Validasi bahwa edit data hanya dizinkan jika assessment memiliki status `draft` atau `need_revision`.
- `submit-assessment.usecase.ts`
  - **Fungsi:** Mengubah status dari draft/perlu revisi menjadi `submitted`.
  - **Fitur Spesifik:** Pengecekan kelengkapan data dasar (misal nama produk), pencatatan jejak audit melalui entity `AssessmentAuditLog` (dari aksi SUBMIT).

### C. Controller & Endpoint 
- `src/modules/product-assessments/product-assessment.controller.ts`
  - Router di-prefix pada `1/product-assessments`.
  - Dilakukan pengamanan dengan menggunakan JWT dan Role Base Access Control (`@UseGuards(RolesGuard)` dan `@Roles(PRODUCT_OWNER)`).
  - Terdapat Endpoint:
    - `POST /` (Pembuatan)
    - `GET /` (Mengambil seluruh data, paginasi dan summary)
    - `GET /:id` (Mengambil detail dengan load seluruh relasi)
    - `PUT /:id` (Edit/Pemperbarui data draft/revisi)
    - `POST /:id/submit` (Submit assessment)
  - Penggunaan respons standar melalui helper `respond`.

### D. Module Registration
- `src/modules/product-assessments/product-assessment.module.ts`
  - Wiring dependensi `TypeOrmModule` untuk entity terkait, menyediakan Controller, dan semua use case agar dapat diinjeksi.

### E. Fitur Duplikasi Data (Duplicate Assessment)
- `src/modules/product-assessments/usecases/duplicate-assessment.usecase.ts`
  - **Fungsi:** Menyalin data dari assessment yang sudah ada ke draft baru.
  - **Fitur Spesifik:** Menduplikasi data `Product` terkait, menginisialisasi nomor assessment baru, dan mencatat audit log pembuatan data.
- **Integrasi Controller:** Endpoint `POST /product-assessments/duplicate`.

---

## 2. Rencana Pengembangan Selanjutnya (Remaining Tasks & Next Steps)

Untuk melengkapi fungsionalitas Product Owner Workspace selaras dengan spesifikasi penuh kebutuhan, berikut beberapa task/use case yang direkomendasikan untuk dikerjakan selanjutnya:

### A. Manajemen Lampiran File (File Attachments)
- **Status:** Controller dasar tersedia (`assessment-attachment.controller.ts`), namun logika simpan/hapus asli masih berupa placeholder.
- **Task Planner:**
  - Pembuatan Use Case: `upload-attachment.usecase.ts` dan `delete-attachment.usecase.ts`.
  - Implementasi integrasi dengan `MinioClient` untuk penyimpanan file fisik.
  - Menghubungkan controller dengan use case sesungguhnya.

### B. Fitur Komunikasi Review dan Revisi (Comments)
- **Status:** Controller dasar tersedia (`assessment-comment.controller.ts`), namun logika simpan/get masih berupa placeholder.
- **Task Planner:**
  - Pembuatan Use Case: `add-assessment-comment.usecase.ts`.
  - Integrasi dengan database relasi `comments` agar tersimpan secara permanen.
  - Memastikan list komentar muncul di respon detail assessment.

### C. Perapian dan Peningkatan Kualitas
- **Type Safety & Payload:** Mereview dan memastikan tidak ada penggunaan keyword `any` pada response format controller.
- **Testing:** Mengimplementasikan setelan file testing (spec) atau minimal memastikan proses runing `npm run test` pada module ini berjalan sukses.

## 3. Guideline Teknis Tambahan
- Selalu patuhi standar utilitas internal `src/common/utils/audit.util.ts` yang mengisi field created_by/updated_by tanpa perlu manual pada setiap payload save.
- Hindari menyuntikkan (inject) use case ke controller yang tidak spesifik milik domain tanpa alasan valid (pertahankan struktur modular/encapsulated).
- Tetap sertakan `@HttpCode()` secara seragam untuk respon tiap fungsi di Controller seperti yang sudah diterapkan guna menaikkan *readabillity*.
