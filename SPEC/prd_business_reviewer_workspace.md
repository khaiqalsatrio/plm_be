# PRD - Business Reviewer Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Business Reviewer Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 6 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Penilaian dari sisi bisnis (*business assessment*) merupakan komponen vital dalam siklus hidup produk (PLM) untuk memastikan bahwa setiap inisiatif produk tidak hanya layak secara teknis, tetapi juga memiliki nilai strategis, potensi pasar yang jelas, serta justifikasi finansial yang kuat. Tanpa proses review bisnis yang terstruktur, perusahaan berisiko mengalokasikan sumber daya pada produk yang tidak selaras dengan tujuan organisasi atau memiliki ROI yang rendah.

Modul **Business Reviewer Workspace** dirancang untuk memfasilitasi para pemangku kepentingan bisnis (Business Unit Leads, Product Directors, Strategic Analysts) dalam melakukan evaluasi produk secara objektif dan terukur.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Business Reviewer untuk:
- Mengelola dan meninjau antrean penugasan review bisnis.
- Melakukan penilaian mendalam berdasarkan kriteria bisnis (Strategic Alignment, Market Potential, Financial ROI, dll.).
- Memberikan skor, justifikasi, dan penilaian tingkat risiko bisnis.
- Menentukan keputusan review (Lolos, Butuh Revisi, atau Ditolak dari sisi bisnis).
- Berkolaborasi dengan Product Owner melalui fitur komentar untuk klarifikasi aspek komersial dan strategis.

---

### 4. Problem Statement

Proses review bisnis saat ini sering mengalami rintangan berikut:
- **Kurangnya Data Pendukung**: Data market size, estimasi revenue, atau cost feasibility seringkali tidak seragam formatnya.
- **Penilaian Subjektif**: Kriteria "Strategis" seringkali diartikan berbeda antar unit bisnis.
- **Visibilitas Biaya & Manfaat**: Sulit untuk melihat perbandingan cepat antara biaya pengembangan (CAPEX/OPEX) dengan potensi manfaat yang diharapkan.
- **Audit Keputusan**: Alasan penolakan atau persetujuan inisiatif bisnis seringkali hanya tersimpan di email atau notulen rapat yang sulit dicari kembali.

---

### 5. Sasaran Bisnis

- **Strategic Fit**: Memastikan 100% produk yang dikembangkan selaras dengan Roadmap dan OKR perusahaan.
- **Optimasi ROI**: Memprioritaskan produk dengan potensi nilai bisnis dan efisiensi tertinggi.
- **Risk Mitigation**: Mengidentifikasi risiko pasar dan risiko adopsi lebih awal sebelum investasi besar dilakukan.
- **Data-Driven Decisions**: Menyediakan data agregat penilaian bisnis untuk keperluan manajemen senior.

---

### 6. Pengguna Utama

- **Business Unit Head / VP of Product**
- **Strategic Planning Manager**
- **Finance Business Partner / Controller**
- **Marketing & Market Research Lead**

---

### 7. Peran Business Reviewer dalam Sistem

Business Reviewer bertanggung jawab untuk:
- Melakukan verifikasi atas klaim *value proposition* dan *market potential* yang diisi oleh Product Owner.
- Mengisi jawaban, skor, dan catatan untuk setiap kriteria dalam section **Business Assessment**.
- Menganalisis lampiran bisnis (Business Case, GTM Strategy, Pitch Deck, dll.).
- Menilai kelayakan biaya (Cost Feasibility) dan potensi keuntungan.
- Menentukan status review bisnis (`reviewed`, `returned`, atau `finalized`).

---

### 8. Scope Fitur untuk Business Reviewer

#### Dalam Scope
- Dashboard Antrean Business Review.
- Halaman Detail Assessment (fokus pada data strategi dan komersial).
- Form Penilaian Bisnis (Input skor, catatan per kriteria bisnis).
- Business Review Summary (Rangkuman skor bisnis, tingkat risiko bisnis).
- Fitur Komentar & Kolaborasi.
- Action Review: **Submit Review** atau **Return for Revision**.
- Melihat Histori Perubahan Data Bisnis.

#### Di luar Scope
- Konfigurasi template (dilakukan oleh Admin).
- Final Governance Approval (tahap akhir setelah semua reviewer selesai).
- Penilaian domain Teknis atau Legal.

---

### 9. User Story

#### Queue & Management
- Sebagai Business Reviewer, saya ingin melihat daftar produk yang masuk ke antrean saya agar saya tahu beban kerja dan prioritas review.
- Sebagai Business Reviewer, saya ingin melihat hasil review Teknis (jika sudah ada) agar saya tahu apakah ada kendala infrastruktur yang akan memengaruhi biaya.

#### Detailed Assessment
- Sebagai Business Reviewer, saya ingin memberikan skor pada kriteria "Strategic Alignment" agar saya bisa memberikan sinyal jika produk tidak sesuai arah perusahaan.
- Sebagai Business Reviewer, saya ingin mengunggah dokumen referensi (misal: laporan riset pasar eksternal) untuk mendukung penilaian saya.

#### Collaboration
- Sebagai Business Reviewer, saya ingin menanyakan rincian perhitungan ROI kepada PO langsung pada section terkait.

---

### 10. Workflow Utama Business Reviewer

**Flow 1: Memproses Antrean**
1. Reviewer masuk ke dashboard dan melihat daftar "Pending Business Review".
2. Klik **Start Review**.
3. Sistem mengubah status bisnis menjadi `in_progress`.

**Flow 2: Evaluasi Bisnis**
1. Reviewer meninjau *Business Case* dan *Product Objective*.
2. Reviewer mengisi form penilaian kriteria bisnis:
   - Strategic Alignment
   - Market Potential & Competitive Position
   - Value Proposition
   - Revenue / Benefit Potential
   - Cost Feasibility & ROI
   - Adoption Readiness
3. Menyimpan progres sebagai draft.

**Flow 3: Keputusan Domain Bisnis**
1. Reviewer memberikan ringkasan (summary) dan skala risiko bisnis (Low to Critical).
2. Klik **Submit Review** -> Status menjadi `reviewed`.
3. Klik **Return for Revision** -> Menambahkan catatan poin bisnis apa yang harus diperbaiki oleh PO.

---

### 11. UI/UX Pages (Referensi)

#### 11.1 Business Reviewer Dashboard
- **Queue Table**: Menampilkan Product Name, Business Unit, Priority, dan SLA status.
- **Portfolio Health**: Grafik sederhana mengenai distribusi skor bisnis dari antrean saat ini.

#### 11.2 Business Evaluation Workspace
- **Commercial Info Section**: Menampilkan ringkasan budget vs estimasi benefit.
- **Scoring Area**: Slider atau Radio Button untuk skor 1-5.
- **Justification Box**: Wajib diisi jika skor < 3 atau jika ada risiko tinggi.

---

### 12. Functional Requirements

- **BR-001**: Sistem harus membatasi akses pengisian domain bisnis hanya untuk role `business_reviewer`.
- **BR-002**: Sistem harus menghitung rata-rata skor bisnis secara otomatis berdasarkan bobot tiap kriteria.
- **BR-003**: Sistem harus memungkinkan reviewer untuk menandai suatu kriteria sebagai "Business Blocker" (Contoh: Cost terlalu tinggi dibanding budget).
- **BR-004**: Sistem harus menampilkan perbandingan skor yang diisi oleh PO (self-assessment) dengan skor yang diisi oleh Reviewer secara berdampingan.

---

### 13. Non-Functional Requirements

- **Confidentiality**: Data finansial dan strategi sensitif hanya boleh dilihat oleh pihak berwenang.
- **Reliability**: Kalkulasi skor dan persentase harus akurat hingga 2 angka di belakang koma.
- **Traceability**: Mencatat setiap perubahan catatan bisnis di Audit Log.

---

### 14. Data yang Dikelola

- **Business Status**: `not_started`, `in_progress`, `reviewed`, `returned`.
- **Business Responses**: Skor per kriteria bisnis, jawaban manual, catatan.
- **Business Risk Level**: Penilaian kualitatif risiko pasar/bisnis.
- **Total Business Score**: Hasil agregat penilaian domain bisnis.

---

### 15. Business Rules

1. Reviewer Bisnis dapat mulai bekerja segera setelah status assessment menjadi `submitted`.
2. Jika skor "Strategic Alignment" adalah 1 (Sangat Tidak Selaras), sistem akan memberikan peringatan otomatis pada reviewer untuk mempertimbangkan rekomendasi "Not Recommended".
3. Reviewer Bisnis wajib melampirkan dasar pemikiran jika memberikan rekomendasi risiko "Critical".

---

### 16. acceptance Criteria

- Form review bisnis menampilkan kriteria sesuai dengan template produk terkait.
- Tombol "Submit" hanya aktif jika semua kriteria wajib (*required*) sudah diisi skor dan catatannya.
- Status `business_status` pada tabel `product_assessments` terupdate real-time.
- PO menerima pemberitahuan instan jika assessment-nya di-*return* oleh Business Reviewer.

---

### 17. Reporting

- **Business Value Distribution**: Laporan produk mana yang membawa nilai bisnis tertinggi.
- **Review Latency**: Waktu yang dibutuhkan reviewer bisnis untuk memberikan keputusan.
- **Common Business Risks**: Kategori risiko bisnis yang paling sering ditemukan.

---

### 18. Masa Depan (Future Enhancement)

- **AI ROI Predictor**: Memberikan prediksi ROI otomatis berdasarkan data historis produk serupa.
- **Market Data Integration**: Menampilkan data tren pasar real-time di samping form penilaian.
- **Cost Center Integration**: Integrasi dengan sistem keuangan untuk memvalidasi ketersediaan budget unit.
