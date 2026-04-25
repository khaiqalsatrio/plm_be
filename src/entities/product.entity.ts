import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Index } from 'typeorm';

import { BaseEntity } from './base.entity';
import { MasterBusinessUnit } from './master-business-unit.entity';
import { MasterProductCategory } from './master-product-category.entity';
import { ProductAssessment } from './product-assessment.entity';
import { User } from './user.entity';
import { ProductType, ProductStage, ProductPriority, ProductStatus } from '../common/constant/enum';

@Entity('products')
export class Product extends BaseEntity {
  @Column({ name: 'product_code', type: 'varchar', length: 100, unique: true })
  public product_code: string;

  @Column({ name: 'product_name', type: 'varchar', length: 255 })
  public product_name: string;

  @Column({ name: 'product_category_id', type: 'uuid', nullable: true })
  public product_category_id: string;

  @ManyToOne(() => MasterProductCategory)
  @JoinColumn({ name: 'product_category_id' })
  public category: MasterProductCategory;

  @Column({ name: 'business_unit_id', type: 'uuid', nullable: true })
  public business_unit_id: string;

  @ManyToOne(() => MasterBusinessUnit)
  @JoinColumn({ name: 'business_unit_id' })
  public business_unit: MasterBusinessUnit;

  @Index()
  @Column({ name: 'owner_id', type: 'uuid', nullable: true })
  public owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  public owner: User;

  @Index()
  @Column({ name: 'product_manager_id', type: 'uuid', nullable: true })
  public product_manager_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'product_manager_id' })
  public product_manager: User;

  @Column({ 
    name: 'product_type', 
    type: 'enum', 
    enum: ProductType,
    nullable: true 
  })
  public product_type: ProductType;

  @Column({ 
    name: 'stage', 
    type: 'enum', 
    enum: ProductStage,
    nullable: true 
  })
  public stage: ProductStage;

  @Column({ 
    name: 'priority', 
    type: 'enum', 
    enum: ProductPriority,
    nullable: true 
  })
  public priority: ProductPriority;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string;

  @Column({ name: 'objective', type: 'text', nullable: true })
  public objective: string;

  @Column({ name: 'target_market', type: 'text', nullable: true })
  public target_market: string;

  @Column({ name: 'value_proposition', type: 'text', nullable: true })
  public value_proposition: string;

  @Column({ 
    name: 'status', 
    type: 'enum', 
    enum: ProductStatus,
    default: ProductStatus.ACTIVE 
  })
  public status: ProductStatus;

  @OneToMany(() => ProductAssessment, (assessment) => assessment.product)
  public assessments: ProductAssessment[];
}