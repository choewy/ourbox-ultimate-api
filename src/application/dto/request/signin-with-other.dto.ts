import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

import { SignInWithOtherType } from '../enums';

export class SignInWithOtherDTO {
  @ApiProperty({ type: String, enum: SignInWithOtherType })
  @IsEnum(SignInWithOtherType)
  @IsNotEmpty()
  type: SignInWithOtherType;

  @ApiPropertyOptional({ type: String })
  @IsNumberString()
  @IsOptional()
  otherId?: string;
}
