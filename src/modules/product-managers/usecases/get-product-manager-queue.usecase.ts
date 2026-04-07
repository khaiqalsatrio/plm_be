import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentStatus } from 'src/common/constant/enum';

@Injectable()
export class GetProductManagerQueueUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async paginate(page: number, limit: number, status?: string) {
    const query = this.assessmentRepo.createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.business_unit', 'business_unit')
      .where('assessment.overall_status != :draft', { draft: AssessmentStatus.DRAFT });
    
    if (status) {
      query.andWhere('assessment.overall_status = :status', { status });
    }

    query.orderBy('assessment.updatedAt', 'DESC');

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        total_page: Math.ceil(total / limit),
      },
    };
  }
}
