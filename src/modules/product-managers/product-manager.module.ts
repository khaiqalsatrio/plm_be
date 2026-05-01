import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentApproval } from 'src/entities/assessment-approval.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

import { ProductManagerController } from './product-manager.controller';
import { GetAssessmentApprovalDetailUseCase } from './usecases/get-assessment-approval-detail.usecase';
import { GetProductManagerQueueUseCase } from './usecases/get-product-manager-queue.usecase';
import { SubmitFinalDecisionUseCase } from './usecases/submit-final-decision.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAssessment,
      AssessmentApproval,
      AssessmentAuditLog,
    ]),
  ],
  controllers: [ProductManagerController],
  providers: [
    GetProductManagerQueueUseCase,
    GetAssessmentApprovalDetailUseCase,
    SubmitFinalDecisionUseCase,
  ],
})
export class ProductManagerModule {}
