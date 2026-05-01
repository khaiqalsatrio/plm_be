import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';

import { LegalReviewController } from './legal-review.controller';
import { AuthModule } from '../auth/auth.module';
import { GetLegalAttachmentUrlUseCase } from './usecases/get-legal-attachment-url.usecase';
import { GetLegalQueueUseCase } from './usecases/get-legal-queue.usecase';
import { ReturnLegalReviewUseCase } from './usecases/return-legal-review.usecase';
import { SaveLegalReviewUseCase } from './usecases/save-legal-review.usecase';
import { StartLegalReviewUseCase } from './usecases/start-legal-review.usecase';
import { SubmitLegalReviewUseCase } from './usecases/submit-legal-review.usecase';
import { UploadLegalAttachmentUseCase } from './usecases/upload-legal-attachment.usecase';

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
    GetLegalQueueUseCase,
    StartLegalReviewUseCase,
    SaveLegalReviewUseCase,
    SubmitLegalReviewUseCase,
    ReturnLegalReviewUseCase,
    UploadLegalAttachmentUseCase,
    GetLegalAttachmentUrlUseCase,
  ],
  controllers: [LegalReviewController],
})
export class LegalReviewModule {}
