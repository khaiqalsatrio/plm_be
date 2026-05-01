# To-Do: Upload Technical Attachment (Bucket Privat & Presigned URL)

Daftar tugas untuk implementasi pengunggahan lampiran dengan dukungan file privat.

## 1. Implementasi Selesai (Completed Tasks)
- [x] Membuat `docker-compose.yml` untuk MinIO.
- [x] Penyesuaian `.env` untuk MinIO.
- [x] Menambahkan kolom `bucket` dan `is_private` di `AssessmentAttachment`.
- [ ] Implementasi pemilihan bucket di `UploadTechnicalAttachmentUseCase`.
- [ ] Membuat `GetAttachmentUrlUseCase` untuk Presigned URL.
- [ ] Endpoint akses URL di `TechnicalReviewController`.

## 2. Implementasi Berjalan (In Progress)
- [ ] Update `UploadTechnicalAttachmentUseCase` untuk parameter `is_private`.

## 3. Rencana Ke Depan (Backlog / Next Steps)
- [ ] Otomatisasi generate Link TTD untuk PDF review.

---
**Status Terakhir:** 6 April 2026  
**Oleh:** Antigravity
