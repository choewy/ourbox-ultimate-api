import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { RequiredAuth } from '../auth/decorator/required-auth';

@ApiTags('사용자')
@RequiredAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getHello() {
    return 'hello';
  }
}
