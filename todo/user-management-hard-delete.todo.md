# TODO - User Management Hard Delete & Optimization

- [x] Implementasi logika Hard Delete pada `DeleteUserUseCase`
- [x] Perbaikan bug audit (`deleted_at`) pada `BaseEntity`
- [x] Modul registrasi (Mendaftarkan entitas terkait ke `UsersModule`)
- [x] Modifikasi Entity (Set `reviewer_id` & `approver_id` menjadi nullable)
- [x] Perluasan logika "Set Null" untuk tabel tambahan (Approval, Comment, Audit Log)
- [x] Optimasi Database: Penambahan `@Index` pada kolom user di tabel-tabel besar
- [x] Konfigurasi CORS: Izin eksplisit metode `DELETE` di `main.ts`
- [x] Sinkronisasi FE: Update `api.ts` (Timeout 30s & Descriptive Error Handling)
- [x] Verifikasi akhir di dashboard Admin (Sukses Penghapusan)
