# To-Do: Fix JwtAuthGuard Dependency

## 1. Konfigurasi AuthModule
- [ ] Buat atau perbarui file `src/auth/auth.module.ts`.
- [ ] Daftarkan `RevokedToken` entity ke dalam `TypeOrmModule.forFeature([])` di bagian `imports`.
- [ ] Tambahkan `TypeOrmModule` ke bagian `exports` di `AuthModule`.
- [ ] Tambahkan `JwtAuthGuard` ke bagian `providers` dan `exports` jika diperlukan.

## 2. Integrasi MasterDataModule
- [ ] Buka file `src/master-data/master-data.module.ts`.
- [ ] Tambahkan `AuthModule` ke dalam array `imports` pada dekorator `@Module`.
- [ ] Pastikan path import `AuthModule` sudah benar.

## 3. Validasi & QA
- [ ] Jalankan aplikasi dengan `npm run start:dev`.
- [ ] Pastikan log menunjukkan `Nest application successfully started`.
- [ ] Cek Swagger (`/docs`) untuk memastikan endpoint Master Data muncul kembali.
- [ ] (Opsional) Tambahkan path `/v1/master-data/business-units` ke `EXCLUDED_PATHS` di `jwt-auth.guard.ts` jika ingin akses tanpa token.