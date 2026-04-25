import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AssessmentTemplate } from 'src/entities/assessment-template.entity';
import { MasterBusinessUnit } from 'src/entities/master-business-unit.entity';
import { MasterProductCategory } from 'src/entities/master-product-category.entity';
import { MasterRiskLevel } from 'src/entities/master-risk-level.entity';

import { MasterDataController } from './master-data.controller';
import { GetBusinessUnitsUseCase } from './usecases/get-business-units.usecase';
import { GetProductCategoriesUseCase } from './usecases/get-product-categories.usecase';
import { GetRiskLevelsUseCase } from './usecases/get-risk-levels.usecase';
import { GetTemplateDetailUseCase } from './usecases/get-template-detail.usecase';
import { GetTemplatesUseCase } from './usecases/get-templates.usecase';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterBusinessUnit,
      MasterProductCategory,
      AssessmentTemplate,
      MasterRiskLevel,
    ]),
    AuthModule,
  ],
  providers: [
    GetBusinessUnitsUseCase,
    GetProductCategoriesUseCase,
    GetTemplatesUseCase,
    GetTemplateDetailUseCase,
    GetRiskLevelsUseCase,
  ],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
