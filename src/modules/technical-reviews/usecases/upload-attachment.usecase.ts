import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';

@Injectable()
export class UploadTechnicalAttachmentUseCase {
  private readonly logger = new Logger(UploadTechnicalAttachmentUseCase.name);

  constructor(
    @InjectRepository(AssessmentAttachment)
    private readonly attachmentRepo: Repository<AssessmentAttachment>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    private readonly minioClient: MinioClient,
  ) {}

  async execute(
    assessmentId: string,
    file: { buffer: Buffer; originalname: string; mimetype: string },
    logged: AuthenticatedUser,
    is_private: boolean = false,
    section_id?: string,
    criteria_id?: string,
  ) {
    try {
      // 1. Validasi Assessment
      const assessment = await this.assessmentRepo.findOne({ where: { id: assessmentId } });
      if (!assessment) {
        throw new Error('Assessment tidak ditemukan');
      }

      // 2. Upload ke MinIO
      const timestamp = new Date().getTime();
      const objectName = `${timestamp}-${file.originalname}`;
      
      // Pilih metode upload berdasarkan is_private
      const uploadResult = is_private 
        ? await this.minioClient.uploadLegal(objectName, file.buffer as any, {
            'Content-Type': file.mimetype,
            'Uploaded-By': logged.id,
          })
        : await this.minioClient.upload(objectName, file.buffer as any, {
            'Content-Type': file.mimetype,
            'Uploaded-By': logged.id,
          });

      if (!uploadResult) {
        throw new Error('Gagal mengunggah file ke MinIO');
      }

      // 3. Simpan Metadata ke DB
      const attachment = new AssessmentAttachment();
      attachment.assessment_id = assessmentId;
      attachment.section_id = section_id;
      attachment.criteria_id = criteria_id;
      attachment.file_name = file.originalname;
      attachment.file_url = uploadResult.url;
      attachment.bucket = uploadResult.bucket;
      attachment.is_private = is_private;
      attachment.file_type = file.mimetype;
      attachment.document_type = DocumentType.OTHER;
      attachment.uploaded_by = logged.id;

      return await this.attachmentRepo.save(attachment);
    } catch (error) {
      this.logger.error(`Error uploading attachment for assessment ${assessmentId}: ${error.message}`);
      throw error;
    }
  }
}
