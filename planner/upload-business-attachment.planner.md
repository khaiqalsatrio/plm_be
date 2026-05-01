# Planner - Upload Business Attachment

## Fungsi
Mengunggah file pendukung khusus untuk domain bisnis ke MinIO.

## Langkah-langkah
1. Buat `UploadBusinessAttachmentUseCase`.
2. Gunakan `MinioClient` untuk proses upload.
3. Gunakan bucket publik (`tetangga`) atau privat (`legal-tetangga`) tergantung flag `is_private`.
4. Simpan metadata file ke tabel `AssessmentAttachment`.
   - `assessment_id`
   - `section_id` (jika ada)
   - `criteria_id` (jika ada)
   - `uploaded_by`: reviewer ID.
5. Buat endpoint `POST /v1/business-reviews/:id/attachments` di `BusinessReviewController`.
6. Implementasikan `@ApiConsumes('multipart/form-data')` untuk Swagger.
7. Tambahkan decorator `@Roles(BUSINESS_REVIEWER)`.

## Output
Metadata lampiran yang berhasil diunggah dan disimpan ke database.
