# Planner - Refactoring LoginUseCase (DRY)

## Fungsi
Meningkatkan kualitas kode dengan menghilangkan duplikasi logika autentikasi pada modul Login. Sebelumnya, logic login biasa dan admin terpisah dengan kode yang hampir identik.

## Langkah-langkah
1.  **Identifikasi Kode Duplikat**: Memeriksa `doLogin` dan `doLoginAdmin` pada `LoginUseCase.ts`.
2.  **Ekstraksi ke Fungsi Privat**: Membuat fungsi privat `performLogin(username, password, isAdmin)` yang menangani:
    -   Hasing username ke `email_hash`.
    -   Lookup user dengan filter role yang sesuai jika admin.
    -   Verifikasi password dengan `bcrypt.compare`.
    -   Generasi payload JWT yang berbeda untuk admin (phone) vs user biasa (email, avatar).
    -   Perekaman fingerprint untuk user biasa.
3.  **Pembaruan Controller Call**: Menyesuaikan `doLogin` dan `doLoginAdmin` untuk memanggil fungsi privat tersebut.
4.  **Verifikasi Output JSON**: Memastikan format respon JSON (user, token, fingerprint) tetap sama dengan fungsi asli agar tidak merusak frontend.

## Manfaat
-   Kode lebih ringkas dan bersih.
-   Jika ada perbaikan pada alur login di masa depan (misalnya update masa berlaku token), cukup dilakukan di satu tempat.
