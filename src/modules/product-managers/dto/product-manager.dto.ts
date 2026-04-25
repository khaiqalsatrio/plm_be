import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsOptional, IsDateString } from 'class-validator';

import { ApprovalDecision } from 'src/common/constant/enum';

export class SubmitFinalDecisionDto {
  @ApiProperty({ enum: ApprovalDecision, example: ApprovalDecision.APPROVE })
  @IsEnum(ApprovalDecision)
  public decision: ApprovalDecision;

  @ApiProperty({ example: 'Produk siap diluncurkan' })
  @IsString()
  @IsOptional()
  public decision_note?: string;

  @ApiProperty({ example: 'Selesaikan dokumentasi lanjutan' })
  @IsString()
  @IsOptional()
  public follow_up_action?: string;

  @ApiProperty({ example: '2026-12-31' })
  @IsDateString()
  @IsOptional()
  public due_date?: Date;
}
