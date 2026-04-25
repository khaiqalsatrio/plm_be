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

import { JWT_ACCESS_TOKEN, BUSINESS_REVIEWER, REVIEWER } from 'src/common/constant/constant';
import MessageHandler from 'src/common/message';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { PaginateDto } from 'src/libraries/common/search.dto';
import logger from 'src/libraries/logger';
import { respond } from 'src/libraries/respond';

import { GetBusinessQueueUseCase } from 'src/modules/business-reviews/usecases/get-business-queue.usecase';
import { StartBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/start-business-review.usecase';
import { SaveBusinessReviewDraftUseCase } from 'src/modules/business-reviews/usecases/save-business-review.usecase';
import { SubmitBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/submit-business-review.usecase';
import { ReturnBusinessReviewUseCase } from 'src/modules/business-reviews/usecases/return-business-review.usecase';
import { UploadBusinessAttachmentUseCase } from 'src/modules/business-reviews/usecases/upload-business-attachment.usecase';
import { GetAttachmentUrlUseCase } from 'src/modules/business-reviews/usecases/get-attachment-url.usecase';
import { SaveBusinessReviewDto, SubmitBusinessReviewDto, ReturnBusinessReviewDto } from 'src/modules/business-reviews/dto/business-review.dto';

@ApiTags('Business Reviewer Workspace')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'business-reviews' })
export class BusinessReviewController {
  constructor(
    private readonly getQueueUseCase: GetBusinessQueueUseCase,
    private readonly startUseCase: StartBusinessReviewUseCase,
    private readonly saveUseCase: SaveBusinessReviewDraftUseCase,
    private readonly submitUseCase: SubmitBusinessReviewUseCase,
    private readonly returnUseCase: ReturnBusinessReviewUseCase,
    private readonly uploadUseCase: UploadBusinessAttachmentUseCase,
    private readonly getUrlUseCase: GetAttachmentUrlUseCase,
  ) {}

  @Get('queue')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER, REVIEWER)
  async getQueue(@Res() res, @Query() query: PaginateDto & { status?: string }) {
    try {
      const logged = res.locals.logged;
      const result = await this.getQueueUseCase.paginate(query.page, query.limit, logged, query.status);
      return respond(res, 200, true, MessageHandler.SUC000, result.data, result.meta);
    } catch (error) {
      logger.error('[BusinessReview] GET QUEUE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER, REVIEWER)
  async getDetail(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.getQueueUseCase.findOne(id, logged);
      return respond(res, 200, true, MessageHandler.SUC000, data);
    } catch (error) {
      logger.error('[BusinessReview] GET DETAIL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/start')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
  async startReview(@Res() res, @Param('id') id: string) {
    try {
      const logged = res.locals.logged;
      const data = await this.startUseCase.execute(id, logged);
      return respond(res, 200, true, 'Review bisnis dimulai', data);
    } catch (error) {
      logger.error('[BusinessReview] START ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/save')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
  async saveDraft(@Res() res, @Param('id') id: string, @Body() dto: SaveBusinessReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.saveUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Draft review bisnis berhasil disimpan', data);
    } catch (error) {
      logger.error('[BusinessReview] SAVE ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
  async submitReview(@Res() res, @Param('id') id: string, @Body() dto: SubmitBusinessReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.submitUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review bisnis berhasil di-submit', data);
    } catch (error) {
      logger.error('[BusinessReview] SUBMIT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/return')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
  async returnReview(@Res() res, @Param('id') id: string, @Body() dto: ReturnBusinessReviewDto) {
    try {
      const logged = res.locals.logged;
      const data = await this.returnUseCase.execute(id, dto, logged);
      return respond(res, 200, true, 'Review bisnis dikembalikan ke PO', data);
    } catch (error) {
      logger.error('[BusinessReview] RETURN ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Post(':id/attachments')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
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

      return respond(res, 200, true, 'Lampiran bisnis berhasil diunggah', result);
    } catch (error) {
      logger.error('[BusinessReview] UPLOAD ATTACHMENT ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }

  @Get(':assessmentId/attachments/:attachmentId/url')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(BUSINESS_REVIEWER)
  async getAttachmentUrl(
    @Res() res,
    @Param('assessmentId') assessmentId: string,
    @Param('attachmentId') attachmentId: string,
  ) {
    try {
      const logged = res.locals.logged;
      const data = await this.getUrlUseCase.execute(attachmentId, logged);
      return respond(res, 200, true, 'Link akses lampiran bisnis berhasil didapatkan', data);
    } catch (error) {
      logger.error('[BusinessReview] GET ATTACHMENT URL ERROR', error);
      return respond(res, 400, false, error.message || MessageHandler.ERR000);
    }
  }
}
