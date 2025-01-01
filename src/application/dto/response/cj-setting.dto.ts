import { ApiResponseProperty } from '@nestjs/swagger';

import { CjSetting } from '@/application/domain/entity/delivery-company-settings/cj-setting.entity';

export class CjSettingDTO {
  @ApiResponseProperty({ type: String })
  clientCode: string;
  @ApiResponseProperty({ type: String })
  oracleUsername: string;

  @ApiResponseProperty({ type: String })
  oraclePassword: string;

  @ApiResponseProperty({ type: String })
  addressStandardizationId: string;

  @ApiResponseProperty({ type: String })
  addressStandardizationPassword: string;

  @ApiResponseProperty({ type: String })
  minTrackingNumberRange: string;

  @ApiResponseProperty({ type: String })
  maxTrackingNumberRange: string;

  @ApiResponseProperty({ type: Date })
  createdAt: Date;

  @ApiResponseProperty({ type: Date })
  updatedAt: Date;

  constructor(cjSetting: CjSetting) {
    this.clientCode = cjSetting.clientCode;
    this.oracleUsername = cjSetting.oracleUsername;
    this.oraclePassword = cjSetting.oraclePassword;
    this.addressStandardizationId = cjSetting.addressStandardizationId;
    this.addressStandardizationPassword = cjSetting.addressStandardizationPassword;
    this.minTrackingNumberRange = cjSetting.minTrackingNumberRange;
    this.maxTrackingNumberRange = cjSetting.maxTrackingNumberRange;
    this.createdAt = cjSetting.createdAt;
    this.updatedAt = cjSetting.updatedAt;
  }
}
