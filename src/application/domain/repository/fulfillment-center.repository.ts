import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { SnapshotRepository } from './snapshot.repository';
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
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
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

  async insertOne(executor: User, value: Partial<FulfillmentCenter>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(FulfillmentCenter).insert(target);
      await SnapshotRepository.ofEntityManager(em).forInsert(executor, target);
    });
  }

  async updateOne(executor: User, target: FulfillmentCenter, value: Partial<FulfillmentCenter>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(FulfillmentCenter).update(target.id, value);
      await SnapshotRepository.ofEntityManager(em).forUpdate(executor, target, value);
    });
  }

  async deleteOne(executor: User, target: FulfillmentCenter) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ fulfillmentCenterId: target.id }, { fulfillmentCenter: null });
      await em.getRepository(FulfillmentCenter).softDelete(target.id);
      await SnapshotRepository.ofEntityManager(em).forDelete(executor, target);
    });
  }
}
