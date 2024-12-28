import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class UpdateFulfillmentCenterDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'number' })
  @IsNumberString()
  @IsOptional()
  code?: string;
}
