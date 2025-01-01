import { ApiResponseProperty } from '@nestjs/swagger';

import { TeamfreshSetting } from '@/application/domain/entity/delivery-company-settings/teamfresh-setting.entity';

export class TeamfreshSettingDTO {
  @ApiResponseProperty({ type: String })
  apiKey: string;

  @ApiResponseProperty({ type: String })
  apiSecret: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(teamfreshSetting: TeamfreshSetting) {
    this.apiKey = teamfreshSetting.apiKey;
    this.createdAt = teamfreshSetting.createdAt;
    this.updatedAt = teamfreshSetting.updatedAt;
  }
}
