# Planner - Submit Legal Review

## Fungsi
Finalisasi penilaian hukum, menghitung skor akhir domain legal, dan memperbarui status assessment.

## Langkah-langkah
1. Buat `SubmitLegalReviewUseCase`.
2. Input: `assessment_id`, `summary`, `risk_level`, `recommendation`.
3. Validasi:
   - Kriteria hukum wajib harus sudah diisi.
   - Status harus `in_progress` atau `returned`.
4. Aksi:
   - Hitung rata-rata skor dari `AssessmentResponse` (`reviewer_type: legal`).
   - Simpan entri baru ke `AssessmentReview` dengan `review_type: legal`.
   - Update `ProductAssessment`:
     - `legal_status`: `finalized`.
     - `legal_score`: set hasil kalkulasi.
     - `legal_risk_level`: set sesuai input.
   - Audit Log (`AuditActionType.REVIEW`).
5. Buat endpoint `POST /v1/legal-reviews/:id/submit` di `LegalReviewController`.
6. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Respons sukses yang menandakan review hukum telah di-submit secara final.
