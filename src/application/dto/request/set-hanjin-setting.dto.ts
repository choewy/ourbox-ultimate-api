import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetHanjinSettingDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  apiKey: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  apiSecret: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  clientId: string;
}
