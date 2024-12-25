import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { PartnerChannel } from '../entity/partner-channel.entity';

@Injectable()
export class PartnerChannelRepository extends Repository<PartnerChannel> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(PartnerChannel, entityManager ?? datatSource.createEntityManager());
  }

  async findManyAndCount(partnerId = null, skip: number, take: number) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: Or(IsNull(), Equal(partnerId)) },
      skip,
      take,
    });
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: { partner: true },
      where: { id },
    });
  }
}
