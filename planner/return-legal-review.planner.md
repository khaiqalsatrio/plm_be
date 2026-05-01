# Planner - Return Legal Review

## Fungsi
Mengembalikan assessment kepada Product Owner (PO) jika ada aspek hukum atau dokumen kepatuhan yang memerlukan revisi.

## Langkah-langkah
1. Buat `ReturnLegalReviewUseCase`.
2. Input: `assessment_id`, `reason/note`.
3. Validasi:
   - Status harus `in_progress`.
4. Aksi:
   - Update `overall_status` menjadi `need_revision`.
   - Update `legal_status` menjadi `returned`.
   - Buat Audit Log (`AuditActionType.RETURN`) mencatat alasan pengembalian.
5. Buat endpoint `POST /v1/legal-reviews/:id/return` di `LegalReviewController`.
6. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Respons sukses yang menandakan assessment telah dikembalikan ke PO untuk perbaikan aspek legal.
