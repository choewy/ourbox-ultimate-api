import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { EDITABLE_USER_TYPES } from '@/application/domain/constant/constant';
import { UserType } from '@/application/domain/constant/enums';
import { IsSameString } from '@/constant/validator/is-same-string';

export class CreateUserDTO {
  @ApiProperty({ type: String, enum: EDITABLE_USER_TYPES })
  @IsEnum(EDITABLE_USER_TYPES)
  @IsNotEmpty()
  type: UserType;

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
