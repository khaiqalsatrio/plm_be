import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('master_product_categories')
export class MasterProductCategory extends BaseEntity {
  @Column({ name: 'code', type: 'varchar', length: 100, unique: true })
  public code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  public is_active: boolean;
}
