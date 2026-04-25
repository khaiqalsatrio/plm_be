import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetBusinessUnitsUseCase } from './usecases/get-business-units.usecase';
import { GetProductCategoriesUseCase } from './usecases/get-product-categories.usecase';
import { GetRiskLevelsUseCase } from './usecases/get-risk-levels.usecase';
import { GetTemplateDetailUseCase } from './usecases/get-template-detail.usecase';
import { GetTemplatesUseCase } from './usecases/get-templates.usecase';

@ApiTags('Master Data')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@UseGuards(JwtAuthGuard)
@Controller({ version: '1', path: 'master-data' })
export class MasterDataController {
  constructor(
    private readonly getBusinessUnitsUseCase: GetBusinessUnitsUseCase,
    private readonly getProductCategoriesUseCase: GetProductCategoriesUseCase,
    private readonly getTemplatesUseCase: GetTemplatesUseCase,
    private readonly getTemplateDetailUseCase: GetTemplateDetailUseCase,
    private readonly getRiskLevelsUseCase: GetRiskLevelsUseCase,
  ) {}

  @Get('business-units')
  @HttpCode(HttpStatus.OK)
  async getBusinessUnits(@Res() res): Promise<any> {
    try {
      const data = await this.getBusinessUnitsUseCase.execute();
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[MasterData] Get Business Units ERROR', error);
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get('product-categories')
  @HttpCode(HttpStatus.OK)
  async getProductCategories(@Res() res): Promise<any> {
    try {
      const data = await this.getProductCategoriesUseCase.execute();
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[MasterData] Get Product Categories ERROR', error);
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get('templates')
  @HttpCode(HttpStatus.OK)
  async getTemplates(@Res() res): Promise<any> {
    try {
      const data = await this.getTemplatesUseCase.execute();
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[MasterData] Get Templates ERROR', error);
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }

  @Get('templates/:id')
  @HttpCode(HttpStatus.OK)
  async getTemplateDetail(@Res() res, @Param('id') id: string): Promise<any> {
    try {
      const data = await this.getTemplateDetailUseCase.execute(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[MasterData] Get Template Detail ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get('risk-levels')
  @HttpCode(HttpStatus.OK)
  async getRiskLevels(@Res() res): Promise<any> {
    try {
      const data = await this.getRiskLevelsUseCase.execute();
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[MasterData] Get Risk Levels ERROR', error);
      return respond(res, 500, false, MessageHandler.ERR000);
    }
  }
}
