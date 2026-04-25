import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, DocumentType } from 'src/common/constant/enum';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

@Injectable()
export class GetApproverQueueUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(page: number, limit: number) {
    // Queue filter: assessments that are IN_REVIEW and might have PM decision.
    // In many PLMs, we show everything that's 'in_review' for the approver.
    const query = this.assessmentRepo.createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.product', 'product')
      .leftJoinAndSelect('assessment.approvals', 'approvals') // PM decisions are stored here
      .leftJoinAndSelect('assessment.attachments', 'attachments')
      .where('assessment.overall_status = :status', { status: AssessmentStatus.IN_REVIEW });
    
    // Optional: Filter only items that have at least one approval entry 
    // (meaning PM has already weighed in).
    query.orderBy('assessment.updatedAt', 'DESC');

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // Map data to include "signed_document_present" indicator
    const result = data.map(item => {
      const hasSignedDoc = item.attachments?.some(a => a.document_type === DocumentType.SIGNED_DOCUMENT);
      return {
        ...item,
        is_signed_document_present: hasSignedDoc,
      };
    });

    return {
      data: result,
      meta: {
        total,
        page,
        limit,
        total_page: Math.ceil(total / limit),
      },
    };
  }
}
