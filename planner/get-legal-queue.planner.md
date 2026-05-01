# Planner - Get Legal Queue

## Fungsi
Mengambil daftar assessment yang memerlukan tinjauan dari sisi hukum (*legal review*).

## Langkah-langkah
1. Buat `GetLegalQueueUseCase`.
2. Gunakan `ProductAssessment` repository.
3. Query dengan filtering:
   - `overall_status` IN (`submitted`, `in_review`).
   - Filter `legal_status` (opsional) untuk melihat yang sudah selesai vs belum.
4. Join dengan relasi `product`, `category`, `business_unit`, dan `template`.
5. Implementasikan paginasi dengan `PaginateDto`.
6. Buat endpoint `GET /v1/legal-reviews` di `LegalReviewController`.
7. Tambahkan decorator `@Roles(LEGAL_REVIEWER)`.

## Output
Daftar assessment yang siap ditampilkan di dashboard Legal Reviewer.
