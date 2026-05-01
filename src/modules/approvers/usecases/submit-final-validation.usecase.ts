import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { AssessmentStatus, DocumentType, AuditActionType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

import { SubmitFinalValidationDto } from '../dto/approver.dto';

@Injectable()
export class SubmitFinalValidationUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: SubmitFinalValidationDto, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ 
      where: { id },
      relations: ['attachments'],
    });
    
    if (!assessment) {
      throw new NotFoundException('Assessment tidak ditemukan');
    }

    // STRICT VALIDATION: Check for Signed Document
    if (dto.decision === AssessmentStatus.APPROVED) {
      const hasSignedDoc = assessment.attachments?.some(
        (a) => a.document_type === DocumentType.SIGNED_DOCUMENT
      );

      if (!hasSignedDoc) {
        throw new BadRequestException(
          'Validasi Sistem (Approve) gagal: Dokumen lampiran yang ditandatangani oleh Business Owner belum diunggah.'
        );
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Update ProductAssessment status
      assessment.overall_status = dto.decision;
      assessment.approved_by = logged.id;
      assessment.approved_at = new Date();
      await queryRunner.manager.save(assessment);

      // 2. Audit Log
      const log = new AssessmentAuditLog();
      log.assessment_id = id;
      log.action_type = dto.decision === AssessmentStatus.APPROVED ? AuditActionType.APPROVE : AuditActionType.REJECT;
      log.actor_id = logged.id;
      log.note = `Final Validation by Approver: ${dto.decision}. Note: ${dto.note || '-'}`;
      await queryRunner.manager.save(log);

      await queryRunner.commitTransaction();
      return { 
        success: true, 
        message: `Assessment ${dto.decision === AssessmentStatus.APPROVED ? 'Disetujui' : 'Ditolak'} secara sistem`, 
        status: assessment.overall_status 
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
