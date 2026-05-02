import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AssessmentTemplate } from '../../../entities/assessment-template.entity';
import { AssessmentSection } from '../../../entities/assessment-section.entity';
import { AssessmentCriteria } from '../../../entities/assessment-criteria.entity';
import { AssessmentQuestion } from '../../../entities/assessment-question.entity';
import { CreateTemplateDto } from '../dto/assessment-template.dto';
import { LoggedDto } from '../../../common/dtos/logged.dto';
import { createAuditFields } from '../../../common/utils/audit.util';

@Injectable()
export class CreateTemplateUseCase {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async execute(dto: CreateTemplateDto, logged: LoggedDto): Promise<AssessmentTemplate> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Create Template
      const template = new AssessmentTemplate();
      template.template_code = dto.template_code;
      template.template_name = dto.template_name;
      template.product_type = dto.product_type;
      template.description = dto.description;
      template.version = 1;
      template.is_active = true;
      createAuditFields(template, logged);
      const savedTemplate = await queryRunner.manager.save(template);

      // 2. Create Sections
      if (dto.sections && dto.sections.length > 0) {
        for (const sectionDto of dto.sections) {
          const section = new AssessmentSection();
          section.template_id = savedTemplate.id;
          section.section_code = sectionDto.section_code;
          section.section_name = sectionDto.section_name;
          section.section_type = sectionDto.section_type;
          section.weight = sectionDto.weight;
          section.sort_order = sectionDto.sort_order;
          section.is_required = sectionDto.is_required;
          createAuditFields(section, logged);
          const savedSection = await queryRunner.manager.save(section);

          // 3. Create Criteria
          if (sectionDto.criteria && sectionDto.criteria.length > 0) {
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

              // 4. Create Questions
              if (criteriaDto.questions && criteriaDto.questions.length > 0) {
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
      }

      await queryRunner.commitTransaction();
      return savedTemplate;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
