import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentTemplate } from '../../entities/assessment-template.entity';
import { AssessmentSection } from '../../entities/assessment-section.entity';
import { AssessmentCriteria } from '../../entities/assessment-criteria.entity';
import { AssessmentQuestion } from '../../entities/assessment-question.entity';
import { ProductAssessment } from '../../entities/product-assessment.entity';
import { AssessmentTemplateController } from './assessment-template.controller';
import { CreateTemplateUseCase } from './usecases/create-template.usecase';
import { GetTemplateListUseCase } from './usecases/get-template-list.usecase';
import { GetTemplateDetailUseCase } from './usecases/get-template-detail.usecase';
import { UpdateTemplateUseCase } from './usecases/update-template.usecase';
import { PublishTemplateUseCase } from './usecases/publish-template.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentTemplate,
      AssessmentSection,
      AssessmentCriteria,
      AssessmentQuestion,
      ProductAssessment,
    ]),
  ],
  controllers: [AssessmentTemplateController],
  providers: [
    CreateTemplateUseCase,
    GetTemplateListUseCase,
    GetTemplateDetailUseCase,
    UpdateTemplateUseCase,
    PublishTemplateUseCase,
  ],
})
export class AssessmentTemplateModule {}
