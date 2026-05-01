# PRD - Legal Reviewer Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Legal Reviewer Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 6 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Kepastian hukum dan kepatuhan terhadap regulasi (*compliance*) adalah aspek non-negosiasi dalam pengembangan produk, terutama yang melibatkan data pengguna, pihak ketiga, atau beroperasi di industri yang diatur ketat. Proses review hukum (*legal assessment*) seringkali menjadi *bottleneck* karena kompleksitas dokumen yang harus ditelaah dan risiko yang ditimbulkan jika ada kelalaian.

Modul **Legal Reviewer Workspace** dirancang untuk memusatkan proses peninjauan aspek hukum, memastikan semua lisensi, kontrak, dan kebijakan privasi data telah diverifikasi oleh tim legal secara terukur dan terdokumentasi dengan baik.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Legal Reviewer untuk:
- Mengelola antrean penugasan review aspek hukum dan kepatuhan.
- Melakukan penilaian terhadap kepatuhan regulasi, privasi data, lisensi, dan HKI (Hak Kekayaan Intelektual).
- Memberikan skor kepatuhan, catatan hukum, dan identifikasi tingkat risiko legal.
- Memberikan rekomendasi final dari perspektif hukum (Approved, Approved with Condition, atau Reject).
- Memberikan *legal opinion* atau saran perbaikan kontrak langsung di dalam platform.

---

### 4. Problem Statement

Hambatan utama dalam proses review hukum saat ini:
- **Dokumen Tersebar**: Dokumen PKS (Perjanjian Kerja Sama), syarat dan ketentuan, serta kebijakan privasi seringkali dikirim melalui saluran yang tidak terpusat.
- **Risiko Privasi Data**: Sulitnya melacak apakah sebuah produk mengolah data PII (*Personally Identifiable Information*) secara memadai sesuai aturan perlindungan data.
- **Konflik Lisensi**: Kurangnya visibilitas terhadap penggunaan *open source software* (OSS) yang mungkin memiliki lisensi yang berbenturan dengan kebijakan komersial perusahaan.
- **Keterlambatan Proyek**: Proses review manual yang lambat karena reviewer harus meminta klarifikasi berulang kali kepada Product Owner.

---

### 5. Sasaran Bisnis

- **Zero Non-Compliance**: Memastikan 100% produk yang diluncurkan mematuhi regulasi yang berlaku.
- **Data Privacy Assurance**: Melindungi perusahaan dari risiko kebocoran data atau pelanggaran privasi melalui *Privacy Impact Assessment* dini.
- **IP Assets Protection**: Menjamin kepemilikan aset intelektual (source code, model, konten) terlindungi secara hukum.
- **SLA Reliability**: Mempercepat waktu respon review legal dengan instruksi kerja yang jelas dalam platform.

---

### 6. Pengguna Utama

- **Legal Counsel / Corporate Lawyer**
- **Data Privacy Officer (DPO)**
- **Compliance Specialist**
- **Regulators Relations Officer**

---

### 7. Peran Legal Reviewer dalam Sistem

Legal Reviewer bertanggung jawab untuk:
- Menelaah kepatuhan produk terhadap regulasi industri (seperti aturan Bank Sentral, OJK, atau GDPR/UU PDP).
- Memeriksa penggunaan data pribadi dan sensitif (Data Privacy Section).
- Memverifikasi kewajiban kontraktual dengan vendor atau partner pihak ketiga.
- Melakukan audit terhadap lisensi perangkat lunak yang digunakan.
- Menentukan status review legal (`reviewed`, `returned`, atau `finalized`).

---

### 8. Scope Fitur untuk Legal Reviewer

#### Dalam Scope
- Dashboard Antrean Penilaian Hukum.
- Halaman Detail Assessment (fokus pada data kepatuhan dan privasi).
- Form Penilaian Legal (Input skor, catatan per kriteria hukum).
- Fitur Lampiran Privat (untuk dokumen legal sensitif seperti draf kontrak).
- Risk Assessment Legal (Identifikasi risiko tuntutan atau denda regulasi).
- Aksi: **Submit Review** atau **Return for Revision**.

#### Di luar Scope
- Pembuatan draf kontrak otomatis (hanya review draf yang diunggah).
- Penilaian domain Teknis atau Bisnis (hanya melihat hasil review mereka).
- Persetujuan HOD/Direksi (dilakukan di tahap Management Approval).

---

### 9. User Story

#### Queue & Management
- Sebagai Legal Reviewer, saya ingin melihat antrean tugas review berdasarkan tingkat urgensi/prioritas produk.
- Sebagai Legal Reviewer, saya ingin melihat ringkasan aspek bisnis produk agar saya memahami konteks penggunaan data yang akan dilakukan.

#### Detailed Assessment
- Sebagai Legal Reviewer, saya ingin menandai kriteria "Data Privacy" sebagai "Risiko Tinggi" jika aplikasi menyimpan data biometrik tanpa enkripsi yang cukup.
- Sebagai Legal Reviewer, saya ingin mengunggah draf *Terms of Service* yang sudah saya revisi agar PO bisa langsung menggunakannya.

#### Collaboration
- Sebagai Legal Reviewer, saya ingin bertanya kepada PO mengenai asal usul dataset yang digunakan untuk melatih model AI demi memastikan tidak ada pelanggaran hak cipta.

---

### 10. Workflow Utama Legal Reviewer

**Flow 1: Inisiasi Review**
1. Reviewer masuk ke dashboard dan melihat daftar "Pending Legal Review".
2. Klik **Start Review**. Status berubah menjadi `in_progress`.

**Flow 2: Telaah Hukum & Privasi**
1. Reviewer memeriksa section Legal Assessment:
   - Regulatory Compliance
   - Data Privacy & Protection
   - Contractual Requirement & Liabilities
   - Licensing & IP Ownership
   - Internal Policy Compliance
2. Memberikan skor (misal: 1-5 untuk tingkat kepatuhan) dan menyertakan catatan wajib jika ada ketidaksesuaian.
3. Menyimpan progres sebagai draft.

**Flow 3: Keputusan Penilaian**
1. Reviewer menyimpulkan tingkat risiko hukum (Low, Medium, High, Critical).
2. Memilih rekomendasi:
   - **Recommended** (Patuh).
   - **Recommended with Condition** (Patuh dengan syarat perbaikan dokumen tertentu).
   - **Major Revision Needed** (Risiko hukum tinggi, butuh perubahan fundamental).
   - **Not Recommended** (Menyalahi regulasi fatal).
3. Klik **Submit Review**.

---

### 11. UI/UX Pages (Referensi)

#### 11.1 Legal Reviewer Dashboard
- **Queue Table**: Product, PO Name, Category, Submission Date, Days in Queue.
- **Risk Indicators**: Ringkasan jumlah assessment yang masuk kategori risiko tinggi/kritikal.

#### 11.2 Legal Workspace Area
- **Split Screen (Opsional)**: Sisi kiri menampilkan isian PO, sisi kanan menampilkan form input reviewer.
- **Privacy Checklist**: Indikator visual untuk status PII (Red/Yellow/Green).
- **Audit Field**: Kolom catatan untuk setiap poin pertanyaan guna memastikan setiap nilai memiliki pertimbangan hukum.

---

### 12. Functional Requirements

- **LR-001**: Sistem harus mengunci akses domain legal hanya untuk role `legal_reviewer`.
- **LR-002**: Sistem harus membedakan antara file lampiran "Public" (bisa dilihat semua role) dan "Legal-Private" (hanya bisa dilihat oleh Legal dan PO tertentu).
- **LR-003**: Sistem harus memungkinkan reviewer untuk memberikan rekomendasi status akhir per kriterianya.
- **LR-004**: Sistem harus menyediakan kalkulasi skor kepatuhan hukum total secara otomatis.

---

### 13. Non-Functional Requirements

- **Security**: Dokumen legal wajib disimpan di bucket privat dengan *expiry link* (MinIO).
- **Traceability**: Mencatat versi draf dokumen hukum yang diunggah untuk menghindari kesalahan penggunaan versi lama.
- **Performance**: Akses ke dokumen besar (PDF kontrak) di dalam workspace harus stabil.

---

### 14. Data yang Dikelola

- **Legal Status**: `not_started`, `in_progress`, `reviewed`, `returned`.
- **Legal Reponses**: Jawaban, skor, dan opini hukum per kriteria.
- **Legal Risk Level**: Low, Medium, High, Critical.
- **Total Compliance Score**: Angka akumulasi kepatuhan hukum.

---

### 15. Business Rules

1. Legal Reviewer dapat melakukan review secara paralel dengan Technical dan Business Reviewer.
2. Jika skor `Regulatory Compliance` adalah 1, assessment secara otomatis tidak dapat diteruskan ke tahap Approval Management sebelum diperbaiki (Hard Stop).
3. Setiap catatan revisi hukum harus direspons oleh PO dengan dokumen pendukung yang relevan.

---

### 16. Acceptance Criteria

- Semua kriteria hukum pada template assessment muncul di form reviewer.
- Status `legal_status` di tabel database terupdate otomatis saat aksi dilakukan.
- Role `legal_reviewer` dapat menginstruksikan pengembalian assessment (`return`) meskipun domain lain sudah selesai.
- Log aktivitas merekam setiap opini hukum yang dimasukkan.

---

### 17. Reporting

- **Compliance Maturity Report**: Laporan tingkat kepatuhan produk-produk perusahaan.
- **Open Legal Slacks**: Daftar poin hukum yang masih dalam tahap revisi oleh PO.
- **Licensing Cost Exposure**: Estimasi biaya lisensi yang ditemukan selama proses penilaian hukum.

---

### 18. Masa Depan (Future Enhancement)

- **AI Contract Analyzer**: Deteksi otomatis klausul berisiko pada draf kontrak yang diunggah.
- **Regulatory Updates Link**: Integrasi berita regulasi terbaru langsung di dashboard legal.
- **Automated Retention Reminder**: Pengingat otomatis untuk hapus data pengguna sesuai kebijakan retensi yang disepakati.
