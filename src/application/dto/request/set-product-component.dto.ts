import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString } from 'class-validator';

export class SetProductComponentDTO {
  @ApiProperty({ type: String })
  @IsNumberString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ type: Number })
  @IsInt()
  @IsNotEmpty()
  count: number;
}
