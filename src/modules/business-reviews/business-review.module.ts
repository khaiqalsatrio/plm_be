// src/modules/business-reviews/business-review.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity'; 
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';
import { GetAttachmentUrlUseCase } from 'src/modules/business-reviews/usecases/get-attachment-url.usecase';
import { GetBusinessQueueUseCase } from 'src/modules/business-reviews/usecases/get-business-queue.usecase';
import { ReturnBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/return-business-review.usecase';
import { SaveBusinessReviewDraftUseCase } from 'src/modules/business-reviews/usecases/save-business-review.usecase';
import { StartBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/start-business-review.usecase';
import { SubmitBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/submit-business-review.usecase';
import { UploadBusinessAttachmentUseCase } from 'src/modules/business-reviews/usecases/upload-business-attachment.usecase';

import { BusinessReviewController } from './business-review.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentReview,
      AssessmentResponse,
      AssessmentAttachment,
      ProductAssessment,
      AssessmentAuditLog,
    ]),
    AuthModule,
  ],
  providers: [
    MinioClient,
    GetBusinessQueueUseCase,
    StartBusinessReviewUseCase,
    SaveBusinessReviewDraftUseCase,
    SubmitBusinessReviewUseCase,
    ReturnBusinessReviewUseCase,
    UploadBusinessAttachmentUseCase,
    GetAttachmentUrlUseCase,
  ],
  controllers: [BusinessReviewController],
})
export class BusinessReviewModule {}