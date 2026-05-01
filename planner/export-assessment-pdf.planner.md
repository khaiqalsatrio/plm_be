# Planner - Export Assessment to PDF

## Fungsi
Mengekspor seluruh data hasil penilaian produk (Technical, Business, dan Legal) ke dalam format PDF yang siap dicetak dan ditandatangani secara manual.

## Langkah-langkah
1.  **Instalasi Library**:
    -   Menggunakan `pdfkit` untuk pembuatan PDF secara pemrograman.
    -   Menggunakan `blob-stream` (jika perlu) atau langsung menggunakan stream.
2.  **Pembuatan Use Case**:
    -   Buat `ExportAssessmentPdfUseCase`.
    -   Ambil data lengkap `ProductAssessment` dari database (termasuk relasi `product`, `responses`, `reviews`, `template`).
    -   Format data ke dalam layout PDF (Header, Tabel Penilaian, Catatan Reviewer).
    -   Tambahkan section **Tanda Tangan** di bagian akhir dokumen.
3.  **Pembuatan Controller**:
    -   Tambahkan endpoint `GET /v1/product-assessments/:id/export-pdf` di `ProductAssessmentController`.
    -   Gunakan `@Header('Content-Type', 'application/pdf')` dan `@Header('Content-Disposition', 'attachment; filename=assessment.pdf')`.
4.  **Layout PDF**:
    -   Judul Dokumen & Metadata Produk.
    -   Tabel Ringkasan Skor Keseluruhan.
    -   Rincian Jawaban per Kriteria (Technical, Business, Legal).
    -   Rekomendasi Final.
    -   Kolom Tanda Tangan (4 Kolom: PO, Tech, Business, Legal).

## Output
File `.pdf` yang berisi rangkuman lengkap penilaian produk.
