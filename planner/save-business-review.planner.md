# Planner - Save Business Review Draft

## Fungsi
Bekerja sama dengan `AssessmentResponse` untuk menyimpan draft jawaban kriteria bisnis selama penilaian berlangsung.

## Langkah-langkah
1. Buat `SaveBusinessReviewDraftUseCase`.
2. Input: `assessment_id`, `responses` (array kriteria_id, skor, catatan).
3. Validasi:
   - `assessment` harus dalam status `in_progress` untuk bisnis.
4. Aksi:
   - Iterasi `responses`.
   - Gunakan `upsert` pada `AssessmentResponse` dengan `assessment_id`, `criteria_id`, dan `reviewer_type: 'business'`.
   - Update `score`, `note`, dan `risk_level` (jika ada).
5. Buat endpoint `POST /v1/business-reviews/:id/save` di `BusinessReviewController`.
6. Tambahkan decorator `@Roles(BUSINESS_REVIEWER)`.

## Output
Respons sukses yang menandakan draft penilaian bisnis telah disimpan.
