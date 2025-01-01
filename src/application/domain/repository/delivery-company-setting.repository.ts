import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, EntityManager, Repository } from 'typeorm';

import { DeliveryCompanySetting } from '../entity/delivery-company-setting.entity';
import { CjSetting } from '../entity/delivery-company-settings/cj-setting.entity';
import { HanjinSetting } from '../entity/delivery-company-settings/hanjin-setting.entity';
import { LotteSetting } from '../entity/delivery-company-settings/lotte-setting.entity';
import { TeamfreshSetting } from '../entity/delivery-company-settings/teamfresh-setting.entity';

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
        select: {
          id: true,
          fulfillmentCenterId: true,
          deliveryCompanyId: true,
        },
        where: { fulfillmentCenterId, deliveryCompanyId },
      })
    )?.id;
  }

  async findManyByFulfillmentCenterId(fulfillmentCenterId: string) {
    return super.find({
      relations: {
        deliveryCompany: true,
        hanjinSetting: true,
        cjSetting: true,
        lotteSetting: true,
        teamfreshSetting: true,
      },
      where: { fulfillmentCenterId },
    });
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

  async insertOne({ hanjinSetting, cjSetting, lotteSetting, teamfreshSetting, ...value }: DeepPartial<DeliveryCompanySetting>) {
    const target = this.create(value);

    return this.datatSource.transaction(async (em) => {
      await em.getRepository(DeliveryCompanySetting).insert(target);

      if (hanjinSetting) {
        hanjinSetting.deliveryCompanySettingId = target.id;
        await em.getRepository(HanjinSetting).insert(hanjinSetting);
      }

      if (cjSetting) {
        cjSetting.deliveryCompanySettingId = target.id;
        await em.getRepository(CjSetting).insert(cjSetting);
      }

      if (lotteSetting) {
        lotteSetting.deliveryCompanySettingId = target.id;
        await em.getRepository(LotteSetting).insert(lotteSetting);
      }

      if (teamfreshSetting) {
        teamfreshSetting.deliveryCompanySettingId = target.id;
        await em.getRepository(TeamfreshSetting).insert(teamfreshSetting);
      }
    });
  }

  async updateOne(id: string, { hanjinSetting, cjSetting, lotteSetting, teamfreshSetting, ...value }: DeepPartial<DeliveryCompanySetting>) {
    return this.datatSource.transaction(async (em) => {
      if (Object.values(value).some((value) => !!value)) {
        await em.getRepository(DeliveryCompanySetting).update(id, value);
      }

      if (hanjinSetting) {
        await em.getRepository(HanjinSetting).update({ deliveryCompanySettingId: id }, hanjinSetting);
      }

      if (cjSetting) {
        await em.getRepository(CjSetting).update({ deliveryCompanySettingId: id }, cjSetting);
      }

      if (lotteSetting) {
        await em.getRepository(LotteSetting).update({ deliveryCompanySettingId: id }, lotteSetting);
      }

      if (teamfreshSetting) {
        await em.getRepository(TeamfreshSetting).update({ deliveryCompanySettingId: id }, teamfreshSetting);
      }
    });
  }

  async deleteOne(id: string) {
    return this.datatSource.transaction(async (em) => {
      await em.getRepository(DeliveryCompanySetting).softDelete({ id });
      await em.getRepository(HanjinSetting).softDelete({ deliveryCompanySettingId: id });
      await em.getRepository(CjSetting).softDelete({ deliveryCompanySettingId: id });
      await em.getRepository(LotteSetting).softDelete({ deliveryCompanySettingId: id });
      await em.getRepository(TeamfreshSetting).softDelete({ deliveryCompanySettingId: id });
    });
  }
}
