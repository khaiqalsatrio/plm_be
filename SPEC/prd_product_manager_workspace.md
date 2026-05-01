# PRD - Product Manager Workspace
## Modul dalam PLM Product Assessment

### 1. Ringkasan

**Nama Modul**: Product Manager Workspace  
**Produk Induk**: PLM Product Assessment  
**Versi**: 1.0  
**Tanggal**: 7 April 2026  
**Status**: Draft

---

### 2. Latar Belakang

Product Manager (PM) memiliki tanggung jawab strategis untuk memastikan setiap produk yang diajukan oleh Product Owner (PO) telah melalui evaluasi yang komprehensif dari sisi teknis, bisnis, dan legal sebelum diberikan keputusan final. PM berfungsi sebagai "Governor" atau "Gatekeeper" yang menyatukan masukan dari berbagai domain reviewer untuk membuat keputusan investasi atau peluncuran produk.

Saat ini, PM sering kali harus mengumpulkan laporan review secara manual dari berbagai sumber, sehingga sulit untuk mendapatkan gambaran utuh (*big picture*) mengenai risiko dan potensi sebuah produk. Modul **Product Manager Workspace** hadir untuk memberikan pandangan terpusat terhadap status seluruh assessment, hasil review lintas fungsi, dan memberikan sarana untuk pengambilan keputusan final yang terstandarisasi.

---

### 3. Tujuan

Menyediakan workspace yang memungkinkan Product Manager untuk:
- Memantau seluruh antrean produk dan assessment yang berada di bawah pengawasannya.
- Meninjau ringkasan hasil penilaian dari domain Technical, Business, dan Legal secara terintegrasi.
- Memberikan keputusan final (*Decision Making*) terhadap assessment (Approve, Reject, Need Revision).
- Memberikan instruksi tindak lanjut (*follow-up actions*) dan catatan keputusan yang formal.
- Memantau kepatuhan SLA (Service Level Agreement) dari para reviewer.

---

### 4. Problem Statement

Product Manager sering menghadapi kendala berikut:
- **Ketiadaan Visibilitas Terpusat**: Sulit memantau progres review yang sedang berjalan di berbagai departemen.
- **Kesulitan Konsolidasi Data**: Harus membaca detail teknis, bisnis, dan legal secara terpisah tanpa adanya rangkuman risiko yang terpadu.
- **Keputusan yang Tidak Terdokumentasi**: Keputusan akhir sering diambil di luar sistem, sehingga sulit diaudit di masa depan.
- **Hambatan Komunikasi**: Sulit memberikan instruksi revisi yang menyeluruh kepada PO jika masukan dari berbagai reviewer saling bertentangan atau tidak selaras.

---

### 5. Sasaran Bisnis

- **Good Governance**: Memastikan setiap produk yang lolos telah memenuhi ambang batas kualitas dan kepatuhan perusahaan.
- **Pengambilan Keputusan yang Cepat**: Mempercepat waktu dari pengajuan ke keputusan akhir dengan data yang terkonsolidasi.
- **Manajemen Risiko**: Mengidentifikasi risiko tinggi (High/Critical) secara dini sebelum produk diluncurkan.
- **Akuntabilitas**: Mendokumentasikan setiap keputusan PM dengan audit trail yang lengkap.

---

### 6. Pengguna Utama

- **Product Manager / Group Product Manager**
- **Head of Product / Department Head**
- **Portfolio Manager**

---

### 7. Peran Product Manager dalam Sistem

Product Manager bertanggung jawab untuk:
- Mengawasi progres assessment yang diajukan oleh Product Owner di bawah timnya.
- Meninjau skor akhir, tingkat risiko, dan rekomendasi dari Technical, Business, dan Legal Reviewer.
- Memberikan penilaian akhir terhadap keselarasan produk dengan strategi portofolio.
- Membuat keputusan formal: **Approve**, **Approve with Condition**, **Need Revision**, **Reject**, atau **Hold**.
- Menetapkan instruksi tindak lanjut dan batas waktu (due date) untuk revisi.

---

### 8. Scope Fitur untuk Product Manager

#### Dalam Scope
- **PM Dashboard**: Global overview status assessment dan KPI review.
- **Final Approval View**: Halaman ringkasan hasil review 3 domain secara berdampingan.
- **Decision Panel**: Form untuk memberikan keputusan, catatan, dan instruksi *follow-up*.
- **Reviewer Tracking**: Memantau siapa yang sedang mereview dan status SLA mereka.
- **Reporting & Analytics**: Laporan performa assessment per kategori/unit bisnis.
- **Audit Trail Visibility**: Melihat sejarah lengkap perubahan dan komentar.

#### Di luar Scope
- Mengisi detail penilaian teknis, bisnis, atau legal (dilakukan oleh spesialis domain).
- Membuat draft assessment baru (dilakukan oleh Product Owner).
- Konfigurasi teknis template assessment (dilakukan oleh Admin).

---

### 9. User Story

#### Dashboard & Monitoring
- Sebagai Product Manager, saya ingin melihat ringkasan status semua assessment yang aktif agar saya tahu mana yang membutuhkan perhatian segera.
- Sebagai Product Manager, saya ingin melihat rata-rata waktu review per departemen untuk mengidentifikasi hambatan proses.

#### Decision Making
- Sebagai Product Manager, saya ingin melihat ringkasan risiko dari ketiga domain (Tech, Bus, Legal) dalam satu halaman agar saya bisa membuat keputusan yang seimbang.
- Sebagai Product Manager, saya ingin memberikan keputusan "Approve with Condition" agar produk tetap bisa jalan sambil memperbaiki poin-poin tertentu.

#### Collaboration
- Sebagai Product Manager, saya ingin memberikan instruksi revisi yang menggabungkan masukan dari berbagai reviewer untuk dikerjakan ulang oleh PO.
- Sebagai Product Manager, saya ingin melihat diskusi antara PO dan reviewer untuk memahami konteks masalah yang sedang diperdebatkan.

---

### 10. Workflow Utama Product Manager

**Flow 1: Meninjau Antrean Approval**
1. PM masuk ke dashboard dan melihat daftar "Pending PM Decision".
2. PM memilih assessment yang semua reviewer-nya sudah menyelesaikan penilaian (`reviewed` / `finalized`).
3. PM masuk ke halaman **Approval Detail**.

**Flow 2: Memberikan Keputusan Final**
1. PM meninjau skor agrerat dan tingkat risiko keseluruhan.
2. PM membaca rekomendasi dari Technical, Business, dan Legal Lead.
3. PM mengisi **Decision Note** dan **Follow-up Action** (jika ada).
4. Klik **Submit Decision**.
5. Sistem memperbarui status assessment (misal: `approved` atau `rejected`) dan mencatat `approved_by` & `approved_at`.

**Flow 3: Mengembalikan Assessment (Need Revision)**
1. Jika PM merasa data belum cukup atau reviewer memberikan feedback negatif yang kritikal, PM memilih **Need Revision**.
2. PM memberikan catatan menyeluruh tentang apa yang harus diperbaiki oleh PO.
3. Status berubah menjadi `need_revision`, dan PO mendapatkan notifikasi.

---

### 11. UI/UX Pages

#### 11.1 Product Manager Dashboard
- **Key Metrics**: Total Assessment, Average Time to Market, High Risk Products.
- **Assessment Status Chart**: Distribusi status (Draft, In-Review, Approved, Rejected).
- **Portfolio List**: Tabel daftar produk dengan nama PO, kategori, dan skor agrerat.
- **SLA Alert**: Daftar review yang melebihi batas waktu target.

#### 11.2 Decision Workspace (Approval Page)
- **Top Summary Bar**: Nama Produk, Versi, Skor Akhir, Rekomendasi agrerat.
- **Comparison Grid (3-Column View)**: 
  - Kolom Technical: Skor, Risiko, Ringkasan TR.
  - Kolom Business: Skor, Risiko, Ringkasan BR.
  - Kolom Legal: Skor, Risiko, Ringkasan LR.
- **Decision Form**:
  - Radio Button Keputusan (Approve, Reject, dll).
  - Text area untuk "Decision Note".
  - Input "Follow-up Action" & "Due Date" (opsional).

#### 11.3 Portfolio Analytics Page
- Perbandingan skor antar kategori produk.
- Tren jumlah pengajuan per bulan.
- Heatmap risiko produk dalam portofolio.

---

### 12. Functional Requirements

- **PM-001**: Sistem hanya mengizinkan aksi final approval dilakukan oleh PM yang ditugaskan atau user dengan role otoritas terkait.
- **PM-002**: Sistem harus memvalidasi bahwa semua domain wajib (Tech, Bus, Legal) telah memberikan review sebelum PM bisa memberikan keputusan **Approve**.
- **PM-003**: Sistem harus menyimpan record keputusan ke dalam tabel `assessment_approvals`.
- **PM-004**: PM dapat memberikan keputusan "Hold" jika assessment perlu ditunda tanpa harus ditolak atau direvisi.
- **PM-005**: Setiap keputusan PM harus memicu perubahan status `overall_status` pada entitas `ProductAssessment`.

---

### 13. Non-Functional Requirements

- **Auditability**: Sangat ketat, setiap keputusan approval harus terekam secara permanen dengan metadata aktor dan waktu.
- **Security**: Hak akses approval tidak boleh bocor atau bisa dilakukan oleh PO sendiri.
- **Performance**: Dashboard agregasi data dari banyak tabel harus teroptimasi (penggunaan view atau indexing).

---

### 14. Data yang Dikelola

- **Approval Decision**: Approve, Reject, Need Revision, Approve with Condition, Hold.
- **Decision Note**: Penjelasan di balik keputusan PM.
- **Follow-up Action**: Langkah selanjutnya yang harus diambil oleh unit bisnis.
- **Overall Score & Risk Level**: Data agrerat hasil konsolidasi reviewer.

---

### 15. Business Rules

1. Keputusan **Approve** hanya bisa dipilih jika status review teknis, bisnis, dan legal sudah masuk ke tahap final (tidak ada yang `not_started` atau `in_progress`).
2. Jika skor keseluruhan berada di bawah *pass-threshold* (misal < 60%), sistem harus memberikan peringatan (warning) saat PM mencoba menekan tombol **Approve**.
3. PM dapat mendelegasikan review ke orang lain, namun tanggung jawab approval akhir tetap pada PM produk tersebut.
4. Perubahan keputusan (misal dari Rejected ke Approved) hanya bisa dilakukan dengan alasan yang sangat kuat dan tercatat di audit log khusus.

---

### 16. Acceptance Criteria

- PM dapat melihat daftar assessment yang berada di bawah pimpinannya.
- PM mendapatkan tampilan komparasi 3 domain yang jelas dan mudah dibaca.
- Status `overall_status` pada `ProductAssessment` terupdate tepat setelah PM menekan tombol submit decision.
- Notifikasi keputusan terkirim secara *real-time* kepada Product Owner dan Reviewer.

---

### 17. Notifikasi

Product Manager menerima notifikasi saat:
- Sebuah assessment baru saja selesai di-review oleh semua reviewer (Ready for Decision).
- Batas waktu SLA review hampir habis (Escalation).
- Ada resubmit dari PO yang sebelumnya dikembalikan oleh PM.

---

### 18. Reporting

Laporan strategis untuk PM:
- **Product Portfolio Performance**: Kualitas produk-produk yang diajukan berdasarkan skor assessment.
- **Reviewer Throughput**: Berapa banyak review yang diselesaikan per departemen.
- **Risk Distribution**: Berapa banyak produk yang memiliki risiko High/Critical dalam portofolio saat ini.

---

### 19. Risiko & Mitigasi

- **Risiko**: PM menjadi "bottleneck" karena menunggu semua reviewer selesai.
- **Mitigasi**: Alert sistem untuk reviewer yang lambat dan fitur "Override" oleh PM dalam kondisi darurat tertentu.
- **Risiko**: Keputusan PM tidak konsisten.
- **Mitigasi**: Penyediaan data histori keputusan serupa dan standardisasi rubrik approval.

---

### 20. Future Enhancement

- **Decision Support System (DSS)**: AI yang memberikan saran keputusan berdasarkan pola data historis.
- **Executive Summary generator**: Otomatisasi pembuatan laporan ringkasan untuk level C-level atau Board.
- **Multi-Stage Approval**: Mendukung hirarki approval yang lebih kompleks (misal PM -> VP -> CEO).
- **Integration with Project Management Tools**: Otomatisasi pembuatan project/task di Jira/Trello setelah assessment di-approve.
