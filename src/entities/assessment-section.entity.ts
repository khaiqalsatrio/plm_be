import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AssessmentCriteria } from './assessment-criteria.entity';
import { AssessmentTemplate } from './assessment-template.entity';
import { BaseEntity } from './base.entity';
import { SectionType } from '../common/constant/enum';

@Entity('assessment_sections')
export class AssessmentSection extends BaseEntity {
  @Column({ name: 'template_id', type: 'uuid' })
  public template_id: string;

  @ManyToOne(() => AssessmentTemplate, (template) => template.sections, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'template_id' })
  public template: AssessmentTemplate;

  @Column({ name: 'section_code', type: 'varchar', length: 100 })
  public section_code: string;

  @Column({ name: 'section_name', type: 'varchar', length: 255 })
  public section_name: string;

  @Column({ 
    name: 'section_type', 
    type: 'enum', 
    enum: SectionType,
    nullable: true 
  })
  public section_type: SectionType;

  @Column({ name: 'weight', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public weight: number;

  @Column({ name: 'sort_order', type: 'int', default: 1 })
  public sort_order: number;

  @Column({ name: 'is_required', type: 'boolean', default: true })
  public is_required: boolean;

  @OneToMany(() => AssessmentCriteria, (criteria) => criteria.section)
  public criteria: AssessmentCriteria[];
}