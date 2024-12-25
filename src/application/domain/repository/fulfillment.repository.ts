import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { Fulfillment } from '../entity/fulfillment.entity';

@Injectable()
export class FulfillmentRepository extends Repository<Fulfillment> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Fulfillment, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      where: { id },
    });
  }
}
