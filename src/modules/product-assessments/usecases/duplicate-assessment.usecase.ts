import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentStatus, AuditActionType } from 'src/common/constant/enum';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import { createAuditFields } from 'src/common/utils/audit.util';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { Product } from 'src/entities/product.entity';

import { DuplicateProductAssessmentDto } from '../dto/product-assessment.dto';


@Injectable()
export class DuplicateAssessmentUseCase {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(dto: DuplicateProductAssessmentDto, logged: LoggedDto): Promise<ProductAssessment> {
    // 1. Fetch Original
    const original = await this.assessmentRepo.findOne({
      where: { id: dto.original_id },
      relations: ['product'],
    });

    if (!original) throw new Error('Original assessment tidak ditemukan');
    if (original.product.owner_id !== logged.id) throw new Error('Anda tidak memiliki akses ke data original');

    // 2. Clone Product
    const newProduct = new Product();
    Object.assign(newProduct, original.product);
    delete (newProduct as any).id;
    delete (newProduct as any).created_at;
    delete (newProduct as any).updated_at;
    
    if (dto.new_product_name) {
      newProduct.product_name = dto.new_product_name;
    } else {
      newProduct.product_name = `${original.product.product_name} (Copy)`;
    }
    
    // Ensure it's a new product code if needed, but here we might just keep it or leave it to PO to change
    if (newProduct.product_code) {
        newProduct.product_code = `${newProduct.product_code}-DUP`;
    }

    createAuditFields(newProduct, logged);
    const savedProduct = await this.productRepo.save(newProduct);

    // 3. Clone Assessment
    const newAssessment = new ProductAssessment();
    Object.assign(newAssessment, original);
    delete (newAssessment as any).id;
    delete (newAssessment as any).assessment_no; // Will generate new one
    delete (newAssessment as any).created_at;
    delete (newAssessment as any).updated_at;
    delete (newAssessment as any).submitted_at;
    delete (newAssessment as any).submitted_by;
    
    newAssessment.product_id = savedProduct.id;
    newAssessment.assessment_no = await this.generateAssessmentNo();
    newAssessment.overall_status = AssessmentStatus.DRAFT;
    
    // Reset scores as it's a new draft
    newAssessment.technical_score = 0;
    newAssessment.business_score = 0;
    newAssessment.legal_score = 0;
    newAssessment.total_score = 0;
    newAssessment.technical_risk_level = null;
    newAssessment.business_risk_level = null;
    newAssessment.legal_risk_level = null;
    newAssessment.overall_risk_level = null;

    createAuditFields(newAssessment, logged);
    const savedAssessment = await this.assessmentRepo.save(newAssessment);

    // 4. Audit Log
    const log = new AssessmentAuditLog();
    log.assessment_id = savedAssessment.id;
    log.action_type = AuditActionType.CREATE;
    log.to_value = AssessmentStatus.DRAFT;
    log.actor_id = logged.id;
    log.note = `Assessment duplicated from ${original.assessment_no} by ${logged.name}`;
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
