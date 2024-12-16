import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { OnlyUserType } from './decorator/only-user-type';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RequiredAuth } from '../auth/decorator/required-auth';

import { UserType } from '@/application/domain/constant/enums';

@ApiTags('사용자')
@RequiredAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @OnlyUserType(UserType.Admin)
  @ApiOperation({ summary: '사용자 계정 생성' })
  @ApiCreatedResponse()
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }
}
