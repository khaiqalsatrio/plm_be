import { Controller, Get, Post, Body, Param, UseGuards, Res, HttpStatus, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JWT_ACCESS_TOKEN, PRODUCT_OWNER } from 'src/common/constant/constant';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { respond } from 'src/libraries/respond';

@ApiTags('Assessment Attachments')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'product-assessments/:assessmentId/attachments' })
export class AssessmentAttachmentController {
  @Post()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  @ApiConsumes('multipart/form-data')
  async upload(@Res() res, @Req() req: any, @Param('assessmentId') assessmentId: string) {
    return respond(res, HttpStatus.OK, true, 'Placeholder: Upload Lampiran akan segera hadir');
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async findAll(@Res() res, @Param('assessmentId') assessmentId: string) {
    return respond(res, HttpStatus.OK, true, 'Placeholder: List Lampiran akan segera hadir', []);
  }
}
