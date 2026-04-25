import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { BUSINESS_OWNER, JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetBusinessOwnerAssessmentDetailUseCase } from './usecases/get-business-owner-assessment-detail.usecase';
import { GetBusinessOwnerDashboardStatsUseCase } from './usecases/get-business-owner-dashboard-stats.usecase';
import { GetBusinessOwnerQueueUseCase } from './usecases/get-business-owner-queue.usecase';

@ApiTags('Business Owner Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'business-owners' })
export class BusinessOwnerController {
  constructor(
    private readonly getQueueUseCase: GetBusinessOwnerQueueUseCase,
    private readonly getDetailUseCase: GetBusinessOwnerAssessmentDetailUseCase,
    private readonly getStatsUseCase: GetBusinessOwnerDashboardStatsUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_OWNER)
  async getQueue(@Res() res, @Query() query: PaginateDto) {
    try {
      const logged = res.locals.logged;
      const result = await this.getQueueUseCase.execute(query.page || 1, query.limit || 10, logged);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[BusinessOwner] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get('assessment/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_OWNER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.getDetailUseCase.execute(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[BusinessOwner] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get('dashboard-stats')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_OWNER)
  async getStats(@Res() res) {
    try {
      const logged = res.locals.logged;
      const data = await this.getStatsUseCase.execute(logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[BusinessOwner] GET STATS ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
