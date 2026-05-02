import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsInt, IsBoolean, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType, SectionType, ScoreType, QuestionType, AnswerType } from '../../../common/constant/enum';

export class QuestionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  question_code: string;

  @ApiProperty()
  @IsString()
  question_text: string;

  @ApiProperty({ enum: QuestionType })
  @IsEnum(QuestionType)
  question_type: QuestionType;

  @ApiProperty({ enum: AnswerType })
  @IsEnum(AnswerType)
  answer_type: AnswerType;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsBoolean()
  is_required: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  help_text?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  placeholder?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  option_source?: string;

  @ApiProperty()
  @IsInt()
  sort_order: number;
}

export class CriteriaDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  criteria_code: string;

  @ApiProperty()
  @IsString()
  criteria_name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty({ enum: ScoreType })
  @IsEnum(ScoreType)
  score_type: ScoreType;

  @ApiProperty()
  @IsBoolean()
  is_required: boolean;

  @ApiProperty()
  @IsBoolean()
  has_comment: boolean;

  @ApiProperty()
  @IsBoolean()
  has_attachment: boolean;

  @ApiProperty()
  @IsInt()
  sort_order: number;

  @ApiProperty({ type: [QuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class SectionDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty()
  @IsString()
  section_code: string;

  @ApiProperty()
  @IsString()
  section_name: string;

  @ApiProperty({ enum: SectionType })
  @IsEnum(SectionType)
  section_type: SectionType;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsInt()
  sort_order: number;

  @ApiProperty()
  @IsBoolean()
  is_required: boolean;

  @ApiProperty({ type: [CriteriaDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CriteriaDto)
  criteria: CriteriaDto[];
}

export class CreateTemplateDto {
  @ApiProperty()
  @IsString()
  template_code: string;

  @ApiProperty()
  @IsString()
  template_name: string;

  @ApiProperty({ enum: ProductType })
  @IsEnum(ProductType)
  product_type: ProductType;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: [SectionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDto)
  sections: SectionDto[];
}

export class UpdateTemplateDto extends CreateTemplateDto {}
