# Planner - Submit Approver Final Validation

## Fungsi
Memberikan status final (`Approved` / `Rejected`) di sistem setelah memvalidasi tanda tangan fisik Business Owner pada dokumen yang diunggah.

## Kondisi Data
- **Mandatory Attachment**: Harus ada dokumen dengan tipe `SIGNED_DOCUMENT` di antara lampiran assessment tersebut.
- Jika dokumen tidak ada, lempar error (tidak bisa approve).

## Langkah-langkah
1.  **DTO**: Buat `SubmitFinalValidationDto` (decision, note).
2.  **Validasi**:
    -   Cek apakah assessment ada.
    -   Cek keberadaan lampiran `SIGNED_DOCUMENT`. (Bisa difilter melalui `attachments` repository).
3.  **Transaksi Database**:
    -   Update `overall_status` pada `ProductAssessment` menjadi `approved` (atau `rejected`).
    -   Update `approved_by` (approver id) dan `approved_at`.
    -   Catat di `AssessmentAuditLog`.
4.  **Output**: Hasil pembaruan assessment.

## Endpoint
`POST /v1/approvers/assessment/:id/validate`
