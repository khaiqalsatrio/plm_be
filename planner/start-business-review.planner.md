# Planner - Start Business Review

## Fungsi
Mengubah status review bisnis menjadi `in_progress` saat reviewer mulai bekerja. 

## Langkah-langkah
1. Buat `StartBusinessReviewUseCase`.
2. Input: `assessment_id` (UUID).
3. Validasi:
   - `assessment` harus ada.
   - `overall_status` harus `submitted` atau `in_review`.
   - `business_status` tidak boleh `finalized`.
4. Aksi:
   - Update `business_status` menjadi `in_progress`.
   - Update `overall_status` menjadi `in_review` (jika tadinya `submitted`).
   - Buat Audit Log (`AssessmentAuditLog`) mencatat perubahan status bisnis.
5. Buat endpoint `POST /v1/business-reviews/:id/start` di `BusinessReviewController`.
6. Tambahkan decorator `@Roles(BUSINESS_REVIEWER)`.

## Output
Respons sukses yang menandakan review bisnis telah dimulai.
