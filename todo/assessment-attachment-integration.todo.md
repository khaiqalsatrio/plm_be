# Backend Todo - Assessment & Attachment Integration

Daftar pekerjaan yang telah diselesaikan dan rencana peningkatan di masa depan terkait fitur asesmen dan integrasi admin.

## Completed Tasks [DONE]
- [x] Implementasi `UploadAttachmentUseCase` untuk integrasi MinIO.
- [x] Aktivasi `AssessmentAttachmentController` (Upload & List).
- [x] Registrasi `AssessmentAttachmentModule` ke dalam `ProductAssessmentModule`.
- [x] Perbaikan `PaginateDto` dengan `@Type(() => Number)` untuk mengatasi error validasi query params pada User Management.
- [x] Sinkronisasi endpoint User Management dengan FE (Port 3001).

## Future Improvements [TODO]
- [ ] Validasi *Mimetype* file yang lebih ketat pada saat upload lampiran.
- [ ] Implementasi fitur *Delete Attachment* beserta penghapusan file di MinIO.
- [ ] Penambahan Audit Log otomatis saat ada perubahan status pada `product_assessments`.
- [ ] Optimasi query pada `GetUsersUseCase` untuk penanganan data skala besar.
