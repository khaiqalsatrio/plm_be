import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, PRODUCT_OWNER } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { CreateProductAssessmentDto, UpdateProductAssessmentDto, DuplicateProductAssessmentDto } from './dto/product-assessment.dto';
import { CreateAssessmentUseCase } from './usecases/create-assessment.usecase';
import { DuplicateAssessmentUseCase } from './usecases/duplicate-assessment.usecase';
import { ExportAssessmentPdfUseCase } from './usecases/export-assessment-pdf.usecase';
import { GetAssessmentsUseCase } from './usecases/get-assessments.usecase';
import { SubmitAssessmentUseCase } from './usecases/submit-assessment.usecase';
import { UpdateAssessmentUseCase } from './usecases/update-assessment.usecase';

@ApiTags('Product Assessments (PO Workspace)')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'product-assessments' })
export class ProductAssessmentController {
  constructor(
    private readonly createUseCase: CreateAssessmentUseCase,
    private readonly getUseCase: GetAssessmentsUseCase,
    private readonly updateUseCase: UpdateAssessmentUseCase,
    private readonly submitUseCase: SubmitAssessmentUseCase,
    private readonly duplicateUseCase: DuplicateAssessmentUseCase,
    private readonly exportPdfUseCase: ExportAssessmentPdfUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async create(@Res() res, @Body() dto: CreateProductAssessmentDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.createUseCase.execute(dto, logged);
      return respond(res, 201, true, MessageHandler.SUC001, data);
    } catch (error) {
      logger.error('[ProductAssessment] CREATE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async findAll(@Res() res, @Query() query: PaginateDto & { status?: string }) {
    try {
      const logged = res.locals.logged;
      const result = await this.getUseCase.paginate(query.page, query.limit, logged, query.status);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[ProductAssessment] FIND ALL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async findOne(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.getUseCase.findOne(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[ProductAssessment] FIND ONE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async update(@Res() res, @Param('id') id: string, @Body() dto: UpdateProductAssessmentDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.updateUseCase.execute(id, dto, logged);
      return respond(res, 200, true, MessageHandler.SUC002, data);
    } catch (error) {
      logger.error('[ProductAssessment] UPDATE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async submit(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.submitUseCase.execute(id, logged);
      return respond(res, 200, true, 'Assessment berhasil di-submit', data);
    } catch (error) {
      logger.error('[ProductAssessment] SUBMIT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post('duplicate')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async duplicate(@Res() res, @Body() dto: DuplicateProductAssessmentDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.duplicateUseCase.execute(dto, logged);
      return respond(res, 201, true, 'Assessment berhasil diduplikasi', data);
    } catch (error) {
      logger.error('[ProductAssessment] DUPLICATE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id/export-pdf')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  // @Roles(PRODUCT_OWNER) // Temporarily allow other reviewers if needed, or keep PO
  async exportPdf(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const doc = await this.exportPdfUseCase.execute(id, logged);
      
      const filename = `assessment-${id.substring(0, 8)}.pdf`;
      res.header('Content-Type', 'application/pdf');
      res.header('Content-Disposition', `attachment; filename=${filename}`);
      
      // Fastify specific: pipe directly to the response raw stream
      doc.pipe(res.raw);
    } catch (error) {
      logger.error('[ProductAssessment] EXPORT PDF ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
