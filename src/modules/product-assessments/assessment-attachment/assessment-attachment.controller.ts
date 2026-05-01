import { Controller, Get, Post, Param, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, PRODUCT_OWNER } from 'src/common/constant/constant';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { respond } from 'src/libraries/respond';
import { UploadAttachmentUseCase } from 'src/modules/product-assessments/assessment-attachment/usecases/upload-attachment.usecase';

@ApiTags('Assessment Attachments')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'product-assessments/:assessmentId/attachments' })
export class AssessmentAttachmentController {
  constructor(private readonly uploadUseCase: UploadAttachmentUseCase) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        is_private: { type: 'boolean', default: false },
      },
    },
  })
  async upload(
    @Res() res,
    @Req() req: any,
    @Param('assessmentId') assessmentId: string,
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
      );

      return respond(res, HttpStatus.OK, true, 'Lampiran berhasil diunggah', result);
    } catch (error) {
      return respond(res, HttpStatus.BAD_REQUEST, false, error.message);
    }
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async findAll(@Res() res, @Param('assessmentId') assessmentId: string) {
    try {
      const logged = res.locals.logged;
      const result = await this.uploadUseCase.findAll(assessmentId, logged);
      return respond(res, HttpStatus.OK, true, 'Daftar lampiran berhasil diambil', result);
    } catch (error) {
      return respond(res, HttpStatus.BAD_REQUEST, false, error.message);
    }
  }
}
