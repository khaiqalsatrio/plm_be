import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentStatus, ReviewStatus } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';

@Injectable()
export class GetTechnicalQueueUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async paginate(page: number = 1, limit: number = 10, logged: AuthenticatedUser, status?: string) {
    const skip = (page - 1) * limit;
    
    const query = this.assessmentRepo.createQueryBuilder('assessment')
      .leftJoinAndSelect('assessment.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.business_unit', 'business_unit')
      .leftJoinAndSelect('assessment.template', 'template')
      .where('assessment.overall_status IN (:...statuses)', { 
        statuses: [AssessmentStatus.SUBMITTED, AssessmentStatus.IN_REVIEW] 
      });

    if (status) {
      query.andWhere('assessment.technical_status = :status', { status });
    }

    // Default sorting: Newest submitted first, then by priority
    query.orderBy('assessment.submitted_at', 'DESC')
      .addOrderBy('product.priority', 'DESC');

    const [data, total] = await query.skip(skip).take(limit).getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        last_page: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, logged: AuthenticatedUser) {
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
      throw new Error('Assessment tidak ditemukan');
    }

    // Add logic to check if this user is allowed to review (optional for now)
    
    return assessment;
  }
}
