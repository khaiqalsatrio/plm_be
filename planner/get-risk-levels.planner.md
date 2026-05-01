# Planner - Get Risk Levels (Dropdown List)

## Fungsi
Mengambil daftar tingkat risiko (Risk Levels) dari master data untuk mengisi pilihan dropdown pada Frontend.

## Langkah-langkah
1.  **Repository**: Gunakan `MasterRiskLevel` repository.
2.  **Filter**: Tidak ada filter khusus (ambil semua).
3.  **Urutan**: Urutkan berdasarkan `score_min` secara menaik (ASC) agar urutan dari risiko terendah ke tertinggi.
4.  **Output**: List objek risk level lengkap (`id`, `code`, `name`, `color`, `description`).

## Endpoint
`GET /v1/master-data/risk-levels`
