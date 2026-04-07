import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { BusinessOwnerController } from './business-owner.controller';
import { GetBusinessOwnerQueueUseCase } from './usecases/get-business-owner-queue.usecase';
import { GetBusinessOwnerAssessmentDetailUseCase } from './usecases/get-business-owner-assessment-detail.usecase';
import { GetBusinessOwnerDashboardStatsUseCase } from './usecases/get-business-owner-dashboard-stats.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAssessment,
    ]),
  ],
  controllers: [BusinessOwnerController],
  providers: [
    GetBusinessOwnerQueueUseCase,
    GetBusinessOwnerAssessmentDetailUseCase,
    GetBusinessOwnerDashboardStatsUseCase,
  ],
})
export class BusinessOwnerModule {}
