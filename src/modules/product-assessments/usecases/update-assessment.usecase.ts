import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, AuditActionType } from 'src/common/constant/enum';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { updateAuditFields, createAuditFields } from 'src/common/utils/audit.util';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { Product } from 'src/entities/product.entity';

import { UpdateProductAssessmentDto } from '../dto/product-assessment.dto';


@Injectable()
export class UpdateAssessmentUseCase {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, dto: UpdateProductAssessmentDto, logged: LoggedDto) {
    const assessment = await this.assessmentRepo.findOne({
      where: { id },
      relations: ['product'],
    });

    if (!assessment) throw new Error('Assessment tidak ditemukan');
    if (assessment.product.owner_id !== logged.id) throw new Error('Anda tidak memiliki akses');
    
    if (assessment.overall_status !== AssessmentStatus.DRAFT && assessment.overall_status !== AssessmentStatus.NEED_REVISION) {
      throw new Error('Assessment tidak dapat diedit pada status saat ini');
    }

    // Update Product data
    const product = assessment.product;
    if (dto.product_name) product.product_name = dto.product_name;
    if (dto.product_category_id) product.product_category_id = dto.product_category_id;
    if (dto.business_unit_id) product.business_unit_id = dto.business_unit_id;
    if (dto.product_type) product.product_type = dto.product_type;
    if (dto.stage) product.stage = dto.stage;
    if (dto.priority) product.priority = dto.priority;
    if (dto.description) product.description = dto.description;
    if (dto.objective) product.objective = dto.objective;
    if (dto.target_market) product.target_market = dto.target_market;
    if (dto.value_proposition) product.value_proposition = dto.value_proposition;

    updateAuditFields(product, logged);
    await this.productRepo.save(product);

    // Update Assessment data
    if (dto.template_id) assessment.template_id = dto.template_id;
    if (dto.assessment_type) assessment.assessment_type = dto.assessment_type;
    
    updateAuditFields(assessment, logged);
    const savedAssessment = await this.assessmentRepo.save(assessment);

    // 3. Create Audit Log
    const log = new AssessmentAuditLog();
    log.assessment_id = id;
    log.action_type = AuditActionType.UPDATE;
    log.actor_id = logged.id;
    log.note = `Assessment updated by ${logged.name}`;
    createAuditFields(log, logged);
    await this.auditRepo.save(log);

    return savedAssessment;
  }
}
