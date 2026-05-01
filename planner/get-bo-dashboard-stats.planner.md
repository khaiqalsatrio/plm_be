# Planner - Get Business Owner Dashboard Stats

## Fungsi
Mengambil data agregat (statistik) untuk memantau kesehatan portofolio produk khusus di Unit Bisnis milik Business Owner tersebut.

## Langkah-langkah
1.  **Repository**: Gunakan `ProductAssessment`.
2.  **Agregasi**:
    -   Hitung total produk di BU terkait.
    -   Hitung jumlah produk berdasarkan `overall_status` (Draft, In-Review, Approved, Rejected).
    -   Hitung distribusi risiko (`technical_risk_level`, `business_risk_level`, `legal_risk_level`) di unit bisnis tersebut.
3.  **Filter**: Selalu sertakan `product.business_unit_id = logged.business_unit_id`.
4.  **Output**: JSON objek berisi metrik-metrik yang diperlukan untuk Dashboard BO.

## Endpoint
`GET /v1/business-owners/dashboard-stats`
