# Planner: Start Technical Review

Fungsi ini digunakan oleh Technical Reviewer untuk mulai mereview sebuah assessment secara resmi.

## 1. Analisis Kebutuhan
Setelah reviewer memilih sebuah assessment dari antrean, mereka harus memberitahu sistem bahwa mereka sedang mengerjakannya.

## 2. Logika Bisnis
- Mengambil data `ProductAssessment` berdasarkan ID.
- Memastikan status `overall_status` adalah `submitted` atau `in_review`.
- Memastikan `technical_status` masih `not_started` atau `returned` (untuk re-review).
- Update `technical_status` menjadi `in_progress`.
- Update `overall_status` menjadi `in_review` (jika tadinya masih `submitted`).
- Inisialisasi record `AssessmentReview` untuk domain teknis jika belum ada.
- Mencatat `technical_reviewer_id` pada record assessment atau review terkait.

## 3. Komponen Teknis
- **Use Case:** `StartTechnicalReviewUseCase`
- **Method:** `execute(id: string, loggedUser: any)`
- **Transaction:** Sebaiknya menggunakan database transaction karena mengupdate status di beberapa tabel.

## 4. Keamanan
- Hanya role `technical_reviewer`.
- Validasi kepemilikan atau hak akses review (jika sudah di-assign ke orang lain, orang lain tidak bisa start).

---
**Status:** Planned  
**Oleh:** Antigravity
