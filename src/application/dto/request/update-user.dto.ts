import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';

import { UserStatus } from '@/application/domain/constant/enums';

export class UpdateUserDTO {
  @ApiPropertyOptional({ type: String, format: 'name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, enum: UserStatus })
  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerId?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerChannelId?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentId?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentCenterId?: string;
}
