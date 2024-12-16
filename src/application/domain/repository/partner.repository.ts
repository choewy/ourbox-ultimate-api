import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { Partner } from '../entity/partner.entity';

@Injectable()
export class PartnerRepository extends Repository<Partner> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Partner, entityManager ?? datatSource.createEntityManager());
  }
}