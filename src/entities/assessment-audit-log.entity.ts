import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { AuditActionType } from '../common/constant/enum';

@Entity('assessment_audit_logs')
export class AssessmentAuditLog extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.audit_logs)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ 
    name: 'action_type', 
    type: 'enum', 
    enum: AuditActionType,
    nullable: true 
  })
  public action_type: AuditActionType;

  @Column({ name: 'from_value', type: 'text', nullable: true })
  public from_value: string;

  @Column({ name: 'to_value', type: 'text', nullable: true })
  public to_value: string;

  @Column({ name: 'note', type: 'text', nullable: true })
  public note: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  public actor_id: string;
}