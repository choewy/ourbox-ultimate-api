import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { FulfillmentCenter } from '../entity/fulfillment-center.entity';
import { Fulfillment } from '../entity/fulfillment.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class FulfillmentRepository extends Repository<Fulfillment> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Fulfillment, entityManager ?? datatSource.createEntityManager());
  }

  async hasById(id: string) {
    const fulfillment = await this.findOne({
      select: { id: true },
      where: { id },
    });

    return !!fulfillment?.id;
  }

  async findManyAndCount(skip: number, take: number) {
    return this.findAndCount({
      skip,
      take,
    });
  }

  async findOneById(id: string) {
    return this.findOne({ where: { id } });
  }

  async deleteOneById(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ fulfillmentId: id }, { fulfillment: null });
      await em.getRepository(FulfillmentCenter).softDelete({ fulfillmentId: id });
      await em.getRepository(Fulfillment).softDelete({ id });
    });
  }
}
