# Planner - Get Assessment Approval Detail

## Fungsi
Mengambil detail lengkap hasil review dari ketiga domain (Technical, Business, Legal) untuk membantu PM dalam mengambil keputusan final.

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment` repository.
2.  **Relations**:
    -   `product`, `product.category`, `product.business_unit`.
    -   `reviews`: Ambil semua review (Technical, Business, Legal).
    -   `responses`: (Opsional) Ambil hanya jika PM ingin melihat detail jawaban.
    -   `attachments`: Ambil semua dokumen pendukung.
3.  **Data Mapping**: Pastikan data terstruktur sedemikian rupa sehingga PM bisa membandingkan ringkasan dari tiap domain dengan mudah.
4.  **Security**: Hanya boleh diakses oleh PM atau admin.

## Endpoint
`GET /v1/product-managers/assessment/:id`
