# Planner: Admin Features (Template Builder, Versioning, & Audit Trail)

Dokumen ini merangkum rencana arsitektur dan alur kerja untuk fitur-fitur baru pada Role Admin. Fitur ini dirancang untuk skripsi dengan fokus pada fleksibilitas (dinamis), konsistensi data, dan keamanan.

## 1. Template Builder & Versioning
**Tujuan:** Memungkinkan Admin membuat dan mengedit kriteria penilaian secara dinamis, serta menjaga integritas data penilaian yang sudah berjalan melalui sistem *versioning*.

### Konsep Database (Entities)
Mengacu pada `plm_product_assessment_entities.json`:
- `AssessmentTemplate`: Menyimpan nama template, tipe produk (AI, Digital, dll), dan **`version`**.
- `AssessmentSection`: Kategori besar (Teknis, Bisnis, Legal) beserta bobot nilainya (`weight`).
- `AssessmentCriteria`: Kriteria detail di bawah section.
- `AssessmentQuestion`: Pertanyaan spesifik (tipe jawaban bisa text, boolean, multi-select).

### Alur Versioning (Logika Bisnis)
Ketika Admin mengedit sebuah Template yang sudah berstatus `published` atau sudah pernah dipakai:
1. Sistem **tidak menimpa (overwrite)** data template yang lama.
2. Template lama diubah statusnya menjadi `archived` (tetap ada di DB untuk riwayat produk lama).
3. Sistem membuat *clone* (duplikat) dari template tersebut dengan `version = version + 1`.
4. Perubahan baru disimpan di template versi baru ini.
5. Produk baru yang dibuat oleh PO akan otomatis menggunakan template versi terbaru ini.

## 2. Audit Trail & Activity Log
**Tujuan:** Mencatat semua aktivitas penting (CRUD) yang dilakukan oleh user, khususnya Admin, untuk keperluan transparansi dan audit keamanan.

### Konsep Database (Entity Baru)
Buat entity `AuditLog` dengan struktur (contoh):
- `id` (UUID)
- `user_id` (Siapa yang melakukan)
- `action` (CREATE, UPDATE, DELETE, LOGIN)
- `entity_name` (Tabel apa yang diubah, misal: 'AssessmentTemplate')
- `entity_id` (ID dari data yang diubah)
- `old_values` (JSONB - Data sebelum diubah)
- `new_values` (JSONB - Data sesudah diubah)
- `ip_address` & `user_agent`
- `created_at` (Kapan dilakukan)

### Pendekatan Teknis (NestJS)
- **Interceptor:** Buat global atau module-scoped `AuditInterceptor`. Interceptor ini akan secara otomatis mencegat (intercept) setiap HTTP Request dengan method POST, PUT, PATCH, DELETE.
- **Service:** Interceptor memanggil `AuditLogService` untuk menyimpan data perubahan ke database secara asinkron (agar tidak memperlambat response time API utama).

## 3. Integrasi Frontend (UI/UX)
- **Halaman Template List:** Menampilkan daftar template beserta versinya.
- **Halaman Template Builder (Form):** Form dinamis (Dynamic Forms) menggunakan `react-hook-form` dan `useFieldArray` untuk memungkinkan Admin *add/remove* pertanyaan dan *section* secara langsung.
- **Halaman Audit Log:** Tabel log aktivitas khusus untuk Super Admin (bisa difilter berdasarkan tanggal, user, atau entitas).
