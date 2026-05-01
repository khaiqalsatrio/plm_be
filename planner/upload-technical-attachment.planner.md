# Planner: Upload Technical Attachment

Fungsi ini memungkinkan Technical Reviewer untuk mengunggah lampiran (foto/file) selama proses review teknis.

## 1. Analisis Kebutuhan
- Reviewer seringkali perlu menyertakan bukti diagram arsitektur, hasil scan keamanan, atau foto perangkat keras/data center sebagai bagian dari penilaian teknis.
- File harus disimpan di penyimpanan objek (MinIO) agar efisien dan dapat diakses melalui URL.
- Metadata file harus tercatat di database (`assessment_attachments`) agar terhubung dengan assessment terkait.

## 2. Logika Bisnis
- **Unggah File**: Menerima file multipart dari client dengan flag `is_private`.
- **Penyimpanan Objek**: 
  - Jika `is_private=false`, gunakan bucket publik (`tetangga`).
  - Jika `is_private=true`, gunakan bucket privat (`legal-tetangga`).
- **Pencatatan DB**:
  - `assessment_id`: ID assessment terkait.
  - `file_name`: Nama file asli.
  - `file_url`: URL akses dari MinIO (statis untuk publik).
  - `bucket`: Nama bucket penyimpanan.
  - `is_private`: Flag akses privat.
  - `file_type`: Mime type file.
  - `uploaded_by`: ID reviewer yang mengunggah.
  - `document_type`: Kategori dokumen (misal: `ARCHITECTURE_DIAGRAM`).
- **Akses File**:
  - Untuk file publik, gunakan `file_url` langsung.
  - Untuk file privat, panggil use case untuk generate **Presigned URL** (akses sementara).
  - Implementasi Presigned URL menggunakan `minioClient.presignedGetObject` dengan durasi akses terbatas (misal: 1 jam).

## 3. Komponen Teknis
- **Controller**: `TechnicalReviewController` dengan endpoint `POST /v1/technical-reviews/:id/attachments`.
- **Fastify Multipart**: Menggunakan `fastify-multipart` untuk menangani stream file secara efisien di NestJS/Fastify.
- **Use Case**: `UploadTechnicalAttachmentUseCase`.
- **Library**: `MinioClient` (existing).

## 1. Implementasi Selesai (Completed Tasks)
- [x] Membuat `docker-compose.yml` untuk MinIO.
- [x] Penyesuaian `.env` untuk MinIO.
- [x] Membuat `UploadTechnicalAttachmentUseCase` file dasar.
- [x] Menambahkan kolom `bucket` dan `is_private` di `AssessmentAttachment`.
- [ ] Implementasi pemilihan bucket di `UploadTechnicalAttachmentUseCase`.
- [ ] Membuat `GetAttachmentUrlUseCase` untuk Presigned URL.
- [ ] Endpoint akses URL di `TechnicalReviewController`.

## 4. Keamanan
- Hanya user dengan role `TECHNICAL_REVIEWER` yang dapat melakukan unggahan ini.
- Validasi ukuran file (maksimal 2MB sesuai batasan `fastify-multipart` di `main.ts`).
- Validasi tipe file (misal: hanya gambar atau PDF).

---
**Status:** Planned  
**Oleh:** Antigravity
