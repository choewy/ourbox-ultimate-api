import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetLotteSettingDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  clientCode: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  minTrackingNumberRange: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  maxTrackingNumberRange: string;
}
