import { Column, Entity, OneToMany } from 'typeorm';

import { AssessmentSection } from './assessment-section.entity';
import { BaseEntity } from './base.entity';
import { ProductType } from '../common/constant/enum';

@Entity('assessment_templates')
export class AssessmentTemplate extends BaseEntity {
  @Column({ name: 'template_code', type: 'varchar', length: 100 })
  public template_code: string;

  @Column({ name: 'template_name', type: 'varchar', length: 255 })
  public template_name: string;

  @Column({ 
    name: 'product_type', 
    type: 'enum', 
    enum: ProductType,
    nullable: true 
  })
  public product_type: ProductType;

  @Column({ name: 'version', type: 'int', default: 1 })
  public version: number;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public is_active: boolean;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  public published_at: Date;

  @OneToMany(() => AssessmentSection, (section) => section.template)
  public sections: AssessmentSection[];
}