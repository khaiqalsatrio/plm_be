import { Column, Entity, JoinColumn, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { SectionType, ReviewStatus, RiskLevel, ReviewRecommendation } from '../common/constant/enum';

@Entity('assessment_reviews')
export class AssessmentReview extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.reviews)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ 
    name: 'review_type', 
    type: 'enum', 
    enum: SectionType,
    nullable: true 
  })
  public review_type: SectionType;

  @Index()
  @Column({ name: 'reviewer_id', type: 'uuid', nullable: true })
  public reviewer_id: string;

  @Column({ 
    name: 'review_status', 
    type: 'enum', 
    enum: ReviewStatus,
    default: ReviewStatus.NOT_STARTED,
    nullable: true 
  })
  public review_status: ReviewStatus;

  @Column({ name: 'score', type: 'decimal', precision: 5, scale: 2, nullable: true })
  public score: number;

  @Column({ 
    name: 'risk_level', 
    type: 'enum', 
    enum: RiskLevel,
    nullable: true 
  })
  public risk_level: RiskLevel;

  @Column({ name: 'summary', type: 'text', nullable: true })
  public summary: string;

  @Column({ 
    name: 'recommendation', 
    type: 'enum', 
    enum: ReviewRecommendation,
    nullable: true 
  })
  public recommendation: ReviewRecommendation;

  @Column({ name: 'reviewed_at', type: 'timestamp', nullable: true })
  public reviewed_at: Date;
}