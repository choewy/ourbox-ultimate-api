import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { FulfillmentCenter } from '../entity/fulfillment-center.entity';

@Injectable()
export class FulfillmentCenterRepository extends Repository<FulfillmentCenter> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(FulfillmentCenter, entityManager ?? datatSource.createEntityManager());
  }

  async hasKey(fulfillmentId: string, code: string) {
    return this.existsBy({ fulfillmentId, code });
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: { fulfillment: true },
      where: { id },
    });
  }

  async findManyAndCount(skip: number, take: number, fulfillmentId = null) {
    return this.findAndCount({
      relations: { fulfillment: true },
      where: { fulfillmentId: Or(IsNull(), Equal(fulfillmentId)) },
      skip,
      take,
    });
  }
}
