import {
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import Constant from './common/constant';
import { AssessmentApproval } from './entities/assessment-approval.entity';
import { AssessmentAttachment } from './entities/assessment-attachment.entity';
import { AssessmentAuditLog } from './entities/assessment-audit-log.entity';
import { AssessmentComment } from './entities/assessment-comment.entity';
import { AssessmentCriteria } from './entities/assessment-criteria.entity';
import { AssessmentQuestion } from './entities/assessment-question.entity';
import { AssessmentResponse } from './entities/assessment-response.entity';
import { AssessmentReview } from './entities/assessment-review.entity';
import { AssessmentSection } from './entities/assessment-section.entity';
import { AssessmentTemplate } from './entities/assessment-template.entity';
import { MasterAssessmentOption } from './entities/master-assessment-option.entity';
import { MasterBusinessUnit } from './entities/master-business-unit.entity';
import { MasterProductCategory } from './entities/master-product-category.entity';
import { MasterRiskLevel } from './entities/master-risk-level.entity';
import { ProductAssessment } from './entities/product-assessment.entity';
import { Product } from './entities/product.entity';
import { RevokedToken } from './entities/revoked-token.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApproverModule } from './modules/approvers/approver.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessOwnerModule } from './modules/business-owners/business-owner.module';
import { BusinessReviewModule } from './modules/business-reviews/business-review.module';
import { CategoryModule } from './modules/categories/category.module';
import { LegalReviewModule } from './modules/legal-reviews/legal-review.module';
import { MasterDataModule } from './modules/master-data/master-data.module';
import { MenuModule } from './modules/menus/menu.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { ProductAssessmentModule } from './modules/product-assessments/product-assessment.module';
import { ProductManagerModule } from './modules/product-managers/product-manager.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { PublicModule } from './modules/public/public.module';
import { RoleModule } from './modules/roles/role.module';
import { TechnicalReviewModule } from './modules/technical-reviews/technical-review.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
        ttl: Constant.RATE_LIMIT_WINDOW_MS,
        limit: Constant.RATE_LIMIT_MAX_ATTEMPTS,
    }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constant.DB_HOST,
      port: Constant.DB_PORT,
      username: Constant.DB_USER,
      password: Constant.DB_PASSWORD,
      database: Constant.DB_NAME,
      autoLoadEntities: true,
      synchronize: Constant.DB_SYNCHRONIZE,
    }),
    TypeOrmModule.forFeature([
      RevokedToken,
      Product,
      ProductAssessment,
      AssessmentTemplate,
      AssessmentSection,
      AssessmentCriteria,
      AssessmentQuestion,
      AssessmentResponse,
      AssessmentReview,
      AssessmentApproval,
      AssessmentAttachment,
      AssessmentComment,
      AssessmentAuditLog,
      MasterProductCategory,
      MasterBusinessUnit,
      MasterRiskLevel,
      MasterAssessmentOption,
    ]),
    UsersModule,
    PublicModule,
    CategoryModule,
    MenuModule,
    NotificationModule,
    PermissionModule,
    RoleModule,
    ProfileModule,
    AuthModule,
    MasterDataModule,
    TechnicalReviewModule,
    BusinessReviewModule,
    LegalReviewModule,
    ProductManagerModule,
    BusinessOwnerModule,
    ApproverModule,
    ProductAssessmentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}