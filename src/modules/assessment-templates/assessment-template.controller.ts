import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, ADMIN } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { CreateTemplateDto, UpdateTemplateDto } from './dto/assessment-template.dto';
import { CreateTemplateUseCase } from './usecases/create-template.usecase';
import { GetTemplateDetailUseCase } from './usecases/get-template-detail.usecase';
import { GetTemplateListUseCase } from './usecases/get-template-list.usecase';
import { PublishTemplateUseCase } from './usecases/publish-template.usecase';
import { UpdateTemplateUseCase } from './usecases/update-template.usecase';

@ApiTags('Assessment Templates (Admin Features)')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'assessment-templates' })
export class AssessmentTemplateController {
  constructor(
    private readonly createUseCase: CreateTemplateUseCase,
    private readonly getListUseCase: GetTemplateListUseCase,
    private readonly getDetailUseCase: GetTemplateDetailUseCase,
    private readonly updateUseCase: UpdateTemplateUseCase,
    private readonly publishUseCase: PublishTemplateUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async create(@Res() res, @Body() dto: CreateTemplateDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.createUseCase.execute(dto, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[AssessmentTemplate] CREATE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findAll(@Res() res) {
    try {
      const data = await this.getListUseCase.execute();
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[AssessmentTemplate] FIND ALL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const data = await this.getDetailUseCase.execute(id);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[AssessmentTemplate] FIND ONE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async update(@Res() res, @Param('id') id: string, @Body() dto: UpdateTemplateDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.updateUseCase.execute(id, dto, logged);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[AssessmentTemplate] UPDATE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/publish')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(ADMIN)
  async publish(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.publishUseCase.execute(id, logged);
      return respond(res, 200, true, 'Template berhasil dipublikasi', data);
    } catch (error) {
      logger.error('[AssessmentTemplate] PUBLISH ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
