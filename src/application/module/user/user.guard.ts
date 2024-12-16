import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ONLY_USER_TYPE } from './decorator/only-user-type';

import { User } from '@/application/domain/entity/user.entity';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly requestContextService: RequestContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const userType = this.reflector.getAllAndOverride(ONLY_USER_TYPE, [context.getClass(), context.getHandler()]);

    if (!userType) {
      return true;
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (!requestUser) {
      throw new UnauthorizedException();
    }

    if (userType !== requestUser.type) {
      throw new ForbiddenException();
    }

    return true;
  }
}
