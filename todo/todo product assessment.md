# To-Do: Product Assessment

Berdasarkan dokumen perencanaan (*planner*), berikut adalah daftar tugas (to-do list) yang perlu dieksekusi untuk merampungkan modul **Product Assessment** di backend:

## 1. Fungsionalitas Lampiran File (File Attachments)
- [/] Daftarkan controller `assessment-attachment.controller.ts`.
- [ ] Buat DTO/schema validasi untuk payload unggahan lampiran.
- [ ] Buat `upload-attachment.usecase.ts` untuk memproses penyimpanan file (MinIO) beserta record relasinya di database.
- [ ] Buat `delete-attachment.usecase.ts` untuk menghapus file beserta pencatatannya.
- [ ] Hubungkan endpoint `POST /` dan `GET /` di `assessment-attachment.controller.ts` ke use case.

## 2. Fitur Duplikasi Dokumen (Duplicate Assessment)
- [x] Buat `duplicate-assessment.usecase.ts` yang menginisiasi draft assessment baru dengan menyalin field-field dari ID lama.
- [x] Implementasikan pembuatan jejak audit terkait informasi duplikasi.
- [x] Daftarkan endpoint `POST /duplicate` di `product-assessment.controller.ts`.
- [x] Masukkan use case duplikasi tersebut ke `product-assessment.module.ts`.

## 3. Fitur Kolaborasi/Komentar (Comments)
- [/] Daftarkan controller `assessment-comment.controller.ts`.
- [ ] Buat DTO untuk mencatat pesan/komentar baru (`AddCommentDto` dsb.).
- [ ] Buat `add-assessment-comment.usecase.ts` untuk menambahkan record komentar.
- [ ] Hubungkan endpoint `POST /` dan `GET /` di `assessment-comment.controller.ts` ke use case.
- [ ] Pastikan respon endpoint *Get Detail* (findOne) memuat secara rapi relasi/isian daftar komentar yang telah ada.

## 4. General Best Practice & QA
- [ ] Bersihkan/ubah seluruh *typing* bertipe `any` di `product-assessment.controller.ts` agar lebih *type-safe*.
- [ ] Validasi manual fungsi `createAuditFields` dan `updateAuditFields` supaya berjalan semestinya di seluruh *use case* baru.
- [ ] Konfirmasi bahwa penggunaan `@HttpCode()` telah eksplisit di setiap endpoint yang akan dibuat maupun yang sudah ada.
- [ ] Tes unit/fungsional dari seluruh flow module assessment dan pastikan passing (`npm run test`).
