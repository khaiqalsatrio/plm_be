import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsArray, IsString, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { RiskLevel, ReviewRecommendation } from 'src/common/constant/enum';

export class LegalResponseItem {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  criteria_id: string;

  @IsNumber()
  @ApiProperty({ example: 5 })
  score: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Kepatuhan terhadap UU PDP sudah terpenuhi', required: false })
  note?: string;
}

export class SaveLegalReviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LegalResponseItem)
  @ApiProperty({ type: [LegalResponseItem] })
  responses: LegalResponseItem[];
}

export class SubmitLegalReviewDto {
  @IsString()
  @ApiProperty({ example: 'Rangkuman penilaian aspek hukum dan kepatuhan data privacy' })
  summary: string;

  @IsEnum(RiskLevel)
  @ApiProperty({ enum: RiskLevel, example: RiskLevel.LOW })
  risk_level: RiskLevel;

  @IsEnum(ReviewRecommendation)
  @ApiProperty({ enum: ReviewRecommendation, example: ReviewRecommendation.PASS })
  recommendation: ReviewRecommendation;

  @ApiPropertyOptional({ example: 85 })
  @IsOptional()
  @IsNumber()
  score?: number;
}

export class ReturnLegalReviewDto {
  @IsString()
  @ApiProperty({ example: 'Mohon lengkapi dokumen PKS dengan pihak ketiga' })
  reason: string;
}
