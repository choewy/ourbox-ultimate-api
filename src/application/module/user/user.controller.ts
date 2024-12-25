import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { ApiException } from '@/common/swagger/decorator';
import { createOperationDescription } from '@/common/swagger/helper';

@ApiTags('사용자')
@RequiredAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '사용자 계정 생성', description: createOperationDescription(UserType.Admin) })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN, HttpStatus.CONFLICT)
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }
}
