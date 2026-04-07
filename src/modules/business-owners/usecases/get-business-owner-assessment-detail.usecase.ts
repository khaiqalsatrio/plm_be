import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GetBusinessOwnerAssessmentDetailUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(id: string, logged: User) {
    const assessment = await this.assessmentRepo.findOne({
      where: { id },
      relations: [
        'product',
        'product.category',
        'product.business_unit',
        'reviews',
        'reviews.reviewer',
        'attachments',
        'approvals',
        'approvals.approver',
      ],
    });

    if (!assessment) {
      throw new NotFoundException('Assessment tidak ditemukan');
    }

    // Security check: BO only see assessment in their BU
    if (assessment.product.business_unit_id !== logged.business_unit_id) {
      throw new ForbiddenException('Anda tidak memiliki akses ke unit bisnis ini');
    }

    // Responses are NOT included in relations above, ensuring summary only view
    return assessment;
  }
}
