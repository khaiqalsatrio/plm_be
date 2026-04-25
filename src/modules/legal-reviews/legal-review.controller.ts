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

import { JWT_ACCESS_TOKEN, LEGAL_REVIEWER, REVIEWER } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetLegalQueueUseCase } from './usecases/get-legal-queue.usecase';
import { StartLegalReviewUseCase } from './usecases/start-legal-review.usecase';
import { SaveLegalReviewUseCase } from './usecases/save-legal-review.usecase';
import { SubmitLegalReviewUseCase } from './usecases/submit-legal-review.usecase';
import { ReturnLegalReviewUseCase } from './usecases/return-legal-review.usecase';
import { UploadLegalAttachmentUseCase } from './usecases/upload-legal-attachment.usecase';
import { GetLegalAttachmentUrlUseCase } from './usecases/get-legal-attachment-url.usecase';
import { SaveLegalReviewDto, SubmitLegalReviewDto, ReturnLegalReviewDto } from './dto/legal-review.dto';

@ApiTags('Legal Reviewer Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'legal-reviews' })
export class LegalReviewController {
  constructor(
    private readonly getQueueUseCase: GetLegalQueueUseCase,
    private readonly startUseCase: StartLegalReviewUseCase,
    private readonly saveUseCase: SaveLegalReviewUseCase,
    private readonly submitUseCase: SubmitLegalReviewUseCase,
    private readonly returnUseCase: ReturnLegalReviewUseCase,
    private readonly uploadUseCase: UploadLegalAttachmentUseCase,
    private readonly getUrlUseCase: GetLegalAttachmentUrlUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER, REVIEWER)
  async getQueue(@Res() res, @Query() query: PaginateDto & { status?: string }) {
    try {
      const logged = res.locals.logged;
      const result = await this.getQueueUseCase.paginate(query.page, query.limit, logged, query.status);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[LegalReview] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER, REVIEWER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.getQueueUseCase.findOne(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[LegalReview] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  async startReview(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.startUseCase.execute(id, logged);
      return respond(res, 200, true, 'Review hukum dimulai', data);
    } catch (error) {
      logger.error('[LegalReview] START ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/save')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  async saveDraft(@Res() res, @Param('id') id: string, @Body() dto: SaveLegalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.saveUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Draft review hukum berhasil disimpan', data);
    } catch (error) {
      logger.error('[LegalReview] SAVE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  async submitReview(@Res() res, @Param('id') id: string, @Body() dto: SubmitLegalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.submitUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review hukum berhasil di-submit', data);
    } catch (error) {
      logger.error('[LegalReview] SUBMIT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/return')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  async returnReview(@Res() res, @Param('id') id: string, @Body() dto: ReturnLegalReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.returnUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review hukum dikembalikan ke PO', data);
    } catch (error) {
      logger.error('[LegalReview] RETURN ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/attachments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        is_private: { type: 'boolean', default: true },
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

      const buffer = await data.toBuffer();
      const is_private = data.fields?.is_private?.value !== 'false'; // Default to true for legal
      
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

      return respond(res, 200, true, 'Lampiran hukum berhasil diunggah', result);
    } catch (error) {
      logger.error('[LegalReview] UPLOAD ATTACHMENT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':assessmentId/attachments/:attachmentId/url')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(LEGAL_REVIEWER)
  async getAttachmentUrl(
    @Res() res,
    @Param('assessmentId') assessmentId: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    try {
      const logged = res.locals.logged;
      const data = await this.getUrlUseCase.execute(attachmentId, logged);
      return respond(res, 200, true, 'Link akses lampiran hukum berhasil didapatkan', data);
    } catch (error) {
      logger.error('[LegalReview] GET ATTACHMENT URL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
