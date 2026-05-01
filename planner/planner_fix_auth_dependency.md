# Planner: Sinkronisasi Dependensi Auth di Master Data

## Konteks
Modul `MasterDataModule` saat ini mengalami `UnknownDependenciesException` karena `MasterDataController` menggunakan `JwtAuthGuard`. Guard tersebut membutuhkan `RevokedTokenRepository` yang didefinisikan dalam modul lain, namun belum diekspor atau diimpor dengan benar.

## Tujuan
Menghubungkan `AuthModule` dengan `MasterDataModule` agar `JwtAuthGuard` mendapatkan akses ke dependensi yang dibutuhkannya tanpa harus menonaktifkan fitur keamanan.

## Strategi Eksekusi
1. **Enkapsulasi Auth**: Memastikan `RevokedToken` entity terdaftar di `AuthModule` dan diekspor agar tersedia bagi modul lain.
2. **Injeksi Modul**: Mengimpor `AuthModule` ke dalam `MasterDataModule`.
3. **Verifikasi**: Memastikan aplikasi dapat berjalan kembali (boot up) tanpa error dependensi.

## Risiko & Mitigasi
- **Risiko**: Conflict import jika `AuthModule` belum ada.
- **Mitigasi**: Membuat `AuthModule` baru jika belum tersedia atau memperbarui yang sudah ada.