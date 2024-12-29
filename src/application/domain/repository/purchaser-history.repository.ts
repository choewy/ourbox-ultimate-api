import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { PurchaserHistory } from '../entity/purchaser-history.entity';

@Injectable()
export class PurchaserHistoryRepository extends Repository<PurchaserHistory> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(PurchaserHistory, entityManager ?? datatSource.createEntityManager());
  }

  async findMany(targetId: string) {
    return super.find({
      relations: { executor: true },
      where: { targetId },
    });
  }
}
