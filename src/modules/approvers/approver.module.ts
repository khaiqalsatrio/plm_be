import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { ApproverController } from './approver.controller';
import { GetApproverQueueUseCase } from './usecases/get-approver-queue.usecase';
import { GetApproverAssessmentDetailUseCase } from './usecases/get-approver-assessment-detail.usecase';
import { SubmitFinalValidationUseCase } from './usecases/submit-final-validation.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAssessment,
    ]),
  ],
  controllers: [ApproverController],
  providers: [
    GetApproverQueueUseCase,
    GetApproverAssessmentDetailUseCase,
    SubmitFinalValidationUseCase,
  ],
})
export class ApproverModule {}
