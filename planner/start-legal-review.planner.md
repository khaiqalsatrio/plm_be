# Planner - Start Legal Review

## Fungsi
Mengubah status review hukum menjadi `in_progress` saat reviewer mulai bekerja. 

## Langkah-langkah
1. Buat `StartLegalReviewUseCase`.
2. Input: `assessment_id` (UUID).
3. Validasi:
   - `assessment` harus ada.
   - `overall_status` harus `submitted` atau `in_review`.
   - `legal_status` tidak boleh `finalized`.
4. Aksi:
   - Update `legal_status` menjadi `in_progress`.
   - Update `overall_status` menjadi `in_review` (jika tadinya `submitted`).
   - Buat Audit Log (`AssessmentAuditLog`) mencatat perubahan status legal.
5. Buat endpoint `POST /v1/legal-reviews/:id/start` di `LegalReviewController`.
6. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Respons sukses yang menandakan review hukum telah dimulai.
