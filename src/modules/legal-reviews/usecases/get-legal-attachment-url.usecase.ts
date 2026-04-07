import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import MinioClient from 'src/libraries/minio';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';

@Injectable()
export class GetLegalAttachmentUrlUseCase {
  constructor(
    @InjectRepository(AssessmentAttachment)
    private readonly attachmentRepo: Repository<AssessmentAttachment>,
    private readonly minioClient: MinioClient,
  ) {}

  async execute(attachmentId: string, logged: AuthenticatedUser) {
    const attachment = await this.attachmentRepo.findOne({ where: { id: attachmentId } });

    if (!attachment) {
      throw new Error('Lampiran tidak ditemukan');
    }

    // Jika private, generate presigned URL
    if (attachment.is_private) {
      const objectName = attachment.file_url.split('/').pop() || '';
      const url = await this.minioClient.getPresignedUrl(attachment.bucket, objectName, 3600); // 1 jam
      return { url };
    }

    return { url: attachment.file_url };
  }
}
