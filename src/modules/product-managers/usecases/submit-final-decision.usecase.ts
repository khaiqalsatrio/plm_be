import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentApproval } from 'src/entities/assessment-approval.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ApprovalDecision, AssessmentStatus, ReviewStatus, AuditActionType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { SubmitFinalDecisionDto } from '../dto/product-manager.dto';

@Injectable()
export class SubmitFinalDecisionUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: SubmitFinalDecisionDto, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ where: { id } });
    if (!assessment) {
      throw new NotFoundException('Assessment tidak ditemukan');
    }

    // STRICT VALIDATION: PM cannot APPROVE if reviews are incomplete
    if (
      (dto.decision === ApprovalDecision.APPROVE || dto.decision === ApprovalDecision.APPROVE_WITH_CONDITION) &&
      (assessment.technical_status !== ReviewStatus.REVIEWED ||
       assessment.business_status !== ReviewStatus.REVIEWED ||
       assessment.legal_status !== ReviewStatus.REVIEWED)
    ) {
      throw new BadRequestException('Keputusan Final (Approve) tidak dapat diambil karena review teknis, bisnis, atau legal belum lengkap.');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Save Approval Record
      const approval = new AssessmentApproval();
      approval.assessment_id = id;
      approval.approver_id = logged.id;
      approval.decision = dto.decision;
      approval.decision_note = dto.decision_note;
      approval.follow_up_action = dto.follow_up_action;
      approval.due_date = dto.due_date;
      approval.approved_at = new Date();
      await queryRunner.manager.save(approval);

      // 2. Update ProductAssessment status
      if (dto.decision === ApprovalDecision.APPROVE || dto.decision === ApprovalDecision.APPROVE_WITH_CONDITION) {
        assessment.overall_status = AssessmentStatus.APPROVED;
        assessment.approved_by = logged.id;
        assessment.approved_at = new Date();
      } else if (dto.decision === ApprovalDecision.REJECT) {
        assessment.overall_status = AssessmentStatus.REJECTED;
      } else if (dto.decision === ApprovalDecision.NEED_REVISION) {
        assessment.overall_status = AssessmentStatus.NEED_REVISION;
      }
      
      assessment.decision_note = dto.decision_note;
      await queryRunner.manager.save(assessment);

      // 3. Audit Log
      const log = new AssessmentAuditLog();
      log.assessment_id = id;
      log.action_type = dto.decision === ApprovalDecision.REJECT ? AuditActionType.REJECT : AuditActionType.APPROVE;
      log.actor_id = logged.id;
      log.note = `PM Decision: ${dto.decision}. Note: ${dto.decision_note || '-'}`;
      await queryRunner.manager.save(log);

      await queryRunner.commitTransaction();
      return { success: true, message: `Keputusan ${dto.decision} berhasil disimpan`, status: assessment.overall_status };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
