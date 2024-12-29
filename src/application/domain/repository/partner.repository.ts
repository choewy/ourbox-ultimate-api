import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { SnapshotRepository } from './snapshot.repository';
import { PartnerChannel } from '../entity/partner-channel.entity';
import { Partner } from '../entity/partner.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class PartnerRepository extends Repository<Partner> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Partner, entityManager ?? datatSource.createEntityManager());
  }

  async hasById(id: string) {
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
  }

  async findManyAndCount(skip: number, take: number) {
    return this.findAndCount({ skip, take });
  }

  async findOneById(id: string) {
    return this.findOne({ where: { id } });
  }

  async insertOne(executor: User, value: Partial<Partner>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Partner).insert(target);
      await SnapshotRepository.ofEntityManager(em).forInsert(executor, target);
    });
  }

  async updateOne(executor: User, target: Partner, value: Partial<Partner>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(Partner).update(target.id, value);
      await SnapshotRepository.ofEntityManager(em).forUpdate(executor, target, value);
    });
  }

  async deleteOne(executor: User, target: Partner) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ partnerId: target.id }, { partner: null, partnerChannel: null });
      await em.getRepository(PartnerChannel).softDelete({ partnerId: target.id });
      await em.getRepository(Partner).softDelete(target.id);
      await SnapshotRepository.ofEntityManager(em).forDelete(executor, target);
    });
  }
}
