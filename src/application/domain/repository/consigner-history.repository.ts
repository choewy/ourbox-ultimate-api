import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { ConsignerHistory } from '../entity/consigner-history.entity';

@Injectable()
export class ConsignerHistoryRepository extends Repository<ConsignerHistory> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(ConsignerHistory, entityManager ?? datatSource.createEntityManager());
  }

  async findMany(targetId: string) {
    return super.find({
      relations: { executor: true },
      where: { targetId },
    });
  }
}
