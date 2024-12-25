import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { RequiredAuth } from '@/application/decorator/required-auth';
import { RequiredUserTypes } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { CreateUserDTO } from '@/application/dto/request/create-user.dto';
import { GetUserssParamDTO } from '@/application/dto/request/get-users-param.dto';
import { UsersDTO } from '@/application/dto/response/users.dto';
import { ApiException } from '@/common/swagger/decorator';

@ApiTags('사용자')
@RequiredAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '사용자 목록 조회' })
  @ApiOkResponse({ type: UsersDTO })
  @ApiException()
  async getUsers(@Query() queryParam: GetUserssParamDTO) {
    return this.userService.getUsers(queryParam);
  }

  @Post()
  @RequiredUserTypes(UserType.Admin)
  @ApiOperation({ summary: '사용자 계정 생성' })
  @ApiCreatedResponse()
  @ApiException(HttpStatus.CONFLICT)
  async createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
