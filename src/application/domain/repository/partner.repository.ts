import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

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

  async deleteOneById(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ partnerId: id }, { partner: null, partnerChannel: null });
      await em.getRepository(PartnerChannel).softDelete({ partnerId: id });
      await em.getRepository(Partner).softDelete({ id });
    });
  }
}
