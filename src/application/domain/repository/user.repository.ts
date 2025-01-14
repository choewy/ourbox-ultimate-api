import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { HistoryAction } from '../constant/enums';
import { UserHistory } from '../entity/user-history.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(User, entityManager ?? datatSource.createEntityManager());
  }

  async hasById(id: string) {
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: {
        partner: true,
        partnerChannel: true,
        fulfillment: true,
        fulfillmentCenter: true,
      },
      where: { id },
    });
  }

  async findOneByEmail(email: string) {
    return this.findOne({ where: { email } });
  }

  async hasEmail(email: string) {
    return this.existsBy({ email });
  }

  async insertOne(executor: User, value: Partial<User>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).save(target);
      await em.getRepository(UserHistory).insert(new UserHistory(HistoryAction.Insert, executor, target));
    });
  }

  async updateOne(executor: User, target: User, value: Partial<User>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update(target.id, value);
      await em.getRepository(UserHistory).insert(new UserHistory(HistoryAction.Update, executor, target, value));
    });
  }

  async deleteOne(executor: User, target: User) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).softDelete(target.id);
      await em.getRepository(UserHistory).insert(new UserHistory(HistoryAction.Delete, executor, target));
    });
  }
}
