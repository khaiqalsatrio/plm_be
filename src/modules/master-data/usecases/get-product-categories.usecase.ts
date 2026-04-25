import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MasterProductCategory } from 'src/entities/master-product-category.entity';

@Injectable()
export class GetProductCategoriesUseCase {
  constructor(
    @InjectRepository(MasterProductCategory)
    private readonly catRepo: Repository<MasterProductCategory>,
  ) {}

  async execute(): Promise<MasterProductCategory[]> {
    return await this.catRepo.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }
}
