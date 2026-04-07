import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { ReviewStatus } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { SaveBusinessReviewDto } from '../dto/business-review.dto';

@Injectable()
export class SaveBusinessReviewDraftUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly assessmentRepo: Repository<ProductAssessment>,
    @InjectRepository(AssessmentResponse)
    private readonly responseRepo: Repository<AssessmentResponse>,
  ) {}

  async execute(id: string, dto: SaveBusinessReviewDto, logged: AuthenticatedUser) {
    const assessment = await this.assessmentRepo.findOne({ where: { id } });

    if (!assessment) {
      throw new Error('Assessment tidak ditemukan');
    }

    if (assessment.business_status === ReviewStatus.FINALIZED) {
      throw new Error('Review bisnis sudah didefinisikan sebagai selesai dan tidak dapat diubah');
    }

    // Upsert responses
    for (const item of dto.responses) {
      let response = await this.responseRepo.findOne({
        where: {
          assessment_id: id,
          criteria_id: item.criteria_id,
          reviewer_type: 'business' as any, // Should use enum if available
        },
      });

      if (!response) {
        response = new AssessmentResponse();
        response.assessment_id = id;
        response.criteria_id = item.criteria_id;
        response.reviewer_type = 'business' as any;
        response.created_by = logged.id;
      }

      response.score = item.score;
      response.note = item.note;
      
      await this.responseRepo.save(response);
    }

    // Auto-update status to in_progress if not already
    if (assessment.business_status === ReviewStatus.NOT_STARTED) {
      assessment.business_status = ReviewStatus.IN_PROGRESS;
      await this.assessmentRepo.save(assessment);
    }

    return { success: true };
  }
}
