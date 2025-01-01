import { ApiResponseProperty } from '@nestjs/swagger';

import { CjSettingDTO } from './cj-setting.dto';
import { DeliveryCompanyDTO } from './delivery-company.dto';
import { HanjinSettingDTO } from './hanjin-setting.dto';
import { LotteSettingDTO } from './lotte-setting.dto copy';
import { TeamfreshSettingDTO } from './teamfresh-setting.dto';

import { DeliveryCompanySetting } from '@/application/domain/entity/delivery-company-setting.entity';

export class DeliveryCompanySettingDTO {
  @ApiResponseProperty({ type: String })
  id: string;

  @ApiResponseProperty({ type: String })
  zipCode: string;

  @ApiResponseProperty({ type: String })
  address: string;

  @ApiResponseProperty({ type: String })
  detailAddress: string;

  @ApiResponseProperty({ type: DeliveryCompanyDTO })
  deliveryCompany: DeliveryCompanyDTO;

  @ApiResponseProperty({ type: HanjinSettingDTO })
  hanjinSetting?: HanjinSettingDTO;

  @ApiResponseProperty({ type: CjSettingDTO })
  cjSetting?: CjSettingDTO;

  @ApiResponseProperty({ type: LotteSettingDTO })
  lotteSetting?: LotteSettingDTO;

  @ApiResponseProperty({ type: TeamfreshSettingDTO })
  teamfreshSetting?: TeamfreshSettingDTO;

  constructor(deliveryCompanySetting: DeliveryCompanySetting) {
    this.id = deliveryCompanySetting.id;
    this.zipCode = deliveryCompanySetting.zipCode;
    this.address = deliveryCompanySetting.address;
    this.detailAddress = deliveryCompanySetting.detailAddress;

    if (deliveryCompanySetting.deliveryCompany) {
      this.deliveryCompany = new DeliveryCompanyDTO(deliveryCompanySetting.deliveryCompany);
    }

    if (deliveryCompanySetting.hanjinSetting) {
      this.hanjinSetting = new HanjinSettingDTO(deliveryCompanySetting.hanjinSetting);
    }

    if (deliveryCompanySetting.cjSetting) {
      this.cjSetting = new CjSettingDTO(deliveryCompanySetting.cjSetting);
    }

    if (deliveryCompanySetting.lotteSetting) {
      this.lotteSetting = new LotteSettingDTO(deliveryCompanySetting.lotteSetting);
    }

    if (deliveryCompanySetting.teamfreshSetting) {
      this.teamfreshSetting = new TeamfreshSettingDTO(deliveryCompanySetting.teamfreshSetting);
    }
  }
}
