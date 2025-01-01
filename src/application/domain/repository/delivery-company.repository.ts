import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { DeliveryCompanyCode } from '../constant/enums';
import { DeliveryCompany } from '../entity/delivery-company.entity';

@Injectable()
export class DeliveryCompanyRepository extends Repository<DeliveryCompany> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(DeliveryCompany, entityManager ?? datatSource.createEntityManager());
  }

  async hasByCode(code: DeliveryCompanyCode) {
    return !!(await super.findOne({ select: { code: true }, where: { code } }))?.code;
  }
}
