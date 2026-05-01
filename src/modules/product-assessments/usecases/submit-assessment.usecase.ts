import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, AuditActionType } from 'src/common/constant/enum';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { updateAuditFields, createAuditFields } from 'src/common/utils/audit.util';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

@Injectable()
export class SubmitAssessmentUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, logged: LoggedDto) {
    const assessment = await this.assessmentRepo.findOne({ 
        where: { id },
        relations: ['product']
    });

    if (!assessment) throw new Error('Assessment tidak ditemukan');
    if (assessment.product.owner_id !== logged.id) throw new Error('Anda tidak memiliki akses');
    
    // PRD Compliance Validation (Rule 15.3)
    const product = assessment.product;
    const missingFields = [];
    
    if (!product.product_name) missingFields.push('Nama Produk');
    if (!product.product_category_id) missingFields.push('Kategori Produk');
    if (!product.business_unit_id) missingFields.push('Business Unit');
    if (!product.objective) missingFields.push('Objective');
    if (!product.target_market) missingFields.push('Target Market');
    if (!product.value_proposition) missingFields.push('Value Proposition');
    if (!assessment.template_id) missingFields.push('Template Assessment');

    if (missingFields.length > 0) {
      throw new Error(`Informasi mandatori belum lengkap: ${missingFields.join(', ')}. Silakan lengkapi di Edit Assessment.`);
    }

    const fromValue = assessment.overall_status;
    assessment.overall_status = AssessmentStatus.SUBMITTED;
    assessment.submitted_at = new Date();
    assessment.submitted_by = logged.id;
    updateAuditFields(assessment, logged);
    
    await this.assessmentRepo.save(assessment);

    // Create Audit Log
    const log = new AssessmentAuditLog();
    log.assessment_id = id;
    log.action_type = AuditActionType.SUBMIT;
    log.from_value = fromValue;
    log.to_value = AssessmentStatus.SUBMITTED;
    log.actor_id = logged.id;
    log.note = `Assessment submitted by ${logged.name}`;
    createAuditFields(log, logged);
    await this.auditRepo.save(log);

    return assessment;
  }
}
