import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { DeliveryCompanySetting } from '../entity/delivery-company-setting.entity';

@Injectable()
export class DeliveryCompanySettingRepository extends Repository<DeliveryCompanySetting> {
  constructor(
    readonly datatSource: DataSource,
    readonly entityManager?: EntityManager,
  ) {
    super(DeliveryCompanySetting, entityManager ?? datatSource.createEntityManager());
  }

  async hasByKey(fulfillmentCenterId: string, deliveryCompanyId: string) {
    return !!(
      await super.findOne({
        select: { fulfillmentCenterId: true, deliveryCompanyId: true },
        where: { fulfillmentCenterId, deliveryCompanyId },
      })
    )?.id;
  }

  async findOneById(id: string) {
    return super.findOne({
      relations: {
        deliveryCompany: true,
        hanjinSetting: true,
        cjSetting: true,
        lotteSetting: true,
        teamfreshSetting: true,
      },
      where: { id },
    });
  }
}
