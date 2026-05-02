import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AuditActionType } from '../common/constant/enum';

@Entity('audit_logs')
export class AuditLog extends BaseEntity {
  @Index()
  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  public user_id: string;

  @Column({ name: 'user_name', type: 'varchar', length: 255, nullable: true })
  public user_name: string;

  @Column({ 
    name: 'action', 
    type: 'enum', 
    enum: AuditActionType,
    nullable: true 
  })
  public action: AuditActionType;

  @Index()
  @Column({ name: 'entity_name', type: 'varchar', length: 100, nullable: true })
  public entity_name: string;

  @Index()
  @Column({ name: 'entity_id', type: 'varchar', length: 100, nullable: true })
  public entity_id: string;

  @Column({ name: 'old_values', type: 'jsonb', nullable: true })
  public old_values: any;

  @Column({ name: 'new_values', type: 'jsonb', nullable: true })
  public new_values: any;

  @Column({ name: 'ip_address', type: 'varchar', length: 50, nullable: true })
  public ip_address: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  public user_agent: string;
}
