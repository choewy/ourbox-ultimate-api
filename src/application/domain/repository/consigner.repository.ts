import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, Repository } from 'typeorm';

import { SnapshotRepository } from './snapshot.repository';
import { Consigner } from '../entity/consigner.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class ConsignerRepository extends Repository<Consigner> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Consigner, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: { partner: true },
      where: { id },
    });
  }

  async findManyAndCount(partnerId = null, skip: number, take: number) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: partnerId ? Equal(partnerId) : undefined },
      skip,
      take,
    });
  }

  async insertOne(executor: User, value: Partial<Consigner>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Consigner).insert(target);
      await SnapshotRepository.ofEntityManager(em).forInsert(executor, target);
    });
  }

  async updateOne(executor: User, target: Consigner, value: Partial<Consigner>) {
    return this.datatSource.transaction(async (em) => {
      await SnapshotRepository.ofEntityManager(em).forUpdate(executor, target, value);
      await em.getRepository(Consigner).update(target.id, value);
    });
  }

  async deleteOne(executor: User, target: Consigner) {
    return this.datatSource.transaction(async (em) => {
      await SnapshotRepository.ofEntityManager(em).forDelete(executor, target);
      await em.getRepository(Consigner).softDelete(target.id);
    });
  }
}
