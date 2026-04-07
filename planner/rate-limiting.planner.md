# Planner - Implementasi Rate Limiting

## Fungsi
Melindungi endpoint-endpoint sensitif (seperti Login dan Auth Google) dari serangan *Brute Force* dengan membatasi jumlah permintaan yang diizinkan dalam satu jendela waktu.

## Langkah-langkah
1.  **Instalasi**: Menginstal package `@nestjs/throttler`.
2.  **Konfigurasi Global**: Mendaftarkan `ThrottlerModule` di `AppModule` dengan parameter `ttl` (window waktu) dan `limit` (batas permintaan) yang diambil dari `Constant`.
3.  **Penerapan di Controller**: Membungkus method login di `LoginController` dan `OauthController` dengan `@UseGuards(ThrottlerGuard)`.
4.  **Konfigurasi Lingkungan**: Menambahkan variabel `RATE_LIMIT_WINDOW_MS` dan `RATE_LIMIT_MAX_ATTEMPTS` di dalam file `.env`.
5.  **Pembersihan**: Menghapus `RateLimitGuard` lama yang dibuat secara manual untuk menjaga kebersihan basis kode.

## Endpoint yang Dilindungi
- `POST /v1/login`
- `POST /v1/login/admin`
- `POST /v1/oauth/google`
