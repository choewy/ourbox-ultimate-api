import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;
}
