# Planner: Submit Technical Review

Fungsi ini digunakan untuk menyelesaikan proses review teknis secara final.

## 1. Analisis Kebutuhan
Setelah semua kriteria dinilai, reviewer memberikan kesimpulan, rekomendasi, dan memfinalisasi skor teknis.

## 2. Logika Bisnis
- Mengambil data `ProductAssessment` dan semua `AssessmentResponse` domain teknis.
- Validasi: Semua pertanyaan wajib harus sudah terisi.
- Kalkulasi Skor: Menghitung rata-rata skor teknis berdasarkan bobot kriteria.
- Update `AssessmentReview`:
  - `review_status = reviewed`.
  - `reviewed_at = current_timestamp`.
  - `score = total_calculated_score`.
  - `risk_level = final_risk_level`.
  - `summary = final_summary`.
  - `recommendation = pass / pass_with_notes / etc`.
- Update `ProductAssessment`:
  - `technical_status = reviewed`.
  - `technical_score = total_calculated_score`.
  - `technical_risk_level = final_risk_level`.
- Jika ini adalah review terakhir (Business & Legal sudah reviewed), sistem bisa mengupdate `overall_status` (opsional, tergantung alur global).

## 3. Komponen Teknis
- **DTO:** `SubmitTechnicalReviewDto`.
- **Use Case:** `SubmitTechnicalReviewUseCase`.
- **Method:** `execute(id: string, dto: SubmitTechnicalReviewDto, loggedUser: any)`.
- **Database:** Transaksi untuk konsistensi data antara repositori dan assessment.

## 4. Keamanan
- Hanya role `technical_reviewer`.
- Validasi integritas data (tidak boleh submit jika data tidak lengkap).

---
**Status:** Planned  
**Oleh:** Antigravity
