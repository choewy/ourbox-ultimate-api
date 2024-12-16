import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { Purchaser } from '../entity/purchaser.entity';

@Injectable()
export class PurchaserRepository extends Repository<Purchaser> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(Purchaser, entityManager ?? datatSource.createEntityManager());
  }

  async findOneById(id: string) {
    return this.findOne({
      relations: { partner: true },
      where: { id },
    });
  }

  async findManyAndCountByPartnerId(partnerId: string, skip = 0, take = 20) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: Or(IsNull(), Equal(partnerId)) },
      skip,
      take,
    });
  }
}