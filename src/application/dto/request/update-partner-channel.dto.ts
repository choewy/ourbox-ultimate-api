import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerChannelDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;
}
