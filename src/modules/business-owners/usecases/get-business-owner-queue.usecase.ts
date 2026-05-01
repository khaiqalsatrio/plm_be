import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus } from 'src/common/constant/enum';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GetBusinessOwnerQueueUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(page: number, limit: number, logged: User) {
    const query = this.assessmentRepo.createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.business_unit', 'business_unit')
      .where('product.business_unit_id = :buId', { buId: logged.business_unit_id })
      .andWhere('assessment.overall_status != :draft', { draft: AssessmentStatus.DRAFT });
    
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
