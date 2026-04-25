import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as PDFDocument from 'pdfkit';
import { Repository } from 'typeorm';

import { AssessmentStatus, ReviewStatus } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

@Injectable()
export class ExportAssessmentPdfUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(id: string, logged: AuthenticatedUser): Promise<PDFKit.PDFDocument> {
    const assessment = await this.assessmentRepo.findOne({
      where: { id },
      relations: [
        'product',
        'product.category',
        'product.business_unit',
        'template',
        'template.sections',
        'template.sections.criteria',
        'template.sections.criteria.questions',
        'responses',
        'reviews',
      ],
    });

    if (!assessment) {
      throw new NotFoundException('Assessment tidak ditemukan');
    }

    const doc = new PDFDocument({ margin: 50 });

    // HEADER
    doc
      .fontSize(20)
      .text('PRODUCT ASSESSMENT REPORT', { align: 'center' })
      .moveDown();

    doc
      .fontSize(10)
      .text(`Assessment No: ${assessment.assessment_no}`)
      .text(`Date Exported: ${new Date().toLocaleString()}`)
      .moveDown();

    // PRODUCT INFO
    doc.font('Helvetica-Bold').fontSize(12).text('1. Product Information', { underline: true }).moveDown(0.5);
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Product Name: ${assessment.product?.product_name || '-'}`)
      .text(`Category: ${assessment.product?.category?.name || '-'}`)
      .text(`Business Unit: ${assessment.product?.business_unit?.name || '-'}`)
      .text(`Version: ${assessment.version}`)
      .moveDown();

    // OVERALL STATUS
    doc.font('Helvetica-Bold').fontSize(12).text('2. Assessment Summary', { underline: true }).moveDown(0.5);
    doc
      .font('Helvetica')
      .fontSize(10)
      .text(`Overall Status: ${assessment.overall_status.toUpperCase()}`)
      .text(`Overall Risk: ${assessment.overall_risk_level || '-'}`)
      .moveDown();

    // SUMMARY SCORES
    doc.text('Scores:', { indent: 20 });
    doc.text(`- Technical: ${assessment.technical_score || 0} (${assessment.technical_status})`, { indent: 40 });
    doc.text(`- Business: ${assessment.business_score || 0} (${assessment.business_status})`, { indent: 40 });
    doc.text(`- Legal: ${assessment.legal_score || 0} (${assessment.legal_status})`, { indent: 40 });
    doc.moveDown();

    // DETAILED RESPONSES
    doc.font('Helvetica-Bold').fontSize(12).text('3. Detailed Findings', { underline: true }).moveDown(0.5);

    if (assessment.template?.sections) {
      for (const section of assessment.template.sections) {
        doc.font('Helvetica-Bold').fontSize(11).text(`${section.section_name}`).moveDown(0.2);
        
        if (section.criteria) {
          for (const crit of section.criteria) {
            const response = assessment.responses?.find(r => r.criteria_id === crit.id);
            doc
              .font('Helvetica')
              .fontSize(10)
              .text(`Criteria: ${crit.criteria_name}`, { indent: 10 })
              .text(`Score: ${response?.score || '-'}`, { indent: 20 })
              .text(`Notes: ${response?.note || '-'}`, { indent: 20 })
              .moveDown(0.5);
          }
        }
        doc.moveDown(0.5);
      }
    }

    // SIGNATURE SECTION
    doc.addPage();
    doc.font('Helvetica-Bold').fontSize(12).text('4. Approval & Sign-off', { underline: true }).moveDown();

    const startY = doc.y;
    const colWidth = 120;
    const rowHeight = 80;

    // Table Header for signatures
    doc.fontSize(9);
    
    // Line 1: Labels
    doc.text('Prepared By,', 50, startY);
    doc.text('Technical Reviewer,', 50 + colWidth, startY);
    doc.text('Business Reviewer,', 50 + (colWidth * 2), startY);
    doc.text('Legal Reviewer,', 50 + (colWidth * 3), startY);

    // Signature Spaces
    doc.moveDown(4);
    const endY = doc.y;

    // Names (Static placeholders or mapped from review entity)
    const techReview = assessment.reviews?.find(r => r.review_type === 'technical');
    const busReview = assessment.reviews?.find(r => r.review_type === 'business');
    const legReview = assessment.reviews?.find(r => r.review_type === 'legal');

    doc.text('(____________________)', 50, endY);
    doc.text('(____________________)', 50 + colWidth, endY);
    doc.text('(____________________)', 50 + (colWidth * 2), endY);
    doc.text('(____________________)', 50 + (colWidth * 3), endY);

    doc.text('Product Owner', 50, endY + 15);
    doc.text('Reviewer IT', 50 + colWidth, endY + 15);
    doc.text('Reviewer Business', 50 + (colWidth * 2), endY + 15);
    doc.text('Reviewer Legal', 50 + (colWidth * 3), endY + 15);

    doc.end();
    return doc;
  }
}
