# Planner - Get Template Detail (Full Structure)

## Fungsi
Mengambil satu template secara detail beserta seluruh struktur hierarki (Section -> Criteria -> Question) untuk membantu Frontend me-render form pertanyaan secara dinamis.

## Langkah-langkah
1.  **Repository**: Gunakan `AssessmentTemplate` repository.
2.  **Relasi**: Muat relasi bersarang: `sections`, `sections.criteria`, `sections.criteria.questions`.
3.  **Pengurutan**:
    -   `sections` diurutkan berdasarkan `sort_order`.
    -   `criteria` diurutkan berdasarkan `sort_order`.
    -   `questions` diurutkan berdasarkan `sort_order`.
4.  **Output**: Objek template tunggal dengan data struktur lengkap.

## Endpoint
`GET /v1/master-data/templates/:id`
