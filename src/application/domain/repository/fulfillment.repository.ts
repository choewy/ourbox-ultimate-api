import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { HistoryAction } from '../constant/enums';
import { FulfillmentCenter } from '../entity/fulfillment-center.entity';
import { FulfillmentHistory } from '../entity/fulfillment-history.entity';
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
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
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

  async insertOne(executor: User, value: Partial<Fulfillment>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Fulfillment).insert(target);
      await em.getRepository(FulfillmentHistory).insert(new FulfillmentHistory(HistoryAction.Insert, executor, target));
    });
  }

  async updateOne(executor: User, target: Fulfillment, value: Partial<Fulfillment>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Fulfillment).update(target.id, value);
      await em.getRepository(FulfillmentHistory).insert(new FulfillmentHistory(HistoryAction.Update, executor, target, value));
    });
  }

  async deleteOne(executor: User, target: Fulfillment) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ fulfillmentId: target.id }, { fulfillment: null, fulfillmentCenter: null });
      await em.getRepository(FulfillmentCenter).softDelete({ fulfillmentId: target.id });
      await em.getRepository(Fulfillment).softDelete(target.id);
      await em.getRepository(FulfillmentHistory).insert(new FulfillmentHistory(HistoryAction.Delete, executor, target));
    });
  }
}
