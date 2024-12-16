import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFulfillmentDTO {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;
}
