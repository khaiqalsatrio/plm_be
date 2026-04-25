import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, PRODUCT_MANAGER } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { SubmitFinalDecisionDto } from './dto/product-manager.dto';
import { GetAssessmentApprovalDetailUseCase } from './usecases/get-assessment-approval-detail.usecase';
import { GetProductManagerQueueUseCase } from './usecases/get-product-manager-queue.usecase';
import { SubmitFinalDecisionUseCase } from './usecases/submit-final-decision.usecase';

@ApiTags('Product Manager Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'product-managers' })
export class ProductManagerController {
  constructor(
    private readonly getQueueUseCase: GetProductManagerQueueUseCase,
    private readonly getDetailUseCase: GetAssessmentApprovalDetailUseCase,
    private readonly submitDecisionUseCase: SubmitFinalDecisionUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_MANAGER)
  async getQueue(@Res() res, @Query() query: PaginateDto & { status?: string }) {
    try {
      const result = await this.getQueueUseCase.paginate(query.page || 1, query.limit || 10, query.status);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[ProductManager] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get('assessment/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_MANAGER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const data = await this.getDetailUseCase.execute(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[ProductManager] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post('assessment/:id/decision')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_MANAGER)
  async submitDecision(@Res() res, @Param('id') id: string, @Body() dto: SubmitFinalDecisionDto) {
    try {
      const logged = res.locals.logged;
      const result = await this.submitDecisionUseCase.execute(id, dto, logged);
      return respond(res, 200, true, result.message, result);
    } catch (error) {
      logger.error('[ProductManager] SUBMIT DECISION ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
