import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { SnapshotRepository } from './snapshot.repository';
import { PartnerChannel } from '../entity/partner-channel.entity';
import { User } from '../entity/user.entity';

@Injectable()
export class PartnerChannelRepository extends Repository<PartnerChannel> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(PartnerChannel, entityManager ?? datatSource.createEntityManager());
  }

  async hasById(id: string) {
    return !!(await this.findOne({ select: { id: true }, where: { id } }))?.id;
  }

  async findManyAndCount(skip: number, take: number, partnerId = null) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: Or(IsNull(), Equal(partnerId)) },
      skip,
      take,
    });
  }

  async findOneById(id: string) {
    return this.findOne({ relations: { partner: true }, where: { id } });
  }

  async insertOne(executor: User, value: Partial<PartnerChannel>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(PartnerChannel).insert(value);
      await SnapshotRepository.ofEntityManager(em).forInsert(executor, target);
    });
  }

  async updateOne(executor: User, target: PartnerChannel, value: Partial<PartnerChannel>) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(PartnerChannel).update(target.id, value);
      await SnapshotRepository.ofEntityManager(em).forUpdate(executor, target);
    });
  }

  async deleteOne(executor: User, target: PartnerChannel) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ partnerChannelId: target.id }, { partnerChannel: null });
      await em.getRepository(PartnerChannel).softDelete(target.id);
      await SnapshotRepository.ofEntityManager(em).forDelete(executor, target);
    });
  }
}
