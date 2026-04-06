# PRD - Technical Reviewer Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Technical Reviewer Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 4 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Dalam ekosistem pengembangan produk, penilaian teknis (*technical assessment*) sangat krusial untuk memastikan produk yang dibangun memiliki fondasi yang kuat, aman, dan dapat dipelihara. Saat ini, proses review teknis sering kali dilakukan secara ad-hoc melalui dokumen terpisah, email, atau pertemuan yang tidak terdokumentasi dengan baik. Hal ini menyebabkan sulitnya melacak alasan di balik keputusan teknis, risiko yang teridentifikasi, dan rekomendasi yang diberikan.

Modul **Technical Reviewer Workspace** dirancang untuk menyediakan area kerja terpusat bagi para ahli teknis (enterprise architect, security expert, infrastructure lead, dll.) untuk melakukan penilaian secara terstruktur, memberikan skor yang objektif, dan mengidentifikasi risiko teknis sejak dini.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Technical Reviewer untuk:
- Mengambil dan meninjau penugasan review teknis.
- Melakukan penilaian mendalam berdasarkan kriteria teknis yang telah ditentukan (Architecture, Security, Scalability, dll.).
- Memberikan skor, catatan review, dan tingkat risiko teknis secara granular.
- Memberikan rekomendasi akhir (Lolos, Perlu Revisi, atau Ditolak).
- Berkolaborasi dengan Product Owner melalui komentar untuk klarifikasi teknis.

---

### 4. Problem Statement

Para Technical Reviewer sering menghadapi kendala berikut:
- **Informasi Terfragmentasi**: Data teknis produk (arsitektur, stack, dll.) tidak selalu lengkap saat diterima.
- **Subjektivitas Penilaian**: Tidak adanya standar penilaian yang seragam menyebabkan hasil review inkonsisten.
- **Pelacakan Revisi**: Sulit memantau apakah poin-poin revisi teknis yang diminta sudah diperbaiki oleh Product Owner.
- **Dokumentasi Risiko**: Risiko teknis yang ditemukan sering kali tidak tercatat secara formal untuk referensi di masa mendatang.

---

### 5. Sasaran Bisnis

- **Standarisasi Kualitas**: Menjamin setiap produk memenuhi standar arsitektur dan keamanan perusahaan.
- **Transparansi Risiko**: Mengidentifikasi dan mendokumentasikan *technical debt* atau risiko teknis sebelum produk masuk ke tahap pengembangan lebih lanjut.
- **Efisiensi Review**: Mempercepat proses review teknis dengan alur kerja yang terstruktur.
- **Governance**: Memastikan setiap keputusan teknis memiliki audit trail yang jelas.

---

### 6. Pengguna Utama

- **Enterprise Architect**
- **Security Engineer / Expert**
- **Infrastructure & Cloud Engineer**
- **Lead Developer / System Analyst**

---

### 7. Peran Technical Reviewer dalam Sistem

Technical Reviewer bertanggung jawab untuk:
- Melakukan verifikasi data teknis yang diisi oleh Product Owner.
- Mengisi jawaban dan skor untuk setiap pertanyaan dalam section **Technical Assessment**.
- Menganalisis lampiran teknis (Architecture Diagram, Technical Spec, dll.).
- Memberikan catatan kritis dan blocker jika ditemukan risiko tinggi.
- Menentukan status review teknis (`reviewed`, `returned`, atau `finalized`).

---

### 8. Scope Fitur untuk Technical Reviewer

#### Dalam Scope
- Dashboard khusus Technical Reviewer (menampilkan antrean review).
- Halaman Detail Assessment (fokus pada data teknis).
- Form Penilaian Teknis (Input skor, catatan per kriteria).
- Review Summary (Rangkuman teknis, tingkat risiko teknis).
- Fitur Komentar (Threaded discussion dengan PO).
- Action Review: **Submit Review** atau **Return for Revision**.
- Melihat Histori Perubahan Data Teknis.

#### Di luar Scope
- Konfigurasi template pertanyaan (dilakukan oleh Admin).
- Final Approval (dilakukan oleh Business Owner/Approver).
- Penilaian domain Bisnis atau Legal.

---

### 9. User Story

#### Queue & Management
- Sebagai Technical Reviewer, saya ingin melihat daftar assessment yang menunggu review teknis agar saya bisa mengatur prioritas pekerjaan.
- Sebagai Technical Reviewer, saya ingin melihat status review domain lain (Legal/Business) sebagai referensi tambahan.

#### Detailed Assessment
- Sebagai Technical Reviewer, saya ingin mengisi skor dan catatan untuk setiap kriteria teknis agar penilaian saya terdokumentasi secara granular.
- Sebagai Technical Reviewer, saya ingin menandai sebuah temuan sebagai "Hard Blocker" agar PO tahu bahwa itu adalah isu kritikal yang harus diperbaiki.

#### Collaboration
- Sebagai Technical Reviewer, saya ingin memberikan komentar pada bagian tertentu agar PO dapat memberikan klarifikasi tanpa mengubah seluruh dokumen.
- Sebagai Technical Reviewer, saya ingin meminta dokumen tambahan (misal: hasil Penetration Test) melalui sistem.

---

### 10. Workflow Utama Technical Reviewer

**Flow 1: Memulai Review**
1. Reviewer masuk ke dashboard dan melihat daftar "Pending Technical Review".
2. Klik **Start Review** pada salah satu assessment.
3. Sistem mengubah status review teknis menjadi `in_progress`.

**Flow 2: Melakukan Penilaian**
1. Reviewer meninjau overview produk dan lampiran teknis.
2. Reviewer mengisi form penilaian (skor 1-5 atau Ya/Tidak) berdasarkan kriteria:
   - Architecture Fit
   - Security
   - Scalability & Performance
   - Operational Readiness
   - Maintainability
3. Menyimpan progres review sebagai draft.

**Flow 3: Memberikan Keputusan Review**
1. Reviewer memberikan ringkasan (summary) dan menentukan tingkat risiko teknis.
2. Klik **Submit Review** (jika sudah oke) -> Status menjadi `reviewed`.
3. Klik **Return for Revision** (jika butuh perbaikan) -> Status menjadi `returned`, status utama assessment menjadi `need_revision`.

---

### 11. UI/UX Pages

#### 11.1 Technical Reviewer Dashboard
- **Queue Overview**: Total pending, in-progress, completed.
- **Assessment Queue Table**:
  - Priority (High/Medium/Low)
  - Product Name
  - PO Name
  - Submission Date
  - Time Elapsed (SLA tracking)
- **Recent Activities**: Notifikasi komentar baru dari PO.

#### 11.2 Technical Review Workspace (Review Form)
- **Top Header**: Info produk dasar (Stage, Priority, Category).
- **Left/Top Tab**: Navigasi antar section (Architecture, Security, Ops, dll.).
- **Evaluation Area**:
  - Question text & help text.
  - Radio/Select untuk skor.
  - Text area untuk catatan/justify skor.
  - Tombol upload lampiran spesifik review (jika ada).
- **Sticky Summary Panel**: Menampilkan total skor teknis yang sedang berjalan dan indikator risiko.

#### 11.3 Review Summary & Decision Page
- **Risk Level Selector**: Low, Medium, High, Critical.
- **Technical Recommendation**: Dropdown (Recommended, Pass with Notes, Major Revision, Not Recommended).
- **Final Summary Note**: Kesiapan teknis secara keseluruhan.
- **Blocker List**: Ringkasan poin-poin yang menjadi hambatan.

---

### 12. Functional Requirements

- **TR-001**: Sistem harus mengunci pengisian review teknis hanya untuk user dengan role yang diizinkan.
- **TR-002**: Sistem harus menghitung skor rata-rata teknis berdasarkan bobot yang didefinisikan di template.
- **TR-003**: Sistem harus memungkinkan reviewer untuk menyimpan progres review (auto-save atau manual draft).
- **TR-004**: Sistem harus mewajibkan catatan (note) jika reviewer memberikan skor di bawah ambang batas tertentu (misal skor 1 atau 2).
- **TR-005**: Saat reviewer memilih "Return for Revision", sistem harus mewajibkan pengisian minimal satu komentar/catatan revisi.

---

### 13. Non-Functional Requirements

- **Security**: Data review teknis hanya dapat diubah oleh reviewer yang ditugaskan (atau tim editor teknis).
- **Performance**: Pemuatan halaman form review (dengan banyak pertanyaan) harus tetap lancar (< 2 detik).
- **Auditability**: Setiap perubahan skor atau catatan oleh reviewer harus tercatat dalam Audit Log (siapa, kapan, dari nilai berapa ke berapa).

---

### 14. Data yang Dikelola

- **Review Status**: `not_started`, `in_progress`, `reviewed`, `returned`, `finalized`.
- **Question Responses**: Skor, jawaban boolean/teks, catatan kriteria.
- **Technical Risk Level**: Penilaian kualitatif risiko teknis.
- **Technical Score**: Hasil kalkulasi agrerat penilaian teknis.
- **Technical Recommendation**: Keputusan teknis per domain.

---

### 15. Business Rules

1. Reviewer teknis hanya dapat mulai mengisi jika assessment sudah di-submit oleh PO (status `submitted`).
2. Jika ada satu saja kriteria bertanda "Hard Blocker", status rekomendasi tidak boleh langsung "Recommended".
3. Reviewer dapat memberikan lampiran tambahan (misal: dokumen referensi arsitektur) saat melakukan review.
4. Perubahan data dasar produk oleh PO (setelah resubmit) harus ditandai sebagai "Changed" di mata reviewer agar mudah diverifikasi.

---

### 16. Acceptance Criteria

- Reviewer dapat melihat semua pertanyaan teknis sesuai template yang digunakan.
- Skor teknis pada `ProductAssessment` terupdate otomatis saat review di-submit.
- Status `technical_status` berubah sesuai dengan aksi yang diambil reviewer.
- Komentar yang ditambahkan reviewer muncul di dashboard PO dan detail assessment.

---

### 17. Notifikasi

Technical Reviewer menerima notifikasi saat:
- Ada assessment baru yang di-assign atau masuk ke antrean teknis.
- Product Owner melakukan resubmit setelah revisi teknis.
- Ada mention dalam komentar dari PO atau reviewer lain.
- Mendekati batas waktu review (SLA warning).

---

### 18. Reporting

Laporan yang dibutuhkan untuk manajemen teknis:
- **Average Technical Review Time**: Rata-rata waktu penyelesaian review dari `submitted` ke `reviewed`.
- **Primary Technical Risks**: Statistik jenis risiko teknis yang paling sering muncul.
- **Score Distribution**: Distribusi skor teknis produk-produk yang diajukan.

---

### 19. Risiko & Mitigasi

- **Risiko**: Reviewer memberikan skor asal tanpa membaca detail.
- **Mitigasi**: Implementasi mandatory notes untuk skor rendah dan peer-review atau audit oleh lead architect.
- **Risiko**: SLA review teknis terlampaui karena antrean padat.
- **Mitigasi**: Dashboard monitoring untuk lead dan fitur re-assign ke reviewer lain.

---

### 20. Future Enhancement

- **Auto-Risk Calculation**: Sistem memberikan saran tingkat risiko berdasarkan skor yang diisi.
- **Historical Comparison**: Menampilkan perbandingan skor teknis dengan produk serupa yang sudah pernah di-assess.
- **Vulnerability Scanner Integration**: Menarik data otomatis dari alat pemindaian keamanan ke dalam form review.
- **Architecture Diagram Viewer**: Integrasi viewer untuk melihat diagram arsitektur langsung di dalam workspace tanpa download file.
