import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, AuditActionType } from 'src/common/constant/enum';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { Product } from 'src/entities/product.entity';

import { CreateProductAssessmentDto } from '../dto/product-assessment.dto';


@Injectable()
export class CreateAssessmentUseCase {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(dto: CreateProductAssessmentDto, logged: LoggedDto): Promise<ProductAssessment> {
    // 1. Create/Update Product
    let product: Product;
    if (dto.product_code) {
      product = await this.productRepo.findOne({ where: { product_code: dto.product_code } });
    }

    if (!product) {
      product = new Product();
      product.product_code = dto.product_code;
    }
    
    product.product_name = dto.product_name;
    product.product_category_id = dto.product_category_id;
    product.business_unit_id = dto.business_unit_id;
    product.product_type = dto.product_type;
    product.stage = dto.stage;
    product.priority = dto.priority;
    product.description = dto.description;
    product.objective = dto.objective;
    product.target_market = dto.target_market;
    product.value_proposition = dto.value_proposition;
    product.owner_id = logged.id;
    
    createAuditFields(product, logged);
    const savedProduct = await this.productRepo.save(product);

    // 2. Create Assessment Draft
    const assessment = new ProductAssessment();
    assessment.product_id = savedProduct.id;
    assessment.assessment_no = await this.generateAssessmentNo();
    assessment.template_id = dto.template_id;
    assessment.assessment_type = dto.assessment_type;
    assessment.overall_status = AssessmentStatus.DRAFT;
    
    createAuditFields(assessment, logged);
    const savedAssessment = await this.assessmentRepo.save(assessment);

    // 3. Create Audit Log
    const log = new AssessmentAuditLog();
    log.assessment_id = savedAssessment.id;
    log.action_type = AuditActionType.CREATE;
    log.to_value = AssessmentStatus.DRAFT;
    log.actor_id = logged.id;
    log.note = `Assessment created as draft by ${logged.name}`;
    createAuditFields(log, logged);
    await this.auditRepo.save(log);

    return savedAssessment;
  }

  private async generateAssessmentNo(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const prefix = `PA-${year}${month}${day}-`;

    const lastAssessment = await this.assessmentRepo.createQueryBuilder('pa')
      .where('pa.assessment_no LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('pa.assessment_no', 'DESC')
      .getOne();

    let nextNumber = 1;
    if (lastAssessment) {
      const parts = lastAssessment.assessment_no.split('-');
      const lastNum = parseInt(parts[parts.length - 1]);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }

    return `${prefix}${String(nextNumber).padStart(3, '0')}`;
  }
}
