import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { IsContactFormat } from '@/constant/validator/is-contact-fotmat';
import { IsZipCode } from '@/constant/validator/is-zip-code';

export class CreatePurchaserDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsZipCode()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  address: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  detailAddress: string;

  @ApiProperty({ type: String })
  @IsContactFormat()
  @IsNotEmpty()
  contact: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  partnerId?: string;
}
