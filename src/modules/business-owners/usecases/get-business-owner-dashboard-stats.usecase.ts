import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, RiskLevel } from 'src/common/constant/enum';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GetBusinessOwnerDashboardStatsUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(logged: User) {
    const buId = logged.business_unit_id;

    // Total Products in BU
    const totalProducts = await this.assessmentRepo.createQueryBuilder('assessment')
      .leftJoin('assessment.product', 'product')
      .where('product.business_unit_id = :buId', { buId })
      .andWhere('assessment.overall_status != :draft', { draft: AssessmentStatus.DRAFT })
      .getCount();

    // Status Counts
    const statusCounts = await this.assessmentRepo.createQueryBuilder('assessment')
      .select('assessment.overall_status', 'status')
      .addSelect('COUNT(*)', 'count')
      .leftJoin('assessment.product', 'product')
      .where('product.business_unit_id = :buId', { buId })
      .andWhere('assessment.overall_status != :draft', { draft: AssessmentStatus.DRAFT })
      .groupBy('assessment.overall_status')
      .getRawMany();

    // Risk Distribution (Simplistic calculation from final assessment risk)
    const riskDistribution = await this.assessmentRepo.createQueryBuilder('assessment')
      .select('assessment.technical_risk_level', 'risk')
      .addSelect('COUNT(*)', 'count')
      .leftJoin('assessment.product', 'product')
      .where('product.business_unit_id = :buId', { buId })
      .andWhere('assessment.overall_status != :draft', { draft: AssessmentStatus.DRAFT })
      .groupBy('assessment.technical_risk_level')
      .getRawMany();

    return {
      total_products: totalProducts,
      status_summary: statusCounts,
      risk_distribution: riskDistribution,
    };
  }
}
