import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('master_risk_levels')
export class MasterRiskLevel extends BaseEntity {
  @Column({ name: 'code', type: 'varchar', length: 100, unique: true })
  public code: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  public name: string;

  @Column({ name: 'score_min', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public score_min: number;

  @Column({ name: 'score_max', type: 'decimal', precision: 5, scale: 2, default: 0 })
  public score_max: number;

  @Column({ name: 'color', type: 'varchar', length: 50, nullable: true })
  public color: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  public description: string;
}