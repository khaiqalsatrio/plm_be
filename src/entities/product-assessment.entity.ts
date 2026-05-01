import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Index } from 'typeorm';

import { AssessmentApproval } from './assessment-approval.entity';
import { AssessmentAttachment } from './assessment-attachment.entity';
import { AssessmentAuditLog } from './assessment-audit-log.entity';
import { AssessmentComment } from './assessment-comment.entity';
import { AssessmentResponse } from './assessment-response.entity';
import { AssessmentReview } from './assessment-review.entity';
import { AssessmentTemplate } from './assessment-template.entity';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { AssessmentType, AssessmentStatus, ReviewStatus, RiskLevel, AssessmentRecommendation } from '../common/constant/enum';

@Entity('product_assessments')
export class ProductAssessment extends BaseEntity {
  @Column({ name: 'assessment_no', type: 'varchar', length: 100, unique: true })
  public assessment_no: string;

  @Column({ name: 'product_id', type: 'uuid' })
  public product_id: string;

  @ManyToOne(() => Product, (product) => product.assessments)
  @JoinColumn({ name: 'product_id' })
  public product: Product;

  @Column({ name: 'template_id', type: 'uuid', nullable: true })
  public template_id: string;

  @ManyToOne(() => AssessmentTemplate)
  @JoinColumn({ name: 'template_id' })
  public template: AssessmentTemplate;

  @Column({ name: 'version', type: 'int', default: 1 })
  public version: number;

  @Column({ 
    name: 'assessment_type', 
    type: 'enum', 
    enum: AssessmentType,
    nullable: true 
  })
  public assessment_type: AssessmentType;

  @Column({ 
    name: 'overall_status', 
    type: 'enum', 
    enum: AssessmentStatus,
    default: AssessmentStatus.DRAFT 
  })
  public overall_status: AssessmentStatus;

  @Column({ 
    name: 'technical_status', 
    type: 'enum', 
    enum: ReviewStatus,
    default: ReviewStatus.NOT_STARTED,
    nullable: true 
  })
  public technical_status: ReviewStatus;

  @Column({ 
    name: 'business_status', 
    type: 'enum', 
    enum: ReviewStatus,
    default: ReviewStatus.NOT_STARTED,
    nullable: true 
  })
  public business_status: ReviewStatus;

  @Column({ 
    name: 'legal_status', 
    type: 'enum', 
    enum: ReviewStatus,
    default: ReviewStatus.NOT_STARTED,
    nullable: true 
  })
  public legal_status: ReviewStatus;

  @Column({ name: 'technical_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public technical_score: number;

  @Column({ name: 'business_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public business_score: number;

  @Column({ name: 'legal_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public legal_score: number;

  @Column({ name: 'total_score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public total_score: number;

  @Column({ 
    name: 'technical_risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public technical_risk_level: RiskLevel;

  @Column({ 
    name: 'business_risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public business_risk_level: RiskLevel;

  @Column({ 
    name: 'legal_risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public legal_risk_level: RiskLevel;

  @Column({ 
    name: 'overall_risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public overall_risk_level: RiskLevel;

  @Column({ 
    name: 'recommendation', 
    type: 'enum', 
    enum: AssessmentRecommendation,
    nullable: true 
  })
  public recommendation: AssessmentRecommendation;

  @Index()
  @Column({ name: 'submitted_by', type: 'uuid', nullable: true })
  public submitted_by: string;

  @Column({ name: 'submitted_at', type: 'timestamp', nullable: true })
  public submitted_at: Date;

  @Index()
  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  public approved_by: string;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  public approved_at: Date;

  @Column({ name: 'decision_note', type: 'text', nullable: true })
  public decision_note: string;

  @OneToMany(() => AssessmentResponse, (response) => response.product_assessment)
  public responses: AssessmentResponse[];

  @OneToMany(() => AssessmentReview, (review) => review.product_assessment)
  public reviews: AssessmentReview[];

  @OneToMany(() => AssessmentApproval, (approval) => approval.product_assessment)
  public approvals: AssessmentApproval[];

  @OneToMany(() => AssessmentAttachment, (attachment) => attachment.product_assessment)
  public attachments: AssessmentAttachment[];

  @OneToMany(() => AssessmentComment, (comment) => comment.product_assessment)
  public comments: AssessmentComment[];

  @OneToMany(() => AssessmentAuditLog, (log) => log.product_assessment)
  public audit_logs: AssessmentAuditLog[];
}