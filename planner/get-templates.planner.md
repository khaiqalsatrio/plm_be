# Planner - Get Templates (Dropdown List)

## Fungsi
Mengambil daftar template penilaian prokdut yang aktif untuk mengisi pilihan dropdown pada form pengajuan assessment di Frontend.

## Langkah-langkah
1.  **Repository**: Gunakan `AssessmentTemplate` repository.
2.  **Filter**: Ambil data dengan `is_active: true`.
3.  **Seleksi Kolom**: Ambil kolom minimal (`id`, `template_name`, `template_code`, `product_type`).
4.  **Urutan**: Urutkan berdasarkan `template_name` secara alfabetis.
5.  **Output**: List objek template.

## Endpoint
`GET /v1/master-data/templates`
