import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, IsString, IsNumber, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RiskLevel, AssessmentRecommendation } from 'src/common/constant/enum';

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

  @IsEnum(AssessmentRecommendation)
  @ApiProperty({ enum: AssessmentRecommendation, example: AssessmentRecommendation.RECOMMENDED })
  recommendation: AssessmentRecommendation;
}

export class ReturnLegalReviewDto {
  @IsString()
  @ApiProperty({ example: 'Mohon lengkapi dokumen PKS dengan pihak ketiga' })
  reason: string;
}
