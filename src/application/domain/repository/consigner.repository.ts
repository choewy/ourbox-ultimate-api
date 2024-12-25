import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Equal, IsNull, Or, Repository } from 'typeorm';

import { Consigner } from '../entity/consigner.entity';

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

  async findManyAndCount(partnerId = null, skip = 0, take = 20) {
    return this.findAndCount({
      relations: { partner: true },
      where: { partnerId: Or(IsNull(), Equal(partnerId)) },
      skip,
      take,
    });
  }
}
