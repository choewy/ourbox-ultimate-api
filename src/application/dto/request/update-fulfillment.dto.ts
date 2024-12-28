import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFulfillmentDTO {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  name?: string;
}
