import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { IsSameString } from '@/constant/validator/is-same-string';

export class CreateUserDTO {
  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, format: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsSameString('confirmPassword')
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, format: 'password' })
  @IsSameString('password')
  @IsNotEmpty()
  confirmPassword: string;
}
