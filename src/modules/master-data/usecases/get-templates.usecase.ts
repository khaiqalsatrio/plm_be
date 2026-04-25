import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AssessmentTemplate } from 'src/entities/assessment-template.entity';

@Injectable()
export class GetTemplatesUseCase {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
  ) {}

  async execute() {
    return this.templateRepo.find({
      where: { is_active: true },
      select: {
        id: true,
        template_code: true,
        template_name: true,
        product_type: true,
        version: true,
        description: true,
      },
      order: {
        template_name: 'ASC',
      },
    });
  }
}
