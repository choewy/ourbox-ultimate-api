import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { REQUIRED_USER_TYPES } from '@/application/decorator/required-user-types';
import { UserType } from '@/application/domain/constant/enums';
import { User } from '@/application/domain/entity/user.entity';
import { RequestContextService } from '@/common/request-context/request-context.service';

@Injectable()
export class UserTypeGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly requestContextService: RequestContextService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredUserTypes = this.reflector.getAllAndOverride(REQUIRED_USER_TYPES, [context.getClass(), context.getHandler()]);

    if (Array.isArray(requiredUserTypes) === false) {
      return true;
    }

    const requestUser = this.requestContextService.getRequestUser<User>();

    if (!requestUser) {
      throw new UnauthorizedException();
    }

    if (!requiredUserTypes.includes(requestUser.type)) {
      throw new ForbiddenException();
    }

    let isThrowForbiddenException = false;

    switch (requestUser.type) {
      case UserType.PartnerAdmin:
        isThrowForbiddenException = !requestUser.partnerId;

        break;

      case UserType.PartnerUser:
        isThrowForbiddenException = !requestUser.partnerChannelId;

        break;

      case UserType.FulfillmentAdmin:
        isThrowForbiddenException = !requestUser.fulfillmentId;

        break;

      case UserType.FulfillmentUser:
        isThrowForbiddenException = !requestUser.fulfillmentCenterId;

        break;
    }

    if (isThrowForbiddenException) {
      throw new ForbiddenException();
    }

    return true;
  }
}
