import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class IdParamDTO {
  @ApiProperty({ type: String })
  @IsNumberString()
  @IsNotEmpty()
  id: string;
}
