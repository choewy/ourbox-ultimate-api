import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInstance, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

import { SetCjSettingDTO } from './set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from './set-hanjin-setting.dto';
import { SetLotteSettingDTO } from './set-lotte-setting.dto';
import { SetTeamfreshSettingDTO } from './set-teamfresh-setting.dto';

import { DeliveryCompanyCode } from '@/application/domain/constant/enums';
import { IsZipCode } from '@/constant/validator/is-zip-code';

export class CreateDeliveryCompanySettingDTO {
  @ApiProperty({ type: String, enum: DeliveryCompanyCode })
  @IsEnum(DeliveryCompanyCode)
  @IsNotEmpty()
  code: DeliveryCompanyCode;

  @ApiProperty({ type: String })
  @IsZipCode()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  detailAddress: string;

  @ApiPropertyOptional({ type: SetHanjinSettingDTO })
  @IsInstance(SetHanjinSettingDTO)
  @IsOptional()
  @Type(() => SetHanjinSettingDTO)
  hanjinSetting?: SetHanjinSettingDTO;

  @ApiPropertyOptional({ type: SetCjSettingDTO })
  @IsInstance(SetCjSettingDTO)
  @IsOptional()
  @Type(() => SetCjSettingDTO)
  cjSetting?: SetCjSettingDTO;

  @ApiPropertyOptional({ type: SetLotteSettingDTO })
  @IsInstance(SetLotteSettingDTO)
  @IsOptional()
  @Type(() => SetLotteSettingDTO)
  lotteSetting?: SetLotteSettingDTO;

  @ApiPropertyOptional({ type: SetTeamfreshSettingDTO })
  @IsInstance(SetTeamfreshSettingDTO)
  @IsOptional()
  @Type(() => SetTeamfreshSettingDTO)
  teamfreshSetting?: SetTeamfreshSettingDTO;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentCenterId?: string;
}
