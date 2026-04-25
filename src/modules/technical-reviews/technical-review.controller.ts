import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, TECHNICAL_REVIEWER, REVIEWER } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetTechnicalQueueUseCase } from './usecases/get-technical-queue.usecase';
import { StartTechnicalReviewUseCase } from './usecases/start-technical-review.usecase';
import { SaveTechnicalReviewDraftUseCase } from './usecases/save-technical-review.usecase';
import { SubmitTechnicalReviewUseCase } from './usecases/submit-technical-review.usecase';
import { ReturnTechnicalReviewUseCase } from './usecases/return-technical-review.usecase';
import { UploadTechnicalAttachmentUseCase } from './usecases/upload-attachment.usecase';
import { GetAttachmentUrlUseCase } from './usecases/get-attachment-url.usecase';
import { SaveTechnicalReviewDto, SubmitTechnicalReviewDto, ReturnTechnicalReviewDto } from './dto/technical-review.dto';

@ApiTags('Technical Reviewer Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'technical-reviews' })
export class TechnicalReviewController {
  constructor(
    private readonly getQueueUseCase: GetTechnicalQueueUseCase,
    private readonly startUseCase: StartTechnicalReviewUseCase,
    private readonly saveUseCase: SaveTechnicalReviewDraftUseCase,
    private readonly submitUseCase: SubmitTechnicalReviewUseCase,
    private readonly returnUseCase: ReturnTechnicalReviewUseCase,
    private readonly uploadUseCase: UploadTechnicalAttachmentUseCase,
    private readonly getUrlUseCase: GetAttachmentUrlUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER, REVIEWER)
  async getQueue(@Res() res, @Query() query: PaginateDto & { status?: string }) {
    try {
      const logged = res.locals.logged;
      const result = await this.getQueueUseCase.paginate(query.page, query.limit, logged, query.status);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[TechnicalReview] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER, REVIEWER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.getQueueUseCase.findOne(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[TechnicalReview] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  async startReview(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.startUseCase.execute(id, logged);
      return respond(res, 200, true, 'Review teknis dimulai', data);
    } catch (error) {
      logger.error('[TechnicalReview] START ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/save')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  async saveDraft(@Res() res, @Param('id') id: string, @Body() dto: SaveTechnicalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.saveUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Draft review berhasil disimpan', data);
    } catch (error) {
      logger.error('[TechnicalReview] SAVE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  async submitReview(@Res() res, @Param('id') id: string, @Body() dto: SubmitTechnicalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.submitUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review teknis berhasil di-submit', data);
    } catch (error) {
      logger.error('[TechnicalReview] SUBMIT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/return')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  async returnReview(@Res() res, @Param('id') id: string, @Body() dto: ReturnTechnicalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.returnUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review teknis dikembalikan ke PO', data);
    } catch (error) {
      logger.error('[TechnicalReview] RETURN ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/attachments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        is_private: { type: 'boolean', default: false },
        section_id: { type: 'string', format: 'uuid' },
        criteria_id: { type: 'string', format: 'uuid' },
      },
    },
  })
  async uploadAttachment(
    @Res() res,
    @Req() req: any,
    @Param('id') assessmentId: string,
  ) {
    try {
      const logged = res.locals.logged;
      const data = await req.file();
      if (!data) {
        throw new Error('File tidak ditemukan dalam request');
      }

      // Buffer approach for MinIO
      const buffer = await data.toBuffer();
      const is_private = data.fields?.is_private?.value === 'true';
      
      const result = await this.uploadUseCase.execute(
        assessmentId,
        {
          buffer,
          originalname: data.filename,
          mimetype: data.mimetype,
        },
        logged,
        is_private,
        data.fields?.section_id?.value,
        data.fields?.criteria_id?.value,
      );

      return respond(res, 200, true, 'Lampiran berhasil diunggah', result);
    } catch (error) {
      logger.error('[TechnicalReview] UPLOAD ATTACHMENT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':assessmentId/attachments/:attachmentId/url')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(TECHNICAL_REVIEWER)
  async getAttachmentUrl(
    @Res() res,
    @Param('assessmentId') assessmentId: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    try {
      const logged = res.locals.logged;
      const data = await this.getUrlUseCase.execute(attachmentId, logged);
      return respond(res, 200, true, 'Link akses lampiran berhasil didapatkan', data);
    } catch (error) {
      logger.error('[TechnicalReview] GET ATTACHMENT URL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
