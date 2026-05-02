# API Documentation: Admin Template Builder

Dokumen ini berisi spesifikasi API untuk fitur **Template Builder & Versioning** yang ditujukan untuk Role `admin`. Dokumentasi ini disusun untuk memudahkan integrasi pada sisi Frontend (FE).

---

## Base URL & Authentication

- **Base Path**: `/v1/assessment-templates`
- **Authentication**: Memerlukan Bearer Token JWT di header.
- **Role Required**: `admin`

```http
Authorization: Bearer <token_anda>
```

---

## 1. Get Template List

Mengambil daftar semua Assessment Templates.

- **Method**: `GET`
- **Path**: `/`

### Response (200 OK)

```json
{
  "success": true,
  "message": "Success retrieve data",
  "data": [
    {
      "id": "uuid-template-1",
      "template_code": "TPL-DIGITAL-01",
      "template_name": "Digital Product Initial Assessment",
      "product_type": "digital_product",
      "version": 1,
      "description": "Template standar untuk produk digital",
      "is_active": true,
      "published_at": "2026-05-02T07:25:27.000Z",
      "created_at": "2026-05-01T10:00:00.000Z"
    }
  ]
}
```

---

## 2. Get Template Detail

Mengambil struktur lengkap sebuah template, termasuk *Sections*, *Criteria*, dan *Questions*.

- **Method**: `GET`
- **Path**: `/:id`

### Response (200 OK)

```json
{
  "success": true,
  "message": "Success retrieve data",
  "data": {
    "id": "uuid-template-1",
    "template_code": "TPL-DIGITAL-01",
    "template_name": "Digital Product Initial Assessment",
    "product_type": "digital_product",
    "version": 1,
    "description": "Template standar untuk produk digital",
    "is_active": true,
    "published_at": null,
    "sections": [
      {
        "id": "uuid-section-1",
        "section_code": "SEC-TECH",
        "section_name": "Technical Assessment",
        "section_type": "technical",
        "weight": 40.0,
        "sort_order": 1,
        "is_required": true,
        "criteria": [
          {
            "id": "uuid-criteria-1",
            "criteria_code": "CRI-ARCH",
            "criteria_name": "Architecture Review",
            "description": "Review arsitektur sistem",
            "weight": 50.0,
            "score_type": "manual_score",
            "is_required": true,
            "has_comment": true,
            "has_attachment": true,
            "sort_order": 1,
            "questions": [
              {
                "id": "uuid-question-1",
                "question_code": "Q-ARCH-01",
                "question_text": "Apakah arsitektur sudah mendukung scalability?",
                "question_type": "question",
                "answer_type": "text",
                "weight": 100.0,
                "is_required": true,
                "help_text": "Jelaskan dengan singkat",
                "placeholder": "Contoh: Menggunakan microservices...",
                "sort_order": 1
              }
            ]
          }
        ]
      }
    ]
  }
}
```

---

## 3. Create Template

Membuat template baru beserta seluruh strukturnya (Sections, Criteria, Questions) sekaligus (*Bulk-save*). 

> **Catatan untuk FE**: Form Builder di FE sebaiknya mengumpulkan seluruh data struktur secara dinamis ke dalam satu JSON *payload* sebelum dikirim.

- **Method**: `POST`
- **Path**: `/`

### Request Body

```json
{
  "template_code": "TPL-DIGITAL-01",
  "template_name": "Digital Product Initial Assessment",
  "product_type": "digital_product",
  "description": "Deskripsi opsional",
  "sections": [
    {
      "section_code": "SEC-TECH",
      "section_name": "Technical Assessment",
      "section_type": "technical",
      "weight": 40,
      "sort_order": 1,
      "is_required": true,
      "criteria": [
        {
          "criteria_code": "CRI-ARCH",
          "criteria_name": "Architecture Review",
          "description": "Opsional",
          "weight": 50,
          "score_type": "manual_score",
          "is_required": true,
          "has_comment": true,
          "has_attachment": true,
          "sort_order": 1,
          "questions": [
            {
              "question_code": "Q-ARCH-01",
              "question_text": "Apakah arsitektur mendukung scalability?",
              "question_type": "question",
              "answer_type": "text",
              "weight": 100,
              "is_required": true,
              "help_text": "Opsional",
              "placeholder": "Opsional",
              "option_source": "Opsional",
              "sort_order": 1
            }
          ]
        }
      ]
    }
  ]
}
```

### Response (201 Created)

Mengembalikan data Template yang baru saja dibuat (hanya root object, tanpa nested relations).

```json
{
  "success": true,
  "message": "Data berhasil dibuat",
  "data": {
    "id": "uuid-template-1",
    "template_code": "TPL-DIGITAL-01",
    "version": 1,
    "...": "..."
  }
}
```

---

## 4. Update Template

Memperbarui struktur template. Sistem akan memproses **Versioning Otomatis** di backend:
- Jika template belum di-publish (`published_at: null`) dan belum pernah dipakai, data lama akan **ditimpa** (Overwrite).
- Jika template sudah di-publish atau dipakai, sistem akan **membuat clone (versi baru)** dan mengarsip versi lama.

> **Catatan untuk FE**: FE cukup mengirim struktur terbaru secara utuh. Backend yang akan mengurus pembuatan ID dan versi baru jika diperlukan. FE tidak perlu mengubah logika kiriman data.

- **Method**: `PUT`
- **Path**: `/:id`

### Request Body
Sama persis dengan `POST /` (mengirim utuh struktur yang telah diedit/ditambah/dikurangi di FE).

### Response (200 OK)

Mengembalikan data root template (yang lama atau yang baru ter-clone dengan version `+1`).

```json
{
  "success": true,
  "message": "Data berhasil diperbarui",
  "data": {
    "id": "uuid-template-baru-jika-clone",
    "version": 2,
    "...": "..."
  }
}
```

---

## 5. Publish Template

Menandai template agar berstatus *Published* sehingga dapat dipilih oleh Product Owner saat membuat Asesmen baru.

> **Catatan**: Setelah di-publish, jika Admin melakukan Update (PUT), sistem pasti akan membuat versi baru (Versioning).

- **Method**: `POST`
- **Path**: `/:id/publish`

### Request Body
*(Kosong)*

### Response (200 OK)

```json
{
  "success": true,
  "message": "Template berhasil dipublikasi",
  "data": {
    "id": "uuid-template-1",
    "published_at": "2026-05-02T15:00:00.000Z",
    "...": "..."
  }
}
```

---

## Referensi Enum / Constants

Berikut adalah daftar `Enum` yang diterima oleh Endpoint di atas:

**product_type**:
- `digital_product`, `internal_tool`, `partnership_product`, `ai_product`, `api_service`

**section_type**:
- `technical`, `business`, `legal`

**score_type**:
- `manual_score`, `auto_score`, `boolean_score`, `option_score`

**question_type**:
- `statement`, `question`, `checklist`

**answer_type**:
- `text`, `number`, `boolean`, `select`, `multi_select`, `score`
