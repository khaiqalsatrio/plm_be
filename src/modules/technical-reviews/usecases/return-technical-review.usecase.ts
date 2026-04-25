import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { AssessmentStatus, ReviewStatus, SectionType, ReviewRecommendation } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

import { ReturnTechnicalReviewDto } from '../dto/technical-review.dto';

@Injectable()
export class ReturnTechnicalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: ReturnTechnicalReviewDto, logged: AuthenticatedUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Update ProductAssessment
      const assessment = await queryRunner.manager.findOne(ProductAssessment, {
        where: { id },
      });

      if (!assessment) {
        throw new Error('Assessment tidak ditemukan');
      }

      assessment.technical_status = ReviewStatus.RETURNED;
      assessment.overall_status = AssessmentStatus.NEED_REVISION;
      await queryRunner.manager.save(assessment);

      // 2. Update AssessmentReview
      let review = await queryRunner.manager.findOne(AssessmentReview, {
        where: { assessment_id: id, review_type: SectionType.TECHNICAL },
      });

      if (!review) {
        review = new AssessmentReview();
        review.assessment_id = id;
        review.review_type = SectionType.TECHNICAL;
      }

      review.reviewer_id = logged.id;
      review.review_status = ReviewStatus.RETURNED;
      review.summary = dto.reason;
      review.recommendation = ReviewRecommendation.REVISION_NEEDED;
      review.reviewed_at = new Date();
      await queryRunner.manager.save(review);

      await queryRunner.commitTransaction();
      return { success: true, message: 'Technical review returned to PO for revision' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
