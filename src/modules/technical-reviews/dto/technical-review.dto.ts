import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RiskLevel, ReviewRecommendation } from 'src/common/constant/enum';

export class AssessmentResponseDto {
  @ApiProperty({ example: 'section-uuid' })
  @IsUUID()
  section_id: string;

  @ApiProperty({ example: 'criteria-uuid' })
  @IsUUID()
  criteria_id: string;

  @ApiProperty({ example: 'question-uuid' })
  @IsUUID()
  question_id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  answer_text?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  answer_number?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  answer_boolean?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  answer_option?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  score?: number;

  @ApiPropertyOptional({ enum: RiskLevel })
  @IsOptional()
  @IsEnum(RiskLevel)
  risk_level?: RiskLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class SaveTechnicalReviewDto {
  @ApiProperty({ type: [AssessmentResponseDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssessmentResponseDto)
  responses: AssessmentResponseDto[];

  @ApiPropertyOptional({ enum: RiskLevel })
  @IsOptional()
  @IsEnum(RiskLevel)
  risk_level?: RiskLevel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  summary?: string;
}

export class SubmitTechnicalReviewDto extends SaveTechnicalReviewDto {
  @ApiProperty({ enum: ReviewRecommendation })
  @IsEnum(ReviewRecommendation)
  recommendation: ReviewRecommendation;
}

export class ReturnTechnicalReviewDto {
  @ApiProperty()
  @IsString()
  reason: string;
}
