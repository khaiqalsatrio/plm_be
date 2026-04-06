import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { AssessmentResponse } from 'src/entities/assessment-response.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { ReviewerType, SectionType } from 'src/common/constant/enum';
import { AuthenticatedUser } from 'src/common/types/auth-context.type';
import { SaveTechnicalReviewDto } from '../dto/technical-review.dto';

@Injectable()
export class SaveTechnicalReviewDraftUseCase {
  constructor(
    @InjectRepository(AssessmentResponse)
    private readonly responseRepo: Repository<AssessmentResponse>,
    @InjectRepository(AssessmentReview)
    private readonly reviewRepo: Repository<AssessmentReview>,
    private readonly dataSource: DataSource,
  ) {}

  async execute(id: string, dto: SaveTechnicalReviewDto, logged: AuthenticatedUser) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 1. Upsert Responses
      for (const resDto of dto.responses) {
        let response = await queryRunner.manager.findOne(AssessmentResponse, {
          where: {
            assessment_id: id,
            question_id: resDto.question_id,
            reviewer_type: ReviewerType.TECHNICAL,
          },
        });

        if (!response) {
          response = new AssessmentResponse();
          response.assessment_id = id;
          response.question_id = resDto.question_id;
          response.reviewer_type = ReviewerType.TECHNICAL;
        }

        response.section_id = resDto.section_id;
        response.criteria_id = resDto.criteria_id;
        response.answer_text = resDto.answer_text;
        response.answer_number = resDto.answer_number;
        response.answer_boolean = resDto.answer_boolean;
        response.answer_option = resDto.answer_option;
        response.score = resDto.score;
        response.risk_level = resDto.risk_level;
        response.note = resDto.note;

        await queryRunner.manager.save(response);
      }

      // 2. Update Review Summary (Draft)
      let review = await queryRunner.manager.findOne(AssessmentReview, {
        where: { assessment_id: id, review_type: SectionType.TECHNICAL },
      });

      if (review) {
        if (dto.risk_level) review.risk_level = dto.risk_level;
        if (dto.summary) review.summary = dto.summary;
        await queryRunner.manager.save(review);
      }

      await queryRunner.commitTransaction();
      return { success: true, message: 'Draft technical review saved' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
