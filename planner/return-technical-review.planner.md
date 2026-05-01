# Planner: Return Technical Review

Fungsi ini digunakan jika reviewer menemukan masalah teknis yang memerlukan perbaikan (revisi) oleh Product Owner sebelum review dapat dilanjutkan.

## 1. Analisis Kebutuhan
Reviewer tidak dapat menyetujui assessment karena ada kekurangan data atau ketidaksesuaian arsitektur/keamanan yang harus diperbaiki oleh PO.

## 2. Logika Bisnis
- Mengambil data `ProductAssessment` dan `AssessmentReview` terkait.
- Update `AssessmentReview`:
  - `review_status = returned`.
  - `summary = return_reason / catatan revisi`.
  - `recommendation = revision_needed`.
- Update `ProductAssessment`:
  - `technical_status = returned`.
  - `overall_status = need_revision`.
- (Opsional) Mengirim notifikasi ke Product Owner.

## 3. Komponen Teknis
- **DTO:** `ReturnTechnicalReviewDto` (berisi alasan pengembalian/catatan revisi).
- **Use Case:** `ReturnTechnicalReviewUseCase`.
- **Method:** `execute(id: string, dto: ReturnTechnicalReviewDto, loggedUser: any)`.
- **Database:** Transaksi untuk memastikan atomisitas update status.

## 4. Keamanan
- Hanya role `technical_reviewer`.
- Validasi bahwa assessment saat ini memang sedang dalam fase review (`in_review` / `in_progress`).

---
**Status:** Planned  
**Oleh:** Antigravity
