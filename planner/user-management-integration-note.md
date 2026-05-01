# Catatan Rilis & Integrasi: User Management Hard Delete

Dokumen ini ditujukan untuk tim **Frontend (FE)** agar sinkron dengan perubahan arsitektur terbaru di Backend (BE) terkait fitur manajemen user.

## 1. Perubahan Endpoint
- **URL**: `DELETE http://localhost:3001/v1/users/:id`
- **Metode**: `DELETE` (Sekarang sudah diizinkan secara eksplisit di CORS).
- **Perilaku**: Menggunakan **Hard Delete** (Penghapusan permanen), namun data terkait (Product, Assessment, Review) tidak akan ikut terhapus melainkan akan diubah menjadi **NULL** (Set Null) untuk menjaga integritas data historis.

## 2. Penyesuaian di Frontend (PENTING!)
Tim FE diharapkan melakukan update berikut di aplikasi:

### A. Axios Timeout
Karena proses `DELETE` melibatkan pembersihan data di banyak tabel (Set Null), proses ini bisa memakan waktu sedikit lebih lama jika database sedang sibuk.
- **Rekomendasi**: Naikkan `timeout` axios menjadi minimal **30.000ms (30 detik)**.
- **Contoh Config**: 
  ```javascript
  const api = axios.create({ baseURL: '...', timeout: 30000 });
  ```

### B. Error Handling & Feedback
BE sekarang mengembalikan pesan error yang lebih deskriptif. FE disarankan memperbarui interceptor untuk menangani kasus berikut:
- **Network Error**: Gunakan pengecekan `if (!error.response)` untuk mendeteksi masalah koneksi atau CORS.
- **Timeout**: Gunakan pengecekan `if (error.code === 'ECONNABORTED')` untuk memberi pesan "Server sibuk, silakan coba lagi".
- **Validation Error**: Tampilkan `message` langsung dari body response jika status code adalah `400`.

## 3. Konfigurasi CORS
Back-end sudah diperbarui untuk mengizinkan:
- **Origin**: Port 3000 (Localhost).
- **Allowed Methods**: `GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD`.
- **Allowed Headers**: `Authorization, Content-Type, Accept`.

---
*Back-end Developer (Role BE)*
