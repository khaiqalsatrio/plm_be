import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductAssessment } from 'src/entities/product-assessment.entity';

@Injectable()
export class GetApproverAssessmentDetailUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(id: string) {
    const assessment = await this.assessmentRepo.findOne({
      where: { id },
      relations: [
        'product',
        'product.category',
        'product.business_unit',
        'reviews',
        'reviews.reviewer',
        'responses', // Full access to scores/details
        'responses.question',
        'attachments',
        'approvals',
        'approvals.approver',
      ],
    });

    if (!assessment) {
      throw new NotFoundException('Assessment tidak ditemukan');
    }

    return assessment;
  }
}
