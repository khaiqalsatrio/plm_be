import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsEnum } from 'class-validator';

import { ProductType, ProductStage, ProductPriority, AssessmentType } from 'src/common/constant/enum';

export class CreateProductAssessmentDto {
  @IsString()
  @ApiProperty({ description: 'Product Name', example: 'New Payment Gateway' })
  public product_name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Product Code', example: 'PG-001', nullable: true })
  public product_code?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: 'Product Category ID', example: 'uuid', nullable: true })
  public product_category_id?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: 'Business Unit ID', example: 'uuid', nullable: true })
  public business_unit_id?: string;

  @IsEnum(ProductType)
  @IsOptional()
  @ApiProperty({ description: 'Product Type', enum: ProductType, example: 'internal_tool', nullable: true })
  public product_type?: ProductType;

  @IsEnum(ProductStage)
  @IsOptional()
  @ApiProperty({ description: 'Stage', enum: ProductStage, example: 'development', nullable: true })
  public stage?: ProductStage;

  @IsEnum(ProductPriority)
  @IsOptional()
  @ApiProperty({ description: 'Priority', enum: ProductPriority, example: 'high', nullable: true })
  public priority?: ProductPriority;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Description', example: 'A new payment gateway for internal use', nullable: true })
  public description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Objective', example: 'To reduce transaction fees', nullable: true })
  public objective?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Target Market', example: 'Internal Employees', nullable: true })
  public target_market?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Value Proposition', example: 'Faster and cheaper', nullable: true })
  public value_proposition?: string;

  @IsEnum(AssessmentType)
  @IsOptional()
  @ApiProperty({ description: 'Assessment Type', enum: AssessmentType, example: 'initial', nullable: true })
  public assessment_type?: AssessmentType;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: 'Template ID', example: 'uuid', nullable: true })
  public template_id?: string;
}

export class UpdateProductAssessmentDto extends CreateProductAssessmentDto {}

export class DuplicateProductAssessmentDto {
  @IsUUID()
  @ApiProperty({ description: 'Original Assessment ID', example: 'uuid' })
  public original_id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'New Product Name (Optional)', example: 'Cloned Payment Gateway', nullable: true })
  public new_product_name?: string;
}
