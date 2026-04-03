import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { ApprovalDecision } from '../common/constant/enum';

@Entity('assessment_approvals')
export class AssessmentApproval extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.approvals)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ name: 'approver_id', type: 'uuid' })
  public approver_id: string;

  @Column({ 
    name: 'decision', 
    type: 'enum', 
    enum: ApprovalDecision,
    nullable: true 
  })
  public decision: ApprovalDecision;

  @Column({ name: 'decision_note', type: 'text', nullable: true })
  public decision_note: string;

  @Column({ name: 'follow_up_action', type: 'text', nullable: true })
  public follow_up_action: string;

  @Column({ name: 'due_date', type: 'timestamp', nullable: true })
  public due_date: Date;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  public approved_at: Date;
}