import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

import { UserRepository } from '@/application/domain/repository/user.repository';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [UserRepository, AuthService, AuthGuard],
})
export class AuthModule {}
