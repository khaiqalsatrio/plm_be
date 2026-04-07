# Planner - Get Product Manager Queue

## Fungsi
Mengambil daftar assessment yang sedang menunggu keputusan final dari Product Manager.

## Kondisi Data
- Assessment harus dalam status `submitted` atau `in_review`.
- (Opsional) Menampilkan indikator apakah ketiga reviewer (Technical, Business, Legal) sudah selesai atau belum.

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment` repository.
2.  **Query**:
    -   Filter `overall_status` IN (`submitted`, `in_review`, `need_revision`).
    -   Join dengan `product`, `product.category`, `product.business_unit`.
    -   Join dengan `reviews` untuk melihat status per domain.
3.  **Pagination**: Terapkan paginasi standar menggunakan `PaginateDto`.
4.  **Output**: Kembalikan list assessment beserta metadata (total, limit, page).

## Endpoint
`GET /v1/product-managers/queue`
