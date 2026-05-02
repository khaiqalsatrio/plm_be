import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from '../../../entities/assessment-template.entity';

@Injectable()
export class GetTemplateListUseCase {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
  ) {}

  async execute() {
    return await this.templateRepo.find({
      order: { created_at: 'DESC' }
    });
  }
}
