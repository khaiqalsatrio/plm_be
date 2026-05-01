import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { ReviewStatus, SectionType, ReviewerType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

import { SubmitTechnicalReviewDto } from '../dto/technical-review.dto';

@Injectable()
export class SubmitTechnicalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    @InjectRepository(AssessmentResponse)
    private readonly responseRepo: Repository<AssessmentResponse>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: SubmitTechnicalReviewDto, logged: AuthenticatedUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Save all responses first (Upsert)
      // (Similar to SaveDraft logic)
      for (const resDto of dto.responses) {
        let response = await queryRunner.manager.findOne(AssessmentResponse, {
          where: {
            assessment_id: id,
            question_id: resDto.question_id,
            reviewer_type: ReviewerType.TECHNICAL,
          },
        });

        if (!response) {
          response = new AssessmentResponse();
          response.assessment_id = id;
          response.question_id = resDto.question_id;
          response.reviewer_type = ReviewerType.TECHNICAL;
        }

        response.section_id = resDto.section_id;
        response.criteria_id = resDto.criteria_id;
        response.answer_text = resDto.answer_text;
        response.answer_number = resDto.answer_number;
        response.answer_boolean = resDto.answer_boolean;
        response.answer_option = resDto.answer_option;
        response.score = resDto.score;
        response.risk_level = resDto.risk_level;
        response.note = resDto.note;

        await queryRunner.manager.save(response);
      }

      // 2. Calculate Final Score
      // In this simple implementation, we average all scores from the technical responses
      const allResponses = await queryRunner.manager.find(AssessmentResponse, {
        where: { assessment_id: id, reviewer_type: ReviewerType.TECHNICAL },
      });

      let totalScore = 0;
      let count = 0;
      allResponses.forEach((r) => {
        if (r.score !== null && r.score !== undefined) {
          totalScore += Number(r.score);
          count++;
        }
      });
      const finalScore = dto.score !== undefined ? dto.score : (count > 0 ? totalScore / count : 0);

      // 3. Update AssessmentReview
      let review = await queryRunner.manager.findOne(AssessmentReview, {
        where: { assessment_id: id, review_type: SectionType.TECHNICAL },
      });

      if (!review) {
        review = new AssessmentReview();
        review.assessment_id = id;
        review.review_type = SectionType.TECHNICAL;
      }

      review.reviewer_id = logged.id;
      review.review_status = ReviewStatus.REVIEWED;
      review.score = finalScore;
      review.risk_level = dto.risk_level;
      review.summary = dto.summary;
      review.recommendation = dto.recommendation;
      review.reviewed_at = new Date();
      await queryRunner.manager.save(review);

      // 4. Update ProductAssessment
      const assessment = await queryRunner.manager.findOne(ProductAssessment, {
        where: { id },
      });

      if (assessment) {
        assessment.technical_status = ReviewStatus.REVIEWED;
        assessment.technical_score = finalScore;
        assessment.technical_risk_level = dto.risk_level;
        // Optionally update overall score here
        await queryRunner.manager.save(assessment);
      }

      await queryRunner.commitTransaction();
      return { 
        success: true, 
        message: 'Technical review submitted', 
        final_score: finalScore 
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
