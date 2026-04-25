import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsArray, IsString, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ReviewStatus, RiskLevel, ReviewRecommendation } from 'src/common/constant/enum';

export class BusinessResponseItem {
  @IsUUID()
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  criteria_id: string;

  @IsNumber()
  @ApiProperty({ example: 4 })
  score: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Justifikasi skor bisnis', required: false })
  note?: string;
}

export class SaveBusinessReviewDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BusinessResponseItem)
  @ApiProperty({ type: [BusinessResponseItem] })
  responses: BusinessResponseItem[];
}

export class SubmitBusinessReviewDto {
  @IsString()
  @ApiProperty({ example: 'Rangkuman penilaian bisnis secara keseluruhan' })
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

export class ReturnBusinessReviewDto {
  @IsString()
  @ApiProperty({ example: 'Mohon lengkapi detil proyeksi revenue' })
  reason: string;
}
