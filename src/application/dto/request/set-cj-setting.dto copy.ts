import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetCjSettingDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  clientCode: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  oracleUsername: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  oraclePassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  addressStandardizationId: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  addressStandardizationPassword: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  minTrackingNumberRange: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  maxTrackingNumberRange: string;
}
