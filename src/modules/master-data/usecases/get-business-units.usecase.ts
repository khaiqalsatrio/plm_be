import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MasterBusinessUnit } from 'src/entities/master-business-unit.entity';

@Injectable()
export class GetBusinessUnitsUseCase {
  constructor(
    @InjectRepository(MasterBusinessUnit)
    private readonly buRepo: Repository<MasterBusinessUnit>,
  ) {}

  async execute(): Promise<MasterBusinessUnit[]> {
    return await this.buRepo.find({
      where: { is_active: true },
      order: { name: 'ASC' },
    });
  }
}
