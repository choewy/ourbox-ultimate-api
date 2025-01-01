import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInstance, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { SetCjSettingDTO } from './set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from './set-hanjin-setting.dto';
import { SetLotteSettingDTO } from './set-lotte-setting.dto';
import { SetTeamfreshSettingDTO } from './set-teamfresh-setting.dto';

import { DeliveryCompanyCode } from '@/application/domain/constant/enums';

export class CreateDeliveryCompanySettingDTO {
  @ApiProperty({ type: String, enum: DeliveryCompanyCode })
  @IsEnum(DeliveryCompanyCode)
  @IsNotEmpty()
  code: DeliveryCompanyCode;

  @ApiPropertyOptional({ type: SetHanjinSettingDTO })
  @IsInstance(SetHanjinSettingDTO)
  @IsOptional()
  @Type(() => SetHanjinSettingDTO)
  hanjin?: SetHanjinSettingDTO;

  @ApiPropertyOptional({ type: SetCjSettingDTO })
  @IsInstance(SetCjSettingDTO)
  @IsOptional()
  @Type(() => SetCjSettingDTO)
  cj?: SetCjSettingDTO;

  @ApiPropertyOptional({ type: SetLotteSettingDTO })
  @IsInstance(SetLotteSettingDTO)
  @IsOptional()
  @Type(() => SetLotteSettingDTO)
  lotte?: SetLotteSettingDTO;

  @ApiPropertyOptional({ type: SetTeamfreshSettingDTO })
  @IsInstance(SetTeamfreshSettingDTO)
  @IsOptional()
  @Type(() => SetTeamfreshSettingDTO)
  teamfresh?: SetTeamfreshSettingDTO;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentCenterId?: string;
}
