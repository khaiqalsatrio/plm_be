# Planner: Save Technical Review Draft

Fungsi ini memungkinkan Technical Reviewer untuk menyimpan jawaban sementara tanpa memfinalisasi review.

## 1. Analisis Kebutuhan
Review teknis bisa sangat panjang. Reviewer perlu menyimpan progres mereka agar tidak hilang jika koneksi terputus atau perlu dilanjutkan di lain waktu.

## 2. Logika Bisnis
- Menerima array jawaban (`responses`) per pertanyaan.
- Untuk setiap jawaban:
  - Cek apakah record `AssessmentResponse` sudah ada untuk pertanyaan tersebut di assessment ini.
  - Jika ada, update `answer_text`, `answer_number`, `score`, dll.
  - Jika belum ada, buat record baru.
- Menghitung skor sementara (opsional, untuk ditampilkan di UI).
- Status `technical_status` tetap `in_progress`.

## 3. Komponen Teknis
- **DTO:** `SaveTechnicalReviewDto` (berisi array of response).
- **Use Case:** `SaveTechnicalReviewDraftUseCase`.
- **Method:** `execute(id: string, dto: SaveTechnicalReviewDto, loggedUser: any)`.
- **Database:** Bulk upsert atau loop update untuk respons.

## 4. Keamanan
- Hanya role `technical_reviewer`.
- Validasi bahwa reviewer yang sedang menyimpan adalah reviewer yang melakukan "Start" (atau memiliki akses).

---
**Status:** Planned  
**Oleh:** Antigravity
