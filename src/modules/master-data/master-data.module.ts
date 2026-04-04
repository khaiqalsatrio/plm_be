import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MasterBusinessUnit } from 'src/entities/master-business-unit.entity';
import { MasterProductCategory } from 'src/entities/master-product-category.entity';

import { MasterDataController } from './master-data.controller';
import { GetBusinessUnitsUseCase } from './usecases/get-business-units.usecase';
import { GetProductCategoriesUseCase } from './usecases/get-product-categories.usecase';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MasterBusinessUnit,
      MasterProductCategory,
    ]),
    AuthModule,
  ],
  providers: [
    GetBusinessUnitsUseCase,
    GetProductCategoriesUseCase,
  ],
  controllers: [MasterDataController],
})
export class MasterDataModule {}
