import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInstance, IsOptional } from 'class-validator';

import { SetCjSettingDTO } from './set-cj-setting.dto copy';
import { SetHanjinSettingDTO } from './set-hanjin-setting.dto';
import { SetTeamfreshSettingDTO } from './set-teamfresh-setting.dto';

export class UpdateDeliveryCompanySettingDTO {
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

  @ApiPropertyOptional({ type: SetHanjinSettingDTO })
  @IsInstance(SetHanjinSettingDTO)
  @IsOptional()
  @Type(() => SetHanjinSettingDTO)
  lotte?: SetHanjinSettingDTO;

  @ApiPropertyOptional({ type: SetTeamfreshSettingDTO })
  @IsInstance(SetTeamfreshSettingDTO)
  @IsOptional()
  @Type(() => SetTeamfreshSettingDTO)
  teamfresh?: SetTeamfreshSettingDTO;
}
