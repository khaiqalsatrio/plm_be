import { Controller, Get, Post, Body, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { JWT_ACCESS_TOKEN, PRODUCT_OWNER } from 'src/common/constant/constant';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { respond } from 'src/libraries/respond';

@ApiTags('Assessment Comments')
@ApiBearerAuth(JWT_ACCESS_TOKEN)
@Controller({ version: '1', path: 'product-assessments/:assessmentId/comments' })
export class AssessmentCommentController {
  @Post()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async create(@Res() res, @Param('assessmentId') assessmentId: string, @Body() dto: any) {
    return respond(res, HttpStatus.OK, true, 'Placeholder: Fitur Komentar akan segera hadir');
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(PRODUCT_OWNER)
  async findAll(@Res() res, @Param('assessmentId') assessmentId: string) {
    return respond(res, HttpStatus.OK, true, 'Placeholder: List Komentar akan segera hadir', []);
  }
}
