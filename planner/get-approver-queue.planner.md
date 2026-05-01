# Planner - Get Approver Queue

## Fungsi
Mengambil daftar assessment yang sudah mendapatkan rekomendasi dari Product Manager dan memerlukan validasi sistem akhir oleh Approver.

## Kondisi Data
- Assessment dalam status `in_review` (setelah PM memberikan keputusan/rekomendasi).
- (Opsional) Memiliki indikator apakah dokumen bertanda tangan (`SIGNED_DOCUMENT`) sudah diunggah atau belum.

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment`.
2.  **Query**:
    -   Join dengan `product`.
    -   Join dengan `approvals` (melihat rekomendasi PM).
    -   Join dengan `attachments` (untuk mengecek tipe `SIGNED_DOCUMENT`).
    -   Filter status assessment yang relevan (misal yang sudah di-review PM).
3.  **Pagination**: Gunakan `PaginateDto`.
4.  **Output**: List assessment beserta status kelengkapan dokumen.

## Endpoint
`GET /v1/approvers/queue`
