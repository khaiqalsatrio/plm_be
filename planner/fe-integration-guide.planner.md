# Planner - Panduan Integrasi Frontend (FE)

Dokumen ini adalah kontrak antara Backend (BE) dan Frontend (FE) untuk memastikan seluruh fitur PLM yang telah kita bangun (berdasarkan folder `SPEC`) dapat diintegrasikan dengan mulus.

## 1. Protokol Komunikasi Utama

### Auth & Authorization
- **Metode**: Header wajib menyertakan token JWT setelah login.
- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Token Storage**: FE sebaiknya menyimpan token di `localStorage` atau `secure cookie`.

### Format Response (Standardified)
Seluruh API mengembalikan format JSON yang seragam:
```json
{
  "status": true,
  "message": "Pesan sukses atau error",
  "data": { ... },
  "meta": { "total": 10, "page": 1, ... }
}
```

---

## 2. Alur Integrasi Per Role (Berdasarkan SPEC)

### A. Product Owner (PO)
*   **Create Assessment**: `POST /v1/product-assessments`
*   **Submit to Review**: `POST /v1/product-assessments/:id/submit` (Status -> `submitted`).
*   **Upload Signed Doc**: `POST /v1/product-assessments/:id/attachments` (Pilih tipe `signed_document`).
    > [!IMPORTANT]
    > Pastikan FE memberikan opsi pilihan **`signed_document`** pada dropdown tipe file agar validasi Approver bisa lolos.

### B. Reviewers (Technical, Business, Legal)
*   **Start Review**: `POST /v1/{type}-reviews/:assessmentId/start` (Status -> `in_progress`).
*   **Submit Skor**: `POST /v1/{type}-reviews/:assessmentId/submit` (Input skor kriteria detail).

### C. Product Manager (PM)
*   **Final Decision**: `POST /v1/product-managers/assessment/:id/decision`.
    - PM memberikan rekomendasi. (Status assessment tetap `in_review` untuk dilanjutkan ke Approver).

### D. Business Owner (BO)
*   **Dashboard Stats**: `GET /v1/business-owners/stats` (Agregasi per Unit Bisnis).
*   **Queue Monitoring**: `GET /v1/business-owners/queue` (Hanya produk miliknya).

### E. Approver
*   **Final Validation**: `POST /v1/approvers/assessment/:id/validate`.
    - Ini adalah langkah terakhir. FE harus menampilkan tombol "Approve" hanya jika dokumen `signed_document` terdeteksi sudah ada di sistem.

---

## 3. Penanganan Error (Error Handling)
FE harus menangani status code berikut:
- **401 Unauthorized**: Redirect ke halaman Login.
- **403 Forbidden**: Role user tidak memiliki akses ke fitur ini.
- **429 Too Many Requests**: Tampilkan pesan "Terlalu banyak mencoba, silakan tunggu 1 menit" (Akibat Rate Limiter).
- **400 Bad Request**: Tampilkan isi `message` dari server (biasanya kesalahan validasi seperti "Dokumen tanda tangan belum ada").

---

## 4. Tips Debugging untuk FE
Gunakan **Swagger/Rapidoc** di:
URL: `http://localhost:3001/docs` (Auth: admin/admin)
Gunakan fitur "Try it out" untuk melihat contoh request body yang dibutuhkan sebelum menulis kode di FE.
