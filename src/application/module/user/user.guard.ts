import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ONLY_USER_TYPES } from '@/application/decorator/only-user-type';
import { User } from '@/application/domain/entity/user.entity';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly requestContextService: RequestContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const userTypes = this.reflector.getAllAndOverride(ONLY_USER_TYPES, [context.getClass(), context.getHandler()]);

    if (Array.isArray(userTypes) === false) {
      return true;
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (!requestUser) {
      throw new UnauthorizedException();
    }

    if (!userTypes.includes(requestUser.type)) {
      throw new ForbiddenException();
    }

    return true;
  }
}
