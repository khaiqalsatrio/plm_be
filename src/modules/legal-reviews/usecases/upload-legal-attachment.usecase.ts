import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import MinioClient from 'src/libraries/minio';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { DocumentType } from 'src/common/constant/enum';

@Injectable()
export class UploadLegalAttachmentUseCase {
  private readonly logger = new Logger(UploadLegalAttachmentUseCase.name);

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
    is_private: boolean = true,
    section_id?: string,
    criteria_id?: string,
  ) {
    try {
      // 1. Validasi Assessment
      const assessment = await this.assessmentRepo.findOne({ where: { id: assessmentId } });
      if (!assessment) {
        throw new Error('Assessment tidak ditemukan');
      }

      // 2. Upload ke MinIO (Gunakan uploadLegal untuk bucket legal-tetangga)
      const timestamp = new Date().getTime();
      const objectName = `legal-${timestamp}-${file.originalname}`;
      
      const uploadResult = await this.minioClient.uploadLegal(objectName, file.buffer as any, {
        'Content-Type': file.mimetype,
        'Uploaded-By': logged.id,
        'Domain': 'legal',
      });

      if (!uploadResult) {
        throw new Error('Gagal mengunggah file hukum ke MinIO');
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
      attachment.document_type = DocumentType.LEGAL_OPINION;
      attachment.uploaded_by = logged.id;

      return await this.attachmentRepo.save(attachment);
    } catch (error) {
      this.logger.error(`Error uploading legal attachment for assessment ${assessmentId}: ${error.message}`);
      throw error;
    }
  }
}
