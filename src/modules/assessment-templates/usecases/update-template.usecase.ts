import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AssessmentTemplate } from '../../../entities/assessment-template.entity';
import { AssessmentSection } from '../../../entities/assessment-section.entity';
import { AssessmentCriteria } from '../../../entities/assessment-criteria.entity';
import { AssessmentQuestion } from '../../../entities/assessment-question.entity';
import { ProductAssessment } from '../../../entities/product-assessment.entity';
import { UpdateTemplateDto } from '../dto/assessment-template.dto';
import { LoggedDto } from '../../../common/dtos/logged.dto';
import { createAuditFields, updateAuditFields } from '../../../common/utils/audit.util';

@Injectable()
export class UpdateTemplateUseCase {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
  ) {}

  async execute(id: string, dto: UpdateTemplateDto, logged: LoggedDto): Promise<AssessmentTemplate> {
    const existingTemplate = await this.templateRepo.findOne({ 
      where: { id }
    });

    if (!existingTemplate) {
      throw new NotFoundException('Template not found');
    }

    // Check if template is published or used
    const isUsed = await this.assessmentRepo.count({ where: { template_id: id } }) > 0;
    const isPublished = !!existingTemplate.published_at;

    if (isUsed || isPublished) {
      // VERSIONING LOGIC: Clone template
      return await this.cloneTemplate(existingTemplate, dto, logged);
    } else {
      // NORMAL UPDATE: Overwrite
      return await this.updateExistingTemplate(existingTemplate, dto, logged);
    }
  }

  private async cloneTemplate(oldTemplate: AssessmentTemplate, dto: UpdateTemplateDto, logged: LoggedDto): Promise<AssessmentTemplate> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Archive old template
      oldTemplate.is_active = false;
      updateAuditFields(oldTemplate, logged);
      await queryRunner.manager.save(oldTemplate);

      // 2. Create new version
      const newTemplate = new AssessmentTemplate();
      newTemplate.template_code = dto.template_code;
      newTemplate.template_name = dto.template_name;
      newTemplate.product_type = dto.product_type;
      newTemplate.description = dto.description;
      newTemplate.version = oldTemplate.version + 1;
      newTemplate.is_active = true;
      createAuditFields(newTemplate, logged);
      const savedTemplate = await queryRunner.manager.save(newTemplate);

      // 3. Create Sections, Criteria, Questions from DTO
      await this.saveTemplateStructure(queryRunner, savedTemplate.id, dto, logged);

      await queryRunner.commitTransaction();
      return savedTemplate;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async updateExistingTemplate(template: AssessmentTemplate, dto: UpdateTemplateDto, logged: LoggedDto): Promise<AssessmentTemplate> {
     const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Update Template Root
      template.template_code = dto.template_code;
      template.template_name = dto.template_name;
      template.product_type = dto.product_type;
      template.description = dto.description;
      updateAuditFields(template, logged);
      await queryRunner.manager.save(template);

      // 2. Delete old structure (Safe because not used/published)
      await queryRunner.manager.delete(AssessmentSection, { template_id: template.id });

      // 3. Save new structure
      await this.saveTemplateStructure(queryRunner, template.id, dto, logged);

      await queryRunner.commitTransaction();
      return template;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  private async saveTemplateStructure(queryRunner: any, templateId: string, dto: UpdateTemplateDto, logged: LoggedDto) {
      if (!dto.sections) return;
      
      for (const sectionDto of dto.sections) {
        const section = new AssessmentSection();
        section.template_id = templateId;
        section.section_code = sectionDto.section_code;
        section.section_name = sectionDto.section_name;
        section.section_type = sectionDto.section_type;
        section.weight = sectionDto.weight;
        section.sort_order = sectionDto.sort_order;
        section.is_required = sectionDto.is_required;
        createAuditFields(section, logged);
        const savedSection = await queryRunner.manager.save(section);

        if (!sectionDto.criteria) continue;

        for (const criteriaDto of sectionDto.criteria) {
          const criteria = new AssessmentCriteria();
          criteria.section_id = savedSection.id;
          criteria.criteria_code = criteriaDto.criteria_code;
          criteria.criteria_name = criteriaDto.criteria_name;
          criteria.description = criteriaDto.description;
          criteria.weight = criteriaDto.weight;
          criteria.score_type = criteriaDto.score_type;
          criteria.is_required = criteriaDto.is_required;
          criteria.has_comment = criteriaDto.has_comment;
          criteria.has_attachment = criteriaDto.has_attachment;
          criteria.sort_order = criteriaDto.sort_order;
          createAuditFields(criteria, logged);
          const savedCriteria = await queryRunner.manager.save(criteria);

          if (!criteriaDto.questions) continue;

          for (const questionDto of criteriaDto.questions) {
            const question = new AssessmentQuestion();
            question.criteria_id = savedCriteria.id;
            question.question_code = questionDto.question_code;
            question.question_text = questionDto.question_text;
            question.question_type = questionDto.question_type;
            question.answer_type = questionDto.answer_type;
            question.weight = questionDto.weight;
            question.is_required = questionDto.is_required;
            question.help_text = questionDto.help_text;
            question.placeholder = questionDto.placeholder;
            question.option_source = questionDto.option_source;
            question.sort_order = questionDto.sort_order;
            createAuditFields(question, logged);
            await queryRunner.manager.save(question);
          }
        }
      }
  }
}
