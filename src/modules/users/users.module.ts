import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from 'src/entities/category.entity';

import { CreateUserUseCase } from './usecases/create-user.usecase';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { GetUserUseCase } from './usecases/get-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { UsersController } from './users.controller';
import { User } from '../../entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { ProductAssessment } from 'src/entities/product-assessment.entity';
import { AssessmentReview } from 'src/entities/assessment-review.entity';
import { AssessmentAttachment } from 'src/entities/assessment-attachment.entity';
import { AssessmentApproval } from 'src/entities/assessment-approval.entity';
import { AssessmentComment } from 'src/entities/assessment-comment.entity';
import { AssessmentAuditLog } from 'src/entities/assessment-audit-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, 
      Category,
      Product,
      ProductAssessment,
      AssessmentReview,
      AssessmentAttachment,
      AssessmentApproval,
      AssessmentComment,
      AssessmentAuditLog
    ])
  ],
  providers: [CreateUserUseCase, GetUserUseCase, UpdateUserUseCase, DeleteUserUseCase],
  controllers: [UsersController],
})
export class UsersModule {}
