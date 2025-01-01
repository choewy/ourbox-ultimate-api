import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SetTeamfreshSettingDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  apiKey: string;
}
