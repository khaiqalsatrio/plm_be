import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductAssessment } from './product-assessment.entity';
import { DocumentType } from '../common/constant/enum';

@Entity('assessment_attachments')
export class AssessmentAttachment extends BaseEntity {
  @Column({ name: 'assessment_id', type: 'uuid' })
  public assessment_id: string;

  @ManyToOne(() => ProductAssessment, (assessment) => assessment.attachments)
  @JoinColumn({ name: 'assessment_id' })
  public product_assessment: ProductAssessment;

  @Column({ name: 'section_id', type: 'uuid', nullable: true })
  public section_id: string;

  @Column({ name: 'criteria_id', type: 'uuid', nullable: true })
  public criteria_id: string;

  @Column({ name: 'file_name', type: 'varchar', length: 255 })
  public file_name: string;

  @Column({ name: 'file_url', type: 'text' })
  public file_url: string;

  @Column({ name: 'file_type', type: 'varchar', length: 100, nullable: true })
  public file_type: string;

  @Column({ 
    name: 'document_type', 
    type: 'enum', 
    enum: DocumentType,
    nullable: true 
  })
  public document_type: DocumentType;

  @Column({ name: 'uploaded_by', type: 'uuid', nullable: true })
  public uploaded_by: string;

  @Column({ name: 'uploaded_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public uploaded_at: Date;
}
