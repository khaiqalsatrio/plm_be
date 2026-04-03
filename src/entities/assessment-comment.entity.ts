import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { CommentType } from '../common/constant/enum';

@Entity('assessment_comments')
export class AssessmentComment extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.comments)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ name: 'section_id', type: 'uuid', nullable: true })
  public section_id: string;

  @Column({ name: 'criteria_id', type: 'uuid', nullable: true })
  public criteria_id: string;

  @Column({ name: 'parent_comment_id', type: 'uuid', nullable: true })
  public parent_comment_id: string;

  @Column({ name: 'comment_text', type: 'text' })
  public comment_text: string;

  @Column({ 
    name: 'comment_type', 
    type: 'enum', 
    enum: CommentType,
    nullable: true 
  })
  public comment_type: CommentType;

  @Column({ name: 'mentioned_user_id', type: 'uuid', nullable: true })
  public mentioned_user_id: string;
}