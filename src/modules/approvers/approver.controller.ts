import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { APPROVER, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetApproverQueueUseCase } from './usecases/get-approver-queue.usecase';
import { GetApproverAssessmentDetailUseCase } from './usecases/get-approver-assessment-detail.usecase';
import { SubmitFinalValidationUseCase } from './usecases/submit-final-validation.usecase';
import { SubmitFinalValidationDto } from './dto/approver.dto';

@ApiTags('Approver Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'approvers' })
export class ApproverController {
  constructor(
    private readonly getQueueUseCase: GetApproverQueueUseCase,
    private readonly getDetailUseCase: GetApproverAssessmentDetailUseCase,
    private readonly submitValidationUseCase: SubmitFinalValidationUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(APPROVER)
  async getQueue(@Res() res, @Query() query: PaginateDto) {
    try {
      const result = await this.getQueueUseCase.execute(query.page || 1, query.limit || 10);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[Approver] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get('assessment/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(APPROVER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const data = await this.getDetailUseCase.execute(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[Approver] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post('assessment/:id/validate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(APPROVER)
  async submitValidation(@Res() res, @Param('id') id: string, @Body() dto: SubmitFinalValidationDto) {
    try {
      const logged = res.locals.logged;
      const result = await this.submitValidationUseCase.execute(id, dto, logged);
      return respond(res, 200, true, result.message, result.status);
    } catch (error) {
      logger.error('[Approver] SUBMIT VALIDATION ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
