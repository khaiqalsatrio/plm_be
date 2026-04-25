import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MasterRiskLevel } from 'src/entities/master-risk-level.entity';

@Injectable()
export class GetRiskLevelsUseCase {
  constructor(
    @InjectRepository(MasterRiskLevel)
    private readonly riskLevelRepo: Repository<MasterRiskLevel>,
  ) {}

  async execute() {
    return this.riskLevelRepo.find({
      order: {
        score_min: 'ASC',
      },
    });
  }
}
