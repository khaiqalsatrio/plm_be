import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { ReviewerType, RiskLevel } from '../common/constant/enum';

@Entity('assessment_responses')
export class AssessmentResponse extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.responses)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ name: 'section_id', type: 'uuid' })
  public section_id: string;

  @Column({ name: 'criteria_id', type: 'uuid' })
  public criteria_id: string;

  @Column({ name: 'question_id', type: 'uuid' })
  public question_id: string;

  @Column({ 
    name: 'reviewer_type', 
    type: 'enum', 
    enum: ReviewerType 
  })
  public reviewer_type: ReviewerType;

  @Column({ name: 'answer_text', type: 'text', nullable: true })
  public answer_text: string;

  @Column({ name: 'answer_number', type: 'decimal', precision: 12, scale: 2, nullable: true })
  public answer_number: number;

  @Column({ name: 'answer_boolean', type: 'boolean', nullable: true })
  public answer_boolean: boolean;

  @Column({ name: 'answer_option', type: 'varchar', length: 255, nullable: true })
  public answer_option: string;

  @Column({ name: 'score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public score: number;

  @Column({ 
    name: 'risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public risk_level: RiskLevel;

  @Column({ name: 'note', type: 'text', nullable: true })
  public note: string;
}