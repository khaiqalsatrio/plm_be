# PRD
## Product Owner Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Product Owner Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 1 April 2026  
**Status**: Draft

### 2. Latar Belakang

Dalam proses penilaian produk, Product Owner memegang peran penting sebagai pengusul, pengarah kebutuhan bisnis, dan penanggung jawab kelengkapan informasi produk. Namun dalam banyak organisasi, aktivitas PO masih tersebar di dokumen, chat, spreadsheet, dan email, sehingga proses review menjadi lambat, tidak transparan, dan sulit dilacak.

Modul **Product Owner Workspace** dibutuhkan agar Product Owner memiliki satu area kerja terpusat untuk:

- membuat dan mengelola assessment produk
- mengisi konteks produk secara lengkap
- memonitor review teknis, bisnis, dan legal
- merespons revisi
- mengelola lampiran dan komentar
- memantau status approval

### 3. Tujuan

Menyediakan workspace yang memungkinkan Product Owner untuk:

- membuat assessment produk baru
- melengkapi informasi produk secara terstruktur
- memonitor progres review lintas fungsi
- memahami blocker dan rekomendasi reviewer
- menindaklanjuti revisi dengan cepat
- menjaga histori assessment tetap terdokumentasi

### 4. Problem Statement

Saat ini Product Owner sering menghadapi masalah berikut:

- informasi produk tersebar di banyak tempat
- tidak ada template baku untuk pengajuan produk
- sulit mengetahui status review terkini
- revisi dari reviewer tidak terpusat
- keputusan approver sulit ditelusuri
- lampiran dan dokumen pendukung tidak terkonsolidasi

Akibatnya, waktu assessment menjadi panjang, kualitas informasi tidak konsisten, dan keputusan produk menjadi tidak efisien.

---

## 5. Sasaran Bisnis

### Sasaran Utama
- mempercepat siklus assessment produk
- meningkatkan kualitas data produk yang diajukan
- meningkatkan transparansi status review
- mengurangi bolak-balik komunikasi manual
- meningkatkan akuntabilitas Product Owner

### KPI Awal
- 100% assessment baru dibuat melalui sistem
- waktu submit assessment berkurang
- >90% revisi ditindaklanjuti melalui sistem
- >95% histori assessment terdokumentasi
- waktu rata-rata dari draft ke keputusan akhir menurun

---

## 6. Pengguna Utama

### Primary User
- Product Owner

### Secondary User
- Product Manager
- Business Owner
- Technical Reviewer
- Business Reviewer
- Legal Reviewer
- Approver
- Admin

---

## 7. Peran Product Owner dalam Sistem

Product Owner bertanggung jawab untuk:

- membuat assessment baru
- mengisi data dasar produk
- melengkapi business context
- mengunggah dokumen pendukung
- menetapkan reviewer awal jika diperlukan
- submit assessment
- membaca feedback reviewer
- melakukan revisi
- resubmit assessment
- memantau keputusan akhir

---

## 8. Scope Fitur untuk Product Owner

### Dalam Scope
- dashboard milik Product Owner
- list produk dan assessment yang dimiliki
- create assessment
- edit draft assessment
- submit assessment
- lihat hasil review teknis, bisnis, dan legal
- tanggapi komentar
- upload attachment
- lihat histori dan audit trail
- monitor approval status
- duplicate assessment lama

### Di luar Scope
- konfigurasi template assessment
- pengaturan workflow
- manajemen master data
- pengaturan scoring rule
- approval final

---

## 9. User Story

### Create & Manage Assessment
- sebagai Product Owner, saya ingin membuat assessment baru agar produk saya dapat dievaluasi secara formal
- sebagai Product Owner, saya ingin menyimpan draft agar bisa melengkapi data secara bertahap
- sebagai Product Owner, saya ingin menduplikasi assessment lama agar tidak mengisi ulang dari nol

### Monitor Review
- sebagai Product Owner, saya ingin melihat status review teknis, bisnis, dan legal agar tahu posisi assessment saya
- sebagai Product Owner, saya ingin melihat komentar reviewer agar tahu apa yang harus diperbaiki

### Revision Handling
- sebagai Product Owner, saya ingin menerima notifikasi revisi agar bisa segera menindaklanjuti
- sebagai Product Owner, saya ingin memperbarui bagian tertentu tanpa mengubah seluruh assessment

### Decision Visibility
- sebagai Product Owner, saya ingin melihat keputusan akhir assessment agar bisa menentukan langkah produk berikutnya

---

## 10. Workflow Utama Product Owner

### Flow 1: Membuat Assessment Baru
1. Product Owner masuk ke dashboard
2. Klik **Create Assessment**
3. Isi data dasar produk
4. Isi overview dan konteks bisnis
5. Tambahkan lampiran
6. Simpan draft atau submit

### Flow 2: Submit Assessment
1. Product Owner membuka draft
2. Memastikan field wajib lengkap
3. Menentukan reviewer atau approver jika workflow mengizinkan
4. Klik **Submit for Review**
5. Sistem mengubah status menjadi `submitted`

### Flow 3: Menangani Revisi
1. Product Owner menerima status `need_revision`
2. Membuka assessment detail
3. Melihat komentar reviewer dan approver
4. Memperbarui field terkait
5. Menambahkan catatan revisi
6. Resubmit assessment

### Flow 4: Monitoring
1. Product Owner membuka dashboard
2. Melihat assessment yang aktif
3. Melihat progres review per domain
4. Melihat blocker, skor sementara, dan due date review

---

## 11. UI/UX Pages untuk Product Owner

### 11.1 Product Owner Dashboard

#### Tujuan
Halaman utama Product Owner untuk memantau semua assessment yang dimiliki.

#### Komponen
- welcome section
- summary cards:
  - Total My Assessments
  - Draft
  - In Review
  - Need Revision
  - Approved
- recent activities
- pending actions
- due soon reviews
- latest comments from reviewer
- quick action:
  - Create New Assessment
  - Continue Draft
  - View Revisions

#### Nilai UX
PO langsung tahu apa yang harus dikerjakan hari itu.

---

### 11.2 My Assessments Page

#### Tujuan
Melihat semua assessment yang dimiliki Product Owner.

#### Komponen
- search bar
- filter:
  - status
  - category
  - stage
  - date
  - risk level
- table/list:
  - Assessment ID
  - Product Name
  - Category
  - Stage
  - Total Score
  - Status
  - Last Updated
  - Action

#### Action
- View
- Edit Draft
- Continue Revision
- Duplicate
- Archive

---

### 11.3 Create Assessment Page

#### Tujuan
Membuat assessment baru.

#### Section
##### A. Product Basic Information
- Product Name
- Product Code
- Product Category
- Business Unit
- Product Owner
- Product Manager
- Product Type
- Stage
- Priority

##### B. Product Overview
- Description
- Problem Statement
- Objective
- Target User / Market
- Value Proposition
- Strategic Alignment

##### C. Scope & Context
- Existing or New Product
- Related Systems
- Region / Market
- Deployment Type
- Target Launch Date

##### D. Initial Business Context
- expected benefit
- business objective
- main stakeholders
- known risks

##### E. Initial Attachments
- business case
- BRD
- architecture draft
- legal support doc
- other files

#### Action Buttons
- Save as Draft
- Save & Continue
- Submit for Review
- Cancel

---

### 11.4 Assessment Detail Page for Product Owner

#### Tujuan
Menjadi pusat informasi satu assessment.

#### Header
- Product Name
- Assessment ID
- current status
- stage
- business unit
- owner
- created date
- updated date

#### Summary Cards
- Technical Score
- Business Score
- Legal Score
- Total Score
- Overall Risk
- Recommendation

#### Tabs
- Overview
- Technical Review
- Business Review
- Legal Review
- Attachments
- Comments
- Audit Trail

#### Action
- Edit
- Submit
- Resubmit
- Add Attachment
- Add Comment
- Export Summary

---

### 11.5 Revision Center

#### Tujuan
Halaman khusus untuk Product Owner melihat semua item revisi.

#### Komponen
- revision summary banner
- list of reviewer comments by section
- blocker highlights
- field needing update
- revision history
- response/comment box
- action:
  - mark updated
  - save revision
  - resubmit

#### Nilai UX
PO tidak perlu membaca seluruh assessment ulang. Sistem harus menunjukkan bagian yang perlu diperbaiki dengan jelas.

---

### 11.6 Attachments & Documents Page

#### Tujuan
Mengelola semua dokumen pendukung assessment.

#### Fitur
- upload file
- preview metadata
- categorization:
  - business case
  - BRD
  - architecture
  - legal note
  - compliance doc
  - other
- version history
- replace file
- download file
- delete file saat draft

---

### 11.7 Comments & Collaboration Page

#### Tujuan
Menyediakan ruang diskusi antara Product Owner dan reviewer.

#### Fitur
- general comments
- section-specific comments
- mention user
- threaded reply
- resolve comment
- unread comment indicator

---

### 11.8 Assessment Timeline / Audit Page

#### Tujuan
Melihat perjalanan assessment dari draft sampai keputusan.

#### Yang ditampilkan
- created
- edited
- submitted
- reviewed
- returned
- resubmitted
- approved / rejected

#### Nilai
Sangat berguna untuk governance dan evaluasi proses.

---

## 12. Functional Requirements

### 12.1 Dashboard Product Owner
- sistem menampilkan daftar assessment milik user
- sistem menampilkan summary count per status
- sistem menampilkan pending action
- sistem menampilkan recent reviewer comments

### 12.2 Create Assessment
- Product Owner dapat membuat assessment baru
- sistem menyediakan template default berdasarkan product type
- draft dapat disimpan walau belum lengkap
- sistem memvalidasi field wajib saat submit

### 12.3 Edit Assessment
- Product Owner dapat mengedit assessment selama status masih draft atau need_revision
- field tertentu dapat dikunci setelah submit jika kebijakan governance mensyaratkan

### 12.4 Submit Assessment
- Product Owner dapat submit assessment jika mandatory field lengkap
- submit memicu workflow review
- sistem mencatat submitted_by dan submitted_at

### 12.5 View Review Result
- Product Owner dapat melihat hasil review per domain
- Product Owner dapat melihat score, komentar, dan rekomendasi
- Product Owner dapat melihat hard blocker

### 12.6 Revision Handling
- sistem menampilkan daftar revisi yang diminta
- Product Owner dapat menjawab komentar
- Product Owner dapat memperbarui data dan resubmit

### 12.7 Attachment Management
- Product Owner dapat upload attachment
- Product Owner dapat melihat semua lampiran
- Product Owner dapat mengelompokkan lampiran berdasarkan tipe

### 12.8 Commenting
- Product Owner dapat menambahkan komentar umum dan per section
- sistem mendukung threaded discussion
- sistem menandai komentar baru

### 12.9 Audit Trail
- semua perubahan penting tercatat
- Product Owner dapat melihat histori perubahan assessment

---

## 13. Non-Functional Requirements

### Security
- akses hanya untuk user yang berhak
- Product Owner hanya bisa melihat assessment yang dimiliki atau diotorisasi
- file attachment mengikuti permission model

### Performance
- dashboard load < 3 detik
- detail assessment load < 3 detik
- comment/update berjalan responsif

### Availability
- sistem tersedia pada jam kerja dan review cycle kritikal

### Usability
- form panjang harus tetap nyaman digunakan
- section harus bisa collapse/expand
- status harus mudah dipahami

### Auditability
- setiap submit, revise, dan resubmit harus tercatat

---

## 14. Data yang Dikelola Product Owner

### Product Data
- nama produk
- kategori
- owner
- stage
- deskripsi
- objective
- target market
- value proposition

### Assessment Data
- type assessment
- version
- status
- reviewer assignment
- summary score
- risk level
- recommendation

### Supporting Data
- attachment
- comments
- revision notes
- audit trail

---

## 15. Business Rules

1. Product Owner hanya dapat mengedit assessment pada status:
   - draft
   - need_revision

2. Setelah assessment di-submit:
   - perubahan mayor harus melalui mekanisme revisi
   - histori submit wajib tersimpan

3. Product Owner wajib melengkapi minimum data sebelum submit:
   - product basic info
   - overview
   - objective
   - target market
   - value proposition
   - lampiran minimum jika diwajibkan template

4. Jika reviewer mengembalikan assessment:
   - status berubah menjadi `need_revision`
   - Product Owner harus memberikan update sebelum resubmit

5. Assessment yang sudah approved atau rejected:
   - tidak dapat diedit langsung
   - jika perlu perubahan, harus dibuat versi baru atau reassessment

---

## 16. Acceptance Criteria

### Dashboard
- Product Owner melihat semua assessment yang dimiliki
- ringkasan per status tampil benar
- pending action tampil benar

### Create Assessment
- user dapat menyimpan draft
- sistem memvalidasi field wajib saat submit
- assessment baru tercipta dengan ID unik

### Submit
- status berubah ke submitted
- audit trail tercatat
- reviewer dapat menerima item review

### Revision
- Product Owner dapat melihat item revisi
- Product Owner dapat mengubah field yang relevan
- Product Owner dapat resubmit

### Comments
- Product Owner dapat menambahkan komentar
- reviewer dan PO dapat membaca histori diskusi

---

## 17. Notifikasi yang Dibutuhkan

Product Owner harus menerima notifikasi saat:

- assessment berhasil dibuat
- assessment berhasil disubmit
- reviewer memberi komentar baru
- assessment dikembalikan untuk revisi
- assessment telah di-approve
- assessment ditolak
- due date review mendekat
- ada blocker legal atau technical high risk

---

## 18. Reporting untuk Product Owner

Product Owner perlu melihat:

- jumlah assessment aktif
- rata-rata waktu review
- assessment yang pending terlalu lama
- assessment dengan high risk
- assessment per kategori
- riwayat keputusan produk

---

## 19. Risiko

### Risiko Produk
- Product Owner merasa form terlalu panjang
- user bingung dengan istilah assessment
- komentar reviewer tidak actionable
- revisi terlalu tersebar

### Mitigasi
- gunakan template modular
- gunakan bantuan teks dan tooltip
- buat revision center
- tampilkan blocker secara jelas
- sediakan auto-save draft

---

## 20. Future Enhancement

- AI assistant untuk membantu Product Owner mengisi overview produk
- auto-summary hasil review
- smart suggestion untuk menjawab revisi
- upload dokumen lalu sistem mengekstrak data ke form
- readiness score prediction
- recommendation copilot untuk meningkatkan peluang approval

---

## 21. Rekomendasi Menu Khusus Product Owner

- My Dashboard
- My Assessments
- Create Assessment
- Revisions
- Documents
- Notifications
- Activity History

---

## 22. Rekomendasi Komponen UI Reusable

- Assessment Status Badge
- Score Card
- Risk Indicator
- Revision Item Card
- Reviewer Comment Panel
- Attachment Uploader
- Activity Timeline
- Submit Confirmation Modal
- Resubmit Summary Modal

---

## 23. Outcome yang Diharapkan

Dengan adanya Product Owner Workspace, Product Owner dapat:

- mengelola assessment dengan lebih rapi
- memahami feedback reviewer lebih cepat
- mempercepat proses revisi
- mengurangi komunikasi manual
- meningkatkan peluang produk lolos ke tahap berikutnya
