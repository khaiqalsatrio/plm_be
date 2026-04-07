# PRD - Business Owner Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Business Owner Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 7 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Business Owner (BO) merupakan pemangku kepentingan tertinggi di tingkat unit bisnis yang bertanggung jawab atas arah strategis, anggaran, dan keselarasan produk dengan target bisnis unit tersebut. Sebagai penanggung jawab utama, BO memiliki kewenangan manajerial untuk memberikan restu akhir atas sebuah inisiatif produk.

Meskipun sistem menyediakan alur digital, keputusan final BO dilakukan secara formal melalui **tanda tangan pada dokumen fisik** hasil ekspor assessment. Modul **Business Owner Workspace** dirancang untuk memberikan visibilitas penuh bagi BO terhadap seluruh produk di bawah unit bisnisnya, memantau hasil rekomendasi dari para ahli (Technical, Business, Legal), serta meninjau pertimbangan dari Product Manager sebelum melakukan tanda tangan manajerial.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Business Owner untuk:
- Memantau portofolio produk di unit bisnisnya secara komprehensif.
- Meninjau hasil penilaian terpadu (Technical, Business, Legal) dan rekomendasi Product Manager.
- Memberikan restu manajerial (tanda tangan fisik) berdasarkan data yang akurat di sistem.
- Memastikan integritas dan keselarasan produk dengan tujuan strategis unit bisnis.

---

### 4. Problem Statement

Business Owner sering menghadapi kendala berikut:
- **Keterbatasan Visibilitas**: Sulit melihat seluruh status pengajuan produk di unit bisnis mereka tanpa laporan manual.
- **Data yang Tidak Sinkron**: Data yang ada di dokumen fisik seringkali berbeda atau tidak terupdate dengan diskusi yang terjadi di sistem.
- **Hambatan Verifikasi**: Sulit memverifikasi apakah rekomendasi dari tim teknis dan legal sudah benar-benar aman sebelum memberikan tanda tangan.

---

### 5. Sasaran Bisnis

- **Strategik Alignment**: Menjamin 100% produk yang diluncurkan selaras dengan visi unit bisnis.
- **Governance & Compliance**: Memastikan setiap keputusan manajerial didukung oleh data review yang lengkap (Architecture, Risk, Legal).
- **Efisiensi Portfolio**: Mengidentifikasi produk dengan risiko tinggi secara cepat agar BO dapat memberikan arahan korektif sedini mungkin.

---

### 6. Pengguna Utama

- **Business Unit Head / Division Head**
- **Sponsor Eksekutif Produk**

---

### 7. Peran Business Owner dalam Sistem

Business Owner bertanggung jawab untuk:
- Memantau kesehatan portofolio produk dalam unit bisnisnya.
- Meninjau ringkasan akhir assessment sebelum melakukan tanda tangan manual pada file PDF hasil ekspor.
- Memberikan arahan strategis jika terdapat hasil review yang tidak memuaskan.
- Berfungsi sebagai "Managerial Approver" di luar sistem.

---

### 8. Scope Fitur untuk Business Owner

#### Dalam Scope
- **BU Dashboard**: Ringkasan status produk khusus dalam Business Unit miliknya sendiri.
- **Portfolio Monitoring**: Melihat list assessment aktif (In-Review, Finalized, Pending PM Recommendation).
- **Integrated Review View**: Melihat rangkuman skor, catatan risiko, dan rekomendasi PM secara ringkas.
- **Audit Trail & Comment Access**: Memantau sejarah diskusi antara PO dan Reviewer.
- **Export Summary Access**: Mengunduh file PDF untuk kebutuhan tanda tangan basah.

#### Di luar Scope
- Melakukan validasi akhir di sistem (dilakukan oleh role `Approver`).
- Mengatur konfigurasi teknis template.
- Melakukan review detail per kriteria teknis.

---

### 9. User Story

#### Monitoring Portofolio
- Sebagai Business Owner, saya ingin melihat dashboard produk di Business Unit saya agar saya tahu progres pengajuan anggaran dan kesiapan peluncuran.
- Sebagai Business Owner, saya ingin melihat perbandingan risiko antar produk di unit saya agar saya bisa memitigasi isu strategis.

#### Review & Decision Support
- Sebagai Business Owner, saya ingin melihat rekomendasi akhir dari Product Manager sebagai dasar pertimbangan saya sebelum menandatangani dokumen fisik.
- Sebagai Business Owner, saya ingin melihat histori revisi untuk memastikan poin-poin kritikal sudah diperbaiki oleh Product Owner.

---

### 10. Alur Kerja (Workflow) Business Owner

**Flow 1: Peninjauan Strategis**
1. BO masuk ke dashboard dan melihat daftar produk di Business Unit miliknya.
2. BO memilih produk yang statusnya sudah mencapai tahap rekomendasi PM.
3. BO meninjau skor agrerat dan catatan risiko tertinggi.

**Flow 2: Tanda Tangan Manajerial (Luar Sistem)**
1. BO menyetujui produk berdasarkan data di sistem.
2. Product Owner melakukan **Export PDF** dari sistem.
3. BO melakukan **Tanda Tangan Fisik** pada dokumen tersebut.
4. Product Owner mengunggah file yang sudah ditandatangani kembali ke sistem.

**Flow 3: Koordinasi Lanjutan**
1. Jika BO menemukan ketidaksesuaian strategis, BO memberikan komentar atau instruksi kepada PM/PO di kolom diskusi.
2. BO meminta revisi lebih lanjut sebelum bersedia menandatangani secara fisik.

---

### 11. UI/UX Pages untuk Business Owner

#### 11.1 BU Leader Dashboard
- **BU Health Summary**: Jumlah produk aktif, rasio High Risk, dan status approval.
- **My Unit Portfolio**: Tabel daftar produk dengan filter kategori dan stage.
- **Strategic Alert**: Indikator jika ada produk kritikal yang tertahan di tahap review terlalu lama.

#### 11.2 Executive Assessment Review (Read-Only)
- **Executive Summary Card**: Performa produk (Skor final & Risk Level).
- **PM Recommendation Statement**: Tampilan jelas rekomendasi dari Product Manager.
- **Domain Highlights**: Ringkasan poin-poin penting dari Technical, Business, dan Legal (tanpa detail pertanyaan granular).
- **Download Link**: Akses cepat ke file ekspor untuk tanda tangan.

---

### 12. Functional Requirements

- **BO-001**: Sistem harus membatasi akses data BO hanya untuk produk yang memiliki `business_unit_id` sesuai dengan unit miliknya.
- **BO-002**: Sistem menyediakan tampilan ringkasan eksekutif yang menggabungkan hasil review 3 domain.
- **BO-003**: Sistem menampilkan status terbaru dari `Approver` (Validasi Akhir) sebagai indikator keberlanjutan proses di sistem.

---

### 13. Non-Functional Requirements

- **Privacy & Security**: Kerahasiaan data portofolio unit bisnis sangat krusial. Akses dibatasi ketat melalui Role-Based Access Control (RBAC).
- **Data Integrity**: Memastikan data yang ditampilkan di dashboard sesuai dengan data yang di-input oleh reviewer dan PM secara real-time.

---

### 14. Aturan Bisnis (Business Rules)

1. Business Owner bertindak sebagai **Pemutus Manajerial**.
2. Tanda tangan BO dilakukan pada dokumen fisik (hasil ekspor).
3. Proses di sistem baru dianggap selesai (`Approved`) setelah **Approver** memverifikasi dokumen bertanda tangan BO yang diunggah oleh Product Owner.
4. BO hanya bisa melihat produk di Business Unit miliknya sendiri.

---

### 15. Acceptance Criteria

- BO dapat masuk ke dashboard dan melihat list produk yang sesuai dengan unit bisnisnya.
- Ringkasan review dari Technical, Business, dan Legal tampil dengan benar dan mudah dibaca.
- BO dapat membaca rekomendasi final dari Product Manager.
- Terdapat akses untuk mengunduh laporan PDF hasil penilaian.

---

### 16. Notifikasi untuk Business Owner

BO menerima notifikasi saat:
- Ada produk baru di unitnya yang masuk ke tahap pengajuan assessment.
- Product Manager telah memberikan rekomendasi final (Siap ditandatangani secara fisik).
- Ada isu risiko tinggi (Critical Risk) yang terdeteksi di salah satu produk unitnya.
