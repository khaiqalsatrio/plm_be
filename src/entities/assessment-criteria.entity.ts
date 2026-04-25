import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AssessmentQuestion } from './assessment-question.entity';
import { AssessmentSection } from './assessment-section.entity';
import { BaseEntity } from './base.entity';
import { ScoreType } from '../common/constant/enum';

@Entity('assessment_criteria')
export class AssessmentCriteria extends BaseEntity {
  @Column({ name: 'section_id', type: 'uuid' })
  public section_id: string;

  @ManyToOne(() => AssessmentSection, (section) => section.criteria)
  @JoinColumn({ name: 'section_id' })
  public section: AssessmentSection;

  @Column({ name: 'criteria_code', type: 'varchar', length: 100, unique: true })
  public criteria_code: string;

  @Column({ name: 'criteria_name', type: 'varchar', length: 255 })
  public criteria_name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string;

  @Column({ name: 'weight', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public weight: number;

  @Column({ 
    name: 'score_type', 
    type: 'enum', 
    enum: ScoreType,
    nullable: true 
  })
  public score_type: ScoreType;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  public is_required: boolean;

  @Column({ name: 'has_comment', type: 'boolean', default: true })
  public has_comment: boolean;

  @Column({ name: 'has_attachment', type: 'boolean', default: true })
  public has_attachment: boolean;

  @Column({ name: 'sort_order', type: 'int', default: 1 })
  public sort_order: number;

  @OneToMany(() => AssessmentQuestion, (question) => question.criteria)
  public questions: AssessmentQuestion[];
}