import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserTypeGuard } from './user.guard';
import { UserService } from './user.service';

import { UserRepository } from '@/application/domain/repository/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserRepository, UserService, UserTypeGuard],
})
export class UserModule {}
