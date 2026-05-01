# Planner - Get Approver Assessment Detail

## Fungsi
Mengambil detail lengkap hasil penilaian (Technical, Business, Legal) serta lampiran dokumen bertanda tangan untuk divalidasi oleh Approver.

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment`.
2.  **Relations**:
    -   `product`, `product.category`, `product.business_unit`.
    -   `reviews`, `reviews.reviewer`: Ambil ringkasan setiap domain.
    -   `responses`: (Berdasarkan PRD, Approver berhak melihat detail skor).
    -   `approvals`: Menampilkan rekomendasi PM.
    -   `attachments`: Menampilkan `SIGNED_DOCUMENT` untuk verifikasi.
3.  **Data Mapping**: Pastikan semua informasi yang dibutuhkan untuk pemeriksaan silang tersedia.
4.  **Security**: Role `approver` saja.

## Endpoint
`GET /v1/approvers/assessment/:id`
