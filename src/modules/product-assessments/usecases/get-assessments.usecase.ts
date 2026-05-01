import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggedDto } from 'src/common/dtos/logged.dto';
import { ProductAssessment } from 'src/entities/product-assessment.entity';

@Injectable()
export class GetAssessmentsUseCase {
  constructor(
    @InjectRepository(ProductAssessment)
    private readonly repository: Repository<ProductAssessment>,
  ) {}

  async paginate(page: number, limit: number, logged: LoggedDto, status?: string) {
    const take = Number(limit) || 10;
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * take;

    const queryBuilder = this.repository.createQueryBuilder('pa')
      .leftJoinAndSelect('pa.product', 'product')
      .leftJoinAndSelect('product.owner', 'owner')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.business_unit', 'bu');

    // Filter by role
    const isOwner = logged.role === 'product_owner';
    const isInternal = ['approver', 'product_manager', 'business_owner', 'technical_reviewer', 'legal_reviewer', 'business_reviewer'].includes(logged.role);

    if (isOwner) {
      queryBuilder.where('product.owner_id = :ownerId', { ownerId: logged.id });
    } else if (isInternal) {
      // Internal roles can see assessments that are submitted or in review
      // For Approvers, they primarily care about 'submitted' (ready for decision)
      queryBuilder.where('pa.overall_status IN (:...statuses)', { 
        statuses: ['submitted', 'in_review', 'approved', 'rejected'] 
      });
    }

    if (status) {
      queryBuilder.andWhere('pa.overall_status = :status', { status });
    }

    const [data, total] = await queryBuilder
      .orderBy('pa.created_at', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // Summary counts for dashboard
    const countQuery = this.repository.createQueryBuilder('pa')
      .leftJoin('pa.product', 'product')
      .select('pa.overall_status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('pa.overall_status');

    if (isOwner) {
      countQuery.where('product.owner_id = :ownerId', { ownerId: logged.id });
    } else if (isInternal) {
      countQuery.where('pa.overall_status IN (:...statuses)', { 
        statuses: ['submitted', 'in_review', 'approved', 'rejected'] 
      });
    }

    const counts = await countQuery.getRawMany();

    const summary: any = { total };
    counts.forEach((c) => {
      summary[c.status] = parseInt(c.count);
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        summary,
      },
    };
  }

  async findOne(id: string, logged: LoggedDto) {
    const data = await this.repository.findOne({
      where: { id },
      relations: [
        'product',
        'product.category',
        'product.business_unit',
        'product.owner',
        'responses',
        'reviews',
        'approvals',
        'attachments',
        'comments',
        'audit_logs',
      ],
    });

    if (!data) {
      throw new Error('Assessment tidak ditemukan');
    }

    // Security check: owner, reviewers, or approvers can see
    const isOwner = data.product.owner_id === logged.id;
    const isReviewerOrApprover = ['reviewer', 'technical_reviewer', 'legal_reviewer', 'business_reviewer', 'approver', 'product_manager'].includes(logged.role);
    
    if (!isOwner && !isReviewerOrApprover) {
       throw new Error('Anda tidak memiliki akses ke assessment ini');
    }

    return data;
  }
}
