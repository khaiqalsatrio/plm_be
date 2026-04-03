import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('master_assessment_options')
export class MasterAssessmentOption extends BaseEntity {
  @Column({ name: 'group_name', type: 'varchar', length: 100 })
  public group_name: string;

  @Column({ name: 'option_code', type: 'varchar', length: 100 })
  public option_code: string;

  @Column({ name: 'option_label', type: 'varchar', length: 255 })
  public option_label: string;

  @Column({ name: 'option_value', type: 'varchar', length: 255, nullable: true })
  public option_value: string;

  @Column({ name: 'sort_order', type: 'int', default: 1 })
  public sort_order: number;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public is_active: boolean;
}