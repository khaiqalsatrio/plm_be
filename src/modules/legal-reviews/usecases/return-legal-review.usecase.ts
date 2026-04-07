import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { AssessmentStatus, ReviewStatus, AuditActionType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { ReturnLegalReviewDto } from '../dto/legal-review.dto';

@Injectable()
export class ReturnLegalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, dto: ReturnLegalReviewDto, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ where: { id } });

    if (!assessment) {
      throw new Error('Assessment tidak ditemukan');
    }

    if (assessment.legal_status === ReviewStatus.FINALIZED) {
      throw new Error('Review hukum sudah selesai dilakukan dan tidak dapat dikembalikan');
    }

    // Update statuses
    const oldStatus = assessment.legal_status;
    assessment.legal_status = ReviewStatus.RETURNED;
    assessment.overall_status = AssessmentStatus.NEED_REVISION;

    // Audit Log
    const auditLog = new AssessmentAuditLog();
    auditLog.assessment_id = assessment.id;
    auditLog.actor_id = logged.id;
    auditLog.action_type = AuditActionType.RETURN;
    auditLog.from_value = oldStatus;
    auditLog.to_value = ReviewStatus.RETURNED;
    auditLog.note = `Legal review returned for revision. Reason: ${dto.reason}`;

    await this.assessmentRepo.save(assessment);
    await this.auditRepo.save(auditLog);

    return assessment;
  }
}
