import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional } from 'class-validator';

import { AssessmentStatus } from 'src/common/constant/enum';

export class SubmitFinalValidationDto {
  @ApiProperty({ enum: [AssessmentStatus.APPROVED, AssessmentStatus.REJECTED], example: AssessmentStatus.APPROVED })
  @IsEnum([AssessmentStatus.APPROVED, AssessmentStatus.REJECTED])
  public decision: AssessmentStatus.APPROVED | AssessmentStatus.REJECTED;

  @ApiProperty({ example: 'Dokumen lengkap dan valid' })
  @IsString()
  @IsOptional()
  public note?: string;
}
