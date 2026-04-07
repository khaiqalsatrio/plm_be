# PRD - Approver Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Approver Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 7 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Setelah proses review dari berbagai domain (Technical, Business, Legal) selesai dan mendapatkan rekomendasi dari Product Manager serta tanda tangan fisik dari Business Owner, sistem memerlukan satu langkah validasi akhir secara digital. Peran **Approver** diperlukan sebagai otoritas sistem yang menjamin bahwa seluruh prosedur tata kelola telah dipenuhi sebelum sebuah produk secara resmi mendapatkan status "Approved" di sistem PLM.

Approver berfungsi sebagai verifikator akhir yang menjembatani antara bukti fisik (dokumen bertanda tangan BO) dengan status digital di database.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Approver untuk:
- Memvalidasi kelengkapan dokumen yang telah ditandatangani oleh Business Owner (BO).
- Meninjau skor detail dan hasil penilaian dari seluruh domain review untuk memastikan konsistensi data.
- Memberikan status final (Approved/Rejected) pada sistem guna menutup siklus assessment.
- Menjamin akuntabilitas dan kepatuhan (compliance) sistem terhadap standar perusahaan.

---

### 4. Problem Statement

Tanpa role Approver:
- **Risiko Ketidaksesuaian**: Produk bisa berstatus Approved di sistem tanpa adanya bukti tanda tangan fisik dari pimpinan.
- **Kurangnya Kontrol Kualitas**: Tidak ada pihak independen di akhir proses yang memeriksa kembali validitas skor sebelum data dikunci.
- **Audit Trail yang Lemah**: Sulit melacak siapa yang bertanggung jawab melakukan "pencet tombol" final di sistem.

---

### 5. Sasaran Bisnis

- **Data Integrity**: Memastikan status digital 100% sinkron dengan otorisasi manajerial offline.
- **Risk Mitigation**: Memberikan lapisan pertahanan terakhir terhadap potensi kesalahan input atau manipulasi data.
- **Enterprise Governance**: Memenuhi standar audit operasional perusahaan dalam peluncuran produk baru.

---

### 6. Pengguna Utama

- **Compliance Officer**
- **Head of Operations / Product Governance**
- **Designated Enterprise Approver**

---

### 7. Peran Approver dalam Sistem

Approver bertanggung jawab untuk:
- Menilai apakah dokumen fisik yang diunggah PO sudah sah dan ditandatangani oleh BO yang berwenang.
- Memeriksa kesesuaian antara hasil review di sistem dengan kebijakan perusahaan.
- Memberikan validasi final: **System Approve** atau **System Reject**.
- Menutup periode assessment sehingga data tidak dapat diubah kembali.

---

### 8. Scope Fitur untuk Approver

#### Dalam Scope
- **Verification Queue**: Antrean assessment yang statusnya sudah mencapai "Waiting for Final Validation".
- **Signed Document Viewer**: Fitur untuk melihat/mengunduh lampiran dokumen hasil tanda tangan BO.
- **Full Assessment Review**: Akses untuk melihat skor detail, jawaban kriteria, dan catatan dari semua reviewer (Tech, Bus, Legal).
- **Final Validation Panel**: Tombol aksi untuk Approve/Reject di level sistem beserta kolom catatan validasi.
- **Audit History**: Melihat kronologi proses dari awal (PO Submit) hingga tahap akhir.

#### Di luar Scope
- Mengubah skor atau jawaban yang sudah di-input oleh reviewer (Read-Only).
- Melakukan ekspor dokumen (dilakukan oleh PO).
- Melakukan tanda tangan fisik (dilakukan oleh BO).

---

### 9. User Story

#### Verifikasi & Validasi
- Sebagai Approver, saya ingin melihat antrean produk yang sudah ditandatangani BO agar saya bisa melakukan validasi sistem tepat waktu.
- Sebagai Approver, saya ingin melihat detail skor teknis dan legal untuk memastikan tidak ada risiko "High/Critical" yang terlewatkan sebelum saya menekan tombol Approve.
- Sebagai Approver, saya ingin memverifikasi dokumen yang diunggah PO dengan dokumen asli untuk memastikan keabsahan tanda tangan BO.

#### Keputusan Sistem
- Sebagai Approver, saya ingin memberikan status "System Approved" agar produk masuk ke tahap lifecycle berikutnya (misal: Development atau Launch).
- Sebagai Approver, saya ingin memberikan status "Reject" jika dokumen yang diunggah tidak sesuai atau ada kecacatan formal pada proses review.

---

### 10. Alur Kerja (Workflow) Approver

**Flow 1: Final System Validation**
1. Approver masuk ke dashboard dan melihat antrean "Pending Final Validation".
2. Approver memilih assessment dan membuka tab **Verification**.
3. Approver memeriksa lampiran: "Signed Assessment Document".
4. Approver membuka tab **Score Detail** untuk meninjau hasil review lintas domain.
5. Jika semua sesuai, Approver mengisi "Validation Note" dan klik **System Approve**.
6. Status `overall_status` pada `ProductAssessment` berubah menjadi `approved`.

**Flow 2: Penolakan Validasi**
1. Jika dokumen tanda tangan BO salah upload atau tidak ada, Approver memilih **System Reject / Return**.
2. Approver memberikan instruksi revisi dokumen di catatan.
3. Status kembali ke `need_revision` atau tetap di `in_review` tergantung kebijakan operasional.

---

### 11. UI/UX Pages

#### 11.1 Approver Queue Dashboard
- **Pending Actions**: Daftar assessment yang menunggu validasi sistem.
- **Document Quick View**: Ikon indikator apakah lampiran sudah diunggah oleh PO atau belum.
- **SLA Countdown**: Penanda waktu berapa lama produk tertahan di tahap validasi akhir.

#### 11.2 Verification Console (Work Area)
- **Document Preview Panel**: PDF Viewer untuk memeriksa dokumen bertanda tangan BO secara berdampingan dengan data sistem.
- **Aggregated Score View**: Tampilan skor agrerat Technical, Business, dan Legal.
- **System Decision Box**:
  - Tombol Action (Approve / Reject).
  - Kolom "Validation Comments".
  - Metadata (Time of Approval).

---

### 12. Functional Requirements

- **APP-001**: Sistem hanya mengizinkan role `Approver` untuk mengubah `overall_status` menjadi `approved` di tahap akhir ini.
- **APP-002**: Sistem harus mewajibkan unggahan dokumen bertanda tangan oleh PO sebelum aksi `Approve` muncul di dashboard Approver.
- **APP-003**: Approver memiliki hak akses baca (*Read-Only*) terhadap seluruh jawaban pertanyaan kriteria (`responses`).
- **APP-004**: Setiap aksi Approver harus mencatat `approver_id` dan `approved_at` pada entitas `ProductAssessment`.

---

### 13. Aturan Bisnis (Business Rules)

1. `Approver` adalah role mandiri yang terpisah dari Admin dan Reviewer.
2. Akun Approver dibuat oleh Admin.
3. Approver tidak dapat memberikan keputusan `Approve` jika lampiran dokumen tanda tangan fisik belum ada di sistem.
4. Setelah Approver menekan `Approve`, assessment dianggap **Lolos (Final)** dan tidak dapat diedit kembali oleh siapapun.

---

### 14. Acceptance Criteria

- Approver dapat melihat data skor detail dari Technical, Business, dan Legal.
- Approver dapat membuka/mengunduh file lampiran tanda tangan BO.
- Status `overall_status` pada `ProductAssessment` terupdate menjadi `approved` tepat setelah submit dilakukan.
- Role lain tidak dapat melakukan aksi final approval ini.

---

### 15. Notifikasi

Approver menerima notifikasi saat:
- Ada dokumen baru yang diunggah oleh PO untuk divalidasi.
- Assessment telah melewati batas waktu SLA validasi akhir.
- Terdapat eskalasi dari PM terkait urgensi approval produk tertentu.
