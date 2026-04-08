# Planner - User Management Hard Delete & Optimization

## Tujuan
Implementasi fitur penghapusan akun permanen (**Hard Delete**) untuk Admin yang aman terhadap batasan integritas database (**Foreign Key Constraints**) dan dioptimasi untuk performa tinggi.

## Fitur Utama
1. **Strategi Set Null**: Memutuskan hubungan data (Produk, Asesmen, Review, dll) dari User sebelum dihapus permanen, sehingga data historis perusahaan tetap terjaga.
2. **Nullable Reference**: Mengubah kolom `reviewer_id` dan `approver_id` menjadi opsional agar mendukung proses Set Null.
3. **Database Indexing**: Penambahan Index pada kolom referensi user di seluruh tabel utama untuk mencegah timeout saat proses penghapusan data besar.
4. **CORS & Preflight Fix**: Pengaturan izin eksplisit metode `DELETE` pada Backend agar sinkron dengan Frontend.

## Struktur Komponen
- **UseCase**: `DeleteUserUseCase` (Logika pembersihan & penghapusan)
- **Controller**: `UsersController` (Endpoint DELETE)
- **Entities**: `User`, `Product`, `ProductAssessment`, `AssessmentReview`, `AssessmentApproval`, `AssessmentAttachment`, `AssessmentComment`, `AssessmentAuditLog`.

## Alur Kerja
1. Admin mengklik tombol Hapus di FE.
2. BE menerima request dan memulai transaksi pembersihan.
3. BE melakukan `UPDATE` (Set Null) pada 7+ tabel yang mereferensikan User ID terkait menggunakan Index agar cepat.
4. BE melakukan `DELETE` permanen pada tabel `users`.
5. FE menerima respon sukses dan memperbarui tampilan.
