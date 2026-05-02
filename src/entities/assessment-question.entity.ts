import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AssessmentCriteria } from './assessment-criteria.entity';
import { BaseEntity } from './base.entity';
import { QuestionType, AnswerType } from '../common/constant/enum';

@Entity('assessment_questions')
export class AssessmentQuestion extends BaseEntity {
  @Column({ name: 'criteria_id', type: 'uuid' })
  public criteria_id: string;

  @ManyToOne(() => AssessmentCriteria, (criteria) => criteria.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'criteria_id' })
  public criteria: AssessmentCriteria;

  @Column({ name: 'question_code', type: 'varchar', length: 100 })
  public question_code: string;

  @Column({ name: 'question_text', type: 'text' })
  public question_text: string;

  @Column({ 
    name: 'question_type', 
    type: 'enum', 
    enum: QuestionType,
    nullable: true 
  })
  public question_type: QuestionType;

  @Column({ 
    name: 'answer_type', 
    type: 'enum', 
    enum: AnswerType,
    nullable: true 
  })
  public answer_type: AnswerType;

  @Column({ name: 'weight', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public weight: number;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  public is_required: boolean;

  @Column({ name: 'help_text', type: 'text', nullable: true })
  public help_text: string;

  @Column({ name: 'placeholder', type: 'varchar', length: 255, nullable: true })
  public placeholder: string;

  @Column({ name: 'option_source', type: 'varchar', length: 255, nullable: true })
  public option_source: string;

  @Column({ name: 'sort_order', type: 'int', default: 1 })
  public sort_order: number;
}