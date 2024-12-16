import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePartnerChannelDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
