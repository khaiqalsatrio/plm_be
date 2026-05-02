import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from '../../entities/audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepo: Repository<AuditLog>,
  ) {}

  async log(data: Partial<AuditLog>): Promise<void> {
    try {
      const auditLog = this.auditLogRepo.create(data);
      await this.auditLogRepo.save(auditLog);
    } catch (error) {
      console.error('Failed to save audit log:', error);
    }
  }
}
