import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentTemplate } from '../../../entities/assessment-template.entity';
import { LoggedDto } from '../../../common/dtos/logged.dto';
import { updateAuditFields } from '../../../common/utils/audit.util';

@Injectable()
export class PublishTemplateUseCase {
  constructor(
    @InjectRepository(AssessmentTemplate)
    private readonly templateRepo: Repository<AssessmentTemplate>,
  ) {}

  async execute(id: string, logged: LoggedDto) {
    const template = await this.templateRepo.findOne({ where: { id } });
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    template.published_at = new Date();
    updateAuditFields(template, logged);
    
    return await this.templateRepo.save(template);
  }
}
