import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

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

  async deleteOneById(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(User).update({ partnerChannelId: id }, { partnerChannel: null });
      await em.getRepository(PartnerChannel).softDelete({ id });
    });
  }
}
