# Planner - Get Business Owner Queue

## Fungsi
Mengambil daftar assessment produk yang berada dalam cakupan Unit Bisnis milik Business Owner tersebut.

## Kondisi Data
- User yang login harus memiliki role `business_owner` dan memiliki `business_unit_id`.
- Data yang ditampilkan hanya produk yang memiliki `business_unit_id` yang sama dengan user.

## Langkah-langkah
1.  **Repository**: Gunakan `Product` (untuk filter BU) dan `ProductAssessment`.
2.  **Query**:
    -   Join `ProductAssessment` dengan `Product`.
    -   Filter `product.business_unit_id = logged.business_unit_id`.
    -   Filter `overall_status != 'draft'` (BO hanya memantau yang sudah diajukan).
3.  **Pagination**: Gunakan `PaginateDto`.
4.  **Output**: List produk berserta status assessment terakhir dan ringkasan skor (jika ada).

## Endpoint
`GET /v1/business-owners/queue`
