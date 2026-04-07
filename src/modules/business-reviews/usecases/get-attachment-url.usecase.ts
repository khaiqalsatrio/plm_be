import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import MinioClient from 'src/libraries/minio';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';

@Injectable()
export class GetAttachmentUrlUseCase {
  private readonly logger = new Logger(GetAttachmentUrlUseCase.name);

  constructor(
    @InjectRepository(AssessmentAttachment)
    private readonly attachmentRepo: Repository<AssessmentAttachment>,
    private readonly minioClient: MinioClient,
  ) {}

  async execute(attachmentId: string, logged: AuthenticatedUser) {
    const attachment = await this.attachmentRepo.findOne({
      where: { id: attachmentId },
    });

    if (!attachment) {
      throw new Error('Lampiran tidak ditemukan');
    }

    // Jika file adalah privat, generate Presigned URL
    if (attachment.is_private) {
      // Kita perlu mengambil object name dari URL atau menyimpannya secara terpisah.
      // Berdasarkan implementasi MinioClient.upload, objectName biasanya adalah bagian terakhir dari path.
      const urlParts = attachment.file_url.split('/');
      const objectName = urlParts[urlParts.length - 1];

      try {
        // Expiry 1 jam (3600 detik)
        const presignedUrl = await this.minioClient.getPresignedUrl(
          attachment.bucket,
          objectName,
          3600
        );
        return { url: presignedUrl, is_private: true };
      } catch (error) {
        this.logger.error(`Gagal generate presigned URL: ${error.message}`);
        throw new Error('Gagal menghasilkan akses link untuk file privat');
      }
    }

    // Jika file publik, kembalikan URL yang tersimpan
    return { url: attachment.file_url, is_private: false };
  }
}
