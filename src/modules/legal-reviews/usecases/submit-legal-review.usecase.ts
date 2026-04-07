import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ReviewStatus, AuditActionType, ReviewRecommendation } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { SubmitLegalReviewDto } from '../dto/legal-review.dto';

@Injectable()
export class SubmitLegalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentResponse)
    private readonly responseRepo: Repository<AssessmentResponse>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, dto: SubmitLegalReviewDto, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ where: { id } });

    if (!assessment) {
      throw new Error('Assessment tidak ditemukan');
    }

    // 1. Calculate Score
    const responses = await this.responseRepo.find({
      where: { assessment_id: id, reviewer_type: 'legal' as any },
    });

    let totalScore = 0;
    if (responses.length > 0) {
      const sum = responses.reduce((acc, curr) => acc + (curr.score || 0), 0);
      totalScore = sum / responses.length;
    }

    // 2. Create/Update AssessmentReview
    let review = await this.reviewRepo.findOne({
      where: { assessment_id: id, review_type: 'legal' as any },
    });

    if (!review) {
      review = new AssessmentReview();
      review.assessment_id = id;
      review.review_type = 'legal' as any;
    }

    review.reviewer_id = logged.id;
    review.review_status = ReviewStatus.FINALIZED;
    review.score = totalScore;
    review.risk_level = dto.risk_level;
    review.summary = dto.summary;
    review.recommendation = dto.recommendation as unknown as ReviewRecommendation;
    review.reviewed_at = new Date();

    await this.reviewRepo.save(review);

    // 3. Update ProductAssessment
    const oldStatus = assessment.legal_status;
    assessment.legal_status = ReviewStatus.FINALIZED;
    assessment.legal_score = totalScore;
    assessment.legal_risk_level = dto.risk_level;

    // 4. Audit Log
    const auditLog = new AssessmentAuditLog();
    auditLog.assessment_id = id;
    auditLog.actor_id = logged.id;
    auditLog.action_type = AuditActionType.REVIEW;
    auditLog.from_value = oldStatus;
    auditLog.to_value = ReviewStatus.FINALIZED;
    auditLog.note = `Legal review submitted by ${logged.name} with score ${totalScore.toFixed(2)}`;

    await this.assessmentRepo.save(assessment);
    await this.auditRepo.save(auditLog);

    return assessment;
  }
}
