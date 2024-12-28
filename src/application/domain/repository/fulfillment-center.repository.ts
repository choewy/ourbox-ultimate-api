import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { FulfillmentCenter } from '../entity/fulfillment-center.entity';
import { User } from '../entity/user.entity';

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

  async hasById(id: string) {
    const fulfillment = await this.findOne({
      select: { id: true },
      where: { id },
    });

    return !!fulfillment?.id;
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

  async deleteOneById(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ fulfillmentCenterId: id }, { fulfillmentCenter: null });
      await em.getRepository(FulfillmentCenter).softDelete(id);
    });
  }
}
