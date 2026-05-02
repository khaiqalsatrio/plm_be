import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from '../../../entities/assessment-template.entity';

@Injectable()
export class GetTemplateDetailUseCase {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
  ) {}

  async execute(id: string) {
    const template = await this.templateRepo.createQueryBuilder('template')
      .leftJoinAndSelect('template.sections', 'section')
      .leftJoinAndSelect('section.criteria', 'criteria')
      .leftJoinAndSelect('criteria.questions', 'question')
      .where('template.id = :id', { id })
      .orderBy('section.sort_order', 'ASC')
      .addOrderBy('criteria.sort_order', 'ASC')
      .addOrderBy('question.sort_order', 'ASC')
      .getOne();

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }
}
