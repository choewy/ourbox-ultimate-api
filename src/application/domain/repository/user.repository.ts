import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { SnapshotRepository } from './snapshot.repository';
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
        partnerChannel: { partner: true },
        fulfillment: true,
        fulfillmentCenter: { fulfillment: true },
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

  async findManyAndCount(skip: number, take: number) {
    return this.findAndCount({
      relations: {
        partner: true,
        partnerChannel: { partner: true },
        fulfillment: true,
        fulfillmentCenter: { fulfillment: true },
      },
      skip,
      take,
    });
  }

  async insertOne(executor: User, value: Partial<User>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).insert(target);
      await SnapshotRepository.ofEntityManager(em).forInsert(executor, target);
    });
  }

  async updateOne(executor: User, target: User, value: Partial<User>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update(target.id, value);
      await SnapshotRepository.ofEntityManager(em).forUpdate(executor, target, value);
    });
  }

  async deleteOne(executor: User, target: User) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).softDelete(target.id);
      await SnapshotRepository.ofEntityManager(em).forDelete(executor, target);
    });
  }
}
