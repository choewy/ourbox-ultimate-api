import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { ProductHistory } from '../entity/product-history.entity';

@Injectable()
export class ProductHistoryRepository extends Repository<ProductHistory> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(ProductHistory, entityManager ?? datatSource.createEntityManager());
  }

  async findMany(targetId: string) {
    return super.find({
      relations: { executor: true },
      where: { targetId },
    });
  }
}
