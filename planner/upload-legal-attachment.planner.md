# Planner - Upload Legal Attachment

## Fungsi
Mengunggah dokumen legal atau kepatuhan yang bersifat rahasia ke bucket privat MinIO.

## Langkah-langkah
1. Buat `UploadLegalAttachmentUseCase`.
2. Gunakan `MinioClient` untuk proses upload.
3. Gunakan bucket privat (`legal-tetangga`) secara default unless specified otherwise.
4. Simpan metadata file ke tabel `AssessmentAttachment`:
   - `assessment_id`
   - `section_id` (jika ada)
   - `criteria_id` (jika ada)
   - `is_private`: `true`.
   - `bucket`: `legal-tetangga`.
   - `uploaded_by`: ID reviewer legal.
5. Buat endpoint `POST /v1/legal-reviews/:id/attachments` di `LegalReviewController`.
6. Implementasikan `@ApiConsumes('multipart/form-data')`.
7. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Metadata lampiran yang berhasil diunggah secara privat dan disimpan ke database.
