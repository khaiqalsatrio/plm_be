# PLM Product Assessment Entities

## Overview

Dokumen ini menjelaskan rancangan entity utama untuk modul **PLM Product Assessment** yang berfokus pada tiga domain penilaian utama:

- Assessment Teknis
- Assessment Business
- Assessment Legal

Dokumen ini mencakup:

1. Entity utama
2. Relasi antar entity
3. Area yang akan di-assess
4. Contoh struktur field
5. Rekomendasi MVP dan pengembangan lanjutan

---

# 1. Entity Utama PLM Product Assessment

## A. Product

Menyimpan data master produk yang akan dinilai.

### Tujuan
Sebagai entitas induk dari assessment.

### Field utama
- `id`
- `product_code`
- `product_name`
- `product_category_id`
- `business_unit_id`
- `owner_id`
- `product_manager_id`
- `product_type`
- `stage`
- `priority`
- `description`
- `objective`
- `target_market`
- `value_proposition`
- `status`
- `created_at`
- `updated_at`

---

## B. ProductAssessment

Menyimpan satu siklus assessment untuk suatu produk.

### Tujuan
Setiap kali produk dinilai, sistem membuat satu record assessment baru.

### Field utama
- `id`
- `assessment_no`
- `product_id`
- `template_id`
- `version`
- `assessment_type`
- `overall_status`
- `technical_status`
- `business_status`
- `legal_status`
- `technical_score`
- `business_score`
- `legal_score`
- `total_score`
- `technical_risk_level`
- `business_risk_level`
- `legal_risk_level`
- `overall_risk_level`
- `recommendation`
- `created_by`
- `submitted_by`
- `submitted_at`
- `approved_by`
- `approved_at`
- `decision_note`
- `created_at`
- `updated_at`

### Catatan
Satu produk bisa punya banyak assessment:
- assessment awal
- assessment revisi
- re-assessment
- periodic review

---

## C. AssessmentTemplate

Template assessment berdasarkan tipe produk.

### Tujuan
Agar sistem fleksibel. Contoh:
- template untuk digital product
- template untuk internal tool
- template untuk partnership product
- template untuk AI product

### Field utama
- `id`
- `template_code`
- `template_name`
- `product_type`
- `version`
- `description`
- `is_active`
- `published_at`
- `created_at`
- `updated_at`

---

## D. AssessmentSection

Bagian besar dari assessment.

### Tujuan
Membagi assessment menjadi domain atau section.

### Contoh section
- Technical Assessment
- Business Assessment
- Legal Assessment

### Field utama
- `id`
- `template_id`
- `section_code`
- `section_name`
- `section_type`
- `weight`
- `sort_order`
- `is_required`
- `created_at`
- `updated_at`

---

## E. AssessmentCriteria

Kriteria penilaian di dalam section.

### Tujuan
Mendefinisikan item apa yang dinilai.

### Contoh
Dalam Technical:
- Architecture Fit
- Integration Complexity
- Security

Dalam Business:
- Strategic Alignment
- Market Potential

Dalam Legal:
- Data Privacy
- Licensing

### Field utama
- `id`
- `section_id`
- `criteria_code`
- `criteria_name`
- `description`
- `weight`
- `score_type`
- `is_required`
- `has_comment`
- `has_attachment`
- `sort_order`
- `created_at`
- `updated_at`

---

## F. AssessmentQuestion

Pertanyaan detail untuk setiap kriteria.

### Tujuan
Agar penilaian granular dan terstruktur.

### Contoh
Criteria: Security  
Questions:
- Apakah produk menggunakan authentication standar?
- Apakah data sensitif dienkripsi?
- Apakah sudah ada access control policy?

### Field utama
- `id`
- `criteria_id`
- `question_code`
- `question_text`
- `question_type`
- `answer_type`
- `weight`
- `is_required`
- `help_text`
- `placeholder`
- `option_source`
- `sort_order`
- `created_at`
- `updated_at`

---

## G. AssessmentResponse

Jawaban aktual terhadap pertanyaan assessment.

### Tujuan
Menyimpan nilai hasil isi reviewer atau owner.

### Field utama
- `id`
- `assessment_id`
- `section_id`
- `criteria_id`
- `question_id`
- `reviewer_type`
- `answer_text`
- `answer_number`
- `answer_boolean`
- `answer_option`
- `score`
- `risk_level`
- `note`
- `created_by`
- `created_at`
- `updated_at`

### reviewer_type
- `technical`
- `business`
- `legal`
- `owner`

---

## H. AssessmentReview

Menyimpan hasil review per domain.

### Tujuan
Agar ada ringkasan review per reviewer/domain.

### Field utama
- `id`
- `assessment_id`
- `review_type`
- `reviewer_id`
- `review_status`
- `score`
- `risk_level`
- `summary`
- `recommendation`
- `reviewed_at`
- `created_at`
- `updated_at`

---

## I. AssessmentApproval

Menyimpan keputusan final approval.

### Tujuan
Agar keputusan governance terdokumentasi.

### Field utama
- `id`
- `assessment_id`
- `approver_id`
- `decision`
- `decision_note`
- `follow_up_action`
- `due_date`
- `approved_at`
- `created_at`
- `updated_at`

### decision
- `approve`
- `approve_with_condition`
- `need_revision`
- `reject`
- `hold`

---

## J. AssessmentAttachment

Lampiran dokumen pendukung.

### Tujuan
Menyimpan file pendukung assessment.

### Contoh
- business case
- BRD
- architecture diagram
- legal opinion
- compliance checklist

### Field utama
- `id`
- `assessment_id`
- `section_id` nullable
- `criteria_id` nullable
- `file_name`
- `file_url`
- `file_type`
- `document_type`
- `uploaded_by`
- `uploaded_at`
- `created_at`
- `updated_at`

---

## K. AssessmentComment

Komentar kolaborasi antar user.

### Tujuan
Menyimpan diskusi per assessment atau per section.

### Field utama
- `id`
- `assessment_id`
- `section_id` nullable
- `criteria_id` nullable
- `parent_comment_id` nullable
- `comment_text`
- `comment_type`
- `mentioned_user_id` nullable
- `created_by`
- `created_at`
- `updated_at`

---

## L. AssessmentAuditLog

Menyimpan jejak perubahan.

### Tujuan
Audit trail perubahan status, data, score, dan keputusan.

### Field utama
- `id`
- `assessment_id`
- `action_type`
- `from_value`
- `to_value`
- `note`
- `actor_id`
- `created_at`

---

## M. MasterProductCategory

Master kategori produk.

### Contoh
- Digital Platform
- Internal Application
- AI Product
- Partnership Product
- API Service

### Field utama
- `id`
- `code`
- `name`
- `description`
- `is_active`

---

## N. MasterBusinessUnit

Master unit bisnis.

### Field utama
- `id`
- `code`
- `name`
- `description`
- `is_active`

---

## O. MasterRiskLevel

Master risk level.

### Contoh
- Low
- Medium
- High
- Critical

### Field utama
- `id`
- `code`
- `name`
- `score_min`
- `score_max`
- `color`
- `description`

---

## P. MasterAssessmentOption

Master option untuk dropdown/radio tertentu.

### Contoh
- deployment_type
- compliance_status
- market_confidence
- architecture_fit

### Field utama
- `id`
- `group_name`
- `option_code`
- `option_label`
- `option_value`
- `sort_order`
- `is_active`

---

# 2. Relasi Antar Entity

Struktur relasinya kira-kira seperti ini:

- **Product** 1..n **ProductAssessment**
- **AssessmentTemplate** 1..n **AssessmentSection**
- **AssessmentSection** 1..n **AssessmentCriteria**
- **AssessmentCriteria** 1..n **AssessmentQuestion**
- **ProductAssessment** 1..n **AssessmentResponse**
- **ProductAssessment** 1..n **AssessmentReview**
- **ProductAssessment** 1..n **AssessmentApproval**
- **ProductAssessment** 1..n **AssessmentAttachment**
- **ProductAssessment** 1..n **AssessmentComment**
- **ProductAssessment** 1..n **AssessmentAuditLog**

Kalau mau dibuat sederhana:
- **Product** = objek yang dinilai
- **Template** = aturan main penilaian
- **Assessment** = eksekusi penilaian
- **Response / Review / Approval** = hasil, komentar, keputusan

---

# 3. Apa Saja yang Akan Di-Assess

Dokumen assessment dibagi menjadi 3 domain besar:

- Technical Assessment
- Business Assessment
- Legal Assessment

---

# A. Assessment Teknis

## Tujuan
Menilai apakah produk siap, feasible, aman, scalable, dan maintainable secara teknis.

## Area yang di-assess

### 1. Architecture Fit
Yang dinilai:
- apakah solusi sesuai enterprise architecture
- apakah stack teknologi sesuai standar perusahaan
- apakah perlu platform baru
- apakah ada dependency arsitektur besar

### 2. Integration Complexity
Yang dinilai:
- jumlah sistem yang perlu diintegrasikan
- kerumitan API/data exchange
- dependency ke legacy system
- kebutuhan middleware atau adapter khusus

### 3. Security
Yang dinilai:
- authentication
- authorization
- encryption at rest / in transit
- vulnerability risk
- access control
- logging dan auditability

### 4. Scalability
Yang dinilai:
- estimasi jumlah user
- estimasi transaksi
- kemampuan scaling
- bottleneck potensial

### 5. Performance
Yang dinilai:
- response time target
- throughput
- latency sensitivity
- load expectation

### 6. Reliability & Availability
Yang dinilai:
- target SLA
- failover readiness
- backup & restore
- incident recovery

### 7. Maintainability
Yang dinilai:
- modularity
- code maintainability
- developer skill availability
- supportability

### 8. DevOps & Operational Readiness
Yang dinilai:
- CI/CD readiness
- monitoring
- logging
- alerting
- observability
- release management

### 9. Data & Infrastructure Readiness
Yang dinilai:
- database readiness
- storage need
- infra complexity
- environment setup
- capacity planning

### 10. Technical Risk
Yang dinilai:
- technical debt potential
- vendor lock-in
- unsupported technology risk
- implementation complexity

---

# B. Assessment Business

## Tujuan
Menilai apakah produk masuk akal dari sisi value, strategi, pasar, biaya, dan manfaat.

## Area yang di-assess

### 1. Strategic Alignment
Yang dinilai:
- apakah produk selaras dengan strategi perusahaan
- apakah mendukung OKR / target unit
- apakah prioritas bisnisnya jelas

### 2. Problem-Solution Fit
Yang dinilai:
- apakah problem yang diselesaikan nyata
- apakah pain point terdefinisi
- apakah solusi tepat terhadap problem

### 3. Market Potential
Yang dinilai:
- target market jelas
- ukuran pasar
- potensi demand
- peluang adopsi

### 4. Customer Value Proposition
Yang dinilai:
- manfaat bagi user/customer
- pembeda dibanding alternatif
- urgensi kebutuhan

### 5. Revenue / Benefit Potential
Yang dinilai:
- direct revenue
- indirect revenue
- cost efficiency
- productivity gain
- strategic impact

### 6. Cost Feasibility
Yang dinilai:
- development cost
- operational cost
- maintenance cost
- hidden cost

### 7. ROI / Financial Justification
Yang dinilai:
- ROI estimate
- payback period
- value vs cost
- benefit realization confidence

### 8. Competitive Position
Yang dinilai:
- existing competitor
- internal substitute
- differentiation
- advantage sustainability

### 9. Adoption Readiness
Yang dinilai:
- kesiapan user menerima produk
- kebutuhan change management
- training effort
- go-to-market complexity

### 10. Business Risk
Yang dinilai:
- market uncertainty
- low adoption risk
- monetization uncertainty
- stakeholder dependency

---

# C. Assessment Legal

## Tujuan
Menilai apakah produk aman dari sisi hukum, regulasi, kepatuhan, lisensi, dan data privacy.

## Area yang di-assess

### 1. Regulatory Compliance
Yang dinilai:
- kepatuhan terhadap regulasi industri
- kebutuhan izin / regulatory approval
- adanya kebijakan wajib yang harus dipenuhi

### 2. Data Privacy
Yang dinilai:
- apakah mengolah data pribadi
- apakah mengolah data sensitif
- kebutuhan consent
- retention policy
- cross-border data issue

### 3. Contractual Requirement
Yang dinilai:
- apakah butuh kerja sama pihak ketiga
- apakah butuh NDA / MSA / SLA
- apakah ada kewajiban kontraktual khusus

### 4. Licensing
Yang dinilai:
- penggunaan software pihak ketiga
- open source license compatibility
- commercial license issue
- subscription dependency

### 5. Intellectual Property
Yang dinilai:
- hak cipta
- kepemilikan source code
- kepemilikan model / dataset / content
- penggunaan aset pihak ketiga

### 6. Liability & Legal Exposure
Yang dinilai:
- potensi tuntutan
- liability exposure
- dispute potential
- disclaimer need

### 7. Internal Policy Compliance
Yang dinilai:
- kepatuhan kebijakan internal perusahaan
- security policy alignment
- procurement / legal standard alignment

### 8. Legal Risk
Yang dinilai:
- blocker hukum
- area abu-abu legal
- risiko reputasi
- mandatory legal action

---

# 4. Contoh Kriteria Assessment yang Lebih Nyata

## Technical Criteria Example

### Section: Architecture Fit
- Kesesuaian dengan arsitektur enterprise
- Kesesuaian dengan stack teknologi standar
- Kebutuhan komponen baru
- Kompleksitas desain solusi

### Section: Security
- Kesiapan authentication
- Kesiapan authorization
- Kebutuhan enkripsi
- Audit logging
- Security vulnerability exposure

### Section: Operations
- Monitoring readiness
- Backup & recovery readiness
- Incident handling readiness
- Deployment readiness

---

## Business Criteria Example

### Section: Strategic Alignment
- Kesesuaian dengan objective bisnis
- Dampak strategis produk
- Prioritas sponsor bisnis

### Section: Market & Value
- Kejelasan target user
- Nilai manfaat produk
- Diferensiasi solusi
- Peluang adopsi

### Section: Financial
- Besaran biaya pengembangan
- Perkiraan manfaat
- ROI
- Payback period
- Efisiensi operasional

---

## Legal Criteria Example

### Section: Data Privacy
- Ada / tidak data pribadi
- Ada / tidak data sensitif
- Perlu consent atau tidak
- Ada kebijakan retensi atau belum

### Section: Licensing
- Ada third-party component
- Ada lisensi komersial
- Ada risiko open source conflict

### Section: Contract & Compliance
- Butuh perjanjian kerja sama
- Butuh SLA
- Ada kewajiban regulasi
- Ada hard stop legal

---

# 5. Entity Minimal untuk MVP

Kalau mau bikin **MVP dulu**, entity minimalnya cukup ini:

1. `products`
2. `product_assessments`
3. `assessment_sections`
4. `assessment_criteria`
5. `assessment_responses`
6. `assessment_reviews`
7. `assessment_approvals`
8. `assessment_attachments`
9. `assessment_comments`
10. `assessment_audit_logs`

Ini sudah cukup untuk jalan.

Kalau mau lebih enterprise dan configurable:
- tambah `assessment_templates`
- tambah `assessment_questions`
- tambah `master_assessment_option`
- tambah workflow tables

---

# 6. Rekomendasi Status per Entity

## ProductAssessment Status
- `draft`
- `submitted`
- `in_review`
- `need_revision`
- `approved`
- `rejected`
- `archived`

## Review Status
- `not_started`
- `in_progress`
- `reviewed`
- `returned`
- `finalized`

## Recommendation
- `recommended`
- `recommended_with_revision`
- `major_revision_needed`
- `not_recommended`

---

# 7. Rekomendasi Bobot Assessment

Contoh bobot awal:
- **Technical**: 35%
- **Business**: 40%
- **Legal**: 25%

Atau kalau produknya highly regulated:
- **Technical**: 30%
- **Business**: 30%
- **Legal**: 40%

---

# 8. Entity Tambahan untuk Pengembangan Lanjutan

## ProductRiskRegister
Untuk menyimpan daftar risiko hasil assessment.

### Field
- `id`
- `assessment_id`
- `domain`
- `risk_title`
- `risk_description`
- `severity`
- `mitigation_plan`
- `owner_id`
- `due_date`
- `status`

## AssessmentActionItem
Untuk tindak lanjut dari reviewer/approver.

### Field
- `id`
- `assessment_id`
- `source_type`
- `domain`
- `action_text`
- `assigned_to`
- `due_date`
- `status`

## AssessmentVersion
Untuk histori versi assessment.

### Field
- `id`
- `assessment_id`
- `version_no`
- `change_summary`
- `created_by`
- `created_at`

---

# 9. Saran Struktur Domain Final

## Technical
- Architecture
- Integration
- Security
- Scalability
- Performance
- Reliability
- Maintainability
- DevOps & Operations
- Data & Infrastructure
- Technical Risk

## Business
- Strategic Alignment
- Problem-Solution Fit
- Market Potential
- Value Proposition
- Revenue / Benefit
- Cost Feasibility
- ROI
- Competitive Position
- Adoption Readiness
- Business Risk

## Legal
- Regulatory Compliance
- Data Privacy
- Contractual Requirement
- Licensing
- Intellectual Property
- Liability Exposure
- Internal Policy Compliance
- Legal Risk

---

# 10. Saran Praktis

Kalau tujuan utamanya adalah bikin **PLM Product Assessment yang fleksibel**, pendekatan paling enak adalah:

- **Product** sebagai master
- **ProductAssessment** sebagai transaksi
- **AssessmentTemplate / Section / Criteria / Question** sebagai configurator
- **Response / Review / Approval** sebagai hasil

Dengan struktur ini, kalau nanti mau tambah domain baru seperti:
- Security Assessment khusus
- AI Ethics Assessment
- Vendor Assessment

cukup tambah template dan section, tanpa perlu bedah database besar-besaran.

---

# 11. Rekomendasi Langkah Lanjutan

Setelah dokumen entity ini, langkah paling pas biasanya:
1. buat ERD
2. buat PostgreSQL table design
3. buat TypeORM entities
4. buat JSON schema untuk generator backend/frontend
5. mapping entity ke PRD dan workflow UI
