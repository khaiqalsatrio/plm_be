import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from 'src/entities/assessment-template.entity';

@Injectable()
export class GetTemplateDetailUseCase {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
  ) {}

  async execute(id: string) {
    const template = await this.templateRepo.findOne({
      where: { id },
      relations: [
        'sections',
        'sections.criteria',
        'sections.criteria.questions',
      ],
      order: {
        sections: {
          sort_order: 'ASC',
          criteria: {
            sort_order: 'ASC',
            questions: {
              sort_order: 'ASC',
            },
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template tidak ditemukan');
    }

    return template;
  }
}
