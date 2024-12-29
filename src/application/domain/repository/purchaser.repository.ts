import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, Repository } from 'typeorm';

import { HistoryAction } from '../constant/enums';
import { PurchaserHistory } from '../entity/purchaser-history.entity';
import { Purchaser } from '../entity/purchaser.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class PurchaserRepository extends Repository<Purchaser> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Purchaser, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({ where: { id } });
  }

  async findManyAndCount(partnerId = null, skip: number, take: number) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: partnerId ? Equal(partnerId) : undefined },
      skip,
      take,
    });
  }
  async insertOne(executor: User, value: Partial<Purchaser>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Purchaser).insert(target);
      await em.getRepository(PurchaserHistory).insert(new PurchaserHistory(HistoryAction.Insert, executor, target));
    });
  }

  async updateOne(executor: User, target: Purchaser, value: Partial<Purchaser>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Purchaser).update(target.id, value);
      await em.getRepository(PurchaserHistory).insert(new PurchaserHistory(HistoryAction.Update, executor, target, value));
    });
  }

  async deleteOne(executor: User, target: Purchaser) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Purchaser).softDelete(target.id);
      await em.getRepository(PurchaserHistory).insert(new PurchaserHistory(HistoryAction.Delete, executor, target));
    });
  }
}
