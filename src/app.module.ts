import {
  Module,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
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
import { ProductAssessmentModule } from './modules/product-assessments/product-assessment.module';
import { AuthModule } from './modules/auth/auth.module';
import { MasterDataModule } from './modules/master-data/master-data.module';
import { CategoryModule } from './modules/categories/category.module';
import { MenuModule } from './modules/menus/menu.module';
import { NotificationModule } from './modules/notifications/notification.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { ProfileModule } from './modules/profiles/profile.module';
import { PublicModule } from './modules/public/public.module';
import { RoleModule } from './modules/roles/role.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Constant.DB_HOST,
      port: Constant.DB_PORT,
      username: Constant.DB_USER,
      password: Constant.DB_PASSWORD,
      database: Constant.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
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
    ProductAssessmentModule,
    AuthModule,
    MasterDataModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}