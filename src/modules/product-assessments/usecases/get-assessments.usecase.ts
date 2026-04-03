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
      .where('product.owner_id = :ownerId', { ownerId: logged.id });

    if (status) {
      queryBuilder.andWhere('pa.overall_status = :status', { status });
    }

    const [data, total] = await queryBuilder
      .orderBy('pa.created_at', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // Summary counts for dashboard
    const counts = await this.repository.createQueryBuilder('pa')
      .leftJoin('pa.product', 'product')
      .select('pa.overall_status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('product.owner_id = :ownerId', { ownerId: logged.id })
      .groupBy('pa.overall_status')
      .getRawMany();

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

    // Security check: only owner can see their assessment
    if (data.product.owner_id !== logged.id) {
       throw new Error('Anda tidak memiliki akses ke assessment ini');
    }

    return data;
  }
}
