# Planner - Get Business Owner Assessment Detail

## Fungsi
Mengambil detail ringkasan hasil penilaian (Technical, Business, Legal) serta rekomendasi Product Manager untuk dipantau oleh Business Owner.

## Kondisi Data
- Data harus difilter berdasarkan `business_unit_id` user yang login (Security check).
- **Hanya menampilkan ringkasan (`reviews`)**, bukan detail jawaban per kriteria (`responses`).

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment`.
2.  **Relations**:
    -   `product`, `product.category`, `product.business_unit`.
    -   `reviews`: Ambil semua review dari Technical, Business, Legal.
    -   `approvals`: Ambil catatan keputusan PM.
    -   `attachments`: Ambil dokumen pendukung.
3.  **Data Mapping**: Pastikan data `responses` **TIDAK** diambil/diekspos ke BO.
4.  **Validasi**: Pastikan `assessment.product.business_unit_id == logged.business_unit_id`.

## Endpoint
`GET /v1/business-owners/assessment/:id`
