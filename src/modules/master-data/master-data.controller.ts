import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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

@ApiTags('Master Data')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@UseGuards(JwtAuthGuard)
@Controller({ version: '1', path: 'master-data' })
export class MasterDataController {
  constructor(
    private readonly getBusinessUnitsUseCase: GetBusinessUnitsUseCase,
    private readonly getProductCategoriesUseCase: GetProductCategoriesUseCase,
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
}
