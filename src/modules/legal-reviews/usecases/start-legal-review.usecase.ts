import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from '../../../entities/product-assessment.entity';
import { AssessmentAuditLog } from '../../../entities/assessment-audit-log.entity';
import { AssessmentStatus, ReviewStatus, AuditActionType } from '../../../common/constant/enum';
import { AuthenticatedUser } from '../../../common/types/auth-context.type';

@Injectable()
export class StartLegalReviewUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ where: { id } });

    if (!assessment) {
      throw new Error('Assessment tidak ditemukan');
    }

    if (![AssessmentStatus.SUBMITTED, AssessmentStatus.IN_REVIEW].includes(assessment.overall_status)) {
      throw new Error('Assessment belum di-submit atau sedang tidak dalam tahap review');
    }

    if (assessment.legal_status === ReviewStatus.FINALIZED) {
      throw new Error('Review hukum sudah selesai dilakukan');
    }

    const oldStatus = assessment.legal_status;
    assessment.legal_status = ReviewStatus.IN_PROGRESS;
    
    if (assessment.overall_status === AssessmentStatus.SUBMITTED) {
      assessment.overall_status = AssessmentStatus.IN_REVIEW;
    }

    // Audit Log
    const auditLog = new AssessmentAuditLog();
    auditLog.assessment_id = assessment.id;
    auditLog.actor_id = logged.id;
    auditLog.action_type = AuditActionType.START_REVIEW;
    auditLog.from_value = oldStatus;
    auditLog.to_value = ReviewStatus.IN_PROGRESS;
    auditLog.note = `Legal review started by ${logged.name}`;

    await this.assessmentRepo.save(assessment);
    await this.auditRepo.save(auditLog);

    return assessment;
  }
}
