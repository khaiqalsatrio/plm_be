# Planner - Submit Business Review

## Fungsi
Finalisasi penilaian bisnis, menghitung skor akhir domain bisnis, dan memperbarui status assessment.

## Langkah-langkah
1. Buat `SubmitBusinessReviewUseCase`.
2. Input: `assessment_id`, `summary`, `risk_level`, `recommendation`.
3. Validasi:
   - Semua kriteria bisnis yang *required* harus sudah diisi.
   - Status harus `in_progress` atau `returned`.
4. Aksi:
   - Hitung rata-rata skor dari `AssessmentResponse` (`reviewer_type: business`).
   - Simpan entri baru ke `AssessmentReview` dengan `review_type: business`.
   - Update `ProductAssessment`:
     - `business_status`: `finalized`.
     - `business_score`: set hasil kalkulasi.
     - `business_risk_level`: set sesuai input.
   - Audit Log.
5. Buat endpoint `POST /v1/business-reviews/:id/submit` di `BusinessReviewController`.
6. Tambahkan decorator `@Roles(BUSINESS_REVIEWER)`.

## Output
Respons sukses yang menandakan review bisnis telah di-submit secara final.
