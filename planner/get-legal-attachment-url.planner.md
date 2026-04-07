# Planner - Get Legal Attachment URL

## Fungsi
Menghasilkan URL akses untuk dokumen legal. Jika file bersifat privat (default untuk legal), maka sistem akan menghasilkan *Presigned URL* dengan masa berlaku terbatas.

## Langkah-langkah
1. Buat `GetLegalAttachmentUrlUseCase`.
2. Gunakan `AssessmentAttachment` repository untuk mencari metadata file berdasarkan `attachmentId`.
3. Validasi:
   - File harus ada.
   - User harus memiliki role `legal_reviewer` (sudah dihandle di Controller).
4. Aksi:
   - Jika `is_private` adalah `true`:
     - Panggil `minioClient.getPresignedUrl` dengan bucket dan object name terkait.
     - Set expiry (misal: 1 jam / 3600 detik).
   - Jika `is_private` adalah `false`:
     - Kembalikan URL statis yang tersimpan.
5. Buat endpoint `GET /v1/legal-reviews/:assessmentId/attachments/:attachmentId/url` di `LegalReviewController`.
6. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
URL (Presigned atau Statis) untuk mengakses dokumen legal.
