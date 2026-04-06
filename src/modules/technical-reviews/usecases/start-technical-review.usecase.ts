import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { AssessmentStatus, ReviewStatus, SectionType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';

@Injectable()
export class StartTechnicalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, logged: AuthenticatedUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const assessment = await queryRunner.manager.findOne(ProductAssessment, {
        where: { id },
      });

      if (!assessment) {
        throw new Error('Assessment tidak ditemukan');
      }

      // Validasi status
      if (assessment.overall_status !== AssessmentStatus.SUBMITTED && 
          assessment.overall_status !== AssessmentStatus.IN_REVIEW) {
        throw new Error('Assessment belum di-submit atau tidak dalam status review');
      }

      if (assessment.technical_status === ReviewStatus.REVIEWED || 
          assessment.technical_status === ReviewStatus.FINALIZED) {
        throw new Error('Review teknis sudah selesai dilakukan');
      }

      // Update Assessment Status
      assessment.technical_status = ReviewStatus.IN_PROGRESS;
      if (assessment.overall_status === AssessmentStatus.SUBMITTED) {
        assessment.overall_status = AssessmentStatus.IN_REVIEW;
      }
      await queryRunner.manager.save(assessment);

      // Create or update AssessmentReview
      let review = await queryRunner.manager.findOne(AssessmentReview, {
        where: { 
          assessment_id: id, 
          review_type: SectionType.TECHNICAL 
        },
      });

      if (!review) {
        review = new AssessmentReview();
        review.assessment_id = id;
        review.review_type = SectionType.TECHNICAL;
      }

      review.reviewer_id = logged.id;
      review.review_status = ReviewStatus.IN_PROGRESS;
      await queryRunner.manager.save(review);

      await queryRunner.commitTransaction();
      return {
        assessment_id: id,
        technical_status: assessment.technical_status,
        overall_status: assessment.overall_status,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
