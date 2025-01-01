import { ApiResponseProperty } from '@nestjs/swagger';

import { HanjinSetting } from '@/application/domain/entity/delivery-company-settings/hanjin-setting.entity';

export class HanjinSettingDTO {
  @ApiResponseProperty({ type: String })
  clientId: string;

  @ApiResponseProperty({ type: String })
  apiKey: string;

  @ApiResponseProperty({ type: String })
  apiSecret: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(hanjinSetting: HanjinSetting) {
    this.clientId = hanjinSetting.clientId;
    this.apiKey = hanjinSetting.apiKey;
    this.apiSecret = hanjinSetting.apiSecret;
    this.createdAt = hanjinSetting.createdAt;
    this.updatedAt = hanjinSetting.updatedAt;
  }
}
