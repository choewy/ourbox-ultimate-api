import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

import { IsContactFormat } from '@/constant/validator/is-contact-fotmat';
import { IsZipCode } from '@/constant/validator/is-zip-code';

export class UpdatePurchaserDTO {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String })
  @IsZipCode()
  @IsOptional()
  zipCode?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  detailAddress?: string;

  @ApiPropertyOptional({ type: String })
  @IsContactFormat()
  @IsOptional()
  contact?: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerId?: string;
}
