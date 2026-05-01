import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ADMIN } from 'src/common/constant/constant';
import { LoggedDto } from 'src/common/dtos/logged.dto';
import MessageHandler from 'src/common/message';
import { AssessmentApproval } from 'src/entities/assessment-approval.entity';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';
import { AssessmentComment } from 'src/entities/assessment-comment.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    @InjectRepository(AssessmentAttachment)
    private readonly attachmentRepo: Repository<AssessmentAttachment>,
    @InjectRepository(AssessmentApproval)
    private readonly approvalRepo: Repository<AssessmentApproval>,
    @InjectRepository(AssessmentComment)
    private readonly commentRepo: Repository<AssessmentComment>,
    @InjectRepository(AssessmentAuditLog)
    private readonly auditLogRepo: Repository<AssessmentAuditLog>,
  ) {}

  async execute(id: string, logged: LoggedDto): Promise<void> {
    const existing = await this.repository.findOneBy({ id });
    if (!existing) {
      throw new Error(MessageHandler.ERR005);
    }

    if (logged?.role !== ADMIN && existing.created_id && existing.created_id !== logged?.id) {
      throw new Error(MessageHandler.ERR007);
    }

    try {
      this.logger.log(`Starting hard delete for user ${id}...`);

      // 1. Set Null pada referensi User di tabel-tabel Produk & Asesmen
      await this.productRepo.update({ owner_id: id }, { owner_id: null });
      await this.productRepo.update({ product_manager_id: id }, { product_manager_id: null });
      
      await this.assessmentRepo.update({ submitted_by: id }, { submitted_by: null });
      await this.assessmentRepo.update({ approved_by: id }, { approved_by: null });
      
      // 2. Set Null pada referensi User di tabel-tabel pendukung (Review, Attachment, Approval, etc)
      await this.reviewRepo.update({ reviewer_id: id }, { reviewer_id: null } as any);
      await this.attachmentRepo.update({ uploaded_by: id }, { uploaded_by: null });
      await this.approvalRepo.update({ approver_id: id }, { approver_id: null } as any);
      await this.commentRepo.update({ mentioned_user_id: id }, { mentioned_user_id: null });
      await this.auditLogRepo.update({ actor_id: id }, { actor_id: null } as any);

      // 3. Eksekusi Hard Delete
      await this.repository.delete(id);
      
      this.logger.log(`User ${id} (${existing.email}) has been permanently deleted by ${logged?.name}`);
    } catch (error) {
      this.logger.error(`Failed to hard delete user ${id}: ${error.message}`);
      throw new Error(`Gagal menghapus akun: ${error.message}. Database menolak penghapusan karena batasan integritas.`);
    }
  }
}
