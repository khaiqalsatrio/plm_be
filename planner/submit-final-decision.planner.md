# Planner - Submit Product Manager Final Decision

## Fungsi
Mencatat keputusan final (Approve/Reject/Revision) dari Product Manager terhadap suatu assessment.

## Aturan Bisnis (Kritikal)
- **Mandatory Review**: PM **TIDAK BOLEH** memberikan keputusan `Approve` atau `Reject` (Final) jika salah satu dari `technical_status`, `business_status`, atau `legal_status` belum dalam status `REVIEWED` atau `FINALIZED`.
- Jika PM memilih `Need Revision`, status utama assessment akan berubah menjadi `need_revision`, namun tidak menghapus review yang sudah ada.

## Langkah-langkah
1.  **DTO**: Buat `SubmitFinalDecisionDto` (decision, decision_note, follow_up_action, due_date).
2.  **Validasi**:
    -   Cek apakah assessment ada.
    -   Cek status review domain (Tech, Business, Legal). Jika ada yang belum `REVIEWED`, lempar error (kebijakan ketat sesuai permintaan user).
3.  **Transaksi Database**:
    -   Simpan/Update record di tabel `AssessmentApproval`.
    -   Update `overall_status` di `ProductAssessment` berdasarkan keputusan PM.
    -   Update `approved_by` dan `approved_at` di `ProductAssessment` jika disetujui.
    -   Catat di `AssessmentAuditLog`.
4.  **Output**: Kembalikan data assessment yang telah diperbarui.

## Endpoint
`POST /v1/product-managers/assessment/:id/decision`
