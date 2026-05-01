# Backend Planner - Assessment & Attachment Integration

Dokumen ini merangkum rencana arsitektur dan integrasi untuk fitur Product Assessment dan Lampiran.

## Fokus Utama
1. **Integrasi Lifecycle Asesmen**: Menghubungkan proses dari Draft -> Submitted -> Review -> Approved.
2. **Manajemen Lampiran**: Implementasi penyimpanan file menggunakan MinIO.
3. **Validasi Data**: Memastikan konsistensi tipe data (seperti transform string ke number pada query params untuk User Management).

## Struktur Modul
- **Module**: `ProductAssessmentModule`, `AssessmentAttachmentModule`.
- **Controller**:
  - `ProductAssessmentController`: CRUD asesmen, submit, dan export PDF.
  - `AssessmentAttachmentController`: Upload & list lampiran per asesmen.
- **UseCase**:
  - `SubmitAssessmentUseCase`: Mengubah status dan validasi skor.
  - `UploadAttachmentUseCase`: Integrasi MinIO dan penyimpanan metadata.

## Integrasi Libraries
- **MinIO**: Penanganan file upload (public & private bucket).
- **PDFKit**: Generasi laporan asesmen otomatis.
- **TypeORM**: Relasi antar tabel `product_assessments`, `products`, and `assessment_attachments`.
