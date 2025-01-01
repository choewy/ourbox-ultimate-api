import { ApiResponseProperty } from '@nestjs/swagger';

import { LotteSetting } from '@/application/domain/entity/delivery-company-settings/lotte-setting.entity';

export class LotteSettingDTO {
  @ApiResponseProperty({ type: String })
  clientCode: string;

  @ApiResponseProperty({ type: String })
  apiKey: string;

  @ApiResponseProperty({ type: String })
  minTrackingNumberRange: string;

  @ApiResponseProperty({ type: String })
  maxTrackingNumberRange: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(lotteSetting: LotteSetting) {
    this.clientCode = lotteSetting.clientCode;
    this.apiKey = lotteSetting.apiKey;
    this.minTrackingNumberRange = lotteSetting.minTrackingNumberRange;
    this.maxTrackingNumberRange = lotteSetting.maxTrackingNumberRange;
    this.createdAt = lotteSetting.createdAt;
    this.updatedAt = lotteSetting.updatedAt;
  }
}
