# Planner - Save Legal Review Draft

## Fungsi
Menyimpan draft jawaban kriteria legal selama penilaian berlangsung.

## Langkah-langkah
1. Buat `SaveLegalReviewUseCase`.
2. Input: `assessment_id`, `responses` (array kriteria_id, skor, catatan).
3. Validasi:
   - `assessment` harus dalam status `in_progress` untuk legal.
4. Aksi:
   - Iterasi `responses`.
   - Gunakan `upsert` pada `AssessmentResponse` dengan `assessment_id`, `criteria_id`, dan `reviewer_type: 'legal'`.
   - Update `score`, `note`, dan `risk_level` (jika ada).
5. Buat endpoint `POST /v1/legal-reviews/:id/save` di `LegalReviewController`.
6. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Respons sukses yang menandakan draft penilaian legal telah disimpan.
