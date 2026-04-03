import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { Product } from 'src/entities/product.entity';

import { ProductAssessmentController } from './product-assessment.controller';
import { CreateAssessmentUseCase } from './usecases/create-assessment.usecase';
import { GetAssessmentsUseCase } from './usecases/get-assessments.usecase';
import { SubmitAssessmentUseCase } from './usecases/submit-assessment.usecase';
import { UpdateAssessmentUseCase } from './usecases/update-assessment.usecase';
import { DuplicateAssessmentUseCase } from './usecases/duplicate-assessment.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductAssessment,
      AssessmentAuditLog,
    ]),
  ],
  controllers: [ProductAssessmentController],
  providers: [
    CreateAssessmentUseCase,
    GetAssessmentsUseCase,
    UpdateAssessmentUseCase,
    SubmitAssessmentUseCase,
    DuplicateAssessmentUseCase,
  ],
})
export class ProductAssessmentModule {}
