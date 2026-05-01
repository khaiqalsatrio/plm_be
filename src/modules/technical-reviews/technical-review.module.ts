import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';

import { TechnicalReviewController } from './technical-review.controller';
import { AuthModule } from '../auth/auth.module';
import { GetAttachmentUrlUseCase } from './usecases/get-attachment-url.usecase';
import { GetTechnicalQueueUseCase } from './usecases/get-technical-queue.usecase';
import { ReturnTechnicalReviewUseCase } from './usecases/return-technical-review.usecase';
import { SaveTechnicalReviewDraftUseCase } from './usecases/save-technical-review.usecase';
import { StartTechnicalReviewUseCase } from './usecases/start-technical-review.usecase';
import { SubmitTechnicalReviewUseCase } from './usecases/submit-technical-review.usecase';
import { UploadTechnicalAttachmentUseCase } from './usecases/upload-attachment.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentReview,
      AssessmentResponse,
      AssessmentAttachment,
      ProductAssessment,
    ]),
    AuthModule,
  ],
  providers: [
    MinioClient,
    GetTechnicalQueueUseCase,
    StartTechnicalReviewUseCase,
    SaveTechnicalReviewDraftUseCase,
    SubmitTechnicalReviewUseCase,
    ReturnTechnicalReviewUseCase,
    UploadTechnicalAttachmentUseCase,
    GetAttachmentUrlUseCase,
  ],
  controllers: [TechnicalReviewController],
})
export class TechnicalReviewModule {}
