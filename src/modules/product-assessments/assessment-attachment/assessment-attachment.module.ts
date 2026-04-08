import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';
import { AssessmentAttachmentController } from './assessment-attachment.controller';
import { UploadAttachmentUseCase } from 'src/modules/product-assessments/assessment-attachment/usecases/upload-attachment.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssessmentAttachment,
      ProductAssessment,
    ]),
  ],
  controllers: [AssessmentAttachmentController],
  providers: [
    UploadAttachmentUseCase,
    MinioClient,
  ],
})
export class AssessmentAttachmentModule {}
