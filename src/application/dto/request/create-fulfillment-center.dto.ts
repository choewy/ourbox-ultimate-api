import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateFulfillmentCenterDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, format: 'number' })
  @IsNumberString()
  @IsNotEmpty()
  code: string;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  fulfillmentId?: string;
}
