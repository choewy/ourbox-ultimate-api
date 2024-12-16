import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { PartnerChannel } from '../entity/partner-channel.entity';

@Injectable()
export class PartnerChannelRepository extends Repository<PartnerChannel> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(PartnerChannel, entityManager ?? datatSource.createEntityManager());
  }
}
