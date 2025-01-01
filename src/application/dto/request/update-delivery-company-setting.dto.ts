import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInstance, IsOptional, IsString } from 'class-validator';

import { SetCjSettingDTO } from './set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from './set-hanjin-setting.dto';
import { SetTeamfreshSettingDTO } from './set-teamfresh-setting.dto';

import { IsZipCode } from '@/constant/validator/is-zip-code';

export class UpdateDeliveryCompanySettingDTO {
  @ApiPropertyOptional({ type: String })
  @IsZipCode()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  detailAddress?: string;

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

  @ApiPropertyOptional({ type: SetHanjinSettingDTO })
  @IsInstance(SetHanjinSettingDTO)
  @IsOptional()
  @Type(() => SetHanjinSettingDTO)
  lotteSetting?: SetHanjinSettingDTO;

  @ApiPropertyOptional({ type: SetTeamfreshSettingDTO })
  @IsInstance(SetTeamfreshSettingDTO)
  @IsOptional()
  @Type(() => SetTeamfreshSettingDTO)
  teamfreshSetting?: SetTeamfreshSettingDTO;
}
